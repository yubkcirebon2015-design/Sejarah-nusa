import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Hero } from "../types";
import { initialHeroes } from "../data/initialData";
import { generate350Heroes } from "../utils/generator";
import { Search, Plus, Edit2, Trash2, Eye, Calendar, MapPin, Tag, ArrowLeft, Save, X, Database, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals state
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<Omit<Hero, "id">>({
    name: "",
    birthDeath: "",
    origin: "",
    category: "",
    description: "",
    story: ""
  });
  const [editId, setEditId] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sejarah_heroes");
    if (saved) {
      setHeroes(JSON.parse(saved));
    } else {
      setHeroes(initialHeroes);
      localStorage.setItem("sejarah_heroes", JSON.stringify(initialHeroes));
    }
  }, []);

  const saveToLocalStorage = (updated: Hero[]) => {
    setHeroes(updated);
    localStorage.setItem("sejarah_heroes", JSON.stringify(updated));
    setCurrentPage(1); // Reset page on modifications
  };

  // Instant 350-Heroes generator
  const handlePopulateTo350 = () => {
    const populated = generate350Heroes(heroes);
    saveToLocalStorage(populated);
    alert(`Sukses mempopulasikan database! Kini terdapat ${populated.length} Tokoh Pahlawan Nasional lengkap dengan kisah luhurnya.`);
  };

  // CRUD actions
  const handleOpenCreate = () => {
    setFormData({
      name: "",
      birthDeath: "",
      origin: "",
      category: "Pahlawan Perjuangan Kemerdekaan",
      description: "",
      story: ""
    });
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (h: Hero) => {
    setFormData({
      name: h.name,
      birthDeath: h.birthDeath,
      origin: h.origin,
      category: h.category,
      description: h.description,
      story: h.story
    });
    setFormMode("edit");
    setEditId(h.id);
    setIsFormOpen(true);
  };

  const handleOpenView = (h: Hero) => {
    setSelectedHero(h);
    setIsViewOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kisah pahlawan ini?")) {
      const updated = heroes.filter(h => h.id !== id);
      saveToLocalStorage(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (formMode === "create") {
      const newHero: Hero = {
        id: `h-custom-${Date.now()}`,
        ...formData
      };
      const updated = [newHero, ...heroes];
      saveToLocalStorage(updated);
    } else if (formMode === "edit" && editId) {
      const updated = heroes.map(h => h.id === editId ? { ...h, ...formData } : h);
      saveToLocalStorage(updated);
    }
    setIsFormOpen(false);
  };

  // Categories helper
  const availableCategories = ["Semua", ...Array.from(new Set(heroes.map(h => h.category)))];

  // Filtering
  const filteredHeroes = heroes.filter(h => {
    const matchesSearch = 
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.origin.toLowerCase().includes(search.toLowerCase()) ||
      h.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = categoryFilter === "Semua" || h.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalItems = filteredHeroes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHeroes = filteredHeroes.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="space-y-6">
      {/* Banner / Info Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-[#02110c] via-[#041d14] to-[#02110c] border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/25 shadow-md gap-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-[#d4af37] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffcc33]" />
            Fitur Kumpulan Pahlawan Nasional
          </h3>
          <p className="text-xs text-[#f2e8cf]/80 leading-relaxed mt-1 max-w-2xl">
            Saat ini tersedia <strong className="text-[#ffcc33] font-bold font-mono">{heroes.length}</strong> pahlawan dalam sistem. Anda dapat memicu generator instan di sebelah kanan untuk memperbanyak hingga <strong className="text-[#ffcc33] font-bold font-mono">350 tokoh</strong> pahlawan lengkap seketika guna memenuhi keperluan data historis berskala besar.
          </p>
        </div>
        
        {heroes.length < 350 && (
          <button
            id="btn-populate-heroes"
            onClick={handlePopulateTo350}
            className="flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] font-extrabold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase shadow-[0_0_10px_rgba(212,175,55,0.2)] active:scale-95 transition-all whitespace-nowrap border border-yellow-200/30 cursor-pointer font-serif"
          >
            <Database className="w-4 h-4 text-[#02110c]" />
            Populasi 350 Tokoh
          </button>
        )}
      </div>

      {/* Filter and Search controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#02110c] p-4 rounded-xl border border-[#d4af37]/30 shadow-md">
        <div className="relative md:col-span-1.5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
          <input
            id="search-heroes"
            type="text"
            placeholder="Cari tokoh pahlawan..."
            className="w-full bg-[#041d14]/80 border border-[#d4af37]/30 rounded-lg pl-10 pr-4 py-2 text-sm text-[#f2e8cf] placeholder-[#f2e8cf]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div>
          <select
            id="filter-category"
            className="w-full bg-[#041d14]/80 border border-[#d4af37]/30 rounded-lg px-3 py-2 text-sm text-[#f2e8cf] focus:outline-none focus:border-[#d4af37] transition-all font-serif"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            {availableCategories.map((cat, idx) => (
              <option key={idx} value={cat} className="bg-[#02110c] text-[#f2e8cf]">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          id="btn-add-hero"
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-md cursor-pointer font-serif"
        >
          <Plus className="w-4 h-4 text-[#02110c] stroke-[3]" />
          Tambah Tokoh Pahlawan
        </button>
      </div>

      {/* Hero cards list */}
      {paginatedHeroes.length === 0 ? (
        <div className="text-center py-12 bg-[#02110c]/30 border border-[#d4af37]/20 rounded-xl">
          <p className="text-[#f2e8cf]/60">Tidak ada pahlawan nasional yang ditemukan dengan filter tersebut.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedHeroes.map((h) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={h.id}
              className="bg-[#02110c]/85 border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/25 hover:border-[#d4af37]/50 rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.15)] flex flex-col justify-between group transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="inline-block text-[9px] font-bold text-[#d4af37] uppercase tracking-widest bg-[#d4af37]/10 border border-[#d4af37]/20 px-2 py-0.5 rounded font-serif">
                    🇮🇩 PAHLAWAN
                  </span>
                  <span className="text-[10px] text-[#ffcc33] font-mono font-bold shrink-0">
                    {h.birthDeath}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#f2e8cf] group-hover:text-[#d4af37] transition-all leading-snug">
                  {h.name}
                </h3>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#f2e8cf]/70">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span className="truncate">{h.origin}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#ffcc33] bg-[#041d14]/75 border border-[#d4af37]/20 rounded px-2 py-1">
                    <Tag className="w-3 h-3 text-[#d4af37] shrink-0" />
                    <span className="truncate font-semibold">{h.category}</span>
                  </div>
                </div>

                <p className="text-[#f2e8cf]/80 text-xs leading-relaxed line-clamp-3 pt-1">
                  {h.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-1.5 border-t border-[#d4af37]/15 mt-4 pt-4">
                <button
                  id={`btn-hero-view-${h.id}`}
                  onClick={() => handleOpenView(h)}
                  className="p-1.5 text-[#d4af37] hover:bg-[#d4af37]/10 border border-[#d4af37]/30 rounded transition-all cursor-pointer"
                  title="Lihat Kisah Lengkap"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  id={`btn-hero-edit-${h.id}`}
                  onClick={() => handleOpenEdit(h)}
                  className="p-1.5 text-[#ffcc33] hover:bg-[#ffcc33]/10 border border-[#ffcc33]/30 rounded transition-all cursor-pointer"
                  title="Edit Data"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  id={`btn-hero-delete-${h.id}`}
                  onClick={() => handleDelete(h.id)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded transition-all cursor-pointer"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination component */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-[#02110c] px-4 py-3 rounded-xl border border-[#d4af37]/30 shadow-md">
          <p className="text-xs text-[#f2e8cf]/70">
            Menampilkan <span className="font-semibold text-[#d4af37]">{startIndex + 1}</span> - <span className="font-semibold text-[#d4af37]">{Math.min(startIndex + itemsPerPage, totalItems)}</span> dari <span className="font-semibold text-[#d4af37]">{totalItems}</span> pahlawan
          </p>

          <div className="flex items-center gap-2">
            <button
              id="btn-prev-page"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-1.5 rounded bg-[#041d14] border border-[#d4af37]/30 text-[#f2e8cf] hover:bg-[#d4af37]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-[#ffcc33] px-2">
              Halaman {currentPage} / {totalPages}
            </span>
            <button
              id="btn-next-page"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded bg-[#041d14] border border-[#d4af37]/30 text-[#f2e8cf] hover:bg-[#d4af37]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      <AnimatePresence>
        {isViewOpen && selectedHero && (
          <div className="fixed inset-0 bg-[#02110c]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-b from-[#02110c] to-[#041d14] border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/40 rounded-xl p-6 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-4"
            >
              <button
                id="btn-close-hero-view"
                onClick={() => setIsViewOpen(false)}
                className="absolute top-4 right-4 text-[#f2e8cf]/60 hover:text-[#d4af37] p-1.5 rounded-lg hover:bg-[#041d14] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 border-b border-[#d4af37]/20 pb-4">
                <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded font-serif">
                  🇮🇩 TOKOH PAHLAWAN NASIONAL
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-[#f2e8cf]">
                  {selectedHero.name}
                </h2>
                <div className="flex flex-wrap gap-4 text-xs text-[#f2e8cf]/70">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> {selectedHero.birthDeath}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> {selectedHero.origin}</span>
                  <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5 text-[#d4af37]" /> {selectedHero.category}</span>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-[#f2e8cf]/90">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1 font-serif">Sekilas Profil</h4>
                  <p className="bg-[#02110c]/50 p-3 rounded border border-[#d4af37]/10">{selectedHero.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1 font-serif">Kisah Perjuangan & Keteladanan</h4>
                  <p className="whitespace-pre-wrap leading-relaxed">{selectedHero.story}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#d4af37]/15 flex justify-end">
                <button
                  id="btn-close-hero-view-bottom"
                  onClick={() => setIsViewOpen(false)}
                  className="bg-[#02110c] hover:bg-[#d4af37]/10 text-[#f2e8cf] border border-[#d4af37]/40 px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer font-serif"
                >
                  Tutup Kisah
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE / EDIT MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 bg-[#02110c]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-b from-[#02110c] to-[#041d14] border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/40 rounded-xl p-6 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                id="btn-close-hero-form"
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-[#f2e8cf]/60 hover:text-[#d4af37] p-1.5 rounded-lg hover:bg-[#041d14] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-serif font-bold text-[#d4af37] border-b border-[#d4af37]/20 pb-3 mb-4">
                {formMode === "create" ? "Tambah Pahlawan Baru" : "Edit Data Pahlawan"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm text-[#f2e8cf]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Nama Pahlawan</label>
                    <input
                      id="hero-input-name"
                      type="text"
                      required
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Tahun Lahir - Wafat</label>
                    <input
                      id="hero-input-birth"
                      type="text"
                      required
                      placeholder="Contoh: 1901 - 1970"
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                      value={formData.birthDeath}
                      onChange={(e) => setFormData({ ...formData, birthDeath: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Daerah Asal</label>
                    <input
                      id="hero-input-origin"
                      type="text"
                      required
                      placeholder="Contoh: Surabaya, Jawa Timur"
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Kategori Perjuangan</label>
                    <select
                      id="hero-input-category"
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf] font-serif"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Proklamator Kemerdekaan">Proklamator Kemerdekaan</option>
                      <option value="Pahlawan Kebangkitan Nasional">Pahlawan Kebangkitan Nasional</option>
                      <option value="Bapak Pendidikan Nasional">Bapak Pendidikan Nasional</option>
                      <option value="Pahlawan Perjuangan Daerah">Pahlawan Perjuangan Daerah</option>
                      <option value="Pahlawan Revolusi">Pahlawan Revolusi</option>
                      <option value="Pelopor Emansipasi Wanita">Pelopor Emansipasi Wanita</option>
                      <option value="Militer & Panglima Besar">Militer & Panglima Besar</option>
                      <option value="Pahlawan Pergerakan Nasional">Pahlawan Pergerakan Nasional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Deskripsi Singkat</label>
                  <textarea
                    id="hero-input-desc"
                    required
                    rows={2}
                    className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Kisah Lengkap & Nilai Luhur</label>
                  <textarea
                    id="hero-input-story"
                    required
                    rows={4}
                    className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d4af37]/20">
                  <button
                    id="btn-cancel-hero-form"
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-[#02110c] hover:bg-[#d4af37]/10 text-[#f2e8cf] border border-[#d4af37]/30 px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer font-serif"
                  >
                    Batal
                  </button>
                  <button
                    id="btn-save-hero-form"
                    type="submit"
                    className="flex items-center gap-1 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] px-5 py-2 rounded text-xs font-bold active:scale-95 transition-all cursor-pointer font-serif shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
