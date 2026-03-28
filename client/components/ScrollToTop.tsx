"use client";
import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Small delay to override any component auto-focus/scroll
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 100);

    return () => clearTimeout(t);
  }, []);

  return null;
}