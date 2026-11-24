const dotenv = require("dotenv");

dotenv.config();

const required = ["PORT", "MONGO_URI"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`❌ Missing env variables: ${missing.join(", ")}`);
  process.exit(1);
}

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
};