"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ArrowUpRight, 
  Globe, 
  Compass, 
  Zap, 
  Users 
} from "lucide-react";
import {
  founders,
  teamMembers,
  posts,
  getMemberById,
  getAllMembers,
  type Founder,
  type TeamMember,
  type Post,
} from "./aboutData";

// --- Custom SVGs (Build-Safe) ---
const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const ShieldCheckIcon = ({ size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

const fader = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// --- Unified Card Component (Restored Design) ---
const TeamMemberCard = ({ member, isMentor = false }: { member: TeamMember | Founder, isMentor?: boolean }) => (
  <motion.div variants={fader} className="group relative">
    {/* Dynamic Height for Mentors */}
    <div className={`relative ${isMentor ? 'h-[540px]' : 'h-[480px]'} w-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#0a0a0a]`}>
      
      {/* Normal Color by default, subtle grayscale only if needed */}
      <Image 
        src={member.image} 
        alt={member.name} 
        fill 
        className="object-cover transition-all duration-700 opacity-90 group-hover:opacity-60 group-hover:scale-105 group-hover:blur-[2px]" 
      />
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
      
      {/* Social Overlay (Slide-in + Scale) */}
      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
        {member.socialLinks.linkedin && (
           <a href={member.socialLinks.linkedin} target="_blank" className="w-12 h-12 bg-[#e7d393] text-black rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"><LinkedinIcon size={20} /></a>
        )}
        {member.socialLinks.instagram && (
           <a href={member.socialLinks.instagram} target="_blank" className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"><InstagramIcon size={20} /></a>
        )}
        {member.socialLinks.github && (
           <a href={member.socialLinks.github} target="_blank" className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"><GithubIcon size={20} /></a>
        )}
      </div>

      <div className="absolute bottom-10 left-10 right-10 z-10 group-hover:opacity-20 transition-opacity">
        <span className="text-[#e7d393]/50 text-[8px] font-black uppercase tracking-[0.3em] mb-2 block">
           {isMentor ? 'Lead Mentor' : (member as TeamMember).year + ' Year'} // Est. {member.year}
        </span>
        <h4 className="text-3xl font-bold text-white tracking-tighter mb-1 leading-none">{member.name}</h4>
        <p className="text-white/30 text-[10px] font-medium uppercase tracking-widest">{member.role}</p>
      </div>
    </div>
  </motion.div>
);

export default function AboutPage() {
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const allMembers = getAllMembers();
  const filteredPosts = selectedAuthor === "all" ? posts : posts.filter((p) => p.authorId === selectedAuthor);

 return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#e7d393] selection:text-black font-sans">
      
      {/* ── CONSISTENT STICKY BACKGROUND (SITUATED LIKE CONTACT SECTION) ── */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image 
          src="/tourists.png" 
          alt="TourMitra BG" 
          fill 
          priority 
          className="object-cover opacity-35" // No grayscale, full opacity
        />
        {/* Same light gradient as contact section for consistency */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#050505]" />
      </div>

      <div className="relative z-10">
        {/* ... Rest of your sections (Hero, Leadership, Core Team, Log) stay exactly the same */}
        
        {/* 1. PROFESSIONAL CENTERED HERO SECTION */}
        <section className="pt-45 pb-32 px-6 text-center relative">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto ">
            
            <motion.div variants={fader} className="flex justify-center items-center gap-4 mb-8">
               <div className="h-[1px] w-8 bg-[#e7d393]/50" />
               <span className="text-[#e7d393] font-black text-[10px] tracking-[0.6em] uppercase">
                 The Architects of Adventure
               </span>
               <div className="h-[1px] w-8 bg-[#e7d393]/50" />
            </motion.div>

            <motion.h1 variants={fader} className="text-7xl md:text-[8rem] font-light tracking-tighter leading-[0.8] mb-12">
              The Faces Behind <span className="font-bold italic text-[#e7d393]">TourMitra.</span>
            </motion.h1>

            <motion.div variants={fader} className="max-w-2xl mx-auto space-y-8">
              <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
                We are a collective of developers, designers, and travelers building the future of personalized exploration. 
                Our mission is to turn every journey into a seamless digital narrative.
              </p>
              
              <div className="flex flex-wrap justify-center gap-10 pt-8 border-t border-white/5">
                <div className="text-left">
                  <p className="text-[#e7d393] text-[10px] font-black uppercase tracking-widest mb-1">MERN Stack</p>
                  <p className="text-white/20 text-[9px] uppercase font-bold">Robust Architecture</p>
                </div>
                <div className="text-left">
                  <p className="text-[#e7d393] text-[10px] font-black uppercase tracking-widest mb-1">24/7 Support</p>
                  <p className="text-white/20 text-[9px] uppercase font-bold">Human Centric</p>
                </div>
                <div className="text-left">
                  <p className="text-[#e7d393] text-[10px] font-black uppercase tracking-widest mb-1">500+ Logs</p>
                  <p className="text-white/20 text-[9px] uppercase font-bold">Shared Memories</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. LEADERSHIP SECTION */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-24">
              <span className="text-[#e7d393] text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">The Leadership</span>
              <h2 className="text-6xl font-light tracking-tighter text-white">The Visionaries</h2>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {founders.map((founder) => (
                <TeamMemberCard key={founder.id} member={founder} isMentor={true} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. CORE TEAM SECTION */}
        <section className="py-40 px-6 relative bg-[#050505]/60 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto">
            <div className="mb-24 flex items-end justify-between">
               <h2 className="text-6xl font-bold tracking-tighter">Team TourMitra</h2>
               <div className="h-[1px] flex-grow mx-12 bg-white/10 hidden md:block" />
               <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">Est. 2026</span>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. THE LOG SECTION */}
        <section className="py-40 px-6 relative">
          <div className="container mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#e7d393] text-[9px] font-black uppercase tracking-[1em] mb-4 block Archive-block">Archive</span>
              <h2 className="text-5xl font-light text-white tracking-tighter">The Travel Log</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-12 mb-24">
              <div 
                onClick={() => setSelectedAuthor("all")}
                className={`cursor-pointer group flex flex-col items-center gap-4 transition-all ${selectedAuthor === "all" ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
              >
                <div className="w-20 h-20 rounded-full border-2 border-[#e7d393] flex items-center justify-center text-[10px] font-black text-[#e7d393] group-hover:bg-[#e7d393] group-hover:text-black transition-all">ALL</div>
                <span className="text-[9px] font-black uppercase tracking-widest mt-1">Stories</span>
              </div>
              
              {allMembers.slice(0, 6).map((member) => (
                <div 
                  key={member.id}
                  onClick={() => setSelectedAuthor(member.id)}
                  className={`cursor-pointer group flex flex-col items-center gap-4 transition-all ${selectedAuthor === member.id ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#e7d393] transition-all p-1">
                    <Image src={member.image} alt={member.name} fill className="object-cover rounded-full" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest mt-1">{member.name.split(" ")[0]}</span>
                </div>
              ))}
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post) => (
                  <motion.div 
                    layout 
                    key={post.id} 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden hover:border-[#e7d393]/20 transition-all duration-500"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-10">
                      <h4 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#e7d393] transition-colors">{post.title}</h4>
                      <p className="text-white/30 text-sm font-light line-clamp-3 mb-8">{post.description}</p>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-[#e7d393] transition-colors">
                        View Report <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

      </div>
      
      <div className="fixed bottom-10 right-10 z-50 flex items-center gap-6 pointer-events-none">
        <div className="h-[1px] w-20 bg-[#e7d393]/20" />
        <span className="text-[9px] font-black text-white uppercase tracking-[0.6em] italic opacity-30">
          Tour<span className="text-[#e7d393]">Mitra</span> v3.0 // Collective Narrative
        </span>
      </div>
    </div>
  );
}