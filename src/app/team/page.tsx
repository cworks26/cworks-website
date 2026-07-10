"use client";

import { motion } from "framer-motion";

const TEAM = [
  {
    name: "Collin Oriho",
    role: "Lead Developer & Founder",
    bio: "Visionary technologist with a passion for building digital solutions that transform businesses. Collin leads the technical direction at CWorks, ensuring every project meets the highest standards of quality and innovation.",
    initials: "CO",
    gradient: "from-[#0815A6] to-[#050F67]",
  },
  {
    name: "Sarah Nabirye",
    role: "UI/UX Designer",
    bio: "User experience advocate who believes great design starts with empathy. Sarah transforms complex requirements into intuitive, beautiful interfaces that users love to interact with.",
    initials: "SN",
    gradient: "from-[#050F67] to-[#1E0339]",
  },
  {
    name: "David Ochieng",
    role: "Backend Developer",
    bio: "Database architect and API specialist with a knack for building robust, scalable server-side systems. David ensures that every application runs smoothly behind the scenes.",
    initials: "DO",
    gradient: "from-[#1E0339] to-[#0815A6]",
  },
  {
    name: "Grace Auma",
    role: "Frontend Developer",
    bio: "Pixel-perfect frontend specialist who brings designs to life with clean, performant code. Grace is passionate about responsive design and seamless user experiences across all devices.",
    initials: "GA",
    gradient: "from-[#0815A6] to-[#1E0339]",
  },
  {
    name: "Patrick Musoke",
    role: "DevOps Engineer",
    bio: "Infrastructure and deployment expert who keeps our systems running 24/7. Patrick handles CI/CD pipelines, cloud architecture, and ensures reliable, secure hosting for every client.",
    initials: "PM",
    gradient: "from-[#050F67] to-[#0815A6]",
  },
  {
    name: "Amina Wanjiku",
    role: "Project Manager",
    bio: "Certified project manager who bridges the gap between clients and developers. Amina ensures every project stays on track, on budget, and delivers exactly what was promised.",
    initials: "AW",
    gradient: "from-[#1E0339] to-[#050F67]",
  },
  {
    name: "Brian Sseguya",
    role: "Graphic Designer",
    bio: "Creative powerhouse behind our visual identities. Brian crafts logos, brand guidelines, and marketing materials that capture the essence of each client's unique story and values.",
    initials: "BS",
    gradient: "from-[#0815A6] to-[#050F67]",
  },
];

export default function TeamPage() {
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
              Meet Our Team
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              The People Behind{" "}
              <span className="text-primary">CWorks</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted leading-relaxed"
            >
              A diverse team of developers, designers, and strategists united by
              a shared passion for building exceptional digital experiences.
              We&apos;re not just colleagues — we&apos;re a family that learns,
              builds, and grows together.
            </motion.p>
          </div>
        </div>
        {/* Gradient blobs */}
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -top-64 -right-14 -z-1"></div>
        <div className="absolute w-40 h-40 bg-gradient-to-tr from-[#1E0339] to-[#050F67] blur-300 rounded-full -bottom-32 -left-20 -z-1"></div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div
            className="text-center max-w-2xl mx-auto mb-16"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Our People
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
              The Talent Behind{" "}
              <span className="text-primary">Your Projects</span>
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Each team member brings unique expertise and perspective. Together,
              we deliver solutions that exceed expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-dark_border bg-darkmode p-8 transition-all duration-300 hover:border-primary/30 text-center"
              >
                {/* Avatar Placeholder */}
                <div className="mx-auto mb-5">
                  <div
                    className={`h-24 w-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto ring-4 ring-dark_border group-hover:ring-primary/30 transition-all duration-300`}
                  >
                    <span className="text-3xl font-bold text-white select-none">
                      {member.initials}
                    </span>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="mt-1 text-primary text-sm font-medium">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="mt-4 text-muted text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-4 text-center">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Want to <span className="text-primary">Join the Team?</span>
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto leading-relaxed">
              We&apos;re always looking for talented people who share our
              passion for great digital work. Reach out and let&apos;s talk.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="bg-primary border border-primary rounded-lg text-white font-medium hover:bg-transparent hover:text-primary py-3 px-8 transition-all duration-300 inline-block"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -bottom-32 -right-14 -z-1"></div>
      </section>
    </main>
  );
}
