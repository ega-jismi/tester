"use client";

import { useState } from "react";
import { authClient } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import { useSearchParams } from 'next/navigation'

export default function ResetPassword() {
    const searchParams = useSearchParams()
 
  const token = searchParams.get('token')
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Password konfirmasi tidak cocok!");
      return;
    }
    setLoading(true);

    try {
      // Better-Auth otomatis mendeteksi token dari URL
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token
      });

      if (error) {
        alert("Gagal reset: " + error.message);
      } else {
        alert("Sukses! Password berhasil diubah.");
        router.push("/auth/login");
      }
    } catch (err) {
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Buat Password Baru</h1>
          <p className="text-slate-500 text-sm">Masukkan password baru untuk akun Anda.</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password Baru</label>
            <div className="relative">
                <FiLock className="absolute left-3 top-3 text-slate-400" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white" placeholder="••••••••" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Ulangi Password</label>
            <div className="relative">
                <FiCheckCircle className="absolute left-3 top-3 text-slate-400" />
                <input type="password" required value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white" placeholder="••••••••" />
            </div>
          </div>

          <button disabled={loading} className="w-full py-3 bg-bookBlue hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg mt-4 transition-all disabled:opacity-70">
            {loading ? "Menyimpan..." : "Simpan Password"}
          </button>
        </form>
      </div>
    </div>
  );
}