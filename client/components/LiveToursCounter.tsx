"use client";

import { useEffect, useRef, useState } from "react";

const LOCATIONS = [
  "Kenya", "Rajasthan", "Bali", "Switzerland", "Thailand",
  "Japan", "Maldives", "Patagonia", "Iceland", "Morocco",
];

const STATS = [
  { label: "Travellers currently on TripMitra tours", baseValue: 7400, variance: 300, suffix: "" },
  { label: "On-ground right now", baseValue: 72, variance: 15, suffix: "", isLocation: true },
  { label: "Tours operating today", baseValue: 142, variance: 20, suffix: "+" },
  { label: "Countries covered", baseValue: 48, variance: 0, suffix: "" },
];

function useInView(threshold = 0.2) {
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

// Rolling digit for the number animation
function RollingNumber({ value, duration = 1800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = null;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return <>{display.toLocaleString("en-IN")}</>;
}

// Slot-machine location ticker
function LocationTicker({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => {
      setExiting(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % LOCATIONS.length);
        setExiting(false);
      }, 350);
    }, 2200);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <div className="inline-block overflow-hidden" style={{ minWidth: 120 }}>
      <span
        className="inline-block font-extrabold text-amber-500 transition-all duration-350"
        style={{
          transform: exiting ? "translateY(-100%)" : "translateY(0)",
          opacity: exiting ? 0 : 1,
        }}
      >
        {LOCATIONS[idx]}
      </span>
    </div>
  );
}

export default function LiveToursCounter() {
  const { ref, inView } = useInView(0.3);
  const [liveValue, setLiveValue] = useState(7643);

  // Simulate live counter drift
  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => {
      setLiveValue((v) => v + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(iv);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="w-full py-20 px-4 md:px-8 bg-gradient-to-r from-slate-900 via-blue-950 to-black relative overflow-hidden"
      
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
        
      />
      <div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Heading */}
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
            Live Right Now
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
            Tours We Are Operating
            <br />
            <span className=" text-amber-50" style={{ WebkitTextStroke: "2px #1f2937" }}>
              Right Now!
            </span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-14">
            A real-time view of travellers currently touring with us.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200/70">
          {/* Stat 1: Live travellers */}
          <div
            className="px-8 py-6 transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "100ms",
            }}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-2 tabular-nums">
              {inView ? <RollingNumber value={liveValue} duration={2000} /> : "0"}
            </div>
            <p className="text-gray-100 text-sm">Travellers currently on TripMitra tours</p>
          </div>

          {/* Stat 2: Location ticker */}
          <div
            className="px-8 py-6 transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "200ms",
            }}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-1 tabular-nums">
              {inView ? <RollingNumber value={81} duration={1600} /> : "0"}
            </div>
            <p className="text-gray-500 text-sm mb-1">On-ground in</p>
            <LocationTicker active={inView} />
            <p className="text-gray-500 text-sm inline"> right now</p>
          </div>

          {/* Stat 3 */}
          <div
            className="px-8 py-6 transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "300ms",
            }}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-2 tabular-nums">
              {inView ? <RollingNumber value={142} duration={1400} /> : "0"}+
            </div>
            <p className="text-gray-500 text-sm">Tours operating today</p>
          </div>

          {/* Stat 4 */}
          <div
            className="px-8 py-6 transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "400ms",
            }}
          >
            <div className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-2 tabular-nums">
              {inView ? <RollingNumber value={48} duration={1200} /> : "0"}
            </div>
            <p className="text-gray-500 text-sm">Countries covered</p>
          </div>
        </div>
      </div>
    </section>
  );
}