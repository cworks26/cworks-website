import React, { FC } from "react";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { footerlabels } from "@/app/api/data";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";

const Footer: FC = () => {
  return (
    <footer className="relative">
      {/* Top gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="pt-16 pb-8 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 lg:gap-16 pb-12">
            <div className="lg:col-span-5 md:col-span-6 col-span-12">
              <Logo />
              <p className="text-muted text-sm leading-relaxed mt-6 max-w-md">
                CWorks is a full-service digital agency based in Kampala, Uganda.
                We specialize in web development, UI/UX design, graphic design,
                database management, and custom software solutions.
              </p>
              <p className="text-muted text-sm mt-3">
                Kampala, Uganda &middot; info@cworks.tech
              </p>
              <div className="flex gap-4 items-center mt-6">
                {[
                  { icon: "fa6-brands:facebook-f", href: "#" },
                  { icon: "fa6-brands:instagram", href: "#" },
                  { icon: "fa6-brands:x-twitter", href: "#" },
                  { icon: "fa6-brands:linkedin-in", href: "#" },
                ].map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center group transition-all duration-300"
                  >
                    <Icon
                      icon={social.icon}
                      width="18"
                      height="18"
                      className="text-muted-light group-hover:text-primary transition-colors"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 md:col-span-3 col-span-6">
              <h4 className="text-white font-semibold mb-4">Links</h4>
              <ul className="space-y-3">
                {headerData.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted hover:text-primary transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 md:col-span-3 col-span-6">
              <h4 className="text-white font-semibold mb-4">Information</h4>
              <ul className="space-y-3">
                {footerlabels.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.herf}
                      className="text-muted hover:text-primary transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 md:col-span-6 col-span-12">
              <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
              <p className="text-muted text-sm mb-4">
                Get the latest news and insights from our team.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border border-dark_border rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted focus:border-primary/50 outline-none transition-colors"
                />
                <button className="btn-primary px-4 !py-3">
                  <Icon icon="tabler:send" width="18" height="18" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-dark_border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted text-sm">
              &copy; {new Date().getFullYear()} CWorks. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-muted text-sm">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-primary transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
