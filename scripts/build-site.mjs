import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const contentDir = path.join(rootDir, "content", "posts");
const postsDir = path.join(rootDir, "posts");

const seriesMap = {
  "VivaTech / 科技展觀察": {
    href: "./series-vivatech-2026.html",
    postPrefix: "../series-vivatech-2026.html",
    label: "VivaTech 2026",
  },
  "國際科技媒體觀察": {
    href: "./series-media-lens.html",
    postPrefix: "../series-media-lens.html",
    label: "國際科技媒體觀察",
  },
  "旅館生活科技": {
    href: "./series-hotel-tech.html",
    postPrefix: "../series-hotel-tech.html",
    label: "旅館生活科技",
  },
  "AI 與人文": {
    href: "./series-ai-humanities.html",
    postPrefix: "../series-ai-humanities.html",
    label: "AI 與人文",
  },
  "時尚與生活": {
    href: "./series-style-life.html",
    postPrefix: "../series-style-life.html",
    label: "時尚與生活",
  },
};

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, value) {
  fs.writeFileSync(filePath, value);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugFromFilename(filePath) {
  return path.basename(filePath, ".md");
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw.trim() };
  }

  const data = {};
  const lines = match[1].split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }

    const pair = line.match(/^([A-Za-z0-9_ -]+):\s*(.*)$/);
    if (!pair) {
      i += 1;
      continue;
    }

    const key = pair[1].trim();
    const value = pair[2];
    if (value !== "") {
      data[key] = parseScalar(value);
      i += 1;
      continue;
    }

    const list = [];
    i += 1;
    while (i < lines.length && /^  - /.test(lines[i])) {
      const itemLine = lines[i].replace(/^  - /, "");
      if (itemLine.includes(":")) {
        const item = {};
        const first = itemLine.match(/^([^:]+):\s*(.*)$/);
        if (first) item[first[1].trim()] = parseScalar(first[2]);
        i += 1;
        while (i < lines.length && /^    [^ ].*:/.test(lines[i])) {
          const nested = lines[i].trim().match(/^([^:]+):\s*(.*)$/);
          if (nested) item[nested[1].trim()] = parseScalar(nested[2]);
          i += 1;
        }
        list.push(item);
      } else {
        list.push(parseScalar(itemLine));
        i += 1;
      }
    }
    data[key] = list;
  }

  return { data, body: match[2].trim() };
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown) {
  const blocks = markdown.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const html = [];

  for (const block of blocks) {
    if (block.startsWith("### ")) {
      html.push(`<h3>${inlineMarkdown(block.slice(4))}</h3>`);
    } else if (block.startsWith("## ")) {
      html.push(`<h2>${inlineMarkdown(block.slice(3))}</h2>`);
    } else if (block.startsWith("# ")) {
      html.push(`<h2>${inlineMarkdown(block.slice(2))}</h2>`);
    } else if (/^- /.test(block)) {
      const items = block
        .split(/\n/)
        .filter((line) => line.startsWith("- "))
        .map((line) => `<li>${inlineMarkdown(line.slice(2))}</li>`)
        .join("\n");
      html.push(`<ul>\n${items}\n</ul>`);
    } else {
      html.push(`<p>${inlineMarkdown(block.replace(/\n/g, " "))}</p>`);
    }
  }

  return html.join("\n");
}

function normalizeAssetPath(value = "", fromPost = false) {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  if (value.startsWith("/")) return `${fromPost ? ".." : "."}${value}`;
  return `${fromPost ? "../" : "./"}${value.replace(/^\.\//, "")}`;
}

function formatDate(date) {
  return String(date || "").replaceAll("-", ".");
}

function estimateReadingTime(body) {
  const words = body.replace(/\s+/g, "").length;
  return Math.max(2, Math.ceil(words / 450));
}

function loadPosts() {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const { data, body } = parseFrontmatter(read(filePath));
      const slug = slugFromFilename(filePath);
      return {
        ...data,
        body,
        slug,
        outputPath: path.join(postsDir, `${slug}.html`),
        href: `./posts/${slug}.html`,
        postHref: `${slug}.html`,
        status: data.status || "Drafting",
        tags: Array.isArray(data.tags) ? data.tags : [],
        sources: Array.isArray(data.sources) ? data.sources : [],
      };
    })
    .filter((post) => ["Ready", "Published"].includes(post.status))
    .sort((a, b) => {
      const dateOrder = String(b.date || "").localeCompare(String(a.date || ""));
      if (dateOrder !== 0) return dateOrder;
      const manualOrder = Number(b.order || 0) - Number(a.order || 0);
      if (manualOrder !== 0) return manualOrder;
      return String(b.slug || "").localeCompare(String(a.slug || ""));
    });
}

