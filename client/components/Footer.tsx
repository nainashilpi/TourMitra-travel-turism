"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-[#020b18] text-white/70 px-6 lg:px-20 py-16 border-t border-white/10 overflow-hidden">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-6 max-w-sm">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image src="/logo.png" alt="TourMitra Logo" width={140} height={50} className="brightness-110" />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Crafting extraordinary journeys across the Indian subcontinent. Experience luxury, heritage, and adventure like never before.
            </p>
            
            {/* Fixed Visibility Social Icons */}
            <div className="flex gap-4 mt-2">
              {[
                { name: 'facebook', icon: '/facebook.svg' },
                { name: 'twitter', icon: '/twitter.svg' },
                { name: 'instagram', icon: '/instagram.svg' }
              ].map((social) => (
                <Link key={social.name} href={`https://${social.name}.com`} target="_blank">
                  <motion.div 
                    whileHover={{ y: -5, backgroundColor: "rgba(231, 211, 147, 0.2)" }}
                    className="p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md transition-all shadow-lg"
                  >
                    <Image src={social.icon} alt={social.name} width={20} height={20} className="brightness-200" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-gray-900">Company</h4>
              <Link href="/" className="text-gray-300 hover:text-sky-400 transition">About Us</Link>
              <Link href="/" className="text-gray-300 hover:text-sky-400 transition">Careers</Link>
              <Link href="/" className="text-gray-300 hover:text-sky-400 transition">Contact</Link>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-gray-900">Support</h4>
              <Link href="/" className="text-gray-300 hover:text-sky-400 transition">FAQ</Link>
              <Link href="/" className="text-gray-300 hover:text-sky-400 transition">Help Center</Link>
              <Link href="/" className="text-gray-300 hover:text-sky-400 transition">Terms & Conditions</Link>
            </div>

            <div className="flex flex-col gap-5 col-span-2 md:col-span-1">
              <h4 className="text-sm font-black uppercase tracking-widest text-[#e7d393]">Newsletter</h4>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl outline-none w-full text-sm focus:border-amber-500/50 transition-all"
                />
                <button className="absolute right-2 top-2 bottom-2 px-3 bg-[#e7d393] text-black rounded-lg text-[10px] font-black hover:bg-white transition-colors">
                  JOIN
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="border-t border-gray-300 my-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} Trovia. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="/" className="text-gray-300 hover:text-sky-600 transition">Privacy Policy</Link>
            <Link href="/" className="text-gray-300 hover:text-sky-600 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;