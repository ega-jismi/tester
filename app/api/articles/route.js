import db from "../../../lib/db";
import { articles } from "../../../lib/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(articles).limit(15);
    return Response.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Kesalahan server" }, { status: 500 });
  }
}
