"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { teamData } from "@/app/api/data";
import { getImagePrefix } from "@/utils/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function TeamPage() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up" data-aos-duration="800">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Our Team
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Meet the people behind{" "}
              <span className="text-primary">CWorks</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl mx-auto">
              A small, focused team of Kampala-based engineers and designers
              dedicated to building digital products that make a real difference.
            </p>
          </div>
        </div>
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -top-64 -right-14 -z-1" aria-hidden="true" />
        <div className="absolute w-40 h-40 bg-gradient-to-tr from-[#1E0339] to-[#050F67] blur-300 rounded-full -bottom-32 -left-20 -z-1" aria-hidden="true" />
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member, index) => (
              <motion.div
                key={member.name}
                initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                className="group text-center"
              >
                {/* Profile Photo */}
                <div className="relative mx-auto mb-5 w-48 h-48 rounded-2xl overflow-hidden border-2 border-dark_border border-opacity-20 transition-colors group-hover:border-primary/40">
                  <Image
                    src={`${getImagePrefix()}${member.photo}`}
                    alt={`${member.name}, ${member.role} at CWorks`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12rem"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
                <p className="mt-3 text-muted text-sm leading-relaxed text-opacity-80">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values / Join Us CTA */}
      <section className="py-20">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="max-w-2xl mx-auto text-center" data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our <span className="text-primary">Values</span>
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 gap-6 text-left">
              {[
                { title: "Quality Over Quantity", desc: "We take on fewer projects to deliver exceptional results every time." },
                { title: "Radical Transparency", desc: "Open communication, clear timelines, and honest pricing — always." },
                { title: "Local Expertise, Global Standards", desc: "Deep understanding of East African markets with world-class engineering practices." },
                { title: "Continuous Learning", desc: "We stay at the cutting edge so your products benefit from the latest technology." },
              ].map((v) => (
                <div key={v.title} className="rounded-xl border border-dark_border bg-darkmode p-6">
                  <h3 className="text-white font-semibold">{v.title}</h3>
                  <p className="mt-2 text-muted text-sm">{v.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 p-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <h3 className="text-2xl font-bold text-white">Want to join the team?</h3>
              <p className="mt-3 text-muted">
                We're always looking for talented people passionate about building great products.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-block bg-primary border border-primary rounded-lg text-white font-medium hover:bg-transparent hover:text-primary py-3 px-8 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
