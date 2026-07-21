import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  books as defaultBooks, 
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
  BookOpenCheck,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  FileText,
  AlertCircle,
  Pencil,
  PlusCircle,
  RefreshCw
} from "lucide-react";

export interface CustomChapterData {
  title: string;
  partName: string;
  content: string;
  isDeleted?: boolean;
  isCustom?: boolean;
}

export default function EbookSection() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentChapterNum, setCurrentChapterNum] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("lg");
  const [readingTheme, setReadingTheme] = useState<"dark" | "parchment" | "contrast">("parchment");
  
  // Storage keys
  const STORAGE_PROGRESS = "ebook_completed_chapters_v3";
  const STORAGE_BOOKMARKS = "ebook_bookmarks_v3";
  const STORAGE_CUSTOM_CHAPTERS = "ebook_custom_chapters_v3";
  const STORAGE_CUSTOM_BOOKS = "ebook_custom_books_v3";
  const STORAGE_DELETED_BOOKS = "ebook_deleted_books_v3";

  // Persistent States
  const [completedChapters, setCompletedChapters] = useState<Record<string, number[]>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, number>>({});
  const [customChapters, setCustomChapters] = useState<Record<string, Record<number, CustomChapterData>>>({});
  const [customBooksList, setCustomBooksList] = useState<Book[]>([]);
  const [deletedBookIds, setDeletedBookIds] = useState<string[]>([]);

  // Modal & Edit States
  const [chapterModal, setChapterModal] = useState<{
    isOpen: boolean;
    bookId: string;
    chapterNum: number;
    title: string;
    partName: string;
    content: string;
    isNew: boolean;
  } | null>(null);

  const [bookModal, setBookModal] = useState<{
    isOpen: boolean;
    bookId: string;
    title: string;
    subtitle: string;
    description: string;
    color: string;
    icon: string;
    isNew: boolean;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  // Show Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load all persistent data on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_PROGRESS);
      if (savedProgress) setCompletedChapters(JSON.parse(savedProgress));

      const savedBookmarks = localStorage.getItem(STORAGE_BOOKMARKS);
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

      const savedChapters = localStorage.getItem(STORAGE_CUSTOM_CHAPTERS);
      if (savedChapters) setCustomChapters(JSON.parse(savedChapters));

      const savedBooks = localStorage.getItem(STORAGE_CUSTOM_BOOKS);
      if (savedBooks) setCustomBooksList(JSON.parse(savedBooks));

      const savedDeletedBooks = localStorage.getItem(STORAGE_DELETED_BOOKS);
      if (savedDeletedBooks) setDeletedBookIds(JSON.parse(savedDeletedBooks));
    } catch (e) {
      console.error("Gagal memuat data lokal ebook", e);
    }
  }, []);

  // Compute active books (default merged with custom minus deleted)
  const activeBooks = useMemo(() => {
    const bookMap = new Map<string, Book>();
    defaultBooks.forEach(b => {
      if (!deletedBookIds.includes(b.id)) {
        bookMap.set(b.id, b);
      }
    });
    customBooksList.forEach(b => {
      if (!deletedBookIds.includes(b.id)) {
        bookMap.set(b.id, b);
      }
    });
    return Array.from(bookMap.values());
  }, [customBooksList, deletedBookIds]);

  // Get active selected book reference (in case metadata was edited)
  const activeSelectedBook = useMemo(() => {
    if (!selectedBook) return null;
    return activeBooks.find(b => b.id === selectedBook.id) || selectedBook;
  }, [selectedBook, activeBooks]);

  // Helper to fetch single chapter data (checking local overrides)
  const getChapterData = (bookId: string, chapNum: number) => {
    const custom = customChapters[bookId]?.[chapNum];
    if (custom) {
      return {
        title: custom.title,
        partName: custom.partName,
        content: custom.content,
        isDeleted: !!custom.isDeleted,
        isCustomEdited: true,
        isUserCreated: !!custom.isCustom
      };
    }
    const title = getChapterTitle(bookId, chapNum);
    const { partTitle } = getPartInfo(chapNum);
    const content = generateChapterContent(bookId, chapNum, title);
    return {
      title,
      partName: partTitle,
      content,
      isDeleted: false,
      isCustomEdited: false,
      isUserCreated: false
    };
  };

  // Generate all active chapters for selected book
  const bookChapters = useMemo(() => {
    if (!activeSelectedBook) return [];
    
    const bookId = activeSelectedBook.id;
    const chapNumbersSet = new Set<number>();
    
    // Default 100 chapters
    for (let i = 1; i <= 100; i++) {
      chapNumbersSet.add(i);
    }

    // Extra or overridden chapter numbers from customChapters
    const customMap = customChapters[bookId] || {};
    Object.keys(customMap).forEach(key => {
      const num = parseInt(key, 10);
      if (!isNaN(num)) {
        chapNumbersSet.add(num);
      }
    });

    const sortedNums = Array.from(chapNumbersSet).sort((a, b) => a - b);
    const result = [];

    for (const num of sortedNums) {
      const data = getChapterData(bookId, num);
      if (!data.isDeleted) {
        result.push({
          number: num,
          title: data.title,
          partName: data.partName,
          content: data.content,
          preview: data.content.substring(0, 140) + "...",
          isCustomEdited: data.isCustomEdited,
          isUserCreated: data.isUserCreated
        });
      }
    }
    return result;
  }, [activeSelectedBook, customChapters]);

  // Filter chapters based on search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return bookChapters;
    const query = searchQuery.toLowerCase();
    return bookChapters.filter(c => 
      c.number.toString() === query ||
      c.title.toLowerCase().includes(query) ||
      c.partName.toLowerCase().includes(query) ||
      c.content.toLowerCase().includes(query)
    );
  }, [bookChapters, searchQuery]);

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
      localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(newProgress));
      return newProgress;
    });
  };

  // Reset progress helper
  const resetBookProgress = (bookId: string) => {
    if (confirm("Apakah Anda yakin ingin mereset semua status membaca untuk buku ini?")) {
      setCompletedChapters(prev => {
        const newProgress = { ...prev, [bookId]: [] };
        localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(newProgress));
        return newProgress;
      });
      setBookmarks(prev => {
        const newBookmarks = { ...prev };
        delete newBookmarks[bookId];
        localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(newBookmarks));
        return newBookmarks;
      });
      showToast("Progres membaca buku berhasil direset.");
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
      localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  // Get matching icon component
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

  // --- CHAPTER CRUD HANDLERS ---
  const handleOpenEditChapter = (bookId: string, chapNum: number, isNew: boolean = false) => {
    const data = getChapterData(bookId, chapNum);
    setChapterModal({
      isOpen: true,
      bookId,
      chapterNum: chapNum,
      title: isNew ? "" : data.title,
      partName: isNew ? "Bagian Baru" : data.partName,
      content: isNew ? "" : data.content,
      isNew
    });
  };

  const handleOpenAddNextChapter = (bookId: string) => {
    const existingNums = bookChapters.map(c => c.number);
    const nextNum = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1;
    handleOpenEditChapter(bookId, nextNum, true);
  };

  const handleSaveChapter = () => {
    if (!chapterModal) return;
    if (!chapterModal.title.trim()) {
      alert("Judul bab tidak boleh kosong.");
      return;
    }
    if (!chapterModal.content.trim()) {
      alert("Isi bacaan bab tidak boleh kosong.");
      return;
    }

    const { bookId, chapterNum, title, partName, content, isNew } = chapterModal;

    setCustomChapters(prev => {
      const bookChaps = prev[bookId] || {};
      const updatedBookChaps = {
        ...bookChaps,
        [chapterNum]: {
          title,
          partName,
          content,
          isDeleted: false,
          isCustom: isNew || (bookChaps[chapterNum]?.isCustom ?? false)
        }
      };
      const newCustomChapters = { ...prev, [bookId]: updatedBookChaps };
      localStorage.setItem(STORAGE_CUSTOM_CHAPTERS, JSON.stringify(newCustomChapters));
      return newCustomChapters;
    });

    setChapterModal(null);
    showToast(`Bab ${chapterNum} "${title}" berhasil disimpan!`);
  };

  const handleDeleteChapter = (bookId: string, chapNum: number, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus Bab ${chapNum}: "${title}"?`)) {
      setCustomChapters(prev => {
        const bookChaps = prev[bookId] || {};
        const updatedBookChaps = {
          ...bookChaps,
          [chapNum]: {
            ...getChapterData(bookId, chapNum),
            isDeleted: true
          }
        };
        const newCustomChapters = { ...prev, [bookId]: updatedBookChaps };
        localStorage.setItem(STORAGE_CUSTOM_CHAPTERS, JSON.stringify(newCustomChapters));
        return newCustomChapters;
      });

      if (currentChapterNum === chapNum) {
        setCurrentChapterNum(null);
      }
      showToast(`Bab ${chapNum} berhasil dihapus.`);
    }
  };

  const handleResetChapterToDefault = (bookId: string, chapNum: number) => {
    if (confirm(`Kembalikan Bab ${chapNum} ke teks bacaan asli bawaan?`)) {
      setCustomChapters(prev => {
        const bookChaps = { ...(prev[bookId] || {}) };
        delete bookChaps[chapNum];
        const newCustomChapters = { ...prev, [bookId]: bookChaps };
        localStorage.setItem(STORAGE_CUSTOM_CHAPTERS, JSON.stringify(newCustomChapters));
        return newCustomChapters;
      });
      showToast(`Bab ${chapNum} berhasil dikembalikan ke bacaan asli.`);
    }
  };

  // --- BOOK CRUD HANDLERS ---
  const handleOpenAddBook = () => {
    const newId = `custom-book-${Date.now()}`;
    setBookModal({
      isOpen: true,
      bookId: newId,
      title: "",
      subtitle: "",
      description: "",
      color: "from-amber-900 via-amber-800 to-[#120a05]",
      icon: "BookOpen",
      isNew: true
    });
  };

  const handleOpenEditBook = (book: Book) => {
    setBookModal({
      isOpen: true,
      bookId: book.id,
      title: book.title,
      subtitle: book.subtitle,
      description: book.description,
      color: book.color,
      icon: book.icon,
      isNew: false
    });
  };

  const handleSaveBook = () => {
    if (!bookModal) return;
    if (!bookModal.title.trim()) {
      alert("Judul buku tidak boleh kosong.");
      return;
    }

    const newBook: Book = {
      id: bookModal.bookId,
      title: bookModal.title,
      subtitle: bookModal.subtitle || "Khazanah Pengetahuan Baru",
      description: bookModal.description || "Koleksi bacaan khusus.",
      color: bookModal.color,
      icon: bookModal.icon,
      accentColor: "#d4af37"
    };

    setCustomBooksList(prev => {
      const filtered = prev.filter(b => b.id !== newBook.id);
      const updated = [...filtered, newBook];
      localStorage.setItem(STORAGE_CUSTOM_BOOKS, JSON.stringify(updated));
      return updated;
    });

    if (selectedBook && selectedBook.id === newBook.id) {
      setSelectedBook(newBook);
    }

    setBookModal(null);
    showToast(`Buku "${newBook.title}" berhasil disimpan!`);
  };

  const handleDeleteBook = (bookId: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus buku "${title}" dari daftar?`)) {
      setDeletedBookIds(prev => {
        const updated = [...prev, bookId];
        localStorage.setItem(STORAGE_DELETED_BOOKS, JSON.stringify(updated));
        return updated;
      });

      if (selectedBook?.id === bookId) {
        setSelectedBook(null);
        setCurrentChapterNum(null);
      }
      showToast(`Buku "${title}" berhasil dihapus.`);
    }
  };

  // Scroll reader to top helper
  const scrollToTop = () => {
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm": return "text-sm leading-relaxed";
      case "base": return "text-base leading-relaxed";
      case "lg": return "text-lg leading-relaxed md:text-xl md:leading-loose";
      case "xl": return "text-xl leading-loose md:text-2xl md:leading-loose";
    }
  };

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
    <div ref={topRef} className="space-y-6 relative">
      
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#ffcc33] text-[#02110c] px-4 py-3 rounded-xl shadow-2xl font-serif font-bold text-xs border border-[#d4af37] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#02110c]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER WITH CRUD HIGHLIGHT */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-[#02110c] via-[#041d14] to-[#02110c] border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/25 shadow-xl gap-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-[#d4af37] flex items-center gap-3">
            <BookMarked className="w-6 h-6 text-[#ffcc33] animate-pulse" />
            E-Book Perpustakaan & Khazanah Pengetahuan
          </h3>
          <p className="text-xs text-[#f2e8cf]/80 leading-relaxed mt-2 max-w-3xl">
            Di bawah ini tersedia karya buku dan bacaan lengkap. Anda memiliki <strong className="text-[#ffcc33]">hak penuh untuk membaca, memperbaharui, mengedit, menambah bab baru, serta menghapus bacaan</strong> jika terdapat kekeliruan, sehingga materi selalu akurat dan terus berkembang.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0">
          <button
            onClick={handleOpenAddBook}
            className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] px-4 py-2 rounded-lg text-xs font-serif font-extrabold cursor-pointer transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            + Tambah E-Book Baru
          </button>
        </div>
      </div>

      {/* RENDER SHELF VIEW (RAK BUKU) */}
      {!activeSelectedBook && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#d4af37]/20 pb-3 gap-2">
            <h4 className="text-base font-serif font-semibold text-[#ffcc33] uppercase tracking-wider flex items-center gap-2">
              <span>📚 Rak Buku Kebijaksanaan Nusantara ({activeBooks.length} Buku)</span>
            </h4>
            <span className="text-xs text-[#f2e8cf]/60">Pilih buku untuk membaca atau edit materi</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeBooks.map((book) => {
              const completedList = completedChapters[book.id] || [];
              const progressPercentage = Math.round((completedList.length / 100) * 100);
              const hasBookmark = !!bookmarks[book.id];

              return (
                <motion.div
                  key={book.id}
                  whileHover={{ y: -6 }}
                  className="flex flex-col bg-gradient-to-b from-[#02110c] to-[#041d14] rounded-xl border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/25 shadow-lg overflow-hidden group justify-between"
                >
                  {/* Graphic Book Cover */}
                  <div className={`p-6 bg-gradient-to-b ${book.color} relative overflow-hidden border-b border-[#d4af37]/20 flex-1 flex flex-col justify-between min-h-[220px]`}>
                    
                    <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none transform rotate-12 scale-150">
                      {getBookIcon(book.icon, "w-40 h-40 text-white")}
                    </div>
                    
                    <div className="flex justify-between items-start gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-[#ffcc33] uppercase tracking-widest bg-[#02110c]/85 border border-[#d4af37]/40 px-2.5 py-1 rounded">
                        🇮🇩 KARYA EMAS
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditBook(book);
                          }}
                          className="p-1.5 bg-[#02110c]/80 text-[#ffcc33] hover:bg-[#d4af37] hover:text-[#02110c] rounded border border-[#d4af37]/30 transition-all cursor-pointer"
                          title="Edit Informasi Buku"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBook(book.id, book.title);
                          }}
                          className="p-1.5 bg-[#02110c]/80 text-red-400 hover:bg-red-500 hover:text-white rounded border border-red-500/30 transition-all cursor-pointer"
                          title="Hapus Buku"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
                        Koleksi Penulis Utama
                      </span>
                      <div className="flex items-center gap-1.5 bg-[#02110c]/60 px-2.5 py-1 rounded border border-[#d4af37]/20">
                        {getBookIcon(book.icon, "w-4 h-4 text-[#ffcc33]")}
                        <span className="text-[10px] font-mono font-bold text-[#ffcc33]">AKSES BAB</span>
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
                        <span className="text-[#ffcc33] font-bold">{progressPercentage}% ({completedList.length} Bab Selesai)</span>
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
                        onClick={() => {
                          setSelectedBook(book);
                          setCurrentChapterNum(null);
                          setSearchQuery("");
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#041d14] hover:bg-[#02110c] text-[#ffcc33] border border-[#d4af37]/35 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer shadow-md"
                      >
                        Daftar Isi & Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                          const lastBk = bookmarks[book.id];
                          setCurrentChapterNum(lastBk || 1);
                          scrollToTop();
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] py-2 rounded-lg text-xs font-serif font-extrabold transition-all cursor-pointer shadow-lg hover:shadow-[0_0_12px_rgba(212,175,55,0.3)]"
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
      {activeSelectedBook && currentChapterNum === null && (
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
              Perpustakaan &gt; <span className="text-[#ffcc33] font-serif">{activeSelectedBook.title}</span>
            </div>
          </div>

          {/* Mini Header of Selected Book */}
          <div className={`p-6 rounded-xl bg-gradient-to-r ${activeSelectedBook.color} border border-[#d4af37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#ffcc33] uppercase tracking-widest bg-[#02110c]/70 px-2 py-0.5 rounded border border-[#d4af37]/20">
                  Indeks Resmi Penulis
                </span>
                {bookmarks[activeSelectedBook.id] && (
                  <span className="text-[10px] font-bold text-[#02110c] bg-[#ffcc33] px-2 py-0.5 rounded flex items-center gap-1">
                    <Bookmark className="w-3 h-3 fill-current" />
                    Melanjutkan: Bab {bookmarks[activeSelectedBook.id]}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#f2e8cf]">{activeSelectedBook.title}</h2>
              <p className="text-xs text-[#f2e8cf]/70 italic">{activeSelectedBook.subtitle}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleOpenEditBook(activeSelectedBook)}
                className="p-2 bg-[#02110c]/70 text-[#ffcc33] border border-[#d4af37]/30 rounded-lg hover:bg-[#d4af37]/20 cursor-pointer text-xs flex items-center gap-1.5 transition-all font-serif font-semibold"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit Info Buku
              </button>
              <button 
                onClick={() => resetBookProgress(activeSelectedBook.id)}
                className="p-2 bg-[#02110c]/70 text-red-400 hover:text-red-300 border border-red-500/20 rounded-lg hover:bg-red-500/10 cursor-pointer text-xs flex items-center gap-1.5 transition-all"
                title="Reset Progres Buku"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Status
              </button>
              <button
                onClick={() => {
                  const lastBk = bookmarks[activeSelectedBook.id];
                  setCurrentChapterNum(lastBk || 1);
                  scrollToTop();
                }}
                className="bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] px-4 py-2 rounded-lg text-xs font-serif font-extrabold transition-all cursor-pointer flex items-center gap-2"
              >
                <BookOpenCheck className="w-4 h-4" />
                {bookmarks[activeSelectedBook.id] ? "Lanjutkan Membaca" : "Mulai Baca Bab 1"}
              </button>
            </div>
          </div>

          {/* Search bar and Add Chapter Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#02110c] p-4 rounded-xl border border-[#d4af37]/25 shadow-md">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
              <input
                type="text"
                className="w-full bg-[#041d14]/80 border border-[#d4af37]/30 rounded-lg pl-10 pr-4 py-2 text-sm text-[#f2e8cf] placeholder-[#f2e8cf]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                placeholder="Cari nomor bab, judul, atau kata kunci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleOpenAddNextChapter(activeSelectedBook.id)}
                className="inline-flex items-center gap-1.5 bg-[#041d14] hover:bg-[#d4af37]/20 text-[#ffcc33] border border-[#d4af37]/40 px-3.5 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                + Tambah Bab Baru
              </button>
              <div className="text-xs text-[#f2e8cf]/70 hidden sm:block">
                Total: <strong className="text-[#ffcc33] font-mono">{filteredChapters.length}</strong> bab
              </div>
            </div>
          </div>

          {/* CHAPTERS GRID */}
          {filteredChapters.length === 0 ? (
            <div className="text-center py-12 bg-[#02110c]/30 border border-[#d4af37]/20 rounded-xl space-y-3">
              <p className="text-[#f2e8cf]/60">Tidak ada bab yang cocok dengan kata kunci pencarian Anda.</p>
              <div className="flex justify-center gap-3">
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-[#ffcc33] underline hover:text-[#f2e8cf] cursor-pointer"
                >
                  Hapus Pencarian
                </button>
                <button 
                  onClick={() => handleOpenAddNextChapter(activeSelectedBook.id)}
                  className="text-xs bg-[#d4af37] text-[#02110c] px-3 py-1 rounded font-serif font-bold cursor-pointer"
                >
                  + Tambah Bab Sekarang
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredChapters.map((chapter) => {
                const isCompleted = (completedChapters[activeSelectedBook.id] || []).includes(chapter.number);
                const isBookmarked = bookmarks[activeSelectedBook.id] === chapter.number;

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
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#ffcc33] bg-[#041d14] border border-[#d4af37]/20 px-2 py-0.5 rounded shrink-0">
                            BAB {chapter.number}
                          </span>
                          {chapter.isCustomEdited && (
                            <span className="text-[8px] font-mono text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-1.5 py-0.5 rounded">
                              Diedit
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleOpenEditChapter(activeSelectedBook.id, chapter.number)}
                            className="p-1 text-[#f2e8cf]/60 hover:text-[#ffcc33] hover:bg-[#d4af37]/10 rounded transition-colors cursor-pointer"
                            title="Edit Isi Bab Ini"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteChapter(activeSelectedBook.id, chapter.number, chapter.title)}
                            className="p-1 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                            title="Hapus Bab Ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleChapterComplete(activeSelectedBook.id, chapter.number)}
                            className={`p-1 rounded hover:bg-[#d4af37]/10 transition-colors cursor-pointer ml-1 ${
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
                      <div className="flex items-center gap-2">
                        {chapter.isCustomEdited && (
                          <button
                            onClick={() => handleResetChapterToDefault(activeSelectedBook.id, chapter.number)}
                            className="text-[9px] text-[#f2e8cf]/40 hover:text-[#ffcc33] flex items-center gap-1 cursor-pointer"
                            title="Reset ke Teks Bawaan"
                          >
                            <RotateCcw className="w-2.5 h-2.5" /> Reset
                          </button>
                        )}
                      </div>
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
      {activeSelectedBook && currentChapterNum !== null && (
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
                  Membaca Karya Penulis Utama
                </div>
                <div className="text-xs font-serif text-[#ffcc33] font-bold line-clamp-1">
                  {activeSelectedBook.title}
                </div>
              </div>
            </div>

            {/* Reading preferences & Tools */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* EDIT THIS CHAPTER BUTTON */}
              <button
                onClick={() => handleOpenEditChapter(activeSelectedBook.id, currentChapterNum)}
                className="bg-[#d4af37] text-[#02110c] hover:bg-[#ffcc33] px-3 py-1.5 rounded-lg text-xs font-serif font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                title="Edit Teks Bacaan Bab Ini"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit Bacaan Ini
              </button>

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
              </div>

              {/* Bookmark state */}
              <button
                onClick={() => toggleBookmark(activeSelectedBook.id, currentChapterNum)}
                className={`p-2 rounded-lg border flex items-center justify-center gap-1.5 text-xs font-serif font-semibold cursor-pointer transition-all ${
                  bookmarks[activeSelectedBook.id] === currentChapterNum
                    ? "bg-[#ffcc33] text-[#02110c] border-[#ffcc33]"
                    : "bg-[#041d14] text-[#ffcc33] border-[#d4af37]/25 hover:border-[#d4af37]/50"
                }`}
                title="Beri Markah di Bab Ini"
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarks[activeSelectedBook.id] === currentChapterNum ? "fill-current" : ""}`} />
              </button>

              {/* Read progress state */}
              <button
                onClick={() => toggleChapterComplete(activeSelectedBook.id, currentChapterNum)}
                className={`p-2 rounded-lg border flex items-center justify-center gap-1.5 text-xs font-serif font-semibold cursor-pointer transition-all ${
                  (completedChapters[activeSelectedBook.id] || []).includes(currentChapterNum)
                    ? "bg-[#10b981] text-white border-[#10b981]"
                    : "bg-[#041d14] text-[#f2e8cf]/80 border-[#d4af37]/25 hover:border-[#d4af37]/50"
                }`}
                title="Tandai Selesai Membaca Bab Ini"
              >
                <CheckCircle className="w-3.5 h-3.5 fill-current" />
              </button>

            </div>
          </div>

          {/* QUICK DIRECTORY SIDEBAR & CHAPTER PAGE CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* CHAPTER METADATA & QUICK DIRECTORY JUMP PANEL */}
            <div className="lg:col-span-1 bg-[#02110c] border border-[#d4af37]/20 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-[#d4af37]/15 pb-2">
                <div>
                  <h5 className="text-xs font-mono font-bold uppercase text-[#ffcc33] tracking-widest">
                    Navigasi Bab
                  </h5>
                  <p className="text-[10px] text-[#f2e8cf]/60">Pilih bab untuk langsung dibaca</p>
                </div>
                <button
                  onClick={() => handleOpenAddNextChapter(activeSelectedBook.id)}
                  className="p-1 bg-[#d4af37] text-[#02110c] rounded hover:bg-[#ffcc33] transition-colors cursor-pointer"
                  title="Tambah Bab Baru"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Jump buttons */}
              <div className="max-h-[380px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-[#d4af37]/20">
                {bookChapters.map((chap) => {
                  const chapNumber = chap.number;
                  const chapTitle = chap.title;
                  const isCurrent = currentChapterNum === chapNumber;
                  const isDone = (completedChapters[activeSelectedBook.id] || []).includes(chapNumber);

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
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold font-mono shrink-0 ${
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
                  Total Bab Buku Ini
                </div>
                <div className="text-lg font-serif font-black text-[#ffcc33]">
                  {bookChapters.length} Bab
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
                {(() => {
                  const currentData = getChapterData(activeSelectedBook.id, currentChapterNum);

                  return (
                    <>
                      <div className="text-center space-y-3 pb-6 border-b border-[#d4af37]/20 mb-8 z-10 relative">
                        <div className="flex items-center justify-center gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#ffcc33] bg-[#02110c] px-3 py-1 rounded-full border border-[#d4af37]/30 uppercase">
                            📖 BAB {currentChapterNum}
                          </span>
                          {currentData.isCustomEdited && (
                            <span className="text-[10px] font-mono text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2 py-0.5 rounded">
                              Telah Diperbaharui
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-serif font-extrabold tracking-tight leading-tight max-w-2xl mx-auto">
                          {currentData.title}
                        </h3>
                        
                        <div className="text-xs font-serif italic text-amber-600 dark:text-amber-400">
                          {currentData.partName}
                        </div>

                        <div className="pt-2 flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditChapter(activeSelectedBook.id, currentChapterNum)}
                            className="inline-flex items-center gap-1 text-xs text-[#ffcc33] bg-[#02110c] hover:bg-[#d4af37] hover:text-[#02110c] border border-[#d4af37]/40 px-3 py-1 rounded-md font-serif font-semibold transition-all cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                            Edit Teks Bab Ini
                          </button>
                          {currentData.isCustomEdited && (
                            <button
                              onClick={() => handleResetChapterToDefault(activeSelectedBook.id, currentChapterNum)}
                              className="inline-flex items-center gap-1 text-xs text-red-400 bg-[#02110c] hover:bg-red-500 hover:text-white border border-red-500/30 px-3 py-1 rounded-md font-serif transition-all cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              Reset ke Teks Asli
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Main Chapter Content with Paragraph Spacing */}
                      <div className={`${getFontSizeClass()} font-serif space-y-6 whitespace-pre-wrap text-justify leading-relaxed z-10 relative px-2 md:px-4`}>
                        {currentData.content.split("\n\n").map((para, i) => (
                          <p key={i} className="mb-4 leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    </>
                  );
                })()}

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
                    const currentIndex = bookChapters.findIndex(c => c.number === currentChapterNum);
                    if (currentIndex > 0) {
                      setCurrentChapterNum(bookChapters[currentIndex - 1].number);
                      scrollToTop();
                    }
                  }}
                  disabled={bookChapters.findIndex(c => c.number === currentChapterNum) <= 0}
                  className="flex items-center gap-1.5 bg-[#041d14] hover:bg-[#d4af37]/10 disabled:opacity-30 disabled:cursor-not-allowed border border-[#d4af37]/25 text-[#ffcc33] px-4 py-2.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Sebelumnya
                </button>

                <div className="text-xs font-mono text-[#f2e8cf]/70 text-center">
                  Bab <span className="text-[#ffcc33] font-bold">{currentChapterNum}</span>
                </div>

                <button
                  onClick={() => {
                    const currentIndex = bookChapters.findIndex(c => c.number === currentChapterNum);
                    if (currentIndex < bookChapters.length - 1) {
                      setCurrentChapterNum(bookChapters[currentIndex + 1].number);
                      scrollToTop();
                    }
                  }}
                  disabled={bookChapters.findIndex(c => c.number === currentChapterNum) >= bookChapters.length - 1}
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

      {/* MODAL EDIT / TAMBAH BAB */}
      <AnimatePresence>
        {chapterModal?.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#02110c] border-2 border-[#d4af37] rounded-2xl w-full max-w-3xl p-6 space-y-5 shadow-2xl my-8 text-[#f2e8cf]"
            >
              <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-3">
                <div className="flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-[#ffcc33]" />
                  <h3 className="text-lg font-serif font-bold text-[#ffcc33]">
                    {chapterModal.isNew ? `Tambah Bab Baru (${chapterModal.chapterNum})` : `Edit Bacaan Bab ${chapterModal.chapterNum}`}
                  </h3>
                </div>
                <button
                  onClick={() => setChapterModal(null)}
                  className="p-1 text-[#f2e8cf]/60 hover:text-white rounded cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-serif">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#ffcc33] font-bold mb-1">Nomor Bab</label>
                    <input
                      type="number"
                      min={1}
                      value={chapterModal.chapterNum}
                      onChange={(e) => setChapterModal({ ...chapterModal, chapterNum: parseInt(e.target.value, 10) || 1 })}
                      className="w-full bg-[#041d14] border border-[#d4af37]/40 rounded-lg p-2 text-[#f2e8cf] font-mono focus:outline-none focus:border-[#ffcc33]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[#ffcc33] font-bold mb-1">Bagian / Sub-Judul (Part Title)</label>
                    <input
                      type="text"
                      value={chapterModal.partName}
                      onChange={(e) => setChapterModal({ ...chapterModal, partName: e.target.value })}
                      placeholder="Contoh: Bagian 1: Fondasi Dasar..."
                      className="w-full bg-[#041d14] border border-[#d4af37]/40 rounded-lg p-2 text-[#f2e8cf] focus:outline-none focus:border-[#ffcc33]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#ffcc33] font-bold mb-1">Judul Utama Bab</label>
                  <input
                    type="text"
                    value={chapterModal.title}
                    onChange={(e) => setChapterModal({ ...chapterModal, title: e.target.value })}
                    placeholder="Masukkan judul bab..."
                    className="w-full bg-[#041d14] border border-[#d4af37]/40 rounded-lg p-2.5 text-sm font-bold text-[#f2e8cf] focus:outline-none focus:border-[#ffcc33]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[#ffcc33] font-bold">Isi Teks Bacaan Lengkap</label>
                    <span className="text-[10px] text-[#f2e8cf]/50">Gunakan spasi baris ganda (Enter 2x) untuk pemisah paragraf</span>
                  </div>
                  <textarea
                    rows={12}
                    value={chapterModal.content}
                    onChange={(e) => setChapterModal({ ...chapterModal, content: e.target.value })}
                    placeholder="Tuliskan isi bab lengkap di sini..."
                    className="w-full bg-[#041d14] border border-[#d4af37]/40 rounded-lg p-3 text-xs text-[#f2e8cf] font-serif leading-relaxed focus:outline-none focus:border-[#ffcc33] scrollbar-thin"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#d4af37]/30 pt-4">
                <span className="text-[10px] text-[#f2e8cf]/60">
                  Perubahan akan langsung tersimpan secara permanen di browser Anda.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChapterModal(null)}
                    className="px-4 py-2 bg-[#041d14] hover:bg-[#02110c] text-[#f2e8cf] rounded-lg text-xs font-serif border border-[#d4af37]/30 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveChapter}
                    className="px-5 py-2 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] rounded-lg text-xs font-serif font-extrabold flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL EDIT / TAMBAH BUKU */}
      <AnimatePresence>
        {bookModal?.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#02110c] border-2 border-[#d4af37] rounded-2xl w-full max-w-xl p-6 space-y-5 shadow-2xl my-8 text-[#f2e8cf]"
            >
              <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#ffcc33]" />
                  <h3 className="text-lg font-serif font-bold text-[#ffcc33]">
                    {bookModal.isNew ? "Tambah Buku Bacaan Baru" : "Edit Informasi Buku"}
                  </h3>
                </div>
                <button
                  onClick={() => setBookModal(null)}
                  className="p-1 text-[#f2e8cf]/60 hover:text-white rounded cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-serif">
                <div>
                  <label className="block text-[#ffcc33] font-bold mb-1">Judul Buku</label>
                  <input
                    type="text"
                    value={bookModal.title}
                    onChange={(e) => setBookModal({ ...bookModal, title: e.target.value })}
                    placeholder="Masukkan judul buku..."
                    className="w-full bg-[#041d14] border border-[#d4af37]/40 rounded-lg p-2.5 text-sm font-bold text-[#f2e8cf] focus:outline-none focus:border-[#ffcc33]"
                  />
                </div>

                <div>
                  <label className="block text-[#ffcc33] font-bold mb-1">Sub-Judul Buku</label>
                  <input
                    type="text"
                    value={bookModal.subtitle}
                    onChange={(e) => setBookModal({ ...bookModal, subtitle: e.target.value })}
                    placeholder="Masukkan sub-judul buku..."
                    className="w-full bg-[#041d14] border border-[#d4af37]/40 rounded-lg p-2 text-[#f2e8cf] focus:outline-none focus:border-[#ffcc33]"
                  />
                </div>

                <div>
                  <label className="block text-[#ffcc33] font-bold mb-1">Deskripsi Ringkas Buku</label>
                  <textarea
                    rows={4}
                    value={bookModal.description}
                    onChange={(e) => setBookModal({ ...bookModal, description: e.target.value })}
                    placeholder="Tuliskan deskripsi ringkas cakupan materi buku ini..."
                    className="w-full bg-[#041d14] border border-[#d4af37]/40 rounded-lg p-2.5 text-xs text-[#f2e8cf] focus:outline-none focus:border-[#ffcc33]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#ffcc33] font-bold mb-1">Ikon Sampul</label>
                    <select
                      value={bookModal.icon}
                      onChange={(e) => setBookModal({ ...bookModal, icon: e.target.value })}
                      className="w-full bg-[#041d14] border border-[#d4af37]/40 rounded-lg p-2 text-[#f2e8cf] focus:outline-none focus:border-[#ffcc33]"
                    >
                      <option value="Compass">Kompas (Filsafat)</option>
                      <option value="Shield">Perisai (Prinsip)</option>
                      <option value="Flame">Api (Disiplin)</option>
                      <option value="Users">Manusia (Kepemimpinan)</option>
                      <option value="Crown">Mahkota (Kekuasaan)</option>
                      <option value="BookOpen">Buku Umum</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#ffcc33] font-bold mb-1">Gaya Warna Sampul</label>
                    <select
                      value={bookModal.color}
                      onChange={(e) => setBookModal({ ...bookModal, color: e.target.value })}
                      className="w-full bg-[#041d14] border border-[#d4af37]/40 rounded-lg p-2 text-[#f2e8cf] focus:outline-none focus:border-[#ffcc33]"
                    >
                      <option value="from-amber-950 via-amber-900 to-[#1c120c]">Emas Amber</option>
                      <option value="from-[#021d1d] via-[#043333] to-[#011414]">Hijau Zamrud</option>
                      <option value="from-red-950 via-stone-900 to-[#120505]">Merah Barongsai</option>
                      <option value="from-[#061e38] via-[#0a2f57] to-[#020e1c]">Biru Kerajaan</option>
                      <option value="from-[#1b082e] via-[#2d124d] to-[#0c0314]">Ungu Lembayung</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end border-t border-[#d4af37]/30 pt-4 gap-2">
                <button
                  onClick={() => setBookModal(null)}
                  className="px-4 py-2 bg-[#041d14] hover:bg-[#02110c] text-[#f2e8cf] rounded-lg text-xs font-serif border border-[#d4af37]/30 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveBook}
                  className="px-5 py-2 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] rounded-lg text-xs font-serif font-extrabold flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  Simpan Buku
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
