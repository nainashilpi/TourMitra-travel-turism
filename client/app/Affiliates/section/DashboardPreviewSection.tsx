"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, CalendarDays, IndianRupee, TrendingUp, Star, Settings, ShieldCheck, Download, Plane, Hotel, Map } from "lucide-react";

const bookings = [
  { guest: "Aanya Kapoor", service: "Premium Suite - Sea Breeze", date: "28 Mar 2026", amount: "₹8,400", status: "Confirmed" },
  { guest: "Rahul Nair", service: "Himachal Group Tour", date: "29 Mar 2026", amount: "₹15,200", status: "Confirmed" },
  { guest: "Simran Patel", service: "Deluxe Cabin - Heritage Inn", date: "30 Mar 2026", amount: "₹6,800", status: "Pending" },
];

const navItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { icon: <Hotel size={18} />, label: "Inventory" },
  { icon: <CalendarDays size={18} />, label: "Bookings" },
  { icon: <IndianRupee size={18} />, label: "Payments" },
  { icon: <Map size={18} />, label: "Itineraries" },
  { icon: <Star size={18} />, label: "Guest Reviews" },
  { icon: <Settings size={18} />, label: "Panel Settings" },
];

export default function DashboardPreviewSection() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <section className="relative py-32 px-6 bg-[#050505] overflow-hidden selection:bg-[#e7d393] selection:text-black">
      
      {/* ── Background Glows ── */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e7d393]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e7d393]/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ── Header ── */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md mb-6"
          >
            <ShieldCheck size={12} className="text-[#e7d393]" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/50">
              Vendor Management System
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-light text-white tracking-tighter mb-8 leading-tight"
          >
            Scale your <span className="text-[#e7d393] font-bold italic">Hospitality.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/30 text-lg max-w-2xl mx-auto font-light leading-relaxed italic"
          >
            "A comprehensive suite designed for modern travel partners to manage bookings, 
            track occupancy, and optimize revenue in one seamless interface."
          </motion.p>
        </div>

        {/* ── Dashboard Frame ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden border border-white/5 bg-[#0f0f0f] shadow-2xl"
        >
          {/* Browser Top Bar */}
          <div className="bg-[#161616] border-b border-white/5 px-8 py-5 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/5" />
              <div className="w-3 h-3 rounded-full bg-white/5" />
              <div className="w-3 h-3 rounded-full bg-white/5" />
            </div>
            <div className="bg-black rounded-lg px-6 py-1.5 text-[10px] text-white/20 border border-white/5 font-mono">
                portal.tourmitra.com/vendor/dashboard
            </div>
            <div className="flex gap-4">
               <div className="w-4 h-4 rounded-full bg-[#e7d393]/20 border border-[#e7d393]/40" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row min-h-[650px]">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 bg-[#0a0a0a] border-r border-white/5 p-6 flex flex-col">
              <nav className="space-y-2 flex-1 pt-4">
                {navItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveNav(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                      activeNav === i 
                        ? "bg-[#e7d393] text-black" 
                        : "text-white/30 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
              
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl mt-6">
                 <p className="text-[9px] font-black text-[#e7d393] uppercase tracking-tighter mb-1">Current Plan</p>
                 <p className="text-white text-xs font-bold">Elite Partner v2.0</p>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-12 bg-[#0f0f0f]">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Business Overview</h3>
                  <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mt-1">Live Inventory Status • Mar 2026</p>
                </div>
                <button className="bg-white/[0.03] border border-white/10 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#e7d393] hover:text-black transition-all">
                  Download Report
                </button>
              </div>

              {/* Real Travel Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {[
                  { label: "Occupancy", value: "84%", delta: "+5.2%", color: "text-emerald-500" },
                  { label: "Net Revenue", value: "₹4.8L", delta: "+12.4%", color: "text-[#e7d393]" },
                  { label: "Avg. Booking", value: "₹6,420", delta: "+3.1%", color: "text-white/40" },
                  { label: "Cancellations", value: "2.4%", delta: "-0.8%", color: "text-emerald-500" },
                ].map((s, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl group hover:border-[#e7d393]/20 transition-all">
                    <div className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-3">{s.label}</div>
                    <div className="text-2xl font-black text-white mb-1 tracking-tighter">{s.value}</div>
                    <div className={`text-[9px] font-bold ${s.color}`}>{s.delta}</div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-white/40">Latest Incoming Bookings</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <tbody className="text-[13px]">
                      {bookings.map((b, i) => (
                        <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-5">
                            <div className="text-white font-bold">{b.guest}</div>
                            <div className="text-white/20 text-[10px] mt-0.5">{b.service}</div>
                          </td>
                          <td className="px-6 py-5 font-mono text-[#e7d393]">{b.amount}</td>
                          <td className="px-6 py-5">
                            <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40">
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </motion.div>

        {/* Sync Footer */}
        <div className="flex items-center justify-center gap-4 mt-12">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <p className="text-white/10 text-[9px] font-black uppercase tracking-[0.4em]">
             Live Inventory Sync Active • Connection Secure
           </p>
        </div>
      </div>
    </section>
  );
}