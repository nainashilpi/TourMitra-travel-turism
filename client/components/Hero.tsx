"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ── Types ──────────────────────────────────────────────────────────────────

type TravelClass =
  | "Economy/Premium Economy"
  | "Premium Economy"
  | "Business"
  | "First Class";

// ── Airport Data ───────────────────────────────────────────────────────────

const AIRPORTS = [
  { code: "DEL", name: "Delhi Airport India", city: "Delhi" },
  { code: "BLR", name: "Bengaluru International Airport India", city: "Bengaluru" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai" },
  { code: "MAA", name: "Chennai International Airport", city: "Chennai" },
  { code: "HYD", name: "Rajiv Gandhi International Airport", city: "Hyderabad" },
  { code: "CCU", name: "Netaji Subhas Chandra Bose International", city: "Kolkata" },
  { code: "GOI", name: "Dabolim Airport", city: "Goa" },
  { code: "PNQ", name: "Pune Airport", city: "Pune" },
  { code: "AMD", name: "Sardar Vallabhbhai Patel International Airport", city: "Ahmedabad" },
  { code: "JAI", name: "Jaipur International Airport", city: "Jaipur" },
  { code: "MNL", name: "Ninoy Aquino Intl Philippines", city: "Manila" },
  { code: "SIN", name: "Changi Airport Singapore", city: "Singapore" },
  { code: "DXB", name: "Dubai International Airport", city: "Dubai" },
  { code: "LHR", name: "Heathrow Airport", city: "London" },
];

// ── Airport Autocomplete ───────────────────────────────────────────────────

function AirportDropdown({
  value, onChange, placeholder = "Search city or airport",
}: {
  value: string; onChange: (val: string) => void; placeholder?: string;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);

  const filtered = AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(query.toLowerCase()) ||
      a.code.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <input
        type="text" value={query} placeholder={placeholder}
        onChange={(e) => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        style={{ width: "100%", background: "transparent", border: "none", outline: "none",
          color: "white", fontSize: "0.95rem", fontWeight: "600", caretColor: "#e7d393" }}
      />
      {query && (
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7rem", margin: "2px 0 0",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {AIRPORTS.find((a) => a.city.toLowerCase() === query.toLowerCase())?.name ?? ""}
        </p>
      )}
      {open && filtered.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 10px)", left: 0, background: "white",
          borderRadius: "12px", width: "260px", boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
          overflow: "hidden", zIndex: 200, border: "1px solid rgba(0,0,0,0.06)" }}>
          {filtered.map((a) => (
            <div key={a.code}
              onClick={() => { setQuery(a.city); onChange(a.city); setOpen(false); }}
              style={{ padding: "10px 14px", borderBottom: "1px solid #f0f0f0",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f6ff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              <span style={{ background: "#f0f0f0", color: "#555", fontSize: "11px",
                fontWeight: "700", padding: "3px 7px", borderRadius: "5px" }}>{a.code}</span>
              <div>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#222" }}>{a.city}</p>
                <p style={{ margin: 0, fontSize: "11px", color: "#999", maxWidth: "180px",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Travellers Dropdown ────────────────────────────────────────────────────

function TravellersDropdown({
  adults, setAdults, children, setChildren,
  infants, setInfants, travelClass, setTravelClass, onApply,
}: {
  adults: number; setAdults: (n: number) => void;
  children: number; setChildren: (n: number) => void;
  infants: number; setInfants: (n: number) => void;
  travelClass: TravelClass; setTravelClass: (c: TravelClass) => void;
  onApply: () => void;
}) {
  function Counter({ label, sub, value, onChange, min = 0 }: {
    label: string; sub: string; value: number; onChange: (n: number) => void; min?: number;
  }) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
        <div>
          <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#222" }}>{label}</p>
          <p style={{ margin: 0, fontSize: "11px", color: "#999" }}>{sub}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
            style={{ width: "28px", height: "28px", borderRadius: "50%", border: "2px solid #3b82f6",
              background: "none", color: "#3b82f6", fontWeight: "bold", cursor: "pointer",
              opacity: value <= min ? 0.3 : 1 }}>−</button>
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#111",
            minWidth: "16px", textAlign: "center" }}>{value}</span>
          <button onClick={() => onChange(value + 1)}
            style={{ width: "28px", height: "28px", borderRadius: "50%", border: "2px solid #3b82f6",
              background: "none", color: "#3b82f6", fontWeight: "bold", cursor: "pointer" }}>+</button>
        </div>
      </div>
    );
  }

  const classes: TravelClass[] = ["Economy/Premium Economy", "Premium Economy", "Business", "First Class"];

  return (
    <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, background: "white",
      borderRadius: "16px", padding: "18px", width: "300px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.25)", zIndex: 200,
      border: "1px solid rgba(0,0,0,0.06)" }}>
      <Counter label="Adults" sub="12 years and above" value={adults} onChange={setAdults} min={1} />
      <Counter label="Children" sub="2 – 12 years" value={children} onChange={setChildren} />
      <Counter label="Infants" sub="Below 2 years" value={infants} onChange={setInfants} />
      <div style={{ marginTop: "14px" }}>
        <p style={{ margin: "0 0 8px", fontSize: "11px", fontWeight: "700", color: "#888",
          textTransform: "uppercase", letterSpacing: "0.08em" }}>Travel Class</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {classes.map((cls) => (
            <button key={cls} onClick={() => setTravelClass(cls)} style={{
              fontSize: "11px", fontWeight: "600", padding: "8px 10px", borderRadius: "8px",
              border: travelClass === cls ? "2px solid #3b82f6" : "1px solid #e5e7eb",
              background: travelClass === cls ? "#eff6ff" : "white",
              color: travelClass === cls ? "#1d4ed8" : "#555", cursor: "pointer" }}>{cls}</button>
          ))}
        </div>
      </div>
      <button onClick={onApply} style={{ marginTop: "16px", width: "100%", background: "#3b82f6",
        color: "white", border: "none", borderRadius: "10px", padding: "11px",
        fontWeight: "700", fontSize: "13px", letterSpacing: "0.05em", cursor: "pointer" }}>
        APPLY
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function HeroSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);

  const [destination, setDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState<TravelClass>("Economy/Premium Economy");
  const [showTravellers, setShowTravellers] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const travellersRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (travellersRef.current && !travellersRef.current.contains(e.target as Node))
        setShowTravellers(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const totalTravellers = adults + children + infants;
  const travellersLabel = `${totalTravellers} Adult${totalTravellers > 1 ? "s" : ""}`;

  // ── Navigate to /services with query params ──
  // function handleApply() {
  //   const params = new URLSearchParams();
  //   if (destination) params.set("destination", destination);
  //   if (selectedDate) params.set("date", selectedDate.toISOString().split("T")[0]);
  //   params.set("adults", String(adults));
  //   if (children > 0) params.set("children", String(children));
  //   if (infants > 0) params.set("infants", String(infants));
  //   if (travelClass !== "Economy/Premium Economy") params.set("class", travelClass);
  //   const qs = params.toString();
  //   router.push(`/services${qs ? `?${qs}` : ""}`);
  // }
  function handleApply() {
  router.push("/service");
}

  return (
    <div ref={sectionRef} style={{ height: "250vh", position: "relative", backgroundColor: "#020b18" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* 1. Background Image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/tourists.png')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.8)",
          transform: `scale(${1 + scroll * 0.1})`,
          zIndex: 1,
        }} />

        {/* 2. Main Title */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 2, pointerEvents: "none", marginTop: "100px",
          opacity: 1 - scroll * 1.5,
        }}>
          <h1 style={{
            fontSize: "clamp(5rem, 18vw, 13rem)", color: "white", fontWeight: "900",
            margin: "0", marginTop: "100px", lineHeight: "0.8", letterSpacing: "-5px",
          }}>
            <span className="text-white font-extrabold tracking-tight hidden sm:block">
              Tour<span className="text-[#e7d393]">Mitra</span>
            </span>
          </h1>
          <p style={{ color: "#e7d393", fontSize: "2.5rem", fontWeight: "300", marginTop: "10px" }}>
            Explore the Unseen
          </p>
          <div style={{ width: "100px", height: "2px", background: "#e7d393", margin: "20px auto" }} />
          <p style={{ color: "white", letterSpacing: "0.6em", fontSize: "0.7rem", opacity: 0.8 }}>
            EXPLORE THE UNSEEN
          </p>
        </div>

        {/* 3. TRAVEL FILTER */}
        <div style={{
          position: "relative", zIndex: 10, paddingTop: "150px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        }}>
          <p style={{ color: "white", width: "900px", textAlign: "left",
            fontSize: "1.1rem", fontWeight: "500" }}>Travel Filter</p>

          <div style={{
            display: "flex",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1.5px solid rgba(231, 211, 147, 0.5)",
            borderRadius: "15px",
            width: "900px",
            padding: "15px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
            alignItems: "center",
          }}>

            {/* WHERE TO? */}
            <div style={{ flex: 1, padding: "0 20px",
              borderRight: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", position: "relative" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "20px", marginTop: "2px" }}>📍</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "white", fontWeight: "bold", margin: "0 0 4px" }}>Where to?</p>
                  <AirportDropdown value={destination} onChange={setDestination} placeholder="(Destination)" />
                </div>
              </div>
            </div>

            {/* WHEN? */}
            <div
              style={{ flex: 1, padding: "0 20px",
                borderRight: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", position: "relative" }}
              onClick={() => setActiveTab(activeTab === "date" ? null : "date")}
            >
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ fontSize: "20px" }}>📅</span>
                <div>
                  <p style={{ color: "white", fontWeight: "bold", margin: 0 }}>When?</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", margin: 0 }}>
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                      : "(Date Range)"}
                  </p>
                </div>
              </div>
              {activeTab === "date" && (
                <div style={{ position: "absolute", top: "70px", left: 0, zIndex: 200 }}
                  onClick={(e) => e.stopPropagation()}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(d: Date | null) => { setSelectedDate(d); setActiveTab(null); }}
                    minDate={new Date()}
                    inline
                  />
                </div>
              )}
            </div>

            {/* TRAVELLERS */}
            <div
              ref={travellersRef}
              style={{ flex: 1, padding: "0 16px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                position: "relative", cursor: "pointer",
                borderRight: "1px solid rgba(255,255,255,0.2)" }}
              onClick={() => setShowTravellers((v) => !v)}
            >
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ fontSize: "20px" }}>👥</span>
                <div>
                  <p style={{ color: "white", fontWeight: "bold", margin: 0 }}>Travellers</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", margin: 0 }}>
                    {travellersLabel} · {travelClass.split("/")[0]}
                  </p>
                </div>
              </div>
              <div
                style={{ display: "flex", gap: "8px", background: "rgba(255,255,255,0.2)",
                  padding: "5px 10px", borderRadius: "20px" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setAdults(Math.max(1, adults - 1))}
                  style={{ background: "none", border: "none", color: "white",
                    cursor: "pointer", fontSize: "16px" }}>−</button>
                <span style={{ color: "white", fontWeight: "bold",
                  minWidth: "16px", textAlign: "center" }}>{adults}</span>
                <button onClick={() => setAdults(adults + 1)}
                  style={{ background: "none", border: "none", color: "white",
                    cursor: "pointer", fontSize: "16px" }}>+</button>
              </div>
              {showTravellers && (
                <TravellersDropdown
                  adults={adults} setAdults={setAdults}
                  children={children} setChildren={setChildren}
                  infants={infants} setInfants={setInfants}
                  travelClass={travelClass} setTravelClass={setTravelClass}
                  onApply={() => setShowTravellers(false)}
                />
              )}
            </div>

            {/* ── APPLY BUTTON ── */}
            <div style={{ paddingLeft: "16px", flexShrink: 0 }}>
              <button
                onClick={handleApply}
                style={{
                  background: "linear-gradient(135deg, #e7d393, #c8a84b)",
                  color: "#020b18",
                  border: "none",
                  borderRadius: "12px",
                  padding: "13px 28px",
                  fontSize: "14px",
                  fontWeight: "800",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 20px rgba(231,211,147,0.35)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(231,211,147,0.55)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(231,211,147,0.35)";
                }}
              >
                🔍 Apply
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Accessory */}
        <div style={{ position: "absolute", bottom: "40px", right: "60px",
          fontSize: "3rem", color: "white", zIndex: 5 }}>✦</div>
      </div>
    </div>
  );
}