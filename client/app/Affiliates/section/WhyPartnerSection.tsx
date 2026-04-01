"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Guaranteed Earnings",
    description: "Predictable payouts with competitive commissions. Get paid on-time, every time — no hidden fees.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Massive Reach",
    description: "Access 10M+ monthly active travellers browsing across web, iOS, and Android platforms.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "24/7 Support",
    description: "Your personal account manager + round-the-clock technical support to resolve any issues fast.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Growth Analytics",
    description: "Real-time dashboards with booking trends, revenue forecasts, and actionable performance insights.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Trust & Verification",
    description: "TourMitra badge boosts your credibility. Verified listings see 3x higher conversion rates.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Secure Transactions",
    description: "PCI-DSS compliant payment infrastructure. Every transaction is encrypted and protected.",
  },
];

export default function WhyPartnerSection() {
  return (
    <section id="why-partner" className="relative py-32 px-6 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* ── BACKGROUND DECOR ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#e7d393]/5 blur-[160px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[10px] font-black tracking-[0.4em] uppercase text-[#e7d393] mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-white tracking-tighter mb-6"
          >
            Everything you need to <span className="text-[#e7d393] font-bold italic">thrive.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/30 text-lg font-light max-w-xl mx-auto leading-relaxed"
          >
            TourMitra gives travel businesses the tools, exposure, and support to grow consistently in the digital age.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-10 hover:border-[#e7d393]/30 hover:bg-white/[0.04] transition-all duration-700"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 text-[#e7d393] group-hover:scale-110 group-hover:border-[#e7d393]/40 transition-all duration-500">
                  {f.icon}
                </div>
                <h3 className="font-bold text-white text-xl mb-4 tracking-tight">{f.title}</h3>
                <p className="text-white/30 text-sm font-light leading-relaxed group-hover:text-white/50 transition-colors">
                  {f.description}
                </p>
              </div>
              
              {/* Subtle Glow on Hover */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-[#e7d393]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}