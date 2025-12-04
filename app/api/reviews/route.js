import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "../../../lib/auth"; // Sesuaikan path ke lib/auth
import db from "../../../lib/db";
import { reviews } from "../../../lib/db/schema";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    // 1. Cek User Login (Server Side Security)
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Anda harus login untuk menulis ulasan." },
        { status: 401 },
      );
    }

    // 2. Ambil data dari body request
    const body = await req.json();
    const { bookId, rating, text } = body;

    if (!bookId || !rating || !text) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 },
      );
    }

    // 3. Simpan ke Database
    // Kita gunakan session.user.name agar nama sesuai akun, bukan input manual
    const newReview = {
      id: nanoid(),
      bookId: bookId,
      user: session.user.name,
      rating: rating,
      text: text,
      createdAt: new Date(),
    };

    await db.insert(reviews).values(newReview);

    return NextResponse.json({ success: true, data: newReview });
  } catch (error) {
    console.error("Review Error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan ulasan" },
      { status: 500 },
    );
  }
}
