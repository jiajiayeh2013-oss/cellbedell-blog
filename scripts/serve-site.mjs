import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const rootDir = process.cwd();
const port = Number(process.env.PORT || 8888);
const functionHandlers = new Map();

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function send(response, statusCode, headers, body = "") {
  response.writeHead(statusCode, headers);
  response.end(body);
}

async function handleFunction(request, response) {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const name = path.basename(url.pathname);
  const functionPath = path.join(rootDir, "netlify", "functions", `${name}.js`);

  if (!fs.existsSync(functionPath)) {
    send(response, 404, { "Content-Type": "text/plain; charset=utf-8" }, "Function Not Found");
    return;
  }

  if (!functionHandlers.has(name)) {
    functionHandlers.set(name, require(functionPath));
  }

  const body = await readBody(request);
  const result = await functionHandlers.get(name).handler({
    body,
    headers: request.headers,
    httpMethod: request.method,
    path: url.pathname,
  }, { clientContext: null });

  send(response, result.statusCode || 200, result.headers || {}, result.body || "");
}

function resolveStaticPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = normalizedPath === "/" ? "/index.html" : normalizedPath;
  const candidates = [path.join(rootDir, requestedPath)];

  if (requestedPath.endsWith("/")) {
    candidates.push(path.join(rootDir, requestedPath, "index.html"));
  } else if (!path.extname(requestedPath)) {
    candidates.push(path.join(rootDir, `${requestedPath}.html`));
    candidates.push(path.join(rootDir, requestedPath, "index.html"));
  }

  for (const filePath of candidates) {
    const relativePath = path.relative(rootDir, filePath);
    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) continue;
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return filePath;
  }

  return null;
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    if (url.pathname.startsWith("/.netlify/functions/")) {
      await handleFunction(request, response);
      return;
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      send(response, 405, { Allow: "GET, HEAD", "Content-Type": "text/plain; charset=utf-8" }, "Method Not Allowed");
      return;
    }

    const filePath = resolveStaticPath(url.pathname);

    if (!filePath) {
      send(response, 404, { "Content-Type": "text/html; charset=utf-8" }, "<h1>404 Not Found</h1>");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const headers = { "Content-Type": contentTypes[ext] || "application/octet-stream" };

    if (request.method === "HEAD") {
      send(response, 200, headers);
      return;
    }

    send(response, 200, headers, fs.readFileSync(filePath));
  } catch (error) {
    console.error(error);
    send(response, 500, { "Content-Type": "text/plain; charset=utf-8" }, "Internal Server Error");
  }
}).listen(port, () => {
  console.log(`Cellbedell Blog preview: http://localhost:${port}`);
});
