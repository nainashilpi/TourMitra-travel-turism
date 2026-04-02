"use client";

import { useParams, useRouter } from "next/navigation";
import { TRIPS } from "@/constants/Tripsdata";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  MapPin, Star, ChevronLeft, CheckCircle2, 
  Clock, ShieldCheck, CreditCard, Sparkles,
  Wifi, Coffee, Car, Camera, Info, X, Zap, 
  Lock, ShieldAlert, BadgeCheck
} from "lucide-react";
import { useState, useEffect } from "react";

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("itinerary");
  const [showPayment, setShowPayment] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "applying" | "loading" | "success">("idle");
  const [mounted, setMounted] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const trip = TRIPS.find((t) => String(t.id) === String(params?.id));
  
  if (!mounted) return null;
  if (!trip) return <div className="min-h-screen bg-black flex items-center justify-center">Trip Not Found</div>;

  const discountPrice = trip.price * 0.85; 

  const handleInitialBooking = () => {
    setBookingStatus("applying");
    setTimeout(() => {
        setAppliedDiscount(true);
        setShowPayment(true);
        setBookingStatus("idle");
    }, 1500);
  };

  const handleFinalPayment = () => {
    setBookingStatus("loading");
    setTimeout(() => setBookingStatus("success"), 3500);
  };

  const facilities = [
    { icon: <Wifi size={18}/>, label: "5G Connectivity", desc: "Always connected" },
    { icon: <Coffee size={18}/>, label: "Luxury Buffet", desc: "All meals included" },
    { icon: <Car size={18}/>, label: "Private Chauffeur", desc: "24/7 Transport" },
    { icon: <Camera size={18}/>, label: "Drone Coverage", desc: "Personal photography" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#e7d393] selection:text-black overflow-x-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0">
        <Image src={trip.image} alt="Background" fill className="object-cover opacity-10 blur-[100px]" />
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-20">
        
        {/* TOP NAV */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <button onClick={() => router.back()} className="group flex items-center gap-3 text-white/40 hover:text-[#e7d393] transition-all">
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#e7d393]/10 border border-white/5"><ChevronLeft size={18} /></div>
                <span className="text-[9px] font-black uppercase tracking-widest">Back to Dashboard</span>
            </button>
            <div className="flex items-center gap-4 bg-yellow-500/10 border border-yellow-500/20 px-5 py-2.5 rounded-full">
                <Sparkles size={14} className="text-yellow-500 animate-pulse" />
                <span className="text-yellow-500 text-[9px] font-black uppercase tracking-wider italic">Exclusive Hackathon Offer: 15% Off Applied</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative h-[500px] md:h-[650px] rounded-[4rem] overflow-hidden border border-white/10 group shadow-2xl">
              <Image src={trip.image} alt={trip.title} fill className="object-cover transition-transform duration-[3s] group-hover:scale-110" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-12 left-12">
                <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none uppercase drop-shadow-2xl">{trip.title}</h1>
              </div>
            </motion.div>

            <div className="bg-[#111]/50 border border-white/5 rounded-[3.5rem] p-10 backdrop-blur-2xl">
              <div className="flex gap-10 border-b border-white/5 mb-10 overflow-x-auto no-scrollbar">
                {["itinerary", "facilities", "map", "reviews"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-5 text-[10px] font-black uppercase tracking-[0.3em] relative transition-all ${activeTab === tab ? "text-[#e7d393]" : "text-white/20"}`}>
                    {tab}
                    {activeTab === tab && <motion.div layoutId="navline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e7d393]" />}
                  </button>
                ))}
              </div>

              <div className="min-h-[350px]">
                {activeTab === "facilities" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95 duration-500">
                        {facilities.map((f, i) => (
                            <div key={i} className="flex items-center gap-6 p-7 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all">
                                <div className="p-4 bg-[#e7d393]/10 text-[#e7d393] rounded-2xl border border-[#e7d393]/20">{f.icon}</div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white">{f.label}</h4>
                                    <p className="text-[9px] text-white/30 uppercase mt-1 tracking-wider">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "map" && (
                  <div className="relative h-[400px] w-full rounded-[3rem] overflow-hidden border border-white/10">
                    <iframe 
                      width="100%" height="100%" 
                      style={{ filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(100%)", border: 0 }}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=68,8,97,37&layer=mapnik`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                {activeTab === "itinerary" && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex gap-6 items-start">
                                <span className="text-3xl font-black italic text-[#e7d393]/20">0{i}</span>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-[#e7d393]">Expedition Phase {i}</h4>
                                    <p className="mt-1 text-xs text-white/40 italic">Premium stay and guided tours of elite locations.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
                        {[
                            { name: "Aryan M.", comment: "TourMitra's UI is next level. Loved it!", init: "AM" },
                            { name: "Naina S.", comment: "Seamless experience from booking to travel.", init: "NS" },
                            { name: "Vikram R.", comment: "The MERN stack performance is visible here.", init: "VR" },
                            { name: "Sarah L.", comment: "Best travel decision of 2026.", init: "SL" },
                        ].map((rev, i) => (
                            <div key={i} className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#e7d393] text-black flex items-center justify-center font-black text-[10px]">{rev.init}</div>
                                    <span className="text-[9px] font-black uppercase tracking-widest">{rev.name}</span>
                                </div>
                                <p className="text-[11px] text-white/40 italic leading-relaxed">"{rev.comment}"</p>
                            </div>
                        ))}
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              <div className="bg-[#111] border border-white/10 p-10 rounded-[4rem] relative overflow-hidden shadow-2xl">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-2">Total Capital</p>
                    <h2 className="text-5xl font-black italic tracking-tighter">
                        ₹{appliedDiscount ? discountPrice.toLocaleString() : trip.price.toLocaleString()}
                    </h2>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl"><ShieldCheck size={20} className="text-[#e7d393]" /></div>
                </div>

                <div className="space-y-4 mb-10 border-y border-white/5 py-8">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/30">
                    <span>Base Package</span>
                    <span>₹{(trip.price * 0.88).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/30">
                    <span>Service & VAT</span>
                    <span>₹{(trip.price * 0.12).toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleInitialBooking}
                  disabled={bookingStatus === "applying"}
                  className="w-full py-6 bg-white text-black rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#e7d393] transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <Lock size={14} /> {bookingStatus === "applying" ? "Syncing..." : "Initialize Booking"}
                </button>

                <div className="mt-10 space-y-4 border-t border-white/5 pt-8">
                    <div className="flex items-center gap-3 opacity-40">
                        <BadgeCheck size={16} className="text-green-500" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-white">SSL Encrypted Gateway</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-40">
                        <ShieldAlert size={16} className="text-[#e7d393]" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-white">PCI-DSS Compliant</span>
                    </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FINAL PAYMENT MODAL */}
      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPayment(false)} className="absolute inset-0 bg-black/98 backdrop-blur-3xl" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-md rounded-[4rem] p-12">
              <div className="text-center space-y-10">
                {bookingStatus === "idle" && (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-[#e7d393] text-[9px] font-black uppercase tracking-[0.5em]">Payment Portal</h3>
                      <h2 className="text-3xl font-black italic uppercase">Pay Securely</h2>
                    </div>

                    <div className="relative mx-auto w-60 h-60 bg-white p-6 rounded-[3.5rem] overflow-hidden">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=tourmitra@upi&pn=TourMitra&am=${discountPrice}&cu=INR`} 
                        alt="Payment QR" className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="space-y-4">
                      <p className="text-2xl font-black text-white italic">₹{discountPrice.toLocaleString()}</p>
                      <button onClick={handleFinalPayment} className="w-full py-5 bg-[#e7d393] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95">Complete Transaction</button>
                    </div>
                  </>
                )}

                {bookingStatus === "loading" && (
                  <div className="py-20 flex flex-col items-center gap-8">
                    <div className="w-20 h-20 border-4 border-white/5 border-t-blue-500 rounded-full animate-spin" />
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">Verifying Payment...</p>
                  </div>
                )}

                {bookingStatus === "success" && (
                  <div className="py-10 flex flex-col items-center gap-10">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={48} /></div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter">Access Granted</h2>
                    <button onClick={() => router.push('/service')} className="w-full py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest">Back to Dashboard</button>
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