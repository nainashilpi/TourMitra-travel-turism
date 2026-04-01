// page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

// Social Icons Components
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Social Link Button Component
const SocialButton = ({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "large";
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    className={`${
      variant === "large"
        ? "w-12 h-12 bg-white/20 hover:bg-white/30"
        : "w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40"
    } rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm border border-white/20`}
  >
    {children}
  </motion.a>
);

// Founder Card Component
const FounderCard = ({ founder }: { founder: Founder }) => (
  <motion.div
    variants={scaleIn}
    whileHover={{ scale: 1.03, y: -10 }}
    transition={{ duration: 0.3 }}
    className="relative group bg-gradient-to-r from-slate-900 via-blue-950 to-black rounded-3xl overflow-hidden shadow-2xl border border-purple-500/30"
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-purple-500/20 z-10" />
    
    {/* Animated Background Effect */}
    <div className="absolute inset-0 opacity-50">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000" />
    </div>

    <div className="relative z-20 p-8 md:p-10">
      <div className="flex flex-col items-center text-center">
        {/* Image Container */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-48 h-48 md:w-56 md:h-56 mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-950 to-black rounded-full animate-spin-slow opacity-75 blur-md" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
            <Image
              src={founder.image}
              alt={founder.name}
              fill
              className="object-cover"
            />
          </div>
          {/* Badge */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-slate-900 via-blue-950 to-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            ⭐ {founder.role.includes("Co") ? "Co-Founder" : "Founder"}
          </div>
        </motion.div>

        {/* Info */}
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {founder.name}
        </h3>
        <p className="text-blue-300 text-lg font-semibold mb-4">
          {founder.role}
        </p>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-md">
          {founder.bio}
        </p>

        {/* Social Links */}
        <div className="flex gap-4">
          <SocialButton href={founder.socialLinks.instagram} variant="large">
            <InstagramIcon />
          </SocialButton>
          <SocialButton href={founder.socialLinks.linkedin} variant="large">
            <LinkedInIcon />
          </SocialButton>
          <SocialButton href={founder.socialLinks.github} variant="large">
            <GitHubIcon />
          </SocialButton>
        </div>
      </div>
    </div>
  </motion.div>
);

// Team Member Card Component
const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -15, scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:border-purple-500/50 hover:shadow-purple-500/25 hover:shadow-2xl transition-all duration-500"
  >
    {/* Image Section */}
    <div className="relative h-64 overflow-hidden h-[80%]">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end justify-center pb-8">
        <div className="flex gap-3">
          <SocialButton href={member.socialLinks.instagram}>
            <InstagramIcon />
          </SocialButton>
          <SocialButton href={member.socialLinks.linkedin}>
            <LinkedInIcon />
          </SocialButton>
          <SocialButton href={member.socialLinks.github}>
            <GitHubIcon />
          </SocialButton>
        </div>
      </div>
    </div>

    {/* Info Section */}
    <div className="p-6 text-center">
      <h4 className="text-xl font-bold text-[#ac9c68] mb-1 group-hover:text-blue-300 transition-colors">
        {member.name}
      </h4>
      <p className="text-white font-medium">{member.role}</p>
    </div>
  </motion.div>
);

// Post Card Component
const PostCard = ({ post }: { post: Post }) => {
  const author = getMemberById(post.authorId);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:border-pink-500/50 hover:shadow-pink-500/25 hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-slate-900 via-blue-950 to-black text-white px-3 py-1 rounded-full text-xs font-semibold">
          Travel Story
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
          {post.title}
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Author Info */}
        {author && (
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/50">
              <Image
                src={author.image}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{author.name}</p>
              <p className="text-white text-xs">{author.role}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Section Title Component
const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
      <span className="bg-gradient-to-r  from-slate-900 via-blue-950 to-black bg-clip-text text-transparent">
        {title}
      </span>
    </h2>
    {subtitle && (
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
    )}
    <div className="mt-6 flex justify-center gap-2">
      <div className="w-16 h-1 bg-gradient-to-r from-slate-900 via-blue-950 to-black rounded-full" />
      <div className="w-4 h-1 bg-blue-500 rounded-full" />
      <div className="w-2 h-1 bg-blue-500 rounded-full" />
    </div>
  </motion.div>
);

// Main About Page Component
export default function AboutPage() {
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const allMembers = getAllMembers();

  const filteredPosts =
    selectedAuthor === "all"
      ? posts
      : posts.filter((post) => post.authorId === selectedAuthor);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gradient-to-r from-slate-900 via-blue-950 to-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-transparent" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 text-6xl opacity-20"
        >
          ✈️
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-10 text-6xl opacity-20"
        >
          🌍
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-40 right-1/4 text-5xl opacity-20"
        >
          🏔️
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeIn}
              className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <span className="text-blue-900-300 font-medium text-amber-50">
                 Discover Our Story
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              About{" "}
              <span className="bg-[#ac9c68] bg-clip-text text-transparent">
                TripMitra
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              We believe travel transforms lives. Our mission is to make every
              journey seamless, memorable, and accessible to everyone around the
              globe.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex justify-center gap-4 flex-wrap">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-[#ac9c68] text-sm">Countries Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-3xl font-bold text-white">100K+</div>
                <div className="text-[#ac9c68] text-sm">Happy Travelers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-[#ac9c68] text-sm">Destinations</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Meet Our Founders"
            subtitle="The visionaries behind TripMitra who turned their passion for travel into a platform that inspires millions"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {founders.map((founder) => (
              <FounderCard key={founder.id} founder={founder} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Our Amazing Team"
            subtitle="Meet the talented individuals who work tirelessly to bring you the best travel experiences"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-[80rem]"
          >
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Stories & Insights"
            subtitle="Explore travel stories, tips, and insights from our team members"
          />

          {/* Filter Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setSelectedAuthor("all")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedAuthor === "all"
                  ? "bg-gradient-to-r from-slate-900 via-blue-950 to-black text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
              }`}
            >
              All Posts
            </button>
            {allMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedAuthor(member.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedAuthor === member.id
                    ? "bg-gradient-to-r from-slate-900 via-blue-950 to-black text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                {member.name.split(" ")[0]}
              </button>
            ))}
          </motion.div>

          {/* Posts Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">
                No posts found for this author.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-black rounded-3xl p-12 md:p-16 text-center overflow-hidden border border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/10" />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who trust TripMitra for their
                adventures. Your next unforgettable experience awaits!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-slate-900 via-blue-950 to-black text-white font-bold rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 transition-shadow"
              >
                Start Exploring ✨
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="h-16" />
    </div>
  );
}