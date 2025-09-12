import axios from "axios";
import fs from "fs";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { fileURLToPath } from "url";
// Check and wait for Netlify
const netlifySite = "staging-aria"; // Netlify site name
async function isNetlifyDeploySuccessful(prNumber) {
  const apiUrl = `https://api.netlify.com/api/v1/sites/${netlifySite}/deploys`;

  try {
    const response = await axios.get(apiUrl);
    // Find the deploy for this PR
    const prDeploy = response.data.find(deploy => {
      // Netlify context for PR deploys is 'deploy-preview' and branch is 'deploy-preview-<prNumber>'
      return (
        deploy.context === "deploy-preview" &&
        deploy.branch === `deploy-preview-${prNumber}`
      );
    });
    if (!prDeploy) return false;
    return prDeploy.state === "ready";
  } catch (e) {
    console.error("Error checking Netlify deploy status:", e.message);
    return false;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command-line arguments
const args = yargs(hideBin(process.argv))
  .option("repo", {
    alias: "r",
    type: "string",
    description: "GitHub repository in the format owner/repo",
    demandOption: true,
  })
  .option("pull_request_number", {
    alias: "pr",
    type: "number",
    description: "Pull request number",
    demandOption: true,
  })
  .option("token", {
    alias: "t",
    type: "string",
    description: "GitHub personal access token",
    demandOption: true,
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
  .help().argv;

const { repo, pull_request_number, token, update_pr, build_specs } = args;

async function updatePRDescription(markdownContent) {
  if (!update_pr) return;

  // Check Netlify deploy status first
  const deployOk = await isNetlifyDeploySuccessful(pull_request_number);
  if (!deployOk) {
    console.log("Netlify deploy not successful. PR description will not be updated.");
    return;
  }

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
const netlifyContext = "deploy-preview";
const previewBaseURL = `https://${netlifyContext}-${pull_request_number}--${netlifySite}.netlify.app`;
const EDBaseURL = `https://w3c.github.io`;

async function getChangedFiles() {
  try {
    // Build headers conditionally - only include Authorization if token is provided
    const headers = {};
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    // Fetch the list of changed files from the GitHub API
    const response = await axios.get(`https://api.github.com/repos/${repo}/pulls/${pull_request_number}/files`, {
      headers,
    });

    const files = response.data.map((file) => file.filename);

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
        EDUrl = `${EDBaseURL}/aria/`;
      } else if (file.endsWith('/index.html')) {
        // Extract directory name for subdirectory index.html files
        const dirName = file.split('/').slice(-2, -1)[0];
        EDUrl = `${EDBaseURL}/${dirName}/`;
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
      
      return `- [${specName} preview](${previewUrl}) ([diff](${diffUrl}))`;
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
