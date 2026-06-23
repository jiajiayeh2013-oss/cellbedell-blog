const {
  addListMember,
  escapeHtml,
  getNewsletterConfig,
  sendEmail,
  validateNewsletterConfig,
} = require("./newsletter-utils");

const parseBody = (event) => {
  const contentType = event.headers["content-type"] || event.headers["Content-Type"] || "";

  if (contentType.includes("application/json")) {
    return JSON.parse(event.body || "{}");
  }

  const params = new URLSearchParams(event.body || "");
  return Object.fromEntries(params.entries());
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: "Method Not Allowed",
    };
  }

  const config = getNewsletterConfig();
  const missingConfig = validateNewsletterConfig(config, ["apiKey", "domain", "from", "notifyTo", "listAddress"]);

  if (missingConfig.length > 0) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: `
        <h1>訂閱功能尚未完成設定</h1>
        <p>請在 Netlify 設定 MAILGUN_API_KEY、MAILGUN_DOMAIN、NEWSLETTER_FROM、NEWSLETTER_NOTIFY_TO。若要指定名單地址，也可設定 NEWSLETTER_LIST_ADDRESS。</p>
        <p><a href="/">回到首頁</a></p>
      `,
    };
  }

  try {
    const body = parseBody(event);
    const email = String(body.email || "").trim().toLowerCase();
    const cadence = String(body.cadence || "weekly").trim().toLowerCase();
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

    await addListMember(config, email);

    await sendEmail(config, {
      to: [config.notifyTo],
      subject: "Signal & Style 有新的訂閱者",
      html: `
        <div style="font-family: Georgia, serif; color: #211814; line-height: 1.7;">
          <h1>新的訂閱者</h1>
          <p>Email：${safeEmail}</p>
          <p>寄送頻率：${escapeHtml(cadence === "weekly" ? "每週一封" : cadence)}</p>
          <p>Mailgun 名單：${escapeHtml(config.listAddress)}</p>
        </div>
      `,
    });

    await sendEmail(config, {
      to: [email],
      subject: "歡迎訂閱 Signal & Style",
      html: `
        <div style="font-family: Georgia, serif; color: #211814; line-height: 1.7;">
          <h1>歡迎訂閱 Signal & Style</h1>
          <p>謝謝你一起收集科技、文化與未來生活裡值得被記住的新點子。</p>
          <p>我們會以每週一封的節奏，從 AI、新創、品牌、美感與生活場景裡，挑出值得慢慢看的觀察。</p>
          <p><a href="https://cellbedell-blog.netlify.app">回到 Signal & Style</a></p>
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
