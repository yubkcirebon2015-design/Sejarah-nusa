import { Kingdom, Hero, HistoricalEvent, CompilerBiography } from "../types";

export const initialKingdoms: Kingdom[] = [
  {
    id: "k-1",
    name: "Kerajaan Kutai Martapura",
    period: "Abad ke-4 Masehi",
    location: "Muara Kaman, Kalimantan Timur",
    founder: "Kudungga",
    description: "Kerajaan Hindu tertua di Nusantara yang terletak di tepi Sungai Mahakam.",
    history: "Kerajaan Kutai didirikan sekitar abad ke-4 Masehi. Raja terkenal dari kerajaan ini adalah Mulawarman, yang terkenal sangat dermawan dengan menyedekahkan 20.000 ekor sapi kepada para kaum Brahmana. Bukti keberadaan kerajaan ini adalah ditemukannya 7 buah prasasti Yupa (tiang batu penambat hewan kurban)."
  },
  {
    id: "k-2",
    name: "Kerajaan Tarumanegara",
    period: "Abad ke-4 - ke-7 Masehi",
    location: "Jawa Barat (sekitar Bogor, Bekasi, & Jakarta)",
    founder: "Jayasingawarman",
    description: "Kerajaan Hindu bercorak Wisnu tertua di Pulau Jawa.",
    history: "Mencapai puncak kejayaan pada masa pemerintahan Raja Purnawarman. Ia dikenal sebagai raja yang gagah berani dan sangat memperhatikan kemakmuran rakyatnya, dibuktikan dengan penggalian Sungai Gomati sepanjang 12 km untuk irigasi pertanian dan pencegahan banjir. Peninggalan terkenalnya meliputi Prasasti Ciaruteun (yang memuat bekas telapak kaki Purnawarman) dan Prasasti Kebon Kopi."
  },
  {
    id: "k-3",
    name: "Kerajaan Sriwijaya",
    period: "Abad ke-7 - ke-14 Masehi",
    location: "Palembang, Sumatera Selatan",
    founder: "Dapunta Hyang Sri Jayanasa",
    description: "Kerajaan maritim Buddha terbesar di Asia Tenggara dengan pengaruh perdagangan internasional yang sangat luas.",
    history: "Sriwijaya menguasai jalur perdagangan Selat Malaka, Selat Sunda, dan Laut Jawa. Pada abad ke-9 di bawah pimpinan Raja Balaputradewa, Sriwijaya mencapai masa emasnya sebagai pusat pembelajaran agama Buddha internasional dan hubungan diplomatik dengan India dan Dinasti Tang di Tiongkok. Peninggalannya antara lain Prasasti Kedukan Bukit, Talang Tuwo, dan Candi Muara Takus."
  },
  {
    id: "k-4",
    name: "Kerajaan Majapahit",
    period: "1293 - 1527 Masehi",
    location: "Trowulan, Mojokerto, Jawa Timur",
    founder: "Raden Wijaya",
    description: "Kerajaan Hindu-Buddha terbesar di Nusantara yang berhasil menyatukan wilayah Nusantara di bawah Sumpah Palapa.",
    history: "Didirikan oleh Raden Wijaya setelah mengalahkan tentara Mongol. Majapahit mencapai puncak kejayaan pada masa pemerintahan Hayam Wuruk dengan Mahapatih Gajah Mada. Gajah Mada mengucapkan 'Sumpah Palapa' yang bersumpah tidak akan menikmati rempah-rempah (istirahat/pensiun) sebelum menyatukan Nusantara di bawah panji Majapahit. Karya sastra terkenal masa ini adalah Kitab Negarakertagama dan Sutasoma (asal semboyan Bhinneka Tunggal Ika)."
  },
  {
    id: "k-5",
    name: "Kerajaan Singasari",
    period: "1222 - 1292 Masehi",
    location: "Malang, Jawa Timur",
    founder: "Ken Arok",
    description: "Kerajaan bercorak Hindu-Buddha yang terkenal dengan kisah perebutan takhta melalui keris Mpu Gandring.",
    history: "Didirikan oleh Ken Arok setelah meruntuhkan Kerajaan Kediri. Kerajaan ini mencapai kejayaan di bawah Raja Kertanegara yang mencetuskan Ekspedisi Pamalayu untuk membendung ekspansi Kekaisaran Mongol di bawah Kubilai Khan. Peninggalan terkenalnya adalah Candi Singasari, Candi Jago, dan patung dwarapala."
  },
  {
    id: "k-6",
    name: "Kesultanan Demak",
    period: "1475 - 1554 Masehi",
    location: "Demak, Jawa Tengah",
    founder: "Raden Patah",
    description: "Kerajaan Islam pertama di Pantai Utara Pulau Jawa yang menjadi pusat penyebaran Islam oleh Walisongo.",
    history: "Didirikan oleh Raden Patah, putra dari raja terakhir Majapahit. Demak memainkan peran penting dalam meruntuhkan hegemoni Hindu-Buddha dan membendung Portugis di Malaka di bawah komando Pati Unus (Pangeran Sabrang Lor). Peninggalan sejarah yang sangat legendaris adalah Masjid Agung Demak yang tiang utamanya dibuat dari soko tatal oleh Walisongo."
  },
  {
    id: "k-7",
    name: "Kesultanan Mataram Islam",
    period: "1588 - 1755 Masehi",
    location: "Kotagede, Yogyakarta",
    founder: "Sutawijaya (Panembahan Senopati)",
    description: "Kerajaan Islam agraris terbesar di Pulau Jawa yang gigih melawan VOC.",
    history: "Mencapai masa keemasan di bawah Sultan Agung Hanyokrokusumo yang menyatukan hampir seluruh tanah Jawa dan melakukan penyerangan legendaris ke Batavia (VOC) pada tahun 1628 dan 1629. Melalui Perjanjian Giyanti tahun 1755, Mataram pecah menjadi dua kekuasaan yaitu Kasunanan Surakarta dan Kasultanan Yogyakarta."
  },
  {
    id: "k-8",
    name: "Kesultanan Samudera Pasai",
    period: "1267 - 1521 Masehi",
    location: "Lhokseumawe, Aceh",
    founder: "Marah Silu (Sultan Malik as-Saleh)",
    description: "Kerajaan Islam pertama di Nusantara yang menjadi bandar transito perdagangan internasional.",
    history: "Terletak di ujung utara Sumatera, Samudera Pasai menjadi pusat studi Islam utama dan dikunjungi oleh penjelajah dunia legendaris seperti Marco Polo dan Ibnu Battutah. Kerajaan ini mengeluarkan mata uang emas murni yang disebut Dirham sebagai alat pembayaran resmi."
  },
  {
    id: "k-9",
    name: "Kesultanan Gowa-Tallo",
    period: "Abad ke-14 - 1946 Masehi",
    location: "Makassar, Sulawesi Selatan",
    founder: "Tumapa'risi' Kallonna",
    description: "Kerajaan maritim kembar yang bersatu dan terkenal dengan kekuatan militernya yang tangguh.",
    history: "Mencapai masa kejayaan di bawah Sultan Hasanuddin yang dijuluki Belanda sebagai 'Ayam Jantan dari Timur' karena keberaniannya menentang monopoli dagang VOC. Konflik panjang berakhir dengan ditandatanganinya Perjanjian Bongaya pada tahun 1667."
  },
  {
    id: "k-10",
    name: "Kesultanan Banten",
    period: "1526 - 1813 Masehi",
    location: "Serang, Banten",
    founder: "Syarif Hidayatullah (Sunan Gunung Jati)",
    description: "Kerajaan pelabuhan lada internasional yang mandiri di ujung barat Pulau Jawa.",
    history: "Mencapai puncak kejayaan di bawah Sultan Ageng Tirtayasa yang gigih menolak monopoli dagang VOC. Banten tumbuh menjadi pusat perdagangan internasional terbuka yang mempertemukan pedagang dari Eropa, Arab, Tiongkok, dan India. Konflik internal antara Sultan Ageng dan putranya, Sultan Haji yang memihak VOC, meruntuhkan kerajaan ini."
  }
];

