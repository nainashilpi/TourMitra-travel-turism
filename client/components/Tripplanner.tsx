"use client";

import { useState, useRef, useEffect } from "react";
import { tripCategories, Destination } from "@/constants/Tripplannerdata";

// ── Destination Card ──────────────────────────────────────────────────────

function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer group min-w-0">
      <div className="overflow-hidden rounded-2xl aspect-[4/3] w-full">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div>
        <p className="font-bold text-gray-900 text-[15px] group-hover:text-blue-600 transition-colors">
          {dest.name}
        </p>
        <p className="text-sm text-gray-500">{dest.distanceKm} km away</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function TripPlanner() {
  const [activeId, setActiveId] = useState(tripCategories[0].id);
  const [displayedId, setDisplayedId] = useState(tripCategories[0].id);
  const [animating, setAnimating] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const tabsRef = useRef<HTMLDivElement>(null);

  const activeCategory = tripCategories.find((c) => c.id === activeId)!;
  const displayedCategory = tripCategories.find((c) => c.id === displayedId)!;

  function handleTabClick(id: string) {
    if (id === activeId || animating) return;

    // Fade out → swap data → fade in
    setAnimating(true);
    setFadeIn(false);

    setTimeout(() => {
      setActiveId(id);
      setDisplayedId(id);
      setFadeIn(true);
      setTimeout(() => setAnimating(false), 350);
    }, 280);
  }

  // Scroll active tab into view
  useEffect(() => {
    const el = tabsRef.current?.querySelector(`[data-id="${activeId}"]`) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  return (
    <section className="w-full py-10 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
          Quick and easy trip planner
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Pick a vibe and explore the top destinations in India
        </p>

        {/* Category Tabs */}
        <div
          ref={tabsRef}
          className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-7"
          style={{ scrollbarWidth: "none" }}
        >
          {tripCategories.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                data-id={cat.id}
                onClick={() => handleTabClick(cat.id)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 whitespace-nowrap
                  ${
                    isActive
                      ? "border-blue-500 text-blue-600 bg-blue-50 shadow-sm"
                      : "border-gray-200 text-gray-600 bg-white hover:border-blue-300 hover:text-blue-500"
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Cards Grid — animated */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4 transition-all duration-300"
          style={{
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {displayedCategory.destinations.map((dest) => (
            <DestinationCard key={dest.id} dest={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
