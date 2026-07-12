import Link from "next/link";
import Image from "next/image";
import Picture from '@/components/ui/Picture';
import { Icon } from "@iconify/react";
import { getImagePrefix } from "@/utils/utils";
import BeamsBackground from "@/components/Backgrounds/Beams";

const benefits = [
  { title: "Free Consultation" },
  { title: "Custom Solutions" },
  { title: "On-Time Delivery" },
  { title: "Ongoing Support" },
];

const Upgrade = () => {
  return (
    <section className="md:py-40 py-20 relative" id="contact">
      <BeamsBackground />
      <div className="container mx-auto lg:max-w-screen-xl px-4 relative z-10">
        <div className="grid lg:grid-cols-2 sm:gap-0 gap-10 items-center">
          <div>
            <p className="text-primary sm:text-28 text-18 mb-3">Let's Talk</p>
            <h2 className="text-white sm:text-40 text-30  font-medium mb-5">
              Ready to Build Something Great?
            </h2>
            <p className="text-muted text-opacity-60 text-18 mb-7">
              Let's discuss your project and turn your vision into reality
            </p>
            <div className="grid sm:grid-cols-2 text-nowrap sm:gap-10 gap-5 mb-8">
              {benefits.map((item, index) => (
                <div key={index} className="flex gap-5">
                  <div>
                    <Icon
                      icon="la:check-circle-solid"
                      width="24"
                      height="24"
                      className="text-white group-hover:text-primary"
                    />
                  </div>
                  <div>
                    <h4 className="text-18 text-muted text-opacity-60">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="#contact"
                className="bg-primary border border-primary rounded-lg text-21 font-medium hover:bg-transparent hover:text-primary text-white py-2 px-7"
              >
                Contact Us
              </Link>
              <Link
                href="#portfolio"
                className="bg-transparent border border-primary rounded-lg text-21 font-medium hover:bg-primary hover:text-white text-primary py-2 px-7"
              >
                View Portfolio
              </Link>
            </div>
          </div>
          <div>
            <div className="">
              <Picture
                src={`${getImagePrefix()}images/upgrade/lets-talk.png`}
                alt="CWorks client consultation and project discussion for digital solutions"
                title="Let's Talk About Your Project"
                width={625}
                height={580}
                className="-mr-5"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 625px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upgrade;
