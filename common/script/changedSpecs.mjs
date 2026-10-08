import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

// Shared by preview links and the preview workflow's validation matrix.
export function getChangedSpecs(baseRef = "origin/main", headRef = "HEAD") {
  // Include both sides of moves so the old and new specs are selected.
  const files = execFileSync("git", [
    "diff", "--name-only", "--no-renames", "-z", `${baseRef}...${headRef}`, "--",
  ], { encoding: "utf8" }).split("\0").filter(Boolean);
  const sources = [
    "index.html",
    ...readdirSync(".", { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => `${entry.name}/index.html`),
  ].filter(source => existsSync(source)).sort();
  const affectsAll = files.some(file =>
    file.startsWith("common/") || file === ".github/workflows/preview.yml"
  );

  return sources.filter(source => {
    const isRoot = source === "index.html";
    const prefix = isRoot ? "img/" : source.slice(0, -"index.html".length);
    return affectsAll || files.includes(source) || files.some(file =>
      file.startsWith(prefix) || (isRoot && file.endsWith(".js"))
    );
  }).map(source => ({
    source,
    name: source === "index.html" ? "aria" : source.split("/")[0],
  }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(`specs=${JSON.stringify(getChangedSpecs(process.argv[2], process.argv[3]))}`);
}
