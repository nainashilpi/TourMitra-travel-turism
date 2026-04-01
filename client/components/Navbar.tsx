"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", key: "home", label: "Home" },
  { href: "/service", key: "services", label: "Services" },
  { href: "/Affiliates", key: "Affiliates", label: "Affiliates" },
  { href: "/contact", key: "contact_us", label: "Contact Us" },
  { href: '/about', key: 'about', label: 'about' },
  // { href: '/main', key: 'about', label: 'main' },

];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-[#020b18]/90 backdrop-blur-lg py-3 border-b border-white/10 shadow-2xl" 
          /* 🌟 FIX: Jab scroll NA HO, tab niche wala gradient background image se contrast banayega */
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-8 lg:px-16 flex items-center justify-between">
        
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-11 transition-transform group-hover:rotate-12">
            <Image
              src="/logo.png"
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-white font-extrabold text-2xl tracking-tight hidden sm:block">
            Tour<span className="text-[#e7d393]">Mitra</span>
          </span>
        </Link>

        {/* --- LINKS (Higher Contrast) --- */}
        <ul className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                onClick={() => setActiveLink(link.key)}
                className={`relative text-[15px] font-semibold transition-all duration-300 ${
                  activeLink === link.key 
                    ? "text-[#e7d393]" // Active link chamkega
                    : "text-gray-100 hover:text-white" // Normal links pure white-ish honge
                }`}
              >
                {link.label}
                {/* Image jaisa Dot ya Underline */}
                {activeLink === link.key && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#e7d393] rounded-full shadow-[0_0_10px_#e7d393]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* --- BUTTONS --- */}
        <div className="hidden lg:flex items-center gap-5">
          <Link href="/login">
            <button className="px-5 py-2.5 text-sm font-bold text-white border-2 border-white/20 rounded-xl hover:bg-white/10 hover:border-white/40 transition-all">
              Login
            </button>
          </Link>
          <Link href="/registration">
            <button className="px-6 py-2.5 text-sm font-bold text-white bg-[#ac9c68] rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:-translate-y-0.5 transition-all">
              Sign Up
            </button>
          </Link>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          <span className="text-3xl">{isOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* --- MOBILE MENU --- */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#020b18] flex flex-col items-center justify-center gap-8 z-[200]">
           <button className="absolute top-8 right-8 text-white text-4xl" onClick={() => setIsOpen(false)}>✕</button>
           {NAV_LINKS.map((link) => (
             <Link key={link.key} href={link.href} className="text-2xl text-white font-bold" onClick={() => setIsOpen(false)}>{link.label}</Link>
           ))}
        </div>
      )}
    </nav>
  );
}