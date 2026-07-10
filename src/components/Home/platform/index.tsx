const services = [
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "Custom websites and web apps built with cutting-edge technologies",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces that convert visitors into customers",
  },
  {
    icon: "✏️",
    title: "Graphic Design",
    description:
      "Brand identities, logos, and visual assets that make you stand out",
  },
  {
    icon: "💾",
    title: "Database & Systems",
    description:
      "Secure, scalable databases and custom backend solutions",
  },
  {
    icon: "📊",
    title: "Brand Strategy",
    description:
      "Strategic brand positioning and digital marketing guidance",
  },
  {
    icon: "🔧",
    title: "Maintenance & Support",
    description:
      "Ongoing support to keep your digital assets running smoothly",
  },
];

const Platform = () => {
  return (
    <section className="md:pt-44 sm:pt-24 pt-12 relative z-1" id="services">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="text-center mb-16">
          <p className="text-muted sm:text-28 text-18 mb-4 pb-6 relative after:content-[''] after:w-8 after:h-0.5 after:bg-primary after:absolute after:bottom-0 after:left-1/2">
            Our <span className="text-primary">Services</span>
          </p>
          <h2 className="text-white sm:text-40 text-30 font-medium">
            End-to-end digital solutions tailored for your business
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-dark_grey bg-opacity-35 border border-dark_border border-opacity-20 rounded-3xl p-8 hover:border-primary hover:border-opacity-40 transition-all duration-300"
            >
              <div className="bg-primary bg-opacity-25 backdrop-blur-sm p-4 rounded-full w-fit mb-6">
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h4 className="text-white text-24 font-medium mb-3">
                {service.title}
              </h4>
              <p className="text-muted text-opacity-60 text-16">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-tealGreen to-charcoalGray sm:w-50 w-96 sm:h-50 h-96 rounded-full sm:-bottom-80 bottom-0 blur-400 z-0 absolute sm:-left-48 opacity-60"></div>
      </div>
    </section>
  );
};

export default Platform;
