const { incrementArticleView } = require("./analytics-utils");

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

const parseBody = (event) => {
  try {
    return JSON.parse(event.body || "{}");
  } catch (error) {
    return {};
  }
};

const isBot = (userAgent = "") => /bot|crawler|spider|preview|facebookexternalhit|slackbot|twitterbot|linkedinbot/i.test(userAgent);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { Allow: "POST" }, body: "Method Not Allowed" };
  }

  const userAgent = event.headers["user-agent"] || event.headers["User-Agent"] || "";
  if (isBot(userAgent)) return { statusCode: 204, body: "" };

  const body = parseBody(event);
  const requestPath = String(body.path || "").trim();

  if (!requestPath || requestPath.includes("/admin/") || !/(^|\/)posts\/[^/]+\.html$/.test(requestPath)) {
    return json(400, { error: "Only article page views can be tracked." });
  }

  if (!body.slug || !body.locale || !body.title) {
    return json(400, { error: "Missing article metadata." });
  }

  try {
    await incrementArticleView({
      locale: body.locale,
      slug: body.slug,
      path: requestPath,
      series: body.series,
      title: body.title,
    });
    return { statusCode: 204, body: "" };
  } catch (error) {
    console.error(error);
    return json(500, { error: "Unable to track view." });
  }
};
