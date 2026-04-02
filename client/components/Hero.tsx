"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { ShieldCheck, Globe, Star, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fader = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };

  return (
    <div className="relative bg-[#0a0a0a] text-white selection:bg-[#e7d393] selection:text-black">
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/tourists.png" 
          className="w-full h-full  object-cover opacity-50 grayscale-[20%]" 
          alt="Luxury Travel"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/70 to-[#0a0a0a]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center overflow-hidden ">
        <div className="container mx-auto px-6 max-w-5xl mt-25">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-12"
          >
            {/* Travel and Tourism - Moved to Left Alignment with TourMitra */}
            <motion.div variants={fader} className="flex justify-start items-center gap-4 mb-8">
              <div className="h-[1px] w-8 bg-[#e7d393]/50" />
              <span className="text-[#e7d393] font-black text-[10px] tracking-[0.6em] uppercase">
                Travel and Tourism
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-7xl md:text-[11rem] font-light tracking-tighter leading-none mt-2">
              Tour<span className="font-bold italic text-[#e7d393]">Mitra.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-400 max-w-md font-light text-lg leading-relaxed mt-6 ml-2 md:ml-10 border-l border-[#e7d393]/20 pl-6">
              Redefining the art of exploration through <span className="text-white font-medium">exclusive access</span> and meticulously crafted global itineraries.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="group bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-2xl p-2 flex flex-col md:flex-row items-center shadow-[0_30px_100px_-15px_rgba(0,0,0,0.6)] mb-10 transition-all hover:border-[#e7d393]/30"
          >
            <div className="flex-1 w-full p-5 hover:bg-white/5 rounded-xl transition-all cursor-pointer group/item">
              <p className="text-[9px] text-[#e7d393] uppercase tracking-[0.3em] font-black mb-2 opacity-60 group-hover/item:opacity-100 transition-opacity">Destination</p>
              <input 
                value={destination} onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to next?" 
                className="w-full bg-transparent outline-none placeholder:text-gray-600 font-light tracking-wide text-sm"
              />
            </div>

            <div className="w-[1px] h-12 bg-white/10 hidden md:block" />

            <div className="flex-1 w-full p-5 hover:bg-white/5 rounded-xl transition-all cursor-pointer group/item">
              <p className="text-[9px] text-[#e7d393] uppercase tracking-[0.3em] font-black mb-2 opacity-60 group-hover/item:opacity-100 transition-opacity">Departure</p>
              <DatePicker 
                selected={date} onChange={(d: any) => setDate(d)}
                placeholderText="Select Date"
                className="w-full bg-transparent outline-none placeholder:text-gray-600 font-light tracking-wide text-sm cursor-pointer"
              />
            </div>

            <div className="w-[1px] h-12 bg-white/10 hidden md:block" />

            <div className="flex-1 w-full p-5 hover:bg-white/5 rounded-xl transition-all flex items-center justify-between group/guests">
              <div>
                <p className="text-[9px] text-[#e7d393] uppercase tracking-[0.3em] font-black mb-2 opacity-60">Occupancy</p>
                <span className="font-light text-sm tracking-widest">{guests} Premium Guests</span>
              </div>
              <div className="flex gap-2 opacity-0 group-hover/guests:opacity-100 transition-all transform translate-x-2 group-hover/guests:translate-x-0">
                <button onClick={() => setGuests(Math.max(1, guests-1))} className="w-7 h-7 rounded-full border border-white/10 hover:bg-[#e7d393] hover:text-black transition-colors">-</button>
                <button onClick={() => setGuests(guests+1)} className="w-7 h-7 rounded-full border border-white/10 hover:bg-[#e7d393] hover:text-black transition-colors">+</button>
              </div>
            </div>

            <button 
              onClick={() => router.push("/service")}
              className="w-full md:w-auto bg-[#e7d393] text-black px-12 py-6 rounded-xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all shadow-2xl active:scale-95"
            >
              Begin Journey
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 min-h-screen flex items-center py-32 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeInUp} className="text-[#e7d393] font-black uppercase tracking-[0.4em] text-[10px] mb-6 flex items-center gap-2">
                <Globe size={12} /> Global Standards
              </motion.h3>
              <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[0.9]">
                Travel is a <br /> <span className="italic font-light text-[#e7d393]">Personal Legacy.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-400 text-[16px] font-light leading-relaxed mb-8 border-l-2 border-white/5 pl-8">
                TourMitra transcends conventional travel. We orchestrate bespoke expeditions for the discerning few—connecting you with the world’s most guarded landscapes through a lens of absolute luxury and discretion.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl"
            >
               <div className="absolute inset-0 bg-[#e7d393]/10 z-10 opacity-40 group-hover:opacity-0 transition-opacity duration-700" />
               <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]"
                alt="Luxury Lifestyle"
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <div className="max-w-xl">
               <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
                 Unrivaled <br /> Expertise.
               </motion.h2>
               <motion.p variants={fadeInUp} className="text-gray-500 font-light italic text-lg tracking-wide">
                 Crafting the impossible, across every meridian.
               </motion.p>
            </div>
            <motion.button 
              variants={fadeInUp}
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 text-[#e7d393] border-b border-[#e7d393]/30 pb-2 text-[10px] tracking-[0.4em] uppercase font-black hover:text-white hover:border-white transition-all group"
            >
              The Full Portfolio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Bespoke Itineraries", desc: "Symphony of logistics and luxury, tailored to your personal narrative.", icon: <Star size={18} /> },
              { title: "Global Expeditions", desc: "Access the inaccessible. Remote frontiers guided by world-class experts.", icon: <Globe size={18} /> },
              { title: "Elite Concierge", desc: "24/7 dedicated management—from private aviation to exclusive gala access.", icon: <ShieldCheck size={18} /> }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-[#e7d393]/30 transition-all duration-500"
              >
                <div className="text-[#e7d393] mb-8 bg-[#e7d393]/5 w-fit p-4 rounded-2xl group-hover:bg-[#e7d393] group-hover:text-black transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-4 tracking-tight group-hover:text-[#e7d393] transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed group-hover:text-gray-300 transition-colors">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}