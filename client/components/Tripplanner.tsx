// "use client";

// import { useState, useRef, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { tripCategories, Destination } from "@/constants/Tripplannerdata";
// import { TRIPS } from "@/constants/Tripsdata"; 

// // ── Destination Card (Elite Edition with Smart Navigation) ────────────────

// function DestinationCard({ dest, index }: { dest: Destination; index: number }) {
//   const router = useRouter();
//   const startingPrice = (15000 + (index * 2500)).toLocaleString('en-IN');
//   const tags = ["Trending", "Exclusive", "Bespoke", "Hidden Gem"];
//   const randomTag = tags[index % tags.length];

//   // ── Smart Redirect Logic (String Name -> Numeric ID Matcher) ──
//   const handleNavigation = () => {
//     // 1. Pehle TRIPS data mein search karo jahan title destination name se match kare
//     const matchingTrip = TRIPS.find(
//       (t) => 
//         t.id.toString() === dest.id || 
//         t.title.toLowerCase().includes(dest.name.toLowerCase()) ||
//         dest.name.toLowerCase().includes(t.title.toLowerCase())
//     );

//     if (matchingTrip) {
//       // Agar match mila (e.g. ID 1 for Manali), toh numeric ID par bhejo
//       router.push(`/service/${matchingTrip.id}`);
//     } else {
//       // Fallback: agar kuch na mile toh wahi id bhej do
//       router.push(`/service/${dest.id}`);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
//       onClick={handleNavigation} // 👈 Click handle update kiya
//       className="flex flex-col gap-4 cursor-pointer group"
//     >
//       <div className="overflow-hidden rounded-[2rem] aspect-[3/4] w-full relative border border-white/5 bg-white/5 shadow-2xl">
//         <div className="absolute top-4 left-4 z-20">
//           <span className="bg-[#e7d393] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-xl">
//             {randomTag}
//           </span>
//         </div>

//         <motion.img
//           whileHover={{ scale: 1.1 }}
//           transition={{ duration: 1.2 }}
//           src={dest.image}
//           alt={dest.name}
//           className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
//           loading="lazy"
//         />

//         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[4px] transition-all duration-500 flex items-center justify-center z-10">
//             <motion.div 
//               initial={{ scale: 0.5, opacity: 0 }}
//               whileHover={{ scale: 1.1 }}
//               animate={ { scale: 1, opacity: 1 }}
//               className="w-14 h-14 rounded-full bg-[#e7d393] flex items-center justify-center text-black shadow-2xl transition-transform duration-300"
//             >
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M5 12h14m-7-7 7 7-7 7"/>
//                 </svg>
//             </motion.div>
//         </div>

//         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 group-hover:opacity-20 transition-opacity" />
//       </div>

//       <div className="px-2">
//         <h3 className="font-bold text-white text-xl group-hover:text-[#e7d393] transition-colors tracking-tight mb-1">
//           {dest.name}
//         </h3>
//         <div className="flex items-center gap-2">
//             <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Starting at</span>
//             <span className="text-[#e7d393] font-bold text-sm tracking-wide">₹{startingPrice}</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ── Main Component ────────────────────────────────────────

// export default function TripPlanner() {
//   const [activeId, setActiveId] = useState("all");
//   const tabsRef = useRef<HTMLDivElement>(null);

//   const displayedDestinations = useMemo(() => {
//     if (activeId === "all") {
//       return tripCategories.flatMap(cat => cat.destinations.slice(0, 2)).slice(0, 10);
//     }
//     return tripCategories.find(c => c.id === activeId)?.destinations || [];
//   }, [activeId]);

//   return (
//     <section className="relative z-10 w-full py-28 px-4 md:px-8 bg-[#0a0a0a]/95 backdrop-blur-3xl border-t border-white/5">
//       <div className="max-w-7xl mx-auto">
//         <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="mb-16 text-center md:text-left">
//           <h2 className="text-[#e7d393] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Curated Collections</h2>
//           <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-6 leading-none">Discovery <span className="italic text-[#e7d393]">Redefined.</span></h2>
//         </motion.div>

//         <div ref={tabsRef} className="flex gap-3 overflow-x-auto pb-10 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//           <style jsx>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
//           <button onClick={() => setActiveId("all")} className={`flex-shrink-0 px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${activeId === "all" ? "border-[#e7d393] text-black bg-[#e7d393]" : "border-white/5 text-gray-500 bg-white/[0.02] hover:text-white"}`}>All Experiences</button>
//           {tripCategories.map((cat) => (
//             <button key={cat.id} onClick={() => setActiveId(cat.id)} className={`flex-shrink-0 px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${activeId === cat.id ? "border-[#e7d393] text-black bg-[#e7d393]" : "border-white/5 text-gray-500 bg-white/[0.02] hover:text-white"}`}>{cat.label}</button>
//           ))}
//         </div>

