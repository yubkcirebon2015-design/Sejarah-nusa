import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HistoricalEvent } from "../types";
import { initialEvents } from "../data/initialData";
import { generate350Events } from "../utils/generator";
import { Search, Plus, Edit2, Trash2, Eye, Calendar, MapPin, ArrowLeft, Save, X, Database, Sparkles, ChevronLeft, ChevronRight, Clock } from "lucide-react";

export default function EventSection() {
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals state
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<Omit<HistoricalEvent, "id">>({
    name: "",
    date: "",
    location: "",
    description: "",
    history: ""
  });
  const [editId, setEditId] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sejarah_events");
    if (saved) {
      setEvents(JSON.parse(saved));
    } else {
      setEvents(initialEvents);
      localStorage.setItem("sejarah_events", JSON.stringify(initialEvents));
    }
  }, []);

  const saveToLocalStorage = (updated: HistoricalEvent[]) => {
    setEvents(updated);
    localStorage.setItem("sejarah_events", JSON.stringify(updated));
    setCurrentPage(1); // Reset page on modifications
  };

  // Instant 350-Events generator
  const handlePopulateTo350 = () => {
    const populated = generate350Events(events);
    saveToLocalStorage(populated);
    alert(`Sukses mempopulasikan database! Kini terdapat ${populated.length} Peristiwa Sejarah Penting lengkap dengan narasinya.`);
  };

  // CRUD actions
  const handleOpenCreate = () => {
    setFormData({
      name: "",
      date: "",
      location: "",
      description: "",
      history: ""
    });
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (ev: HistoricalEvent) => {
    setFormData({
      name: ev.name,
      date: ev.date,
      location: ev.location,
      description: ev.description,
      history: ev.history
    });
    setFormMode("edit");
    setEditId(ev.id);
    setIsFormOpen(true);
  };

  const handleOpenView = (ev: HistoricalEvent) => {
    setSelectedEvent(ev);
    setIsViewOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus catatan peristiwa sejarah ini?")) {
      const updated = events.filter(ev => ev.id !== id);
      saveToLocalStorage(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (formMode === "create") {
      const newEvent: HistoricalEvent = {
        id: `e-custom-${Date.now()}`,
        ...formData
      };
      const updated = [newEvent, ...events];
      saveToLocalStorage(updated);
    } else if (formMode === "edit" && editId) {
      const updated = events.map(ev => ev.id === editId ? { ...ev, ...formData } : ev);
      saveToLocalStorage(updated);
    }
    setIsFormOpen(false);
  };

  // Filtering
  const filteredEvents = events.filter(ev => 
    ev.name.toLowerCase().includes(search.toLowerCase()) ||
    ev.location.toLowerCase().includes(search.toLowerCase()) ||
    ev.date.toLowerCase().includes(search.toLowerCase()) ||
    ev.description.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredEvents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

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
            <Clock className="w-5 h-5 text-[#ffcc33]" />
            Fitur Peristiwa Penting Sejarah Indonesia
          </h3>
          <p className="text-xs text-[#f2e8cf]/80 leading-relaxed mt-1 max-w-2xl">
            Tersedia <strong className="text-[#ffcc33] font-bold font-mono">{events.length}</strong> peristiwa bersejarah saat ini. Untuk mensimulasikan database penuh berskala masif, Anda dapat memicu generator di sebelah kanan untuk melengkapi database secara instan menjadi <strong className="text-[#ffcc33] font-bold font-mono">350 peristiwa</strong> bersejarah tanpa dipungut sandi maupun kunci.
          </p>
        </div>
        
        {events.length < 350 && (
          <button
            id="btn-populate-events"
            onClick={handlePopulateTo350}
            className="flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] font-extrabold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase shadow-[0_0_10px_rgba(212,175,55,0.2)] active:scale-95 transition-all whitespace-nowrap border border-yellow-200/30 cursor-pointer font-serif"
          >
            <Database className="w-4 h-4 text-[#02110c]" />
            Populasi 350 Peristiwa
          </button>
        )}
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#02110c] p-4 rounded-xl border border-[#d4af37]/30 shadow-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
          <input
            id="search-events"
            type="text"
            placeholder="Cari peristiwa sejarah, tanggal, atau tempat..."
            className="w-full bg-[#041d14]/80 border border-[#d4af37]/30 rounded-lg pl-10 pr-4 py-2 text-sm text-[#f2e8cf] placeholder-[#f2e8cf]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <button
          id="btn-add-event"
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#ffcc33] text-[#02110c] px-5 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-md cursor-pointer font-serif"
        >
          <Plus className="w-4 h-4 text-[#02110c] stroke-[3]" />
          Tambah Peristiwa Bersejarah
        </button>
      </div>

      {/* Events timeline grid */}
      {paginatedEvents.length === 0 ? (
        <div className="text-center py-12 bg-[#02110c]/30 border border-[#d4af37]/20 rounded-xl">
          <p className="text-[#f2e8cf]/60">Tidak ada peristiwa bersejarah yang cocok dengan pencarian Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedEvents.map((ev) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              key={ev.id}
              className="bg-[#02110c]/85 border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/25 hover:border-[#d4af37]/50 rounded-xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.15)] flex flex-col justify-between group transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#d4af37] uppercase tracking-widest bg-[#d4af37]/10 border border-[#d4af37]/20 px-2 py-0.5 rounded font-serif">
                    ⏳ MOMEN SEJARAH
                  </span>
                  <span className="text-[11px] text-[#ffcc33] font-mono font-bold flex items-center gap-1 bg-[#041d14]/75 px-2 py-0.5 rounded border border-[#d4af37]/20 shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    {ev.date}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#f2e8cf] group-hover:text-[#d4af37] transition-all leading-snug">
                  {ev.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[#f2e8cf]/70">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{ev.location}</span>
                </div>

                <p className="text-[#f2e8cf]/80 text-xs md:text-sm leading-relaxed line-clamp-3 pt-1">
                  {ev.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-[#d4af37]/15 mt-4 pt-4">
                <button
                  id={`btn-event-view-${ev.id}`}
                  onClick={() => handleOpenView(ev)}
                  className="flex items-center gap-1 bg-[#d4af37]/5 hover:bg-[#d4af37]/15 border border-[#d4af37]/30 px-3 py-1.5 rounded text-xs text-[#d4af37] font-semibold transition-all cursor-pointer font-serif"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Ulas Peristiwa
                </button>
                <button
                  id={`btn-event-edit-${ev.id}`}
                  onClick={() => handleOpenEdit(ev)}
                  className="flex items-center gap-1 bg-[#ffcc33]/5 hover:bg-[#ffcc33]/15 border border-[#ffcc33]/30 px-3 py-1.5 rounded text-xs text-[#ffcc33] font-semibold transition-all cursor-pointer font-serif"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  id={`btn-event-delete-${ev.id}`}
                  onClick={() => handleDelete(ev.id)}
                  className="flex items-center gap-1 bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 px-3 py-1.5 rounded text-xs text-red-400 font-semibold transition-all cursor-pointer font-serif"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus
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
            Menampilkan <span className="font-semibold text-[#d4af37]">{startIndex + 1}</span> - <span className="font-semibold text-[#d4af37]">{Math.min(startIndex + itemsPerPage, totalItems)}</span> dari <span className="font-semibold text-[#d4af37]">{totalItems}</span> peristiwa bersejarah
          </p>

          <div className="flex items-center gap-2">
            <button
              id="btn-event-prev"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-1.5 rounded bg-[#041d14] border border-[#d4af37]/30 text-[#f2e8cf] hover:bg-[#d4af37]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-[#ffcc33] px-2">
              Halaman {currentPage} / {totalPages}
            </span>
            <button
              id="btn-event-next"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded bg-[#041d14] border border-[#d4af37]/30 text-[#f2e8cf] hover:bg-[#d4af37]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      <AnimatePresence>
        {isViewOpen && selectedEvent && (
          <div className="fixed inset-0 bg-[#02110c]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-b from-[#02110c] to-[#041d14] border-t-4 border-t-[#d4af37] border-x border-b border-[#d4af37]/40 rounded-xl p-6 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-4"
            >
              <button
                id="btn-close-event-view"
                onClick={() => setIsViewOpen(false)}
                className="absolute top-4 right-4 text-[#f2e8cf]/60 hover:text-[#d4af37] p-1.5 rounded-lg hover:bg-[#041d14] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 border-b border-[#d4af37]/20 pb-4">
                <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded font-serif">
                  ⏳ PERISTIWA BERSEJARAH
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-[#f2e8cf]">
                  {selectedEvent.name}
                </h2>
                <div className="flex flex-wrap gap-4 text-xs text-[#f2e8cf]/70">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> {selectedEvent.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> {selectedEvent.location}</span>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-[#f2e8cf]/90">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1 font-serif">Ulasan Peristiwa</h4>
                  <p className="bg-[#02110c]/50 p-3 rounded border border-[#d4af37]/10">{selectedEvent.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1 font-serif">Sejarah Kejadian Selengkapnya</h4>
                  <p className="whitespace-pre-wrap leading-relaxed">{selectedEvent.history}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#d4af37]/15 flex justify-end">
                <button
                  id="btn-close-event-view-bottom"
                  onClick={() => setIsViewOpen(false)}
                  className="bg-[#02110c] hover:bg-[#d4af37]/10 text-[#f2e8cf] border border-[#d4af37]/40 px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer font-serif"
                >
                  Tutup Peristiwa
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
                id="btn-close-event-form"
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-[#f2e8cf]/60 hover:text-[#d4af37] p-1.5 rounded-lg hover:bg-[#041d14] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-serif font-bold text-[#d4af37] border-b border-[#d4af37]/20 pb-3 mb-4">
                {formMode === "create" ? "Tambah Peristiwa Baru" : "Edit Data Peristiwa"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm text-[#f2e8cf]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Nama Peristiwa</label>
                    <input
                      id="event-input-name"
                      type="text"
                      required
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Tanggal Terjadi</label>
                    <input
                      id="event-input-date"
                      type="text"
                      required
                      placeholder="Contoh: 17 Agustus 1945"
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Lokasi Peristiwa</label>
                    <input
                      id="event-input-location"
                      type="text"
                      required
                      placeholder="Contoh: Yogyakarta / Bandung, Jawa Barat"
                      className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Deskripsi Singkat</label>
                  <textarea
                    id="event-input-desc"
                    required
                    rows={2}
                    className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-wider font-serif">Sejarah Lengkap</label>
                  <textarea
                    id="event-input-history"
                    required
                    rows={4}
                    className="w-full bg-[#02110c] border border-[#d4af37]/30 rounded p-2 focus:outline-none focus:border-[#d4af37] text-[#f2e8cf]"
                    value={formData.history}
                    onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d4af37]/20">
                  <button
                    id="btn-cancel-event-form"
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-[#02110c] hover:bg-[#d4af37]/10 text-[#f2e8cf] border border-[#d4af37]/30 px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer font-serif"
                  >
                    Batal
                  </button>
                  <button
                    id="btn-save-event-form"
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
