import { motion } from "motion/react";
import { compilerBiography } from "../data/initialData";
import { Award, BookOpen, Star, ShieldAlert } from "lucide-react";

export default function BiographySection() {
  const bio = compilerBiography;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header Banner with Golden Fire styling */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#02110c] via-[#041d14] to-[#02110c] border-t-4 border-[#d4af37] p-8 md:p-12 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        {/* Animated ambient decorative particles */}
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#ffcc33] rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-ping duration-1000"></div>

        <div className="relative flex flex-col md:flex-row items-center gap-8 z-10">
          <div className="relative">
            {/* Elegant avatar placeholder with golden glowing borders resembling crown/sunrays */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#ffcc33] to-[#02110c] p-1 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#02110c] flex items-center justify-center overflow-hidden">
                <span className="text-3xl md:text-4xl font-serif text-[#d4af37] font-extrabold tracking-widest">
                  JA
                </span>
              </div>
            </div>
            {/* Absolute badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d4af37] to-[#ffcc33] text-[#02110c] text-xs font-bold px-3 py-1 rounded-full shadow border border-yellow-200 uppercase tracking-widest whitespace-nowrap">
              Orang Dalam Genetik Jawa
            </div>
          </div>

          <div className="text-center md:text-left space-y-3 flex-1">
            <div className="inline-flex items-center gap-1.5 bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#ffcc33] text-xs px-2.5 py-1 rounded-md uppercase font-semibold tracking-wider">
              <Star className="w-3.5 h-3.5 text-[#ffcc33] fill-[#ffcc33]" />
              Profil Penulis Utama
            </div>
            <h2 id="biography-title" className="text-3xl md:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-[#d4af37] to-yellow-200">
              {bio.name}
            </h2>
            <p className="text-emerald-300/90 font-serif font-medium text-lg italic">
              {bio.title}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#d4af37] to-[#ffcc33] mx-auto md:mx-0 rounded-full"></div>
            <p className="text-emerald-100/80 text-sm md:text-base max-w-2xl leading-relaxed">
              Mendedikasikan ilmu pendidikan dan spiritualitas kebudayaan Jawa untuk melestarikan silsilah emas peradaban Nusantara.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Quick facts & expertise */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-[#02110c]/80 backdrop-blur-md border border-[#d4af37]/30 rounded-xl p-6 space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <h3 className="text-lg font-bold text-[#d4af37] flex items-center gap-2 border-b border-[#d4af37]/20 pb-3 font-serif">
              <Award className="w-5 h-5 text-[#d4af37]" />
              Spesialisasi Kajian
            </h3>
            
            <div className="space-y-3">
              {bio.expertise.map((exp, idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-lg bg-[#041d14]/50 border border-[#d4af37]/15 hover:border-[#d4af37]/40 transition-colors"
                >
                  <p className="text-[10px] text-[#ffcc33] font-bold uppercase tracking-wider mb-1">Keahlian {idx + 1}</p>
                  <p className="text-sm text-[#f2e8cf] font-medium">{exp}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#d4af37]/10 to-[#ff9900]/5 border border-[#d4af37]/20 rounded-xl p-6 text-center space-y-4">
            <BookOpen className="w-8 h-8 text-[#d4af37] mx-auto" />
            <h4 className="text-sm font-bold text-amber-200 uppercase tracking-widest font-serif">
              Visi Kebudayaan Jawa
            </h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed italic font-serif">
              &quot;Urip iku urup. Sejarah dudu mung tatanan tulisan, nanging rupa geni spiritual sing kudu disalurake menyang generasi penerus.&quot;
            </p>
          </div>
        </div>

        {/* Right column: Full narrative & Philosophy */}
        <div className="space-y-6 lg:col-span-2">
          <div className="bg-[#02110c]/80 backdrop-blur-md border border-[#d4af37]/30 rounded-xl p-6 md:p-8 space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-[#d4af37] border-b border-[#d4af37]/20 pb-4 font-serif">
              Biografi Lengkap
            </h3>
            
            <p className="text-[#f2e8cf]/90 leading-relaxed text-sm md:text-base">
              {bio.bio}
            </p>

            <div className="p-5 rounded-xl bg-gradient-to-r from-[#041d14] to-[#02110c] border border-[#d4af37]/20 space-y-3">
              <h4 className="text-sm font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2 font-serif">
                <ShieldAlert className="w-4 h-4 text-[#ff9900] animate-pulse" />
                Filosofi Genetik Jawa & Silsilah Nusantara
              </h4>
              <p className="text-[#f2e8cf]/80 leading-relaxed text-xs md:text-sm">
                {bio.genealogyDetails}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-[#041d14]/30 border border-[#d4af37]/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#d4af37] font-bold">1</span>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-300/70 uppercase">Koleksi Terverifikasi</p>
                  <p className="text-sm font-bold text-[#ffcc33]">Bebas Kunci & Sandi</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#041d14]/30 border border-[#d4af37]/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#d4af37] font-bold">2</span>
                </div>
                <div>
                  <p className="text-[10px] text-emerald-300/70 uppercase">Akurasi Informasi</p>
                  <p className="text-sm font-bold text-[#ffcc33]">Kurasi Akademis S.Pd.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
