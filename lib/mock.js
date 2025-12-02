// =========================================
// 1. DATA BUKU (15 Item)
// =========================================
export const books = [
  // --- BUKU LAMA (b1-b5) ---
  {
    id: 'b1',
    title: 'How Innovation Works',
    author: 'Matt Ridley',
    price: 120000,
    discount: 10,
    cover: 'https://cdn.gramedia.com/uploads/picture_meta/2023/5/26/uwuojnsnsdhxfgtaztmu7x.jpg',
    tags: ['business', 'innovation'],
    description: 'Tentang bagaimana inovasi lahir dari proses panjang: eksperimen, kegagalan, dan kebebasan bereksperimen. Menggunakan banyak contoh sejarah, buku ini menunjukkan bagaimana ide kecil bisa membawa perubahan besar bagi dunia.',
    isbn: '978-0-00-833277-7',
    publisher: 'HarperCollins',
    pages: 416,
    weight: 0.55
  },
  {
    id: 'b2',
    title: 'Zero to One',
    author: 'Peter Thiel',
    price: 150000,
    discount: 0,
    cover: 'https://gpu.id/data-gpu/images/uploads/book/6cb2696cebc9dee871f57063ba1290b7.jpg',
    tags: ['startup', 'business'],
    description: 'Membahas bagaimana membangun perusahaan dan inovasi yang benar-benar baru—bukan sekadar meniru yang sudah ada. Thiel menekankan bahwa kemajuan terbesar terjadi saat kita menciptakan sesuatu dari “nol ke satu”, yaitu ide atau produk yang unik dan tidak punya kompetitor langsung. Buku ini mengajarkan cara berpikir kritis tentang masa depan, menemukan peluang tersembunyi, membangun monopoli yang sehat, dan menciptakan nilai jangka panjang. Dengan pengalaman Thiel sebagai pendiri PayPal, ia memberikan wawasan praktis tentang inovasi, strategi startup, dan cara menciptakan masa depan yang berbeda, bukan hanya mengikuti tren.',
    isbn: '978-0-8041-3929-8',
    publisher: 'Crown Business',
    pages: 224,
    weight: 0.35
  },
  {
    id: 'b3',
    title: 'Psychology of Money',
    author: 'Morgan Housel',
    price: 90000,
    discount: 20,
    cover: 'https://cdn.gramedia.com/uploads/picture_meta/2024/1/20/qvjtc65vbzmexfegzrgs7u.jpg',
    tags: ['finance', 'self-help'],
    description: 'Buku yang menjelaskan bagaimana perilaku dan emosi mengubah cara kita mengelola uang',
    isbn: '978-0-85719-768-9',
    publisher: 'Harriman House',
    pages: 252,
    weight: 0.40
  },
  {
    id: 'b4',
    title: 'Milk and Honey',
    author: 'Rupi Kaur',
    price: 200000,
    discount: 0,
    cover: 'https://www.gramedia.com/blog/content/images/2022/05/milk-and-honey.jpg',
    tags: ['poetry', 'literature'],
    description: 'Koleksi puisi dan prosa #1 New York Times Bestseller tentang pengalaman kekerasan, pelecehan, cinta, kehilangan, dan kesembuhan.',
    isbn: '978-1-4494-7425-6',
    publisher: 'Andrews McMeel',
    pages: 208,
    weight: 0.30
  },
  {
    id: 'b5',
    title: 'Desain UI/UX untuk Web',
    author: 'Jubilee Enterprise',
    price: 110000,
    discount: 15,
    cover: 'https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/products/-391t2araa.jpg',
    tags: ['design', 'uiux'],
    description: 'Panduan praktis untuk pemula yang ingin menguasai prinsip desain antarmuka (UI) dan pengalaman pengguna (UX) modern.',
    isbn: '978-602-04-9686-3',
    publisher: 'Elex Media',
    pages: 180,
    weight: 0.25
  },

  // --- BUKU BARU (b6-b15) ---
  {
    id: 'b6',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 180000,
    discount: 5,
    cover: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/94/MTA-117516262/no-brand_no-brand_full01.jpg',
    tags: ['self-help', 'business'],
    description: 'Perubahan kecil yang memberikan hasil luar biasa. Cara mudah dan terbukti untuk membentuk kebiasaan baik dan menghilangkan kebiasaan buruk.',
    isbn: '978-0-7352-1129-2',
    publisher: 'Penguin Random House',
    pages: 320,
    weight: 0.50
  },
  {
    id: 'b7',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    price: 145000,
    discount: 0,
    cover: 'https://tse4.mm.bing.net/th/id/OIP.xUC_NeAlMsm--ZvL87nRygHaLU?rs=1&pid=ImgDetMain&o=7&rm=3',
    tags: ['startup', 'business'],
    description: 'Pendekatan revolusioner untuk membangun bisnis dan meluncurkan produk baru dengan lebih cepat dan efisien.',
    isbn: '978-0-307-88789-4',
    publisher: 'Currency',
    pages: 336,
    weight: 0.48
  },
  {
    id: 'b8',
    title: 'Don\'t Make Me Think',
    author: 'Steve Krug',
    price: 135000,
    discount: 10,
    cover: 'https://th.bing.com/th/id/R.52b96bd4b26a21857037de55283f0ce1?rik=ev2nl4wAdS1pdg&riu=http%3a%2f%2fwww.peachpit.com%2fShowCover.aspx%3fisbn%3d0321965515&ehk=np1tjXpc%2bDK9HHUMQN4fi3Ed1w8kT%2bknT1RxZ0P%2bKLc%3d&risl=&pid=ImgRaw&r=0',
    tags: ['design', 'uiux'],
    description: 'Buku klasik tentang usabilitas web dan antarmuka. Panduan akal sehat untuk desain web yang intuitif.',
    isbn: '978-0-321-96551-6',
    publisher: 'New Riders',
    pages: 216,
    weight: 0.38
  },
  {
    id: 'b9',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    price: 95000,
    discount: 25,
    cover: 'https://th.bing.com/th/id/OIP.jOL5WCWxJlLsoNWaXsRBPQHaHa?w=158&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    tags: ['finance', 'business'],
    description: 'Pelajaran keuangan yang membandingkan pola pikir kaya dan miskin untuk mencapai kebebasan finansial.',
    isbn: '978-1-61268-019-4',
    publisher: 'Plata Publishing',
    pages: 336,
    weight: 0.45
  },
  {
    id: 'b10',
    title: 'Sprint',
    author: 'Jake Knapp',
    price: 160000,
    discount: 0,
    cover: 'https://th.bing.com/th/id/OIP.XC2L6c-Ny56zlYMqdDVyVwHaLQ?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    tags: ['startup', 'design'],
    description: 'Cara memecahkan masalah besar dan menguji ide baru hanya dalam lima hari. Metode yang digunakan di Google Ventures.',
    isbn: '978-1-5011-4239-8',
    publisher: 'Simon & Schuster',
    pages: 288,
    weight: 0.42
  },
  {
    id: 'b11',
    title: 'Rework',
    author: 'Jason Fried & DHH',
    price: 110000,
    discount: 30,
    cover: 'https://m.media-amazon.com/images/I/71CVp5P3x3L.jpg',
    tags: ['business', 'startup'],
    description: 'Buku yang menghapus semua aturan bisnis tradisional. Anda tidak butuh rencana bisnis, kompetisi, atau investor.',
    isbn: '978-0-307-46374-6',
    publisher: 'Crown Currency',
    pages: 288,
    weight: 0.39
  },
  {
    id: 'b12',
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    price: 210000,
    discount: 0,
    cover: 'https://th.bing.com/th/id/OIP.zHEbSZDQuYhvVPgETRzJBQHaLH?w=119&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    tags: ['finance', 'investment'],
    description: 'Panduan investasi jangka panjang yang fokus pada disiplin, analisis, dan prinsip value investing.',
    isbn: '978-0-06-055566-5',
    publisher: 'Harper Business',
    pages: 640,
    weight: 0.60
  },
  {
    id: 'b13',
    title: 'Start with Why',
    author: 'Simon Sinek',
    price: 130000,
    discount: 10,
    cover: 'https://th.bing.com/th/id/OIP.R4IYrXjKJ-75QvvqxmiR8QHaD4?w=296&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    tags: ['business', 'leadership'],
    description: 'Bagaimana para pemimpin besar menginspirasi orang lain untuk bertindak dengan memulai dari pertanyaan "Mengapa".',
    isbn: '978-1-59184-644-4',
    publisher: 'Portfolio',
    pages: 256,
    weight: 0.36
  },
  {
    id: 'b14',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    price: 175000,
    discount: 5,
    cover: 'https://th.bing.com/th/id/OIP.Qo27inBKBKY4Q4Pgk5KkbQHaJo?w=141&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    tags: ['design', 'psychology'],
    description: 'Panduan memahami prinsip desain yang membuat benda dan antarmuka lebih jelas, ramah, dan tidak membingungkan.',
    isbn: '978-0-465-05065-9',
    publisher: 'Basic Books',
    pages: 368,
    weight: 0.52
  },
  {
    id: 'b15',
    title: 'Home Body',
    author: 'Rupi Kaur',
    price: 195000,
    discount: 0,
    cover: 'https://th.bing.com/th/id/OIP.9gcpf6RxDpXP5aXmrVnxUwHaLe?w=120&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    tags: ['poetry', 'literature'],
    description: 'Perjalanan reflektif melalui masa lalu, masa kini, dan potensi diri. Koleksi puisi tentang penerimaan diri dan cinta.',
    isbn: '978-1-4494-8679-2',
    publisher: 'Andrews McMeel',
    pages: 192,
    weight: 0.28
  }
];

