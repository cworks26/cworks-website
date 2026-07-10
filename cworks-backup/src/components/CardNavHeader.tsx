"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

// ---------------------------------------------------------------------------
// Navigation link definitions — preserved from original Header
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const CARD_NAV_ITEMS = [
  {
    label: "About",
    href: "#about",
    bgColor: "#050F67",
    textColor: "#ffffff",
    description: "Who we are and what drives us",
  },
  {
    label: "Services",
    href: "#services",
    bgColor: "#0815A6",
    textColor: "#ffffff",
    description: "Web, design, branding & more",
  },
  {
    label: "Portfolio",
    href: "#portfolio",
    bgColor: "#0815A6",
    textColor: "#ffffff",
    description: "Recent projects & case studies",
  },
  {
    label: "Team",
    href: "#team",
    bgColor: "#1E0339",
    textColor: "#ffffff",
    description: "Meet the people behind CWorks",
  },
  {
    label: "Contact",
    href: "#contact",
    bgColor: "#1E0339",
    textColor: "#ffffff",
    description: "Start your project with us",
  },
];

// ---------------------------------------------------------------------------
// Scroll constants
// ---------------------------------------------------------------------------

const SCROLL_THRESHOLD = 40;
const TOP_THRESHOLD = 10;

// ---------------------------------------------------------------------------
// CardNavHeader
// ---------------------------------------------------------------------------

export function CardNavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // -----------------------------------------------------------------------
  // Scroll handler — disappearing navbar logic
  // -----------------------------------------------------------------------

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const atTop = currentY < TOP_THRESHOLD;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 20);

      if (!atTop) {
        if (delta > SCROLL_THRESHOLD && visible) {
          setVisible(false);
        }
        if (delta < -SCROLL_THRESHOLD && !visible) {
          setVisible(true);
        }
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, [visible]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Show when reaching top
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < TOP_THRESHOLD && !visible) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  // Lock body scroll when nav is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  // Close nav on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navOpen) setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <>
      {/* ---- Fixed header bar ---- */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-[250ms] ease-in-out",
          visible ? "translate-y-0 pt-4" : "-translate-y-[calc(100%+24px)]",
          scrolled ? "pt-3" : "pt-4"
        )}
        role="banner"
      >
        <div
          className={cn(
            "flex w-full max-w-5xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 md:px-8",
            "bg-white shadow-lg shadow-black/8 ring-1 ring-black/4",
            scrolled && "shadow-xl shadow-black/10"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan rounded-sm"
            aria-label="CWorks — Go to homepage"
          >
            <Logo
              width={120}
              height={66}
              loading="eager"
              fetchPriority="high"
              className="h-7 w-auto md:h-8"
            />
          </Link>

          {/* Desktop nav links */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-7"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan rounded-sm"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setNavOpen(true)}
              className="rounded-full bg-[#0815A6] px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#050F67] hover:shadow-lg hover:shadow-cyan/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan cursor-pointer"
              aria-label="Open full navigation"
            >
              Menu
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="flex md:hidden flex-col gap-1.5 p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan rounded-sm cursor-pointer"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            aria-controls="card-nav-overlay"
          >
            <motion.span
              animate={navOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-neutral-800"
            />
            <motion.span
              animate={navOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-neutral-800"
            />
            <motion.span
              animate={navOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-neutral-800"
            />
          </button>
        </div>
      </header>

      {/* ---- Card Nav Overlay ---- */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            id="card-nav-overlay"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ delay: 0.2 }}
              onClick={() => setNavOpen(false)}
              className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close navigation"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Card grid */}
            <div className="grid w-full max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {CARD_NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.9 }}
                  transition={{
                    delay: index * 0.07,
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setNavOpen(false)}
                  className={cn(
                    "relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-300",
                    "border border-white/10 shadow-lg",
                    hoveredIndex === index
                      ? "scale-[1.03] shadow-xl"
                      : "scale-100"
                  )}
                  style={{
                    backgroundColor:
                      hoveredIndex === index ? item.bgColor : "rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Background color fill on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl -z-0"
                    initial={false}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ backgroundColor: item.bgColor }}
                  />

                  {/* Content */}
                  <div className="relative z-[1]">
                    <span
                      className="text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300"
                      style={{
                        color:
                          hoveredIndex === index
                            ? item.textColor
                            : "#ffffff",
                      }}
                    >
                      {item.label}
                    </span>
                    <p
                      className="mt-2 text-sm transition-colors duration-300"
                      style={{
                        color:
                          hoveredIndex === index
                            ? item.textColor
                            : "#a3a3a3",
                        opacity: 0.8,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow icon */}
                  <motion.div
                    className="absolute bottom-4 right-4"
                    animate={{
                      x: hoveredIndex === index ? 4 : 0,
                      y: hoveredIndex === index ? -4 : 0,
                      opacity: hoveredIndex === index ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        color:
                          hoveredIndex === index
                            ? item.textColor
                            : "#ffffff",
                      }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </motion.a>
              ))}

              {/* Start a Project card (spans full width) */}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.9 }}
                transition={{
                  delay: CARD_NAV_ITEMS.length * 0.07,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                onClick={() => setNavOpen(false)}
                className={cn(
                  "col-span-full relative overflow-hidden rounded-2xl p-5 md:p-6 transition-all duration-300",
                  "bg-cyan text-black border border-cyan/30 shadow-lg hover:shadow-xl hover:shadow-cyan/20 hover:scale-[1.01]"
                )}
              >
                <div className="relative z-[1] flex items-center justify-between">
                  <div>
                    <span className="text-lg md:text-xl font-bold">
                      Start a Project
                    </span>
                    <p className="mt-1 text-sm opacity-80">
                      Tell us about your idea — we&apos;ll get back within 24 hours
                    </p>
                  </div>
                  <svg
                    className="h-6 w-6 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
