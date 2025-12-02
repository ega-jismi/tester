import db from "../../../lib/db";
import * as schema from "../../../lib/db/schema.js";

export async function GET() {
  try {
    const data = await db.select().from(schema.books).limit(10);

    return Response.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Kesalahan server" }, { status: 500 });
  }
}
