"use client";

import { useState, useMemo } from "react";
import { TRIPS, Trip, TravelGroup } from "@/constants/Tripsdata";

// ── Icons (inline SVG helpers) ─────────────────────────────────────────────

function IconFilter() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function IconStar({ filled }: { filled: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth={2}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconChevron({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── Budget Slider ──────────────────────────────────────────────────────────

function BudgetSlider({
  min, max, value, onChange,
}: { min: number; max: number; value: [number, number]; onChange: (v: [number, number]) => void }) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "12px", color: "#6b7280" }}>₹{value[0].toLocaleString("en-IN")}</span>
        <span style={{ fontSize: "12px", color: "#6b7280" }}>₹{value[1].toLocaleString("en-IN")}</span>
      </div>
      {/* Min thumb */}
      <div style={{ position: "relative", height: "6px", marginBottom: "16px" }}>
        <div style={{ position: "absolute", inset: 0, background: "#e5e7eb", borderRadius: "3px" }} />
        <div style={{
          position: "absolute", top: 0, height: "100%", borderRadius: "3px",
          background: "linear-gradient(90deg,#3b82f6,#6366f1)",
          left: `${pct(value[0])}%`, right: `${100 - pct(value[1])}%`,
        }} />
        {/* Min */}
        <input type="range" min={min} max={max} step={1000} value={value[0]}
          onChange={e => { const v = Number(e.target.value); if (v < value[1]) onChange([v, value[1]]); }}
          style={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "pointer", zIndex: 2 }}
        />
        {/* Max */}
        <input type="range" min={min} max={max} step={1000} value={value[1]}
          onChange={e => { const v = Number(e.target.value); if (v > value[0]) onChange([value[0], v]); }}
          style={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "pointer", zIndex: 3 }}
        />
        {/* Thumb dots */}
        {[value[0], value[1]].map((v, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", transform: "translate(-50%,-50%)",
            left: `${pct(v)}%`, width: "16px", height: "16px", borderRadius: "50%",
            background: "white", border: "2px solid #3b82f6", boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            pointerEvents: "none", zIndex: 4,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Filter Accordion Section ───────────────────────────────────────────────

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: "18px", marginBottom: "18px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: open ? "14px" : 0 }}
      >
        <span style={{ fontSize: "13px", fontWeight: "700", color: "#111827", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</span>
        <IconChevron open={open} />
      </button>
      {open && children}
    </div>
  );
}

// ── Trip Card ──────────────────────────────────────────────────────────────

function TripCard({ trip }: { trip: Trip }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.12)" : "0 4px 16px rgba(0,0,0,0.06)",
        border: "1px solid #f0f0f0",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={trip.image}
          alt={trip.title}
          style={{ width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s ease" }}
        />
        {/* Badge */}
        {trip.badge && (
          <span style={{
            position: "absolute", top: "12px", left: "12px",
            background: trip.badge === "Luxury" ? "#7c3aed" : trip.badge === "Bestseller" ? "#059669" :
              trip.badge === "Hot Deal" ? "#dc2626" : trip.badge === "Trending" ? "#d97706" : "#3b82f6",
            color: "white", fontSize: "10px", fontWeight: "700", padding: "4px 10px",
            borderRadius: "20px", letterSpacing: "0.05em",
          }}>{trip.badge}</span>
        )}
        {/* Duration pill */}
        <span style={{
          position: "absolute", bottom: "12px", right: "12px",
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
          color: "white", fontSize: "11px", fontWeight: "600",
          padding: "4px 10px", borderRadius: "20px",
        }}>{trip.days}D / {trip.nights}N</span>
      </div>

      {/* Body */}
      <div style={{ padding: "16px" }}>
        {/* Country tag */}
        <span style={{ fontSize: "11px", color: "#6366f1", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {trip.country}
        </span>

        <h3 style={{ margin: "4px 0 2px", fontSize: "15px", fontWeight: "700", color: "#111827", lineHeight: 1.3 }}>
          {trip.title}
        </h3>
        <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#9ca3af" }}>📍 {trip.destination}</p>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
          {[1, 2, 3, 4, 5].map(s => <IconStar key={s} filled={s <= Math.round(trip.rating)} />)}
          <span style={{ fontSize: "11px", color: "#6b7280", marginLeft: "4px" }}>{trip.rating} ({trip.reviews} reviews)</span>
        </div>

        {/* Highlights */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
          {trip.highlights.slice(0, 2).map(h => (
            <span key={h} style={{ fontSize: "10px", background: "#f3f4f6", color: "#374151",
              padding: "3px 8px", borderRadius: "20px", fontWeight: "500" }}>
              {h}
            </span>
          ))}
        </div>

        {/* Includes */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
          {trip.includes.slice(0, 3).map(inc => (
            <span key={inc} style={{ fontSize: "10px", color: "#059669", fontWeight: "600" }}>✓ {inc}</span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, fontSize: "11px", color: "#9ca3af" }}>Starting from</p>
            <p style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#111827" }}>
              ₹{trip.price.toLocaleString("en-IN")}
              <span style={{ fontSize: "11px", fontWeight: "400", color: "#9ca3af" }}>/person</span>
            </p>
          </div>
          <button style={{
            background: "linear-gradient(135deg,#3b82f6,#6366f1)",
            color: "white", border: "none", borderRadius: "10px",
            padding: "9px 18px", fontSize: "12px", fontWeight: "700",
            cursor: "pointer", letterSpacing: "0.03em",
            boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
          }}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Group Options ──────────────────────────────────────────────────────────

const GROUP_OPTIONS: { id: TravelGroup; label: string; emoji: string }[] = [
  { id: "family", label: "Family", emoji: "👨‍👩‍👧‍👦" },
  { id: "friends", label: "Friends", emoji: "🧑‍🤝‍🧑" },
  { id: "solo", label: "Solo", emoji: "🧳" },
  { id: "couple", label: "Couple", emoji: "💑" },
];

const DURATION_OPTIONS = [
  { label: "1–3 Days", min: 1, max: 3 },
  { label: "4–6 Days", min: 4, max: 6 },
  { label: "7–10 Days", min: 7, max: 10 },
  { label: "10+ Days", min: 11, max: 999 },
];

const CATEGORY_OPTIONS = [
  { id: "domestic", label: "🇮🇳 Domestic" },
  { id: "international", label: "✈️ International" },
  { id: "adventure", label: "🏔️ Adventure" },
  { id: "honeymoon", label: "💕 Honeymoon" },
];

const SORT_OPTIONS = [
  { id: "popular", label: "Most Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "duration-asc", label: "Shortest First" },
  { id: "rating", label: "Highest Rated" },
];

// ── Main Page ──────────────────────────────────────────────────────────────

export default function ServicesPage() {
  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(true);

  // Filters
  const [budget, setBudget] = useState<[number, number]>([10000, 300000]);
  const [selectedGroups, setSelectedGroups] = useState<TravelGroup[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  function toggleGroup(g: TravelGroup) {
    setSelectedGroups(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  }
  function toggleDuration(label: string) {
    setSelectedDurations(prev => prev.includes(label) ? prev.filter(x => x !== label) : [...prev, label]);
  }
  function toggleCategory(id: string) {
    setSelectedCategories(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }
  function clearAllFilters() {
    setBudget([10000, 300000]);
    setSelectedGroups([]);
    setSelectedDurations([]);
    setSelectedCategories([]);
    setSearchQuery("");
  }

  const activeFilterCount =
    (budget[0] !== 10000 || budget[1] !== 300000 ? 1 : 0) +
    selectedGroups.length + selectedDurations.length + selectedCategories.length;

  // ── Filtered + sorted trips ──
  const displayed = useMemo(() => {
    let result = TRIPS.filter(trip => {
      // Budget
      if (trip.price < budget[0] || trip.price > budget[1]) return false;
      // Group
      if (selectedGroups.length > 0 && !selectedGroups.some(g => trip.groupTypes.includes(g))) return false;
      // Duration
      if (selectedDurations.length > 0) {
        const match = DURATION_OPTIONS.filter(d => selectedDurations.includes(d.label));
        if (!match.some(d => trip.days >= d.min && trip.days <= d.max)) return false;
      }
      // Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(trip.category)) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!trip.title.toLowerCase().includes(q) &&
          !trip.destination.toLowerCase().includes(q) &&
          !trip.country.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    // Sort
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "duration-asc") result.sort((a, b) => a.days - b.days);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => b.reviews - a.reviews); // popular

    return result;
  }, [budget, selectedGroups, selectedDurations, selectedCategories, sortBy, searchQuery]);

  const DRAWER_WIDTH = 280;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>

      

      {/* ── Page Title ── */}
      <div style={{ padding: "32px 28px 20px", background: "linear-gradient(135deg,#020b18 0%,#0f2137 100%)" }}>
        <p style={{ color: "#e7d393", fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", margin: "50px 0 8px" }}>
          ✈ Explore Packages
        </p>
        <h1 style={{ color: "white", fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: "900", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
          Find Your Perfect Trip
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", margin: 0 }}>
          {displayed.length} packages found · handpicked by local experts
        </p>
      </div>

      {/* ── Body: Drawer + Cards ── */}
      <div style={{ display: "flex", alignItems: "flex-start", padding: "24px 28px", gap: "24px" }}>

        {/* ── LEFT DRAWER ── */}
        <div style={{
          width: drawerOpen ? `${DRAWER_WIDTH}px` : "0px",
          minWidth: drawerOpen ? `${DRAWER_WIDTH}px` : "0px",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          opacity: drawerOpen ? 1 : 0,
        }}>
          <div style={{
            width: `${DRAWER_WIDTH}px`,
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid #f0f0f0",
            position: "sticky",
            top: "80px",
          }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "14px", fontWeight: "800", color: "#111827" }}>Filters</span>
              {activeFilterCount > 0 && (
                <button onClick={clearAllFilters} style={{
                  background: "none", border: "none", color: "#ef4444",
                  fontSize: "12px", fontWeight: "600", cursor: "pointer",
                }}>Clear all ({activeFilterCount})</button>
              )}
            </div>

            {/* Budget */}
            <FilterSection title="Budget (per person)">
              <BudgetSlider min={10000} max={300000} value={budget} onChange={setBudget} />
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {[
                  ["Under ₹20K", 10000, 20000],
                  ["₹20K–₹50K", 20000, 50000],
                  ["₹50K–₹1L", 50000, 100000],
                  ["₹1L+", 100000, 300000],
                ].map(([label, min, max]) => (
                  <button key={label as string}
                    onClick={() => setBudget([min as number, max as number])}
                    style={{
                      fontSize: "11px", padding: "5px 10px", borderRadius: "20px",
                      border: budget[0] === min && budget[1] === max ? "1.5px solid #3b82f6" : "1px solid #e5e7eb",
                      background: budget[0] === min && budget[1] === max ? "#eff6ff" : "white",
                      color: budget[0] === min && budget[1] === max ? "#1d4ed8" : "#6b7280",
                      cursor: "pointer", fontWeight: "500",
                    }}
                  >{label as string}</button>
                ))}
              </div>
            </FilterSection>

            {/* Travelling With */}
            <FilterSection title="Travelling With">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {GROUP_OPTIONS.map(({ id, label, emoji }) => (
                  <button key={id} onClick={() => toggleGroup(id)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      padding: "10px 8px", borderRadius: "12px",
                      border: selectedGroups.includes(id) ? "2px solid #3b82f6" : "1.5px solid #e5e7eb",
                      background: selectedGroups.includes(id) ? "#eff6ff" : "white",
                      cursor: "pointer", transition: "all 0.15s",
                    }}>
                    <span style={{ fontSize: "20px", marginBottom: "4px" }}>{emoji}</span>
                    <span style={{ fontSize: "11px", fontWeight: "600",
                      color: selectedGroups.includes(id) ? "#1d4ed8" : "#374151" }}>{label}</span>
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Duration */}
            <FilterSection title="Trip Duration">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {DURATION_OPTIONS.map(({ label }) => (
                  <label key={label} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <div
                      onClick={() => toggleDuration(label)}
                      style={{
                        width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                        border: selectedDurations.includes(label) ? "2px solid #3b82f6" : "2px solid #d1d5db",
                        background: selectedDurations.includes(label) ? "#3b82f6" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.15s",
                      }}
                    >
                      {selectedDurations.includes(label) && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>{label}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Category */}
            <FilterSection title="Trip Type">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {CATEGORY_OPTIONS.map(({ id, label }) => (
                  <label key={id} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <div
                      onClick={() => toggleCategory(id)}
                      style={{
                        width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                        border: selectedCategories.includes(id) ? "2px solid #6366f1" : "2px solid #d1d5db",
                        background: selectedCategories.includes(id) ? "#6366f1" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.15s",
                      }}
                    >
                      {selectedCategories.includes(id) && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>{label}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

          </div>
        </div>

        {/* ── RIGHT: Sort + Cards ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Sort bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "18px", flexWrap: "wrap", gap: "10px",
          }}>
            <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
              Showing <strong style={{ color: "#111827" }}>{displayed.length}</strong> trips
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Sort:</span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {SORT_OPTIONS.map(opt => (
                  <button key={opt.id} onClick={() => setSortBy(opt.id)}
                    style={{
                      fontSize: "11px", padding: "5px 12px", borderRadius: "20px", cursor: "pointer",
                      border: sortBy === opt.id ? "1.5px solid #111827" : "1px solid #e5e7eb",
                      background: sortBy === opt.id ? "#111827" : "white",
                      color: sortBy === opt.id ? "white" : "#6b7280",
                      fontWeight: sortBy === opt.id ? "700" : "500",
                      transition: "all 0.15s",
                    }}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards grid */}
          {displayed.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}>
              {displayed.map(trip => <TripCard key={trip.id} trip={trip} />)}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <p style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</p>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111827", margin: "0 0 8px" }}>
                No trips match your filters
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "14px", margin: "0 0 20px" }}>
                Try adjusting your budget, duration, or travel type
              </p>
              <button onClick={clearAllFilters} style={{
                background: "#111827", color: "white", border: "none",
                borderRadius: "10px", padding: "10px 24px",
                fontSize: "13px", fontWeight: "700", cursor: "pointer",
              }}>Clear All Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}