const DEFAULT_MAILGUN_API_BASE_URL = "https://api.mailgun.net";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getNewsletterConfig = () => {
  const apiBaseUrl = (process.env.MAILGUN_API_BASE_URL || DEFAULT_MAILGUN_API_BASE_URL).replace(/\/+$/, "");
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const from = process.env.NEWSLETTER_FROM;
  const notifyTo = process.env.NEWSLETTER_NOTIFY_TO;
  const listAddress = process.env.NEWSLETTER_LIST_ADDRESS || (domain ? `weekly@${domain}` : "");

  return { apiBaseUrl, apiKey, domain, from, notifyTo, listAddress };
};

const validateNewsletterConfig = (config, required = ["apiKey", "domain", "from", "notifyTo"]) =>
  required.filter((key) => !config[key]);

const mailgunFetch = async (config, path, formEntries) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(formEntries)) {
    if (value !== undefined && value !== null && value !== "") formData.set(key, value);
  }

  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${config.apiKey}`).toString("base64")}`,
    },
    body: formData,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const error = new Error(`Mailgun error ${response.status}: ${text}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

const ensureMailingList = async (config) => {
  try {
    await mailgunFetch(config, "/v3/lists", {
      address: config.listAddress,
      name: "Signal & Style Weekly Newsletter",
      description: "Weekly Signal & Style field note subscribers",
      access_level: "readonly",
    });
  } catch (error) {
    const message = JSON.stringify(error.data || {}).toLowerCase();
    if (error.status === 400 && (message.includes("already") || message.includes("duplicate"))) return;
    throw error;
  }
};

const addListMember = async (config, email) => {
  await ensureMailingList(config);
  return mailgunFetch(config, `/v3/lists/${encodeURIComponent(config.listAddress)}/members`, {
    address: email,
    subscribed: "yes",
    upsert: "yes",
    vars: JSON.stringify({ cadence: "weekly", source: "cellbedell-blog" }),
  });
};

const sendEmail = async (config, { to, subject, html }) =>
  mailgunFetch(config, `/v3/${config.domain}/messages`, {
    from: config.from,
    to: Array.isArray(to) ? to.join(",") : String(to),
    subject,
    html,
  });

module.exports = {
  addListMember,
  ensureMailingList,
  escapeHtml,
  getNewsletterConfig,
  sendEmail,
  validateNewsletterConfig,
};
