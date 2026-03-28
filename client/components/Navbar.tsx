"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/constants";
import BookingBar from "./Bookingbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [showBar, setShowBar] = useState(false); // ✅ KEEP BOOKING BAR STATE

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // ✅ BOOKING BAR LOGIC (UNCHANGED)
      const hero = document.getElementById("hero");
      if (!hero) return;

      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;

      if (scrollY > 150 && scrollY < heroHeight) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className="fixed top-0 left-0 w-full border-2 h-21 bg-gradient-to-r from-slate-900 via-blue-950 to-black z-50 transition-all duration-500"
        // style={{
        //   background: scrolled
        //     ? "rgba(5, 10, 24, 0.92)"
        //     : "linear-gradient(180deg, #020617 0%, #020617 40%, #000000 100%)",
        //   backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        //   borderBottom: scrolled
        //     ? "1px solid rgba(148,163,184,0.12)"
        //     : "none",
        // }}
      >
        <div className="max-w-[1690px] mx-auto px-6 lg:px-20 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={84}
              height={19}
              className="h-21 w-auto"
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.key)}
                  className={`px-4 py-2 text-sm rounded-lg transition ${
                    activeLink === link.key
                      ? "text-sky-300"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex gap-3">
            <button className="px-4 py-2 border rounded-lg text-gray-300 hover:text-white">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-lg text-white">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-black text-white p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* ================= BOOKING BAR (UNCHANGED) ================= */}
      <div
        className={`fixed left-0 w-full z-[49] transition-all duration-300 ${
          showBar
            ? "top-[150px] opacity-100"
            : "top-[70px] -translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-[1640px] mx-auto px-6 lg:px-20 py-4">
          <BookingBar />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}