const {
  ensureMailingList,
  escapeHtml,
  getNewsletterConfig,
  sendEmail,
  validateNewsletterConfig,
} = require("./newsletter-utils");

const siteUrl = process.env.SITE_URL || "https://cellbedell-blog.netlify.app";

const loadLatestPosts = async () => {
  const response = await fetch(`${siteUrl.replace(/\/+$/, "")}/newsletter.json`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch newsletter.json: ${response.status}`);
  }

  const feed = await response.json();
  return Array.isArray(feed.posts) ? feed.posts.slice(0, 5) : [];
};

const renderDigest = (posts) => {
  const items = posts
    .map(
      (post) => `
        <article style="padding: 18px 0; border-top: 1px solid #e5d8c5;">
          <p style="margin: 0 0 6px; color: #b84f2f; font-size: 13px; letter-spacing: 0.08em;">${escapeHtml(post.date)}</p>
          <h2 style="margin: 0 0 8px; font-size: 22px; line-height: 1.25;">
            <a href="${escapeHtml(post.url)}" style="color: #211814; text-decoration: none;">${escapeHtml(post.title)}</a>
          </h2>
          <p style="margin: 0 0 10px; color: #453732;">${escapeHtml(post.summary)}</p>
          <p style="margin: 0;"><a href="${escapeHtml(post.url)}" style="color: #b84f2f;">閱讀文章</a></p>
        </article>`,
    )
    .join("");

  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #211814; line-height: 1.7; background: #f9f2e8; padding: 28px;">
      <div style="max-width: 680px; margin: 0 auto; background: #fff8ef; border: 1px solid #e5d8c5; border-radius: 18px; padding: 28px;">
        <p style="margin: 0 0 10px; color: #b84f2f; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;">Signal &amp; Style Weekly</p>
        <h1 style="margin: 0 0 14px; font-size: 34px; line-height: 1.15;">本週靈感筆記</h1>
        <p style="margin: 0 0 22px; color: #453732;">每週一封，整理科技、文化與未來生活裡值得慢慢看的觀察。</p>
        ${items}
        <p style="margin: 24px 0 0; color: #6d5d52; font-size: 14px;">
          你收到這封信，是因為你訂閱了 Signal &amp; Style 每週靈感筆記。
        </p>
      </div>
    </div>`;
};

exports.handler = async () => {
  const config = getNewsletterConfig();
  const missingConfig = validateNewsletterConfig(config, ["apiKey", "domain", "from", "notifyTo", "listAddress"]);

  if (missingConfig.length > 0) {
    return {
      statusCode: 500,
      body: `Missing newsletter config: ${missingConfig.join(", ")}`,
    };
  }

  const posts = await loadLatestPosts();
  if (posts.length === 0) {
    return {
      statusCode: 200,
      body: "No published posts to send.",
    };
  }

  await ensureMailingList(config);
  await sendEmail(config, {
    to: config.listAddress,
    subject: `Signal & Style 每週靈感筆記：${posts[0].title}`,
    html: renderDigest(posts),
  });

  await sendEmail(config, {
    to: config.notifyTo,
    subject: "Signal & Style 每週電子報已送出",
    html: `
      <div style="font-family: Georgia, serif; color: #211814; line-height: 1.7;">
        <h1>每週電子報已送出</h1>
        <p>收件名單：${escapeHtml(config.listAddress)}</p>
        <p>文章數：${posts.length}</p>
      </div>
    `,
  });

  return {
    statusCode: 200,
    body: `Sent weekly newsletter to ${config.listAddress} with ${posts.length} post(s).`,
  };
};
