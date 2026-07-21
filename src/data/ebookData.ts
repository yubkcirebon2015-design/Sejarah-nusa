export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string; // Tailwind gradient/classes
  icon: string;
  accentColor: string;
}

export interface Chapter {
  number: number;
  title: string;
  partName: string;
  preview: string;
  content: string;
}

export const books: Book[] = [
  {
    id: "filsafat",
    title: "Ilmu Filsafat Kebijaksanaan",
    subtitle: "Menembus Batas Logika & Hakikat Eksistensi",
    description: "Kajian mendalam 100 bab filsafat klasik hingga kontemporer, dirancang khusus untuk memandu pemikiran kritis, memahami hakikat kebenaran, epistemologi, estetika, serta kearifan filsafat Nusantara.",
    color: "from-amber-950 via-amber-900 to-[#1c120c]",
    icon: "Compass",
    accentColor: "#d4af37"
  },
  {
    id: "the-power-of-principle",
    title: "The Power of Principle",
    subtitle: "Kekuatan Prinsip & Integritas Karakter Unggul",
    description: "Pedoman praktis dan filosofis 100 bab tentang membangun fondasi hidup yang kokoh, memegang teguh integritas di era perubahan, serta menetapkan kompas moral dalam keputusan krusial.",
    color: "from-[#021d1d] via-[#043333] to-[#011414]",
    icon: "Shield",
    accentColor: "#2dd4bf"
  },
  {
    id: "the-power-of-discipline",
    title: "The Power of Discipline",
    subtitle: "Daya Disiplin Militan & Kunci Konsistensi Emas",
    description: "Kupas tuntas 100 bab strategi disiplin diri praktis, mengalahkan prokrastinasi, membangun kebiasaan produktif, serta membentuk ketahanan mental pejuang dalam menggapai visi besar.",
    color: "from-red-950 via-stone-900 to-[#120505]",
    icon: "Flame",
    accentColor: "#f87171"
  },
  {
    id: "kepemimpinan",
    title: "Macam-Macam Kepemimpinan",
    subtitle: "Seni Memimpin & Strategi Pengaruh Efektif",
    description: "Analisis komprehensif 100 bab berbagai gaya kepemimpinan di dunia (Karismatik, Transaksional, Transformasional, Pelayan, hingga Militer), lengkap dengan studi kasus taktis.",
    color: "from-[#061e38] via-[#0a2f57] to-[#020e1c]",
    icon: "Users",
    accentColor: "#60a5fa"
  },
  {
    id: "kekuasaan",
    title: "Ilmu Kekuasaan & Siasat",
    subtitle: "Teori Politik, Struktur Otoritas & Diplomasi Taktis",
    description: "Bedah taktis 100 bab teori kekuasaan, realpolitik, etika kekuasaan, retorika, manajemen konflik, hingga dinamika kekuasaan dalam sejarah Nusantara dan panggung global.",
    color: "from-[#1b082e] via-[#2d124d] to-[#0c0314]",
    icon: "Crown",
    accentColor: "#c084fc"
  }
];

// Helper to get Part Name for any chapter (1-100)
export function getPartInfo(chapterNum: number): { partNum: number; partTitle: string } {
  const partNum = Math.ceil(chapterNum / 10);
  const partTitles = [
    "Fondasi Dasar & Pengantar Konseptual",
    "Prinsip Inti & Pemahaman Teoretis",
    "Metodologi Praktis & Penerapan Diri",
    "Hambatan Utama & Strategi Solutif",
    "Harmoni Sosial & Hubungan Kemanusiaan",
    "Pendekatan Klasik & Warisan Sejarah",
    "Analisis Kontemporer & Tantangan Modern",
    "Studi Kasus Tokoh & Peradaban Nusantara",
    "Integrasi Strategis & Visi Jangka Panjang",
    "Puncak Kebijaksanaan & Refleksi Akhir"
  ];
  return {
    partNum,
    partTitle: `Bagian ${partNum}: ${partTitles[partNum - 1] || "Pengembangan Lanjutan"}`
  };
}

