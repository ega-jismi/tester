import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth"; // Sesuaikan path jika perlu
import { headers } from "next/headers";
import db from "../../../../lib/db";
import { eq, and } from "drizzle-orm";
import { orders } from "../../../../lib/db/schema";

export async function GET(req, { params }) {
  // 1. Unwrap params (Next.js 15 requirement)
  const { id } = await params;

  try {
    // 2. Cek Session Login
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Query Database
    // Kita cari order berdasarkan ID order DAN ID user (agar user A tidak bisa intip order user B)
    const orderDetail = await db.query.orders.findFirst({
      where: and(eq(orders.id, id), eq(orders.userId, session.user.id)),
      with: {
        items: {
          with: {
            book: true, // Ambil info buku (judul, cover)
          },
        },
      },
    });

    if (!orderDetail) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: orderDetail });
  } catch (error) {
    console.error("Detail Order Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
