import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth"; // Sesuaikan path auth kamu
import { headers } from "next/headers";
import db from "../../../lib/db";
import { orders, orderItems } from "../../../lib/db/schema";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    // 1. Cek User Login
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil Data dari Body Request
    const { items, total } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 3. Buat ID Pesanan Unik
    const orderId = `INV-${nanoid(8).toUpperCase()}`;

    // 4. Simpan ke Tabel Orders
    await db.insert(orders).values({
      id: orderId,
      userId: session.user.id,
      total: total,
      status: "Dikirim",
      createdAt: new Date(), // Waktu Asli Server
    });

    // 5. Simpan Detail Barang ke Tabel OrderItems
    const itemsToInsert = items.map((item) => ({
      id: nanoid(),
      orderId: orderId,
      bookId: item.id,
      qty: item.qty,
      price: item.price,
    }));

    await db.insert(orderItems).values(itemsToInsert);

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}