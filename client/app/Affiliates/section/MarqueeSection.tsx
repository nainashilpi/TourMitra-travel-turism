// "use client";

// import { useRef } from "react";

// const platforms = [
//   { name: "Booking.com", bg: "rgba(0, 53, 128, 0.1)", svg: ( <svg viewBox="0 0 60 24" width="50" fill="#e7d393"><text x="0" y="18" fontSize="14" fontWeight="800">booking</text></svg> ) },
//   { name: "Airbnb", bg: "rgba(255, 90, 95, 0.1)", svg: ( <svg viewBox="0 0 48 48" width="28" fill="#e7d393"><path d="M24 2C15.16 2 8 9.16 8 18c0 5.5 2.6 10.38 6.64 13.5L24 46l9.36-14.5C37.4 28.38 40 23.5 40 18c0-8.84-7.16-16-16-16zm0 22c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg> ) },
//   { name: "Expedia", bg: "rgba(27, 0, 136, 0.1)", svg: ( <svg viewBox="0 0 48 48" width="28"><circle cx="24" cy="24" r="22" fill="#e7d393"/><circle cx="24" cy="24" r="14" fill="#050505"/></svg> ) },
//   { name: "Tripadvisor", bg: "rgba(0, 170, 108, 0.1)", svg: ( <svg viewBox="0 0 48 48" width="30"><circle cx="14" cy="28" r="10" fill="#e7d393"/><circle cx="34" cy="28" r="10" fill="#e7d393"/></svg> ) },
//   { name: "OYO", bg: "rgba(224, 24, 45, 0.1)", svg: ( <text x="5" y="22" fontSize="18" fontWeight="900" fill="#e7d393">OYO</text> ) },
// ];

// const doubled = [...platforms, ...platforms, ...platforms]; // Triple for smoother loop

// export default function MarqueeSection() {
//   const trackRef = useRef<HTMLDivElement>(null);

//   return (
//     // bg-[#050505] taaki upar wale section se match kare
//     <section className="py-24 bg-[#050505] overflow-hidden border-t border-white/5">
//       <div className="max-w-6xl mx-auto px-6 text-center mb-16">
//         <span className="inline-block text-[10px] font-black tracking-[0.4em] uppercase text-[#e7d393] mb-4">
//           Network Integration
//         </span>
//         <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter">
//           Global <span className="text-[#e7d393] font-bold italic">Ecosystem.</span>
//         </h2>
//         <p className="text-white/30 mt-4 text-sm font-light max-w-sm mx-auto leading-relaxed">
//           Seamlessly connected with world-leading travel luxury platforms.
//         </p>
//       </div>

//       {/* Marquee wrapper */}
//       <div className="relative group">
//         {/* Left & Right Glow Fades (Matching Theme) */}
//         <div className="absolute left-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
//         <div className="absolute right-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

//         {/* Marquee track */}
//         <div
//           className="flex gap-8 marquee-track"
//           ref={trackRef}
//           style={{ width: "max-content" }}
//         >
//           {doubled.map((p, i) => (
//             <div
//               key={i}
//               className="flex-shrink-0 flex items-center gap-6 px-8 py-4 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#e7d393]/30 hover:bg-white/[0.05] transition-all duration-700 cursor-pointer group/card"
//             >
//               <div
//                 className="w-12 h-12 rounded-xl flex items-center justify-center grayscale group-hover/card:grayscale-0 transition-all duration-500"
//                 style={{ background: "rgba(255,255,255,0.03)" }}
//               >
//                 {p.svg}
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-white/20 text-[9px] font-black uppercase tracking-widest">Partner</span>
//                 <span className="text-white/60 text-sm font-medium group-hover/card:text-[#e7d393] transition-colors">
//                   {p.name}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .marquee-track {
//           animation: scroll-marquee 40s linear infinite;
//         }
//         .marquee-track:hover {
//           animation-play-state: paused;
//         }
//         @keyframes scroll-marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-33.33%); }
//         }
//       `}</style>
//     </section>
//   );
// }


"use client";

import { useRef } from "react";

const platforms = [
  { name: "Booking.com", bg: "rgba(0, 53, 128, 0.1)", svg: ( <svg viewBox="0 0 60 24" width="50" fill="#e7d393"><text x="0" y="18" fontSize="14" fontWeight="800">booking</text></svg> ) },
  { name: "Airbnb", bg: "rgba(255, 90, 95, 0.1)", svg: ( <svg viewBox="0 0 48 48" width="28" fill="#e7d393"><path d="M24 2C15.16 2 8 9.16 8 18c0 5.5 2.6 10.38 6.64 13.5L24 46l9.36-14.5C37.4 28.38 40 23.5 40 18c0-8.84-7.16-16-16-16zm0 22c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg> ) },
  { name: "Expedia", bg: "rgba(27, 0, 136, 0.1)", svg: ( <svg viewBox="0 0 48 48" width="28"><circle cx="24" cy="24" r="22" fill="#e7d393"/><circle cx="24" cy="24" r="14" fill="#050505"/></svg> ) },
  { name: "Tripadvisor", bg: "rgba(0, 170, 108, 0.1)", svg: ( <svg viewBox="0 0 48 48" width="30"><circle cx="14" cy="28" r="10" fill="#e7d393"/><circle cx="34" cy="28" r="10" fill="#e7d393"/></svg> ) },

  // ✅ FIXED HERE
  { name: "OYO", bg: "rgba(224, 24, 45, 0.1)", svg: (
    <svg viewBox="0 0 60 24" width="50">
      <text x="5" y="18" fontSize="18" fontWeight="900" fill="#e7d393">
        OYO
      </text>
    </svg>
  ) },
];

const doubled = [...platforms, ...platforms, ...platforms];

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <span className="inline-block text-[10px] font-black tracking-[0.4em] uppercase text-[#e7d393] mb-4">
          Network Integration
        </span>
        <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter">
          Global <span className="text-[#e7d393] font-bold italic">Ecosystem.</span>
        </h2>
        <p className="text-white/30 mt-4 text-sm font-light max-w-sm mx-auto leading-relaxed">
          Seamlessly connected with world-leading travel luxury platforms.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute left-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

        <div
          className="flex gap-8 marquee-track"
          ref={trackRef}
          style={{ width: "max-content" }}
        >
          {doubled.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-6 px-8 py-4 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#e7d393]/30 hover:bg-white/[0.05] transition-all duration-700 cursor-pointer group/card"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center grayscale group-hover/card:grayscale-0 transition-all duration-500"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {p.svg}
              </div>
              <div className="flex flex-col">
                <span className="text-white/20 text-[9px] font-black uppercase tracking-widest">Partner</span>
                <span className="text-white/60 text-sm font-medium group-hover/card:text-[#e7d393] transition-colors">
                  {p.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: scroll-marquee 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}