function renderPost(post) {
  const series = seriesMap[post.series] || seriesMap["VivaTech / 科技展觀察"];
  const heroImage = normalizeAssetPath(post.hero_image, true);
  const heroAlt = post.hero_image_alt || post.title;
  const bodyHtml = markdownToHtml(post.body);
  const sourceItems = post.sources
    .map((source) => `<li><a href="${escapeHtml(source.url)}">${escapeHtml(source.title)}</a></li>`)
    .join("\n");
  const tagLinks = post.tags
    .map((tag) => `<a href="${series.postPrefix}">${escapeHtml(tag)}</a>`)
    .join("\n");
  const nextItems = String(post.next_direction || "下一篇靈感觀察")
    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(post.title)} | Cellbedell Blog</title>
    <meta name="description" content="${escapeHtml(post.summary || post.subtitle || post.title)}" />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <div class="page-shell">
      <header class="hero">
        <nav class="topbar" aria-label="主導覽">
          <div class="brand">
            <span class="brand-mark">CB</span>
            <div>
              <p class="eyebrow">Cellbedell Blog</p>
              <p class="brand-subtitle">Technology, culture, future living</p>
            </div>
          </div>
          <a class="source-link" href="../index.html">Back to Blog</a>
        </nav>

        <div class="hero-grid">
          <section class="hero-copy">
            <p class="eyebrow">${escapeHtml(series.label)} / ${escapeHtml(formatDate(post.date))}</p>
            <h1>${escapeHtml(post.title)}</h1>
            <p class="hero-dek">${escapeHtml(post.subtitle || post.summary || "")}</p>
            <div class="hero-meta">
              <span>${escapeHtml(series.label)}</span>
              <span>${escapeHtml(formatDate(post.date))}</span>
              <span>Written by ${escapeHtml(post.author || "Cellbedell")}</span>
            </div>
          </section>

          <aside class="hero-panel">
            <p class="panel-label">Editor’s Note</p>
            <p>${escapeHtml(post.summary || post.subtitle || "一篇由 Cellbedell Blog 後台發布的科技生活觀察。")}</p>
          </aside>
        </div>

        ${
          heroImage
            ? `<figure class="hero-visual">
          <img src="${escapeHtml(heroImage)}" alt="${escapeHtml(heroAlt)}" />
        </figure>`
            : ""
        }
      </header>

      <main>
        <section class="publish-strip" aria-label="文章發布資訊">
          <div class="author-lockup">
            <span class="author-avatar">CB</span>
            <div>
              <p class="card-kicker">Written by ${escapeHtml(post.author || "Cellbedell")}</p>
              <p>科技、設計與未來生活觀察</p>
            </div>
          </div>
          <div class="publish-meta">
            <span>Published / ${escapeHtml(formatDate(post.date))}</span>
            <span>Reading time / ${estimateReadingTime(post.body)} min</span>
            <span>${escapeHtml(series.label)}</span>
          </div>
        </section>

        <div class="content-layout">
          <article class="article-body generated-article">
            ${bodyHtml}
          </article>

          <aside class="sidebar">
            <section class="sidebar-card">
              <p class="card-kicker">Tags</p>
              <h3>文章標籤</h3>
              <div class="tag-list" aria-label="文章標籤">
                ${tagLinks || `<a href="${series.postPrefix}">${escapeHtml(series.label)}</a>`}
              </div>
            </section>

            ${
              post.hero_image_credit
                ? `<section class="sidebar-card">
              <p class="card-kicker">Image Credit</p>
              <h3>圖片來源</h3>
              <p>${escapeHtml(post.hero_image_credit)}</p>
            </section>`
                : ""
            }

            <section class="sidebar-card">
              <p class="card-kicker">Next Stories</p>
              <h3>下一篇可以延伸</h3>
              <ol class="sidebar-ordered">
                ${nextItems || "<li>下一篇靈感觀察</li>"}
              </ol>
            </section>

            ${
              sourceItems
                ? `<section class="sidebar-card" id="sources">
              <p class="card-kicker">Sources</p>
              <h3>參考來源</h3>
              <ul class="source-list">
                ${sourceItems}
              </ul>
            </section>`
                : ""
            }
          </aside>
        </div>
      </main>

      <footer class="site-footer">
        <div>
          <p class="eyebrow">Cellbedell Blog</p>
          <h2>科技、文化與未來生活的靈感採集</h2>
        </div>
        <p>
          回到 <a href="${series.postPrefix}">${escapeHtml(series.label)}</a>，繼續收集新點子。
        </p>
      </footer>
    </div>
  </body>
