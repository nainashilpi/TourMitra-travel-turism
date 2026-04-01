"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send, Mail, Globe, Phone, ShieldCheck } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ username: "", email: "", message: "" });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white px-6 py-32 relative overflow-hidden flex items-center justify-center selection:bg-[#e7d393] selection:text-black">
      
      {/* ── CONSISTENT STICKY BACKGROUND (FIXED VISIBILITY) ── */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/tourists.png" 
          alt="TourMitra Corporate Background"
          fill
          priority
          className="w-full h-full object-cover opacity-40" // Full opacity, no grayscale
        />
        {/* Gradient ko light kiya taaki image dikhe */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-20 items-stretch">
        
        {/* LEFT SIDE: Institutional Presence */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col justify-between py-4"
        >
          <div>
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e7d393]/5 border border-[#e7d393]/20 mb-8">
              <ShieldCheck size={12} className="text-[#e7d393]" />
              <span className="text-[9px] font-black tracking-[0.5em] uppercase text-[#e7d393]">Authorized Partner Portal</span>
            </motion.div>
            
            <h2 className="text-7xl md:text-[8rem] font-light tracking-tighter leading-[0.8] mb-12">
              Tour<span className="text-[#e7d393] font-bold italic">Mitra.</span>
            </h2>
            
            <div className="space-y-12">
              <div className="max-w-xs">
                <p className="text-white/40 text-lg font-light leading-relaxed italic border-l-2 border-[#e7d393]/30 pl-6">
                  "Facilitating global travel excellence through strategic infrastructure and bespoke hospitality management."
                </p>
              </div>

              {/* Professional Contact Grid */}
              <div className="space-y-8">
                {[
                  { icon: <Mail size={18} />, label: "Corporate Correspondence", val: "official.tourmitra@gmail.com" },
                  { icon: <Globe size={18} />, label: "Regional Headquarters", val: "Bhopal, Madhya Pradesh, IN" },
                  { icon: <Phone size={18} />, label: "Institutional Support", val: "+91 (Secure Line)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#e7d393] group-hover:bg-[#e7d393] group-hover:text-black transition-all duration-500 shadow-xl">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-1.5">{item.label}</p>
                      <p className="text-base font-bold text-white/60 group-hover:text-[#e7d393] transition-colors tracking-tight">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Formal Inquiry Form */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="relative h-full backdrop-blur-3xl bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] group hover:border-[#e7d393]/10 transition-all duration-1000">
            
            <div className="mb-14">
              <h3 className="text-4xl font-light text-white tracking-tighter">Engagement <span className="font-bold">Brief</span></h3>
              <p className="text-[#e7d393]/40 text-[9px] mt-4 uppercase tracking-[0.5em] font-black">Secure Endpoint Authorization Required</p>
            </div>

            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group/input">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#e7d393] ml-1">Legal Name</label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleInput}
                    placeholder="Enter full name"
                    className="w-full bg-transparent border-b border-white/5 py-4 outline-none focus:border-[#e7d393] transition-all text-sm placeholder:text-white/5 font-light"
                  />
                </div>
                <div className="relative group/input">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#e7d393] ml-1">Corporate Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInput}
                    placeholder="email@organization.com"
                    className="w-full bg-transparent border-b border-white/5 py-4 outline-none focus:border-[#e7d393] transition-all text-sm placeholder:text-white/5 font-light"
                  />
                </div>
              </div>

              <div className="relative group/input">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#e7d393] ml-1">Brief Description of Inquiry</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInput}
                  placeholder="Outline your partnership objectives or travel requirements..."
                  className="w-full bg-transparent border-b border-white/5 py-4 outline-none focus:border-[#e7d393] transition-all text-sm resize-none placeholder:text-white/5 font-light leading-relaxed"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-[#e7d393] text-black font-black py-7 rounded-2xl uppercase tracking-[0.5em] text-[10px] mt-8 relative overflow-hidden group/btn shadow-2xl transition-all duration-700"
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  Initiate Consultation <Send size={14} />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-30 transition-opacity" />
              </motion.button>
            </form>

            {/* Subtle Institutional Watermark */}
            <div className="absolute -bottom-10 -right-10 text-[15rem] font-black text-white/[0.01] select-none pointer-events-none tracking-tighter">
              TM
            </div>
          </div>
        </motion.div>
      </div>

      {/* Corporate Metadata Footer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20">
        <div className="h-[1px] w-20 bg-[#e7d393]" />
        <span className="text-[8px] font-black tracking-[0.6em] text-white uppercase italic">TourMitra Institutional Grade v3.0</span>
      </div>
    </section>
  );
};

export default ContactSection;