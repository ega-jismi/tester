"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; 
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const banners = [
  {
    id: 1,
    // Gambar perpustakaan estetik/warm
    image: "https://i.pinimg.com/originals/17/6a/78/176a7801cefd9dd5b820d32c698f60ae.jpg",
    title: "Jelajahi Dunia Baru",
    subtitle: "Ribuan cerita menunggumu. Diskon hingga 50% untuk buku fiksi pilihan.",
    link: "/katalog", 
    color: "from-blue-600 to-purple-600"
  },
  {
    id: 2,
    // Gambar buku minimalis/modern
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000&auto=format&fit=crop",
    title: "Koleksi Self-Improvement",
    subtitle: "Investasi terbaik adalah leher ke atas. Tingkatkan skillmu sekarang.",
    link: "/detail/b6", 
    color: "from-orange-500 to-red-500"
  },
  {
    id: 3,
    // Gambar suasana membaca yang cozy
    image: "/images/banner.png",
    title: "Year End Sale",
    subtitle: "Waktu terbatas! Borong buku favoritmu sebelum kehabisan.",
    link: "/promo", 
    color: "from-emerald-500 to-teal-500"
  },
];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0, scale: 1.1 }),
  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? "100%" : "-100%", opacity: 0, scale: 1.1 })
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6, ease: "easeOut" } }
};

export default function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false); 
  const router = useRouter();

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = banners.length - 1;
      if (nextIndex >= banners.length) nextIndex = 0;
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => { paginate(1); }, 6000); // Diperlambat sedikit ke 6 detik
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const handleBannerClick = () => {
    router.push(banners[index].link);
  };

  return (
    <div 
      className="relative w-full h-[220px] sm:h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-slate-900 border border-slate-200 dark:border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={handleBannerClick}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 }, scale: { duration: 6, ease: "linear" } }} // Scale duration panjang untuk efek zoom halus
          className="absolute inset-0 w-full h-full"
        >
           <img 
             src={banners[index].image} 
             alt={banners[index].title} 
             className="w-full h-full object-cover brightness-75"
           />
           
           {/* Overlay Gradient Lebih Halus */}
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
           <div className={`absolute inset-0 bg-gradient-to-r ${banners[index].color} opacity-20 mix-blend-overlay`} />
        </motion.div>
      </AnimatePresence>

      {/* --- CONTENT TEKS --- */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 flex flex-col items-start justify-end h-full pointer-events-none">
         <motion.div
            key={index} // Kunci ini penting agar teks animasi ulang saat slide berubah
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="max-w-2xl"
         >
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-white mb-3 bg-gradient-to-r ${banners[index].color} shadow-lg`}>
               Featured Collection
            </span>
            <h2 className="text-2xl md:text-5xl font-serif font-bold text-white mb-2 drop-shadow-lg leading-tight">
               {banners[index].title}
            </h2>
            <p className="text-slate-200 text-xs md:text-lg mb-6 line-clamp-2 md:line-clamp-none opacity-90 max-w-lg">
               {banners[index].subtitle}
            </p>
            
            {/* Tombol CTA (Call to Action) */}
            <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg group-hover:scale-105 transform duration-300 pointer-events-auto">
               Lihat Sekarang <FiArrowRight />
            </button>
         </motion.div>
      </div>

      {/* --- TOMBOL NAVIGASI (Glassmorphism) --- */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 hover:scale-110" 
        onClick={(e) => { e.stopPropagation(); paginate(-1); }}
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>

      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 hover:scale-110" 
        onClick={(e) => { e.stopPropagation(); paginate(1); }}
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      {/* --- INDIKATOR DOTS --- */}
      <div className="absolute bottom-6 right-6 md:right-10 flex gap-2 z-30" onClick={(e) => e.stopPropagation()}>
        {banners.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => { setDirection(idx > index ? 1 : -1); setIndex(idx); }} 
            className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${idx === index ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/80"}`} 
          />
        ))}
      </div>
    </div>
  );
}