export const initialHeroes: Hero[] = [
  {
    id: "h-1",
    name: "Ir. Soekarno",
    birthDeath: "1901 - 1970",
    origin: "Surabaya, Jawa Timur",
    category: "Proklamator Kemerdekaan",
    description: "Bapak Proklamator, Presiden pertama Republik Indonesia, dan perumus ideologi Pancasila.",
    story: "Lahir dengan nama Koesno Sosrodihardjo, Soekarno mendedikasikan hidupnya untuk kemerdekaan Indonesia. Melalui retorika yang membakar semangat, tulisan-tulisan revolusioner, dan kepemimpinan di PNI, ia memimpin perjuangan diplomatik dan fisik. Bersama Bung Hatta, beliau membacakan Proklamasi Kemerdekaan pada 17 Agustus 1945. Soekarno juga mencetuskan Gerakan Non-Blok melalui Konferensi Asia Afrika 1955."
  },
  {
    id: "h-2",
    name: "Drs. Mohammad Hatta",
    birthDeath: "1902 - 1980",
    origin: "Bukittinggi, Sumatera Barat",
    category: "Proklamator & Bapak Koperasi",
    description: "Wakil Presiden pertama RI, diplomat ulung, dan pelopor gerakan koperasi nasional.",
    story: "Bung Hatta dikenal sebagai pemikir ulung yang tenang dan disiplin tinggi. Berjuang sejak masa studi di Belanda bersama Perhimpunan Indonesia. Beliau memimpin delegasi Indonesia dalam Konferensi Meja Bundar (KMB) di Den Haag yang akhirnya memaksa Belanda mengakui kedaulatan Indonesia secara penuh pada tahun 1949."
  },
  {
    id: "h-3",
    name: "Jenderal Besar Soedirman",
    birthDeath: "1916 - 1950",
    origin: "Purbalingga, Jawa Tengah",
    category: "Militer & Panglima Besar pertama",
    description: "Panglima tentara pertama Indonesia yang memimpin perang gerilya dalam kondisi sakit paru-paru.",
    story: "Sudirman terpilih menjadi Panglima Besar TKR pada usia sangat muda. Saat Belanda melancarkan Agresi Militer II dan menduduki Yogyakarta, Soedirman menolak menyerah. Dengan satu paru-paru yang berfungsi akibat TBC, beliau ditandu keluar masuk hutan sejauh ratusan kilometer untuk memimpin taktik gerilya semesta yang melumpuhkan konsentrasi pasukan Belanda."
  },
  {
    id: "h-4",
    name: "Pangeran Diponegoro",
    birthDeath: "1785 - 1855",
    origin: "Yogyakarta",
    category: "Pahlawan Perjuangan Daerah",
    description: "Pemimpin Perang Jawa (1825-1830), perang terbesar yang hampir membangkrutkan kas kolonial Belanda.",
    story: "Putra sulung Sultan Hamengkubuwono III ini menentang campur tangan Belanda di keraton dan rencana pembuatan jalan melintasi makam leluhurnya di Tegalrejo. Diponegoro mengobarkan Perang Jawa dengan strategi perang gerilya berlandaskan perang suci. Perang ini menuntut korban jiwa sangat besar di kedua belah pihak hingga Belanda harus menggunakan taktik Benteng Stelsel dan kelicikan diplomasi untuk menangkapnya."
  },
  {
    id: "h-5",
    name: "Raden Ajeng Kartini",
    birthDeath: "1879 - 1904",
    origin: "Jepara, Jawa Tengah",
    category: "Pelopor Emansipasi Wanita",
    description: "Pejuang hak wanita, pendidikan perempuan, dan penulis korespondensi legendaris 'Habis Gelap Terbitlah Terang'.",
    story: "Meskipun hidup dalam pingitan adat feodal Jawa, Kartini berkorespondensi dengan teman-temannya di Belanda mengenai aspirasinya membebaskan perempuan bumiputera dari keterbelakangan, kebodohan, dan ketidaksetaraan hak. Surat-suratnya yang dikumpulkan setelah ia wafat menginspirasi gerakan emansipasi wanita di Nusantara."
  },
  {
    id: "h-6",
    name: "Cut Nyak Dien",
    birthDeath: "1848 - 1908",
    origin: "Aceh Besar",
    category: "Pahlawan Perjuangan Daerah",
    description: "Pejuang wanita legendaris dari tanah rencong yang gigih memimpin perlawanan bersenjata melawan Belanda.",
    story: "Setelah suaminya Ibrahim Lamnga gugur, Cut Nyak Dien bersumpah menghancurkan Belanda. Beliau menikah lagi dengan Teuku Umar untuk memperkuat barisan pejuang. Bersama-sama mereka bergerilya. Bahkan setelah Teuku Umar gugur dan kondisi fisiknya mulai rabun dan encok, Cut Nyak Dien tetap memimpin sisa pasukannya bergerilya di hutan belantara sampai akhirnya dikhianati anak buahnya sendiri karena iba."
  },
  {
    id: "h-7",
    name: "Ki Hajar Dewantara",
    birthDeath: "1889 - 1959",
    origin: "Yogyakarta",
    category: "Bapak Pendidikan Nasional",
    description: "Pendiri Perguruan Taman Siswa yang mengedepankan asas pendidikan merdeka bagi rakyat pribumi.",
    story: "Lahir dengan nama Raden Mas Soewardi Soerjaningrat, beliau menanggalkan gelar kebangsawanannya agar bisa menyatu dengan rakyat. Kritikan tajamnya melalui tulisan 'Als ik eens Nederlander was' (Seandainya Aku Seorang Belanda) membuatnya dibuang ke Belanda. Sekembalinya, ia mendirikan Taman Siswa dan melahirkan filosofi legendaris: 'Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani'."
  },
  {
    id: "h-8",
    name: "Sultan Hasanuddin",
    birthDeath: "1631 - 1670",
    origin: "Gowa, Sulawesi Selatan",
    category: "Pahlawan Perjuangan Daerah",
    description: "Raja Gowa ke-16 yang dijuluki Belanda sebagai 'De Haantjes van het Oosten' (Ayam Jantan dari Timur).",
    story: "Sultan Hasanuddin memimpin perjuangan membela kedaulatan negerinya dari monopoli rempah-rempah yang dipaksakan VOC bekerjasama dengan Arung Palakka dari Bone. Keberaniannya mengarungi pertempuran laut yang dahsyat menjadikannya simbol heroisme tanpa pamrih."
  },
  {
    id: "h-9",
    name: "Kapitan Pattimura",
    birthDeath: "1783 - 1817",
    origin: "Saparua, Maluku",
    category: "Pahlawan Perjuangan Daerah",
    description: "Pemimpin perlawanan bersenjata rakyat Maluku melawan pemaksaan penyerahan hasil bumi oleh Belanda.",
    story: "Thomas Matulessy, atau Pattimura, memimpin penyerbuan Benteng Duurstede di Saparua dan berhasil membebaskannya dari cengkeraman Belanda. Di bawah komandonya, rakyat Maluku bersatu padu melakukan perlawanan hebat sebelum akhirnya ia tertangkap karena pengkhianatan dan dihukum gantung di Ambon."
  },
  {
    id: "h-10",
    name: "Tuanku Imam Bonjol",
    birthDeath: "1772 - 1864",
    origin: "Pasaman, Sumatera Barat",
    category: "Pahlawan Perjuangan Daerah",
    description: "Pemimpin Perang Padri (1803-1838) yang menyatukan kaum adat dan ulama melawan kolonial Belanda.",
    story: "Lahir dengan nama Peto Syarif, Imam Bonjol memimpin perjuangan gigih mempertahankan benteng pertahanan Bonjol dari serangan masif serdadu Belanda. Perang Padri yang awalnya konflik internal berubah menjadi gerakan perlawanan semesta yang sangat sulit ditundukkan Belanda."
  }
];

