"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// ── Icons (SVG components for clear visibility & compatibility) ──────

const IconInsta = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const IconTwitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const IconLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconChevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// ── Footer Component ───────────────────────────────────────────────

const Footer = () => {
  return (
    // bg-[#050505] base to blend, pb-12 ensure space from very bottom
    <footer className="relative bg-[#050505] text-white/50 px-6 lg:px-20 py-24 pb-12 border-t border-white/5 selection:bg-[#e7d393] selection:text-black">
      
      {/* ── Suble Blend Gradient Top ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-8">
            <Link href="/" className="inline-block group">
              <h1 className="text-3xl font-light tracking-tighter text-white transition-all duration-700 group-hover:tracking-normal">
                Tour<span className="font-semibold text-[#e7d393]">Mitra.</span>
              </h1>
            </Link>
            <p className="text-[13px] leading-relaxed font-light text-white/40 max-w-xs italic">
              Where bespoke luxury meets private concierge. Crafting elite global experiences for those who value time and legacy above all else.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <IconInsta />, href: "#" },
                { icon: <IconTwitter />, href: "#" },
                { icon: <IconLinkedin />, href: "#" }
              ].map((social, index) => (
                <Link 
                  key={index} 
                  href={social.href} 
                  className="w-10 h-10 flex items-center justify-center border border-white/5 rounded-full hover:border-[#e7d393] hover:text-[#e7d393] transition-all duration-500 bg-white/[0.02] shadow-xl group"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Minimalist Navigation */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e7d393]">Portfolio</h4>
            <nav className="flex flex-col gap-4 text-[13px] font-light">
              {['Bespoke Trips', 'Private Jets', 'Heritage Trails', 'Contact Hub'].map((item) => (
                <Link key={item} href="/" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Legal & Security Hub */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e7d393]">Management</h4>
            <nav className="flex flex-col gap-4 text-[13px] font-light">
              {['Privacy Policy', 'Terms of Service', 'Security Hub', 'Legacy Charter'].map((item) => (
                <Link key={item} href="/" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Member Access / Newsletter */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e7d393]">Elite Desk</h4>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] leading-relaxed">Join the inner circle. Authorize session for curated access.</p>
            <div className="space-y-6">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Private Email Access" 
                  className="w-full bg-transparent border-b border-white/5 py-3 text-[13px] outline-none focus:border-[#e7d393] transition-all duration-500 placeholder:text-gray-800 text-white"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#e7d393] hover:text-white transition-colors">
                  <IconChevron />
                </button>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-white/20 uppercase tracking-widest italic group hover:text-white transition-colors cursor-pointer">
                 <IconMail />
                 connect@tourmitra.com
              </div>
            </div>
          </div>
        </div>

        {/* ── Separator (Matching Hero Aesthetic) ── */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mt-24"></div>

        {/* ── Footer Bottom (Minimalist Editorial Look) ── */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-gray-700 text-[9px] uppercase tracking-[0.4em]">
          <p>© {new Date().getFullYear()} TourMitra Private Ltd. All rights reserved.</p>
          <div className="flex gap-10 mt-4 md:mt-0">
             <span className="opacity-40 italic">Global Desk Bhopal, MP</span>
             <Link href="/" className="hover:text-[#e7d393] transition-colors">Authorize Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;