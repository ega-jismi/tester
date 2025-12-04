"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import BookCard from "../../../components/BookCard";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence untuk Modal
import { useRouter } from "next/navigation";
import {
  FiShoppingCart,
  FiHeart,
  FiCheckCircle,
  FiTruck,
  FiShield,
  FiMinus,
  FiPlus,
  FiStar,
} from "react-icons/fi";
import useStore from "../../../store/store";
import { authClient } from "../../../lib/auth-client"; // Import Auth Client

export default function Detail({ params }) {
  const router = useRouter();

  // 1. Ambil Session User
  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [related, setRelated] = useState([]);

  // State UI
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Unwrap params
  const par = use(params);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/books/${par.id}`);
        const data = await response.json();

        if (data.success) {
          setBook(data.data.book);
          // Urutkan review dari yang terbaru (opsional, tergantung API)
          setReviewList(data.data.reviews || []);
          setRelated(data.data.related?.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [par.id]);

  const addToCart = useStore((s) => s.addToCart);

  // State Form Review
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [qty, setQty] = useState(1);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!book)
    return (
      <div className="p-10 text-center text-gray-500">Buku tidak ditemukan</div>
    );

  // Logika Harga
  const originalPrice = Number(book.price) || 0;
  const discount = book.discount || 0;
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount
    ? originalPrice - (originalPrice * discount) / 100
    : originalPrice;

  // --- LOGIKA BARU: SUBMIT ULASAN KE DATABASE ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Cek Login di Frontend
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!comment) return;
    setIsSubmitting(true);

    try {
      // 2. Kirim ke API
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: book.id,
          rating: Number(rating),
          text: comment,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        // 3. Update tampilan secara realtime (tanpa refresh)
        setReviewList([json.data, ...reviewList]);
        setComment("");
        setRating(5);
        alert("Ulasan berhasil dikirim!");
      } else {
        alert("Gagal: " + json.error);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdd = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    for (let i = 0; i < qty; i++) {
      addToCart({ ...book, price: finalPrice });
    }
  };

  const renderStars = (count) => {
    return (
      <div className="flex text-yellow-400 text-sm">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={
              i < count ? "fill-current" : "text-gray-300 dark:text-gray-600"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <section className="max-w-6xl mx-auto pb-10 px-4">
      {/* --- MODAL LOGIN (DICOBAKAN DARI BookCard) --- */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-sm w-full text-center shadow-2xl border border-gray-200 dark:border-slate-700"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-bookBlue rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🔒
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                Login Dulu Yuk!
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                Kamu harus masuk akun untuk menulis ulasan atau belanja.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="px-6 py-2 bg-bookBlue text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg"
                >
                  Login Sekarang
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BREADCRUMBS & CONTENT ATAS (Tetap Sama) */}
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-bookBlue transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/katalog" className="hover:text-bookBlue transition-colors">
          Katalog
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium truncate">
          {book.title}
        </span>
      </div>

      <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
        {/* GAMBAR */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-4 lg:col-span-4"
        >
          <div className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg sticky top-24">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </motion.div>

        {/* DETAIL INFO */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-8 lg:col-span-8"
        >
          <div className="mb-1">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-bookBlue dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {book.tags?.[0] || "Buku"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2 leading-tight">
            {book.title}
          </h1>
          <div className="flex items-center gap-4 text-sm mb-6">
            <span className="text-slate-600 dark:text-slate-400">
              Oleh:{" "}
              <span className="text-bookBlue font-semibold">{book.author}</span>
            </span>
            <div className="flex items-center text-yellow-400 gap-1">
              <FiStar className="fill-current" /> 4.8{" "}
              <span className="text-slate-400 ml-1 text-xs text-black dark:text-white">
                ({reviewList.length} Ulasan)
              </span>
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8">
            <div className="flex items-end gap-3 mb-4">
              <div className="text-4xl font-bold text-bookOrange">
                Rp {finalPrice.toLocaleString("id-ID")}
              </div>
              {hasDiscount && (
                <div className="mb-1">
                  <span className="text-sm text-slate-400 line-through mr-2">
                    Rp {originalPrice.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded">
                    Hemat {discount}%
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 h-12 w-fit">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 text-slate-500 hover:text-bookBlue"
                >
                  <FiMinus />
                </button>
                <span className="w-8 text-center font-bold text-slate-900 dark:text-white">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 text-slate-500 hover:text-bookBlue"
                >
                  <FiPlus />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 h-12 bg-bookBlue hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <FiShoppingCart className="w-5 h-5" /> Tambah Keranjang
              </button>
              <button className="h-12 w-12 border border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-500 transition-colors">
                <FiHeart className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-xs md:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex flex-col items-center gap-1 text-center">
                <FiCheckCircle className="text-green-500 w-5 h-5" />{" "}
                <span>100% Original</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <FiTruck className="text-bookBlue w-5 h-5" />{" "}
                <span>Kirim Cepat</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <FiShield className="text-purple-500 w-5 h-5" />{" "}
                <span>Transaksi Aman</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
              Deskripsi & Spesifikasi
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {book.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="block text-slate-400 text-xs uppercase">
                  ISBN
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {book.isbn || "-"}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="block text-slate-400 text-xs uppercase">
                  Penerbit
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {book.publisher || "-"}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="block text-slate-400 text-xs uppercase">
                  Halaman
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {book.pages || "-"} Halaman
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="block text-slate-400 text-xs uppercase">
                  Berat
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {book.weight || "-"} kg
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 my-12" />

      {/* AREA ULASAN */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-6 text-slate-900 dark:text-white">
            Ulasan Pembaca
          </h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {reviewList.length > 0 ? (
              reviewList.map((r) => (
                <div
                  key={r.id}
                  className="p-5 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="flex justify-between mb-2">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {r.user}
                    </div>
                    {renderStars(r.rating)}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    "{r.text}"
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">
                Belum ada ulasan. Jadilah yang pertama!
              </p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 h-fit">
          <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            Tulis Ulasan
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Nama Dihapus - Diganti Info Login */}
            {isLoggedIn ? (
              <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                Menulis sebagai:{" "}
                <span className="font-bold text-bookBlue">
                  {session.user.name}
                </span>
              </div>
            ) : (
              <div
                onClick={() => setShowLoginModal(true)}
                className="cursor-pointer text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30 flex items-center gap-2"
              >
                🔒 Silakan login untuk menulis ulasan
              </div>
            )}

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  disabled={!isLoggedIn}
                  className="p-1 transition-transform hover:scale-110 disabled:opacity-50"
                >
                  <FiStar
                    className={`w-8 h-8 ${rating >= num ? "fill-yellow-400 text-yellow-400" : "text-slate-300 dark:text-slate-600"}`}
                  />
                </button>
              ))}
            </div>

            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              disabled={!isLoggedIn}
              placeholder={
                isLoggedIn
                  ? "Bagaimana pendapat Anda tentang buku ini?"
                  : "Login dulu untuk mengisi..."
              }
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 outline-none focus:border-bookBlue transition-all disabled:cursor-not-allowed"
            ></textarea>

            <button
              type="submit"
              disabled={!isLoggedIn || isSubmitting}
              className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
            </button>
          </form>
        </div>
      </div>

      {/* REKOMENDASI */}
      <div>
        <h3 className="text-2xl font-serif font-bold mb-6 text-slate-900 dark:text-white border-l-4 border-bookBlue pl-4">
          Mungkin Anda Suka
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {related.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
