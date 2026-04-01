"use client";

import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

export default function ChatBotWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatWindow isOpen={isOpen} />
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
}