import axios from "axios";
import fs from "fs";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command-line arguments with fallbacks to GitHub Actions environment variables
const args = yargs(hideBin(process.argv))
  .option("repo", {
    alias: "r",
    type: "string",
    description: "GitHub repository in the format owner/repo",
    default: process.env.GITHUB_REPOSITORY,
  })
  .option("pull_request_number", {
    alias: "pr",
    type: "number",
    description: "Pull request number",
    default: process.env.PR_NUMBER ? parseInt(process.env.PR_NUMBER) : undefined,
  })
  .option("token", {
    alias: "t",
    type: "string",
    description: "GitHub personal access token",
    default: process.env.GITHUB_TOKEN,
  })
  .option("build_specs", {
    alias: "b",
    type: "boolean",
    description: "Build specs before generating links",
    default: true,
  })
  .option("update_pr", {
    alias: "u",
    type: "boolean",
    description: "Update the PR description with preview links",
    default: false,
  })
  .option("base_ref", {
    type: "string",
    description: "Base branch reference for git diff",
    default: process.env.GITHUB_BASE_REF || "main",
  })
  .help().argv;

const { repo, pull_request_number, token, update_pr, build_specs, base_ref } = args;

async function updatePRDescription(markdownContent) {
  if (!update_pr) return;

  try {
    // Get current PR description
    const prResponse = await axios.get(`https://api.github.com/repos/${repo}/pulls/${pull_request_number}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    const currentBody = prResponse.data.body || '';

    // Remove any existing preview section
    const cleanedBody = currentBody.replace(/🚀 \*\*Netlify Preview\*\*:[\s\S]*?(?=\n\n|\n$|$)/g, '').trim();

    // Create new body with preview links prepended
    const newBody = `🚀 **Netlify Preview**:
🔄 **Changed Pages**:
${markdownContent}

${cleanedBody}`.trim();

    // Update PR description
    await axios.patch(`https://api.github.com/repos/${repo}/pulls/${pull_request_number}`, {
      body: newBody
    }, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    console.log('PR description updated successfully');
  } catch (error) {
    console.error('Error updating PR description:', error.message);
  }
}

// Define the base URLs
// Use Netlify site and context to build preview URL
// Get Netlify site name from environment variable or default to 'wai-aria'
const netlifySite = process.env.SITE_NAME || 'wai-aria';
// Get Netlify context from environment variable or default to 'deploy-preview'
const netlifyContext = process.env.CONTEXT || process.env.NETLIFY_CONTEXT || 'deploy-preview';
const previewBaseURL = `https://${netlifyContext}-${pull_request_number}--${netlifySite}.netlify.app`;
// Extract repo owner and name from the repo parameter (format: owner/repo)
const repoOwner = repo.split('/')[0];
const repoName = repo.split('/')[1];
const EDBaseURL = `https://${repoOwner}.github.io/${repoName}`;

async function getChangedFiles() {
  const { execSync } = await import('child_process');
  try {
    // Use git diff to get changed files
    const diffOutput = execSync(`git diff --name-only origin/${base_ref}...HEAD`, { encoding: 'utf-8' });
    const files = diffOutput.split('\n').filter(Boolean);

    // Filter to only include index.html files
    const specSources = files.filter(file => 
      file === 'index.html' || file.endsWith('/index.html')
    );

    // Build the Markdown list with preview URLs and diff links
    const markdownList = specSources.map((file) => {
      const previewUrl = `${previewBaseURL}/${file}`;
      
      // Build ED URL based on file path
      let EDUrl;
      if (file === 'index.html') {
        // Main spec: https://w3c.github.io/aria/
        EDUrl = `${EDBaseURL}/`;
      } else if (file.endsWith('/index.html')) {
        // Child specs: https://w3c.github.io/core-aam/ (not /aria/core-aam/)
        const dirName = file.split('/').slice(-2, -1)[0];
        EDUrl = `https://w3c.github.io/${dirName}/`;
      }
      
      const diffUrl = `https://services.w3.org/htmldiff?doc1=${encodeURIComponent(EDUrl)}&doc2=${encodeURIComponent(previewUrl)}`;
      
      // Generate spec name based on file path
      let specName;
      if (file === 'index.html') {
        specName = 'ARIA';
      } else if (file.endsWith('/index.html')) {
        // Extract directory name for subdirectory index.html files
        const dirName = file.split('/').slice(-2, -1)[0];
        specName = dirName;
      }
      
      return `- [${specName} preview](${previewUrl}) &mdash; [${specName} diff](${diffUrl})`;
    }).join("\n");

    // Output the Markdown list
    console.log(markdownList);

    // Optionally, write the output to a file
    const outputPath = path.join(__dirname, "changed_files.md");
    fs.writeFileSync(outputPath, markdownList, "utf8");
    console.log(`Markdown list written to ${outputPath}`);
    
    // Update PR description if requested
    await updatePRDescription(markdownList);
  } catch (error) {
    console.error("Error fetching changed files:", error.message);
    process.exit(1);
  }
}

(async () => {
  await getChangedFiles();
})();
