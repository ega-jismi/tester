import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "../../../lib/auth"; // Path ke konfigurasi auth
import db from "../../../lib/db";         // Path ke database
import { user } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";

// 1. GET: Ambil Data Profil Lengkap
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Ambil data user langsung dari database (agar dapat phone & address)
  const userData = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);
  
  return NextResponse.json({ success: true, data: userData[0] });
}

// 2. PATCH: Update Data Profil
export async function PATCH(req) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    // Update ke Database
    await db.update(user).set({
        name: body.name,
        phoneNumber: body.phone, // Pastikan nama field sesuai schema
        address: body.address,
        updatedAt: new Date(),
    }).where(eq(user.id, session.user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Gagal update profil" }, { status: 500 });
  }
}