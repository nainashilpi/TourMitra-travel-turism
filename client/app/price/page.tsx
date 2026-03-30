// client/app/price/page.tsx
"use client";

import { useState, useMemo } from "react";

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
    id: 7,
    title: "Leh Ladakh Bike Odyssey",
    location: "Leh · Nubra · Pangong · Khardung La",
    state: "Ladakh",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    duration: "9 Days / 8 Nights",
    rating: 4.9,
    reviews: 1987,
    price: 37999,
    originalPrice: 49999,
    badge: null,
    category: ["Mountains", "Adventure"],
    tags: ["Bike Tour", "High Altitude", "Monasteries"],
    includes: ["Camps", "Meals", "Bike", "Permit"],
    bestTime: "Jun–Sep",
    difficulty: "Challenging",
  },
  {
    id: 8,
    title: "Varanasi Spiritual Journey",
    location: "Varanasi · Sarnath · Prayagraj",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&q=80",
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    reviews: 2210,
    price: 9999,
    originalPrice: 13999,
    badge: null,
    category: ["Spiritual", "Heritage"],
    tags: ["Ganga Aarti", "Ghats", "Buddhist"],
    includes: ["Hotel", "Boat Ride", "Guide", "Meals"],
    bestTime: "Oct–Mar",
    difficulty: "Easy",
  },
  {
    id: 9,
    title: "Rishikesh Yoga & Rafting",
    location: "Rishikesh · Haridwar",
    state: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1585016495481-81544cf66d38?w=800&q=80",
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    reviews: 3401,
    price: 10999,
    originalPrice: 14999,
    badge: null,
    category: ["Spiritual", "Adventure"],
    tags: ["Rafting", "Yoga", "Camping"],
    includes: ["Camp", "Meals", "Rafting", "Yoga"],
    bestTime: "Sep–Jun",
    difficulty: "Moderate",
  },
  {
    id: 10,
    title: "Sikkim Darjeeling Trails",
    location: "Gangtok · Pelling · Darjeeling",
    state: "Sikkim & West Bengal",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    reviews: 1654,
    price: 21999,
    originalPrice: 28999,
    badge: "New",
    category: ["Mountains", "Adventure"],
    tags: ["Tea Garden", "Monastery", "Sunrise"],
    includes: ["Hotel", "Transport", "Guide", "Meals"],
    bestTime: "Mar–May, Oct–Dec",
    difficulty: "Easy",
  },
  {
    id: 11,
    title: "Coorg Coffee Retreat",
    location: "Coorg · Mysore · Chikmagalur",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=800&q=80",
    duration: "5 Days / 4 Nights",
    rating: 4.6,
    reviews: 1320,
    price: 15999,
    originalPrice: 21999,
    badge: null,
    category: ["Wildlife", "Honeymoon"],
    tags: ["Coffee Estates", "Waterfalls", "Elephant"],
    includes: ["Resort", "Meals", "Safari", "Transport"],
    bestTime: "Oct–Mar",
    difficulty: "Easy",
  },
  {
    id: 12,
    title: "Spiti Valley Expedition",
    location: "Shimla · Kaza · Chandratal",
    state: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80",
    duration: "10 Days / 9 Nights",
    rating: 4.9,
    reviews: 876,
    price: 33999,
    originalPrice: 44999,
    badge: "Adventure Special",
    category: ["Mountains", "Adventure"],
    tags: ["Desert Mountain", "Monasteries", "Stargazing"],
    includes: ["Camps", "Meals", "Transport", "Guide"],
    bestTime: "Jun–Sep",
    difficulty: "Challenging",
  },
  {
    id: 13,
    title: "Golden Triangle Classic",
    location: "Delhi · Agra · Jaipur",
    state: "North India",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    duration: "6 Days / 5 Nights",
    rating: 4.7,
    reviews: 5621,
    price: 18999,
    originalPrice: 24999,
    badge: null,
    category: ["Heritage"],
    tags: ["Taj Mahal", "Forts", "Culture"],
    includes: ["Hotel", "Transport", "Guide", "Entry Fees"],
    bestTime: "Oct–Mar",
    difficulty: "Easy",
  },
  {
    id: 14,
    title: "Jim Corbett Jungle Safari",
    location: "Jim Corbett · Nainital",
    state: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    reviews: 1432,
    price: 14999,
    originalPrice: 19999,
    badge: null,
    category: ["Wildlife", "Adventure"],
    tags: ["Tiger Safari", "Jeep Safari", "Jungle"],
    includes: ["Resort", "Safari", "Meals", "Guide"],
    bestTime: "Nov–Jun",
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

const BADGE_STYLES: Record<string, { bg: string; color: string; shadow: string }> = {
  "Most Popular":     { bg: "linear-gradient(135deg,#f97316,#ef4444)", color: "#fff", shadow: "rgba(249,115,22,0.5)" },
  "Editor's Pick":    { bg: "linear-gradient(135deg,#06b6d4,#3b82f6)", color: "#fff", shadow: "rgba(6,182,212,0.4)" },
  "Premium":          { bg: "linear-gradient(135deg,#a78bfa,#7c3aed)", color: "#fff", shadow: "rgba(124,58,237,0.45)" },
  "Top Rated":        { bg: "linear-gradient(135deg,#34d399,#059669)", color: "#fff", shadow: "rgba(5,150,105,0.45)" },
  "New":              { bg: "linear-gradient(135deg,#fbbf24,#f59e0b)", color: "#000", shadow: "rgba(251,191,36,0.45)" },
  "Adventure Special":{ bg: "linear-gradient(135deg,#fb7185,#e11d48)", color: "#fff", shadow: "rgba(225,29,72,0.4)" },
  "Hidden Gem":       { bg: "linear-gradient(135deg,#818cf8,#4f46e5)", color: "#fff", shadow: "rgba(79,70,229,0.4)" },
};

const DIFFICULTY_STYLE: Record<string, string> = {
  Easy:        "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Moderate:    "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Challenging: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const INCLUDE_EMOJI: Record<string, string> = {
  Hotel: "🏨", Flights: "✈️", Meals: "🍽️", Guide: "👤", Transport: "🚌",
  Houseboat: "🚢", Resort: "🏖️", "Water Sports": "🤿", Ferry: "⛴️",
  Bike: "🏍️", Permit: "📋", Camps: "⛺", "Boat Ride": "🛶", Safari: "🦁",
  Camel: "🐪", Rafting: "🛶", Yoga: "🧘", "Palace Hotel": "🏰",
  "Entry Fees": "🎫", "Camel Safari": "🐪",
};

/* ─────────────────── STARS ─────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.236 2.506L10 3.94l-2 1.948.472 2.746L6 7.27 3.528 8.634 4 5.888 2 3.94l2.764-.434L6 1z"
            fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
            stroke={s <= Math.round(rating) ? "#f59e0b" : "#4b5563"}
            strokeWidth="0.8"
          />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────── CARD ─────────────────── */
function PackageCard({ pkg }: { pkg: Package }) {
  const [booked, setBooked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
  const badge = pkg.badge ? BADGE_STYLES[pkg.badge] : null;

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(155deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.018) 100%)",
        border: `1px solid ${hovered ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered
          ? "0 28px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(251,191,36,0.18)"
          : "0 4px 24px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-7px)" : "translateY(0)",
        transition: "all 0.42s cubic-bezier(0.34,1.56,0.64,1)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* ── Image ── */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="h-full w-full object-cover"
          style={{
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.62) 100%)" }}
        />

        {/* Badge */}
        {badge && pkg.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold tracking-wide"
              style={{
                background: badge.bg,
                color: badge.color,
                boxShadow: `0 4px 14px ${badge.shadow}`,
              }}
            >
              {pkg.badge}
            </span>
          </div>
        )}

        {/* Discount */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-bold text-white"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            {discount}% OFF
          </span>
        </div>

        {/* Duration + Difficulty bottom row */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ background: "rgba(0,0,0,0.58)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            🕐 {pkg.duration}
          </span>
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${DIFFICULTY_STYLE[pkg.difficulty]}`}
            style={{ backdropFilter: "blur(6px)" }}
          >
            {pkg.difficulty}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5">

        {/* Location */}
        <div className="mb-1 flex items-center gap-1.5">
          <svg width="11" height="13" viewBox="0 0 11 13" fill="none" className="flex-shrink-0">
            <path d="M5.5 0C3.015 0 1 2.015 1 4.5c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5C10 2.015 7.985 0 5.5 0zm0 6.125a1.625 1.625 0 110-3.25 1.625 1.625 0 010 3.25z" fill="#f59e0b"/>
          </svg>
          <p className="text-xs font-medium text-amber-400/90 truncate">{pkg.location}</p>
        </div>

        {/* State pill */}
        <p className="mb-2 text-xs text-white/30">{pkg.state}</p>

        {/* Title */}
        <h3
          className="mb-2.5 text-base font-bold leading-snug text-white line-clamp-2"
          style={{ fontFamily: "Georgia,serif" }}
        >
          {pkg.title}
        </h3>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-2">
          <Stars rating={pkg.rating} />
          <span className="text-xs font-bold text-amber-400">{pkg.rating}</span>
          <span className="text-xs text-white/28">({pkg.reviews.toLocaleString("en-IN")} reviews)</span>
        </div>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {pkg.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-0.5 text-xs text-white/55"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Includes */}
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          {pkg.includes.slice(0, 4).map(inc => (
            <span key={inc} className="flex items-center gap-1 text-xs text-white/45">
              <span>{INCLUDE_EMOJI[inc] ?? "✅"}</span>
              <span>{inc}</span>
            </span>
          ))}
        </div>

        {/* Best time */}
        <p className="mb-4 text-xs text-white/28">
          📅 Best time: <span className="text-white/50 font-medium">{pkg.bestTime}</span>
        </p>

        {/* Divider */}
        <div
          className="mb-4 h-px w-full"
          style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }}
        />

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-white/28 line-through">₹{pkg.originalPrice.toLocaleString("en-IN")}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-white" style={{ fontFamily: "Georgia,serif" }}>
                ₹{pkg.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-white/35">/person</span>
            </div>
          </div>

          <button
            onClick={() => setBooked(b => !b)}
            className="flex-shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300"
            style={{
              background: booked
                ? "linear-gradient(135deg,#34d399,#059669)"
                : "linear-gradient(135deg,#fbbf24,#f97316)",
              color: booked ? "#fff" : "#000",
              boxShadow: hovered
                ? booked ? "0 8px 24px rgba(5,150,105,0.4)" : "0 8px 24px rgba(251,191,36,0.45)"
                : "0 4px 12px rgba(251,191,36,0.2)",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            {booked ? "✓ Booked!" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── PAGE ─────────────────── */
export default function PricePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "rating">("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...packages];

    if (activeCategory !== "All") {
      list = list.filter(p => p.category.includes(activeCategory));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === "price-low")  list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating")     list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCategory, sortBy, searchQuery]);

  const CATEGORY_ICONS: Record<Category, string> = {
    All: "🌏", Beach: "🏖️", Mountains: "🏔️", Heritage: "🏰",
    Wildlife: "🦁", Spiritual: "🕉️", Adventure: "🧗", Honeymoon: "💑",
  };

  return (
    <main
      className="min-h-screen w-full"
      style={{ background: "linear-gradient(160deg,#060612 0%,#0d0d20 45%,#080814 100%)" }}
    >
      {/* ── Background ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(245,158,11,0.09) 0%,transparent 65%)", filter: "blur(70px)" }} />
        <div className="absolute bottom-0 right-0 h-[500px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(124,58,237,0.08) 0%,transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(6,182,212,0.06) 0%,transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24">

        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 px-5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Tourmitra — India's Best Tour Packages
            </span>
          </div>

          <h1
            className="mb-4 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.03em", fontFamily: "Georgia,serif" }}
          >
            Discover{" "}
            <span style={{ background: "linear-gradient(120deg,#fbbf24 20%,#f97316 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Incredible India
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base text-white/40 md:text-lg" style={{ fontFamily: "Georgia,serif" }}>
            From the snow peaks of Kashmir to the beaches of Andaman — handpicked by experts, loved by 3L+ travelers
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {[
              { val: "15+", label: "Destinations" },
              { val: "3L+", label: "Happy Travelers" },
              { val: "4.8★", label: "Avg Rating" },
              { val: "₹9,999", label: "Starting From" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-black text-amber-400 md:text-2xl">{s.val}</p>
                <p className="text-xs uppercase tracking-wide text-white/35">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Search ── */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-lg">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search destination, state, or activity..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(16px)",
              }}
            />
          </div>
        </div>

        {/* ── Category Filter ── */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300"
              style={
                activeCategory === cat
                  ? { background: "linear-gradient(135deg,#fbbf24,#f97316)", color: "#000", boxShadow: "0 4px 16px rgba(251,191,36,0.35)" }
                  : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              <span>{CATEGORY_ICONS[cat]}</span>
              {cat}
            </button>
          ))}
        </div>

        {/* ── Sort + Count ── */}
        <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">
            Showing <span className="font-semibold text-white">{filtered.length}</span> packages
            {activeCategory !== "All" && (
              <span className="ml-1 text-amber-400">in {activeCategory}</span>
            )}
          </p>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-xl px-4 py-2 text-sm text-white outline-none"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <option value="popular">Sort: Most Popular</option>
            <option value="price-low">Sort: Price Low → High</option>
            <option value="price-high">Sort: Price High → Low</option>
            <option value="rating">Sort: Top Rated</option>
          </select>
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-white/40 text-lg">No packages found for "{searchQuery}"</p>
            <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-4 text-amber-400 text-sm underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
          </div>
        )}

        {/* ── Custom Trip CTA ── */}
        <div
          className="mt-16 rounded-2xl p-8 text-center md:p-12"
          style={{
            background: "linear-gradient(135deg,rgba(251,191,36,0.07) 0%,rgba(249,115,22,0.05) 100%)",
            border: "1px solid rgba(251,191,36,0.12)",
            backdropFilter: "blur(20px)",
          }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            Didn't find your dream destination?
          </p>
          <h3 className="mb-3 text-2xl font-black text-white md:text-3xl" style={{ fontFamily: "Georgia,serif" }}>
            Build a Custom Trip
          </h3>
          <p className="mb-6 text-sm text-white/38 max-w-md mx-auto">
            Tell us your dream destination, budget, and dates — our experts craft a package just for you in 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="rounded-xl px-8 py-3 text-sm font-bold text-black transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg,#fbbf24,#f97316)", boxShadow: "0 6px 20px rgba(251,191,36,0.35)" }}
            >
              Talk to an Expert →
            </button>
            <button
              className="rounded-xl px-8 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
            >
              View All Packages
            </button>
          </div>
        </div>

        {/* ── Trust Bar ── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {[
            { icon: "🛡️", label: "100% Safe Booking" },
            { icon: "💳", label: "No-Cost EMI" },
            { icon: "🔄", label: "Free Cancellation" },
            { icon: "📞", label: "24/7 Support" },
            { icon: "🏆", label: "Award Winning" },
          ].map(b => (
            <div
              key={b.label}
              className="flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span>{b.icon}</span>
              <span className="text-xs font-medium text-white/40">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}