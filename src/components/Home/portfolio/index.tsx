"use client";
import { portfolioData } from "@/app/api/data";
import { motion } from "framer-motion";
import {
  IconCart,
  IconHealth,
  IconPhone,
  IconHeartHand,
  IconGraduation,
  IconHomeSearch,
} from "../icons";

const ICONS: Record<string, (p: React.SVGProps<SVGSVGElement>) => React.ReactElement> = {
  "icon-cart": IconCart,
  "icon-health": IconHealth,
  "icon-phone": IconPhone,
  "icon-heart": IconHeartHand,
  "icon-grad": IconGraduation,
  "icon-home": IconHomeSearch,
};

const ProjectIcon = ({
  name,
  size = 28,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) => {
  const Cmp = ICONS[name] ?? IconCart;
  return <Cmp width={size} height={size} className={className} />;
};

const Portfolio = () => {
  return (
    <section className="md:pt-48 sm:pt-28 pt-12" id="portfolio">
      <div className="container mx-auto lg:max-w-screen-xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 items-center gap-20">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:-ml-32"
          >
            <div className="relative rounded-3xl overflow-hidden border border-dark_border border-opacity-20 bg-gradient-to-br from-[#0815A6] via-[#0A0F3D] to-[#1E0339] p-10">
              <div className="grid grid-cols-2 gap-6">
                {portfolioData.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className="bg-black bg-opacity-40 border border-white border-opacity-10 rounded-2xl p-6 backdrop-blur-sm"
                  >
                    <div className="text-white p-3 rounded-full bg-primary bg-opacity-30 w-fit mb-4 border border-primary border-opacity-40">
                      <ProjectIcon name={item.icon} size={26} />
                    </div>
                    <h4 className="text-white text-16 font-medium leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-muted text-opacity-60 text-13 mt-2">
                      {item.tag}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-muted text-opacity-70 text-14">
                  A snapshot of the systems, sites and brands we&apos;ve shipped
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="sm:text-28 text-18 text-muted mb-4">
              Our <span className="text-primary">Work</span>
            </p>
            <h2 className="text-white sm:text-40 text-30 mb-4 font-medium">
              Real projects. Real <span className="text-primary">results.</span>
            </h2>
            <p className="text-muted text-opacity-60 text-18 mb-6">
              From e-commerce platforms to school management systems, CWorks
              has delivered digital solutions for businesses and organizations
              across Uganda and East Africa.
              <br className="md:block hidden" />
            </p>

            <table className="w-full sm:w-[80%]">
              <tbody>
                {portfolioData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-dark_border border-opacity-10"
                  >
                    <td className="py-5">
                      <div className="text-white bg-primary bg-opacity-20 p-4 rounded-full w-fit border border-primary border-opacity-30">
                        <ProjectIcon name={item.icon} size={30} />
                      </div>
                    </td>
                    <td className="py-5">
                      <h4 className="text-muted sm:text-28 text-22 ml-5">
                        {item.title}
                      </h4>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
