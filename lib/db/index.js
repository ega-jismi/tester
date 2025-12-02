import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema"; // <--- 1. Import Schema di sini

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// 2. Masukkan schema ke dalam konfigurasi drizzle
const db = drizzle(client, { schema }); 

export default db;