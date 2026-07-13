"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const services = [
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "Custom websites and web apps built with cutting-edge technologies",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces that convert visitors into customers",
  },
  {
    icon: "✏️",
    title: "Graphic Design",
    description:
      "Brand identities, logos, and visual assets that make you stand out",
  },
  {
    icon: "💾",
    title: "Database & Systems",
    description:
      "Secure, scalable databases and custom backend solutions",
  },
  {
    icon: "📊",
    title: "Brand Strategy",
    description:
      "Strategic brand positioning and digital marketing guidance",
  },
  {
    icon: "🔧",
    title: "Maintenance & Support",
    description:
      "Ongoing support to keep your digital assets running smoothly",
  },
];

const Platform = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-spacing relative" id="services">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <motion.div
          className="text-center mb-16"
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            End-to-end digital solutions
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Tailored for your business — from concept to deployment and beyond
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-8 group"
            >
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl w-fit mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platform;
