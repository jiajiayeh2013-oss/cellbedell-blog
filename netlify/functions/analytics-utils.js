const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const STORE_NAME = "article-views";
const ARTICLE_PREFIX = "article/";
const FALLBACK_DIR = path.join(os.tmpdir(), "cellbedell-blog-analytics");

const safeKeyPart = (value) =>
  String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);

const articleKey = ({ locale, slug }) => `${ARTICLE_PREFIX}${safeKeyPart(locale)}/${safeKeyPart(slug)}.json`;

const todayKey = () => new Date().toISOString().slice(0, 10);

const emptyArticle = (input) => ({
  locale: input.locale,
  slug: input.slug,
  path: input.path,
  series: input.series,
  title: input.title,
  total: 0,
  byDate: {},
  firstViewedAt: null,
  lastViewedAt: null,
});

const loadBlobStore = () => {
  try {
    const { getStore } = require("@netlify/blobs");
    const store = getStore(STORE_NAME);
    return {
      async get(key) {
        return (await store.get(key, { type: "json" })) || null;
      },
      async set(key, value) {
        await store.setJSON(key, value);
      },
      async list(prefix) {
        const keys = [];
        let cursor;
        do {
          const result = await store.list({ prefix, cursor });
          for (const blob of result.blobs || []) keys.push(blob.key);
          cursor = result.cursor;
        } while (cursor);
        return keys;
      },
    };
  } catch (error) {
    return null;
  }
};

const fallbackPath = (key) => path.join(FALLBACK_DIR, `${encodeURIComponent(key)}.json`);

const loadFallbackStore = () => ({
  async get(key) {
    const filePath = fallbackPath(key);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  },
  async set(key, value) {
    fs.mkdirSync(FALLBACK_DIR, { recursive: true });
    fs.writeFileSync(fallbackPath(key), `${JSON.stringify(value, null, 2)}\n`);
  },
  async list(prefix) {
    if (!fs.existsSync(FALLBACK_DIR)) return [];
    return fs
      .readdirSync(FALLBACK_DIR)
      .filter((file) => file.endsWith(".json"))
      .map((file) => decodeURIComponent(file.replace(/\.json$/, "")))
      .filter((key) => key.startsWith(prefix));
  },
});

const getAnalyticsStore = () => loadBlobStore() || loadFallbackStore();

const daysAgo = (days) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
};

const sumSince = (byDate, startDate) =>
  Object.entries(byDate || {}).reduce((sum, [date, count]) => (date >= startDate ? sum + Number(count || 0) : sum), 0);

const normalizeArticle = (input) => ({
  locale: String(input.locale || "").trim(),
  slug: String(input.slug || "").trim(),
  path: String(input.path || "").trim(),
  series: String(input.series || "").trim(),
  title: String(input.title || "").trim(),
});

async function incrementArticleView(input) {
  const article = normalizeArticle(input);
  const store = getAnalyticsStore();
  const key = articleKey(article);
  const existing = (await store.get(key)) || emptyArticle(article);
  const date = todayKey();
  const now = new Date().toISOString();
  const next = {
    ...existing,
    ...article,
    total: Number(existing.total || 0) + 1,
    byDate: {
      ...(existing.byDate || {}),
      [date]: Number(existing.byDate?.[date] || 0) + 1,
    },
    firstViewedAt: existing.firstViewedAt || now,
    lastViewedAt: now,
  };
  await store.set(key, next);
  return next;
}

async function listArticleViews() {
  const store = getAnalyticsStore();
  const keys = await store.list(ARTICLE_PREFIX);
  const articles = [];
  for (const key of keys) {
    const value = await store.get(key);
    if (value) articles.push(value);
  }

  const today = todayKey();
  const sevenDaysAgo = daysAgo(6);
  const thirtyDaysAgo = daysAgo(29);
  const rankedArticles = articles
    .map((article) => ({
      locale: article.locale,
      slug: article.slug,
      path: article.path,
      series: article.series,
      title: article.title,
      total: Number(article.total || 0),
      today: Number(article.byDate?.[today] || 0),
      last7Days: sumSince(article.byDate, sevenDaysAgo),
      last30Days: sumSince(article.byDate, thirtyDaysAgo),
      lastViewedAt: article.lastViewedAt,
    }))
    .sort((a, b) => b.last30Days - a.last30Days || b.total - a.total || String(a.title).localeCompare(String(b.title)));

  const seriesMap = new Map();
  for (const article of rankedArticles) {
    const key = article.series || "uncategorized";
    const current = seriesMap.get(key) || { series: key, total: 0, today: 0, last7Days: 0, last30Days: 0 };
    current.total += article.total;
    current.today += article.today;
    current.last7Days += article.last7Days;
    current.last30Days += article.last30Days;
    seriesMap.set(key, current);
  }

  return {
    updatedAt: new Date().toISOString(),
    totals: {
      articles: rankedArticles.length,
      views: rankedArticles.reduce((sum, article) => sum + article.total, 0),
      today: rankedArticles.reduce((sum, article) => sum + article.today, 0),
      last7Days: rankedArticles.reduce((sum, article) => sum + article.last7Days, 0),
      last30Days: rankedArticles.reduce((sum, article) => sum + article.last30Days, 0),
    },
    articles: rankedArticles,
    series: [...seriesMap.values()].sort((a, b) => b.last30Days - a.last30Days || b.total - a.total),
  };
}

module.exports = {
  incrementArticleView,
  listArticleViews,
};
