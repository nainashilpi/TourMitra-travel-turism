"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, ShieldCheck, ExternalLink } from "lucide-react";

// ── Partner Data (Static for now) ──────────────────────────────────────────

const partners = [
  {
    id: 1,
    name: "Airbnb",
    category: "Bespoke Stays",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop", // Luxury villa style
    link: "https://www.airbnb.com",
    tag: "Official Partner"
  },
  {
    id: 2,
    name: "TripAdvisor",
    category: "Expedition Reviews",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop", // Travel map style
    link: "https://www.tripadvisor.com",
    tag: "Strategic Ally"
  },
  {
    id: 3,
    name: "MakeMyTrip",
    category: "Flight Logistics",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=2070&auto=format&fit=crop", // Aircraft style
    link: "https://www.makemytrip.com",
    tag: "Corporate Partner"
  },
  {
    id: 4,
    name: "Booking.com",
    category: "Resort Network",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop", // Luxury resort
    link: "https://www.booking.com",
    tag: "Verified Channel"
  },
  {
    id: 5,
    name: "Expedia",
    category: "Global Itineraries",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop", // Adventure jeep style
    link: "https://www.expedia.com",
    tag: "Alliance Network"
  }
];

// ── Partner Card Component ──────────────────────────────────────────────────

function PartnerCard({ partner, index }: { partner: typeof partners[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      className="flex flex-col gap-5 cursor-pointer group"
      onClick={() => window.open(partner.link, "_blank")}
    >
      <div className="overflow-hidden rounded-[2.5rem] aspect-[4/5] w-full relative border border-white/5 bg-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-700 group-hover:border-[#e7d393]/30">
        
        {/* Status Tag */}
        <div className="absolute top-5 left-5 z-20">
          <span className="bg-[#e7d393] text-black text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-2xl">
            {partner.tag}
          </span>
        </div>

        <motion.img
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          src={partner.image}
          alt={partner.name}
          className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
        />

        {/* ── HOVER OVERLAY ── */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-[6px] transition-all duration-500 flex flex-col items-center justify-center z-10 gap-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-full bg-[#e7d393] flex items-center justify-center text-black shadow-2xl"
            >
              <ExternalLink size={24} strokeWidth={2.5} />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e7d393]">Access Portal</span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90 group-hover:opacity-30 transition-all duration-700" />
      </div>

      <div className="px-3">
        <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-4 bg-[#e7d393]/50" />
            <span className="text-[9px] text-[#e7d393] font-black uppercase tracking-[0.4em]">{partner.category}</span>
        </div>
        <h3 className="font-bold text-white text-2xl group-hover:text-[#e7d393] transition-colors tracking-tighter">
          {partner.name}
        </h3>
      </div>
    </motion.div>
  );
}

// ── Main Affiliate Section ──────────────────────────────────────────────────

export default function AllianceSection() {
  return (
    <section className="relative z-10 w-full py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
      
      {/* Background Institutional Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-white/[0.01] select-none pointer-events-none tracking-tighter">
        ALLIANCE
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6">
              <ShieldCheck size={14} className="text-[#e7d393]" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60">Strategic Global Alliances</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-[0.85] mb-6">
              Elite <span className="italic font-bold text-[#e7d393]">Network.</span>
            </h2>
            <p className="text-white/40 text-lg font-light max-w-md leading-relaxed border-l border-[#e7d393]/30 pl-6">
              Collaborating with industry leaders to provide an unparalleled travel ecosystem for the modern explorer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <div className="text-right">
              <p className="text-[10px] font-black text-[#e7d393] uppercase tracking-[0.5em] mb-2">Network Reach</p>
              <p className="text-4xl font-bold text-white tracking-tighter">190+ Countries</p>
            </div>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {partners.map((partner, idx) => (
            <PartnerCard key={partner.id} partner={partner} index={idx} />
          ))}
        </div>

        {/* Institutional Footer for Section */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30">
          <span className="text-[8px] font-black tracking-[0.4em] uppercase text-white italic text-center">
            TourMitra Infrastructure // Global Partner Verification System v2.0
          </span>
          <div className="flex gap-8">
            <Globe size={16} />
            <span className="text-[8px] font-black tracking-[0.4em] uppercase text-white">Cross-Border Integration</span>
          </div>
        </div>

      </div>
    </section>
  );
}