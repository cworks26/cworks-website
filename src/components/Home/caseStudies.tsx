"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const CASES = [
  {
    name: "Vybent",
    type: "Events & Ticketing Platform",
    description:
      "Tiered ticketing (General, VIP & VVIP), mobile QR check-ins, and a live sales dashboard for concerts, festivals and sports across Uganda.",
    stack: ["Next.js", "TypeScript", "Realtime Dashboard"],
    media: { kind: "video" as const, src: "/videos/vybent-case-12.mp4" },
    accent: "from-[#0B3D2E] to-[#04120C]",
    tag: "Flagship Product",
  },
  {
    name: "OAE Inventory",
    type: "Inventory & Sales Management System",
    description:
      "A complete stock-control platform for medical supplies: role-based access, stock transfers, reports and multi-facility management.",
    stack: ["Next.js", "Firebase", "Role-Based Access"],
    media: { kind: "image" as const, src: "/images/case-studies/oae-dashboard.jpg" },
    accent: "from-[#0815A6] to-[#050F67]",
    tag: "Client System",
  },
  {
    name: "E-Commerce Platforms",
    type: "Online Stores with Mobile Money",
    description:
      "Storefronts built for the Ugandan market — MTN MoMo & Airtel Money checkout, order tracking, and admin dashboards.",
    stack: ["React", "Node.js", "Mobile Money API"],
    media: { kind: "video" as const, src: "/videos/vybent-case-6.mp4" },
    accent: "from-[#1E0339] to-[#050F67]",
    tag: "Client Work",
  },
];

const CaseStudy = () => {
  return (
    <section className="md:py-32 py-20" id="case-studies">
      <div className="container mx-auto lg:max-w-screen-xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="sm:text-28 text-18 text-muted mb-4">
            Case <span className="text-primary">Studies</span>
          </p>
          <h2 className="text-white sm:text-40 text-30 font-medium">
            Real products, built by CWorks
          </h2>
          <p className="text-muted text-opacity-60 text-18 mt-4 max-w-2xl mx-auto">
            A look at the platforms we&apos;ve designed, engineered and shipped — from our flagship ticketing product to enterprise inventory systems.
          </p>
        </div>

        <div className="space-y-10">
          {CASES.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-0 items-stretch rounded-3xl overflow-hidden border border-white border-opacity-10 bg-gradient-to-br ${item.accent}`}
            >
              {/* Media */}
              <div className={`relative min-h-[280px] lg:min-h-[360px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                {item.media.kind === "video" ? (
                  <video
                    src={item.media.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.media.src}
                    alt={`${item.name} — ${item.type} screenshot`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:hidden" />
              </div>

              {/* Copy */}
              <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="inline-block w-fit text-12 uppercase tracking-widest text-white bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full px-4 py-1.5 mb-5">
                  {item.tag}
                </span>
                <h3 className="text-white text-30 font-medium mb-1">{item.name}</h3>
                <p className="text-primary text-16 font-medium mb-4">{item.type}</p>
                <p className="text-muted text-opacity-70 text-16 leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-13 text-white text-opacity-80 border border-white border-opacity-15 rounded-lg px-3 py-1.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted text-opacity-70 text-15">
            Want yours here next? <a href="/contact" className="text-primary hover:underline">Start a project with CWorks →</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
