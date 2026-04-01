"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function JoinFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="join-form" className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      
      {/* ── BACKGROUND IMAGE (Dimmed & Grayscale) ── */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074" 
          alt="Background" 
          className="w-full h-full object-cover opacity-10 grayscale"
        />
        {/* Dynamic Glow (Login Style) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e7d393]/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* ── LEFT CONTENT (Original Structure) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[10px] font-black tracking-[0.4em] uppercase text-[#e7d393] mb-6">
              Get Started
            </span>
            <h2 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-tighter leading-[0.9]">
              Ready to grow with <br />
              <span className="text-[#e7d393] font-bold italic tracking-tight">TourMitra?</span>
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-10 max-w-md">
              Fill out the form and our partnership team will reach out within 24 hours.
              No commitment required.
            </p>

            {/* Testimonial (Glassy Dark) */}
            <div className="bg-white/[0.02] rounded-[2.5rem] p-8 border border-white/5 backdrop-blur-md shadow-2xl transition-all hover:border-white/10 group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#e7d393]/10 flex items-center justify-center text-xl flex-shrink-0 border border-[#e7d393]/20">
                  🏨
                </div>
                <div>
                  <p className="text-white/50 text-sm italic leading-relaxed mb-4 font-light">
                    "Joining TourMitra doubled our occupancy in 3 months. The dashboard is incredibly intuitive and the support team is always available."
                  </p>
                  <div>
                    <div className="font-bold text-white text-sm tracking-tight">Ravi Sharma</div>
                    <div className="text-[#e7d393] text-[10px] font-black uppercase tracking-widest mt-1">Owner, The Himalayan Lodge</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT FORM (Original Design - Dark Mode) ── */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a]/80 rounded-[3rem] p-8 md:p-12 border border-white/5 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#e7d393]/10 flex items-center justify-center mb-6 border border-[#e7d393]/20">
                  <CheckCircle2 className="text-[#e7d393]" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tighter">Application Received!</h3>
                <p className="text-white/40 text-sm max-w-xs font-light">
                  Our team will review your application and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[#e7d393] text-[10px] font-black uppercase tracking-[0.3em] hover:tracking-[0.5em] transition-all"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-8 tracking-tighter">Partner Application</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-white/30 tracking-[0.3em] uppercase ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Priya Mehta"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl text-white text-sm focus:outline-none focus:border-[#e7d393]/40 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-white/30 tracking-[0.3em] uppercase ml-1">Business Email</label>
                    <input
                      type="email"
                      required
                      placeholder="priya@hotel.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl text-white text-sm focus:outline-none focus:border-[#e7d393]/40 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-white/30 tracking-[0.3em] uppercase ml-1">Business Type</label>
                    <select
                      required
                      value={form.businessType}
                      onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl text-white text-sm focus:outline-none focus:border-[#e7d393]/40 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0a0a0a]" disabled>Select your business type</option>
                      <option className="bg-[#0a0a0a]">Hotel / Resort</option>
                      <option className="bg-[#0a0a0a]">Travel Agency</option>
                      <option className="bg-[#0a0a0a]">Tour Operator</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-white/30 tracking-[0.3em] uppercase ml-1">Business Abstract</label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe your objectives..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl text-white text-sm focus:outline-none focus:border-[#e7d393]/40 transition-all resize-none placeholder:text-white/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 rounded-2xl bg-[#e7d393] text-black font-black text-[11px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(231,211,147,0.1)] mt-2 flex items-center justify-center gap-2"
                  >
                    Submit Application <ArrowRight size={14} />
                  </button>

                  <p className="text-center text-[9px] text-white/20 font-bold uppercase tracking-[0.2em]">
                    By submitting, you agree to our <a href="#" className="text-[#e7d393] hover:underline">Partner Terms</a>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}