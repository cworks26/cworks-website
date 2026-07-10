"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "Full-stack marketplace with product management, secure checkout, order tracking, and an intuitive admin dashboard. Built to handle thousands of daily transactions.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL", "Stripe"],
    gradient: "from-[#0815A6] to-[#050F67]",
  },
  {
    title: "Healthcare Dashboard",
    category: "UI/UX Design & Development",
    description:
      "Patient management and analytics dashboard for a regional healthcare network. Features real-time data visualization, appointment scheduling, and secure medical records.",
    tags: ["React", "TypeScript", "D3.js", "PostgreSQL", "Docker"],
    gradient: "from-[#050F67] to-[#1E0339]",
  },
  {
    title: "Restaurant Chain Website",
    category: "Web Design & Development",
    description:
      "Multi-location restaurant website with online ordering, location finder, menu management, and a content management system for easy updates.",
    tags: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Google Maps API"],
    gradient: "from-[#1E0339] to-[#0815A6]",
  },
  {
    title: "NGO Impact Portal",
    category: "Full-Stack Development",
    description:
      "Transparency and reporting portal for an East African NGO. Features donor dashboards, project tracking, impact metrics visualization, and automated report generation.",
    tags: ["React", "Python", "FastAPI", "PostgreSQL", "Chart.js"],
    gradient: "from-[#0815A6] to-[#1E0339]",
  },
  {
    title: "School Management System",
    category: "System Building",
    description:
      "Comprehensive school administration platform with student enrollment, grade management, fee tracking, parent portals, and automated communication tools.",
    tags: ["PHP", "Laravel", "MySQL", "React", "Bootstrap"],
    gradient: "from-[#050F67] to-[#0815A6]",
  },
  {
    title: "Real Estate Listings",
    category: "Web Development",
    description:
      "Property listing platform with advanced search, virtual tours, agent profiles, inquiry management, and integrated mapping for a Kampala-based real estate company.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Mapbox", "Cloudinary"],
    gradient: "from-[#1E0339] to-[#050F67]",
  },
];

export default function PortfolioPage() {
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
              Our Portfolio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Work We&apos;re{" "}
              <span className="text-primary">Proud Of</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted leading-relaxed"
            >
              A selection of projects across web development, UI/UX design, and
              custom systems — each built to solve real business challenges and
              deliver measurable results.
            </motion.p>
          </div>
        </div>
        {/* Gradient blobs */}
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -top-64 -right-14 -z-1"></div>
        <div className="absolute w-40 h-40 bg-gradient-to-tr from-[#1E0339] to-[#050F67] blur-300 rounded-full -bottom-32 -left-20 -z-1"></div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-dark_border bg-darkmode overflow-hidden transition-all duration-300 hover:border-primary/30"
              >
                {/* Project Image Placeholder */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="relative text-5xl opacity-30 select-none">
                    {project.title.split(" ").map((word) => word[0]).join("").slice(0, 2)}
                  </span>
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-black/40 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-muted text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-dark_border bg-white/5 px-3 py-1 text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <div className="mt-5 pt-4 border-t border-dark_border">
                    <a
                      href="#"
                      className="text-primary text-sm font-medium hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                      View Project
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-4 text-center">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Want to Be Our{" "}
              <span className="text-primary">Next Project?</span>
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto leading-relaxed">
              We&apos;re always excited to take on new challenges. Let&apos;s
              build something remarkable together.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="bg-primary border border-primary rounded-lg text-white font-medium hover:bg-transparent hover:text-primary py-3 px-8 transition-all duration-300 inline-block"
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -bottom-32 -right-14 -z-1"></div>
      </section>
    </main>
  );
}
