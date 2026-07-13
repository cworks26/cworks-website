"use client";
import Image from "next/image";
import Picture from '@/components/ui/Picture';
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getImagePrefix } from "@/utils/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Work = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const [counts, setCounts] = useState({ projects: 0, clients: 0, years: 0, team: 0 });

  const targetCounts = { projects: 50, clients: 30, years: 5, team: 7 };

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts({
        projects: Math.round(targetCounts.projects * eased),
        clients: Math.round(targetCounts.clients * eased),
        years: Math.round(targetCounts.years * eased),
        team: Math.round(targetCounts.team * eased),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [inView]);

  const stats = [
    { value: counts.projects, suffix: "+", label: "Projects Delivered" },
    { value: counts.clients, suffix: "+", label: "Happy Clients" },
    { value: counts.years, suffix: "+", label: "Years Experience" },
    { value: counts.team, suffix: "", label: "Team Members" },
  ];

  return (
    <section className="section-spacing" id="team">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-primary text-sm tracking-widest uppercase mb-4">
              Our Team
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Meet the experts{" "}
              <span className="gradient-text">behind CWorks</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-10">
              A dedicated team of designers, developers, and strategists based
              in Kampala, delivering digital excellence across East Africa.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-5 text-center"
                >
                  <span className="block text-3xl font-bold gradient-text">
                    {stat.value}{stat.suffix}
                  </span>
                  <span className="text-muted text-sm">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-3xl" />
              <Picture
                src={`${getImagePrefix()}images/work/team-collaboration.svg`}
                alt="CWorks professional team collaborating on digital projects in Kampala"
                title="Meet the CWorks Team"
                width={600}
                height={425}
                className="relative z-10 rounded-2xl"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Work;
