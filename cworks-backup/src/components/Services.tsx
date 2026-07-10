"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerChildren, StaggerItem } from "./AnimatedSection";

const SERVICES = [
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.21 2.21 3.28 5 3.28 9s-1.07 6.79-3.28 9c-2.21-2.21-3.28-5-3.28-9s1.07-6.79 3.28-9z" />
      </svg>
    ),
    title: "Web Development",
    description:
      "Responsive, fast websites built from the ground up — from landing pages to full business platforms.",
    features: ["Custom design", "Mobile-first", "SEO optimized", "Source code handover"],
    price: "From UGX 350,000",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="M17.5 14v7M14 17.5h7" />
      </svg>
    ),
    title: "UI/UX Design",
    description:
      "Thoughtful, user-centred interfaces — from wireframes to polished, responsive layouts that convert.",
    features: ["Figma prototyping", "User research", "Design systems", "Dev handoff"],
    price: "From UGX 100,000",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    title: "Graphic Design",
    description:
      "Logos, brand identities, social media assets, and print materials — built to be remembered.",
    features: ["Brand identity", "Logo suites", "Print-ready", "Social assets"],
    price: "From UGX 80,000",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
    title: "Database Management",
    description:
      "Custom database systems — structured storage, fast queries, reliable backups, and ongoing management.",
    features: ["Schema design", "MySQL/PostgreSQL", "Migration", "Optimization"],
    price: "From UGX 200,000",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v6m0 0H3m6 0h12M3 9v10a2 2 0 002 2h4m-6-12h18v10a2 2 0 01-2 2h-4m0 0H9m6 0v-6" />
      </svg>
    ),
    title: "System Building",
    description:
      "Custom desktop and web systems — inventory, booking, payroll, and internal business software built to your spec.",
    features: ["Custom modules", "Role-based access", "Reporting", "Staff training"],
    price: "From UGX 500,000",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-surface/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="max-w-3xl">
          <span className="text-sm font-mono text-cyan uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Full-service digital.
            <br />
            <span className="text-neutral-500">Every layer, covered.</span>
          </h2>
        </AnimatedSection>

        {/* Services grid */}
        <StaggerChildren className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative h-full rounded-2xl border border-white/5 bg-background p-8 transition-all duration-300 hover:border-cyan/20"
              >
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10 text-cyan transition-colors group-hover:bg-cyan/20">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>

                {/* Description */}
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-white/5 bg-white/3 px-3 py-1 text-xs text-neutral-500"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="mt-6 pt-5 border-t border-white/5">
                  <span className="text-sm font-semibold text-cyan">{service.price}</span>
                </div>

                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-cyan/5 via-transparent to-transparent" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <p className="text-neutral-500">
            Need something else?{" "}
            <a
              href="#contact"
              className="text-cyan underline underline-offset-4 transition-colors hover:text-cyan-light"
            >
              Let&apos;s talk about your project.
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
