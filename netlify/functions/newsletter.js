const DEFAULT_MAILGUN_API_BASE_URL = "https://api.mailgun.net";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const parseBody = (event) => {
  const contentType = event.headers["content-type"] || event.headers["Content-Type"] || "";

  if (contentType.includes("application/json")) {
    return JSON.parse(event.body || "{}");
  }

  const params = new URLSearchParams(event.body || "");
  return Object.fromEntries(params.entries());
};

const sendEmail = async ({ apiBaseUrl, apiKey, domain, from, to, subject, html }) => {
  const formData = new FormData();
  formData.set("from", from);
  formData.set("to", Array.isArray(to) ? to.join(",") : String(to));
  formData.set("subject", subject);
  formData.set("html", html);

  const response = await fetch(`${apiBaseUrl}/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mailgun error ${response.status}: ${errorText}`);
  }

  return response.json();
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: "Method Not Allowed",
    };
  }

  const apiBaseUrl = (process.env.MAILGUN_API_BASE_URL || DEFAULT_MAILGUN_API_BASE_URL).replace(/\/+$/, "");
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const from = process.env.NEWSLETTER_FROM;
  const notifyTo = process.env.NEWSLETTER_NOTIFY_TO;

  if (!apiKey || !domain || !from || !notifyTo) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: `
        <h1>訂閱功能尚未完成設定</h1>
        <p>請在 Netlify 設定 MAILGUN_API_KEY、MAILGUN_DOMAIN、NEWSLETTER_FROM、NEWSLETTER_NOTIFY_TO 後再測試。</p>
        <p><a href="/">回到首頁</a></p>
      `,
    };
  }

  try {
    const body = parseBody(event);
    const email = String(body.email || "").trim().toLowerCase();
    const botField = String(body["bot-field"] || "").trim();

    if (botField) {
      return {
        statusCode: 303,
        headers: { Location: "/thanks.html" },
        body: "",
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: `
          <h1>Email 格式不正確</h1>
          <p>請回到首頁重新輸入 email。</p>
          <p><a href="/">回到首頁</a></p>
        `,
      };
    }

    const safeEmail = escapeHtml(email);

    await sendEmail({
      apiBaseUrl,
      apiKey,
      domain,
      from,
      to: [notifyTo],
      subject: "Cellbedell Blog 有新的訂閱者",
      html: `
        <div style="font-family: Georgia, serif; color: #211814; line-height: 1.7;">
          <h1>新的訂閱者</h1>
          <p>Email：${safeEmail}</p>
        </div>
      `,
    });

    await sendEmail({
      apiBaseUrl,
      apiKey,
      domain,
      from,
      to: [email],
      subject: "歡迎訂閱 Cellbedell Blog",
      html: `
        <div style="font-family: Georgia, serif; color: #211814; line-height: 1.7;">
          <h1>歡迎訂閱 Cellbedell Blog</h1>
          <p>謝謝你一起收集科技、文化與未來生活裡值得被記住的新點子。</p>
          <p>下一封靈感筆記，我們會從 AI、新創、品牌、美感與生活場景裡，挑出值得慢慢看的觀察。</p>
          <p><a href="https://cellbedell-blog.netlify.app">回到 Cellbedell Blog</a></p>
        </div>
      `,
    });

    return {
      statusCode: 303,
      headers: { Location: "/thanks.html" },
      body: "",
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: `
        <h1>訂閱信暫時寄不出去</h1>
        <p>我們已經知道這個問題，請稍後再試。</p>
        <p><a href="/">回到首頁</a></p>
      `,
    };
  }
};
