import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Helper: Rewrite patterns in a file
function rewriteFile(filePath, patterns) {
  let content = fs.readFileSync(filePath, "utf8");
  for (const [pattern, replacement] of patterns) {
    content = content.replace(pattern, replacement);
  }
  fs.writeFileSync(filePath, content, "utf8");
}

// Helper: Get all first-level subdirectories in cwd
function getSubdirectories() {
  return fs.readdirSync(process.cwd(), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

// Step 1: Rewrite ED: links in root index.html
function rewriteRootEDLinks() {
  const rootIndex = path.join(process.cwd(), "index.html");
  if (fs.existsSync(rootIndex)) {
    rewriteFile(rootIndex, [
      [/(ED: ")https:\/\/w3c\.github\.io\//g, '$1./'],
    ]);
  }
}

// Step 2: Rewrite ED: links in subdirectory index.html files
function rewriteSubdirEDLinks() {
  for (const dir of getSubdirectories()) {
    const subIndex = path.join(process.cwd(), dir, "index.html");
    if (fs.existsSync(subIndex)) {
      rewriteFile(subIndex, [
        [/(ED: ")https:\/\/w3c\.github\.io\/aria\//g, '$1/'],
        [/(ED: ")https:\/\/w3c\.github\.io\/(?!aria)/g, '$1/'],
      ]);
    }
  }
}

// Step 3: Build all specs with respec
function buildAllSpecs() {
  const buildSpecs = [
    "index.html",
    ...getSubdirectories().map(dir => path.join(dir, "index.html"))
  ].filter(specPath => fs.existsSync(path.join(process.cwd(), specPath)));

  for (const spec of buildSpecs) {
    try {
      console.log(`Building ${spec}...`);
      execSync(`npx respec -s ${spec} -o ${spec} --localhost`, { stdio: "inherit" });
    } catch (e) {
      console.error(`Failed to build ${spec}:`, e.message);
    }
  }
}

// Helper: Install npm dependencies
function installDependencies() {
  try {
    console.log("Installing npm dependencies...");
    execSync("npm install", { stdio: "inherit", cwd: process.cwd() });
  } catch (e) {
    console.error("Failed to install dependencies:", e.message);
    throw e;
  }
}

// Main orchestrator
async function main() {
  try {
    installDependencies();
    rewriteRootEDLinks();
    rewriteSubdirEDLinks();
    buildAllSpecs();
  } catch (err) {
    console.error("Error during spec link rewrite/build:", err);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
