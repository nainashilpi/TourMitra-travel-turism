"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // Navigation ke liye add kiya
import { TRIPS, TravelGroup, Trip } from "@/constants/Tripsdata";
import { 
  MapPin, Star, Search, ShieldCheck, 
  ChevronRight, RotateCcw, Filter, Plane, Compass, Heart, X 
} from "lucide-react";

const GROUP_OPTIONS: { id: TravelGroup; label: string; emoji: string }[] = [
  { id: "family", label: "Family", emoji: "👨‍👩‍👧‍👦" },
  { id: "friends", label: "Friends", emoji: "🧑‍🤝‍🧑" },
  { id: "solo", label: "Solo", emoji: "🧳" },
  { id: "couple", label: "Couple", emoji: "💑" },
];
const DURATION_OPTIONS = [
  { label: "1–3 Days", min: 1, max: 3 },
  { label: "4–6 Days", min: 4, max: 6 },
  { label: "7–10 Days", min: 7, max: 10 },
  { label: "11+ Days", min: 11, max: 99 },
];
const CATEGORIES = [
  { id: "domestic", label: "Domestic", icon: <Plane size={12} /> },
  { id: "international", label: "Intl", icon: <Compass size={12} /> },
  { id: "adventure", label: "Adventure", icon: <Star size={12} /> },
  { id: "honeymoon", label: "Honeymoon", icon: <Heart size={12} /> },
];
const SORT_OPTIONS = [
  { id: "popular", label: "Trending" },
  { id: "price-asc", label: "Budget" },
  { id: "price-desc", label: "Luxury" },
  { id: "rating", label: "Top Rated" },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState(300000);
  const [selectedGroups, setSelectedGroups] = useState<TravelGroup[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const clearFilters = () => {
    setBudget(300000);
    setSelectedGroups([]);
    setSelectedDurations([]);
    setSelectedCats([]);
    setSearchQuery("");
  };

  const displayed = useMemo(() => {
    let result = TRIPS.filter(trip => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = trip.title.toLowerCase().includes(q) || trip.country.toLowerCase().includes(q);
      if (!matchesSearch) return false;
      if (trip.price > budget) return false;
      if (selectedGroups.length > 0 && !selectedGroups.some(g => trip.groupTypes.includes(g))) return false;
      if (selectedCats.length > 0 && !selectedCats.includes(trip.category)) return false;
      if (selectedDurations.length > 0) {
        const match = DURATION_OPTIONS.filter(d => selectedDurations.includes(d.label));
        if (!match.some(d => trip.days >= d.min && trip.days <= d.max)) return false;
      }
      return true;
    });

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [searchQuery, budget, selectedGroups, selectedDurations, selectedCats, sortBy]);

  const SidebarContent = () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#e7d393] mb-5 flex items-center gap-2">
          <Filter size={12} /> Investment Cap: ₹{budget.toLocaleString()}
        </h4>
        <input type="range" min="10000" max="300000" step="5000" value={budget} 
          onChange={(e) => setBudget(parseInt(e.target.value))}
          className="w-full h-1 bg-white/10 rounded-full accent-[#e7d393] appearance-none cursor-pointer" 
        />
      </div>

      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Category Scope</h4>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map(cat => (
            <button key={cat.id} 
              onClick={() => setSelectedCats(p => p.includes(cat.id) ? p.filter(x => x !== cat.id) : [...p, cat.id])}
              className={`flex items-center gap-2 px-3 py-3 rounded-xl text-[8px] font-black uppercase border transition-all ${selectedCats.includes(cat.id) ? "bg-[#e7d393] text-black border-[#e7d393]" : "bg-white/5 border-white/5 text-white/40"}`}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Group Hierarchy</h4>
        <div className="grid grid-cols-2 gap-2">
          {GROUP_OPTIONS.map(g => (
            <button key={g.id} 
              onClick={() => setSelectedGroups(p => p.includes(g.id) ? p.filter(x => x !== g.id) : [...p, g.id])}
              className={`py-3 rounded-xl text-[8px] font-black uppercase border transition-all ${selectedGroups.includes(g.id) ? "bg-[#e7d393] text-black border-[#e7d393]" : "bg-white/5 border-white/5 text-white/40"}`}>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Duration</h4>
        <div className="flex flex-wrap gap-2">
          {DURATION_OPTIONS.map(d => (
            <button key={d.label} 
              onClick={() => setSelectedDurations(p => p.includes(d.label) ? p.filter(x => x !== d.label) : [...p, d.label])}
              className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase border transition-all ${selectedDurations.includes(d.label) ? "border-[#e7d393] text-[#e7d393]" : "border-white/5 text-white/30"}`}>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <button onClick={clearFilters} className="w-full py-4 bg-[#ef4444]/10 text-[#ef4444] rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-[#ef4444] hover:text-white transition-all flex items-center justify-center gap-2 mt-4">
        <RotateCcw size={12} /> Flush Configurations
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      
      <div className="fixed inset-0 z-0">
        <Image src="/tourists.png" alt="BG" fill className="object-cover opacity-40 grayscale-[40%]" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/90 to-[#0a0a0a]" />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-[#0a0a0a] border-r border-white/10 z-[70] p-8 overflow-y-auto lg:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-[#e7d393] text-[10px] font-black uppercase tracking-widest">Filters</span>
                <button onClick={() => setIsSidebarOpen(false)} className="text-white/40"><X size={20}/></button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 pt-24 lg:pt-32 pb-20">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={14} className="text-[#e7d393]" />
              <span className="text-[#e7d393] text-[9px] font-black uppercase tracking-[0.5em]">TourMitra Global Engine</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter italic leading-none">
              Explore <span className="text-[#e7d393]">World.</span>
            </h1>
          </motion.div>

          <div className="flex items-center gap-4 w-full lg:max-w-md">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden bg-white/5 border border-white/10 p-4 rounded-full text-[#e7d393]"
            >
              <Filter size={20} />
            </button>
            <div className="flex-1 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full px-6 lg:px-8 py-4 lg:py-5 flex items-center shadow-2xl focus-within:border-[#e7d393]/40 transition-all">
              <Search className="text-[#e7d393]" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full outline-none px-4 text-xs font-bold tracking-widest placeholder:text-white/20"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-28 bg-white/[0.03] border border-white/10 p-8 rounded-[3rem] backdrop-blur-xl">
              <SidebarContent />
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white/[0.02] border border-white/5 p-2 rounded-2xl sm:rounded-3xl gap-4">
               <div className="px-4">
                 <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#e7d393]">{displayed.length} Found</span>
               </div>
               <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
                 {SORT_OPTIONS.map(opt => (
                   <button key={opt.id} onClick={() => setSortBy(opt.id)}
                     className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-[7px] sm:text-[8px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${sortBy === opt.id ? "bg-white/10 text-white shadow-xl" : "text-white/20 hover:text-white/40"}`}>
                     {opt.label}
                   </button>
                 ))}
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence mode="popLayout">
                {displayed.map((trip, idx) => (
                  <Link href={`/service/${trip.id}`} key={trip.id} className="block group"> 
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: idx * 0.03 }}
                      className="h-full bg-white/[0.01] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#e7d393]/40 transition-all duration-700 shadow-2xl flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[7px] font-black uppercase tracking-tighter">
                          {trip.days}D • {trip.nights}N
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin size={10} className="text-[#e7d393]" />
                          <span className="text-[#e7d393] text-[9px] font-black uppercase tracking-widest">{trip.country}</span>
                        </div>
                        <h3 className="text-xl font-bold tracking-tighter italic mb-4 line-clamp-1 group-hover:text-[#e7d393] transition-colors">{trip.title}</h3>
                        
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-1.5">
                            <Star size={10} className="text-[#e7d393] fill-[#e7d393]" />
                            <span className="text-[10px] font-black">{trip.rating}</span>
                          </div>
                          <span className="text-white/10 text-[8px] font-black uppercase tracking-tighter">{trip.category}</span>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                          <p className="text-xl font-black italic">₹{trip.price.toLocaleString()}</p>
                          <div className="bg-white text-black p-3 rounded-2xl group-hover:bg-[#e7d393] transition-colors shadow-lg">
                            <ChevronRight size={16} strokeWidth={3} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}