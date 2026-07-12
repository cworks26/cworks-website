"use client";
import Image from "next/image";
import Picture from '@/components/ui/Picture';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getImagePrefix } from "@/utils/utils";

const Work = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 0.45, delay: 0.2 },
  };

  const bottomAnimation = {
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 0.45, delay: 0.2 },
  };

  const stats = [
    {
      value: "50+",
      label: "Projects Delivered",
    },
    {
      value: "30+",
      label: "Happy Clients",
    },
    {
      value: "5+",
      label: "Years Experience",
    },
    {
      value: "7",
      label: "Team Members",
    },
  ];

  return (
    <section className="md:pt-28" id="team">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div ref={ref} className="grid grid-cols-12 items-center">
          <motion.div
            {...bottomAnimation}
            className="lg:col-span-7 col-span-12"
          >
            <p className="sm:text-28 text-18 text-white">
              Our <span className="text-primary">Team</span>
            </p>
            <h2 className="sm:text-40 text-30 text-white lg:w-full md:w-70% font-medium">
              Meet the experts behind CWorks
            </h2>
            <div className="grid md:grid-cols-2 gap-7 mt-11">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-5">
                  <div className="px-5 py-5 bg-primary bg-opacity-25 backdrop-blur-sm rounded-full flex items-center justify-center min-w-[60px]">
                    <span className="text-white text-24 font-bold">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-20 text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...TopAnimation} className="lg:col-span-5 col-span-12">
            <div className="2xl:-mr-40 mt-9 flex justify-center">
              <Picture
                src={`${getImagePrefix()}images/work/team-collaboration.png`}
                alt="CWorks professional team collaborating on digital projects in a modern Kampala office"
                title="Meet the CWorks Team"
                width={600}
                height={425}
                className="lg:w-full"
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
