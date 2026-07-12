"use client";
import Image from "next/image";
import Picture from '@/components/ui/Picture';
import { timelineData } from "@/app/api/data";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getImagePrefix } from "@/utils/utils";

const TimeLine = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 0.45, delay: 0.2 },
  };
  return (
    <section className="md:pt-40 pt-9" id="development">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-16 px-4">
        <div className="text-center">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted sm:text-28 text-18 mb-9">
              Our <span className="text-primary">Process</span>
            </p>
            <h2 className="text-white sm:text-40 text-30 font-medium lg:w-80% mx-auto mb-20">
              How we take your project from idea to launch
            </h2>
          </motion.div>
          <motion.div
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:block hidden relative">
              <div>
                <Picture
                src={`${getImagePrefix()}images/timeline/process-flow.png`} 
                  alt="CWorks project development process flow from discovery through design, development, and launch"
                  title="CWorks Development Process"
                  width={1220}
                  height={1000}
                  className="w-80% mx-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1220px"
                />
              </div>
              <div className="absolute lg::top-40 top-36 lg:left-0 -left-20 w-72 flex items-center gap-6">
                <div className="text-right">
                  <h5 className="text-muted text-28 mb-3">Discovery</h5>
                  <p className="text-18 text-muted text-opacity-60">
                    Understanding your goals, audience, and requirements
                  </p>
                </div>
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm px-6 py-2 h-fit rounded-full">
                  <Image
                    src= {`${getImagePrefix()}images/timeline/icon-planning.svg`}
                    alt="Discovery"
                    width={44}
                    height={44}
                    className="w-16 h-16 "
                  />
                </div>
              </div>
              <div className="absolute lg:top-40 top-36 lg:right-0 -right-20 w-72 flex items-center gap-6">
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm p-6 h-fit rounded-full">
                  <Image
                    src= {`${getImagePrefix()}images/timeline/icon-refinement.svg`}
                    alt="Design"
                    width={44}
                    height={44}
                  />
                </div>
                <div className="text-left">
                  <h5 className="text-muted text-28 mb-3">Design</h5>
                  <p className="text-18 text-muted text-opacity-60">
                    Creating wireframes and visual designs for your approval
                  </p>
                </div>
              </div>
              <div className="absolute lg:bottom-48 bottom-36 lg:left-0 -left-20 w-72 flex items-center gap-6">
                <div className="text-right">
                  <h5 className="text-muted text-28 mb-3">Prototype</h5>
                  <p className="text-18 text-muted text-opacity-60">
                    Build a working prototype to test your product
                  </p>
                </div>
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm px-6 py-2 h-fit rounded-full">
                  <Image
                    src= {`${getImagePrefix()}images/timeline/icon-prototype.svg`}
                    alt="Prototype"
                    width={44}
                    height={44}
                    className="w-16 h-16 "
                  />
                </div>
              </div>
              <div className="absolute lg:bottom-48 bottom-36 lg:right-0 -right-20 w-72 flex items-center gap-6">
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm px-6 py-2 h-fit rounded-full">
                  <Image
                    src= {`${getImagePrefix()}images/timeline/icon-support.svg`}
                    alt="Launch"
                    width={44}
                    height={44}
                    className="w-16 h-16"
                  />
                </div>
                <div className="text-left">
                  <h5 className="text-muted text-nowrap text-28 mb-3">
                    Launch
                  </h5>
                  <p className="text-18 text-muted text-opacity-60">
                    Deploying to production with monitoring and support
                  </p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 md:hidden">
              {timelineData.map((item, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className="bg-light_grey bg-opacity-45 p-6 rounded-full">
                    <Image
                      src= {`${getImagePrefix()}${item.icon}`}
                      alt={item.title}
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="text-start">
                    <h4 className="text-28 text-muted mb-2">{item.title}</h4>
                    <p className="text-muted text-opacity-60 text-18">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