//         <div className="relative min-h-[500px]">
//           <AnimatePresence mode="wait">
//             <motion.div key={activeId} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
//               {displayedDestinations.map((dest, idx) => (
//                 <DestinationCard key={`${activeId}-${dest.id}`} dest={dest} index={idx} />
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { tripCategories, Destination } from "@/constants/Tripplannerdata";
import { TRIPS } from "@/constants/Tripsdata"; 
import { travelPackages } from "@/constants/travelPackages"; // 👈 Naya Import

// ── Destination Card (Elite Edition with Smart Navigation) ────────────────

function DestinationCard({ dest, index }: { dest: Destination; index: number }) {
  const router = useRouter();
  const startingPrice = (15000 + (index * 2500)).toLocaleString('en-IN');
  const tags = ["Trending", "Exclusive", "Bespoke", "Hidden Gem"];
  const randomTag = tags[index % tags.length];

  // ── Smart Redirect Logic (Multi-Source Matcher) ──
  const handleNavigation = () => {
    // 1. Pehle TRIPS data mein search karo
    const matchingTrip = TRIPS.find(
      (t) => 
        t.id.toString() === dest.id || 
        t.title.toLowerCase().includes(dest.name.toLowerCase()) ||
        dest.name.toLowerCase().includes(t.title.toLowerCase())
    );

    // 2. Agar TRIPS mein nahi mila, toh travelPackages mein search karo
    const matchingPackage = travelPackages.find(
      (p) => 
        p.id.toLowerCase().includes(dest.id.toLowerCase()) || 
        p.id.toLowerCase().includes(dest.name.toLowerCase().replace(/\s+/g, '-'))
    );

    if (matchingTrip) {
      router.push(`/service/${matchingTrip.id}`);
    } else if (matchingPackage) {
      router.push(`/service/${matchingPackage.id}`);
    } else {
      // Fallback: agar kuch na mile toh wahi id bhej do
      router.push(`/service/${dest.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
      onClick={handleNavigation} 
      className="flex flex-col gap-4 cursor-pointer group"
    >
      <div className="overflow-hidden rounded-[2rem] aspect-[3/4] w-full relative border border-white/5 bg-white/5 shadow-2xl">
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-[#e7d393] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-xl">
            {randomTag}
          </span>
        </div>

        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.2 }}
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[4px] transition-all duration-500 flex items-center justify-center z-10">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={ { scale: 1, opacity: 1 }}
              className="w-14 h-14 rounded-full bg-[#e7d393] flex items-center justify-center text-black shadow-2xl transition-transform duration-300"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7"/>
                </svg>
            </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 group-hover:opacity-20 transition-opacity" />
      </div>

      <div className="px-2">
        <h3 className="font-bold text-white text-xl group-hover:text-[#e7d393] transition-colors tracking-tight mb-1">
          {dest.name}
        </h3>
        <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Starting at</span>
            <span className="text-[#e7d393] font-bold text-sm tracking-wide">₹{startingPrice}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────

export default function TripPlanner() {
  const [activeId, setActiveId] = useState("all");
  const tabsRef = useRef<HTMLDivElement>(null);

  const displayedDestinations = useMemo(() => {
    if (activeId === "all") {
      return tripCategories.flatMap(cat => cat.destinations.slice(0, 2)).slice(0, 10);
    }
    return tripCategories.find(c => c.id === activeId)?.destinations || [];
  }, [activeId]);

  return (
    <section className="relative z-10 w-full py-28 px-4 md:px-8 bg-[#0a0a0a]/95 backdrop-blur-3xl border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="mb-16 text-center md:text-left">
          <h2 className="text-[#e7d393] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Curated Collections</h2>
          <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-6 leading-none">Discovery <span className="italic text-[#e7d393]">Redefined.</span></h2>
        </motion.div>

        <div ref={tabsRef} className="flex gap-3 overflow-x-auto pb-10 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          <button onClick={() => setActiveId("all")} className={`flex-shrink-0 px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${activeId === "all" ? "border-[#e7d393] text-black bg-[#e7d393]" : "border-white/5 text-gray-500 bg-white/[0.02] hover:text-white"}`}>All Experiences</button>
          {tripCategories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveId(cat.id)} className={`flex-shrink-0 px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${activeId === cat.id ? "border-[#e7d393] text-black bg-[#e7d393]" : "border-white/5 text-gray-500 bg-white/[0.02] hover:text-white"}`}>{cat.label}</button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeId} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {displayedDestinations.map((dest, idx) => (
                <DestinationCard key={`${activeId}-${dest.id}`} dest={dest} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}