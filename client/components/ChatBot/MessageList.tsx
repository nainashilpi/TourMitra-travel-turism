"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, User, Copy, Check } from "lucide-react";
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
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          {/* <Bot className="h-16 w-16 mb-4 opacity-50" /> */}
          <img src="/logo.png" alt="" className="h-[90px]"/>
          <p className="text-lg font-medium">How Can Help you </p>
          <p className="text-sm">Ask me anything...</p>
        </div>
      )}

      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex gap-3 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-slate-900 via-blue-950 to-black flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
          )}

          <div
            className={`group relative max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role === "user"
                ? "bg-gradient-to-r from-slate-900 via-blue-800 to-black text-white"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
            }`}
          >
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>

            {message.role === "assistant" && (
              <button
                onClick={() => copyToClipboard(message.content, index)}
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-700 rounded-full p-1.5 shadow-lg"
                title="Copy message"
              >
                {copiedId === index ? (
                  <Check className="h-3 w-3 text-blue-100" />
                ) : (
                  <Copy className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            )}
          </div>

          {message.role === "user" && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}