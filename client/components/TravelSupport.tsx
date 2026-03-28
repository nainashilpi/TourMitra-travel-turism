"use client";

import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: string;
  from: "user" | "support";
  text: string;
  delay: number;
}

const chatMessages: ChatMessage[] = [
  { id: "1", from: "user", text: "Hi, I need some help with my booking.", delay: 200 },
  { id: "2", from: "support", text: "Hi 👋 We're here to help. Please share your booking ID so we can check the details.", delay: 700 },
  { id: "3", from: "user", text: "Here is my booking PNR – BKD93735638", delay: 1300 },
  { id: "4", from: "support", text: "Thanks. We've reviewed your booking. Let us coordinate and get back to you shortly.", delay: 1900 },
  { id: "5", from: "support", text: "We've checked with our partners and reconfirmed the details. Everything is aligned now.", delay: 2600 },
];

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: "human",
    icon: "⚡",
    title: "Human Support, Not Ticket Numbers",
    description: "You're assisted by real people who understand your booking, not automated responses or disconnected vendors.",
  },
  {
    id: "onground",
    icon: "✓",
    title: "On-Ground Coordination in Critical Situations",
    description: "Support during delays, missed confirmations, medical issues, or other unforeseen events while travelling.",
  },
  {
    id: "access",
    icon: "💬",
    title: "24×7 Access to Our Operations Team",
    description: "Reach our team anytime via WhatsApp or call for clarity, reassurance, or intervention.",
  },
  {
    id: "accountability",
    icon: "🔒",
    title: "Accountability Beyond Booking",
    description: "We don't disappear after payment. Our responsibility continues through your journey.",
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function PhoneMockup({ inView }: { inView: boolean }) {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!inView) return;
    chatMessages.forEach((msg) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg.id]);
      }, msg.delay);
    });
  }, [inView]);

  return (
    <div
      className="relative transition-all duration-1000 "
      
    >
      {/* Phone shell */}
      <div
        className="relative bg-gray-900 rounded-[40px] p-3 shadow-2xl w-64 md:w-72 mx-auto"
        style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)" }}
      >
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full z-10 flex items-center justify-center gap-3">
          <div className="w-12 h-4 bg-black rounded-full" />
        </div>

        {/* Screen */}
        <div className="bg-white rounded-[32px] overflow-hidden" style={{ minHeight: 480 }}>
          {/* Status bar */}
          <div className="bg-white px-5 pt-7 pb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-900">9:41</span>
            <div className="flex items-center gap-1">
              <span className="text-xs">▌▌▌</span>
              <span className="text-xs">WiFi</span>
              <span className="text-xs">🔋</span>
            </div>
          </div>

          {/* Chat header */}
          <div className="bg-white border-b border-gray-100 px-4 py-2 flex items-center gap-2">
            <button className="text-gray-600 text-sm">←</button>
            <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">T</div>
            <span className="text-xs font-bold text-gray-900">TripMitra Travel Support</span>
          </div>

          {/* Messages */}
          <div className="px-3 py-3 flex flex-col gap-2 bg-gray-50" style={{ minHeight: 360 }}>
            {chatMessages.map((msg) => {
              const visible = visibleMessages.includes(msg.id);
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-1.5 transition-all duration-500 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(10px)",
                  }}
                >
                  {msg.from === "support" && (
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 mb-0.5">
                      T
                    </div>
                  )}
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed shadow-sm"
                    style={{
                      background: msg.from === "user" ? "#F97316" : "#FFFFFF",
                      color: msg.from === "user" ? "#fff" : "#1f2937",
                      borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                    }}
                  >
                    {msg.from === "support" && (
                      <p className="text-orange-500 font-bold text-[9px] mb-0.5">TripMitra</p>
                    )}
                    {msg.text}
                  </div>
                  {msg.from === "user" && (
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 mb-0.5">
                      K
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureBox({ feature, index, inView }: { feature: Feature; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl p-5 flex items-start gap-4 transition-all duration-500 cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(40px)",
        transitionDelay: `${index * 150 + 300}ms`,
        boxShadow: hovered
          ? "0 12px 40px -8px rgba(249,115,22,0.2)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        border: hovered ? "1.5px solid rgba(249,115,22,0.2)" : "1.5px solid transparent",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg transition-transform duration-300"
        style={{
          background: hovered ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.08)",
          transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1)",
        }}
      >
        {feature.icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}

export default function TravelSupport() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      ref={ref}
      className="w-full py-16 px-4 md:px-8 bg-gradient-to-r from-slate-900 via-blue-950"
      
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Phone */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup inView={inView} />
          </div>

          {/* Right: Text + Features */}
          <div>
            <div
              className="mb-8 transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-100 leading-tight mb-3">
                When Something Unexpected
                <br />
                Happens, We're There
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                On-ground teams and real humans supporting you, before, during,
                and after your tour. Help when it truly matters.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {features.map((f, i) => (
                <FeatureBox key={f.id} feature={f} index={i} inView={inView} />
              ))}
            </div>

            {/* Footer quote */}
            <p
              className="text-xs text-gray-400 italic mt-6 text-center transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transitionDelay: "900ms",
              }}
            >
              "All changes and confirmations are handled by TripMitra-operated teams, not third-party vendors."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}