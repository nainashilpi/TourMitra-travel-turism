"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, User, Copy, Check, Sparkles } from "lucide-react";
import { Message } from "@/types/chat";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {/* Empty State */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
          <div className="w-20 h-20 rounded-3xl bg-[#e7d393]/10 border border-[#e7d393]/20 flex items-center justify-center mb-6">
            <Sparkles size={32} className="text-[#e7d393]" />
          </div>
          <h3 className="text-white font-bold text-xl tracking-tight mb-3">
            Welcome to TourMitra
          </h3>
          <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">
            Your personal travel concierge. Ask me anything about destinations, bookings, or itineraries.
          </p>

          {/* Quick Suggestions */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {["Plan a trip", "Find hotels", "Travel tips"].map((suggestion) => (
              <span
                key={suggestion}
                className="
                  px-4 py-2 
                  bg-white/[0.03] border border-white/10 
                  rounded-full 
                  text-[10px] font-bold text-white/50 uppercase tracking-widest
                  hover:border-[#e7d393]/30 hover:text-[#e7d393]
                  cursor-pointer transition-all
                "
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex gap-3 ${
            message.role === "user" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Avatar */}
          <div
            className={`
              flex-shrink-0 w-10 h-10 rounded-xl 
              flex items-center justify-center
              ${message.role === "assistant"
                ? "bg-[#e7d393]/10 border border-[#e7d393]/20"
                : "bg-white/5 border border-white/10"
              }
            `}
          >
            {message.role === "assistant" ? (
              <Bot className="h-5 w-5 text-[#e7d393]" />
            ) : (
              <User className="h-5 w-5 text-white/60" />
            )}
          </div>

          {/* Message Bubble */}
          <div
            className={`
              group relative max-w-[80%] px-5 py-4 rounded-2xl
              ${message.role === "user"
                ? "bg-[#e7d393] text-black rounded-tr-none"
                : "bg-white/[0.03] border border-white/5 text-white/80 rounded-tl-none"
              }
            `}
          >
            <div className="whitespace-pre-wrap break-words text-sm font-light leading-relaxed">
              {message.content}
            </div>

            {/* Copy Button (Bot messages only) */}
            {message.role === "assistant" && message.content && (
              <button
                onClick={() => copyToClipboard(message.content, index)}
                className="
                  absolute -top-2 -right-2 
                  opacity-0 group-hover:opacity-100 
                  transition-all duration-300
                  w-7 h-7 rounded-lg
                  bg-[#0a0a0a] border border-white/10
                  flex items-center justify-center
                  hover:border-[#e7d393]/30
                  shadow-lg
                "
                title="Copy message"
              >
                {copiedId === index ? (
                  <Check className="h-3 w-3 text-[#e7d393]" />
                ) : (
                  <Copy className="h-3 w-3 text-white/50" />
                )}
              </button>
            )}
          </div>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}