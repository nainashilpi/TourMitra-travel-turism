"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Message } from "@/types/chat";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to get response");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages([...newMessages, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantMessage += chunk;

        setMessages([
          ...newMessages,
          { role: "assistant", content: assistantMessage },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Please try again."}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop Overlay ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* ── Side Drawer (Height Adjusted for Navbar) ── */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="
              fixed right-0 z-50
              
              /* ✅ Navbar offset - adjust based on your navbar height */
              top-20 
              h-[calc(100vh-5rem)]
              
              w-full sm:w-[420px]
              bg-[#0a0a0a]/95
              backdrop-blur-2xl
              border-l border-t border-white/10
              shadow-[0_0_100px_-20px_rgba(0,0,0,0.9)]
              flex flex-col
              overflow-hidden
              
              /* ✅ Rounded top corner */
              rounded-tl-3xl
            "
          >
            {/* ── Header ── */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e7d393]/10 border border-[#e7d393]/20 flex items-center justify-center">
                  <Sparkles size={20} className="text-[#e7d393]" />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-tight text-lg">
                    TourMitra Concierge
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="
                  w-10 h-10 rounded-xl
                  bg-white/[0.03] border border-white/10
                  flex items-center justify-center
                  text-white/50 hover:text-white
                  hover:bg-white/[0.08] hover:border-[#e7d393]/30
                  transition-all duration-300
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Messages ── */}
            <MessageList messages={messages} />

            {/* ── Input ── */}
            <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}