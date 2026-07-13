"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CardSlider from "./slider";
import { getImagePrefix } from "@/utils/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: easeOutExpo },
      };

  const fadeUpDelayed = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.15, ease: easeOutExpo },
      };

  const fadeUpDelayed2 = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.3, ease: easeOutExpo },
      };

  const imageReveal = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.92 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1.2, delay: 0.2, ease: easeOutExpo },
      };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      id="main-banner"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-darkmode via-darkmode/95 to-darkmode" />

      {/* Floating glow orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[128px] opacity-20 transition-transform duration-1000"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
          top: "10%",
          left: `${50 + mousePos.x * 15}%`,
          transform: `translate(-50%, -50%) translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[96px] opacity-15 transition-transform duration-1500"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
          bottom: "20%",
          right: "10%",
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
        }}
      />

      <div className="container mx-auto lg:max-w-screen-xl px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div {...fadeUp} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-primary text-sm font-bold">CW</span>
              </div>
              <span className="text-muted-light text-sm tracking-widest uppercase">
                Kampala-Based Digital Agency
              </span>
            </motion.div>

            <motion.h1
              {...fadeUpDelayed}
              className="text-5xl md:text-7xl lg:text-[5rem] font-bold leading-[1.05] tracking-tight mb-8"
            >
              <span className="gradient-text block">We Build Digital.</span>
              <span className="block text-white">We Ship Results.</span>
            </motion.h1>

            <motion.p
              {...fadeUpDelayed2}
              className="text-muted text-lg leading-relaxed mb-10 max-w-lg"
            >
              CWorks is a Kampala-based digital agency crafting high-performance
              websites, stunning UI/UX, and scalable systems for businesses
              across East Africa.
            </motion.p>

            <motion.div
              {...fadeUpDelayed2}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/contact" className="btn-primary glow-hover">
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/services" className="btn-outline">
                Our Services
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              {...fadeUpDelayed2}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-dark_border/50"
            >
              <div>
                <span className="block text-2xl font-bold gradient-text">50+</span>
                <span className="text-muted text-sm">Projects</span>
              </div>
              <div className="w-px h-10 bg-dark_border/50" />
              <div>
                <span className="block text-2xl font-bold gradient-text">30+</span>
                <span className="text-muted text-sm">Clients</span>
              </div>
              <div className="w-px h-10 bg-dark_border/50" />
              <div>
                <span className="block text-2xl font-bold gradient-text">5+</span>
                <span className="text-muted text-sm">Years</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Parallax image */}
          <motion.div
            {...imageReveal}
            className="relative lg:block hidden"
            style={{
              transform: reducedMotion ? undefined : `translateX(${mousePos.x * -10}px) translateY(${mousePos.y * -10}px)`,
              transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="relative">
              {/* Decorative glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent-light/20 rounded-3xl blur-3xl" />
              <Image
                src={`${getImagePrefix()}images/hero/hero-section-image-3.png`}
                alt="CWorks digital agency hero banner"
                width={700}
                height={700}
                priority
                loading="eager"
                className="relative z-10 drop-shadow-2xl"
              />
              {/* Floating tech badge */}
              <motion.div
                animate={reducedMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 z-20 glass px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-muted-light">Available for projects</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom: CardSlider */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20"
        >
          <CardSlider />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
