"use client";
import Image from "next/image";
import Link from "next/link";
import Picture from '@/components/ui/Picture';
import { portfolioData } from "@/app/api/data";
import { motion } from "framer-motion";
import { getImagePrefix } from "@/utils/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useState } from "react";

const CATEGORIES = ["All", "Web Development", "UI/UX Design", "Custom Systems", "Database & Systems"] as const;

const Portfolio = () => {
  const reducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All"
    ? portfolioData
    : portfolioData.filter((p) => p.category === activeCategory);

  return (
    <section className="md:pt-48 sm:pt-28 pt-12" id="portfolio">
      <div className="container mx-auto lg:max-w-screen-xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 items-center gap-20">
          <motion.div
            whileInView={reducedMotion ? {} : { y: 0, opacity: 1 }}
            initial={reducedMotion ? {} : { y: "-100%", opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.45 }}
            className="lg:-ml-32"
          >
            <Picture
              src={`${getImagePrefix()}images/portfolio/portfolio-showcase.png`}
              alt="CWorks digital portfolio showcasing completed web development and UI/UX design projects"
              title="CWorks Portfolio"
              width={780}
              height={700}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 780px"
            />
          </motion.div>

          <motion.div
            whileInView={reducedMotion ? {} : { y: 0, opacity: 1 }}
            initial={reducedMotion ? {} : { y: "100%", opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <p className="sm:text-28 text-18 text-muted mb-4">
              Our <span className="text-primary">Portfolio</span>
            </p>
            <h2 className="text-white sm:text-40 text-30 mb-4 font-medium">
              Explore our work with real clients across{" "}
              <span className="text-primary">East Africa</span>
            </h2>
            <p className="text-muted text-opacity-60 text-18">
              From e-commerce platforms to healthcare dashboards — we deliver
              <br className="md:block hidden" /> solutions that drive measurable business results.
            </p>
          </motion.div>
        </div>

        {/* Category Filters */}
        <div className="mt-16 flex flex-wrap gap-3 justify-center" role="tablist" aria-label="Portfolio categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-dark_grey bg-opacity-40 text-muted hover:text-white border border-dark_border border-opacity-20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              layout={!reducedMotion}
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-dark_border border-opacity-20 bg-dark_grey bg-opacity-35"
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={`${getImagePrefix()}${item.image}`}
                  alt={`${item.title} — ${item.category} project by CWorks`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-primary text-xs font-medium uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted text-sm mt-2 line-clamp-2">{item.description}</p>
                  {item.link && (
                    <Link
                      href={item.link}
                      className="mt-3 text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                      aria-label={`View details for ${item.title}`}
                    >
                      View Project
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Card Footer (visible by default on mobile) */}
              <div className="p-5 lg:hidden">
                <span className="text-primary text-xs font-medium uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white text-lg font-semibold mt-1">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