// =========================================
// 2. DATA ULASAN
// =========================================
export const reviews = {
  b1: [
    { id: 'r1', user: 'Ani', rating: 5, text: 'Sangat membuka wawasan tentang sejarah inovasi.' },
    { id: 'r2', user: 'Bambang', rating: 4, text: 'Banyak contoh kasus nyata yang menarik.' }
  ],
  b2: [
    { id: 'r3', user: 'Dewi', rating: 5, text: 'Wajib dibaca untuk founder startup!' }
  ],
  b3: [
    { id: 'r4', user: 'Budi', rating: 5, text: 'Mengubah cara pandang saya tentang menabung.' }
  ],
  b4: [
    { id: 'r5', user: 'Citra', rating: 5, text: 'Sangat menyentuh dan estetik.' }
  ],
  b6: [
    { id: 'r6', user: 'Rina', rating: 5, text: 'Buku terbaik untuk mengubah hidup tahun ini.' }
  ],
  b9: [
    { id: 'r7', user: 'Dika', rating: 4, text: 'Konsep aset vs liabilitas dijelaskan dengan sangat simpel.' }
  ]
};

// =========================================
// 3. DATA ARTIKEL BLOG (Dengan HTML Manual)
// =========================================
export const articles = [
  {
    id: 1,
    title: "Kenapa Buku Fisik Masih Relevan di Era Digital?",
    excerpt: "Di tengah gempuran e-book dan audiobook, buku cetak ternyata memiliki pesona dan manfaat kognitif yang tak tergantikan.",
    category: "Industri",
    date: "25 Sep 2024",
    image: "https://bandungmu.com/wp-content/uploads/2024/05/istockphoto-1957612313-612x612-1.jpg",
    // KONTEN DENGAN HTML MANUAL
    content: `
      <p>Di era di mana segala sesuatu menjadi digital, mulai dari pembayaran hingga pertemuan kerja, banyak yang memprediksi kematian buku fisik. Namun, data menunjukkan sebaliknya. Penjualan buku cetak tetap stabil, bahkan meningkat di kalangan Gen Z.</p>
      <br/>
      
      <h3 class="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3">Sensasi Sentuhan dan Aroma</h3>
      <p>Tidak ada yang bisa menggantikan bau kertas baru atau suara lembaran yang dibalik. Pengalaman multisensori ini membantu otak menciptakan peta mental dari apa yang kita baca, membuat informasi lebih mudah diingat dibandingkan membaca di layar.</p>
      <br/>
      
      <h3 class="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3">Detoks Digital</h3>
      <p>Membaca buku fisik memaksa kita untuk melepaskan diri dari notifikasi, cahaya biru layar, dan gangguan internet. Ini adalah bentuk meditasi aktif yang menurunkan tingkat stres secara signifikan.</p>
    `
  },
  {
    id: 2,
    title: "5 Kebiasaan Membaca Para CEO Sukses Dunia",
    excerpt: "Bill Gates hingga Warren Buffett menghabiskan 80% waktunya untuk membaca. Simak teknik membaca efektif ala mereka.",
    category: "Produktifitas",
    date: "22 Sep 2024",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60",
    content: `
      <p>Warren Buffett pernah berkata,“Bacalah 500 halaman setiap hari. Begitulah cara pengetahuan bekerja. Ia menumpuk, seperti bunga majemuk.” Kebiasaan ini bukan sekadar hobi, tetapi strategi bisnis yang diyakini mampu membangun pola pikir tajam dan perspektif luas. Dengan membaca dalam jumlah besar setiap hari, para tokoh seperti Warren Buffett dan Bill Gates mengumpulkan informasi sedikit demi sedikit hingga akhirnya membentuk pemahaman mendalam yang membantu mereka mengambil keputusan lebih tepat, mengenali peluang lebih cepat, dan mengantisipasi risiko dengan lebih baik. Mereka memandang membaca sebagai investasi jangka panjang yang hasilnya terus tumbuh seiring waktu, sama seperti bunga majemuk yang semakin besar jika dibiarkan berkembang secara konsisten.
 </p>
      <br/>
      
      <h3 class="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3">1. Jadikan Prioritas</h3>
      <p>Mereka tidak “mencari waktu” untuk membaca, tetapi justru “membuat waktu” karena menyadari betapa pentingnya kebiasaan tersebut bagi perkembangan diri dan keputusan bisnis mereka. Bill Gates, misalnya, selalu membawa tas berisi buku ke mana pun ia pergi, memanfaatkan setiap jeda—baik saat menunggu pesawat, berada di perjalanan, maupun di sela aktivitas padat—untuk terus menambah wawasan. Prinsip ini menunjukkan bahwa membaca bukanlah aktivitas yang dilakukan hanya ketika sempat, melainkan prioritas yang sengaja disediakan ruangnya dalam rutinitas, karena mereka memahami bahwa konsistensi dalam belajar memberikan keuntungan jangka panjang yang tak ternilai.
</p>
      <br/>
      
      <h3 class="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3">2. Membaca Beragam Topik</h3>
      <p>Elon Musk membaca fiksi ilmiah, biografi, hingga buku teknik roket. Wawasan lintas disiplin inilah yang memicu inovasi besar.</p>
      <ul class="list-disc ml-6 mt-4 text-slate-700 dark:text-slate-300">
         <li>Biografi Tokoh Sejarah</li>
         <li>Fiksi Ilmiah</li>
         <li>Jurnal Sains</li>
      </ul>
    `
  },
  {
    id: 3,
    title: "Resensi: Atomic Habits - Perubahan Kecil, Dampak Besar",
    excerpt: "Bedah buku terlaris James Clear yang mengubah cara jutaan orang memandang kebiasaan dan pengembangan diri.",
    category: "Resensi",
    date: "18 Sep 2024",
    image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/94/MTA-117516262/no-brand_no-brand_full01.jpg",
    content: `
      <p>Atomic Habits bukan sekadar buku motivasi, tetapi sebuah panduan teknis yang menjelaskan cara otak manusia membentuk dan mempertahankan kebiasaan. James Clear menekankan bahwa jika Anda menginginkan hasil yang lebih baik, Anda justru harus berhenti terobsesi pada pencapaian tujuan akhir. Alih-alih, fokuslah pada **sistem**—rutinitas kecil, proses harian, dan pola perilaku yang secara konsisten Anda lakukan. Menurutnya, tujuan memberi arah, tetapi sistemlah yang membawa Anda maju; perubahan kecil yang dilakukan terus-menerus akan menumpuk layaknya bunga majemuk, menghasilkan transformasi besar tanpa terasa
.</p>
      <br/>

      <div class="p-4 bg-blue-50 dark:bg-slate-800 border-l-4 border-bookBlue italic mb-6">
        "You do not rise to the level of your goals. You fall to the level of your systems."
      </div>
      
      <h3 class="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3">Aturan 1 Persen</h3>
      <p>Konsep inti buku ini adalah perbaikan 1% setiap hari. Jika Anda menjadi 1% lebih baik setiap hari selama satu tahun, Anda akan menjadi <b>37 kali lebih baik</b> pada akhirnya.</p>
    `
  },
  {
    id: 4,
    title: "Tips Membangun Kebiasaan Membaca Rutin",
    excerpt: "Sulit konsisten membaca buku? Coba terapkan teknik 'Habit Stacking' yang sederhana namun ampuh ini.",
    category: "Tips",
    date: "27 Nov 2025",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&auto=format&fit=crop&q=60",
    content: `
      <p>Banyak orang ingin membaca lebih banyak buku, tetapi sering kali gagal karena merasa tidak punya waktu atau terlalu sibuk dengan rutinitas. Padahal, masalahnya bukan terletak pada kurangnya motivasi, melainkan pada tidak adanya sistem yang mendukung kebiasaan tersebut. Tanpa sistem yang jelas—seperti menetapkan jadwal membaca harian, menyiapkan buku di tempat yang mudah dijangkau, atau memulai dengan target kecil—kebiasaan membaca akan selalu kalah oleh tugas lain yang tampak lebih mendesak. Dengan membangun sistem yang sederhana namun konsisten, membaca tidak lagi bergantung pada mood, melainkan menjadi bagian alami dari aktivitas sehari-hari.
</p>
      <br/>
      
      <h3 class="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3">Apa itu Habit Stacking?</h3>
      <p>Habit Stacking adalah teknik menumpuk kebiasaan baru di atas kebiasaan lama yang sudah kuat. Rumusnya:</p>
      
      <div class="p-4 my-4 bg-blue-50 dark:bg-slate-800 border-l-4 border-bookBlue italic text-slate-700 dark:text-slate-300">
        "Setelah saya [Kebiasaan Lama], saya akan [Membaca Buku]."
      </div>

      <p>Contohnya: "Setelah saya menyeduh kopi pagi (kebiasaan lama), saya akan membaca 2 halaman buku (kebiasaan baru)."</p>
      <br/>
      
      <h3 class="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3">Mulai dari Kecil</h3>
      <p>bagai pepatah “sedikit demi sedikit, lama-lama menjadi bukit.” Jangan menargetkan satu buku per minggu jika itu membuat Anda terbebani; targetkan saja lima menit membaca setiap hari. Konsistensi jauh lebih penting daripada intensitas besar di awal, karena kebiasaan yang dibangun perlahan namun terus-menerus akan menghasilkan perubahan yang jauh lebih bertahan lama.</p>
    `
  }
];
