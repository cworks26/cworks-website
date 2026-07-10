"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerChildren, StaggerItem } from "./AnimatedSection";

interface ProjectImageProps {
  src: string;
  alt: string;
}

function ProjectImage({ src, alt }: ProjectImageProps) {
  return (
    <picture>
      <source srcSet={src.replace(".jpg", ".webp")} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </picture>
  );
}

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Full-stack marketplace with product management, cart, and checkout.",
    image: "/assets/images/sections/ecommerce-online-store-platform.jpg",
    alt: "E-commerce online store platform with shopping interface on tablet",
  },
  {
    title: "Brand Identity System",
    category: "Graphic Design",
    description: "Complete brand package — logo, palette, typography, and guidelines.",
    image: "/assets/images/sections/brand-identity-creative-design.jpg",
    alt: "Creative design workspace with brand identity materials and color swatches",
  },
  {
    title: "Booking App Interface",
    category: "UI/UX Design",
    description: "Service scheduling app with calendar integration and real-time availability.",
    image: "/assets/images/sections/app-interface-ui-ux-prototype.jpg",
    alt: "UI/UX app interface prototype on laptop screen with wireframes",
  },
  {
    title: "Inventory Management",
    category: "System Building",
    description: "Custom stock tracking system with barcode scanning and automated alerts.",
    image: "/assets/images/sections/inventory-data-server-system.jpg",
    alt: "Data center server infrastructure for inventory management system",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="max-w-3xl">
          <span className="text-sm font-mono text-cyan uppercase tracking-wider">
            Selected Work
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Projects we&apos;re proud of.
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            A selection of work across web, design, and systems — each built to solve
            a real business problem.
          </p>
        </AnimatedSection>

        {/* Projects grid */}
        <StaggerChildren className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <StaggerItem key={project.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface"
              >
                {/* Image container */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-neutral-900">
                  <ProjectImage src={project.image} alt={project.alt} />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-mono text-cyan uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-white transition-colors group-hover:text-cyan">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
