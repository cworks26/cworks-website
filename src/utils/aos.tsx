"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type AosOptions = {
  duration?: number;
  offset?: number;
  once?: boolean;
  delay?: number;
};

const DEFAULT_OPTIONS: AosOptions = {
  duration: 600,
  offset: 80,
  once: true,
  delay: 0,
};

/**
 * Wraps children with AOS (Animate On Scroll) behavior that respects
 * `prefers-reduced-motion`. When reduced motion is requested, all
 * animations are skipped and elements render in their final visible state.
 */
export default function Aoscompo({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    // Collect all elements with data-aos attribute
    const elements = container.querySelectorAll<HTMLElement>("[data-aos]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const animation = el.dataset.aos || "fade";
          const duration = parseInt(el.dataset.aosDuration || String(DEFAULT_OPTIONS.duration), 10);
          const delay = parseInt(el.dataset.aosDelay || String(DEFAULT_OPTIONS.delay), 10);
          const once = el.dataset.aosOnce !== "false";

          // Apply animation via CSS classes
          el.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
          el.style.transitionDelay = `${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";

          // Set initial state based on animation type
          const setInitial = () => {
            switch (animation) {
              case "fade-up":
                el.style.transform = "translateY(30px)";
                el.style.opacity = "0";
                break;
              case "fade-down":
                el.style.transform = "translateY(-30px)";
                el.style.opacity = "0";
                break;
              case "fade-left":
                el.style.transform = "translateX(-30px)";
                el.style.opacity = "0";
                break;
              case "fade-right":
                el.style.transform = "translateX(30px)";
                el.style.opacity = "0";
                break;
              case "fade":
              default:
                el.style.opacity = "0";
                break;
            }
          };

          setInitial();

          // Trigger animation on next frame
          requestAnimationFrame(() => {
            el.style.opacity = "1";
            el.style.transform = "none";
          });

          if (once) {
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: `0px 0px -${DEFAULT_OPTIONS.offset}px 0px`,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [reducedMotion]);

  // When reduced motion is preferred, render elements in final visible state
  useEffect(() => {
    if (!reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>("[data-aos]");
    elements.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.transition = "none";
    });
  }, [reducedMotion, children]);

  return <div ref={containerRef}>{children}</div>;
}
