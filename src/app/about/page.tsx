"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const VALUES = [
  {
    title: "Integrity",
    description:
      "We believe in transparent processes, clear communication, and honest pricing. No hidden fees, no shortcuts — just quality work delivered with accountability.",
    icon: "🤝",
  },
  {
    title: "Innovation",
    description:
      "We stay ahead of the curve, leveraging modern technologies and creative problem-solving to build solutions that give your business a competitive edge.",
    icon: "💡",
  },
  {
    title: "Quality",
    description:
      "Every line of code, every pixel, every interaction is crafted with precision. We don't ship until it meets our standards — and yours.",
    icon: "✨",
  },
  {
    title: "Collaboration",
    description:
      "We work as an extension of your team. Regular updates, shared vision, and open feedback loops ensure we build exactly what you need.",
    icon: "🤗",
  },
];

const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PHP",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Figma",
  "Tailwind CSS",
  "Docker",
];

export default function AboutPage() {
  const reducedMotion = useReducedMotion();
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="max-w-3xl" data-aos="fade-up" data-aos-duration="800">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary text-sm font-medium uppercase tracking-wider"
            >
              About CWorks
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Kampala-Based Digital Agency Building for{" "}
              <span className="text-primary">East Africa</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted leading-relaxed"
            >
              We design, build, and ship websites, brands, and custom systems —
              with honesty, creativity, and genuine care for every project. From
              startups to established enterprises, we help businesses across
              Uganda and East Africa thrive in the digital world.
            </motion.p>
          </div>
        </div>
        {/* Gradient blobs */}
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -top-64 -right-14 -z-1"></div>
        <div className="absolute w-40 h-40 bg-gradient-to-tr from-[#1E0339] to-[#050F67] blur-300 rounded-full -bottom-32 -left-20 -z-1"></div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-up" data-aos-duration="800">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
                From a Shared Vision to a{" "}
                <span className="text-primary">Full-Service Agency</span>
              </h2>
              <p className="mt-6 text-muted leading-relaxed">
                CWorks began with a simple belief: quality digital work should be
                accessible to every business, not just those with big budgets.
                What started as a small team of passionate developers and designers
                in Kampala has grown into a full-service digital agency serving
                clients across East Africa.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Today, we are a team of dedicated professionals — developers,
                designers, project managers, and strategists — united by a shared
                commitment to craftsmanship, transparency, and results. Every
                project we take on is an opportunity to prove that great digital
                work can come from anywhere.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
              className="space-y-6"
            >
              <div className="rounded-2xl border border-dark_border bg-darkmode p-8">
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                <p className="mt-3 text-muted leading-relaxed">
                  To empower businesses across East Africa with world-class
                  digital solutions — websites, brands, and systems that drive
                  real growth — delivered with integrity, creativity, and
                  technical excellence.
                </p>
              </div>
              <div className="rounded-2xl border border-dark_border bg-darkmode p-8">
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                <p className="mt-3 text-muted leading-relaxed">
                  To be the most trusted digital partner in East Africa — known
                  not just for the quality of our work, but for the relationships
                  we build and the impact we create.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div
            className="text-center max-w-2xl mx-auto mb-16"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
              What <span className="text-primary">Drives Us</span>
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              These core principles guide every decision we make and every
              project we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-dark_border bg-darkmode p-8 transition-all duration-300 hover:border-primary/30"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="mt-3 text-muted leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute w-60 h-60 bg-gradient-to-bl from-[#0815A6]/20 to-[#1E0339]/20 blur-400 rounded-full top-1/2 -left-32 -z-1"></div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div
            className="text-center max-w-2xl mx-auto mb-12"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Our Stack
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
              Technologies We{" "}
              <span className="text-primary">Work With</span>
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              We choose the right tools for each project — modern, battle-tested
              technologies that deliver performance and maintainability.
            </p>
          </div>
          <div
            className="flex flex-wrap justify-center gap-3"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm text-white font-medium transition-all hover:bg-primary/10 hover:border-primary/40"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-4 text-center">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Build{" "}
              <span className="text-primary">Something Great?</span>
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto leading-relaxed">
              Let&apos;s discuss your project. Whether it&apos;s a website, a
              brand identity, or a custom system — we&apos;re ready to help.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="/contact"
                className="bg-primary border border-primary rounded-lg text-white font-medium hover:bg-transparent hover:text-primary py-3 px-8 transition-all duration-300"
              >
                Get In Touch
              </a>
              <a
                href="/services"
                className="bg-transparent border border-primary rounded-lg text-primary font-medium hover:bg-primary hover:text-white py-3 px-8 transition-all duration-300"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -bottom-32 -right-14 -z-1"></div>
      </section>
    </main>
  );
}
