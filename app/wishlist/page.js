"use client";

import { useRouter } from "next/navigation";
import useStore from "../../store/store";
import { books } from "../../lib/mock"; // Kita ambil data buku master dari mock
import BookCard from "../../components/BookCard";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";

export default function Wishlist() {
  const router = useRouter();
  
  // 1. Ambil list ID buku yang disukai dari Store
  const wishlistIds = useStore((s) => s.wishlist);
  
  // 2. Filter data buku berdasarkan ID yang ada di wishlist
  // (Kita mencocokkan ID di store dengan data lengkap di mock/database)
  const wishlistBooks = books.filter(b => wishlistIds.includes(b.id));

  return (
    <section className="max-w-6xl mx-auto min-h-[60vh] py-8 px-4 md:px-6">
      {/* JUDUL HALAMAN */}
      <h1 className="text-3xl font-serif font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
        <FiHeart className="text-red-500" /> Wishlist Saya
      </h1>

      {/* KONDISI KOSONG */}
      {wishlistBooks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center shadow-sm"
        >
            <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 text-4xl text-red-500">
              💔
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Wishlist Masih Kosong
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Simpan buku favoritmu di sini agar mudah ditemukan nanti.
            </p>
            <button 
              onClick={() => router.push("/katalog")} 
              className="px-8 py-3 bg-bookBlue text-white font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-lg"
            >
               Cari Buku
            </button>
        </motion.div>
      ) : (
        /* LIST BUKU WISHLIST */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
           {wishlistBooks.map((b) => (
             <BookCard key={b.id} book={b} />
           ))}
        </div>
      )}
    </section>
  );
}