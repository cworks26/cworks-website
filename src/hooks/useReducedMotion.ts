"use client";

import { useState, useEffect } from "react";

/**
 * Respects the user's prefers-reduced-motion OS setting.
 * Returns `true` when animations should be disabled.
 * Use with Framer Motion to disable animations for accessibility.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}
