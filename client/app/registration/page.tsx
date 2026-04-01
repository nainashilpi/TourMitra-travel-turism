"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://tourmitra-74s0.onrender.com/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        setUser({ username: "", email: "", phone: "", password: "" });
        router.push("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] relative overflow-hidden px-4 pt-32 pb-20 flex items-center justify-center selection:bg-[#e7d393] selection:text-black">
      
      {/* ── STICKY BACKGROUND (Matching Hero & Login) ── */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/tourists.png" 
          alt="Luxury Travel Background"
          fill
          priority
          className="w-full h-full object-cover opacity-30 grayscale-[30%]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/90 to-[#0a0a0a]" />
      </div>

      <main className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: TourMitra Journey Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="text-[#e7d393] uppercase tracking-[0.5em] text-[10px] font-black border-l-2 border-[#e7d393] pl-4 block">
              Join the Elite
            </span>
            <h1 className="text-6xl sm:text-7xl font-light tracking-tighter leading-none text-white">
              Tour<span className="font-semibold text-[#e7d393]">Mitra.</span>
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md italic">
              "Crafting bespoke journeys for those who value time and elite experiences."
            </p>
          </div>

          {/* Premium Image Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative w-full h-[400px] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group"
          >
            <Image
              src="/login1.png"
              alt="Join TourMitra"
              fill
              priority
              className="object-cover object-top transition-transform duration-1000 group-hover:scale-110 grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8">
              <p className="text-[#e7d393] font-bold tracking-[0.3em] text-[10px] uppercase">Start Your Legacy</p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Multi-Field Register Form */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Watermark Logo */}
          <div className="absolute -top-10 -right-4 text-[10rem] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter">
            TM
          </div>

          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 sm:p-12 rounded-[3rem] shadow-2xl hover:border-[#e7d393]/20 transition-all duration-500">
            
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-white tracking-tight">Create Account</h2>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-3 font-bold">New Member Registration</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Username */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-[#e7d393] uppercase tracking-[0.2em] ml-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={user.username}
                    onChange={handleInput}
                    placeholder="mitra_01"
                    className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#e7d393] transition-all duration-500 text-white placeholder:text-gray-800 text-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-[#e7d393] uppercase tracking-[0.2em] ml-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#e7d393] transition-all duration-500 text-white placeholder:text-gray-800 text-sm"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-[#e7d393] uppercase tracking-[0.2em] ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={user.email}
                  onChange={handleInput}
                  placeholder="traveler@tourmitra.com"
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#e7d393] transition-all duration-500 text-white placeholder:text-gray-800 text-sm"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-[#e7d393] uppercase tracking-[0.2em] ml-1">Security Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={user.password}
                  onChange={handleInput}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#e7d393] transition-all duration-500 text-white placeholder:text-gray-800 text-sm"
                />
              </div>

              {/* Find Journey Style Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="relative group w-full bg-[#e7d393] text-black font-bold py-5 rounded-xl uppercase tracking-[0.2em] text-[11px] mt-4 overflow-hidden hover:bg-white transition-all shadow-lg shadow-[#e7d393]/5"
              >
                <span className="relative z-10">Request Access</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </motion.button>

              <div className="text-center pt-2">
                <p className="text-[10px] text-gray-600 tracking-widest uppercase">
                  Already a traveler?{" "}
                  <span
                    onClick={() => router.push("/login")}
                    className="text-[#e7d393] ml-2 font-bold cursor-pointer hover:underline underline-offset-4 transition-all"
                  >
                    Authorize Session
                  </span>
                </p>
              </div>
            </form>
          </div>
        </motion.div>

      </main>

      {/* Security Branding */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-10 opacity-20">
        <span className="text-[8px] tracking-[0.4em] font-bold uppercase text-white">Encrypted Hub</span>
        <span className="text-[8px] tracking-[0.4em] font-bold uppercase text-white italic">TourMitra © 2026</span>
      </div>
    </section>
  );
};

export default Register;