export const initialEvents: HistoricalEvent[] = [
  {
    id: "e-1",
    name: "Proklamasi Kemerdekaan Republik Indonesia",
    date: "17 Agustus 1945",
    location: "Jl. Pegangsaan Timur No. 56, Jakarta",
    description: "Deklarasi resmi kemerdekaan bangsa Indonesia dari segala bentuk penjajahan.",
    history: "Setelah Jepang menyerah tanpa syarat kepada Sekutu akibat bom atom, para pemuda mendesak Soekarno dan Hatta untuk segera memproklamasikan kemerdekaan. Sempat terjadi peristiwa penculikan Rengasdengklok. Pada tanggal 17 Agustus 1945 jam 10.00 pagi, teks proklamasi yang dirumuskan semalam di rumah Laksamana Maeda dibacakan dengan khidmat, diikuti pengibaran bendera Merah Putih yang dijahit Fatmawati dan lagu Indonesia Raya."
  },
  {
    id: "e-2",
    name: "Kongres Pemuda II (Sumpah Pemuda)",
    date: "28 Oktober 1928",
    location: "Gedung Indonesische Clubgebouw, Kramat, Jakarta",
    description: "Lahirnya ikrar persatuan bangsa, tanah air, dan bahasa persatuan di kalangan pemuda Nusantara.",
    history: "Kongres Pemuda II dihadiri oleh berbagai organisasi kepemudaan daerah seperti Jong Java, Jong Sumatranen Bond, Jong Ambon, dll. Kongres ini melahirkan keputusan bersejarah Sumpah Pemuda: Satu Tanah Air, Satu Bangsa, dan Satu Bahasa, Indonesia. Lagu Indonesia Raya ciptaan W.R. Soepratman juga diperdengarkan secara instrumental untuk pertama kalinya."
  },
  {
    id: "e-3",
    name: "Pertempuran Surabaya",
    date: "10 November 1945",
    location: "Surabaya, Jawa Timur",
    description: "Pertempuran dahsyat mempertahankan kemerdekaan Indonesia melawan tentara Sekutu dan NICA.",
    history: "Ketegangan memuncak pasca tewasnya jenderal Inggris, AWS Mallaby. Inggris mengeluarkan ultimatum agar rakyat Surabaya menyerahkan senjata tanpa syarat. Ultimatum ditolak mentah-mentah. Tokoh pemuda Bung Tomo membakar semangat arek-arek Suroboyo melalui radio. Pertempuran berkobar selama berminggu-minggu, memperlihatkan heroisme yang luar biasa. Tanggal ini kini diperingati sebagai Hari Pahlawan."
  },
  {
    id: "e-4",
    name: "Peristiwa Rengasdengklok",
    date: "16 Agustus 1945",
    location: "Rengasdengklok, Karawang, Jawa Barat",
    description: "Aksi pengamanan Soekarno-Hatta oleh golongan muda agar terbebas dari pengaruh Jepang.",
    history: "Golongan muda yang dipimpin Chaerul Saleh, Sukarni, Wikana, membawa Soekarno-Hatta ke Rengasdengklok untuk meyakinkan mereka bahwa Jepang sudah menyerah dan momen kemerdekaan harus murni diputuskan bangsa Indonesia sendiri tanpa menunggu hadiah/janji dari PPKI atau pemerintah Jepang."
  },
  {
    id: "e-5",
    name: "Bandung Lautan Api",
    date: "24 Maret 1946",
    location: "Kota Bandung, Jawa Barat",
    description: "Aksi pembakaran sengaja kota Bandung bagian selatan oleh pejuang dan rakyat agar tidak dijadikan markas Sekutu.",
    history: "Sekutu mengeluarkan ultimatum agar Kota Bandung dikosongkan dari pejuang bersenjata. Menolak menyerahkan kota strategis ini, sekitar 200.000 warga Bandung membakar rumah-rumah mereka sendiri dan mundur ke pegunungan selatan. Tokoh legendaris Mohammad Toha gugur dalam misi meledakkan gudang mesiu Sekutu yang sangat besar."
  },
  {
    id: "e-6",
    name: "Serangan Umum 1 Maret 1949",
    date: "1 Maret 1949",
    location: "Yogyakarta",
    description: "Serangan taktis mendadak untuk membuktikan kepada dunia internasional bahwa TNI dan negara Indonesia masih ada.",
    history: "Digagas oleh Sri Sultan Hamengkubuwono IX dan dipimpin secara taktis oleh Letkol Soeharto. TNI berhasil menduduki kota Yogyakarta (yang saat itu diduduki Belanda) selama 6 jam sebelum mundur kembali. Peristiwa ini langsung disiarkan radio pemancar darurat, mematahkan propaganda Belanda bahwa Indonesia telah hancur."
  },
  {
    id: "e-7",
    name: "Konferensi Asia Afrika (KAA)",
    date: "18 - 24 April 1955",
    location: "Gedung Merdeka, Bandung",
    description: "Konferensi bersejarah negara-negara Asia-Afrika yang menolak kolonialisme dan neokolonialisme.",
    history: "Diprakarsai oleh Indonesia, India, Pakistan, Burma, dan Sri Lanka. Menghasilkan 'Dasasila Bandung' yang menyuarakan hak penentuan nasib sendiri, kedaulatan, dan anti-penjajahan. KAA menjadi cikal bakal terbentuknya Gerakan Non-Blok (GNB) di kancah politik global."
  },
  {
    id: "e-8",
    name: "Konferensi Meja Bundar (KMB)",
    date: "23 Agustus - 2 November 1949",
    location: "Den Haag, Belanda",
    description: "Pertemuan diplomatik puncak yang menghasilkan pengakuan kedaulatan kedaulatan Indonesia secara penuh oleh Kerajaan Belanda.",
    history: "Setelah serangkaian agresi militer dan tekanan Dewan Keamanan PBB, perundingan ini diselenggarakan. Delegasi Indonesia dipimpin Drs. Mohammad Hatta. Pada 27 Desember 1949 dilakukan penyerahan dan pengakuan kedaulatan di Amsterdam dan Jakarta, secara hukum mengakhiri sengketa bersenjata kolonial."
  },
  {
    id: "e-9",
    name: "Deklarasi Djuanda",
    date: "13 Desember 1957",
    location: "Jakarta",
    description: "Deklarasi yang menetapkan batas wilayah laut teritorial Indonesia sebagai satu kesatuan utuh.",
    history: "Dicetuskan oleh Perdana Menteri Djuanda Kartawidjaja. Deklarasi ini menyatakan bahwa laut di antara pulau-pulau Indonesia adalah wilayah kedaulatan mutlak RI (tanpa ada laut bebas di tengah negara). Hal ini melipatgandakan luas wilayah kedaulatan air Indonesia dan disetujui secara internasional dalam konvensi hukum laut PBB (UNCLOS)."
  },
  {
    id: "e-10",
    name: "Hari Kebangkitan Nasional (Berdirinya Budi Utomo)",
    date: "20 Mei 1908",
    location: "Jakarta",
    description: "Lahirnya organisasi pergerakan nasional modern pertama yang menandai bangkitnya kesadaran berbangsa.",
    history: "Didirikan oleh para pelajar STOVIA di bawah kepemimpinan Soetomo atas gagasan dr. Wahidin Sudirohusodo. Organisasi ini berfokus pada pendidikan dan kebudayaan sebagai senjata melawan ketertinggalan kolonial. Tanggal pendiriannya diperingati sebagai Hari Kebangkitan Nasional."
  }
];

