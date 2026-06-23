const { listArticleViews } = require("./analytics-utils");

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

const hasIdentityUser = (event, context) => {
  if (context?.clientContext?.user) return true;
  if (process.env.ALLOW_LOCAL_ADMIN_ANALYTICS === "true") return true;
  return false;
};

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers: { Allow: "GET" }, body: "Method Not Allowed" };
  }

  if (!hasIdentityUser(event, context)) {
    return json(401, { error: "Netlify Identity login required." });
  }

  try {
    return json(200, await listArticleViews());
  } catch (error) {
    console.error(error);
    return json(500, { error: "Unable to load analytics." });
  }
};
