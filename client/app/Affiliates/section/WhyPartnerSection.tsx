"use client";

const features = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Guaranteed Earnings",
    description: "Predictable payouts with competitive commissions. Get paid on-time, every time — no hidden fees.",
    color: "from-emerald-400/20 to-emerald-600/5",
    accent: "text-emerald-500",
    border: "hover:border-emerald-300/40",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Massive Reach",
    description: "Access 10M+ monthly active travellers browsing across web, iOS, and Android platforms.",
    color: "from-blue-400/20 to-blue-600/5",
    accent: "text-blue-500",
    border: "hover:border-blue-300/40",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "24/7 Dedicated Support",
    description: "Your personal account manager + round-the-clock technical support to resolve any issues fast.",
    color: "from-violet-400/20 to-violet-600/5",
    accent: "text-violet-500",
    border: "hover:border-violet-300/40",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Growth Analytics",
    description: "Real-time dashboards with booking trends, revenue forecasts, and actionable performance insights.",
    color: "from-amber-400/20 to-amber-600/5",
    accent: "text-amber-500",
    border: "hover:border-amber-300/40",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Trust & Verification",
    description: "TripMitra badge boosts your credibility. Verified listings see 3x higher conversion rates.",
    color: "from-rose-400/20 to-rose-600/5",
    accent: "text-rose-500",
    border: "hover:border-rose-300/40",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Secure Transactions",
    description: "PCI-DSS compliant payment infrastructure. Every transaction is encrypted and protected.",
    color: "from-teal-400/20 to-teal-600/5",
    accent: "text-teal-500",
    border: "hover:border-teal-300/40",
  },
];

export default function WhyPartnerSection() {
  return (
    <section id="why-partner" className="py-28 px-6 bg-gradient-to-r from-slate-900 via-blue-950 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-4">
            Why Choose Us
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#c9cacd] mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything you need to{" "}
            <span className="text-amber-500">thrive</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            TripMitra gives travel businesses the tools, exposure, and support to grow consistently.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative  rounded-3xl p-7 border border-black ${f.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default`}
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center mb-5 ${f.accent} group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-[#8c919f] text-lg mb-2">{f.title}</h3>
                <p className="text-[#ccced1] text-sm leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}