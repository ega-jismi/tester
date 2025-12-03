"use client";

import { useState } from "react";
import { authClient } from "../../../lib/auth-client";
import Link from "next/link";
import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Memanggil API Better-Auth sesuai dokumentasi
    const { data, error } = await authClient.requestPasswordReset({
      email: email,
      redirectTo: "/auth/reset-password", // Redirect ke sini setelah klik link di email
    });

    if (error) {
      alert("Gagal: " + error);
    } else {
      setIsSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
        
        {!isSent ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Lupa Password?</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Masukkan email Anda, kami akan mengirimkan link reset password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><FiMail /></div>
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-bookBlue outline-none" 
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full py-3 bg-bookBlue hover:bg-blue-900 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-70"
              >
                {loading ? "Memproses..." : "Kirim Link Reset"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <FiCheckCircle />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Cek Email Anda</h2>
            <p className="text-slate-500 mb-6 text-sm">
                Kami telah mengirimkan link reset ke <b>{email}</b>. Silakan cek inbox atau folder spam Anda.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/auth/login" className="text-sm text-slate-500 hover:text-bookBlue flex items-center justify-center gap-2">
            <FiArrowLeft /> Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
}