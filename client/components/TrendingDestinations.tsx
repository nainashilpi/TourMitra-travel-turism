"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Destination {
  id: string;
  city: string;
  country: string;
  flag: string;
  image: string;
  span?: "wide" | "tall" | "normal";
}

const destinations: Destination[] = [
  { id: "delhi", city: "New Delhi", country: "India", flag: "🇮🇳", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=80", span: "wide" },
  { id: "bengaluru", city: "Bengaluru", country: "India", flag: "🇮🇳", image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&q=80", span: "wide" },
  { id: "mumbai", city: "Mumbai", country: "India", flag: "🇮🇳", image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=700&q=80", span: "normal" },
  { id: "chennai", city: "Chennai", country: "India", flag: "🇮🇳", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&q=80", span: "tall" }, // Tall span for variety
  { id: "hyderabad", city: "Hyderabad", country: "India", flag: "🇮🇳", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&q=80", span: "normal" },
  { id: "jaipur", city: "Jaipur", country: "India", flag: "🇮🇳", image: "https://images.unsplash.com/photo-1477584264176-51fa4e89946a?w=700&q=80", span: "normal" },
  { id: "goa", city: "Goa", country: "India", flag: "🇮🇳", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700&q=80", span: "normal" },
  { id: "dubai", city: "Dubai", country: "UAE", flag: "🇦🇪", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80", span: "wide" },
  { id: "bali", city: "Bali", country: "Indonesia", flag: "🇮🇩", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80", span: "normal" },
  { id: "singapore", city: "Singapore", country: "Singapore", flag: "🇸🇬", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=700&q=80", span: "normal" },
];

function DestCard({ dest, index }: { dest: Destination; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      className={`relative group rounded-[32px] overflow-hidden cursor-none
        ${dest.span === "wide" ? "md:col-span-2 md:row-span-1" : "col-span-1"}
        ${dest.span === "tall" ? "md:row-span-2" : "row-span-1"}
      `}
    >
      {/* Parallax Image Container */}
      <div className="relative w-full h-full min-h-[300px] overflow-hidden">
        <motion.img
          src={dest.image}
          alt={dest.city}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        />
        
        {/* Dynamic Multi-layered Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
        
        {/* Glassmorphism Badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
          <span className="text-[10px] font-bold text-[#e7d393] uppercase tracking-widest">{dest.country}</span>
        </div>
      </div>

      {/* Content Info */}
      <div className="absolute bottom-0 left-0 w-full p-8">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <motion.p 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[#e7d393] text-[10px] font-bold uppercase tracking-[0.3em]"
            >
              Collection 2026
            </motion.p>
            <h3 className="text-white text-3xl md:text-4xl font-semibold tracking-tighter leading-none group-hover:text-[#e7d393] transition-colors">
              {dest.city}
            </h3>
          </div>
          <span className="text-3xl group-hover:scale-125 transition-transform duration-500">{dest.flag}</span>
        </div>
        
        {/* Animated Line */}
        <motion.div 
            className="h-[1px] bg-[#e7d393] mt-4 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
        />
      </div>

      {/* Luxury "Magnetic" Reveal (Circle on hover) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-0 h-0 group-hover:w-24 group-hover:h-24 bg-[#e7d393]/90 rounded-full flex items-center justify-center transition-all duration-500 ease-out overflow-hidden shadow-[0_0_50px_rgba(231,211,147,0.4)]">
          <span className="text-black font-black text-[10px] uppercase tracking-tighter">View</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrendingDestinations() {
  return (
    <section className="relative z-10 w-full py-32 px-6 md:px-12 bg-[#0a0a0a] overflow-hidden">
      
      {/* Background Decorative Text (Very Subtle) */}
      <div className="absolute top-20 -right-20 text-[20vw] font-bold text-white/[0.02] select-none pointer-events-none uppercase">
        Explore
      </div>

      <div className="max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#e7d393] font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">
              Popular Choice
            </h2>
            <h2 className="text-6xl md:text-8xl font-semibold text-white tracking-tighter leading-[0.85]">
              Trending <br /> <span className="italic font-light text-[#e7d393]">World.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-[280px] text-gray-500 font-light text-sm leading-relaxed border-r border-[#e7d393]/20 pr-6 text-right"
          >
            A curated list of global destinations currently captivating the Indian traveller's heart.
          </motion.p>
        </header>

        {/* MASONRY BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[350px] gap-6">
          {destinations.map((d, i) => (
            <DestCard key={d.id} dest={d} index={i} />
          ))}
        </div>
      </div>

      {/* Luxury Bottom Accent */}
      <div className="mt-24 flex justify-center">
        <motion.div 
            whileHover={{ width: 300 }}
            className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#e7d393] to-transparent transition-all duration-700"
        />
      </div>
    </section>
  );
}