const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Parse command-line arguments
const args = require("yargs")
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
//  demandOption: true,
  })
  .help().argv;

const { repo, pull_request_number, token } = args;

// Define the base URLs
const previewBaseURL = `https://deploy-preview--${pull_request_number}--wai-aria-.netlify.app`;
const EDBaseURL = `https://w3c.github.io/aria`;

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

    // Build the Markdown list with preview URLs and diff links
    const markdownList = files.map((file) => {
      const previewUrl = `${previewBaseURL}/${file}`;
      const EDUrl = `${EDBaseURL}/${file}`;
      const diffUrl = `https://services.w3.org/htmldiff?doc1=${encodeURIComponent(EDUrl)}&doc2=${encodeURIComponent(previewUrl)}`;
      
      return `- [${file} preview](${previewUrl}) ([diff](${diffUrl}))`;
    }).join("\n");

    // Output the Markdown list
    console.log(markdownList);

    // Optionally, write the output to a file
    const outputPath = path.join(__dirname, "changed_files.md");
    fs.writeFileSync(outputPath, markdownList, "utf8");
    console.log(`Markdown list written to ${outputPath}`);
  } catch (error) {
    console.error("Error fetching changed files:", error.message);
    process.exit(1);
  }
}

// Run the script
getChangedFiles();
