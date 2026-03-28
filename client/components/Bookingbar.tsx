"use client";

import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ── Types ──────────────────────────────────────────────────────────────────

type TripMode = "one-way" | "round-trip" | "multi-city";
type TravelClass = "Economy/Premium Economy" | "Premium Economy" | "Business" | "First Class";
type SpecialFare = "regular" | "student" | "armed-forces" | "senior-citizen" | "doctor-nurses";

interface MultiCityLeg {
  id: number;
  from: string;
  to: string;
  departure: Date | null;
}

// ── Airport Suggestions (mock data) ───────────────────────────────────────

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

// ── Sub-components ─────────────────────────────────────────────────────────

function RadioOption({
  id,
  label,
  checked,
  onChange,
}: {
  id: TripMode;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none group">
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
          ${checked ? "border-blue-600 bg-blue-600" : "border-gray-400 bg-white group-hover:border-blue-400"}`}
        onClick={onChange}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <span
        onClick={onChange}
        className={`text-sm font-semibold transition-colors ${checked ? "text-blue-700" : "text-gray-600 group-hover:text-blue-600"}`}
      >
        {label}
      </span>
    </label>
  );
}

// Airport autocomplete input
function AirportInput({
  label,
  value,
  onChange,
  placeholder = "City or Airport",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
  setQuery(value);
}, [value]);

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
    <div ref={ref} className="relative w-full">
      <p className="text-xs text-gray-500 mb-1 font-medium">{label}</p>
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full text-2xl font-bold text-gray-900 placeholder-gray-300 border-0 outline-none bg-transparent"
      />
      {query && (
        <p className="text-xs text-gray-400 mt-0.5 truncate">
          {AIRPORTS.find((a) => a.city.toLowerCase() === query.toLowerCase())?.name ?? ""}
        </p>
      )}
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white shadow-2xl rounded-xl z-50 overflow-hidden border border-gray-100">
          {filtered.map((a) => (
            <div
              key={a.code}
              onClick={() => {
                setQuery(a.city);
                onChange(a.city);
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3"
            >
              <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded">
                {a.code}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{a.city}</p>
                <p className="text-xs text-gray-400 truncate max-w-[200px]">{a.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Field box wrapper
function FieldBox({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`border border-gray-200 rounded-xl px-5 py-4 bg-white hover:border-blue-400 hover:shadow-sm transition-all duration-200 cursor-pointer min-w-0 ${className}`}
    >
      {children}
    </div>
  );
}

// Swap button
function SwapButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-200 hover:border-blue-400 rounded-full w-9 h-9 flex items-center justify-center shadow-sm transition-all hover:rotate-180 duration-300"
    >
      <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// Travellers dropdown
function TravellersDropdown({
  adults, setAdults,
  children, setChildren,
  infants, setInfants,
  travelClass, setTravelClass,
  onApply,
}: {
  adults: number; setAdults: (n: number) => void;
  children: number; setChildren: (n: number) => void;
  infants: number; setInfants: (n: number) => void;
  travelClass: TravelClass; setTravelClass: (c: TravelClass) => void;
  onApply: () => void;
}) {
  function Counter({
    label, sub, value, onChange, min = 0,
  }: { label: string; sub: string; value: number; onChange: (n: number) => void; min?: number }) {
    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
        <div>
          <p className="font-semibold text-gray-800 text-sm">{label}</p>
          <p className="text-xs text-gray-400">{sub}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onChange(Math.max(min, value - 1))}
            className="w-8 h-8 rounded-full border-2 border-blue-500 text-blue-500 font-bold flex items-center justify-center hover:bg-blue-50 transition disabled:opacity-30"
            disabled={value <= min}
          >−</button>
          <span className="w-5 text-center font-bold text-gray-900">{value}</span>
          <button
            onClick={() => onChange(value + 1)}
            className="w-8 h-8 rounded-full border-2 border-blue-500 text-blue-500 font-bold flex items-center justify-center hover:bg-blue-50 transition"
          >+</button>
        </div>
      </div>
    );
  }

  const classes: TravelClass[] = ["Economy/Premium Economy", "Premium Economy", "Business", "First Class"];

  return (
    <div className="absolute top-full right-0 mt-3 w-80 bg-white shadow-2xl rounded-2xl z-50 p-5 border border-gray-100">
      <Counter label="Adults" sub="12 years and above" value={adults} onChange={setAdults} min={1} />
      <Counter label="Children" sub="2 - 12 years" value={children} onChange={setChildren} />
      <Counter label="Infants" sub="Below 2 years" value={infants} onChange={setInfants} />

      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Travel Class</p>
        <div className="grid grid-cols-2 gap-2">
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => setTravelClass(cls)}
              className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                travelClass === cls
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-blue-300"
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onApply}
        className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition text-sm tracking-wide"
      >
        APPLY
      </button>
    </div>
  );
}

// ── Special Fares ──────────────────────────────────────────────────────────

const SPECIAL_FARES: { id: SpecialFare; label: string; sub: string }[] = [
  { id: "regular", label: "Regular", sub: "Regular fares" },
  { id: "student", label: "Student", sub: "Extra discounts/baggage" },
  { id: "armed-forces", label: "Armed Forces", sub: "Up to ₹ 600 off" },
  { id: "senior-citizen", label: "Senior Citizen", sub: "Up to ₹ 600 off" },
  { id: "doctor-nurses", label: "Doctor and Nurses", sub: "Up to ₹ 600 off" },
];

// ── Main Component ─────────────────────────────────────────────────────────

export default function BookingBar() {
  const [mode, setMode] = useState<TripMode>("one-way");
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Bengaluru");
  const [departure, setDeparture] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [showTravellers, setShowTravellers] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState<TravelClass>("Economy/Premium Economy");
  const [specialFare, setSpecialFare] = useState<SpecialFare>("regular");
  const [multiLegs, setMultiLegs] = useState<MultiCityLeg[]>([
    { id: 1, from: "Delhi", to: "Bengaluru", departure: new Date() },
    { id: 2, from: "Bengaluru", to: "", departure: new Date(Date.now() + 86400000) },
  ]);

  const travellersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (travellersRef.current && !travellersRef.current.contains(e.target as Node))
        setShowTravellers(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function swapFromTo() {
    setFrom(to);
    setTo(from);
  }

  function addMultiLeg() {
    if (multiLegs.length >= 5) return;
    const last = multiLegs[multiLegs.length - 1];
    setMultiLegs([
      ...multiLegs,
      {
        id: Date.now(),
        from: last.to,
        to: "",
        departure: new Date((last.departure?.getTime() ?? Date.now()) + 86400000),
      },
    ]);
  }

  function updateLeg(id: number, field: keyof MultiCityLeg, value: string | Date | null) {
    setMultiLegs((prev) => prev.map((leg) => (leg.id === id ? { ...leg, [field]: value } : leg)));
  }

  function removeLeg(id: number) {
    if (multiLegs.length <= 2) return;
    setMultiLegs((prev) => prev.filter((leg) => leg.id !== id));
  }

  const travellersLabel = `${adults} Traveller${adults > 1 ? "s" : ""}`;

  const formatDate = (d: Date | null) =>
    d
      ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" }).replace(/ /g, " ")
      : null;

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-visible">
      {/* Top bar: trip mode + label */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100 flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <RadioOption id="one-way" label="One Way" checked={mode === "one-way"} onChange={() => setMode("one-way")} />
          <RadioOption id="round-trip" label="Round Trip" checked={mode === "round-trip"} onChange={() => setMode("round-trip")} />
          <RadioOption id="multi-city" label="Multi City" checked={mode === "multi-city"} onChange={() => setMode("multi-city")} />
        </div>
        <span className="text-sm text-gray-400 font-medium hidden sm:block">
          Book International and Domestic Flights
        </span>
      </div>

      {/* Fields */}
      <div className="px-6 py-5">
        {/* ── ONE WAY / ROUND TRIP ─────────────────────────────── */}
        {(mode === "one-way" || mode === "round-trip") && (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_1fr_1fr] gap-3 items-stretch">
            {/* From */}
            <FieldBox className="bg-blue-50/40">
              <AirportInput label="From" value={from} onChange={setFrom} />
            </FieldBox>

            {/* Swap */}
            <div className="relative flex items-center justify-center w-10">
              <SwapButton onClick={swapFromTo} />
            </div>

            {/* To */}
            <FieldBox>
              <AirportInput label="To" value={to} onChange={setTo} />
            </FieldBox>

            {/* Departure */}
            <FieldBox>
              <p className="text-xs text-gray-500 mb-1 font-medium flex items-center gap-1">
                Departure
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/></svg>
              </p>
              <DatePicker
                selected={departure}
                onChange={(d: Date | null) => setDeparture(d)}
                minDate={new Date()}
                placeholderText="Select date"
                className="w-full text-2xl font-bold text-gray-900 placeholder-gray-300 bg-transparent border-0 outline-none cursor-pointer"
                dateFormat="d MMM''yy"
                customInput={
                  <div className="cursor-pointer">
                    {departure ? (
                      <>
                        <p className="text-2xl font-bold text-gray-900">{formatDate(departure)}</p>
                        <p className="text-xs text-gray-400">
                          {departure.toLocaleDateString("en-US", { weekday: "long" })}
                        </p>
                      </>
                    ) : (
                      <p className="text-2xl font-bold text-gray-300">Select date</p>
                    )}
                  </div>
                }
              />
            </FieldBox>

            {/* Return */}
            <FieldBox
              className={mode === "round-trip" ? "" : "opacity-50"}
              onClick={() => mode === "one-way" && setMode("round-trip")}
            >
              <p className="text-xs text-gray-500 mb-1 font-medium flex items-center gap-1">
                Return
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/></svg>
              </p>
              {mode === "round-trip" ? (
                <DatePicker
                  selected={returnDate}
                  onChange={(d: Date | null) => setReturnDate(d)}
                  minDate={departure ?? new Date()}
                  placeholderText="Add return"
                  customInput={
                    <div className="cursor-pointer">
                      {returnDate ? (
                        <>
                          <p className="text-2xl font-bold text-gray-900">{formatDate(returnDate)}</p>
                          <p className="text-xs text-gray-400">
                            {returnDate.toLocaleDateString("en-US", { weekday: "long" })}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-400">Tap to add a return date for bigger discounts</p>
                      )}
                    </div>
                  }
                />
              ) : (
                <p className="text-sm text-gray-400 leading-snug">
                  Tap to add a return date for bigger discounts
                </p>
              )}
            </FieldBox>

            {/* Travellers */}
            <div ref={travellersRef} className="relative">
              <FieldBox onClick={() => setShowTravellers((v) => !v)}>
                <p className="text-xs text-gray-500 mb-1 font-medium flex items-center gap-1">
                  Travellers &amp; Class
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/></svg>
                </p>
                <p className="text-2xl font-bold text-gray-900">{travellersLabel}</p>
                <p className="text-xs text-gray-400 truncate">{travelClass}</p>
              </FieldBox>
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
          </div>
        )}

        {/* ── MULTI CITY ───────────────────────────────────────── */}
        {mode === "multi-city" && (
          <div className="flex flex-col gap-3">
            {multiLegs.map((leg, idx) => (
              <div key={leg.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_auto] gap-3 items-stretch">
                <FieldBox className="bg-blue-50/40">
                  <AirportInput
                    label="From"
                    value={leg.from}
                    onChange={(v) => updateLeg(leg.id, "from", v)}
                  />
                </FieldBox>

                <div className="relative flex items-center justify-center w-10">
                  <button
                    onClick={() => {
                      updateLeg(leg.id, "from", leg.to);
                      updateLeg(leg.id, "to", leg.from);
                    }}
                    className="bg-white border-2 border-gray-200 hover:border-blue-400 rounded-full w-9 h-9 flex items-center justify-center shadow-sm transition-all hover:rotate-180 duration-300"
                  >
                    <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <FieldBox>
                  <AirportInput
                    label="To"
                    value={leg.to}
                    onChange={(v) => updateLeg(leg.id, "to", v)}
                    placeholder="Select City"
                  />
                </FieldBox>

                <FieldBox>
                  <p className="text-xs text-gray-500 mb-1 font-medium flex items-center gap-1">
                    Departure
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/></svg>
                  </p>
                  <DatePicker
                    selected={leg.departure}
                    onChange={(d: Date | null) => updateLeg(leg.id, "departure", d)}
                    minDate={new Date()}
                    customInput={
                      <div className="cursor-pointer">
                        {leg.departure ? (
                          <>
                            <p className="text-2xl font-bold text-gray-900">{formatDate(leg.departure)}</p>
                            <p className="text-xs text-gray-400">
                              {leg.departure.toLocaleDateString("en-US", { weekday: "long" })}
                            </p>
                          </>
                        ) : (
                          <p className="text-2xl font-bold text-gray-300">Select date</p>
                        )}
                      </div>
                    }
                  />
                </FieldBox>

                {/* Last leg: Add City; others: Remove */}
                <div className="flex items-center">
                  {idx === multiLegs.length - 1 ? (
                    <button
                      onClick={addMultiLeg}
                      disabled={multiLegs.length >= 5}
                      className="border-2 border-blue-500 text-blue-600 font-bold text-xs px-4 py-3 rounded-xl hover:bg-blue-50 transition whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      + ADD ANOTHER CITY
                    </button>
                  ) : (
                    <button
                      onClick={() => removeLeg(leg.id)}
                      className="text-gray-400 hover:text-red-500 transition p-2 rounded-lg hover:bg-red-50"
                      title="Remove leg"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Travellers for multi-city */}
            <div ref={travellersRef} className="relative w-full md:w-64 mt-1">
              <FieldBox onClick={() => setShowTravellers((v) => !v)}>
                <p className="text-xs text-gray-500 mb-1 font-medium flex items-center gap-1">
                  Travellers &amp; Class
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/></svg>
                </p>
                <p className="text-xl font-bold text-gray-900">{travellersLabel}</p>
                <p className="text-xs text-gray-400 truncate">{travelClass}</p>
              </FieldBox>
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
          </div>
        )}
      </div>

      {/* Special Fares */}
      <div className="px-6 pb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-extrabold text-gray-700 uppercase tracking-widest mr-1">
            Special<br />Fares
          </span>
          {SPECIAL_FARES.map((fare) => (
            <button
              key={fare.id}
              onClick={() => setSpecialFare(fare.id)}
              className={`px-4 py-2 rounded-xl border text-sm transition-all duration-200
                ${specialFare === fare.id
                  ? "border-blue-500 bg-white text-blue-700 shadow-sm"
                  : "border-gray-200 text-gray-600 hover:border-blue-300 bg-white"}`}
            >
              <span className={`font-semibold block ${specialFare === fare.id ? "text-blue-600" : ""}`}>
                {fare.label}
              </span>
              <span className="text-xs text-gray-400 block">{fare.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center pb-7 -mb-6">
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-extrabold text-lg px-16 py-4 rounded-full shadow-lg hover:shadow-xl tracking-widest transition-all duration-200 active:scale-95">
          SEARCH
        </button>
      </div>
    </div>
  );
}