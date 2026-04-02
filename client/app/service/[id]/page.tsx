"use client";

import { useParams, useRouter } from "next/navigation";
import { TRIPS } from "@/constants/Tripsdata";
import { travelPackages } from "@/constants/travelPackages";
import { tripCategories } from "@/constants/Tripplannerdata"; 
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  MapPin, Star, ChevronLeft, CheckCircle2, 
  Clock, ShieldCheck, CreditCard, Sparkles,
  Wifi, Coffee, Car, Camera, Info, X, Zap, 
  Lock, ShieldAlert, BadgeCheck, Users, Calendar, ArrowRight, User, Phone,
  Fingerprint, KeyRound, Globe, FastForward, Heart
} from "lucide-react";
import { useState, useEffect } from "react";

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("itinerary"); 
  const [showPayment, setShowPayment] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "applying" | "loading" | "success">("idle");
  const [mounted, setMounted] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [guests, setGuests] = useState(1);
  const [days, setDays] = useState(3);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tripId = params?.id ? String(params.id) : "";
  const tripFromTrips = TRIPS.find((t) => String(t.id) === tripId);
  const tripFromPackages = travelPackages.find((p) => String(p.id) === tripId);
  const tripFromPlanner = tripCategories
    .flatMap((category) => category.destinations)
    .find((dest) => String(dest.id) === tripId);

  const trip = tripFromTrips || tripFromPackages || tripFromPlanner;

  if (!mounted) return null;
  if (!trip) return <div className="min-h-screen bg-black flex items-center justify-center text-[#e7d393]">Trip Not Found</div>;

  const displayTitle = (trip as any).title || (trip as any).name || "Exclusive Destination";
  const displayImage = (trip as any).image || ((trip as any).images && (trip as any).images[0]) || "/placeholder.jpg";
  const basePrice = Number((trip as any).price || (trip as any).discountedPrice || 4999);

  const finalPayable = basePrice * guests * 0.85;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-[#e7d393] selection:text-black">
      
      {/* Dynamic Background Overlay */}
      <div className="fixed inset-0 z-0">
        <Image src={displayImage} alt="BG" fill className="object-cover opacity-10 blur-[120px]" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-20">
        
        {/* Header Nav */}
        <div className="flex justify-between items-center mb-12">
            <button onClick={() => router.push('/service')} className="group flex items-center gap-3 text-white/40 hover:text-[#e7d393] transition-all">
                <div className="p-3 bg-white/5 rounded-full border border-white/5 group-hover:bg-[#e7d393]/10"><ChevronLeft size={18} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest">Back to Listing</span>
            </button>
            <div className="flex gap-4">
                <div className="hidden md:flex bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-[#e7d393] items-center gap-3">
                    <BadgeCheck size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest italic">TourMitra Verified</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 space-y-10">
            {/* Main Hero Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative h-[500px] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group">
              <Image src={displayImage} alt={displayTitle} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-12 left-12">
                 <div className="flex items-center gap-2 text-[#e7d393] mb-4">
                    <Star size={14} fill="#e7d393" />
                    <span className="text-[10px] font-black tracking-[.3em] uppercase">Premium Experience</span>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">{displayTitle}</h1>
              </div>
            </motion.div>

            {/* Facilities & Services Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: <Wifi size={18}/>, label: "Free Wifi" },
                    { icon: <Coffee size={18}/>, label: "Breakfast" },
                    { icon: <Car size={18}/>, label: "Transfer" },
                    { icon: <Camera size={18}/>, label: "Guided" }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-[2.5rem] flex flex-col items-center gap-3 hover:bg-white/10 transition-colors">
                        <div className="text-[#e7d393]">{item.icon}</div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/60">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Interactive Content Hub */}
            <div className="bg-[#111]/50 border border-white/5 rounded-[3.5rem] p-8 md:p-12 backdrop-blur-3xl">
              <div className="flex gap-8 border-b border-white/5 mb-10 overflow-x-auto no-scrollbar">
                {["itinerary", "facilities", "map", "reviews"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-6 text-[10px] font-black uppercase tracking-[0.3em] relative whitespace-nowrap ${activeTab === tab ? "text-[#e7d393]" : "text-white/20"}`}>
                    {tab}
                    {activeTab === tab && <motion.div layoutId="navline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e7d393]" />}
                  </button>
                ))}
              </div>

              <div className="min-h-[400px]">
                {activeTab === "itinerary" && (
                    <div className="space-y-6">
                        {[1, 2, 3].map((day) => (
                            <div key={day} className="flex gap-6 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-2xl bg-[#e7d393] text-black flex items-center justify-center font-black text-xs">0{day}</div>
                                    <div className="w-[1px] h-full bg-white/10 my-2 group-last:hidden" />
                                </div>
                                <div className="pb-8">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest mb-2 text-[#e7d393]">Day {day}: Exploration Phase</h4>
                                    <p className="text-[12px] text-white/40 leading-relaxed max-w-md">Experience the local heritage with private guided tours and authentic culinary workshops planned exclusively for you.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "facilities" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Luxury Stay", desc: "5-Star accommodations with panoramic views." },
                            { title: "Gourmet Dining", desc: "All-inclusive meal plans with local flavors." },
                            { title: "Private Transit", desc: "Chauffeur-driven vehicles for all sightseeing." },
                            { title: "24/7 Concierge", desc: "Dedicated support for all your travel needs." }
                        ].map((f, i) => (
                            <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                                <CheckCircle2 className="text-[#e7d393] mb-3" size={20} />
                                <h5 className="text-[10px] font-black uppercase tracking-widest mb-1">{f.title}</h5>
                                <p className="text-[10px] text-white/40">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "map" && (
                  <div className="h-[400px] rounded-[3rem] overflow-hidden border border-white/10">
                    <iframe width="100%" height="100%" style={{ filter: "invert(90%) contrast(1.2) hue-rotate(180deg)", border: 0 }} src={`https://www.openstreetmap.org/export/embed.html?bbox=68,8,97,37&layer=mapnik`} />
                  </div>
                )}

                {activeTab === "reviews" && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { u: "Aryan M.", c: "The attention to detail in this trip is insane.", r: 5 },
                            { u: "Meera P.", c: "Best booking experience of my life.", r: 5 }
                        ].map((rev, i) => (
                            <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem]">
                                <div className="flex gap-1 mb-4">{[...Array(rev.r)].map((_, i) => <Star key={i} size={10} fill="#e7d393" stroke="none"/>)}</div>
                                <p className="text-[11px] italic text-white/60 mb-4">"{rev.c}"</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-[#e7d393]">— {rev.u}</p>
                            </div>
                        ))}
                   </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Checkout */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
                <div className="bg-[#111] border border-white/10 p-10 rounded-[4rem] shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Globe size={120} /></div>
                    
                    <div className="relative">
                        <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-2">Total Package Cost</p>
                        <h2 className="text-6xl font-black italic tracking-tighter mb-10">₹{basePrice.toLocaleString('en-IN')}</h2>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-center gap-4 text-white/60">
                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center"><Clock size={16}/></div>
                                <span className="text-[10px] font-black uppercase tracking-widest">3 Days / 2 Nights</span>
                            </div>
                            <div className="flex items-center gap-4 text-white/60">
                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center"><Users size={16}/></div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Personalized Group Tour</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => {
                                setBookingStatus("applying");
                                setTimeout(() => { setShowPayment(true); setBookingStatus("idle"); }, 800);
                            }}
                            className="w-full py-7 bg-white text-black rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] hover:bg-[#e7d393] transition-all flex items-center justify-center gap-4"
                        >
                            {bookingStatus === "applying" ? "Syncing Data..." : "Reserve Your Spot"}
                            <FastForward size={18} />
                        </button>
                    </div>
                </div>

                {/* Real-feel Security Banner */}
                <div className="bg-gradient-to-r from-[#111] to-transparent border border-white/5 p-8 rounded-[3rem] flex items-center gap-6">
                    <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Encrypted Gateway</h4>
                        <p className="text-[8px] text-white/30 uppercase tracking-widest">PCI-DSS Compliant • SSL Secured • 24h Support</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* COMPACT PAYMENT MODAL */}
      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPayment(false)} className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-5xl rounded-[4rem] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-3xl max-h-[650px]" 
            >
              {/* Form Side */}
              <div className="p-12 space-y-8 border-r border-white/5 flex flex-col justify-center">
                <div>
                  <h3 className="text-[#e7d393] text-[9px] font-black uppercase tracking-[0.4em] mb-2">Step 02/02</h3>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">Confirm Booking</h2>
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[8px] uppercase font-black text-white/30 tracking-widest ml-1">Traveler Name</label>
                        <div className="relative"><User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={14}/><input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full p-4 pl-12 bg-white/5 rounded-2xl border border-white/5 outline-none text-[10px] font-black uppercase focus:border-[#e7d393]/30" /></div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[8px] uppercase font-black text-white/30 tracking-widest ml-1">Guests</label>
                            <input type="number" value={guests} onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value)))} className="w-full p-4 bg-white/5 rounded-2xl border border-white/5 outline-none text-[10px] font-black text-[#e7d393]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[8px] uppercase font-black text-white/30 tracking-widest ml-1">Mobile No.</label>
                            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+91" className="w-full p-4 bg-white/5 rounded-2xl border border-white/5 outline-none text-[10px] font-black uppercase" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 pt-6 border-t border-white/5 opacity-30">
                    <div className="flex items-center gap-2"><Fingerprint size={14}/><span className="text-[7px] font-black uppercase tracking-widest">Biometric Sync</span></div>
                    <div className="flex items-center gap-2"><Lock size={14}/><span className="text-[7px] font-black uppercase tracking-widest">End-to-End</span></div>
                </div>
              </div>

              {/* Payment Side */}
              <div className="p-12 bg-[#111] flex flex-col items-center justify-center text-center">
                {bookingStatus === "idle" ? (
                  <>
                    <div className="mb-8">
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-1">Payable Amount</p>
                        <h2 className="text-5xl font-black italic tracking-tighter">₹{finalPayable.toLocaleString('en-IN')}</h2>
                        <div className="mt-2 text-green-500 text-[8px] font-black uppercase tracking-widest">15% Early Bird Discount Applied</div>
                    </div>

                    <div className="relative p-6 bg-white rounded-[3rem] mb-8 shadow-2xl">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=tourmitra@upi&pn=TourMitra&am=${finalPayable.toFixed(0)}&cu=INR`} alt="QR" className="w-44 h-44" />
                        <div className="absolute -top-3 -right-3 bg-[#e7d393] p-3 rounded-2xl text-black"><Zap size={20} fill="black" /></div>
                    </div>

                    <button onClick={() => {
                        if (!fullName || !mobile) { alert("Details missing!"); return; }
                        setBookingStatus("loading");
                        setTimeout(() => setBookingStatus("success"), 2500);
                    }} className="w-full py-5 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#e7d393] transition-all">Verify & Confirm</button>
                    <p className="mt-4 text-[8px] text-white/20 uppercase tracking-[0.4em]">Scan via GPay, PhonePe or Any UPI</p>
                  </>
                ) : bookingStatus === "loading" ? (
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-14 h-14 border-4 border-[#e7d393]/10 border-t-[#e7d393] rounded-full animate-spin" />
                        <p className="text-[#e7d393] text-[10px] font-black uppercase tracking-widest animate-pulse">Confirming Transaction...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-8">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(34,197,94,0.3)]"><CheckCircle2 size={40} /></motion.div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Trip<br/>Secured!</h2>
                        <button onClick={() => router.push('/service')} className="px-10 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:invert transition-all">Go to Dashboard</button>
                    </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}