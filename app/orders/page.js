"use client";

import { useEffect, useState } from "react";
import { FiTruck, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";
import Link from "next/link"; // Untuk tombol belanja jika kosong

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
        case "Selesai": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
        case "Dikirim": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
        default: return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
        case "Selesai": return <FiCheckCircle />;
        case "Dikirim": return <FiTruck />;
        default: return <FiClock />;
    }
  };

  // FORMAT TANGGAL (Waktu Asli Indonesia)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    }).format(date);
  };

  if (loading) return <div className="p-10 text-center">Memuat riwayat...</div>;

  return (
    <section className="max-w-4xl mx-auto min-h-screen pb-10 px-4 md:px-0">
      <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-8 border-b pb-4 border-slate-200 dark:border-slate-700">
        Riwayat Pesanan
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
           <div className="text-4xl mb-4">📦</div>
           <h3 className="text-lg font-bold mb-2">Belum ada pesanan</h3>
           <p className="text-slate-500 mb-6">Yuk mulai belanja buku favoritmu!</p>
           <Link href="/katalog" className="px-6 py-2 bg-bookBlue text-white rounded-lg font-bold">Ke Katalog</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  {/* Header Pesanan */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                      <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">No. Invoice</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">{order.id}</p>
                          {/* TAMPILKAN WAKTU ASLI */}
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                             <FiClock /> {formatDate(order.createdAt)}
                          </p>
                      </div>
                      <div className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)} {order.status}
                      </div>
                  </div>

                  {/* List Buku (Diambil dari relasi) */}
                  <div className="flex flex-col gap-3 mb-4">
                      {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                              {/* Tampilkan Cover Buku (jika ada) */}
                              <img 
                                src={item.book?.cover || "/fallback.jpg"} 
                                className="w-12 h-16 object-cover rounded shadow-sm bg-gray-200" 
                                alt={item.book?.title}
                              />
                              <div>
                                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                    {item.book?.title || "Buku Dihapus"}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {item.qty} x Rp {item.price.toLocaleString("id-ID")}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>

                  {/* Total & Aksi */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div>
                          <p className="text-xs text-slate-500">Total Belanja</p>
                          <p className="text-lg font-bold text-bookOrange">Rp {order.total.toLocaleString("id-ID")}</p>
                      </div>
                      {/* Tombol Dummy Detail */}
                      <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                          Lihat Detail
                      </button>
                  </div>
              </div>
          ))}
        </div>
      )}
    </section>
  );
}