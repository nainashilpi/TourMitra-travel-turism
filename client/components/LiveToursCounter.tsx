"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// --- Configuration ---
const LOCATIONS = [
  "Kenya", "Rajasthan", "Bali", "Switzerland", "Thailand",
  "Japan", "Maldives", "Patagonia", "Iceland", "Morocco",
];

function useInView(threshold = 0.3) {
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

function RollingNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = null;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return <>{display.toLocaleString("en-IN")}</>;
}

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
    }, 2500);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <div className="inline-block overflow-hidden" style={{ minWidth: 120 }}>
      <span
        className="inline-block font-extrabold text-[#e7d393] transition-all duration-350"
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
      className="relative w-full py-28 px-4 md:px-8 bg-[#0a0a0a] border-y border-white/5 overflow-hidden"
    >
      {/* --- BACKGROUND LAYER (Fixed replaced with Absolute) --- */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/tourists.png" 
          alt="Background"
          fill
          priority
          className="object-cover opacity-50 " 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Header */}
        <div
          className="transition-all duration-1000 ease-out mb-20"
          style={{ 
            opacity: inView ? 1 : 0, 
            transform: inView ? "translateY(0)" : "translateY(30px)" 
          }}
        >
          <div className="inline-flex items-center gap-2.5 bg-[#e7d393]/5 text-[#e7d393] text-[9px] font-black px-4 py-2 rounded-full mb-6 uppercase tracking-[0.4em] border border-[#e7d393]/20">
            <span className="w-2 h-2 rounded-full bg-[#e7d393] animate-pulse inline-block" />
            Live Network Status
          </div>
          <h2 className="text-4xl md:text-7xl font-light text-white tracking-tighter leading-none mb-6">
            Global Operations <br /> <span className="italic font-bold text-[#e7d393]">Right Now.</span>
          </h2>
          <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto italic border-l border-[#e7d393]/30 px-8">
            "A real-time telemetry view of travellers currently experiencing bespoke journeys across our global network."
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 backdrop-blur-md shadow-2xl">
          
          <div
            className="px-8 py-6 transition-all duration-1000"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "100ms" }}
          >
            <div className="text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tighter tabular-nums">
              {inView ? <RollingNumber value={liveValue} /> : "0"}
            </div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Travellers currently on TourMitra tours</p>
          </div>

          <div
            className="px-8 py-6 transition-all duration-1000 flex flex-col justify-center"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "200ms" }}
          >
            <div className="text-5xl md:text-6xl font-extrabold text-white mb-2 tabular-nums">
              {inView ? <RollingNumber value={81} duration={1600} /> : "0"}
            </div>
            <div className="space-y-1">
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">On-ground in</p>
                <LocationTicker active={inView} />
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest inline"> right now</p>
            </div>
          </div>

          <div
            className="px-8 py-6 transition-all duration-1000 flex flex-col justify-center"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "300ms" }}
          >
            <div className="text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tighter tabular-nums">
              {inView ? <RollingNumber value={142} duration={1400} /> : "0"}+
            </div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Expeditions operating today</p>
          </div>

          <div
            className="px-8 py-6 transition-all duration-1000 flex flex-col justify-center"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transitionDelay: "400ms" }}
          >
            <div className="text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tighter tabular-nums">
              {inView ? <RollingNumber value={48} duration={1200} /> : "0"}
            </div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Jurisdictions covered</p>
          </div>
        </div>

      </div>

      {/* Metadata */}
      <div className="absolute bottom-10 right-10 z-20 flex items-center gap-6 pointer-events-none opacity-20 hidden md:flex">
        <div className="h-[1px] w-20 bg-[#e7d393]/20" />
        <span className="text-[9px] font-black text-white uppercase tracking-[0.6em] italic">TourMitra v3.0 // Operations Telemetry</span>
      </div>
    </section>
  );
}