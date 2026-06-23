const crypto = require("node:crypto");

const SERIES_RULES = [
  {
    series: "旅館生活科技",
    keywords: ["旅館", "飯店", "hotel", "hospitality", "concierge", "入住", "前台", "旅宿"],
  },
  {
    series: "AI 與人文",
    keywords: ["ai 與人文", "人文", "倫理", "教育", "創作", "關係", "判斷"],
  },
  {
    series: "VivaTech / 科技展觀察",
    keywords: ["vivatech", "展會", "科技展", "新創", "startup", "巴黎"],
  },
  {
    series: "國際科技媒體觀察",
    keywords: ["techcrunch", "wired", "the verge", "媒體", "報導", "新聞"],
  },
  {
    series: "時尚與生活",
    keywords: ["時尚", "生活", "品牌", "美感", "穿搭", "空間"],
  },
];

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

const text = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "text/plain; charset=utf-8" },
  body,
});

const getHeader = (headers, name) => {
  const lowerName = name.toLowerCase();
  const match = Object.entries(headers || {}).find(([key]) => key.toLowerCase() === lowerName);
  return match ? match[1] : "";
};

const getRawBody = (event) => {
  if (!event.body) return "";
  return event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
};

const verifySlackRequest = (event, rawBody) => {
  const signingSecret = process.env.SLACK_SIGNING_SECRET;

  if (!signingSecret) {
    if (process.env.SLACK_SKIP_SIGNATURE_VERIFICATION === "true") {
      return { ok: true, skipped: true };
    }

    return { ok: false, reason: "Missing SLACK_SIGNING_SECRET" };
  }

  const timestamp = getHeader(event.headers, "x-slack-request-timestamp");
  const signature = getHeader(event.headers, "x-slack-signature");
  const now = Math.floor(Date.now() / 1000);

  if (!timestamp || !signature) {
    return { ok: false, reason: "Missing Slack signature headers" };
  }

  if (Math.abs(now - Number(timestamp)) > 60 * 5) {
    return { ok: false, reason: "Slack request timestamp is too old" };
  }

  const base = `v0:${timestamp}:${rawBody}`;
  const expected = `v0=${crypto.createHmac("sha256", signingSecret).update(base).digest("hex")}`;
  const expectedBuffer = Buffer.from(expected, "utf8");
  const actualBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== actualBuffer.length) {
    return { ok: false, reason: "Slack signature length mismatch" };
  }

  if (!crypto.timingSafeEqual(expectedBuffer, actualBuffer)) {
    return { ok: false, reason: "Slack signature mismatch" };
  }

  return { ok: true };
};

const parseBody = (event, rawBody) => {
  const contentType = getHeader(event.headers, "content-type");

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody || "{}");
  }

  const params = new URLSearchParams(rawBody || "");
  return Object.fromEntries(params.entries());
};

const normalizeSlackPayload = (body) => {
  if (body.type === "url_verification" && body.challenge) {
    return { type: "url_verification", challenge: body.challenge };
  }

  if (body.payload) {
    return normalizeSlackPayload(JSON.parse(body.payload));
  }

  if (body.command) {
    return {
      type: "slash_command",
      text: String(body.text || "").trim(),
      user: body.user_name || body.user_id || "Slack user",
      channel: body.channel_name || body.channel_id || "",
      responseUrl: body.response_url || "",
    };
  }

  if (body.event) {
    const event = body.event;
    return {
      type: "event",
      text: String(event.text || "").trim(),
      user: event.user || "Slack user",
      channel: event.channel || "",
    };
  }

  return {
    type: "message",
    text: String(body.text || body.message || "").trim(),
    user: body.user_name || body.user || "Slack user",
    channel: body.channel_name || body.channel || "",
  };
};

const detectSeries = (input) => {
  const normalized = input.toLowerCase();
  const match = SERIES_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())),
  );
  return match ? match.series : "VivaTech / 科技展觀察";
};

const extractUrls = (input) => {
  const matches = input.match(/https?:\/\/[^\s<>)]+/g);
  return matches || [];
};

