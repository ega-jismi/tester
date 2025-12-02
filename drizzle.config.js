import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./lib/db/schema.js",
  out: "./lib/db/migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
};
