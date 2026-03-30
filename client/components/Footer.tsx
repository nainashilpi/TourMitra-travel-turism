"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
   <footer className="relative bg-gradient-to-b from-[#202f57] via-[#1b2744] to-[#020617] text-gray-300 px-6 lg:px-20 py-14 border-t border-white/10 overflow-hidden">
      
     
      <div className="absolute inset-0">
        <img
          src="/pattern.png"
          alt="pattern"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative z-10">

        <div className="flex flex-col lg:flex-row justify-between gap-12">
          
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image src="/logo.png" alt="Trovia Logo" width={120} height={50} />
            </Link>
            <p className="text-gray-300 max-w-sm leading-relaxed">
              Explore breathtaking destinations and plan your next adventure with Trovia.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            
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

            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-gray-900">Follow Us</h4>
              <div className="flex gap-4 mt-2">
                
                <Link href="https://facebook.com" target="_blank">
                  <div className="p-2 rounded-full bg-white shadow hover:shadow-md transition">
                    <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
                  </div>
                </Link>

                <Link href="https://twitter.com" target="_blank">
                  <div className="p-2 rounded-full bg-white shadow hover:shadow-md transition">
                    <Image src="/twitter.svg" alt="Twitter" width={20} height={20} />
                  </div>
                </Link>

                <Link href="https://instagram.com" target="_blank">
                  <div className="p-2 rounded-full bg-white shadow hover:shadow-md transition">
                    <Image src="/instagram.svg" alt="Instagram" width={20} height={20} />
                  </div>
                </Link>

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