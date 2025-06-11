const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Parse command-line arguments
const args = require('yargs')
  .option('repo', {
    alias: 'r',
    type: 'string',
    description: 'GitHub repository in the format owner/repo',
    demandOption: true,
  })
  .option('pull_request_number', {
    alias: 'pr',
    type: 'number',
    description: 'Pull request number',
    demandOption: true,
  })
  .option('token', {
    alias: 't',
    type: 'string',
    description: 'GitHub personal access token',
    demandOption: true,
  })
  .help()
  .argv;

const { repo, pull_request_number, token } = args;

// Define the base URL for the preview
const BASEURL = `https://deploy-preview--${pull_request_number}--wai-aria-.netlify.app`;

async function getChangedFiles() {
  try {
    // Fetch the list of changed files from the GitHub API
    const response = await axios.get(
      `https://api.github.com/repos/${repo}/pulls/${pull_request_number}/files`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    const files = response.data.map((file) => file.filename);

    // Build the Markdown list with preview URLs
    const markdownList = files
      .map((file) => `- [${file}](${BASEURL}/${file})`)
      .join('\n');

    // Output the Markdown list
    console.log(markdownList);

    // Optionally, write the output to a file
    const outputPath = path.join(__dirname, 'changed_files.md');
    fs.writeFileSync(outputPath, markdownList, 'utf8');
    console.log(`Markdown list written to ${outputPath}`);
  } catch (error) {
    console.error('Error fetching changed files:', error.message);
    process.exit(1);
  }
}

// Run the script
getChangedFiles();