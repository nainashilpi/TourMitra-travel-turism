"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ScrollState {
  phase: "idle" | "fading" | "expanding" | "revealed";
  progress: number; // 0 → 1
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<ScrollState>({ phase: "idle", progress: 0 });
  const [pinTop, setPinTop] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Pin the section while we animate (the section is taller than viewport)
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top - (rect.top - section.offsetTop);
      const scrollY = window.scrollY;
      const sectionStart = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewH = window.innerHeight;

      // Pinnable scroll range
      const scrollRange = sectionHeight - viewH;
      const scrolled = scrollY - sectionStart;
      const raw = Math.max(0, Math.min(1, scrolled / scrollRange));

      let phase: ScrollState["phase"] = "idle";
      if (raw > 0 && raw < 0.35) phase = "fading";
      else if (raw >= 0.35 && raw < 0.7) phase = "expanding";
      else if (raw >= 0.7) phase = "revealed";

      setScroll({ phase, progress: raw });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Derived values ──────────────────────────────────────────────────────────
  const { phase, progress } = scroll;

  // Fade out overlay items (0→0.35)
  const fadeProgress = Math.min(1, progress / 0.35);
  const overlayOpacity = 1 - fadeProgress;

  // Mask expand (0.35→0.7)
  const expandProgress = Math.max(0, Math.min(1, (progress - 0.35) / 0.35));
  const maskSize = 10 + expandProgress * 390; // 10% → 400%
  const planeScale = 1 + expandProgress * 0.35;

  // Reveal caption (0.7→1)
  const captionOpacity = Math.max(0, Math.min(1, (progress - 0.7) / 0.3));

  return (
    <>
      {/* Install note — remove in production */}
      {/* npx gsap is NOT needed — pure CSS scroll */}

      {/*
        FILE LOCATION IN NEXT.JS:
        src/app/components/HeroSection.tsx   (App Router)
        — or —
        src/components/HeroSection.tsx       (Pages Router)

        Then import it in src/app/page.tsx (App Router) or pages/index.tsx
      */}

      {/* Outer scroll container — tall enough to create scroll room */}
      <div
        ref={sectionRef}
        id="hero"
        style={{ height: "400vh", position: "relative" }}
      >
        {/* Sticky wrapper that stays pinned to the viewport */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "#020b18",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* ── Noise overlay ───────────────────────────────────────────────── */}
          <div className="noisy" style={{ opacity: 0.04 }} />

          {/* ── Background image of 3 tourists ─────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:"url(tourists.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.55) saturate(1.2)",
            }}
          />

          {/* ── Radial gradient depth ───────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 30%, #020b18 100%)",
            }}
          />

          {/* ── TOP CONTENT (fades out on scroll) ──────────────────────────── */}
          <div
            className="will-fade"
            style={{
              position: "absolute",
              top: "6vh",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              opacity: overlayOpacity,
              transition: "opacity 0.1s linear",
              zIndex: 10,
              width: "100%",
              pointerEvents: overlayOpacity < 0.05 ? "none" : "auto",
            }}
          >
            <p
              style={{
                fontFamily: "'Modern Negra', sans-serif",
                fontSize: "clamp(3rem, 14vw, 11rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "white",
                margin: 0,
              }}
            >
              TourMitra
            </p>
            <p
              style={{
                fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                color: "#aaa",
                marginTop: "0.5rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Your world. Your journey. Your sky.
            </p>
          </div>

          {/* ── LEFT & RIGHT side lists (fade out) ─────────────────────────── */}
          <ul
            className="will-fade"
            style={{
              position: "absolute",
              left: "4vw",
              top: "50%",
              transform: "translateY(-50%)",
              listStyle: "none",
              margin: 0,
              padding: 0,
              opacity: overlayOpacity,
              transition: "opacity 0.1s linear",
              zIndex: 10,
            }}
          >
            {["Best Fares Daily", "Zero Hidden Fees", "24/7 Support"].map((t) => (
              <li
                key={t}
                style={{
                  color: "#e7d393",
                  fontFamily: "'DM Serif Text', serif",
                  fontSize: "clamp(0.9rem, 1.4vw, 1.25rem)",
                  marginBottom: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "#e7d393", fontSize: "0.7rem" }}>✦</span>
                {t}
              </li>
            ))}
          </ul>

          <ul
            className="will-fade"
            style={{
              position: "absolute",
              right: "4vw",
              top: "50%",
              transform: "translateY(-50%)",
              listStyle: "none",
              margin: 0,
              padding: 0,
              opacity: overlayOpacity,
              transition: "opacity 0.1s linear",
              zIndex: 10,
              textAlign: "right",
            }}
          >
            {["200+ Destinations", "Smart Alerts", "Group Deals"].map((t) => (
              <li
                key={t}
                style={{
                  color: "#e7d393",
                  fontFamily: "'DM Serif Text', serif",
                  fontSize: "clamp(0.9rem, 1.4vw, 1.25rem)",
                  marginBottom: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                }}
              >
                {t}
                <span style={{ color: "#e7d393", fontSize: "0.7rem" }}>✦</span>
              </li>
            ))}
          </ul>

          {/* ── AIRPLANE — masked overlay image ────────────────────────────── */}
          {/* <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // The mask punches a growing circle revealing the tourists beneath
              maskImage: "radial-gradient(circle at center, black 55%, transparent 56%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 55%, transparent 56%)",
              maskSize: `${maskSize}%`,
              WebkitMaskSize: `${maskSize}%`,
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            {/* Dark tinted background inside the mask (pre-reveal) */}
            {/* <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#020b18",
                opacity: 1 - expandProgress * 0.8,
              }}
            />

            {/* Airplane PNG */}
            {/* <img
              src="/airplane_nobg.png"
              alt="airplane"
              style={{
                position: "relative",
                zIndex: 2,
                width: "clamp(280px, 55vw, 780px)",
                objectFit: "contain",
                transform: `scale(${planeScale}) translateY(${expandProgress * -6}%)`,
                transition: "transform 0.05s linear",
                filter: "drop-shadow(0 30px 60px rgba(0,120,255,0.35))",
                opacity: Math.max(0, 1 - expandProgress * 1.6),
              }}
            />
          </div> */} 

          {/* ── CAPTION (fades in after reveal) ─────────────────────────────── */}
          <div
            id="masked-content"
            style={{
              position: "absolute",
              bottom: "8vh",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              opacity: captionOpacity,
              transition: "opacity 0.1s linear",
              zIndex: 30,
              width: "min(700px, 90vw)",
              pointerEvents: captionOpacity < 0.05 ? "none" : "auto",
            }}
          >
            <h3
              style={{
                fontFamily: "'DM Serif Text', serif",
                fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
                color: "white",
                margin: "0 0 0.75rem",
                lineHeight: 1.2,
              }}
            >
              Adventure Starts When You Say Yes
            </h3>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                margin: "0 0 2rem",
                lineHeight: 1.7,
              }}
            >
              Book smarter, travel further. SkyRoam connects you to hundreds of
              destinations with the best fares, curated just for you.
            </p>
            <a
              href="#book"
              style={{
                display: "inline-block",
                padding: "0.8rem 2.4rem",
                background: "#e7d393",
                color: "#000",
                fontWeight: 700,
                borderRadius: "999px",
                fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                letterSpacing: "0.05em",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.background = "#f5e9a8")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.background = "#e7d393")
              }
            >
              Explore Flights →
            </a>
          </div>

          {/* ── Scroll hint (visible at start) ─────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              bottom: "4vh",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: overlayOpacity * 0.7,
              transition: "opacity 0.1s linear",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
              color: "#666",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Scroll
            <span style={{ animation: "bounce 1.4s ease-in-out infinite" }}>↓</span>
          </div>
        </div>
      </div>

      {/* ── Bounce keyframe ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
      `}</style>
    </>
  );
}