"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import Button from "./Button";
import BookingBar from "./Bookingbar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed  top-0 left-0 w-full bg-gradient-to-r from-slate-900 via-blue-950 to-black backdrop-blur-md border-b border-[#a7afbb]  z-50 shadow-sm flex items-center justify-between max-w-[1690px] mx-auto lg:px-20 px-6 py-2">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={84} height={19} className="w-25 h-12"/>
        </Link>

        <ul className="hidden h-full gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="text-[14px] font-normal text-black flex items-center cursor-pointer pb-1.5 transition-all hover:text-gray-400"
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="lg:flex items-center hidden ">
          <Button
            type="button"
            title="Login"
            icon="/user.svg"
            variant="btn_dark_green"
            
          />
        </div>

        <Image
          src={isOpen ? "/close.svg" : "/menu.svg"}
          alt="menu"
          width={32}
          height={32}
          className="cursor-pointer lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 lg:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className="text-black text-sm font-medium hover:font-bold"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Button
              type="button"
              title="Login"
              icon="/user.svg"
              variant="btn_dark_green"
            />
          </div>
        )}
      </nav>

      <div
  className={`fixed left-0 w-full h-100px z-[49] bg-white backdrop-blur-md border rounded-3xl shadow-md transition-all duration-300 ${
    showBar
      ? "top-[150px] translate-y-0 opacity-100"
      : "top-[70px] -translate-y-full opacity-0"
  }`}
>
  <div className="max-w-[1640px] mx-auto px-6 lg:px-20 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">

    <BookingBar/>
  </div>
</div>

      <div className="h-[60px]" />
    </>
  );
};

export default Navbar;
