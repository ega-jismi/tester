"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiPrinter,
  FiPackage,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

export default function OrderDetail({ params }) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  async function fetchOrder() {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const json = await res.json();
      if (json.success) {
        setOrder(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date(dateString));
  };

  if (loading)
    return <div className="p-10 text-center">Memuat detail pesanan...</div>;
  if (!order)
    return <div className="p-10 text-center">Pesanan tidak ditemukan.</div>;

  return (
    <section className="max-w-3xl mx-auto min-h-screen pb-10 px-4 print:p-0 print:max-w-none">
      {/* 1. Tombol Kembali (Sembunyikan saat print) */}
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-bookBlue mb-6 text-sm font-bold print:hidden"
      >
        <FiArrowLeft /> Kembali ke Riwayat
      </Link>

      {/* 2. Bagian Utama Invoice */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden print:shadow-none print:border-none print:rounded-none">
        {/* === HEADER INVOICE === */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between md:items-center gap-4 print:bg-white print:border-b-2 print:border-black print:pb-4">
          <div>
            {/* Logo Khusus Print (Opsional) */}
            <div className="hidden print:block mb-4">
              <h2 className="text-2xl font-bold uppercase tracking-widest">
                PAPER BLOOM
              </h2>
              
            </div>

            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider print:text-black">
              No. Invoice
            </span>
            <h1 className="text-xl md:text-2xl font-mono font-bold text-slate-900 dark:text-white mt-1 print:text-black">
              {order.id}
            </h1>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 print:text-black">
              <FiCalendar className="print:hidden" />{" "}
              {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* Status Badge (Sembunyikan background warna saat print agar hemat tinta) */}
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-2 print:bg-transparent print:text-black print:border print:border-black print:px-0 print:py-0`}
            >
              <FiPackage className="print:hidden" /> {order.status}
            </span>

            {/* Tombol Cetak (Sembunyikan Diri Sendiri) */}
            <button
              onClick={() => window.print()}
              className="text-xs text-bookBlue hover:underline flex items-center gap-1 print:hidden"
            >
              <FiPrinter /> Cetak Invoice
            </button>
          </div>
        </div>

        {/* === LIST PRODUK === */}
        <div className="p-6 print:p-0 print:mt-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 border-b pb-2 border-slate-100 dark:border-slate-700 print:text-black print:border-black">
            Rincian Produk
          </h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 print:border-b print:border-dotted print:border-gray-300 print:pb-2"
              >
                {/* Gambar (Opsional: Bisa disembunyikan saat print jika ingin hemat tinta) */}
                <img
                  src={item.book?.cover || "/fallback.jpg"}
                  alt={item.book?.title}
                  className="w-16 h-24 object-cover rounded bg-gray-200 print:w-10 print:h-14 print:grayscale"
                />
                <div className="flex-1">
                  <h4 className="font-serif font-bold text-slate-900 dark:text-white line-clamp-2 print:text-black print:text-sm">
                    {item.book?.title || "Judul Tidak Tersedia"}
                  </h4>
                  <p className="text-xs text-slate-500 mb-1 print:text-gray-600">
                    {item.book?.author}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-600 dark:text-slate-300 print:text-black">
                      {item.qty} x Rp {item.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white print:text-black">
                      Rp {(item.qty * item.price).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === RINGKASAN PEMBAYARAN === */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-700 print:bg-white print:border-t-2 print:border-black print:pt-2">
          <div className="flex justify-between items-center mb-2 text-sm text-slate-600 dark:text-slate-400 print:text-black">
            <span>Subtotal Produk</span>
            <span>Rp {order.total.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-sm text-slate-600 dark:text-slate-400 print:text-black">
            <span>Biaya Pengiriman</span>
            <span>Rp 0 (Promo)</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700 print:border-black print:border-t-2">
            <span className="font-bold text-lg text-slate-900 dark:text-white print:text-black">
              Total Belanja
            </span>
            <span className="font-bold text-2xl text-bookOrange print:text-black">
              Rp {order.total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Footer Khusus Print */}
        <div className="hidden print:block text-center mt-8 text-xs text-gray-500">
          <p>Terima kasih telah berbelanja di Paper Bloom.</p>
          <p>Simpan struk ini sebagai bukti pembayaran yang sah.</p>
        </div>
      </div>
    </section>
  );
}
