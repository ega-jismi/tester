"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import useStore from "../store/store";
import { useState } from "react";
import { FiEye, FiHeart } from "react-icons/fi";

export default function BookCard({ book, onQuickView }) {
  const router = useRouter();
  const add = useStore((s) => s.addToCart);
  const toggleWish = useStore((s) => s.toggleWishlist);
  const wishlist = useStore((s) => s.wishlist);
  const isLoggedIn = useStore((s) => s.isLoggedIn); // 1. AMBIL STATUS LOGIN

  const [imgError, setImgError] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // 2. STATE MODAL LOGIN

  const isWishlisted = wishlist.includes(book.id);

  const originalPrice = Number(book.price) || 0;
  const discount = book.discount || 0;
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount
    ? originalPrice - (originalPrice * discount) / 100
    : originalPrice;

  // 3. FUNGSI CEK LOGIN
  const checkLogin = (action) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      action();
    }
  };

  function handleWish() {
    checkLogin(() => {
      toggleWish(book.id);
      if (!isWishlisted) {
        setShowHeartAnim(true);
        setTimeout(() => setShowHeartAnim(false), 600);
      }
    });
  }

  function handleAddToCart() {
    checkLogin(() => {
      add({ ...book, price: finalPrice });
    });
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ y: -4 }}
        className="relative rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex flex-col h-full group transition-all duration-300 hover:shadow-xl hover:border-blue-200"
      >
        {hasDiscount && (
          <div className="absolute top-0 left-0 z-10 bg-bookRed text-white text-[10px] font-bold px-3 py-1 rounded-br-lg shadow-sm">
            -{discount}%
          </div>
        )}

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onQuickView && onQuickView(book)}
            className="bg-white/90 dark:bg-slate-900/90 text-bookBlue p-3 rounded-full shadow-lg hover:scale-110 transition-transform backdrop-blur-sm border border-blue-100"
            title="Quick View"
          >
            <FiEye className="w-5 h-5" />
          </button>
        </div>

        {showHeartAnim && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            className="absolute inset-0 m-auto w-fit h-fit text-4xl z-20"
          >
            ❤️
          </motion.div>
        )}

        <Link
          href={`/detail/${book.id}`}
          className="block relative aspect-[2/3] overflow-hidden bg-gray-100 rounded-t-lg"
        >
          <motion.img
            src={imgError ? "/fallback.jpg" : book.cover}
            alt={book.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="p-4 flex flex-col flex-1">
          <h3
            className="text-base font-serif font-bold leading-tight text-slate-900 dark:text-white mb-1 line-clamp-2"
            title={book.title}
          >
            {book.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            {book.author}
          </p>

          <div className="mt-auto pt-3 border-t border-gray-100 dark:border-slate-700">
            {hasDiscount ? (
              <div className="flex flex-col mb-2">
                <span className="text-xs text-gray-400 line-through">
                  Rp {originalPrice.toLocaleString("id-ID")}
                </span>
                <span className="text-lg font-bold text-bookOrange">
                  Rp {finalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            ) : (
              <div className="text-lg font-bold text-bookOrange mb-2">
                Rp {originalPrice.toLocaleString("id-ID")}
              </div>
            )}

            <div className="flex gap-2 justify-between">
              <button
                onClick={handleWish}
                className={`p-2 rounded-md transition-colors border ${
                  isWishlisted
                    ? "text-red-500 bg-red-50 border-red-200"
                    : "text-gray-400 hover:text-red-500 hover:bg-red-50 border-transparent hover:border-red-100"
                }`}
              >
                <FiHeart
                  className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`}
                />
              </button>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-2 bg-bookBlue hover:bg-blue-900 text-white rounded-md text-xs font-bold shadow-sm transition-colors"
              >
                + Keranjang
              </button>
            </div>
          </div>
        </div>
      </motion.article>

      {/* 4. MODAL LOGIN DULU YUK */}
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
                Kamu harus masuk akun untuk menambahkan barang ke keranjang atau
                wishlist.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                >
                  Nanti Saja
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
    </>
  );
}
