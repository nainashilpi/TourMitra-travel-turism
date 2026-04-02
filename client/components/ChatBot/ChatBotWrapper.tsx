"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ChatButton = dynamic(() => import("./ChatButton"), { ssr: false });
const ChatWindow = dynamic(() => import("./ChatWindow"), { ssr: false });

export default function ChatBotWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
}