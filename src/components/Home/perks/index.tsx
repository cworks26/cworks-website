"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const values = [
  {
    icon: "🌍",
    title: "Uganda-Based, Globally-Minded",
    text: "Deep local expertise with international quality standards",
  },
  {
    icon: "🚀",
    title: "End-to-End Delivery",
    text: "From concept to deployment, we handle every phase",
  },
  {
    icon: "⚡",
    title: "Performance Obsessed",
    text: "Every pixel, every query, every interaction optimized",
  },
  {
    icon: "🤝",
    title: "Transparent Process",
    text: "Regular updates, clear timelines, no hidden costs",
  },
];

const Perks = () => {
  const reducedMotion = useReducedMotion();
  return (
    <section className="section-spacing relative">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">
            Why CWorks
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What sets our Kampala-based agency apart
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-8 text-center group"
            >
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-white text-lg font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Perks;
