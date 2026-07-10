export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand text (no logo on dark background per design spec) */}
          <div>
            <p className="text-lg font-bold text-white tracking-tight mb-3">
              CWorks
            </p>
            <p className="text-sm text-neutral-500 max-w-xs">
              We build digital. We ship results. From Kampala to the world.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
              { label: "Portfolio", href: "#portfolio" },
              { label: "Team", href: "#team" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-500 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} CWorks. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600 font-mono">
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
