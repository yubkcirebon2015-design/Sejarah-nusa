import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import KingdomSection from "./components/KingdomSection";
import HeroSection from "./components/HeroSection";
import EventSection from "./components/EventSection";
import BiographySection from "./components/BiographySection";
import EbookSection from "./components/EbookSection";
import { Award, Flame, Landmark, BookOpen, Clock, Star, ShieldAlert, Library, BookMarked } from "lucide-react";

type ActiveTab = "kingdoms" | "heroes" | "events" | "biography" | "ebook";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("kingdoms");

  return (
    <div className="min-h-screen bg-[#041d14] text-[#f2e8cf] font-sans selection:bg-[#d4af37] selection:text-[#041d14] flex flex-col md:flex-row border-4 md:border-8 border-[#d4af37] relative overflow-x-hidden">
      
      {/* Decorative Golden Fire particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-[#ffcc33] rounded-full animate-ping pointer-events-none opacity-40"></div>
      <div className="absolute top-24 right-20 w-3 h-3 bg-[#d4af37] rounded-full animate-pulse pointer-events-none opacity-30"></div>
      <div className="absolute top-48 left-1/3 w-1.5 h-1.5 bg-[#ff9900] rounded-full animate-ping pointer-events-none opacity-20"></div>

      {/* SIDEBAR FOR DESKTOP, COLLAPSED ON MOBILE */}
      <aside className="w-full md:w-72 bg-[#02110c] border-b md:border-b-0 md:border-r border-[#d4af37]/30 flex flex-col p-6 shrink-0 z-20">
        {/* Author Portrait Badge */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-[#d4af37] bg-gradient-to-tr from-[#d4af37] via-[#ff9900] to-[#041d14] flex items-center justify-center text-3xl font-serif text-[#f2e8cf] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              JS
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#02110c] text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap border border-yellow-200">
              S.Pd
            </div>
          </div>
          
          <h2 className="text-xs uppercase tracking-widest text-[#d4af37] font-bold mt-2">
            Arsip Nasional
          </h2>
          <p className="text-[10px] opacity-60 italic mt-0.5">Disusun Oleh</p>
          <p className="text-sm font-serif font-bold text-[#f2e8cf] leading-tight mt-0.5">
            Jundi Abdul Syahid, S.Pd.
          </p>
          <p className="text-[9px] text-[#ffcc33] opacity-80 font-mono mt-1 uppercase tracking-tighter">
            (Orang Dalam Genetik Jawa)
          </p>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="space-y-3 flex-grow">
          <button
            id="tab-kingdoms"
            onClick={() => setActiveTab("kingdoms")}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === "kingdoms"
                ? "bg-[#d4af37] text-[#02110c] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)] scale-[1.02]"
                : "bg-transparent text-[#f2e8cf]/80 border-transparent hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10"
            }`}
          >
            <Landmark className="w-4 h-4 shrink-0" />
            <span className="font-serif">Kerajaan Nusantara</span>
          </button>

          <button
            id="tab-heroes"
            onClick={() => setActiveTab("heroes")}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === "heroes"
                ? "bg-[#d4af37] text-[#02110c] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)] scale-[1.02]"
                : "bg-transparent text-[#f2e8cf]/80 border-transparent hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10"
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span className="font-serif">350 Pahlawan Nasional</span>
          </button>

          <button
            id="tab-events"
            onClick={() => setActiveTab("events")}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === "events"
                ? "bg-[#d4af37] text-[#02110c] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)] scale-[1.02]"
                : "bg-transparent text-[#f2e8cf]/80 border-transparent hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10"
            }`}
          >
            <Clock className="w-4 h-4 shrink-0" />
            <span className="font-serif">350 Peristiwa Penting</span>
          </button>

          <button
            id="tab-ebook"
            onClick={() => setActiveTab("ebook")}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === "ebook"
                ? "bg-[#d4af37] text-[#02110c] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)] scale-[1.02]"
                : "bg-transparent text-[#f2e8cf]/80 border-transparent hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10"
            }`}
          >
            <BookMarked className="w-4 h-4 shrink-0" />
            <span className="font-serif">E-book Bacaan (100 Bab)</span>
          </button>

          <button
            id="tab-biography"
            onClick={() => setActiveTab("biography")}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === "biography"
                ? "bg-[#d4af37] text-[#02110c] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)] scale-[1.02]"
                : "bg-transparent text-[#f2e8cf]/80 border-transparent hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10"
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="font-serif">Biografi Penulis</span>
          </button>
        </nav>

        {/* Info footer in sidebar */}
        <div className="mt-8 pt-4 border-t border-[#d4af37]/20 text-[9px] opacity-60 uppercase tracking-widest text-center space-y-1">
          <p>Tanpa Sistem AI</p>
          <p className="text-amber-400 font-bold">100% Edukasi Sejarah</p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.12),_transparent)] relative overflow-y-auto">
        
        {/* Header bar matching the Artistic Flair aesthetic */}
        <header className="border-b border-[#d4af37]/20 px-6 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between bg-[#041d14]/85 backdrop-blur-md gap-4 z-10">
          <div className="flex items-baseline space-x-3 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#d4af37] tracking-tight italic">
              SEJARAH INDONESIA
            </h1>
            <span className="text-[9px] font-bold border border-[#d4af37] px-2 py-0.5 rounded text-[#ffcc33] uppercase whitespace-nowrap">
              Genetik Jawa
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/15 to-amber-500/15 border border-[#d4af37]/30 px-3 py-1 rounded text-xs font-mono text-[#ffcc33]">
              <Flame className="w-3.5 h-3.5 text-[#ff9900] animate-pulse fill-[#ff9900]" />
              Geni Emas Nusantara
            </div>
          </div>
        </header>

        {/* Dynamic Section Wrapper */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "kingdoms" && <KingdomSection />}
              {activeTab === "heroes" && <HeroSection />}
              {activeTab === "events" && <EventSection />}
              {activeTab === "ebook" && <EbookSection />}
              {activeTab === "biography" && <BiographySection />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer with Artistic Flair style */}
        <footer className="border-t border-[#d4af37]/15 bg-[#02110c] px-6 py-4 flex flex-col md:flex-row items-center justify-between text-[10px] text-[#f2e8cf]/70 gap-3 mt-auto">
          <div className="flex flex-wrap items-center gap-3 justify-center text-center md:text-left">
            <span className="text-[#d4af37] font-bold uppercase tracking-wider">BEBAS AKSES • TANPA SANDI • BEBAS KUNCI</span>
            <span className="opacity-30 hidden md:inline">|</span>
            <span>Sistem Pengarsipan Terbuka Nasional</span>
          </div>
          <div className="text-center font-serif">
            Copyright © 2026 Jundi Abdul Syahid, S.Pd.
          </div>
        </footer>

      </main>

    </div>
  );
}

