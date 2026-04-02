"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function MessageInput({ onSend, isLoading }: MessageInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-[#0a0a0a]">
      <div className="flex gap-3 items-end">
        <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-[#e7d393]/30 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="
              w-full resize-none 
              bg-transparent 
              px-5 py-4
              text-white text-sm font-light
              placeholder:text-white/20
              focus:outline-none
            "
            rows={1}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="
            flex-shrink-0 
            w-14 h-14 
            rounded-2xl 
            bg-[#e7d393] text-black
            flex items-center justify-center
            hover:bg-white 
            active:scale-95
            transition-all duration-300
            disabled:opacity-30 disabled:cursor-not-allowed
            shadow-[0_10px_30px_-10px_rgba(231,211,147,0.3)]
          "
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Footer Text */}
      <p className="text-center mt-4 text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">
        Powered by TourMitra AI
      </p>
    </form>
  );
}