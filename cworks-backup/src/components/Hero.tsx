"use client";

import { motion } from "framer-motion";
import { BeamsBackground } from "./BeamsBackground";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#000000]"
    >
      {/* Animated Beams background — sole background effect */}
      <div className="absolute inset-0 z-0">
        <BeamsBackground
          lightColor="#0815A6"
          beamWidth={3.1}
          rotation={182}
          beamNumber={25}
          noiseIntensity={1.35}
          speed={2.2}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 z-[1] grid-pattern pointer-events-none opacity-40" />

      {/* Content */}
      <div className="relative z-[5] mx-auto max-w-5xl px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-300 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
          Kampala, Uganda
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          <span className="text-white">We build </span>
          <span className="text-cyan">digital</span>
          <span className="text-white">.</span>
          <br />
          <span className="text-white">We ship </span>
          <span className="text-cyan">results</span>
          <span className="text-white">.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 md:text-xl"
        >
          Websites. Brands. Systems. Digital products that move businesses
          forward — from Kampala to the world.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="rounded-full bg-cyan px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-cyan-light hover:shadow-xl hover:shadow-cyan/25 hover:scale-105"
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan/60 hover:text-cyan bg-white/5 backdrop-blur-sm"
          >
            Start a Project
          </a>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-2"
        >
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind",
            "Node.js",
            "Figma",
            "Python",
            "PostgreSQL",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-400 font-mono backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-neutral-500 uppercase tracking-widest">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-cyan/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