// Generate unique Chapter Title programmatically based on bookId and chapterNumber (1-100)
export function getChapterTitle(bookId: string, num: number): string {
  const { partNum } = getPartInfo(num);
  const offset = (num - 1) % 10 + 1; // 1 to 10 within each part

  if (bookId === "filsafat") {
    const titles: Record<number, string[]> = {
      1: [
        "Pengenalan Filsafat: Cinta akan Kebijaksanaan",
        "Menanya Akar Pikiran: Mengapa Manusia Berfilsafat?",
        "Tiga Pilar Filsafat: Ontologi, Epistemologi, dan Aksiologi",
        "Kebenaran Korespondensi vs Kebenaran Koherensi",
        "Logika Aristoteles: Fondasi Berpikir Deduktif",
        "Skeptisisme Sehat: Meragukan untuk Menemukan Kebenaran",
        "Silogisme dan Kesalahan Berpikir yang Sering Terjadi",
        "Filsafat Pra-Socrates: Pencarian Bahan Dasar Alam",
        "Dunia Ide Plato: Hakikat Realitas yang Sesungguhnya",
        "Realisme Aristoteles: Menghargai Dunia Empiris"
      ],
      2: [
        "Epistemologi: Bagaimana Kita Tahu Apa yang Kita Tahu?",
        "Empirisme John Locke: Tabula Rasa dan Lembaran Kosong",
        "Rasionalisme Descartes: Cogito Ergo Sum",
        "Sintesis Immanuel Kant: Batas Rasio Murni",
        "Pragmatisme: Kebenaran Adalah Apa yang Berfungsi",
        "Filsafat Pikiran: Dualisme Tubuh dan Jiwa",
        "Konsepsi Ruang dan Waktu menurut Para Filsuf",
        "Induksi Francis Bacon: Revolusi Metode Ilmiah",
        "Hermeneutika: Seni Menafsirkan Teks dan Makna",
        "Fenomenologi Husserl: Kembali ke Realitas itu Sendiri"
      ],
      3: [
        "Aksiologi: Hakikat Nilai, Etika, dan Keindahan",
        "Etika Kebajikan Aristoteles: Mencari Jalan Tengah Emas",
        "Deontologi Kant: Bertindak Berdasarkan Kewajiban Moral",
        "Utilitarianisme: Kebahagiaan Terbesar bagi Mayoritas",
        "Etika Egoisme vs Altruisme dalam Kehidupan sehari-hari",
        "Etika Lingkungan: Relasi Manusia dengan Alam Semesta",
        "Moralitas Subjektif vs Objektif: Perdebatan Abadi",
        "Nihilisme Friedrich Nietzsche: Runtuhnya Nilai Tradisional",
        "Filsafat Kebebasan Kehendak vs Determinisme",
        "Relativisme Budaya: Menghormati Kebhinekaan Etis"
      ],
      4: [
        "Filsafat Timur: Harmoni Taoisme dan Yin-Yang",
        "Konfusianisme: Etika Sosial dan Bakti Keluarga",
        "Buddhisme: Pelepasan Keinginan dan Jalan Tengah",
        "Filsafat Hindu: Karma, Dharma, dan Reinkarnasi",
        "Stoikisme Klasik: Mengendalikan Apa yang Bisa Dikendalikan",
        "Epikureanisme: Ketenangan Pikiran dan Kesenangan Sederhana",
        "Filsafat Sufisme: Penyatuan Jiwa dengan Sang Pencipta",
        "Konsep Kekosongan (Sunyata) dalam Pemikiran Timur",
        "Meditasi sebagai Praktik Berpikir Filsafat Timur",
        "Sintesis Filsafat Barat dan Timur untuk Kehidupan Modern"
      ],
      5: [
        "Filsafat Jawa: Memahami Konsep Manunggaling Kawula Gusti",
        "Sangkan Paraning Dumadi: Asal dan Tujuan Hidup",
        "Etika Jawa: Rukun dan Hormat dalam Masyarakat",
        "Serat Wedhatama: Ajaran Luhur Kebijaksanaan Jiwa",
        "Konsep Hamemayu Hayuning Bawana: Memperindah Alam Semesta",
        "Filsafat Wayang: Bayang-bayang Karakter Manusia",
        "Kawruh Jiwa Ki Ageng Suryomentaram: Bahagia Tanpa Syarat",
        "Filsafat Pancasila: Kristalisasi Karakter Bangsa Nusantara",
        "Kearifan Lokal Baduy: Harmoni Ekologi dan Kesederhanaan",
        "Filsafat Gotong Royong: Kebersamaan yang Menggerakkan"
      ],
      6: [
        "Filsafat Politik Klasik: Negara Ideal Plato",
        "Politik menurut Aristoteles: Manusia adalah Zoon Politikon",
        "Kontrak Sosial Thomas Hobbes: Manusia adalah Serigala bagi Sesamanya",
        "Kontrak Sosial John Locke: Hak Atas Hidup, Kebebasan, dan Properti",
        "Jean-Jacques Rousseau: Kebebasan Alamiah dan Kehendak Umum",
        "Trias Politika Montesquieu: Pembagian Kekuasaan untuk Keadilan",
        "Utilitarianisme Politik J.S. Mill: Kebebasan Individu",
        "Marxisme: Kritik Sejarah dan Dialektika Materialisme",
        "Filsafat Demokrasi: Kedaulatan Rakyat dan Hak Suara",
        "Filsafat Hukum: Hukum Kodrat vs Positivisme Hukum"
      ],
      7: [
        "Eksistensialisme: Keberadaan Mendahului Esensi",
        "Soren Kierkegaard: Lompatan Keyakinan dan Kecemasan",
        "Nietzsche dan Konsep Ubermensch (Manusia Unggul)",
        "Jean-Paul Sartre: Manusia Dikutuk untuk Bebas",
        "Albert Camus: Absurdisme dan Keberanian Sisyphus",
        "Simone de Beauvoir: Eksistensialisme Feminis",
        "Martin Heidegger: Hakikat Mengada di Dunia (Dasein)",
        "Pencarian Makna Hidup menurut Viktor Frankl",
        "Kecemasan Eksistensial sebagai Penggerak Kreativitas",
        "Kebebasan dan Tanggung Jawab Moral dalam Eksistensialisme"
      ],
      8: [
        "Filsafat Ilmu: Apa Batas-Batas Sains?",
        "Falsifikasi Karl Popper: Sains Harus Bisa Dibuktikan Salah",
        "Paradigma Thomas Kuhn: Revolusi Ilmiah dan Pergeseran Sudut Pandang",
        "Positivisme Logis Lingkaran Wina",
        "Etika Sains dan Teknologi: Menjaga Kemanusiaan",
        "Filsafat Bahasa Ludwig Wittgenstein: Batas Bahasa adalah Batas Dunia",
        "Hermeneutika Kritis Jurgen Habermas",
        "Postmodernisme: Dekonstruksi Kebenaran Absolut oleh Derrida",
        "Kekuasaan dan Pengetahuan menurut Michel Foucault",
        "Kritik Filsafat terhadap Konsumerisme Modern"
      ],
      9: [
        "Filsafat Agama: Rasio Berdampingan dengan Iman",
        "Argumen Kosmologis untuk Eksistensi Tuhan",
        "Argumen Teleologis: Desain Alam Semesta yang Sempurna",
        "Problem Kejahatan: Jika Tuhan Baik, Mengapa Ada Penderitaan?",
        "Mistisisme dan Pengalaman Keagamaan",
        "Ateisme, Agnostisisme, dan Teisme dalam Analisis Filsafat",
        "Sintesis Filsafat Ibnu Rusyd dan Thomas Aquinas",
        "Filsafat Etika Keagamaan dalam Era Modern",
        "Keberagaman Iman dan Dialog Antar Peradaban",
        "Agama dalam Pandangan Sosiologi Kontemporer"
      ],
      10: [
        "Estetika: Mengapa Seni Menyentuh Jiwa Kita?",
        "Teori Mimesis: Seni sebagai Peniruan Alam Semesta",
        "Keindahan Subjektif Kant: Selera dan Apresiasi Estetis",
        "Seni sebagai Katarsis Emosional menurut Aristoteles",
        "Filsafat Kematian: Menghargai Hidup Melalui Kesadaran Akhir",
        "Memento Mori: Ingatlah Kematian sebagai Pengingat Kebijaksanaan",
        "Filsafat Kebahagiaan: Menemukan Ikigai dalam Keseharian",
        "Amor Fati: Mencintai Takdir Apapun yang Terjadi",
        "Menjadi Filsuf Sehari-hari: Praktik Berpikir Sebelum Bertindak",
        "Ringkasan Kebijaksanaan: Filsafat sebagai Obor Abadi Peradaban"
      ]
    };
    return titles[partNum]?.[offset - 1] || `Kajian Filsafat Mendalam Bab ${num}`;
  } else if (bookId === "the-power-of-principle") {
    const titles: Record<number, string[]> = {
      1: [
        "Hakikat Prinsip: Kompas Internal Jiwa Manusia",
        "Prinsip vs Opini: Mengapa Prinsip Tidak Boleh Goyah",
        "Integritas Diri: Penyelaras Kata, Pikiran, dan Tindakan",
        "Karakter Unggul: Fondasi Utama Sebelum Reputasi",
        "Pilar Nilai Hidup: Menemukan Dasar Keyakinan Anda",
        "Mengapa Kehilangan Prinsip Berarti Kehilangan Jati Diri",
        "Prinsip Kejujuran: Mata Uang yang Berlaku di Mana Saja",
        "Keadilan Internal: Bersikap Adil Terhadap Diri Sendiri",
        "Kewajiban Moral: Bertindak Melampaui Kepentingan Pribadi",
        "Kisah Tokoh yang Memilih Mati Demi Mempertahankan Prinsip"
      ],
      2: [
        "Prinsip Tanggung Jawab Penuh: Berhenti Menyalahkan Keadaan",
        "Mengukir Kompas Etika dalam Dunia yang Serba Abu-abu",
        "Keberanian Moral (Moral Courage): Menolak Ikut Arus Sesat",
        "Prinsip Kehormatan Diri: Menjaga Martabat di Setiap Kondisi",
        "Konsistensi Nilai: Diuji Saat Tidak Ada Orang yang Melihat",
        "Prinsip Kerendahan Hati: Mengakui Batas dan Belajar Terus",
        "Menolak Kompromi Buruk: Batas Tegas yang Menyelamatkan",
        "Menghargai Janji: Reputasi Terbuat dari Keandalan Anda",
        "Prinsip Empati: Memandang Dunia Lewat Sepatu Orang Lain",
        "Keteguhan Jiwa (Fortitude) menghadapi Ujian Integritas"
      ],
      3: [
        "Merancang Visi Hidup Berdasarkan Prinsip Abadi",
        "Prinsip Prioritas Utama: Mengorbankan yang Baik demi yang Terbaik",
        "Mengelola Batas Batas Diri: Belajar Mengatakan Tidak",
        "Prinsip Kemandirian Berpikir: Tidak Mudah Terhasut Opini Publik",
        "Keseimbangan Hidup: Menjaga Integritas Rohani dan Jasmani",
        "Prinsip Kesederhanaan: Menghindari Jebakan Materialisme",
        "Menghargai Waktu sebagai Sumber Daya Paling Berharga",
        "Prinsip Pembelajaran Seumur Hidup: Menolak Menjadi Stagnan",
        "Menjaga Hubungan Autentik Berlandaskan Kepercayaan",
        "Prinsip Kontribusi: Hidup untuk Memberi Manfaat Terbesar"
      ],
      4: [
        "Menghadapi Tekanan Sosial yang Mengikis Kompas Moral",
        "Siasat Menghadapi Dilema Etis yang Rumit",
        "Prinsip Ketahanan Mental Saat Mengalami Fitnah",
        "Mengatasi Kegagalan Tanpa Kehilangan Keyakinan Diri",
        "Prinsip Penyelesaian Konflik Tanpa Mengorbankan Nilai Luhur",
        "Bagaimana Prinsip Mengalahkan Kebingungan di Persimpangan Jalan",
        "Menghadapi Kehilangan Materi Demi Mempertahankan Kebenaran",
        "Ketenangan Jiwa di Tengah Badai Ketidakpastian Ekonomi",
        "Prinsip Evaluasi Diri Berkala: Mengkalibrasi Kompas Moral",
        "Mengatasi Rasa Takut Diasingkan Karena Membela Kebenaran"
      ],
      5: [
        "Integritas dalam Keluarga: Warisan Nilai Karakter Anak Cucu",
        "Prinsip Gotong Royong dalam Menjaga Harmoni Sosial",
        "Membangun Kepercayaan Kolektif di Lingkungan Komunitas",
        "Prinsip Keadilan Sosial dalam Tindakan Keseharian",
        "Menolak Menyuap dan Disuap: Memutus Rantai Keburukan",
        "Menghormati Perbedaan Pendapat Tanpa Mengorbankan Kebenaran",
        "Prinsip Kesopanan dan Tata Krama sebagai Perisai Sosial",
        "Membantu yang Lemah: Menjaga Nilai Kemanusiaan Tetap Hidup",
        "Prinsip Kebersamaan: Membangun Jaringan Berbasis Karakter",
        "Menjadi Terang di Tengah Kegelapan Lingkungan yang Korup"
      ],
      6: [
        "Nilai-Nilai Luhur Ksatria Nusantara dan Kode Etik Mereka",
        "Prinsip Kehormatan Samudra: Ketangguhan Pelaut Nusantara",
        "Prinsip Kesetiaan Negara dalam Tradisi Kerajaan Klasik",
        "Integritas Para Pahlawan Kemerdekaan: Pantang Menyerah",
        "Prinsip Musyawarah Mufakat dalam Menyelesaikan Persoalan",
        "Konsep Adil Paramarta dalam Tradisi Kepemimpinan Nusantara",
        "Nilai Tat Twam Asi: Aku adalah Kamu, Kamu adalah Aku",
        "Mempelajari Keteguhan Hati Sultan Agung dan Pangeran Diponegoro",
        "Prinsip Luhur Pancasila sebagai Pengikat Keragaman Bangsa",
        "Menghidupkan Kembali Karakter Unggul Leluhur di Era Modern"
      ],
      7: [
        "Tantangan Integritas di Era Distorsi Informasi Digital",
        "Prinsip Keamanan Diri Tanpa Menjadi Paranoid",
        "Integritas Profesional di Lingkungan Kerja yang Kompetitif",
        "Prinsip Kebenaran Data: Melawan Hoaks dan Manipulasi Informasi",
        "Menjaga Pikiran Tetap Jernih di Tengah Banjir Notifikasi",
        "Etika Berkomunikasi di Media Sosial Berbasis Prinsip Kebaikan",
        "Prinsip Menghargai Karya Orang Lain (Anti-Plagiarisme)",
        "Integritas Akademis: Menuntut Ilmu dengan Cara yang Benar",
        "Menghadapi Kebiasaan Serba Instan dengan Menghargai Proses",
        "Prinsip Menjaga Privasi Diri dan Orang Lain"
      ],
      8: [
        "Studi Kasus Socrates: Memilih Cawan Racun Demi Hukum Negara",
        "Integritas Mahatma Gandhi: Ahimsa (Tanpa Kekerasan) dan Satyagraha",
        "Prinsip Keteguhan Abraham Lincoln Menentang Perbudakan",
        "Studi Kasus Nelson Mandela: Membela Kesetaraan dari Balik Penjara",
        "Keteladanan Ki Hajar Dewantara dalam Prinsip Pendidikan",
        "Bung Hatta: Teladan Kesederhanaan dan Integritas Keuangan",
        "Prinsip Kemandirian Bangsa Bung Karno (Berdikari)",
        "Studi Kasus Jenderal Sudirman: Bertahan Gerilya dengan Satu Paru-Paru",
        "Prinsip Pengabdian Tanpa Pamrih Ibu Kartini",
        "Mengambil Pelajaran Moral dari Tokoh-Tokoh Agung Dunia"
      ],
      9: [
        "Membangun Bisnis dan Karir yang Berumur Panjang Berbasis Prinsip",
        "Prinsip Keberlanjutan: Menjaga Alam untuk Generasi Mendatang",
        "Keadilan dalam Distribusi Keuntungan Usaha",
        "Prinsip Transparansi dalam Pengelolaan Finansial",
        "Menghindari Jebakan Utang yang Mengikis Kemerdekaan Diri",
        "Prinsip Kemitraan Adil (Win-Win): Kerja Sama Saling Menguntungkan",
        "Integritas Layanan: Memberikan Kualitas Terbaik Sesuai Janji",
        "Etika Periklanan: Menjual Tanpa Menipu Konsumen",
        "Prinsip Inovasi yang Bertanggung Jawab Sosial",
        "Mewariskan Kekayaan Moral Lebih Utama daripada Kekayaan Materi"
      ],
      10: [
        "Refleksi Diri: Siapakah Saya Ketika Sendirian?",
        "Prinsip Damai Sejahtera (Inner Peace): Buah dari Integritas",
        "Menghadapi Hari Tua dengan Senyum Tanpa Penyesalan",
        "Prinsip Menulis Jurnal Harian untuk Menjaga Fokus Karakter",
        "Menerima Kelemahan Diri Sembari Terus Memperbaikinya",
        "Prinsip Bersyukur atas Ujian yang Mendewasakan Jiwa",
        "Bagaimana Kebajikan Menghasilkan Kekuatan Terbesar Manusia",
        "Menyebarkan Benih Kebaikan Tanpa Mengharapkan Pujian Dunia",
        "Prinsip Hidup Minimalis yang Memerdekakan Pikiran",
        "Puncak Kebijaksanaan: Hidup yang Selaras dengan Hukum Semesta"
      ]
    };
    return titles[partNum]?.[offset - 1] || `Kekuatan Prinsip Bab ${num}`;
  } else if (bookId === "the-power-of-discipline") {
    const titles: Record<number, string[]> = {
      1: [
        "Definisi Disiplin: Jembatan Antara Impian dan Kenyataan",
        "Disiplin vs Motivasi: Mengapa Motivasi Saja Tidak Cukup",
        "Sains di Balik Disiplin Diri: Cara Otak Membentuk Kebiasaan",
        "Menghancurkan Prokrastinasi: Musuh Utama Keberhasilan",
        "Prinsip Kepuasan yang Ditunda (Delayed Gratification)",
        "Membangun Ritme Pagi yang Produktif dan Disiplin",
        "Disiplin Waktu: Menghargai Detik demi Detik Kehidupan",
        "Aturan 5 Detik: Mengambil Tindakan Sebelum Otak Menolak",
        "Membentuk Mental Juara yang Haus akan Perbaikan",
        "Mengapa Kegagalan Disiplin Berdampak Domino pada Hidup Anda"
      ],
      2: [
        "Aturan 2 Menit: Cara Mudah Memulai Kebiasaan Baru",
        "Mengatur Lingkungan Sekitar untuk Mendukung Disiplin",
        "Disiplin Membatasi Gangguan (Distraction Management)",
        "Pentingnya Memiliki Jadwal Tertulis yang Ketat",
        "Membangun Rutinitas Malam untuk Istirahat Berkualitas",
        "Disiplin Finansial: Menabung Sebelum Membelanjakan",
        "Menjaga Konsistensi di Hari-Hari Paling Malas",
        "Disiplin Fisik: Menjaga Kebugaran Tubuh sebagai Kuil Jiwa",
        "Bagaimana Mengatakan Tidak pada Godaan Jangka Pendek",
        "Melacak Kemajuan Harian (Habit Tracker) secara Jujur"
      ],
      3: [
        "Metode Time Blocking: Menguasai Fokus secara Eksklusif",
        "Teknik Pomodoro: Mengoptimalkan Kerja dan Istirahat",
        "Membagi Target Besar Menjadi Langkah-Langkah Kecil",
        "Disiplin Mental: Mengontrol Arus Pikiran Negatif",
        "Menghadapi Rasa Bosan dalam Proses Pengulangan (Boredom)",
        "Disiplin Nutrisi: Memilih Makanan yang Memberi Energi",
        "Membangun Ketahanan Fokus (Deep Work) di Era Informasi",
        "Prinsip Satu Persen Lebih Baik Setiap Hari (Kaizen)",
        "Pentingnya Akuntabilitas: Temukan Partner Disiplin Anda",
        "Mengubah Hambatan Menjadi Latihan Disiplin Tambahan"
      ],
      4: [
        "Mengatasi Kelelahan Mental (Burnout) dengan Disiplin Istirahat",
        "Siasat Menembus Batas Kemampuan Diri (Pushing Limits)",
        "Menghilangkan Kebiasaan Buruk secara Permanen",
        "Disiplin Membaca Buku: Nutrisi Harian untuk Pikiran",
        "Menghadapi Kegagalan Target dengan Evaluasi Konstruktif",
        "Disiplin dalam Kebersihan dan Kerapian Kamar Kerja",
        "Menghentikan Kecanduan Gadget dan Media Sosial",
        "Disiplin Berpikir Positif di Tengah Situasi Krisis",
        "Bagaimana Memulihkan Diri Setelah Melanggar Disiplin",
        "Membangun Otot Kehendak (Willpower) Melalui Latihan Kecil"
      ],
      5: [
        "Disiplin Komunikasi: Mendengar Lebih Banyak dari Berbicara",
        "Menjaga Janji Temu: Disiplin Kehadiran Tepat Waktu",
        "Disiplin Sosial: Membatasi Hubungan Beracun (Toxic)",
        "Saling Mengingatkan dalam Kebaikan secara Konsisten",
        "Disiplin dalam Membantu Orang Lain Tanpa Mengorbankan Diri",
        "Menjaga Keharmonisan Hubungan Melalui Komunikasi Teratur",
        "Disiplin Mengendalikan Amarah dalam Interaksi Sosial",
        "Pentingnya Etika Bertetangga dan Bermasyarakat",
        "Disiplin Berbagi Ilmu dan Keterampilan kepada Sesama",
        "Membangun Reputasi sebagai Orang yang Selalu Bisa Diandalkan"
      ],
      6: [
        "Keteladanan Disiplin Militer Jenderal Sudirman",
        "Disiplin Bertani Tradisional: Membaca Pranata Mangsa",
        "Ritual Disiplin Spiritual Para Leluhur Nusantara",
        "Disiplin Pembangunan Candi: Karya Agung dari Konsistensi",
        "Ketangguhan Fisik dan Disiplin Pendekar Silat Tradisional",
        "Disiplin Gotong Royong dalam Tradisi Subak Bali",
        "Prinsip Tirakat: Puasa dan Pengendalian Diri Khas Jawa",
        "Disiplin Belajar Para Pujangga Kerajaan Nusantara",
        "Konsistensi Menjaga Adat Istiadat Nusantara Selama Berabad-abad",
        "Nilai Luhur Manunggaling Tekad: Menyatukan Pikiran dan Aksi"
      ],
      7: [
        "Disiplin Kerja di Era Remote / Work From Home",
        "Mengelola Finansial Pribadi di Tengah Gempuran Paylater",
        "Disiplin Keamanan Data Pribadi di Internet",
        "Membentuk Kebiasaan Olahraga Sederhana di Sela Kesibukan",
        "Disiplin Mengonsumsi Informasi yang Sehat dan Bergizi",
        "Menghindari FOMO (Fear of Missing Out) dengan Disiplin Fokus",
        "Disiplin Belajar Keterampilan Baru (Reskilling) Mandiri",
        "Mengatur Keuangan Keluarga Berbasis Anggaran Ketat",
        "Disiplin Menjaga Kebersihan Lingkungan Rumah dari Plastik",
        "Menyeimbangkan Waktu Layar (Screen Time) Demi Kesehatan Mata"
      ],
      8: [
        "Belajar Disiplin dari Rutinitas Atlet Kelas Dunia",
        "Bagaimana Penulis Hebat Menyelesaikan Buku: Tulis Tiap Hari",
        "Disiplin Kerja Para Ilmuwan Penemu Teknologi Hebat",
        "Siasat Sukses Pengusaha yang Merintis dari Nol dengan Disiplin",
        "Studi Kasus Kebangkitan Ekonomi Jepang Melalui Kedisiplinan",
        "Disiplin Ketat Masyarakat Singapura Menjaga Ketertiban",
        "Etos Kerja 'Orang Dalam Genetik Jawa' yang Ulet dan Tabah",
        "Bagaimana Disiplin Menyelamatkan Tokoh dari Kemiskinan Ekstrem",
        "Keteladanan Disiplin Belajar Tokoh Proklamator Indonesia",
        "Pelajaran Hidup dari Orang-Orang yang Menyesal Akibat Malas"
      ],
      9: [
        "Disiplin Strategis: Menyelaraskan Rencana dengan Eksekusi",
        "Pentingnya Menolak Proyek yang Tidak Sesuai Visi Utama",
        "Disiplin Melakukan Review Mingguan (Weekly Review)",
        "Mengoptimalkan Energi Tubuh Bukan Hanya Mengatur Waktu",
        "Membangun Sistem Kerja Otomatis yang Mengurangi Beban Disiplin",
        "Disiplin Mendelegasikan Tugas demi Efisiensi Organisasi",
        "Menjaga Kualitas Produk dengan Disiplin QC (Quality Control)",
        "Prinsip Pivot: Disiplin Mengubah Strategi saat Sistem Macet",
        "Disiplin Menginvestasikan Sebagian Pendapatan untuk Masa Depan",
        "Membangun Budaya Disiplin dalam Tim Kerja atau Organisasi"
      ],
      10: [
        "Ketika Disiplin Telah Menjadi Karakter Otomatis (Second Nature)",
        "Kebahagiaan Sejati Lahir dari Pengendalian Diri",
        "Bebas dari Penjara Nafsu Jangka Pendek",
        "Menghargai Proses Lebih dari Sekadar Hasil Akhir",
        "Disiplin Spiritual: Mendekatkan Diri pada Sang Pencipta",
        "Damai Jiwa karena Hidup Teratur dan Bebas Kekacauan",
        "Menjadi Inspirasi Hidup bagi Orang-Orang di Sekitar Anda",
        "Meninggalkan Warisan Kedisiplinan untuk Generasi Penerus",
        "Refleksi Perjalanan: Dari Kemalasan Menuju Disiplin Emas",
        "Puncak Kebijaksanaan Disiplin: Hidup Harmonis dan Penuh Daya"
      ]
    };
    return titles[partNum]?.[offset - 1] || `Kekuatan Disiplin Bab ${num}`;
  } else if (bookId === "kepemimpinan") {
    const titles: Record<number, string[]> = {
      1: [
        "Definisi Kepemimpinan: Membimbing, Bukan Sekadar Memerintah",
        "Pemimpin vs Manajer: Perbedaan Esensial yang Harus Dipahami",
        "Integritas Pemimpin: Fondasi Utama Membangun Kepercayaan",
        "Visi yang Jelas: Kompas yang Mengarahkan Perahu Organisasi",
        "Kecerdasan Emosional (EQ) sebagai Syarat Pemimpin Hebat",
        "Keberanian Mengambil Keputusan Sulit di Masa Krisis",
        "Komunikasi Kepemimpinan: Menyampaikan Pesan yang Menggerakkan",
        "Menjadi Teladan (Lead by Example) dalam Segala Hal",
        "Seni Mendengar: Senjata Rahasia Pemimpin yang Bijaksana",
        "Mengapa Kegagalan Kepemimpinan Sering Dimulai dari Kesombongan"
      ],
      2: [
        "Kepemimpinan Otokratis: Kapan Harus Digunakan?",
        "Kepemimpinan Demokratis: Memanfaatkan Kecerdasan Kolektif",
        "Gaya Kepemimpinan Laissez-Faire: Kebebasan dan Kepercayaan",
        "Kepemimpinan Karismatik: Daya Tarik yang Mengubah Sejarah",
        "Kepemimpinan Transaksional: Reward, Punishment, dan Target",
        "Kepemimpinan Transformasional: Menginspirasi Perubahan Besar",
        "Kepemimpinan Pelayan (Servant Leadership): Memimpin dengan Melayani",
        "Kepemimpinan Situasional: Menyesuaikan Gaya dengan Kondisi",
        "Kepemimpinan Birokratis: Menjaga Kepatuhan dan Aturan",
        "Kepemimpinan Visioner: Melihat Masa Depan Sebelum Orang Lain"
      ],
      3: [
        "Membangun Tim yang Solid, Tangguh, dan Kolaboratif",
        "Seni Mendelegasikan Wewenang Tanpa Kehilangan Kontrol",
        "Mengelola Konflik Internal Tim secara Konstruktif",
        "Bagaimana Memberikan Feedback yang Membangun (Bukan Menjatuhkan)",
        "Memotivasi Tim yang Mengalami Penurunan Performa",
        "Membangun Budaya Kerja yang Sehat dan Produktif",
        "Menemukan dan Mengembangkan Calon Pemimpin Baru (Kaderisasi)",
        "Menghargai Kontribusi Anggota: Kunci Loyalitas Tim",
        "Mengelola Keberagaman Karakter dalam Organisasi",
        "Prinsip Akuntabilitas: Bertanggung Jawab Atas Kesalahan Tim"
      ],
      4: [
        "Memimpin di Tengah Badai Krisis dan Ketidakpastian",
        "Siasat Menghadapi Kritik Pedas dan Penolakan Anggota",
        "Mengatasi Burnout Kepemimpinan: Menjaga Energi Tetap Stabil",
        "Kepemimpinan dalam Menghadapi Perubahan Teknologi Cepat",
        "Seni Bernegosiasi untuk Kepentingan Bersama",
        "Mengambil Pelajaran Moral dari Kegagalan Proyek Besar",
        "Menghadapi Anggota Tim yang Pembangkang atau Toksik",
        "Menjaga Ketenangan Pikiran (Stoic) di Tengah Kekacauan",
        "Kepemimpinan yang Berani Mengakui Kesalahan Sendiri",
        "Menavigasi Hambatan Finansial Organisasi dengan Bijak"
      ],
      5: [
        "Kepemimpinan Sosial: Menggerakkan Masyarakat Tanpa Bayaran",
        "Membangun Kepercayaan Publik (Public Trust) yang Kokoh",
        "Kepemimpinan dalam Organisasi Nirlaba (NGO/Komunitas)",
        "Prinsip Gotong Royong dalam Mengatasi Masalah Sosial",
        "Menjadi Penengah Adil dalam Konflik Antar Kelompok",
        "Mempromosikan Nilai Kemanusiaan dan Kesetaraan",
        "Kepemimpinan Pemuda: Agen Perubahan Masa Depan",
        "Menghargai Adat Istiadat Setempat dalam Memimpin Daerah",
        "Membangun Jaringan Kerja Sama Antar Komunitas",
        "Kepemimpinan yang Meninggalkan Dampak Sosial Positif"
      ],
      6: [
        "Kepemimpinan Bijaksana Sultan Agung dari Mataram",
        "Gajah Mada dan Sumpah Palapa: Kepemimpinan Visi Integrasi",
        "Konsep Astha Brata: 8 Sifat Alam bagi Pemimpin Jawa",
        "Kepemimpinan Religius-Nasionalis Wali Songo",
        "Ki Hajar Dewantara: Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani",
        "Strategi Kepemimpinan Militer Sultan Hasanuddin",
        "Gaya Kepemimpinan Humanis dan Merakyat Bung Hatta",
        "Karisma dan Retorika Pemersatu Bung Karno",
        "Kepemimpinan Diplomatik Raden Ajeng Kartini",
        "Siasat Perang Gerilya Jenderal Sudirman yang Menginspirasi"
      ],
      7: [
        "Kepemimpinan di Era Digital dan Kerja Jarak Jauh (Remote)",
        "Memimpin Generasi Z dan Milenial: Memahami Aspirasi Mereka",
        "Menggunakan Data (Data-Driven) dalam Pengambilan Keputusan",
        "Kepemimpinan Inklusif: Menolak Diskriminasi Gender dan SARA",
        "Etika Kepemimpinan dalam Penggunaan AI dan Teknologi Baru",
        "Membangun Transparansi Organisasi Lewat Media Digital",
        "Kepemimpinan Startup: Gesit, Cepat, dan Penuh Inovasi",
        "Menjaga Kesehatan Mental Tim di Era Tekanan Tinggi",
        "Kolaborasi Virtual: Menjaga Komitmen Tanpa Tatap Muka",
        "Mengelola Reputasi Pemimpin di Media Sosial"
      ],
      8: [
        "Studi Kasus Winston Churchill memimpin Inggris di Perang Dunia II",
        "Kepemimpinan Damai Nelson Mandela Menyatukan Afrika Selatan",
        "Gaya Kepemimpinan Steve Jobs: Detail, Perfeksionis, dan Inovatif",
        "Lee Kuan Yew: Kepemimpinan Tegas Mengubah Singapura",
        "Keteladanan Abraham Lincoln Menjaga Persatuan Amerika",
        "Gaya Kepemimpinan Mahatma Gandhi: Kekuatan Jiwa yang Lembut",
        "Kepemimpinan Taktis Julius Caesar dan Alexander Agung",
        "Studi Kasus Angela Merkel: Kepemimpinan Tenang dan Analitis",
        "Bagaimana Pemimpin Hebat Mengatasi Pengkhianatan Terdekat",
        "Pelajaran Kepemimpinan dari Tokoh Bisnis Kelas Dunia"
      ],
      9: [
        "Merancang Rencana Strategis Jangka Panjang (Visi 10 Tahun)",
        "Kepemimpinan Berkelanjutan (Sustainable): Ramah Lingkungan",
        "Menyikapi Krisis Reputasi Perusahaan secara Taktis",
        "Membangun Sistem Pengambil Keputusan yang Objektif",
        "Mengelola Alokasi Anggaran Besar secara Efisien dan Jujur",
        "Kepemimpinan dalam Restrukturisasi Organisasi",
        "Seni Mengakuisisi dan Menggabungkan Kekuatan Dua Tim",
        "Menjaga Nilai-Nilai Inti (Core Values) Perusahaan Tetap Hidup",
        "Kepemimpinan Berbasis Kinerja (Key Performance Indicator)",
        "Mempersiapkan Rencana Suksesi Kepemimpinan yang Mulus"
      ],
      10: [
        "Kepemimpinan Spiritual: Menyelaraskan Kerja dengan Jiwa",
        "Meninggalkan Warisan (Legacy) Kepemimpinan yang Agung",
        "Kepemimpinan yang Melampaui Ego Pribadi (Level 5 Leadership)",
        "Menemukan Kedamaian di Puncak Kekuasaan",
        "Menjadi Mentor Terbaik bagi Generasi Berikutnya",
        "Kepemimpinan adalah Pengorbanan, Bukan Keistimewaan",
        "Bersikap Adil Tanpa Memandang Suku, Agama, dan Hubungan Darah",
        "Menghargai Kehidupan Sederhana Setelah Pensiun Memimpin",
        "Refleksi Kepemimpinan: Apakah Kehadiran Saya Menghidupkan?",
        "Puncak Kebijaksanaan Memimpin: Membawa Terang bagi Semua"
      ]
    };
    return titles[partNum]?.[offset - 1] || `Seni Kepemimpinan Bab ${num}`;
  } else if (bookId === "kekuasaan") {
    const titles: Record<number, string[]> = {
      1: [
        "Definisi Kekuasaan: Hakikat, Batasan, dan Sumber Energi",
        "Kekuasaan vs Otoritas: Mengapa Keduanya Berbeda",
        "Tiga Jenis Otoritas Max Weber: Tradisional, Karismatik, Legal-Rasional",
        "Realpolitik: Memahami Kekuasaan Apa Adanya (Bukan Seharusnya)",
        "Etika Kekuasaan: Menjaga Batas Moral Agar Tidak Korup",
        "Mengapa Kekuasaan Cenderung Korup (Teori Lord Acton)",
        "Kekuasaan Lembut (Soft Power) vs Kekuasaan Keras (Hard Power)",
        "Legitimitasi Kekuasaan: Pentingnya Pengakuan dari yang Dikuasai",
        "Struktur Kekuasaan Formal dan Informal dalam Organisasi",
        "Kisah Perebutan Kekuasaan Terkenal dalam Sejarah Dunia"
      ],
      2: [
        "Teori Kekuasaan Machiavelli: Lebih Baik Ditakuti atau Dicintai?",
        "Prinsip Penguasa yang Efektif menurut Sejarah Klasik",
        "Seni Membangun Aliansi Strategis untuk Memperkuat Posisi",
        "Mengelola Reputasi Penguasa: Pentingnya Citra Publik",
        "Bagaimana Membaca Gerak-Gerik Lawan Politik secara Akurat",
        "Siasat Menghadapi Ancaman dan Kudeta",
        "Retorika dan Propaganda: Bahasa sebagai Instrumen Kekuasaan",
        "Pentingnya Intelijen dan Informasi Akurat bagi Penguasa",
        "Menggunakan Hukum sebagai Alat Menjaga Stabilitas",
        "Menghindari Musuh yang Terlalu Banyak dalam Satu Waktu"
      ],
      3: [
        "Seni Bernegosiasi dengan Posisi Tawar yang Lemah",
        "Bagaimana Membagi Kekuasaan Tanpa Kehilangan Kendali",
        "Siasat Menghadapi Kritik Pedas dari Oposisi",
        "Manajemen Konflik: Mengadu Domba vs Mempersatukan",
        "Membangun Perisai Keamanan bagi Penguasa",
        "Siasat Menghadapi Tekanan Publik secara Tenang",
        "Retorika Pidato yang Menghentak dan Menenangkan Jiwa",
        "Menghadapi Krisis Kepercayaan: Strategi Pemulihan Citra",
        "Bagaimana Memanfaatkan Media Massa untuk Stabilitas",
        "Prinsip Keadilan Hukum sebagai Pilar Utama Kekuasaan Abadi"
      ],
      4: [
        "Menghadapi Krisis Ekonomi yang Mengancam Legitimasi",
        "Siasat Mengatasi Pengkhianatan di Lingkaran Terdalam",
        "Menghadapi Oposisi Radikal Tanpa Kekerasan Berdarah",
        "Bagaimana Mengelola Demonstrasi Massa secara Persuasif",
        "Siasat Bertahan Saat Kekuasaan Berada di Ujung Tanduk",
        "Menghadapi Sanksi Internasional dengan Diplomasi Cerdas",
        "Menemukan Titik Lemah Lawan Tanpa Harus Menyerang Langsung",
        "Mengelola Rumor dan Kampanye Hitam (Black Campaign)",
        "Siasat Diplomasi Dua Wajah untuk Kepentingan Nasional",
        "Menghadapi Kegagalan Kebijakan dengan Solusi Cepat"
      ],
      5: [
        "Kekuasaan Sosial: Kekuatan Komunitas Menekan Penguasa",
        "Peran Tokoh Adat dan Agama dalam Keseimbangan Otoritas",
        "Membangun Hubungan Harmonis dengan Rakyat Jelata",
        "Kekuasaan Ekonomi vs Kekuasaan Politik: Siapa Memimpin Siapa?",
        "Etika Berbagi Kekuasaan dengan Kelompok Minoritas",
        "Menghindari Nepotisme yang Merusak Struktur Otoritas",
        "Kekuasaan Pers (Media) sebagai Pilar Keempat Demokrasi",
        "Mengatasi Kesenjangan Sosial Demi Mencegah Pemberontakan",
        "Membangun Konsensus Bersama untuk Program Nasional",
        "Kekuasaan Rakyat: Dari Demonstrasi hingga Pemilu"
      ],
      6: [
        "Konsep Kekuasaan Jawa: Konkret, Homogen, dan Berasal dari Tuhan",
        "Wahyu Cakraningrat: Tanda Spiritual Pemimpin Agung",
        "Siasat Kekuasaan Gajah Mada Menyatukan Nusantara",
        "Strategi Politik Sultan Agung Membendung Penjajah Belanda",
        "Dinamika Kekuasaan Kerajaan Sriwijaya Menguasai Selat Malaka",
        "Kekuasaan Majapahit: Hubungan Mitratama dengan Kerajaan Sahabat",
        "Siasat Diplomasi Kerajaan Sunda Pajajaran",
        "Kekuasaan Wali Songo: Penetrasi Budaya yang Damai",
        "Siasat Perang dan Politik Pangeran Diponegoro",
        "Nilai Luhur Manunggaling Kawula Gusti dalam Kekuasaan Nusantara"
      ],
      7: [
        "Kekuasaan Digital: Bagaimana Algoritma Mengontrol Opini Publik",
        "Perang Siber (Cyber Warfare) dan Pengaruh Asing",
        "Dinamika Kekuasaan Perusahaan Teknologi Raksasa (Big Tech)",
        "Kekuasaan Informasi: Siapa Menguasai Data, Menguasai Dunia",
        "Siasat Menghadapi Hoaks Politik Terstruktur",
        "Membangun Pertahanan Siber Nasional yang Kokoh",
        "Dampak Kebocoran Data (Data Leak) terhadap Kekuasaan",
        "Mata Uang Kripto vs Kekuasaan Bank Sentral",
        "Bagaimana AI Mengubah Lanskap Pengambilan Kebijakan",
        "Kekuasaan Netizen: Kekuatan Opini Kolektif di Internet"
      ],
      8: [
        "Studi Kasus Politik Machiavellian Cesare Borgia",
        "Bagaimana Napoleon Bonaparte Merebut dan Kehilangan Perancis",
        "Siasat Diplomasi Otto von Bismarck Menyatukan Jerman",
        "Kekuasaan Hegemoni Amerika Serikat Pasca Perang Dingin",
        "Kebangkitan Kekuasaan Ekonomi dan Politik Tiongkok",
        "Dinamika Kekuasaan Uni Soviet: Dari Kejayaan hingga Runtuh",
        "Siasat Diplomasi Singkat Nelson Mandela Menghapus Apartheid",
        "Studi Kasus Kudeta Militer dan Cara Menghindarinya",
        "Kekuasaan Monarki Inggris: Simbol Pemersatu Bangsa",
        "Pelajaran Berharga dari Kejatuhan Para Diktator Dunia"
      ],
      9: [
        "Geopolitik: Pengaruh Posisi Geografis terhadap Kekuasaan",
        "Siasat Diplomasi Multilateral di Forum Internasional (PBB)",
        "Perang Dagang: Senjata Ekonomi untuk Dominasi Global",
        "Blok Politik Dunia: NATO, BRICS, dan Poros Kekuasaan Baru",
        "Siasat Mengamankan Jalur Perdagangan Energi Strategis",
        "Kekuasaan Militer Modern: Nuklir, Drone, dan Teknologi Tempur",
        "Diplomasi Budaya: Menyebarkan Pengaruh Lewat Kuliner dan Musik",
        "Menavigasi Perebutan Kekuasaan di Wilayah Laut Cina Selatan",
        "Peran PBB dan Hukum Internasional dalam Membatasi Kekuasaan",
        "Geopolitik Nusantara: Indonesia sebagai Poros Maritim Dunia"
      ],
      10: [
        "Kekuasaan Sejati: Pengendalian Diri Sendiri (Self-Mastery)",
        "Ketika Penguasa Harus Mundur Demi Kepentingan Bangsa (Lengser Keprabon)",
        "Kekuasaan adalah Amanah Spiritual yang Dipertanggungjawabkan",
        "Meninggalkan Kekuasaan dengan Nama Baik yang Harum",
        "Kebahagiaan Penguasa yang Dicintai Rakyatnya",
        "Menghindari Racun Pujian Palsu di Sekitar Kekuasaan",
        "Filsafat Kekuasaan Mandala: Pusat yang Tenang Mengatur Keliling",
        "Kekuasaan yang Abadi Adalah Karya Kebajikan",
        "Refleksi Akhir: Untuk Apa Kekuasaan Ini Digunakan?",
        "Puncak Kebijaksanaan Kekuasaan: Menyejahterakan Seluruh Alam"
      ]
    };
    return titles[partNum]?.[offset - 1] || `Teori Kekuasaan Bab ${num}`;
  }
  return `Bab ${num}`;
}

