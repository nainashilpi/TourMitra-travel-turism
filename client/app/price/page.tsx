"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────── TYPES ─────────────────── */
type Category = "All" | "Beach" | "Mountains" | "Heritage" | "Wildlife" | "Spiritual" | "Adventure" | "Honeymoon";

interface Package {
  id: number;
  title: string;
  location: string;
  state: string;
  image: string;
  duration: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  badge: string | null;
  category: Category[];
  tags: string[];
  includes: string[];
  bestTime: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
}

/* ─────────────────── DATA ─────────────────── */
const packages: Package[] = [
  {
    id: 1,
    title: "Kashmir Paradise Valley",
    location: "Srinagar · Gulmarg · Pahalgam",
    state: "Jammu & Kashmir",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 4821,
    price: 22999,
    originalPrice: 31999,
    badge: "Most Popular",
    category: ["Mountains", "Honeymoon"],
    tags: ["Houseboat", "Shikara", "Snow"],
    includes: ["Hotel", "Flights", "Meals", "Guide"],
    bestTime: "Mar–Jun",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Goa Beach Fiesta",
    location: "North Goa · South Goa",
    state: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    reviews: 6340,
    price: 11999,
    originalPrice: 15999,
    badge: null,
    category: ["Beach", "Honeymoon"],
    tags: ["Beach", "Nightlife", "Water Sports"],
    includes: ["Resort", "Flights", "Sightseeing"],
    bestTime: "Nov–Feb",
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Kerala Backwaters Bliss",
    location: "Cochin · Munnar · Alleppey",
    state: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    reviews: 3902,
    price: 24999,
    originalPrice: 32999,
    badge: "Editor's Pick",
    category: ["Beach", "Honeymoon", "Wildlife"],
    tags: ["Houseboat", "Tea Garden", "Ayurveda"],
    includes: ["Houseboat", "Meals", "Guide", "Transport"],
    bestTime: "Sep–Mar",
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Manali Snow Adventure",
    location: "Manali · Solang Valley · Rohtang",
    state: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviews: 2876,
    price: 17499,
    originalPrice: 23999,
    badge: null,
    category: ["Mountains", "Adventure"],
    tags: ["Skiing", "Snow", "Trekking"],
    includes: ["Hotel", "Transport", "Meals"],
    bestTime: "Dec–Feb",
    difficulty: "Moderate",
  },
  {
    id: 5,
    title: "Rajasthan Royal Heritage",
    location: "Jaipur · Jodhpur · Udaipur",
    state: "Rajasthan",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    duration: "8 Days / 7 Nights",
    rating: 4.8,
    reviews: 3120,
    price: 28999,
    originalPrice: 38999,
    badge: "Premium",
    category: ["Heritage", "Honeymoon"],
    tags: ["Forts", "Palaces", "Desert"],
    includes: ["Palace Hotel", "Flights", "Guide", "Camel Safari"],
    bestTime: "Oct–Mar",
    difficulty: "Easy",
  },
  {
    id: 6,
    title: "Andaman Island Escape",
    location: "Port Blair · Havelock · Neil Island",
    state: "Andaman & Nicobar",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 2543,
    price: 31999,
    originalPrice: 41999,
    badge: "Top Rated",
    category: ["Beach", "Adventure", "Honeymoon"],
    tags: ["Diving", "Snorkeling", "Island"],
    includes: ["Resort", "Flights", "Water Sports", "Ferry"],
    bestTime: "Nov–Apr",
    difficulty: "Easy",
  },
  {
    id: 15,
    title: "Northeast Meghalaya Magic",
    location: "Shillong · Cherrapunji · Dawki",
    state: "Meghalaya",
    image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=80",
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 743,
    price: 19999,
    originalPrice: 26999,
    badge: "Hidden Gem",
    category: ["Mountains", "Adventure", "Wildlife"],
    tags: ["Living Root Bridge", "Caves", "Waterfalls"],
    includes: ["Hotel", "Transport", "Guide", "Meals"],
    bestTime: "Oct–May",
    difficulty: "Moderate",
  },
];

const CATEGORIES: Category[] = ["All", "Beach", "Mountains", "Heritage", "Wildlife", "Spiritual", "Adventure", "Honeymoon"];

const DIFFICULTY_STYLE: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Moderate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Challenging: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

/* ─────────────────── COMPONENTS ─────────────────── */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.236 2.506L10 3.94l-2 1.948.472 2.746L6 7.27 3.528 8.634 4 5.888 2 3.94l2.764-.434L6 1z"
            fill={s <= Math.round(rating) ? "#fbbf24" : "transparent"}
            stroke={s <= Math.round(rating) ? "#fbbf24" : "#4b5563"}
          />
        </svg>
      ))}
    </div>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  const [booked, setBooked] = useState(false);
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-amber-500/40"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-transparent to-transparent" />
        {pkg.badge && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase rounded-full shadow-lg">
            {pkg.badge}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-1">📍 {pkg.location}</p>
        <h3 className="text-xl font-bold text-white mb-3 leading-tight">{pkg.title}</h3>
        <div className="flex items-center gap-2 mb-4">
          <Stars rating={pkg.rating} />
          <span className="text-[10px] text-white/40">({pkg.reviews} reviews)</span>
        </div>
        
        <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/40 line-through">₹{pkg.originalPrice.toLocaleString()}</p>
            <p className="text-2xl font-black text-white italic">₹{pkg.price.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => setBooked(!booked)}
            className={`px-6 py-3 rounded-xl font-bold text-xs transition-all ${booked ? "bg-emerald-500 text-white" : "bg-[#e7d393] text-black hover:bg-white"}`}
          >
            {booked ? "✓ BOOKED" : "BOOK NOW"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PricePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...packages];
    if (activeCategory !== "All") list = list.filter(p => p.category.includes(activeCategory));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#020b18] text-white px-6 py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">OUR <span className="text-[#e7d393]">PRICES</span></h1>
          <p className="text-white/40 max-w-xl mx-auto italic">Transparent pricing for your dream Indian gateway.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between bg-white/5 p-4 rounded-[24px] border border-white/10 backdrop-blur-md">
          <input 
            type="text" 
            placeholder="Search destination..." 
            className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl outline-none w-full md:max-w-xs focus:border-amber-500/50 transition-all"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-[10px] font-bold transition-all whitespace-nowrap ${activeCategory === cat ? "bg-[#e7d393] text-black" : "bg-white/5 text-white/50 border border-white/5"}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}