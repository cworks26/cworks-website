"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import BeamsBackground from "@/components/Backgrounds/Beams";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const benefits = [
  { title: "Free Consultation", desc: "No-obligation discovery call" },
  { title: "Custom Solutions", desc: "Tailored to your exact needs" },
  { title: "On-Time Delivery", desc: "Deadlines we actually meet" },
  { title: "Ongoing Support", desc: "We're here after launch" },
];

const Upgrade = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="contact">
      <BeamsBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkmode/90 via-darkmode/60 to-darkmode/90 z-[1]" />

      <div className="container mx-auto lg:max-w-screen-xl px-4 relative z-10">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">
            Let&apos;s Talk
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to build{" "}
            <span className="gradient-text">something great?</span>
          </h2>
          <p className="text-muted text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Let&apos;s discuss your project and turn your vision into reality.
            No fluff, no hard sell — just a conversation about what you need.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto text-left">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Icon
                    icon="ph:check-bold"
                    width="20"
                    height="20"
                    className="text-primary"
                  />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-muted text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary glow-hover">
              Contact Us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/portfolio" className="btn-outline">
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Upgrade;
