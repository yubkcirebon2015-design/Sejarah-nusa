import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  books, 
  getPartInfo, 
  getChapterTitle, 
  generateChapterContent, 
  Book 
} from "../data/ebookData";
import { 
  BookOpen, 
  Search, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Bookmark, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  EyeOff, 
  Compass, 
  Shield, 
  Flame, 
  Users, 
  Crown, 
  CheckCircle, 
  CheckCircle2, 
  BookMarked,
  Sparkles,
  RotateCcw,
  BookOpenCheck
} from "lucide-react";

export default function EbookSection() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentChapterNum, setCurrentChapterNum] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("lg");
  const [readingTheme, setReadingTheme] = useState<"dark" | "parchment" | "contrast">("parchment");
  
  // Progress states stored in localStorage
  // completedChapters format: { [bookId]: [1, 2, 5, ...] }
  const [completedChapters, setCompletedChapters] = useState<Record<string, number[]>>({});
  // bookmarks format: { [bookId]: chapterNumber }
  const [bookmarks, setBookmarks] = useState<Record<string, number>>({});
  
  const topRef = useRef<HTMLDivElement>(null);

  // Load progress and bookmarks on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem("ebook_completed_chapters");
      if (savedProgress) {
        setCompletedChapters(JSON.parse(savedProgress));
      }
      const savedBookmarks = localStorage.getItem("ebook_bookmarks");
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (e) {
      console.error("Failed to load ebook progress from localStorage", e);
    }
  }, []);

  // Save progress helper
  const toggleChapterComplete = (bookId: string, chapNum: number) => {
    setCompletedChapters(prev => {
      const currentBookProgress = prev[bookId] || [];
      let updated: number[];
      if (currentBookProgress.includes(chapNum)) {
        updated = currentBookProgress.filter(n => n !== chapNum);
      } else {
        updated = [...currentBookProgress, chapNum].sort((a, b) => a - b);
      }
      const newProgress = { ...prev, [bookId]: updated };
      localStorage.setItem("ebook_completed_chapters", JSON.stringify(newProgress));
      return newProgress;
    });
  };

  // Reset progress helper
  const resetBookProgress = (bookId: string) => {
    if (confirm("Apakah Anda yakin ingin mereset semua kemajuan membaca untuk buku ini?")) {
      setCompletedChapters(prev => {
        const newProgress = { ...prev, [bookId]: [] };
        localStorage.setItem("ebook_completed_chapters", JSON.stringify(newProgress));
        return newProgress;
      });
      setBookmarks(prev => {
        const newBookmarks = { ...prev };
        delete newBookmarks[bookId];
        localStorage.setItem("ebook_bookmarks", JSON.stringify(newBookmarks));
        return newBookmarks;
      });
    }
  };

  // Save/Remove bookmark helper
  const toggleBookmark = (bookId: string, chapNum: number) => {
    setBookmarks(prev => {
      const isBookmarked = prev[bookId] === chapNum;
      const newBookmarks = { ...prev };
      if (isBookmarked) {
        delete newBookmarks[bookId];
      } else {
        newBookmarks[bookId] = chapNum;
      }
      localStorage.setItem("ebook_bookmarks", JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  // Get matching icon for each book
  const getBookIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "Compass": return <Compass className={className} />;
      case "Shield": return <Shield className={className} />;
      case "Flame": return <Flame className={className} />;
      case "Users": return <Users className={className} />;
      case "Crown": return <Crown className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  // Generate 1 to 100 chapters dynamically for selected book
  const allChapters = useMemo(() => {
    if (!selectedBook) return [];
    const chaps = [];
    for (let i = 1; i <= 100; i++) {
      const title = getChapterTitle(selectedBook.id, i);
      const { partTitle } = getPartInfo(i);
      const contentPreview = generateChapterContent(selectedBook.id, i, title).substring(0, 140) + "...";
      chaps.push({
        number: i,
        title,
        partName: partTitle,
        preview: contentPreview
      });
    }
    return chaps;
  }, [selectedBook]);

  // Filter chapters based on search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return allChapters;
    const query = searchQuery.toLowerCase();
    return allChapters.filter(c => 
      c.number.toString() === query ||
      c.title.toLowerCase().includes(query) ||
      c.partName.toLowerCase().includes(query)
    );
  }, [allChapters, searchQuery]);

  // Handle book selection
  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setCurrentChapterNum(null);
    setSearchQuery("");
  };

  // Handle open book to last bookmarked chapter or chapter 1
  const handleReadBook = (book: Book) => {
    setSelectedBook(book);
    const lastBookmark = bookmarks[book.id];
    setCurrentChapterNum(lastBookmark || 1);
    scrollToTop();
  };

  // Scroll reader to top helper
  const scrollToTop = () => {
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Helper to get text class based on fontSize state
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm": return "text-sm leading-relaxed";
      case "base": return "text-base leading-relaxed";
      case "lg": return "text-lg leading-relaxed md:text-xl md:leading-loose";
      case "xl": return "text-xl leading-loose md:text-2xl md:leading-loose";
    }
  };

  // Helper to get theme class based on readingTheme state
  const getThemeClass = () => {
    switch (readingTheme) {
      case "dark":
        return "bg-[#02110c] text-[#f2e8cf] border-[#d4af37]/35";
      case "parchment":
        return "bg-[#fcf8f0] text-[#1c120c] border-[#d4af37]/45 shadow-[inset_0_0_40px_rgba(212,175,55,0.06)]";
      case "contrast":
        return "bg-white text-black border-gray-300";
    }
  };

  return (
    <div ref={topRef} className="space-y-6">
      
      {/* HEADER BANNER WITH ROYAL NUTANSA EMBLEM */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-[#02110c] via-[#041d14] to-[#02110c] border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/25 shadow-xl gap-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-[#d4af37] flex items-center gap-3">
            <BookMarked className="w-6 h-6 text-[#ffcc33] animate-pulse" />
            E-Book Perpustakaan & Khazanah Pengetahuan
          </h3>
          <p className="text-xs text-[#f2e8cf]/80 leading-relaxed mt-2 max-w-3xl">
            Selamat datang di gerbang intelektual Indonesia. Di bawah ini tersedia <strong className="text-[#ffcc33] font-bold">5 Karya Buku Istimewa</strong> masing-masing terdiri dari <strong className="text-[#ffcc33] font-mono font-bold">100 bab lengkap</strong> dengan materi terperinci, dikemas secara sistematis oleh <strong className="text-[#ffcc33]">Jundi Abdul Syahid, S.Pd.</strong> untuk mencetak kepemimpinan dan ketahanan karakter bangsa.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start lg:self-center bg-[#041d14]/70 px-4 py-2 rounded-lg border border-[#d4af37]/20 shrink-0">
          <Sparkles className="w-4 h-4 text-[#ffcc33]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffcc33] font-bold">500 Bab Akses Instan</span>
        </div>
      </div>

      {/* RENDER SHELF VIEW (RAK BUKU) */}
      {!selectedBook && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
            <h4 className="text-base font-serif font-semibold text-[#ffcc33] uppercase tracking-wider flex items-center gap-2">
              <span>📚 Rak Buku Kebijaksanaan Nusantara</span>
            </h4>
            <span className="text-xs text-[#f2e8cf]/60">Pilih buku untuk mulai membaca tanpa sandi</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => {
              const completedList = completedChapters[book.id] || [];
              const progressPercentage = Math.round((completedList.length / 100) * 100);
              const hasBookmark = !!bookmarks[book.id];

              return (
                <motion.div
                  key={book.id}
                  whileHover={{ y: -6 }}
                  className="flex flex-col bg-gradient-to-b from-[#02110c] to-[#041d14] rounded-xl border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/25 shadow-lg overflow-hidden group justify-between"
                >
                  {/* Graphic Book Spine / Top Cover Area */}
                  <div className={`p-6 bg-gradient-to-b ${book.color} relative overflow-hidden border-b border-[#d4af37]/20 flex-1 flex flex-col justify-between min-h-[220px]`}>
                    
                    {/* Artistic Watermarks */}
                    <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none transform rotate-12 scale-150">
                      {getBookIcon(book.icon, "w-40 h-40 text-white")}
                    </div>
                    
                    <div className="flex justify-between items-start gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-[#ffcc33] uppercase tracking-widest bg-[#02110c]/85 border border-[#d4af37]/40 px-2.5 py-1 rounded">
                        🇮🇩 KARYA EMAS
                      </span>
                      {hasBookmark && (
                        <span className="bg-[#ffcc33] text-[#02110c] text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
                          <Bookmark className="w-3 h-3 fill-current" />
                          Markah: Bab {bookmarks[book.id]}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mt-4 z-10">
                      <h3 className="text-xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-[#f2e8cf] tracking-tight group-hover:text-[#ffcc33] transition-colors leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-xs text-yellow-300/80 font-serif italic">
                        {book.subtitle}
                      </p>
                    </div>

                    <div className="border-t border-[#d4af37]/20 pt-3 mt-4 flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono text-[#f2e8cf]/70 uppercase">
                        Koleksi Utama Jundi, S.Pd
                      </span>
                      <div className="flex items-center gap-1.5 bg-[#02110c]/60 px-2.5 py-1 rounded border border-[#d4af37]/20">
                        {getBookIcon(book.icon, "w-4 h-4 text-[#ffcc33]")}
                        <span className="text-[10px] font-mono font-bold text-[#ffcc33]">100 BAB</span>
                      </div>
                    </div>
                  </div>

                  {/* Descriptive Content & Progress Area */}
                  <div className="p-5 space-y-4 bg-[#02110c]/40 flex-grow-0">
                    <p className="text-xs text-[#f2e8cf]/80 leading-relaxed line-clamp-3">
                      {book.description}
                    </p>

                    {/* Reading Progress Indicator */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-[#f2e8cf]/60">Progres Membaca</span>
                        <span className="text-[#ffcc33] font-bold">{progressPercentage}% ({completedList.length}/100 Bab)</span>
                      </div>
                      <div className="w-full bg-[#041d14] h-1.5 rounded-full overflow-hidden border border-[#d4af37]/15">
                        <div 
                          className="bg-gradient-to-r from-[#d4af37] to-[#ffcc33] h-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleSelectBook(book)}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#041d14] hover:bg-[#02110c] text-[#ffcc33] border border-[#d4af37]/35 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer shadow-md"
                      >
                        Daftar Isi (100 Bab)
                      </button>
                      <button
                        onClick={() => handleReadBook(book)}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] py-2 rounded-lg text-xs font-serif font-extrabold transition-all cursor-pointer shadow-lg hover:shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                      >
                        Baca Buku
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* DETAILED BOOK INDEX / DASHBOARD */}
      {selectedBook && currentChapterNum === null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Back Button and Path navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d4af37]/20 pb-4">
            <button
              onClick={() => setSelectedBook(null)}
              className="inline-flex items-center gap-2 text-xs text-[#ffcc33] hover:text-[#f2e8cf] cursor-pointer bg-[#02110c] border border-[#d4af37]/30 px-3.5 py-1.5 rounded-lg font-serif transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Rak Buku
            </button>
            <div className="text-xs font-mono text-[#f2e8cf]/60">
              Perpustakaan &gt; <span className="text-[#ffcc33] font-serif">{selectedBook.title}</span>
            </div>
          </div>

          {/* Mini Header of Selected Book */}
          <div className={`p-6 rounded-xl bg-gradient-to-r ${selectedBook.color} border border-[#d4af37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#ffcc33] uppercase tracking-widest bg-[#02110c]/70 px-2 py-0.5 rounded border border-[#d4af37]/20">
                  Indeks Resmi Jundi, S.Pd
                </span>
                {bookmarks[selectedBook.id] && (
                  <span className="text-[10px] font-bold text-[#02110c] bg-[#ffcc33] px-2 py-0.5 rounded flex items-center gap-1">
                    <Bookmark className="w-3 h-3 fill-current" />
                    Melanjutkan: Bab {bookmarks[selectedBook.id]}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#f2e8cf]">{selectedBook.title}</h2>
              <p className="text-xs text-[#f2e8cf]/70 italic">{selectedBook.subtitle}</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => resetBookProgress(selectedBook.id)}
                className="p-2 bg-[#02110c]/70 text-red-400 hover:text-red-300 border border-red-500/20 rounded-lg hover:bg-red-500/10 cursor-pointer text-xs flex items-center gap-1.5 transition-all"
                title="Reset Progres Buku"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Progres
              </button>
              <button
                onClick={() => {
                  const lastBk = bookmarks[selectedBook.id];
                  setCurrentChapterNum(lastBk || 1);
                  scrollToTop();
                }}
                className="bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] px-4 py-2 rounded-lg text-xs font-serif font-extrabold transition-all cursor-pointer flex items-center gap-2"
              >
                <BookOpenCheck className="w-4 h-4" />
                {bookmarks[selectedBook.id] ? "Lanjutkan Membaca" : "Mulai Baca Bab 1"}
              </button>
            </div>
          </div>

          {/* Search bar and metadata overview */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#02110c] p-4 rounded-xl border border-[#d4af37]/25 shadow-md">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
              <input
                type="text"
                className="w-full bg-[#041d14]/80 border border-[#d4af37]/30 rounded-lg pl-10 pr-4 py-2 text-sm text-[#f2e8cf] placeholder-[#f2e8cf]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                placeholder="Cari nomor bab (1-100) atau topik bahasan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="text-[#f2e8cf]/70">
                Selesai dibaca: <strong className="text-[#ffcc33] font-mono">{(completedChapters[selectedBook.id] || []).length}</strong> / 100 bab
              </div>
              <div className="text-[#f2e8cf]/40">|</div>
              <div className="text-[#f2e8cf]/70">
                Hasil pencarian: <strong className="text-[#ffcc33] font-mono">{filteredChapters.length}</strong> bab
              </div>
            </div>
          </div>

          {/* CHAPTERS GRID */}
          {filteredChapters.length === 0 ? (
            <div className="text-center py-12 bg-[#02110c]/30 border border-[#d4af37]/20 rounded-xl">
              <p className="text-[#f2e8cf]/60">Tidak ada bab yang cocok dengan kata kunci pencarian Anda.</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs text-[#ffcc33] underline hover:text-[#f2e8cf] cursor-pointer"
              >
                Hapus Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredChapters.map((chapter) => {
                const isCompleted = (completedChapters[selectedBook.id] || []).includes(chapter.number);
                const isBookmarked = bookmarks[selectedBook.id] === chapter.number;

                return (
                  <div
                    key={chapter.number}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                      isBookmarked 
                        ? "bg-[#041d14] border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.15)]"
                        : "bg-[#02110c]/60 border-[#d4af37]/15 hover:border-[#d4af37]/35"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#ffcc33] bg-[#041d14] border border-[#d4af37]/20 px-2 py-0.5 rounded shrink-0">
                          BAB {chapter.number}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isBookmarked && (
                            <span className="text-[9px] font-bold text-[#02110c] bg-[#ffcc33] px-1.5 py-0.5 rounded flex items-center gap-1">
                              <Bookmark className="w-2.5 h-2.5 fill-current" />
                              Markah
                            </span>
                          )}
                          <button
                            onClick={() => toggleChapterComplete(selectedBook.id, chapter.number)}
                            className={`p-1 rounded hover:bg-[#d4af37]/10 transition-colors cursor-pointer ${
                              isCompleted ? "text-[#ffcc33]" : "text-[#f2e8cf]/30"
                            }`}
                            title={isCompleted ? "Tandai Belum Dibaca" : "Tandai Sudah Selesai"}
                          >
                            <CheckCircle2 className="w-4 h-4 fill-current bg-[#02110c] rounded-full" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-serif font-bold text-[#f2e8cf] leading-snug line-clamp-2">
                        {chapter.title}
                      </h4>
                      <p className="text-[10px] text-[#ffcc33]/70 font-serif italic">
                        {chapter.partName}
                      </p>
                      <p className="text-xs text-[#f2e8cf]/60 line-clamp-2 leading-relaxed pt-1">
                        {chapter.preview}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#d4af37]/10 pt-2.5 mt-1">
                      <span className="text-[9px] text-[#f2e8cf]/40 font-mono">
                        Bahasan Lengkap
                      </span>
                      <button
                        onClick={() => {
                          setCurrentChapterNum(chapter.number);
                          scrollToTop();
                        }}
                        className="inline-flex items-center gap-1 text-xs text-[#ffcc33] hover:text-[#f2e8cf] font-serif cursor-pointer font-bold"
                      >
                        Buka Bab
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* IMMERSIVE E-BOOK READING MODE */}
      {selectedBook && currentChapterNum !== null && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Reader Top Bar (Sleek Control Panel) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#02110c] p-4 rounded-xl border border-[#d4af37]/25 shadow-md">
            
            {/* Nav & Path */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentChapterNum(null);
                  scrollToTop();
                }}
                className="p-2 text-[#ffcc33] hover:text-[#f2e8cf] bg-[#041d14] hover:bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-lg cursor-pointer transition-colors"
                title="Kembali ke Indeks Bab"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="text-[10px] font-mono text-[#f2e8cf]/50 uppercase">
                  Membaca Karya Jundi, S.Pd
                </div>
                <div className="text-xs font-serif text-[#ffcc33] font-bold line-clamp-1">
                  {selectedBook.title}
                </div>
              </div>
            </div>

            {/* Reading preferences & Tools */}
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Font Size Adjuster */}
              <div className="flex items-center bg-[#041d14] rounded-lg border border-[#d4af37]/25 px-2 py-1 gap-2">
                <button 
                  onClick={() => setFontSize(prev => prev === "xl" ? "lg" : prev === "lg" ? "base" : "sm")}
                  disabled={fontSize === "sm"}
                  className="p-1 text-[#f2e8cf]/70 hover:text-[#ffcc33] disabled:opacity-30 cursor-pointer"
                  title="Perkecil Tulisan"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono font-bold text-[#ffcc33] uppercase">Ukuran</span>
                <button 
                  onClick={() => setFontSize(prev => prev === "sm" ? "base" : prev === "base" ? "lg" : "xl")}
                  disabled={fontSize === "xl"}
                  className="p-1 text-[#f2e8cf]/70 hover:text-[#ffcc33] disabled:opacity-30 cursor-pointer"
                  title="Perbesar Tulisan"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Theme Selector */}
              <div className="flex items-center bg-[#041d14] rounded-lg border border-[#d4af37]/25 p-1 gap-1">
                <button
                  onClick={() => setReadingTheme("parchment")}
                  className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded cursor-pointer transition-all ${
                    readingTheme === "parchment" ? "bg-[#d4af37] text-[#02110c]" : "text-[#f2e8cf]/60 hover:text-[#f2e8cf]"
                  }`}
                >
                  Kertas
                </button>
                <button
                  onClick={() => setReadingTheme("dark")}
                  className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded cursor-pointer transition-all ${
                    readingTheme === "dark" ? "bg-[#d4af37] text-[#02110c]" : "text-[#f2e8cf]/60 hover:text-[#f2e8cf]"
                  }`}
                >
                  Gelap
                </button>
                <button
                  onClick={() => setReadingTheme("contrast")}
                  className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded cursor-pointer transition-all ${
                    readingTheme === "contrast" ? "bg-[#d4af37] text-[#02110c]" : "text-[#f2e8cf]/60 hover:text-[#f2e8cf]"
                  }`}
                >
                  Terang
                </button>
              </div>

              {/* Bookmark state */}
              <button
                onClick={() => toggleBookmark(selectedBook.id, currentChapterNum)}
                className={`p-2 rounded-lg border flex items-center justify-center gap-1.5 text-xs font-serif font-semibold cursor-pointer transition-all ${
                  bookmarks[selectedBook.id] === currentChapterNum
                    ? "bg-[#ffcc33] text-[#02110c] border-[#ffcc33]"
                    : "bg-[#041d14] text-[#ffcc33] border-[#d4af37]/25 hover:border-[#d4af37]/50"
                }`}
                title="Beri Markah di Bab Ini"
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarks[selectedBook.id] === currentChapterNum ? "fill-current" : ""}`} />
                <span className="hidden sm:inline">
                  {bookmarks[selectedBook.id] === currentChapterNum ? "Tersimpan" : "Markah"}
                </span>
              </button>

              {/* Read progress state */}
              <button
                onClick={() => toggleChapterComplete(selectedBook.id, currentChapterNum)}
                className={`p-2 rounded-lg border flex items-center justify-center gap-1.5 text-xs font-serif font-semibold cursor-pointer transition-all ${
                  (completedChapters[selectedBook.id] || []).includes(currentChapterNum)
                    ? "bg-[#10b981] text-white border-[#10b981]"
                    : "bg-[#041d14] text-[#f2e8cf]/80 border-[#d4af37]/25 hover:border-[#d4af37]/50"
                }`}
                title="Tandai Selesai Membaca Bab Ini"
              >
                <CheckCircle className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">
                  {(completedChapters[selectedBook.id] || []).includes(currentChapterNum) ? "Selesai" : "Tandai Selesai"}
                </span>
              </button>

            </div>
          </div>

          {/* TABLE OF CONTENTS QUICK NAVIGATION DRAWER & CHAPTER CONTENT PAIRING */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* CHAPTER METADATA & QUICK DIRECTORY JUMP PANEL (Side menu on desktop) */}
            <div className="lg:col-span-1 bg-[#02110c] border border-[#d4af37]/20 rounded-xl p-4 space-y-4">
              <div className="border-b border-[#d4af37]/15 pb-2">
                <h5 className="text-xs font-mono font-bold uppercase text-[#ffcc33] tracking-widest">
                  Navigasi 100 Bab
                </h5>
                <p className="text-[10px] text-[#f2e8cf]/60">Lompat langsung ke bab lain</p>
              </div>

              {/* Quick Jump buttons */}
              <div className="max-h-[380px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-[#d4af37]/20">
                {Array.from({ length: 100 }).map((_, idx) => {
                  const chapNumber = idx + 1;
                  const chapTitle = getChapterTitle(selectedBook.id, chapNumber);
                  const isCurrent = currentChapterNum === chapNumber;
                  const isDone = (completedChapters[selectedBook.id] || []).includes(chapNumber);

                  return (
                    <button
                      key={chapNumber}
                      onClick={() => {
                        setCurrentChapterNum(chapNumber);
                        scrollToTop();
                      }}
                      className={`w-full text-left p-2 rounded text-xs transition-all cursor-pointer flex items-center gap-2 border ${
                        isCurrent 
                          ? "bg-[#d4af37] text-[#02110c] border-[#d4af37] font-semibold"
                          : "bg-[#041d14]/50 text-[#f2e8cf]/80 border-transparent hover:bg-[#d4af37]/10"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold font-mono ${
                        isCurrent 
                          ? "bg-[#02110c] text-[#ffcc33]" 
                          : "bg-[#02110c] text-[#ffcc33] border border-[#d4af37]/20"
                      }`}>
                        {chapNumber}
                      </span>
                      <span className="truncate flex-1 leading-tight">{chapTitle}</span>
                      {isDone && !isCurrent && (
                        <CheckCircle2 className="w-3 h-3 text-[#10b981] fill-current shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Statistics Badge */}
              <div className="bg-[#041d14] p-3 rounded-lg border border-[#d4af37]/15 text-center space-y-1">
                <div className="text-[10px] text-[#f2e8cf]/60 uppercase tracking-widest">
                  Progress Buku Ini
                </div>
                <div className="text-lg font-serif font-black text-[#ffcc33]">
                  {(completedChapters[selectedBook.id] || []).length} / 100 Bab
                </div>
                <div className="text-[9px] text-[#f2e8cf]/50">
                  Dibersihkan otomatis apabila browser cache dihapus
                </div>
              </div>
            </div>

            {/* IMMERSIVE CHAPTER PAGE VIEW */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Actual Book Page Container */}
              <div className={`p-6 md:p-10 rounded-2xl border-2 shadow-xl ${getThemeClass()} transition-all duration-300 relative`}>
                
                {/* Vintage Corner decorations */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]/35 rounded-tl"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]/35 rounded-tr"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]/35 rounded-bl"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]/35 rounded-br"></div>

                {/* Chapter details header */}
                <div className="text-center space-y-3 pb-6 border-b border-[#d4af37]/20 mb-8 z-10 relative">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#ffcc33] bg-[#02110c] px-3 py-1 rounded-full border border-[#d4af37]/30 uppercase">
                    📖 BAB {currentChapterNum} DARI 100
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-extrabold tracking-tight leading-tight max-w-2xl mx-auto">
                    {getChapterTitle(selectedBook.id, currentChapterNum)}
                  </h3>
                  
                  <div className="text-xs font-serif italic text-amber-600 dark:text-amber-400">
                    {getPartInfo(currentChapterNum).partTitle}
                  </div>
                </div>

                {/* Main Chapter Content with Custom Font Sizes */}
                <div className={`${getFontSizeClass()} font-serif space-y-6 whitespace-pre-wrap text-justify leading-relaxed z-10 relative px-2 md:px-4`}>
                  {generateChapterContent(
                    selectedBook.id, 
                    currentChapterNum, 
                    getChapterTitle(selectedBook.id, currentChapterNum)
                  )}
                </div>

                {/* Signature/Ending Emblem */}
                <div className="flex flex-col items-center justify-center pt-8 mt-10 border-t border-[#d4af37]/20 space-y-2 z-10 relative">
                  <div className="w-8 h-8 rounded-full border border-[#d4af37]/50 flex items-center justify-center text-xs text-[#d4af37] font-serif font-bold">
                    JS
                  </div>
                  <div className="text-[10px] uppercase tracking-widest font-mono text-[#d4af37]/65 text-center">
                    Karya Utama Jundi Abdul Syahid, S.Pd. <br/>
                    <span className="text-[8px] opacity-75">Orang Dalam Genetik Jawa</span>
                  </div>
                </div>
              </div>

              {/* Navigation buttons: Prev and Next Chapter */}
              <div className="flex items-center justify-between gap-4 bg-[#02110c] p-4 rounded-xl border border-[#d4af37]/25 shadow-md">
                <button
                  onClick={() => {
                    if (currentChapterNum > 1) {
                      setCurrentChapterNum(currentChapterNum - 1);
                      scrollToTop();
                    }
                  }}
                  disabled={currentChapterNum === 1}
                  className="flex items-center gap-1.5 bg-[#041d14] hover:bg-[#d4af37]/10 disabled:opacity-30 disabled:cursor-not-allowed border border-[#d4af37]/25 text-[#ffcc33] px-4 py-2.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Sebelumnya
                </button>

                <div className="text-xs font-mono text-[#f2e8cf]/70">
                  Bab <span className="text-[#ffcc33] font-bold">{currentChapterNum}</span> / 100
                </div>

                <button
                  onClick={() => {
                    if (currentChapterNum < 100) {
                      setCurrentChapterNum(currentChapterNum + 1);
                      scrollToTop();
                    }
                  }}
                  disabled={currentChapterNum === 100}
                  className="flex items-center gap-1.5 bg-[#d4af37] hover:bg-[#ffcc33] disabled:opacity-30 disabled:cursor-not-allowed text-[#02110c] px-5 py-2.5 rounded-lg text-xs font-serif font-extrabold transition-all cursor-pointer"
                >
                  Selanjutnya
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
