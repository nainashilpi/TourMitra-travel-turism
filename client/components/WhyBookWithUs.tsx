"use client";

import { useEffect, useRef, useState } from "react";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  accent: string;
}

const features: Feature[] = [
  {
    id: "pay-later",
    icon: "📅",
    title: "Book now, pay at the property",
    description: "FREE cancellation on most bookings",
    accent: "#3B82F6",
  },
  {
    id: "reviews",
    icon: "👍",
    title: "300M+ reviews from fellow travellers",
    description: "Get trusted information from guests like you",
    accent: "#F59E0B",
  },
  {
    id: "properties",
    icon: "🌍",
    title: "2+ million properties worldwide",
    description: "Hotels, guest houses, apartments, and more...",
    accent: "#10B981",
  },
  {
    id: "support",
    icon: "🎧",
    title: "Trusted customer service you can rely on, 24/7",
    description: "We're always here to help",
    accent: "#8B5CF6",
  },
];

interface Offer {
  id: string;
  tag: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  bg: string;
}

const offers: Offer[] = [
  {
    id: "early-deals",
    tag: "Early 2026 Deals",
    title: "At least 15% off",
    description: "Save on your next stay with Early 2026 Deals. Book now, stay until 1 April 2026.",
    cta: "Explore deals",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    bg: "#F8FAFC",
  },
  {
    id: "getaway",
    tag: "Escape for less with our Getaway Deals",
    title: "No catch. Just getaways.",
    description: "At least 15% off select stays worldwide – just book and go.",
    cta: "Save with a Getaway Deal",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    bg: "#F8FAFC",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-500 bg-gradient-to-r from-slate-900 via-blue-950 to-black"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${index * 100}ms`,
        boxShadow: hovered ? `0 12px 40px -8px ${feature.accent}40` : "0 1px 4px rgba(0,0,0,0.06)",
        border: hovered ? `1.5px solid ${feature.accent}30` : "1.5px solid transparent",
      }}
    >
      {/* Animated BG blob on hover */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full  blur-2xl transition-opacity duration-500 pointer-events-none "
        style={{ background: feature.accent, opacity: hovered ? 0.12 : 0 }}
      />

      <div
        className="text-4xl mb-4 transition-transform duration-300"
        style={{ transform: hovered ? "scale(1.2) rotate(-5deg)" : "scale(1) rotate(0deg)" }}
      >
        {feature.icon}
      </div>
      <h3 className="font-bold text-white text-base leading-snug mb-2">{feature.title}</h3>
      <p className="text-gray-300 text-sm">{feature.description}</p>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 rounded-full"
        style={{
          background: feature.accent,
          width: hovered ? "100%" : "0%",
        }}
      />
    </div>
  );
}

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border bg-gradient-to-r from-slate-900 via-blue-950 to-black  border-gray-200 p-6  overflow-hidden flex items-center justify-between gap-4 cursor-pointer transition-all duration-500 "
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 150}ms`,
        boxShadow: hovered ? "0 16px 48px -12px rgba(59,130,246,0.2)" : "none",
      
      }}
    >
      <div className="flex-1 min-w-0 ">
        <p className="text-xs text-gray-400 font-medium mb-1">{offer.tag}</p>
        <h3 className="text-xl font-extrabold text-gray-300 mb-2">{offer.title}</h3>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{offer.description}</p>
        <button className="bg-[#ac9c68] hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-200 active:scale-95">
          {offer.cta}
        </button>
      </div>
      <div className="flex-shrink-0 w-28 h-24 md:w-36 md:h-28 rounded-xl overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
        />
      </div>
    </div>
  );
}

export default function WhyBookWithUs() {
  const { ref: titleRef, inView: titleInView } = useInView(0.1);

  return (
    <section className="w-full py-14 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div
          ref={titleRef}
          className="transition-all duration-700"
          style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? "translateY(0)" : "translateY(20px)" }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">
            Why Book with TripMitra?
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}
        </div>

        {/* Offers */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Offers</h2>
        <p className="text-gray-500 text-sm mb-6">Promotions, deals and special offers for you</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((o, i) => (
            <OfferCard key={o.id} offer={o} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}