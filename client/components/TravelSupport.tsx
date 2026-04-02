"use client";

import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: string;
  from: "user" | "support";
  text: string;
  delay: number;
}

const chatMessages: ChatMessage[] = [
  { id: "1", from: "user", text: "Hi, I need some help with my booking.", delay: 500 },
  { id: "2", from: "support", text: "Hi 👋 We're here to help. Share your booking ID please.", delay: 1500 },
  { id: "3", from: "user", text: "PNR – BKD93735638", delay: 2500 },
  { id: "4", from: "support", text: "Reviewing... Everything is reconfirmed now. Enjoy!", delay: 3500 },
];

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  { id: "human", icon: "⚡", title: "Human Support", description: "Real people who understand you, not automated ticket numbers." },
  { id: "onground", icon: "✓", title: "On-Ground Coordination", description: "Active support during delays or medical emergencies." },
  { id: "access", icon: "💬", title: "24×7 Direct Access", description: "Reach our ops team anytime via WhatsApp or Call." },
  { id: "accountability", icon: "🔒", title: "Pure Accountability", description: "Our responsibility continues until you reach home." },
];

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
    <div className="relative">
      {/* ✅ Bronze/Warm Metal Frame */}
      <div className="relative bg-gradient-to-br from-[#3d352a] via-[#2a2520] to-[#1f1b17] rounded-[44px] p-[2px] shadow-2xl w-64 md:w-72 mx-auto border border-[#e7d393]/20">
        
        {/* Gold Accent Ring */}
        <div className="absolute inset-0 rounded-[44px] border border-[#e7d393]/30 pointer-events-none" />
        
        <div className="bg-gradient-to-b from-[#1a1815] to-[#0f0d0b] rounded-[42px] p-3">
          
          {/* Notch with gold accent */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1815] rounded-full z-20 flex items-center justify-center border-b border-[#e7d393]/10">
            <div className="w-8 h-2 bg-[#0a0a0a] rounded-full" />
          </div>

          {/* Screen */}
          <div className="bg-[#0a0a0a] rounded-[32px] overflow-hidden flex flex-col h-[480px]">
            
            {/* Status Bar */}
            <div className="px-5 pt-8 pb-2 flex justify-between text-[10px] font-bold text-[#e7d393]/60 bg-transparent">
              <span>9:41</span>
              <span>📶 🔋</span>
            </div>

            {/* Chat Header */}
            <div className="bg-white/[0.02] border-b border-white/5 px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#e7d393]/10 border border-[#e7d393]/20 flex items-center justify-center text-[10px] font-black text-[#e7d393]">TM</div>
              <div>
                <span className="text-xs font-bold text-white">TourMitra Support</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[8px] text-white/30 uppercase tracking-wider">Active Now</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 flex-1 overflow-y-auto no-scrollbar">
              {chatMessages.map((msg) => {
                const isVisible = visibleMessages.includes(msg.id);
                return (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} transition-all duration-500`}
                    style={{ 
                      opacity: isVisible ? 1 : 0, 
                      transform: isVisible ? "translateY(0)" : "translateY(10px)" 
                    }}
                  >
                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[11px] leading-relaxed
                      ${msg.from === "user" 
                        ? "bg-[#e7d393] text-black rounded-br-none font-medium shadow-[0_4px_20px_-5px_rgba(231,211,147,0.4)]" 
                        : "bg-white/[0.03] border border-white/5 text-white/70 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/5">
              <div className="flex items-center gap-2 bg-white/[0.02] border border-white/10 rounded-2xl px-4 py-3">
                <span className="text-[10px] text-white/20">Message...</span>
                <div className="ml-auto w-7 h-7 rounded-xl bg-[#e7d393] flex items-center justify-center shadow-lg">
                  <span className="text-xs text-black">↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TravelSupport() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full py-20 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Blur Effect (Not too dark) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#1e293b_0%,transparent_70%)] opacity-40" />
      
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Phone */}
        <div className="flex justify-center lg:justify-end">
          <PhoneMockup inView={inView} />
        </div>

        {/* Right: Content */}
        <div>
          <div className="mb-10 transition-all duration-1000" 
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)" }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight mb-4">
              When Something Unexpected <br /> Happens, <span className="text-[#e7d393] italic">We're There</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-md">
              On-ground teams and real humans supporting you. Help when it truly matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={f.id} 
                className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer group"
                style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#e7d393]/10 flex items-center justify-center text-[#e7d393] mb-3 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-1">{f.title}</h3>
                <p className="text-gray-500 text-[10px] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}