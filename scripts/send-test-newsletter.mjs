const target = process.argv[2];

if (!target || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target)) {
  throw new Error("Usage: node scripts/send-test-newsletter.mjs reader@example.com");
}

const requiredEnv = ["MAILGUN_API_KEY", "MAILGUN_DOMAIN", "NEWSLETTER_FROM"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  throw new Error(`Missing env: ${missingEnv.join(", ")}`);
}

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const feedResponse = await fetch("https://cellbedell-blog.netlify.app/newsletter.json");
if (!feedResponse.ok) {
  throw new Error(`Unable to fetch newsletter.json: ${feedResponse.status}`);
}

const feed = await feedResponse.json();
const posts = Array.isArray(feed.posts) ? feed.posts.slice(0, 5) : [];
if (posts.length === 0) {
  throw new Error("No posts available in newsletter feed.");
}

const items = posts
  .map(
    (post) => `
      <article style="padding:18px 0;border-top:1px solid #e5d8c5;">
        <p style="margin:0 0 6px;color:#b84f2f;font-size:13px;letter-spacing:.08em;">${escapeHtml(post.date)}</p>
        <h2 style="margin:0 0 8px;font-size:22px;line-height:1.25;">
          <a href="${escapeHtml(post.url)}" style="color:#211814;text-decoration:none;">${escapeHtml(post.title)}</a>
        </h2>
        <p style="margin:0 0 10px;color:#453732;">${escapeHtml(post.summary)}</p>
        <p style="margin:0;"><a href="${escapeHtml(post.url)}" style="color:#b84f2f;">閱讀文章</a></p>
      </article>`,
  )
  .join("");

const html = `
  <div style="font-family:Georgia,'Times New Roman',serif;color:#211814;line-height:1.7;background:#f9f2e8;padding:28px;">
    <div style="max-width:680px;margin:0 auto;background:#fff8ef;border:1px solid #e5d8c5;border-radius:18px;padding:28px;">
      <p style="margin:0 0 10px;color:#b84f2f;font-size:13px;letter-spacing:.12em;text-transform:uppercase;">Signal &amp; Style Weekly / Test</p>
      <h1 style="margin:0 0 14px;font-size:34px;line-height:1.15;">本週靈感筆記</h1>
      <p style="margin:0 0 22px;color:#453732;">這是一封測試信。每週一封，整理科技、文化與未來生活裡值得慢慢看的觀察。</p>
      ${items}
      <p style="margin:24px 0 0;color:#6d5d52;font-size:14px;">測試收件人：${escapeHtml(target)}</p>
    </div>
  </div>`;

const formData = new FormData();
formData.set("from", process.env.NEWSLETTER_FROM);
formData.set("to", target);
formData.set("subject", `[TEST] Signal & Style 每週靈感筆記：${posts[0].title}`);
formData.set("html", html);

const response = await fetch(`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`, {
  method: "POST",
  headers: {
    Authorization: `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString("base64")}`,
  },
  body: formData,
});

const text = await response.text();
if (!response.ok) {
  throw new Error(`Mailgun ${response.status}: ${text}`);
}

const data = JSON.parse(text);
console.log(
  JSON.stringify(
    {
      ok: true,
      to: target,
      id: data.id || null,
      message: data.message || null,
      posts: posts.length,
    },
    null,
    2,
  ),
);
