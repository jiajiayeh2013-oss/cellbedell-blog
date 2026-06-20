const required = ["SLACK_SIGNING_SECRET"];
const recommended = ["OPENAI_API_KEY", "OPENAI_MODEL"];

const status = {
  required: Object.fromEntries(required.map((key) => [key, Boolean(process.env[key])])),
  recommended: Object.fromEntries(recommended.map((key) => [key, Boolean(process.env[key])])),
};

const missingRequired = required.filter((key) => !process.env[key]);

console.log(JSON.stringify(status, null, 2));

if (missingRequired.length > 0) {
  console.error(`Missing required environment variables: ${missingRequired.join(", ")}`);
  process.exitCode = 1;
}
