"use client";

import { useState, useEffect } from "react";
import { FiUser, FiMapPin, FiPhone, FiMail, FiSave, FiCamera } from "react-icons/fi";
import { authClient } from "../../lib/auth-client"; 
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  // Ambil session dasar untuk cek login
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    address: ""
  });

  // 1. Fetch Data Lengkap dari Database (termasuk Phone & Address)
  useEffect(() => {
    async function fetchProfile() {
      if (session?.user) {
        try {
          const res = await fetch("/api/profile");
          const json = await res.json();
          if (json.success && json.data) {
            setFormData({
              name: json.data.name || "",
              email: json.data.email || "", // Email biasanya read-only
              image: json.data.image || "",
              phone: json.data.phoneNumber || "", // Perhatikan nama field dari DB
              address: json.data.address || "",
            });
          }
        } catch (e) {
          console.error("Gagal ambil profil:", e);
        } finally {
          setIsFetching(false);
        }
      }
    }
    fetchProfile();
  }, [session]);

  // 2. Fungsi Simpan (Update ke Database)
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Profil berhasil diperbarui!");
        router.refresh(); // Refresh halaman
      } else {
        alert("Gagal memperbarui profil.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className="min-h-screen flex items-center justify-center">Memuat data...</div>;
  if (!session) return <div className="min-h-screen flex items-center justify-center">Silakan login.</div>;

  return (
    <section className="max-w-4xl mx-auto min-h-screen pb-10">
      <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-8 border-b pb-4 border-slate-200 dark:border-slate-700">
        Profil Saya
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* KIRI: FOTO PROFIL */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-sm">
            {formData.image ? (
                <img src={formData.image} alt="Profile" className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-50"/>
            ) : (
                <div className="w-32 h-32 mx-auto bg-bookBlue rounded-full flex items-center justify-center text-4xl text-white font-bold mb-4">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                </div>
            )}
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">{formData.name}</h2>
            <p className="text-sm text-slate-500 mb-4">{formData.email}</p>
            <button className="flex items-center justify-center gap-2 text-sm text-bookBlue font-bold hover:underline mx-auto">
                <FiCamera /> Ubah Foto
            </button>
          </div>
        </div>

        {/* KANAN: FORM DATA DIRI */}
        <div className="md:col-span-2">
          <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NAMA */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nama Lengkap</label>
                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-bookBlue transition-all">
                        <FiUser className="text-slate-400 mr-3" />
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-transparent outline-none text-slate-900 dark:text-white text-sm"
                        />
                    </div>
                </div>
                
                {/* TELEPON - SUDAH DIAKTIFKAN */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nomor Telepon</label>
                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-bookBlue transition-all">
                        <FiPhone className="text-slate-400 mr-3" />
                        <input 
                            type="text" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="0812-xxxx-xxxx"
                            className="w-full bg-transparent outline-none text-slate-900 dark:text-white text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* EMAIL (READ ONLY) */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
                <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-slate-50 dark:bg-slate-900">
                    <FiMail className="text-slate-400 mr-3" />
                    <input type="text" value={formData.email} disabled className="w-full bg-transparent outline-none text-slate-500 cursor-not-allowed text-sm"/>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">*Email tidak dapat diubah</p>
            </div>

            {/* ALAMAT - SUDAH DIAKTIFKAN */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Alamat Pengiriman</label>
                <div className="flex items-start border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-bookBlue transition-all">
                    <FiMapPin className="text-slate-400 mr-3 mt-1" />
                    <textarea 
                        rows="3" 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="Masukkan alamat lengkap..."
                        className="w-full bg-transparent outline-none text-slate-900 dark:text-white text-sm resize-none"
                    ></textarea>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-right">
                <button type="submit" disabled={isLoading} className="px-6 py-3 bg-bookBlue hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 ml-auto">
                    {isLoading ? "Menyimpan..." : <><FiSave /> Simpan Perubahan</>}
                </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}