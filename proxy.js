import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request) {
  // 1. Cek session user
  const hasToken = await auth.api.getSession({
        headers: await headers()
    })

  // 2. Cek apakah user sedang berada di halaman Authentication (Login, Register, Lupa Password)
  // Perubahan: Menggunakan startsWith("/auth") agar mencakup semua halaman auth
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (request.nextUrl.pathname.startsWith("/images")) {
    return NextResponse.next();
  }

  // SKENARIO A: User BELUM login, tapi mencoba masuk ke halaman SELAIN auth
  // (Misal: User mau ke /profile atau /orders tapi belum login) -> Lempar ke Login
  if (!hasToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // SKENARIO B: User SUDAH login, tapi mencoba buka halaman AUTH lagi
  // (Misal: User sudah login tapi iseng buka /auth/login atau /auth/forgot-password) -> Lempar ke Home
  if (hasToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/images|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};