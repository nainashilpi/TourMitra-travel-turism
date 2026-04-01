"use client";

import { motion } from "framer-motion";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: "pay-later",
    icon: "📅",
    title: "Book now, pay later",
    description: "Experience flexible luxury with FREE cancellation on most elite bookings.",
  },
  {
    id: "reviews",
    icon: "⭐",
    title: "300M+ Global Reviews",
    description: "Trusted insights from a community of world-class fellow travellers.",
  },
  {
    id: "properties",
    icon: "🌍",
    title: "2M+ Managed Properties",
    description: "From private villas to heritage suites, access the world's finest stays.",
  },
  {
    id: "support",
    icon: "🎧",
    title: "24/7 Elite Concierge",
    description: "Human-led intervention for seamless transitions throughout your journey.",
  },
];

const offers = [
  {
    id: "early-deals",
    tag: "Seasonal Privilege",
    title: "The Early 2026 Collection",
    description: "Secure your next legacy stay with at least 15% off. Valid until April 1, 2026.",
    cta: "Explore Collection",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: "getaway",
    tag: "Bespoke Escapes",
    title: "Uncompromising Getaways",
    description: "Hand-picked sanctuaries worldwide with exclusive member-only benefits.",
    cta: "Secure Access",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
];

export default function WhyBookWithUs() {
  return (
    /* Background opacity ko /90 se /60 kar diya hai taaki piche ka background halka dikhe */
    <section className="relative z-10 py-28 bg-[#0a0a0a]/60 backdrop-blur-xl border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* ── HEADING SECTION ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-[#e7d393] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">
            The TourMitra Advantage
          </h2>
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6 text-white leading-none">
            Why Journey <br /> With <span className="text-[#e7d393] italic">Us?</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-[1px] bg-[#e7d393]" 
          />
        </motion.div>

        {/* ── FEATURE CARDS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: "circOut" }}
              whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              className="p-8 bg-white/5 border border-white/5 rounded-2xl transition-all duration-300 group cursor-default relative overflow-hidden"
            >
              {/* Subtle Inner Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#e7d393]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-3xl mb-8 block origin-left transition-transform duration-300"
              >
                {f.icon}
              </motion.div>
              <h3 className="text-[#e7d393] font-bold text-lg mb-3 tracking-tight">{f.title}</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── OFFERS HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#e7d393] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">
              Privileges
            </h2>
            <h2 className="text-5xl font-semibold tracking-tighter text-white">
              Curated Offers
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 font-light italic max-w-xs text-right hidden md:block text-sm"
          >
            Promotions and bespoke deals designed for your next discovery.
          </motion.p>
        </div>

        {/* ── OFFERS CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((o, i) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden group flex flex-col sm:flex-row items-stretch shadow-2xl"
            >
              <div className="flex-1 p-10 z-10 flex flex-col justify-center">
                <p className="text-[9px] text-[#e7d393] font-bold uppercase tracking-[0.3em] mb-4">
                  {o.tag}
                </p>
                <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight group-hover:text-[#e7d393] transition-colors duration-300">
                  {o.title}
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                  {o.description}
                </p>
                <div>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "#fff" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#e7d393] text-black text-[10px] font-black px-8 py-4 rounded-xl transition-all uppercase tracking-[0.2em] shadow-xl shadow-[#e7d393]/10"
                  >
                    {o.cta}
                  </motion.button>
                </div>
              </div>
              
              <div className="w-full sm:w-56 h-64 sm:h-auto overflow-hidden relative">
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 1.5 }}
                  src={o.image}
                  alt={o.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-80 sm:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e7d393]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
    </section>
  );
}