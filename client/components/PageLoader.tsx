"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1.8s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    // Fully remove from DOM after fade completes
    const removeTimer = setTimeout(() => setVisible(false), 2400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease-in-out",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Animated ring */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer spinning ring */}
        <div
          className="absolute w-28 h-28 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: "#38bdf8",
            borderRightColor: "#38bdf8",
            animation: "spin 1.2s linear infinite",
          }}
        />
        {/* Inner pulsing circle */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(56,189,248,0.1)",
            animation: "pulse-soft 1.5s ease-in-out infinite",
          }}
        >
          {/* ── Replace the SVG below with your actual logo image ──
              e.g: <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
          */}
          <svg
            viewBox="0 0 48 48"
            className="w-12 h-12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Plane icon as placeholder logo */}
            <circle cx="24" cy="24" r="22" fill="#0ea5e9" opacity="0.15" />
            <path
              d="M10 28l6-2 4 6 4-12 14-8-8 14-12 4-8-2z"
              fill="#38bdf8"
              strokeLinejoin="round"
            />
            <path
              d="M24 24l8-12"
              stroke="#7dd3fc"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Brand name */}
      <div
        style={{
          animation: "fadeSlideUp 0.7s ease-out 0.3s both",
        }}
      >
        <h1
          className="text-3xl font-extrabold tracking-widest uppercase"
          style={{ color: "#f0f9ff", letterSpacing: "0.2em" }}
        >
          TourMitra
        </h1>
        <p
          className="text-center text-sm mt-1 tracking-widest"
          style={{ color: "#7dd3fc", letterSpacing: "0.15em" }}
        >
          Your journey begins here
        </p>
      </div>

      {/* Loading dots */}
      <div
        className="flex gap-2 mt-8"
        style={{ animation: "fadeSlideUp 0.7s ease-out 0.6s both" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: "#38bdf8",
              animation: `bounce-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}