// Procedural Content Generator for 100 chapters
export function generateChapterContent(bookId: string, num: number, title: string): string {
  const { partTitle } = getPartInfo(num);
  const book = books.find(b => b.id === bookId);
  const bookTitle = book ? book.title : "Buku Bacaan";

  // Contextual customized introductory paragraphs based on bookId
  let p1 = "";
  let p2 = "";
  let p3 = "";
  let p4 = "";

  if (bookId === "filsafat") {
    p1 = `Dalam bab ke-${num} ini, kita memasuki bahasan penting yang berjudul "${title}". Sebagai bagian dari "${partTitle}", materi ini dirancang untuk membongkar asumsi-asumsi dasar yang seringkali kita terima begitu saja tanpa perenungan mendalam. Jundi Abdul Syahid, S.Pd. menekankan bahwa berfilsafat bukanlah sekadar menghafal teori kuno, melainkan mengasah ketajaman pisau analisis rasio kita dalam menatap realitas kehidupan sehari-hari secara kritis dan bijaksana.`;
    p2 = `Secara mendalam, topik ini mengupas bagaimana kesadaran manusia berinteraksi dengan kebenaran hakiki. Kita ditantang untuk memahami relasi logis antara pikiran kita dengan realitas empiris di sekitar kita. Misalnya, bagaimana kita membedakan antara opini yang subjektif dengan kebenaran yang koheren? Melalui pendekatan filsafat yang sistematis dan mudah dipahami, bab ini memberikan kerangka kerja (framework) logis agar Anda dapat memilah informasi dengan jernih, mendeteksi kerancuan berpikir (logical fallacy), dan membangun argumen yang kokoh serta tidak mudah terombang-ambing oleh doktrin yang dangkal.`;
    p3 = `Dari sudut pandang kearifan lokal Nusantara, konsep ini sangat selaras dengan prinsip keseimbangan kosmis dan keharmonisan batin. Beliau mengaitkannya dengan kesadaran 'Genetik Jawa' di mana berpikir kritis harus selalu diimbangi dengan kehalusan budi pekerti (rasa). Pengetahuan tanpa kebijaksanaan spiritual akan melahirkan kepintaran yang merusak, sedangkan kebijaksanaan tanpa analisis rasional yang kritis akan menjebak kita dalam takhayul dan stagnasi berpikir. Oleh karena itu, bab ini menjembatani ketajaman logika Barat dengan kedalaman rasa Timur secara apik dan relevan.`;
    p4 = `Sebagai rangkuman dan aplikasi praktis, mulailah mempertanyakan hal-hal kecil di sekitar Anda hari ini dengan penuh rasa ingin tahu yang sehat. Jangan biarkan pikiran Anda menjadi tempat sampah bagi dogma-dogma yang belum teruji kebenarannya. Jadilah penjelajah kebenaran yang mandiri. Ingatlah selalu bahwa hidup yang tidak direfleksikan adalah hidup yang tidak layak untuk dijalani. Pertahankan api rasa ingin tahu Anda tetap menyala terang di era digital yang penuh dengan distorsi informasi ini.`;
  } else if (bookId === "the-power-of-principle") {
    p1 = `Memegang teguh sebuah nilai di tengah dunia yang serba berubah adalah inti dari pembahasan bab ke-${num}: "${title}". Berada di bawah naungan "${partTitle}", pembahasan ini menuntun kita untuk menyadari bahwa kesuksesan lahiriah tanpa fondasi prinsip internal yang kokoh adalah ilusi yang rapuh. Jundi Abdul Syahid, S.Pd. menjabarkan bahwa kompas moral dalam diri kita adalah satu-satunya pelindung autentik saat badai kehidupan dan badai godaan sosial menerjang integritas pribadi kita.`;
    p2 = `Banyak orang mengorbankan prinsip demi kenyamanan jangka pendek, popularitas semu, atau keuntungan finansial instan. Namun, bab ini menjelaskan secara gamblang bahwa harga dari hilangnya integritas jauh lebih mahal daripada kehilangan materi apa pun. Ketika Anda berkompromi pada hal-hal mendasar yang Anda yakini benar, Anda secara perlahan sedang meruntuhkan rasa percaya diri dan kehormatan diri Anda sendiri. Melalui penjelasan materi yang mengalir dan mudah dipahami, Anda akan diajak merumuskan kembali batas-batas tegas (boundaries) yang tidak boleh dilanggar oleh siapa pun, demi menjaga martabat dan ketenangan jiwa Anda.`;
    p3 = `Dalam lintasan sejarah Nusantara, integritas ksatria dikenal dengan istilah menetapkan tekad tanpa pamrih demi kebenaran sejati. Para pahlawan kita tidak tunduk pada iming-iming kemewahan dari penjajah karena mereka memiliki jangkar prinsip yang tertanam sangat dalam di relung jiwa mereka. Kesadaran akan nilai luhur ini menuntut kita untuk menjadi pribadi yang mandiri secara moral, berani berdiri tegak menyuarakan kebenaran sekalipun harus berdiri sendirian di tengah kerumunan yang menutup mata.`;
    p4 = `Penerapan praktis dari bab ini sangat sederhana namun menantang: tulislah prinsip hidup utama Anda dan jadikan itu sebagai hakim tertinggi dalam setiap pengambilan keputusan krusial Anda hari ini. Ketika Anda dihadapkan pada persimpangan dilema etis, tanyalah pada kompas internal Anda, bukan pada apa yang disukai orang banyak. Konsistensi memegang prinsip inilah yang akan membedakan Anda sebagai manusia berkarakter unggul yang dihormati sepanjang zaman.`;
  } else if (bookId === "the-power-of-discipline") {
    p1 = `Disiplin bukanlah penjara, melainkan kunci kebebasan yang sesungguhnya. Dalam bab ke-${num} yang bertajuk "${title}" ini, kita membedah daya disiplin militan dari perspektif aplikatif dan ilmiah. Sebagai bagian dari "${partTitle}", tulisan ini dirancang secara khusus untuk membantah mitos bahwa kesuksesan hanya milik mereka yang berbakat. Jundi Abdul Syahid, S.Pd. menegaskan bahwa bakat tanpa disiplin akan layu, sedangkan disiplin tanpa bakat pun mampu melahirkan mahakarya yang menakjubkan.`;
    p2 = `Materi dalam bab ini fokus pada taktik konkret untuk menaklukkan prokrastinasi (kebiasaan menunda-nunda) yang sering menjadi virus penghambat kemajuan. Kita akan mempelajari bagaimana otak kita bereaksi terhadap kepuasan instan dan bagaimana kita dapat melatih ulang fokus kita untuk mencintai proses jangka panjang. Anda akan dipandu untuk menerapkan aturan-aturan praktis, menyusun jadwal harian yang realistis namun menantang, serta membangun sistem akuntabilitas pribadi sehingga kedisiplinan tidak lagi terasa sebagai beban yang menyiksa, melainkan menjadi identitas dan kebiasaan otomatis yang menyenangkan.`;
    p3 = `Beliau juga menghubungkan nilai disiplin ini dengan budaya tirakat dan laku spiritual Nusantara. Leluhur kita terbiasa menjalani disiplin fisik dan mental yang ketat—seperti puasa, bangun sebelum fajar, dan bermeditasi—bukan untuk menyiksa diri, melainkan untuk melatih kendali penuh atas hawa nafsu dan emosi liar. Pengendalian diri inilah sumber energi emas yang memampukan seseorang menyelesaikan proyek-proyek raksasa bersejarah, seperti pembangunan candi-candi megah yang bertahan melintasi ribuan tahun perubahan zaman.`;
    p4 = `Langkah nyata yang dapat Anda ambil segera setelah membaca bab ini adalah memilih satu kebiasaan kecil yang positif, lalu lakukanlah itu tanpa absen selama 30 hari ke depan. Jangan menunggu motivasi datang, karena motivasi sering kali datang setelah Anda mulai bertindak. Ingatlah, kemenangan terbesar di dunia ini bukanlah menaklukkan orang lain atau merebut wilayah baru, melainkan menaklukkan kemalasan dan ego liar yang bersemayam di dalam diri Anda sendiri.`;
  } else if (bookId === "kepemimpinan") {
    p1 = `Kepemimpinan bukanlah tentang jabatan atau tahta, melainkan tentang tanggung jawab dan pengaruh positif yang kita pancarkan ke sekeliling kita. Dalam bab ke-${num} ini, kita membedah topik penting "${title}" yang merupakan bagian dari "${partTitle}". Jundi Abdul Syahid, S.Pd. mengajak kita mengevaluasi kembali gaya kepemimpinan kita, baik dalam skala mikro seperti memimpin diri sendiri dan keluarga, maupun skala makro dalam mengelola organisasi, perusahaan, hingga komunitas sosial kemasyarakatan.`;
    p2 = `Secara mendalam, bab ini menjelaskan berbagai gaya kepemimpinan secara taktis dan seimbang. Anda akan memahami kapan harus bertindak tegas, kapan harus mendengar dengan empati, dan bagaimana cara mendelegasikan wewenang tanpa kehilangan kendali strategis. Pemimpin yang hebat tidak menciptakan pengikut yang buta, melainkan melahirkan pemimpin-pemimpin baru yang jauh lebih hebat dari dirinya. Melalui materi yang kaya akan contoh studi kasus ini, Anda akan diajarkan seni berkomunikasi yang menginspirasi, metode penyelesaian konflik tanpa menyinggung ego anggota, serta cara menjaga performa tim tetap stabil di tengah situasi krisis.`;
    p3 = `Kearifan kepemimpinan Nusantara sangat kaya akan filosofi luhur, salah satunya adalah konsep Astha Brata yang mengajarkan bahwa seorang pemimpin wajib meneladani 8 sifat unsur alam (seperti matahari yang memberi energi, bumi yang sabar menampung, angin yang mengisi setiap celah kosong, dan samudra yang luas menampung keluhan). Dengan mengintegrasikan nilai-nilai kepemimpinan agung masa lalu dengan tantangan era digital saat ini, bab ini memberikan bekal kepemimpinan yang holistik, adaptif, kokoh secara karakter, dan humanis secara tindakan.`;
    p4 = `Mulailah melatih kepemimpinan Anda hari ini dengan mengambil tanggung jawab atas hal-hal yang sering dihindari orang lain. Dengarkan keluhan anggota tim Anda dengan tulus, dan berikan apresiasi yang jujur atas kontribusi sekecil apa pun yang mereka berikan. Jadilah pemimpin yang kehadirannya menghidupkan semangat juang bersama, menuntun tim melintasi badai rintangan menuju pantai kesuksesan yang gilang-gemilang.`;
  } else if (bookId === "kekuasaan") {
    p1 = `Kekuasaan adalah salah satu instrumen paling berpengaruh sekaligus paling rapuh dalam sejarah peradaban manusia. Memasuki bab ke-${num} yang berjudul "${title}" di bawah payung "${partTitle}", kita akan membedah anatomi kekuasaan secara objektif, ilmiah, dan mendalam. Jundi Abdul Syahid, S.Pd. menyusun materi ini untuk memberikan pemahaman realpolitik yang jernih, bebas dari kenaifan, namun tetap berpegang teguh pada kompas etika kemanusiaan yang luhur agar kekuasaan tidak berubah menjadi kezaliman.`;
    p2 = `Bab ini memaparkan dengan sangat sistematis dari mana kekuasaan berasal, bagaimana ia dipertahankan, dan apa yang menyebabkan kekuasaan runtuh seketika. Kita akan mengkaji teori-teori kekuasaan klasik hingga modern, menganalisis relasi dinamis antara legitimasi hukum dengan persepsi publik, serta mempelajari taktik-taktik diplomasi dan retorika yang digunakan para tokoh besar dunia dalam mengamankan stabilitas sosial. Pemahaman ini sangat penting agar kita tidak mudah termanipulasi oleh intrik-intrik politik murahan, dan mampu memposisikan diri secara strategis dalam setiap dinamika kekuasaan di tempat kerja maupun kehidupan publik.`;
    p3 = `Dalam sejarah Nusantara, dinamika kekuasaan sering kali digambarkan lewat perebutan wahyu kepemimpinan dan keseimbangan kosmis. Kekuasaan dalam pandangan leluhur kita bukanlah alat untuk menindas rakyat kecil, melainkan amanah suci yang wajib disinergikan dalam konsep kesejahteraan bersama. Ketika penguasa melupakan rakyatnya dan mementingkan kelompoknya sendiri, hukum alam semesta (hukum sebab-akibat kosmis) akan bekerja mengembalikan keseimbangan, meruntuhkan kerajaan paling megah sekalipun menjadi puing-puing sejarah yang terlupakan.`;
    p4 = `Refleksi praktis dari bab ini menuntut kita untuk selalu memeriksa niat dan tujuan kita dalam mencari pengaruh atau kekuasaan. Kekuasaan yang sejati bukanlah kemampuan untuk memaksa orang lain tunduk pada kehendak kita, melainkan kapasitas diri untuk memberdayakan sesama, menegakkan keadilan, dan menyebarkan kemaslahatan seluas-luasnya. Gunakan setiap otoritas kecil yang Anda miliki saat ini untuk melindungi yang lemah dan membangun peradaban yang beradab.`;
  }

  return `${p1}\n\n${p2}\n\n${p3}\n\n${p4}`;
}
