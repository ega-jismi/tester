import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import db from "../../../lib/db";
import { eq, desc } from "drizzle-orm"; // Pastikan import desc untuk urutan terbaru
import { orders } from "../../../lib/db/schema"; // Import schema

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // QUERY DRIZZLE: Ambil orders milik user ini beserta item dan info bukunya
    const userOrders = await db.query.orders.findMany({
      where: eq(orders.userId, session.user.id),
      orderBy: [desc(orders.createdAt)], // Urutkan dari yang terbaru
      with: {
        items: {
          with: {
            book: true, // Join ke tabel buku untuk dapat cover & judul
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: userOrders });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}