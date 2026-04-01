"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const types = [
  { emoji: "🏨", tag: "Most Popular", title: "Hotels & Stays", description: "List your property on TourMitra and reach millions of travellers searching for the perfect stay.", perks: ["Direct Bookings", "Smart Pricing", "Guest Reviews"], cta: "List Your Property" },
  { emoji: "✈️", tag: "High Growth", title: "Travel Agencies", description: "Expand your customer base by listing curated tour packages and holiday bundles.", perks: ["Package Listings", "Itinerary Builder", "Group Bookings"], cta: "Register Agency" },
  { emoji: "🔗", tag: "Earn Passive", title: "Affiliates", description: "Monetise your audience by promoting TourMitra. Earn commission on every booking.", perks: ["Unlimited Earnings", "Real-time Tracking", "Exclusive Codes"], cta: "Start Earning" },
];

export default function PartnerTypesSection() {
  return (
    // BG-[#050505] Marquee jaisa ekdum dark base
    <section id="partner-types" className="relative py-24 px-6 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* ── BACKGROUND LAYER (JoinForm Jaisa Subtle Image) ── */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074" 
          alt="Background" 
          className="w-full h-full object-cover opacity-5 grayscale"
        />
        {/* Deep Glow (Login Style) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#e7d393]/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block text-[10px] font-black tracking-[0.4em] uppercase text-[#e7d393] mb-4"
          >
            Partnership Types
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-light text-white tracking-tighter mb-6">
            Choose your <span className="text-[#e7d393] font-bold italic">path.</span>
          </h2>
          <p className="text-white/30 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Tailored collaboration models designed for your business growth.
          </p>
        </div>

        {/* Cards - Marquee Section Wale Glassy Style Se Matched */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {types.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              // bg-white/[0.02] aur border-white/5 bilkul Marquee cards jaisa
              className="group relative flex flex-col rounded-[3rem] bg-white/[0.02] border border-white/5 p-10 hover:border-[#e7d393]/30 hover:bg-white/[0.05] transition-all duration-700 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-10">
                <span className="text-4xl">{t.emoji}</span>
                <span className="text-[9px] font-black px-4 py-1.5 rounded-full bg-[#e7d393]/10 text-[#e7d393] uppercase tracking-widest border border-[#e7d393]/20">
                  {t.tag}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                {t.title}
              </h3>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-8 flex-1">
                {t.description}
              </p>

              {/* Perks List */}
              <ul className="flex flex-col gap-4 mb-10">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-[13px] text-white/50 font-light">
                    <div className="w-5 h-5 rounded-full bg-[#e7d393]/10 flex items-center justify-center border border-[#e7d393]/20">
                      <Check className="text-[#e7d393]" size={10} />
                    </div>
                    {perk}
                  </li>
                ))}
              </ul>

              {/* Button matching Marquee + JoinForm CTA style */}
              <button className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.2em] group-hover:bg-[#e7d393] group-hover:text-black group-hover:border-transparent transition-all duration-500 flex items-center justify-center gap-2">
                {t.cta} <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}