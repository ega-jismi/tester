import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./db/index";
import * as schema from "./db/schema";
import { Resend } from "resend"; 
import "dotenv/config"

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    
    // --- FUNGSI PENGIRIM RESET PASSWORD ---
    async sendResetPassword({ user, url, token }) {
      try {
        await resend.emails.send({
          from: "Paper Bloom <onboarding@resend.dev>", // Ganti jika punya domain sendiri
          to: user.email,
          subject: "Reset Password - Paper Bloom",
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2>Reset Password</h2>
              <p>Halo ${user.name},</p>
              <p>Klik tombol di bawah ini untuk mereset password akun Anda:</p>
              <a href="${url}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password Sekarang
              </a>
              <p style="margin-top: 20px; font-size: 12px; color: grey;">
                Jika tombol tidak berfungsi, salin link ini: <br>${url}
              </p>
            </div>
          `,
        });
        console.log("Email reset terkirim ke:", user.email);
      } catch (err) {
        console.error("Gagal kirim email reset:", err);
      }
    },
  },

  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000", 
});