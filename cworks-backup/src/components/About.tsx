"use client";

import { AnimatedSection, StaggerChildren, StaggerItem } from "./AnimatedSection";

const VALUES = [
  { title: "Honesty", desc: "Transparent processes, clear communication, no hidden surprises." },
  { title: "Teamwork", desc: "Collaborative at our core — we build together and win together." },
  { title: "Creativity", desc: "Fresh ideas, thoughtful design, solutions that stand out." },
  { title: "Genuine Care", desc: "Every project matters. Your success is our success." },
];

const TECH_STACK = [
  "Python", "Java", "TypeScript", "React", "Next.js",
  "Node.js", "PHP", "MySQL", "PostgreSQL", "Figma", "Tailwind",
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="max-w-3xl">
          <span className="text-sm font-mono text-cyan uppercase tracking-wider">
            About Us
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
            We began as a group of learners.
            <br />
            <span className="text-neutral-500">Now we build for the world.</span>
          </h2>
          <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
            CWorks started with curiosity and a shared belief: that quality digital
            work should be accessible to every business in Uganda. We design,
            build, and ship websites, brands, and custom systems — with honesty,
            creativity, and genuine care for every project.
          </p>
        </AnimatedSection>

        {/* Values grid */}
        <StaggerChildren className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <div className="group rounded-2xl border border-white/5 bg-surface p-6 transition-all duration-300 hover:border-cyan/20 hover:bg-surface-elevated">
                <div className="mb-3 h-1 w-8 rounded-full bg-cyan transition-all duration-300 group-hover:w-12" />
                <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Tech stack */}
        <AnimatedSection delay={0.2} className="mt-16">
          <span className="text-sm font-mono text-cyan uppercase tracking-wider">
            Our Stack
          </span>
          <div className="mt-4 flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 text-sm text-cyan-light font-mono transition-colors hover:bg-cyan/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
