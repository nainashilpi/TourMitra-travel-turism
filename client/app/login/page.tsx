"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://tourmitra-74s0.onrender.com/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) router.push("/");
      else alert("Invalid credentials");
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    // bg-[#0a0a0a] for deep black base
    <section className="min-h-screen bg-[#0a0a0a] relative overflow-hidden px-4 pt-32 pb-16 flex items-center justify-center selection:bg-[#e7d393] selection:text-black">
      
      {/* ── STICKY BACKGROUND (Same as Hero/Service Section) ── */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/tourists.png" // Exact same dim image from your hero section
          alt="Luxury Travel Background"
          fill
          priority
          className="w-full h-full object-cover opacity-30 grayscale-[30%]" // Dim and grayscale to match theme
        />
        {/* Deep gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/90 to-[#0a0a0a]" />
      </div>

      <main className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: Original Branding Image + Text */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[550px] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group"
        >
          {/* Your original login image */}
          <Image
            src="/login1.png"
            alt="TourMitra Discovery"
            fill
            priority
            className="object-cover object-top transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          
          {/* Animated Text Content inside Image */}
          <div className="absolute top-12 left-10 right-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-6xl font-light text-white tracking-tighter"
            >
              Tour<span className="font-semibold text-[#e7d393]">Mitra.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-[#e7d393] font-bold text-[10px] uppercase tracking-[0.4em] mt-3 border-l-2 border-[#e7d393] pl-3"
            >
              Elite Travel Portal
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 left-10"
          >
            <p className="text-gray-400 font-light text-sm max-w-xs leading-relaxed italic">
              "Access your bespoke journey and private concierge services."
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Original Login Form with New Theme */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          {/* Floating TM Watermark (Dimmed to theme) */}
          <div className="absolute -top-12 -right-4 text-[10rem] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter overflow-hidden">
            TM
          </div>

          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-12 lg:p-16 rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:border-[#e7d393]/20 transition-colors duration-500">
            <div className="mb-10">
              <h2 className="text-4xl font-semibold text-white tracking-tight">Welcome Back</h2>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-3 font-bold">Verification Required</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Input Group */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-[#e7d393] uppercase tracking-[0.2em] ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={user.email}
                  onChange={handleInput}
                  placeholder="aviator@tourmitra.com"
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#e7d393] text-white transition-all duration-500 placeholder:text-gray-800 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-[#e7d393] uppercase tracking-[0.2em] ml-1">Access Key</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={user.password}
                  onChange={handleInput}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#e7d393] text-white transition-all duration-500 placeholder:text-gray-800 text-sm"
                />
              </div>

              {/* Find Journey Style Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="relative group w-full bg-[#e7d393] text-black font-bold py-5 rounded-xl uppercase tracking-[0.2em] text-[11px] mt-4 overflow-hidden hover:bg-white transition-all"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">Authorize Session</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </motion.button>
              
              <div className="text-center pt-2">
                <p className="text-[10px] text-gray-600 tracking-widest uppercase">
                  Not a member? 
                  <span 
                    onClick={() => router.push("/register")}
                    className="text-[#e7d393] ml-2 font-bold cursor-pointer hover:underline underline-offset-4 transition-all"
                  >
                    Request Access
                  </span>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </main>

      {/* Decorative Footer Info */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8 opacity-20 z-10">
        <span className="text-[8px] font-bold tracking-[0.4em] text-white uppercase italic">TourMitra Elite v3.0</span>
      </div>
    </section>
  );
};

export default Login;