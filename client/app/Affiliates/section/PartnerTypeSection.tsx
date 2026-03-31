"use client";

const types = [
  {
    emoji: "🏨",
    tag: "Most Popular",
    title: "Hotels & Stays",
    description:
      "List your property on TripMitra and reach millions of travellers searching for the perfect stay. From boutique guesthouses to luxury resorts — we welcome all.",
    perks: ["Direct Bookings", "Smart Pricing Tools", "Guest Reviews"],
    cta: "List Your Property",
    accent: "from-amber-500 to-orange-500",
    tagColor: "bg-amber-500 text-amber-700",
  },
  {
    emoji: "✈️",
    tag: "High Growth",
    title: "Travel Agencies",
    description:
      "Expand your customer base by listing curated tour packages, adventure trips, and holiday bundles. Our platform drives qualified leads directly to you.",
    perks: ["Package Listings", "Itinerary Builder", "Group Bookings"],
    cta: "Register Agency",
    accent: "from-blue-500 to-indigo-600",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    emoji: "🔗",
    tag: "Earn Passive",
    title: "Affiliates & Influencers",
    description:
      "Monetise your audience by promoting TripMitra. Earn commission on every booking made through your unique link — no cap, no expiry.",
    perks: ["Unlimited Earnings", "Real-time Tracking", "Exclusive Promo Codes"],
    cta: "Start Earning",
    accent: "from-violet-500 to-purple-600",
    tagColor: "bg-violet-100 text-violet-700",
  },
];

export default function PartnerTypesSection() {
  return (
    <section className="py-28 px-6 bg-gradient-to-r from-slate-900 via-blue-950 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-4">
            Partnership Types
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#4c546a] mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Choose your <span className="text-amber-500">path</span>
          </h2>
          <p className="text-white text-lg max-w-xl mx-auto">
            Whether you run a hotel, an agency, or a travel blog — there's a
            perfect partnership waiting for you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {types.map((t, i) => (
            <div
              key={i}
              className="group relative flex flex-col rounded-3xl border border-[#f0ece4] overflow-hidden hover:shadow-2xl transition-all duration-400 hover:-translate-y-2"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${t.accent}`} />

              <div className="flex flex-col flex-1 p-8">
                {/* Tag */}
                <div className="flex items-start justify-between mb-6">
                  <span className="text-4xl">{t.emoji}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${t.tagColor}`}>
                    {t.tag}
                  </span>
                </div>

                <h3
                  className="text-xl font-bold text-[#d9dde8] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t.title}
                </h3>
                <p className="text-[#bcc0c9] text-sm leading-relaxed mb-6 flex-1">
                  {t.description}
                </p>

                {/* Perks */}
                <ul className="flex flex-col gap-2 mb-7">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-sm text-[#a5abb5]">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#join-form"
                  className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${t.accent} text-white font-bold text-sm text-center hover:opacity-90 transition-opacity`}
                >
                  {t.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}