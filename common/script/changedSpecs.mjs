import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// Shared by preview links and the preview workflow's validation matrix.
export function getChangedSpecs(baseRef = "origin/main", headRef = "HEAD") {
  const files = execFileSync("git", [
    "diff", "--name-only", "-z", `${baseRef}...${headRef}`, "--",
  ], { encoding: "utf8" }).split("\0").filter(Boolean);
  const specSources = files.filter(file =>
    file === "index.html" || file.endsWith("/index.html")
  );

  // Any JavaScript change also affects the main ARIA spec.
  if (files.some(file => file.endsWith(".js")) && !specSources.includes("index.html")) {
    specSources.unshift("index.html");
  }

  return specSources.map(source => ({
    source,
    name: source === "index.html" ? "aria" : source.split("/").slice(-2, -1)[0],
  }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(`specs=${JSON.stringify(getChangedSpecs(process.argv[2], process.argv[3]))}`);
}
