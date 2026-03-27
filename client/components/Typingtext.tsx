"use client";
import { useEffect, useState } from "react";

const texts = [
  "Travel Smarter...",
  "Travel Better...",
  "Travel With TourMitra",
];

export default function TypingText() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < texts[index].length) {
        setSubIndex(subIndex + 1);
      } else if (deleting && subIndex > 0) {
        setSubIndex(subIndex - 1);
      } else if (!deleting && subIndex === texts[index].length) {
        setDeleting(true);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((index + 1) % texts.length);
      }
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <h1 className="text-2xl md:text-4xl font-bold text-white">
      {texts[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </h1>
  );
}