</html>
`;
}

function shouldWritePost(post) {
  if (!fs.existsSync(post.outputPath)) return true;
  return !post.body.includes("這篇已先以 HTML 文章頁發布");
}

function betweenMarkers(file, start, end, replacement) {
  const original = read(file);
  const pattern = new RegExp(
    `${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  );
  if (!pattern.test(original)) {
    throw new Error(`Missing markers in ${file}: ${start}`);
  }
  write(file, original.replace(pattern, `${start}\n${replacement}\n${end}`));
}

function renderLatestArticle(post) {
  const image = normalizeAssetPath(post.hero_image);
  const tags = post.tags
    .slice(0, 4)
    .map((tag) => `<a href="${seriesMap[post.series]?.href || "./series-vivatech-2026.html"}">${escapeHtml(tag)}</a>`)
    .join("\n");
  return `<article class="feature-article">
            <a class="feature-image" href="${escapeHtml(post.href)}">
              <img src="${escapeHtml(image)}" alt="${escapeHtml(post.title)}" />
            </a>
            <div class="feature-copy">
              <p class="card-kicker">Published / ${escapeHtml(formatDate(post.date))}</p>
              <h3>
                <a href="${escapeHtml(post.href)}">${escapeHtml(post.title)}</a>
              </h3>
              <p>${escapeHtml(post.summary || post.subtitle || "")}</p>
              <div class="tag-list">
                ${tags}
              </div>
            </div>
          </article>`;
}

function renderDailyBoard(posts) {
  const vivatechPosts = posts.filter((post) => post.series === "VivaTech / 科技展觀察");
  const cards = vivatechPosts
    .map((post, index) => `<article class="update-card${index === 0 ? " is-live" : ""}">
              <p class="theme-index">${escapeHtml(String(post.date).slice(5).replace("-", "."))}</p>
              <h3>${escapeHtml(post.title)}</h3>
              <p>${escapeHtml(post.summary || post.subtitle || "")}</p>
              <a href="${escapeHtml(post.href)}">閱讀文章</a>
            </article>`)
    .join("\n");
  return `<div class="update-grid">
            ${cards}
            <article class="update-card">
              <p class="theme-index">Next</p>
              <h3>下一篇觀察準備中</h3>
              <p>有新的展會素材、旅宿科技案例或國際媒體觀點時，就可以從後台新增文章。</p>
              <span>準備中</span>
            </article>
          </div>`;
}

function renderSeriesList(posts) {
  const vivatechPosts = posts.filter((post) => post.series === "VivaTech / 科技展觀察");
  const items = vivatechPosts
    .map((post) => {
      const image = normalizeAssetPath(post.hero_image);
      return `<article class="list-article">
            <a class="list-image" href="${escapeHtml(post.href)}">
              <img src="${escapeHtml(image)}" alt="${escapeHtml(post.title)}" />
            </a>
            <div>
              <p class="card-kicker">${escapeHtml(formatDate(post.date))} / ${escapeHtml(post.status)}</p>
              <h3>
                <a href="${escapeHtml(post.href)}">${escapeHtml(post.title)}</a>
              </h3>
              <p>${escapeHtml(post.summary || post.subtitle || "")}</p>
            </div>
          </article>`;
    })
    .join("\n");

  return `${items}

          <article class="list-article is-upcoming">
            <div class="list-date">Next</div>
            <div>
              <p class="card-kicker">Upcoming</p>
              <h3>下一篇觀察準備中</h3>
              <p>後台新增並發布文章後，這裡會自動更新文章列表。</p>
            </div>
          </article>`;
}

function updateIndex(posts) {
  if (!posts.length) return;
  const indexPath = path.join(rootDir, "index.html");
  betweenMarkers(
    indexPath,
    "<!-- CMS:latest:start -->",
    "<!-- CMS:latest:end -->",
    renderLatestArticle(posts[0]),
  );
  betweenMarkers(
    indexPath,
    "<!-- CMS:daily:start -->",
    "<!-- CMS:daily:end -->",
    renderDailyBoard(posts),
  );
}

function updateVivaTechSeries(posts) {
  const seriesPath = path.join(rootDir, "series-vivatech-2026.html");
  betweenMarkers(
    seriesPath,
    "<!-- CMS:series-posts:start -->",
    "<!-- CMS:series-posts:end -->",
    renderSeriesList(posts),
  );
}

function main() {
  fs.mkdirSync(postsDir, { recursive: true });
  const posts = loadPosts();

  for (const post of posts) {
    if (shouldWritePost(post)) {
      write(post.outputPath, renderPost(post));
    }
  }

  updateIndex(posts);
  updateVivaTechSeries(posts);
  console.log(`Built ${posts.length} CMS post(s).`);
}

main();