export const compilerBiography: CompilerBiography = {
  name: "Jundi Abdul Syahid, S.Pd.",
  title: "Orang Dalam Genetik Jawa",
  role: "Penulis Utama & Ahli Genealogi Sejarah Nusantara",
  bio: "Jundi Abdul Syahid, S.Pd. adalah seorang sejarawan, akademisi pendidikan, dan budayawan mandiri yang mengabdikan hidupnya untuk melacak, menyusun, dan memelihara memori kolektif bangsa Indonesia. Sebagai figur yang mendedikasikan diri pada penelusuran sejarah Nusantara, beliau mengidentifikasi dirinya secara kultural dan filosofis sebagai 'Orang Dalam Genetik Jawa'—sebuah representasi komitmen mendalam untuk menggali kebijaksanaan luhur Jawa dan kaitannya dengan integrasi peradaban Nusantara secara holistik.",
  expertise: [
    "Genealogi & Silsilah Dinasti Nusantara",
    "Analisis Geopolitik Klasik Kerajaan Majapahit & Mataram",
    "Metodologi Pendidikan Sejarah Berkarakter Bangsa",
    "Penyusunan Sejarah Lisan & Manuskrip Kuno Tanah Jawa"
  ],
  genealogyDetails: "Beliau meyakini bahwa pemahaman sejarah tidak sekadar tentang menghafal tahun dan tokoh, melainkan merasakan detak denyut spiritualitas perjuangan leluhur yang mengalir dalam garis keturunan (genetik) kebudayaan Nusantara. Pendekatan ini menempatkan nilai-nilai luhur moralitas pahlawan sebagai pilar utama edukasi generasi muda Indonesia."
};
