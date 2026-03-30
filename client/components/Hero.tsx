"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  
  // Interaction States
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [travellers, setTravellers] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollRange = sectionRef.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));
      setScroll(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "250vh", position: "relative", backgroundColor: "#020b18" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        
        {/* 1. Background Characters - Image Layer */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/tourists.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.8)",
          transform: `scale(${1 + scroll * 0.1})`,
          zIndex: 1
        }} />

        {/* 2. Main Title - Background Layer (Overlapping effect) */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2, // Characters ke upar but filter ke peeche
          pointerEvents: "none",
          marginTop: "100px", // Text ko thoda niche shift kiya overlap avoid karne ke liye
          opacity: 1 - scroll * 1.5
        }}>
          <h1 style={{
            fontSize: "clamp(5rem, 18vw, 13rem)",
            color: "white",
            fontWeight: "900",
            margin: "0",
            marginTop: "100px",
            lineHeight: "0.8",
            letterSpacing: "-5px",
          }}><span className="text-white font-extrabold tracking-tight hidden sm:block">
            Tour<span className="text-[#e7d393]">Mitra</span>
          </span></h1>
          
          <p style={{ color: "#e7d393", fontSize: "2.5rem", fontWeight: "300", marginTop: "10px" }}>Explore the Unseen</p>
          <div style={{ width: "100px", height: "2px", background: "#e7d393", margin: "20px auto" }} />
          <p style={{ color: "white", letterSpacing: "0.6em", fontSize: "0.7rem", opacity: 0.8 }}>EXPLORE THE UNSEEN</p>
        </div>

        {/* 3. TRAVEL FILTER - Top Layer */}
        <div style={{
          position: "relative",
          zIndex: 10, // Sabse upar
          paddingTop: "150px", // Filter ko upar rakha
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px"
        }}>
          <p style={{ color: "white", width: "800px", textAlign: "left", fontSize: "1.1rem", fontWeight: "500" }}>Travel Filter</p>
          
          <div style={{
            display: "flex",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1.5px solid rgba(231, 211, 147, 0.5)",
            borderRadius: "15px",
            width: "850px",
            padding: "15px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.4)"
          }}>
            
            {/* Where to? Section */}
            <div 
              style={{ flex: 1, padding: "0 20px", borderRight: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", position: 'relative' }}
              onClick={() => setActiveTab(activeTab === 'place' ? null : 'place')}
            >
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>📍</span>
                <div>
                  <p style={{ color: "white", fontWeight: "bold", margin: 0 }}>Where to?</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", margin: 0 }}>(Destination)</p>
                </div>
              </div>
              {/* Dropdown UI like image */}
              {activeTab === 'place' && (
                <div style={{ position: 'absolute', top: '70px', left: 0, background: 'white', borderRadius: '8px', width: '200px', color: '#333', overflow: 'hidden', zIndex: 100 }}>
                  {["Delhi, India", "Kyoto, Japan", "Paris, France"].map(city => (
                    <div key={city} style={{ padding: '12px', borderBottom: '1px solid #eee', fontSize: '14px' }}>{city}</div>
                  ))}
                </div>
              )}
            </div>

            {/* When? Section */}
            <div 
              style={{ flex: 1, padding: "0 20px", borderRight: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", position: 'relative' }}
              onClick={() => setActiveTab(activeTab === 'date' ? null : 'date')}
            >
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>📅</span>
                <div>
                  <p style={{ color: "white", fontWeight: "bold", margin: 0 }}>When?</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", margin: 0 }}>(Date Range)</p>
                </div>
              </div>
              {/* Calendar UI like image */}
              {activeTab === 'date' && (
                <div style={{ position: 'absolute', top: '70px', left: '0', background: 'white', borderRadius: '12px', padding: '15px', color: '#333', zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                  <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginBottom: '10px' }}>May 2023</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', fontSize: '11px' }}>
                    {Array.from({length: 31}).map((_, i) => (
                      <div key={i} style={{ padding: '5px', background: i === 15 ? '#007bff' : 'transparent', color: i === 15 ? 'white' : '#333', borderRadius: '4px', textAlign: 'center' }}>{i+1}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Travellers Section */}
            <div style={{ flex: 1, padding: "0 20px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>👥</span>
                <div>
                  <p style={{ color: "white", fontWeight: "bold", margin: 0 }}>Travellers</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", margin: 0 }}>{travellers} Adults</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.2)', padding: '5px 10px', borderRadius: '20px' }}>
                <button onClick={() => setTravellers(Math.max(1, travellers-1))} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>-</button>
                <button onClick={() => setTravellers(travellers+1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>+</button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Accessories */}
        <div style={{ position: 'absolute', bottom: '40px', right: '60px', fontSize: '3rem', color: 'white', zIndex: 5 }}>✦</div>
      </div>
    </div>
  );
}