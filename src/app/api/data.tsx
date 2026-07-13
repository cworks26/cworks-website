export const footerlabels: { label: string; herf: string }[] = [
  { label: "Privacy Policy", herf: "#" },
  { label: "Terms", herf: "#" },
];

export const pricedeta: {
  title: string;
  short: string;
  icon: string;
  background: string;
  price: string;
  mark: string;
  width: number;
  height: number;
  padding: string;
}[] = [
  {
    title: "Web Development",
    short: "Custom Sites & Apps",
    icon: "images/icons/icon-web.svg",
    background: "bg-[#0815A6] bg-opacity-20",
    price: "Full-Stack",
    mark: "React • Next.js • Node",
    width: 24,
    height: 24,
    padding: "px-4 py-3",
  },
  {
    title: "UI/UX Design",
    short: "User-Centered",
    icon: "images/icons/icon-design.svg",
    background: "bg-[#050F67] bg-opacity-20",
    price: "Figma + Code",
    mark: "Wireframes • Prototypes",
    width: 24,
    height: 24,
    padding: "px-4 py-2",
  },
  {
    title: "Graphic Design",
    short: "Brand Identity",
    icon: "images/icons/icon-graphic.svg",
    background: "bg-[#1E0339] bg-opacity-20",
    price: "Visual Assets",
    mark: "Logos • Branding • Print",
    width: 24,
    height: 24,
    padding: "px-4 py-3",
  },
  {
    title: "Database Systems",
    short: "Scalable Backend",
    icon: "images/icons/icon-database.svg",
    background: "bg-[#0815A6] bg-opacity-20",
    price: "SQL & NoSQL",
    mark: "PostgreSQL • MongoDB",
    width: 24,
    height: 24,
    padding: "px-4 py-3",
  },
  {
    title: "Brand Strategy",
    short: "Digital Marketing",
    icon: "images/icons/icon-strategy.svg",
    background: "bg-[#050F67] bg-opacity-20",
    price: "Growth Plans",
    mark: "SEO • Social • Analytics",
    width: 24,
    height: 24,
    padding: "px-4 py-3",
  },
  {
    title: "Maintenance",
    short: "Ongoing Support",
    icon: "images/icons/icon-support.svg",
    background: "bg-[#1E0339] bg-opacity-20",
    price: "24/7 Care",
    mark: "Updates • Security • SLA",
    width: 24,
    height: 24,
    padding: "px-4 py-3",
  },
];

export const portfolioData: {
  image: string;
  title: string;
  category: string;
  description: string;
  link?: string;
}[] = [
  {
    image: "images/portfolio/ecommerce-platform.svg",
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "Full-featured online marketplace with payment integration and inventory management for a Kampala retailer.",
    link: "#",
  },
  {
    image: "images/portfolio/healthcare-dashboard.svg",
    title: "Healthcare Dashboard",
    category: "UI/UX Design",
    description:
      "Real-time patient management dashboard serving 12 clinics across Eastern Uganda.",
    link: "#",
  },
  {
    image: "images/portfolio/restaurant-website.svg",
    title: "Restaurant Chain Website",
    category: "Web Development",
    description:
      "Multi-location restaurant website with online ordering and reservation system deployed across 5 branches.",
    link: "#",
  },
  {
    image: "images/portfolio/ngo-portal.svg",
    title: "NGO Impact Portal",
    category: "Custom Systems",
    description:
      "Donor management and impact tracking system for an East African non-profit organization.",
    link: "#",
  },
  {
    image: "images/portfolio/school-system.svg",
    title: "School Management System",
    category: "Database & Systems",
    description:
      "Student records, fee management, and academic reporting platform serving 3,000+ students.",
    link: "#",
  },
  {
    image: "images/portfolio/realestate-listings.svg",
    title: "Real Estate Listings",
    category: "Web Development",
    description:
      "Property listing and virtual tour platform with integrated CRM for a Kampala real estate agency.",
    link: "#",
  },
];

export const teamData: {
  name: string;
  role: string;
  photo: string;
  bio: string;
  socials?: { platform: string; url: string }[];
}[] = [
  {
    name: "Alex Mukasa",
    role: "Lead Developer & Founder",
    photo: "images/team/alex-mukasa.svg",
    bio: "Full-stack engineer with 8+ years building scalable web applications. Passionate about clean code and East Africa's tech ecosystem.",
  },
  {
    name: "Grace Nakamya",
    role: "UI/UX Designer",
    photo: "images/team/grace-nakamya.svg",
    bio: "Human-centered designer specializing in research-driven interfaces that convert. Previously at fintech and e-commerce startups.",
  },
  {
    name: "David Okello",
    role: "Backend Engineer",
    photo: "images/team/david-okello.svg",
    bio: "Database architect and API specialist. Builds the infrastructure that powers mission-critical business applications.",
  },
  {
    name: "Sarah Auma",
    role: "Graphic Designer",
    photo: "images/team/sarah-auma.svg",
    bio: "Brand identity expert who transforms business visions into memorable visual stories across print and digital media.",
  },
];

export const upgradeData: { title: string }[] = [
  { title: "Free Consultation" },
  { title: "Custom Solutions" },
  { title: "On-Time Delivery" },
  { title: "Ongoing Support" },
];

export const perksData: {
  icon: string;
  title: string;
  text: string;
  space: string;
}[] = [
  {
    icon: "images/perks/icon-support.svg",
    title: "Dedicated Support",
    text: "One-on-one support throughout your project lifecycle.",
    space: "lg:mt-8",
  },
  {
    icon: "images/perks/icon-community.svg",
    title: "Collaborative",
    text: "We work as an extension of your team, not just a vendor.",
    space: "lg:mt-14",
  },
  {
    icon: "images/perks/icon-academy.svg",
    title: "Knowledge Transfer",
    text: "We document and train your team so you're never locked in.",
    space: "lg:mt-4",
  },
];

export const timelineData: {
  icon: string;
  title: string;
  text: string;
  position: string;
}[] = [
  {
    icon: "images/timeline/icon-planning.svg",
    title: "Discovery",
    text: "Understanding your goals, audience, and requirements",
    position: "md:top-0 md:left-0",
  },
  {
    icon: "images/timeline/icon-refinement.svg",
    title: "Design",
    text: "Creating wireframes and visual designs for your approval",
    position: "md:top-0 md:right-0",
  },
  {
    icon: "images/timeline/icon-prototype.svg",
    title: "Development",
    text: "Building your solution with clean, scalable code",
    position: "md:bottom-0 md:left-0",
  },
  {
    icon: "images/timeline/icon-support.svg",
    title: "Testing",
    text: "Rigorous QA to ensure everything works perfectly",
    position: "md:bottom-0 md:right-0",
  },
  {
    icon: "images/timeline/icon-planning.svg",
    title: "Launch",
    text: "Deploying to production with monitoring and support",
    position: "md:top-0 md:left-0",
  },
];
