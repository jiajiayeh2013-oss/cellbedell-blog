import fs from "node:fs";
import path from "node:path";

const htmlFiles = [
  "index.html",
  "series-vivatech-2026.html",
  "series-media-lens.html",
  "series-hotel-tech.html",
  "series-ai-humanities.html",
  "series-style-life.html",
  "thanks.html",
  "posts/2026-06-19-vivatech-2026-highlights.html",
];

const missing = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const dir = path.dirname(file);
  const attrPattern = /(?:href|src)="([^"]+)"/g;

  for (const match of html.matchAll(attrPattern)) {
    const url = match[1];

    if (/^(https?:|mailto:|#)/.test(url) || url.startsWith("/.netlify/functions/")) {
      continue;
    }

    const cleanUrl = url.split("#")[0].split("?")[0];
    if (!cleanUrl || cleanUrl.startsWith("/")) {
      continue;
    }

    const target = path.normalize(path.join(dir, cleanUrl));
    if (!fs.existsSync(target)) {
      missing.push({ file, url, target });
    }
  }
}

if (missing.length > 0) {
  console.error(JSON.stringify({ checked: htmlFiles.length, missing }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ checked: htmlFiles.length, missing: [] }, null, 2));
}
