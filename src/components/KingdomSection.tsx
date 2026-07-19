import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Kingdom } from "../types";
import { initialKingdoms } from "../data/initialData";
import { Search, Plus, Edit2, Trash2, Eye, Calendar, MapPin, User, ArrowLeft, Save, X } from "lucide-react";

export default function KingdomSection() {
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);
  const [search, setSearch] = useState("");
  const [selectedKingdom, setSelectedKingdom] = useState<Kingdom | null>(null);
  
  // Modals state
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<Omit<Kingdom, "id">>({
    name: "",
    period: "",
    location: "",
    founder: "",
    description: "",
    history: ""
  });
  const [editId, setEditId] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sejarah_kingdoms");
    if (saved) {
      setKingdoms(JSON.parse(saved));
    } else {
      setKingdoms(initialKingdoms);
      localStorage.setItem("sejarah_kingdoms", JSON.stringify(initialKingdoms));
    }
  }, []);

  const saveToLocalStorage = (updated: Kingdom[]) => {
    setKingdoms(updated);
    localStorage.setItem("sejarah_kingdoms", JSON.stringify(updated));
  };

  // CRUD actions
  const handleOpenCreate = () => {
    setFormData({
      name: "",
      period: "",
      location: "",
      founder: "",
      description: "",
      history: ""
    });
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (k: Kingdom) => {
    setFormData({
      name: k.name,
      period: k.period,
      location: k.location,
      founder: k.founder,
      description: k.description,
      history: k.history
    });
    setFormMode("edit");
    setEditId(k.id);
    setIsFormOpen(true);
  };

  const handleOpenView = (k: Kingdom) => {
    setSelectedKingdom(k);
    setIsViewOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kerajaan ini dari sejarah Nusantara?")) {
      const updated = kingdoms.filter(k => k.id !== id);
      saveToLocalStorage(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (formMode === "create") {
      const newKingdom: Kingdom = {
        id: `k-custom-${Date.now()}`,
        ...formData
      };
      const updated = [newKingdom, ...kingdoms];
      saveToLocalStorage(updated);
    } else if (formMode === "edit" && editId) {
      const updated = kingdoms.map(k => k.id === editId ? { ...k, ...formData } : k);
      saveToLocalStorage(updated);
    }
    setIsFormOpen(false);
  };

  const filteredKingdoms = kingdoms.filter(k => 
    k.name.toLowerCase().includes(search.toLowerCase()) ||
    k.location.toLowerCase().includes(search.toLowerCase()) ||
    k.founder.toLowerCase().includes(search.toLowerCase()) ||
    k.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#02110c] p-4 rounded-xl border border-[#d4af37]/30 shadow-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
          <input
            id="search-kingdoms"
            type="text"
            placeholder="Cari kerajaan nusantara..."
            className="w-full bg-[#041d14]/80 border border-[#d4af37]/30 rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#f2e8cf] placeholder-[#f2e8cf]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          id="btn-add-kingdom"
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] px-5 py-2.5 rounded-lg text-sm font-bold shadow-[0_0_10px_rgba(212,175,55,0.2)] active:scale-95 transition-all cursor-pointer font-serif"
        >
          <Plus className="w-4 h-4 text-[#02110c] stroke-[3]" />
          Tambah Kerajaan
        </button>
      </div>

      {/* Grid of Kingdoms */}
      {filteredKingdoms.length === 0 ? (
        <div className="text-center py-12 bg-[#02110c]/30 border border-[#d4af37]/20 rounded-xl">
          <p className="text-[#f2e8cf]/60">Tidak ada kerajaan yang ditemukan dengan kata kunci &quot;{search}&quot;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredKingdoms.map((k) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              key={k.id}
              className="bg-[#02110c]/85 border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/25 hover:border-[#d4af37]/50 rounded-xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.15)] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#d4af37] uppercase tracking-widest bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-0.5 rounded-md font-serif">
                    👑 Kerajaan Nusantara
                  </span>
                  <span className="text-[10px] text-[#ffcc33] font-mono flex items-center gap-1 bg-[#041d14]/75 px-2 py-0.5 rounded border border-[#d4af37]/20 shrink-0">
                    <Calendar className="w-3 h-3 text-[#d4af37]" />
                    {k.period}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#f2e8cf] group-hover:text-[#d4af37] transition-all">
                  {k.name}
                </h3>

                <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-[#f2e8cf]/70 font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                    {k.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    Pendiri: {k.founder}
                  </span>
                </div>

                <p className="text-[#f2e8cf]/80 text-xs md:text-sm leading-relaxed line-clamp-3 pt-1">
                  {k.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-[#d4af37]/15 mt-4 pt-4">
                <button
                  id={`btn-view-${k.id}`}
                  onClick={() => handleOpenView(k)}
                  className="flex items-center gap-1.5 text-xs text-[#d4af37] bg-[#d4af37]/5 hover:bg-[#d4af37]/15 border border-[#d4af37]/30 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer font-serif"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Kisah Lengkap
                </button>
                <button
                  id={`btn-edit-${k.id}`}
                  onClick={() => handleOpenEdit(k)}
                  className="flex items-center gap-1.5 text-xs text-[#ffcc33] bg-[#ffcc33]/5 hover:bg-[#ffcc33]/15 border border-[#ffcc33]/30 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer font-serif"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  id={`btn-delete-${k.id}`}
                  onClick={() => handleDelete(k.id)}
                  className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer font-serif"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* VIEW MODAL */}
      <AnimatePresence>
        {isViewOpen && selectedKingdom && (
          <div className="fixed inset-0 bg-[#02110c]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-b from-[#02110c] to-[#041d14] border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/40 rounded-xl p-6 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-4"
            >
              <button
                id="btn-close-view"
                onClick={() => setIsViewOpen(false)}
                className="absolute top-4 right-4 text-[#f2e8cf]/60 hover:text-[#d4af37] p-1.5 rounded-lg hover:bg-[#041d14] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 border-b border-[#d4af37]/20 pb-4">
                <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded font-serif">
                  👑 KERAJAAN HISTORIS
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-[#f2e8cf]">
                  {selectedKingdom.name}
                </h2>
                <div className="flex flex-wrap gap-4 text-xs text-[#f2e8cf]/70">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> {selectedKingdom.period}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> {selectedKingdom.location}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#d4af37]" /> Pendiri: {selectedKingdom.founder}</span>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-[#f2e8cf]/90">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1 font-serif">Sekilas Info</h4>
                  <p className="bg-[#02110c]/50 p-3 rounded border border-[#d4af37]/10">{selectedKingdom.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1 font-serif">Sejarah & Kejayaan</h4>
                  <p className="whitespace-pre-wrap leading-relaxed">{selectedKingdom.history}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#d4af37]/15 flex justify-end">
                <button
                  id="btn-close-view-bottom"
                  onClick={() => setIsViewOpen(false)}
                  className="bg-[#02110c] hover:bg-[#d4af37]/10 text-[#f2e8cf] border border-[#d4af37]/40 px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer font-serif"
                >
                  Tutup Silsilah
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
                id="btn-close-form"
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-[#f2e8cf]/60 hover:text-[#d4af37] p-1.5 rounded-lg hover:bg-[#041d14] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-serif font-bold text-[#d4af37] border-b border-[#d4af37]/20 pb-3 mb-4">
                {formMode === "create" ? "Tambah Kerajaan Baru" : "Edit Data Kerajaan"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm text-[#f2e8cf]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Nama Kerajaan</label>
                    <input
                      id="input-name"
                      type="text"
                      required
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Masa Kejayaan (Periode)</label>
                    <input
                      id="input-period"
                      type="text"
                      required
                      placeholder="Contoh: Abad ke-4 Masehi"
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Lokasi Kekuasaan</label>
                    <input
                      id="input-location"
                      type="text"
                      required
                      placeholder="Contoh: Jawa Timur"
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Pendiri Utama</label>
                    <input
                      id="input-founder"
                      type="text"
                      required
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                      value={formData.founder}
                      onChange={(e) => setFormData({ ...formData, founder: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Deskripsi Singkat</label>
                  <textarea
                    id="input-desc"
                    required
                    rows={2}
                    className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Silsilah Sejarah Lengkap</label>
                  <textarea
                    id="input-history"
                    required
                    rows={4}
                    className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                    value={formData.history}
                    onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d4af37]/20">
                  <button
                    id="btn-cancel-form"
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-[#02110c] hover:bg-[#d4af37]/10 text-[#f2e8cf] border border-[#d4af37]/30 px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer font-serif"
                  >
                    Batal
                  </button>
                  <button
                    id="btn-save-form"
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
