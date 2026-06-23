import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const ignoredDirs = new Set([".git", "node_modules", ".netlify"]);
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(path.relative(rootDir, fullPath));
    }
  }
}

walk(rootDir);

const missing = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(rootDir, file), "utf8");
  const dir = path.dirname(file);
  const attrPattern = /(?:href|src)="([^"]+)"/g;

  for (const match of html.matchAll(attrPattern)) {
    const url = match[1];

    if (/^(https?:|mailto:|tel:|#|data:)/.test(url) || url.startsWith("/.netlify/functions/")) {
      continue;
    }

    const cleanUrl = url.split("#")[0].split("?")[0];
    if (!cleanUrl) continue;

    const relativeUrl = cleanUrl.startsWith("/") ? cleanUrl.slice(1) : path.join(dir, cleanUrl);
    const target = path.normalize(path.join(rootDir, relativeUrl));

    if (!target.startsWith(rootDir) || !fs.existsSync(target)) {
      missing.push({ file, url, target: path.relative(rootDir, target) });
    }
  }
}

if (missing.length > 0) {
  console.error(JSON.stringify({ checked: htmlFiles.length, missing }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ checked: htmlFiles.length, missing: [] }, null, 2));
}
