"use client";
import React, { useRef } from "react";

import { motion, useInView, Variants } from "framer-motion";
import {
  FaCompass,
  FaMapMarkedAlt,
  FaBalanceScale,
  FaBolt,
  FaStar,
  FaShieldAlt,
  FaHeadset,
  FaUsers,
  FaGlobeAsia,
  FaRoute,
} from "react-icons/fa";


// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.12,
    },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // fixed easing
    },
  },
};


// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: FaCompass,
    title: "Discover Destinations",
    desc: "Uncover hidden gems and iconic landmarks curated by local experts.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Plan Trips Easily",
    desc: "Drag-and-drop itinerary builder with smart suggestions.",
  },
  {
    icon: FaBalanceScale,
    title: "Compare Options",
    desc: "Side-by-side flight, hotel, and package comparisons in seconds.",
  },
  {
    icon: FaBolt,
    title: "Book Efficiently",
    desc: "One-tap booking with real-time availability and instant confirmation.",
  },
];

const whyUs = [
  { icon: FaStar, label: "Handpicked Experiences" },
  { icon: FaShieldAlt, label: "Secure Payments" },
  { icon: FaHeadset, label: "24 / 7 Support" },
  { icon: FaRoute, label: "Personalised Routes" },
];

const stats = [
  { icon: FaUsers, value: "12,000+", label: "Happy Travellers" },
  { icon: FaGlobeAsia, value: "80+", label: "Destinations" },
  { icon: FaMapMarkedAlt, value: "3,500+", label: "Trips Planned" },
  { icon: FaStar, value: "4.9 ★", label: "Avg. Rating" },
];


// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-6">
      <FaCompass className="text-amber-400" />
      {children}
    </span>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative flex gap-4 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.04] hover:bg-white/[0.08] hover:border-amber-400/30 transition-all duration-300"
    >
      <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
        <Icon className="text-amber-400 text-lg" />
      </div>

      <div>
        <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutUs() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const whyRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-80px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-80px" });

  return (
    <section className="relative w-full overflow-hidden bg-[#080C14] text-white">

      {/* background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-amber-500/[0.07] blur-[120px]" />
        <div className="absolute top-1/3 -left-60 w-[500px] h-[500px] rounded-full bg-sky-500/[0.05] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-amber-400/[0.04] blur-[120px]" />
      </div>

      {/* container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32 space-y-28">

        {/* HERO */}
        <motion.div
          ref={heroRef}
          variants={fadeIn}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* content stays same */}
        </motion.div>

        {/* STATS */}
        <motion.div
          ref={statsRef}
          variants={fadeIn}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center p-6">
              <Icon className="text-amber-400 text-2xl" />
              <p className="text-white text-2xl font-bold">{value}</p>
              <p className="text-slate-400 text-xs">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* MISSION */}
        <div ref={missionRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}