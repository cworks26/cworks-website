"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "We build responsive, high-performance websites and web applications tailored to your business needs. From landing pages to full-scale platforms — we deliver clean code that scales.",
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PHP", "Python"],
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "User-centered design that converts. We craft intuitive interfaces through research-driven wireframes, interactive prototypes, and polished visual designs that delight your users.",
    techStack: ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: "✏️",
    title: "Graphic Design",
    description:
      "Memorable brand identities that stand out. From logos and brand guidelines to social media assets and print materials — we create visuals that tell your story and leave a lasting impression.",
    techStack: ["Logo Design", "Brand Identity", "Print Design", "Social Media Assets", "Illustrations"],
  },
  {
    icon: "💾",
    title: "Database & Systems",
    description:
      "Robust data architecture that powers your business. We design, implement, and manage database systems — ensuring your data is structured, secure, scalable, and always accessible.",
    techStack: ["MySQL", "PostgreSQL", "MongoDB", "Schema Design", "Migration", "Backup Strategy"],
  },
  {
    icon: "📊",
    title: "Brand Strategy",
    description:
      "Strategic thinking behind every pixel. We help you define your brand positioning, voice, and digital marketing approach — building a cohesive presence that resonates with your audience.",
    techStack: ["Brand Positioning", "SEO", "Content Strategy", "Social Media", "Analytics"],
  },
  {
    icon: "🔧",
    title: "Maintenance & Support",
    description:
      "Your digital products need ongoing care. We provide reliable maintenance, security updates, performance monitoring, and technical support — so you can focus on running your business.",
    techStack: ["24/7 Monitoring", "Security Updates", "Bug Fixes", "Performance Optimization", "SLA Support"],
  },
];

export default function ServicesPage() {
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
              Our Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Full-Service Digital.{" "}
              <span className="text-primary">Every Layer, Covered.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted leading-relaxed"
            >
              From concept to launch and beyond — we offer end-to-end digital
              services designed to help your business grow, compete, and thrive
              in the modern digital landscape.
            </motion.p>
          </div>
        </div>
        {/* Gradient blobs */}
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -top-64 -right-14 -z-1"></div>
        <div className="absolute w-40 h-40 bg-gradient-to-tr from-[#1E0339] to-[#050F67] blur-300 rounded-full -bottom-32 -left-20 -z-1"></div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-dark_border bg-darkmode p-8 transition-all duration-300 hover:border-primary/30 flex flex-col"
              >
                {/* Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-3xl transition-colors group-hover:bg-primary/20">
                  {service.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-muted leading-relaxed text-sm flex-1">
                  {service.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-dark_border bg-white/5 px-3 py-1 text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / Pricing CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div
            className="text-center max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              How We Work
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
              Our <span className="text-primary">Process</span>
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Every project follows a proven workflow designed to deliver
              results on time and within budget.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", description: "We learn about your business, goals, audience, and requirements." },
              { step: "02", title: "Design", description: "We create wireframes and visual designs for your feedback and approval." },
              { step: "03", title: "Development", description: "We build your solution with clean, tested, scalable code." },
              { step: "04", title: "Launch & Support", description: "We deploy, monitor, and provide ongoing maintenance and updates." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="rounded-2xl border border-dark_border bg-darkmode p-8 text-center"
              >
                <span className="text-4xl font-bold text-primary/30">{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-muted text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div
            className="text-center max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to <span className="text-primary">Get Started?</span>
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Every project is unique. We provide transparent, competitive
              pricing based on your specific needs. Reach out for a free
              consultation and customized quote.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="bg-primary border border-primary rounded-lg text-white font-medium hover:bg-transparent hover:text-primary py-3 px-8 transition-all duration-300"
              >
                Request a Quote
              </a>
              <a
                href="/portfolio"
                className="bg-transparent border border-primary rounded-lg text-primary font-medium hover:bg-primary hover:text-white py-3 px-8 transition-all duration-300"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
