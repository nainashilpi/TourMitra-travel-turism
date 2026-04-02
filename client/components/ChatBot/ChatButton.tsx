"use client";

import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50 
        w-16 h-16 rounded-full 
        flex items-center justify-center
        transition-all duration-500
        ${isOpen
          ? "bg-white/10 border border-white/20 rotate-90 shadow-lg"
          : "bg-[#e7d393] hover:bg-[#f0e0a8] shadow-[0_20px_50px_-10px_rgba(231,211,147,0.4)]"
        }
      `}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <X className="h-6 w-6 text-white" />
      ) : (
        <MessageCircle className="h-6 w-6 text-black" />
      )}

      {/* Ping Animation */}
      {!isOpen && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e7d393] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-[#e7d393]"></span>
        </span>
      )}
    </motion.button>
  );
}