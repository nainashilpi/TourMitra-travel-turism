"use client";

import { useRef, useState } from "react";

interface Destination {
  id: string;
  city: string;
  country: string;
  flag: string;
  image: string;
  span?: "wide" | "tall" | "normal";
}

const destinations: Destination[] = [
  {
    id: "delhi",
    city: "New Delhi",
    country: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=80",
    span: "wide",
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    country: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&q=80",
    span: "wide",
  },
  {
    id: "mumbai",
    city: "Mumbai",
    country: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=700&q=80",
    span: "normal",
  },
  {
    id: "chennai",
    city: "Chennai",
    country: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&q=80",
    span: "normal",
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    country: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&q=80",
    span: "normal",
  },
  {
    id: "jaipur",
    city: "Jaipur",
    country: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed68e5f?w=700&q=80",
    span: "normal",
  },
  {
    id: "goa",
    city: "Goa",
    country: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700&q=80",
    span: "normal",
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
    span: "wide",
  },
  {
    id: "bali",
    city: "Bali",
    country: "Indonesia",
    flag: "🇮🇩",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80",
    span: "normal",
  },
  {
    id: "singapore",
    city: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=700&q=80",
    span: "normal",
  },
];

function DestCard({ dest }: { dest: Destination }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group
        ${dest.span === "wide" ? "md:col-span-2" : "col-span-1"}
        ${dest.span === "tall" ? "md:row-span-2" : ""}
      `}
      style={{ aspectRatio: dest.span === "wide" ? "16/7" : "4/3" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with zoom */}
      <img
        src={dest.image}
        alt={dest.city}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.12)" : "scale(1)" }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
          opacity: hovered ? 1 : 0.7,
        }}
      />

      {/* Shimmer on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Text */}
      <div className="absolute bottom-0 left-0 p-4 md:p-5">
        <div className="flex items-center gap-2">
          <span
            className="font-extrabold text-white drop-shadow-lg transition-all duration-300"
            style={{
              fontSize: dest.span === "wide" ? "clamp(1.3rem, 3vw, 2rem)" : "clamp(1rem, 2.5vw, 1.4rem)",
              transform: hovered ? "translateY(-3px)" : "translateY(0)",
            }}
          >
            {dest.city}
          </span>
          <span className="text-xl">{dest.flag}</span>
        </div>
        <p
          className="text-white/70 text-sm font-medium transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
          }}
        >
          {dest.country}
        </p>
      </div>

      {/* Explore pill on hover */}
      <div
        className="absolute top-4 right-4 bg-white/90 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1) translateY(0)" : "scale(0.8) translateY(-4px)",
        }}
      >
        Explore →
      </div>
    </div>
  );
}

export default function TrendingDestinations() {
  return (
    <section className="w-full py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
          Trending destinations
        </h2>
        <p className="text-gray-500 text-sm mb-8">Most popular choices for travellers from India</p>

        {/* Row 1: 2 wide cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          {destinations.slice(0, 2).map((d) => (
            <DestCard key={d.id} dest={d} />
          ))}
        </div>

        {/* Row 2: 5 normal cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
          {destinations.slice(2, 7).map((d) => (
            <DestCard key={d.id} dest={d} />
          ))}
        </div>

        {/* Row 3: 1 wide + 2 normal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <DestCard dest={destinations[7]} />
          <DestCard dest={destinations[8]} />
          <DestCard dest={destinations[9]} />
        </div>
      </div>
    </section>
  );
}