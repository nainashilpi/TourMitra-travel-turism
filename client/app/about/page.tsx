"use client";
import React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Variants } from "framer-motion";
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
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
  icon: React.ElementType;
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
      <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors duration-300">
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
      {/* ── Ambient background glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-amber-500/[0.07] blur-[120px]" />
        <div className="absolute top-1/3 -left-60 w-[500px] h-[500px] rounded-full bg-sky-500/[0.05] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-amber-400/[0.04] blur-[120px]" />
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32 space-y-28">

        {/* ══════════════════════════════════════════
            HERO: 2-column layout
        ══════════════════════════════════════════ */}
        <div
          ref={heroRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left – Text */}
          <div>
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              <SectionPill>About Tour Mitra</SectionPill>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="font-[Georgia,serif] text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              Your trusted{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  travel companion
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6 Q50 2 100 5 Q150 8 198 4"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </span>{" "}
              across India & beyond
            </motion.h2>

            {[
              "Tour Mitra was born from a simple belief: great travel should be accessible to everyone. We combine local expertise with smart technology so every journey—whether a weekend getaway or a month-long expedition—feels effortless.",
              "From the snow-capped peaks of Himachal to the sun-soaked shores of Kerala, our platform surfaces the right options at the right moment, eliminating hours of research and second-guessing.",
              "We're not just a booking engine. We're your Mitra—your friend—who's already been there, knows the best chai stall on the route, and has your back if plans change.",
            ].map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                custom={i + 2}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                className="text-slate-400 text-base md:text-lg leading-relaxed mb-5"
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="mt-8"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#080C14] font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.03] transition-all duration-300"
              >
                <FaGlobeAsia className="text-base" />
                Explore Now
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right – Image collage */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="relative h-[420px] lg:h-[520px]"
          >
            {/* Main image */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&auto=format&fit=crop&q=80"
                alt="Taj Mahal at sunrise – India travel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/60 via-transparent to-transparent" />
            </motion.div>

            {/* Floating badge – top-left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -left-5 top-10 bg-[#0f1724]/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-xl"
            >
              <p className="text-amber-400 font-bold text-xl leading-none">80+</p>
              <p className="text-slate-400 text-xs mt-0.5">Destinations</p>
            </motion.div>

            {/* Floating badge – bottom-right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="absolute -right-4 bottom-10 bg-[#0f1724]/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center">
                <FaStar className="text-amber-400 text-sm" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">4.9 / 5</p>
                <p className="text-slate-400 text-xs mt-0.5">Traveller rating</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════════ */}
        <div ref={statsRef}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                className="relative flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] text-center overflow-hidden group hover:border-amber-400/30 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon className="text-amber-400 text-2xl" />
                <p className="text-white text-2xl font-bold font-[Georgia,serif]">{value}</p>
                <p className="text-slate-400 text-xs uppercase tracking-widest">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            OUR MISSION
        ══════════════════════════════════════════ */}
        <div ref={missionRef}>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate={missionInView ? "visible" : "hidden"}>
              <SectionPill>Our Mission</SectionPill>
            </motion.div>
            <motion.h3
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={missionInView ? "visible" : "hidden"}
              className="font-[Georgia,serif] text-3xl md:text-4xl font-bold leading-tight mb-4"
            >
              Democratising{" "}
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                joyful travel
              </span>{" "}
              for every Indian
            </motion.h3>
            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={missionInView ? "visible" : "hidden"}
              className="text-slate-400 text-base md:text-lg leading-relaxed"
            >
              We believe a dream trip shouldn't require weeks of research or a travel agent. Our mission is to put
              world-class planning tools, honest reviews, and personalised recommendations in every traveller's pocket—free.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════════════════ */}
        <div ref={whyRef} className="relative">
          {/* Section glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/[0.06] to-transparent"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-14 rounded-3xl border border-white/[0.07]">
            {/* Left */}
            <div>
              <motion.div variants={fadeUp} custom={0} initial="hidden" animate={whyInView ? "visible" : "hidden"}>
                <SectionPill>Why Choose Us</SectionPill>
              </motion.div>
              <motion.h3
                variants={fadeUp}
                custom={1}
                initial="hidden"
                animate={whyInView ? "visible" : "hidden"}
                className="font-[Georgia,serif] text-3xl md:text-4xl font-bold leading-tight mb-5"
              >
                Travel smarter,{" "}
                <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                  not harder
                </span>
              </motion.h3>
              <motion.p
                variants={fadeUp}
                custom={2}
                initial="hidden"
                animate={whyInView ? "visible" : "hidden"}
                className="text-slate-400 text-base leading-relaxed mb-8"
              >
                Thousands of travellers choose Tour Mitra because we obsess over the details so they don't have to.
                From discovery to doorstep, every touchpoint is designed to delight.
              </motion.p>

              <div className="grid grid-cols-2 gap-4">
                {whyUs.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={label}
                    custom={i + 3}
                    variants={fadeUp}
                    initial="hidden"
                    animate={whyInView ? "visible" : "hidden"}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                      <Icon className="text-amber-400 text-sm" />
                    </div>
                    <span className="text-slate-300 text-sm font-medium">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right – secondary image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={whyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format&fit=crop&q=80"
                alt="Happy travellers on the road"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/50 to-transparent" />
              {/* Overlay pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0f1724]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    "https://i.pravatar.cc/32?img=11",
                    "https://i.pravatar.cc/32?img=22",
                    "https://i.pravatar.cc/32?img=33",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-[#0f1724] object-cover"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold leading-tight">12,000+ explorers</p>
                  <p className="text-slate-400 text-[11px]">have already joined Tour Mitra</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative text-center py-16 px-6 rounded-3xl overflow-hidden border border-amber-400/20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent"
          />
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">Ready to wander?</p>
          <h3 className="font-[Georgia,serif] text-3xl md:text-4xl font-bold mb-5">
            Start your journey with{" "}
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              Tour Mitra
            </span>
          </h3>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Create a free account and unlock personalised itineraries, exclusive deals, and a community of fellow travellers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#080C14] font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.03] transition-all duration-300"
            >
              <FaGlobeAsia />
              Explore Now
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 text-slate-300 font-semibold text-sm hover:border-white/25 hover:text-white transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}