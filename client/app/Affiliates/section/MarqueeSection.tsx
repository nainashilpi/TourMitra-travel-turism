"use client";

import { useRef } from "react";

const platforms = [
  {
    name: "Booking.com",
    color: "#003580",
    bg: "#e8f0fe",
    svg: (
      <svg viewBox="0 0 60 24" width="60" height="24" fill="#003580">
        <text x="0" y="18" fontSize="14" fontWeight="800" fontFamily="'Georgia',serif">booking</text>
      </svg>
    ),
  },
  {
    name: "Airbnb",
    color: "#FF5A5F",
    bg: "#fff0f0",
    svg: (
      <svg viewBox="0 0 48 48" width="32" height="32" fill="#FF5A5F">
        <path d="M24 2C15.16 2 8 9.16 8 18c0 5.5 2.6 10.38 6.64 13.5L24 46l9.36-14.5C37.4 28.38 40 23.5 40 18c0-8.84-7.16-16-16-16zm0 22c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
      </svg>
    ),
  },
  {
    name: "Expedia",
    color: "#1B0088",
    bg: "#f0eeff",
    svg: (
      <svg viewBox="0 0 48 48" width="32" height="32">
        <circle cx="24" cy="24" r="22" fill="#1B0088"/>
        <circle cx="24" cy="24" r="14" fill="#FEC700"/>
        <circle cx="24" cy="24" r="8" fill="#1B0088"/>
      </svg>
    ),
  },
  {
    name: "Tripadvisor",
    color: "#00AA6C",
    bg: "#e6faf4",
    svg: (
      <svg viewBox="0 0 48 48" width="36" height="36">
        <circle cx="14" cy="28" r="10" fill="#00AA6C"/>
        <circle cx="34" cy="28" r="10" fill="#CC0000"/>
        <circle cx="24" cy="20" r="12" fill="#00AA6C"/>
        <circle cx="24" cy="20" r="5" fill="white"/>
        <circle cx="24" cy="20" r="2.5" fill="black"/>
      </svg>
    ),
  },
  {
    name: "Agoda",
    color: "#5C2D91",
    bg: "#f3eeff",
    svg: (
      <svg viewBox="0 0 48 48" width="32" height="32" fill="none">
        <rect width="48" height="48" rx="10" fill="#5C2D91"/>
        <text x="7" y="32" fontSize="20" fontWeight="900" fontFamily="Arial,sans-serif" fill="white">a</text>
      </svg>
    ),
  },
  {
    name: "OYO",
    color: "#E0182D",
    bg: "#fff0f1",
    svg: (
      <svg viewBox="0 0 60 30" width="52" height="26">
        <rect width="60" height="30" rx="6" fill="#E0182D"/>
        <text x="5" y="22" fontSize="18" fontWeight="900" fontFamily="Arial,sans-serif" fill="white">OYO</text>
      </svg>
    ),
  },
  {
    name: "MakeMyTrip",
    color: "#E31937",
    bg: "#fff0f2",
    svg: (
      <svg viewBox="0 0 56 30" width="52" height="26">
        <rect width="56" height="30" rx="6" fill="#E31937"/>
        <text x="5" y="21" fontSize="11" fontWeight="800" fontFamily="Arial,sans-serif" fill="white">MakeMyTrip</text>
      </svg>
    ),
  },
];

// Duplicate for seamless infinite loop
const doubled = [...platforms, ...platforms];

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-[#0f1629] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-amber-400/70 mb-4">
          Trusted Partners
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Trending Travel Platforms
        </h2>
        <p className="text-white/40 mt-3 text-base max-w-md mx-auto">
          We integrate with the world's leading travel platforms so you grow everywhere.
        </p>
      </div>

      {/* Marquee wrapper */}
      <div className="relative">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0f1629] to-transparent pointer-events-none" />
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0f1629] to-transparent pointer-events-none" />

        {/* Marquee track */}
        <div
          className="flex gap-5 marquee-track"
          ref={trackRef}
          style={{ width: "max-content" }}
        >
          {doubled.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center gap-3 px-7 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all duration-300 cursor-pointer group min-w-[150px]"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ background: p.bg }}
              >
                {p.svg}
              </div>
              <span className="text-white/70 text-sm font-semibold group-hover:text-white transition-colors">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframe style */}
      <style jsx>{`
        .marquee-track {
          animation: scroll-marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}