const fallbackDraft = ({ message, series }) => {
  const urls = extractUrls(message);
  const topic = message.replace(/https?:\/\/[^\s<>)]+/g, "").trim() || "今日生活科技觀察";

  return [
    `標題：${series}｜${topic.slice(0, 32)}`,
    "",
    "摘要：這篇可以從一個現場觀察或連結出發，整理它背後的生活場景、技術變化，以及台灣讀者能帶走的判斷。",
    "",
    "大綱：",
    "1. 先寫看到的現象：產品、服務、品牌或場景正在改變什麼。",
    "2. 再寫為什麼值得注意：它不只是新奇，而是改變一段日常流程。",
    "3. 補上台灣讀者的生活連結：旅館、工作、城市、消費或創作場景。",
    "4. 最後留下下一篇可追蹤的問題。",
    "",
    "待補來源：",
    urls.length > 0 ? urls.map((url) => `- ${url}`).join("\n") : "- 請補 3 到 5 個可靠來源後再發布。",
  ].join("\n");
};

const buildPrompt = ({ message, series, user }) => `
你是 Signal & Style 的繁體中文編輯助手。請根據 Slack 使用者 ${user} 的素材產生一篇可審稿的部落格草稿。

部落格風格：科技、設計、時尚、新創、生活方式與未來城市的混合觀察。不要寫成新聞翻譯，要回到生活場景與台灣讀者能理解的判斷。

系列：${series}
Slack 素材：
${message}

請輸出：
1. 建議標題
2. 副標
3. 文章摘要
4. 3 到 5 段繁體中文草稿
5. 需要補查的來源清單
6. 發布前風險提醒
`;

const callOpenAI = async ({ message, series, user }) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    return {
      generated: false,
      draft: fallbackDraft({ message, series }),
      note: "尚未設定 OPENAI_API_KEY，已先回覆規則版草稿骨架。",
    };
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: buildPrompt({ message, series, user }),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const draft =
    data.output_text ||
    (Array.isArray(data.output)
      ? data.output
          .flatMap((item) => item.content || [])
          .map((item) => item.text || "")
          .filter(Boolean)
          .join("\n")
      : "");

  return {
    generated: true,
    draft: draft || fallbackDraft({ message, series }),
    note: `已使用 ${model} 產生草稿。`,
  };
};

const truncateForSlack = (value, maxLength = 2800) => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 40)}\n\n...草稿過長，請到後台或下一步 worker 查看全文。`;
};

const formatSlackResponse = ({ draft, generated, note, series }) => ({
  response_type: "ephemeral",
  text: `已建立 ${series} 草稿`,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Signal & Style 草稿已建立*\n系列：*${series}*\n${note}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `\`\`\`\n${truncateForSlack(draft)}\n\`\`\``,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: generated
            ? "下一步：回覆「修改：...」調整草稿，或回到 Codex/後台確認後發布。"
            : "下一步：設定 OPENAI_API_KEY 後可產生完整草稿；發布前仍需人工確認來源與圖片授權。",
        },
      ],
    },
  ],
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return text(405, "Method Not Allowed");
  }

  const rawBody = getRawBody(event);
  const verification = verifySlackRequest(event, rawBody);

  if (!verification.ok) {
    console.warn(verification.reason);
    return text(401, "Invalid Slack signature");
  }

  try {
    const body = parseBody(event, rawBody);
    const payload = normalizeSlackPayload(body);

    if (payload.type === "url_verification") {
      return text(200, payload.challenge);
    }

    if (!payload.text) {
      return json(200, {
        response_type: "ephemeral",
        text: "請傳入文章主題、連結或現場觀察，例如：今天寫旅館生活科技，主題是 AI concierge。",
      });
    }

    const series = detectSeries(payload.text);
    const result = await callOpenAI({
      message: payload.text,
      series,
      user: payload.user,
    });

    return json(200, formatSlackResponse({ ...result, series }));
  } catch (error) {
    console.error(error);
    return json(200, {
      response_type: "ephemeral",
      text: `草稿產生失敗：${error.message}`,
    });
  }
};
