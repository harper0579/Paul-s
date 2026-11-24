import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#winter", label: "Winter Help" },
  { href: "#work", label: "Our Work" },
  { href: "#compare", label: "Compare" },
  { href: "#handbook", label: "Blog & FAQ" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#C3D6EA]">
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#0B6CB8] focus:text-white focus:font-semibold"
      >
        Skip to content
      </a>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-xl font-extrabold tracking-tight text-[#081A33] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B6CB8]"
        >
          Paul&apos;s <span className="text-[#0B6CB8]">Roofing</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#2A3D57] hover:text-[#081A33] hover:underline underline-offset-4 decoration-[#0E8FE8] decoration-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B6CB8]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#quote"
            className="inline-flex items-center justify-center px-4 py-2.5 min-h-10 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081A33]"
          >
            Get a Quote
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#C3D6EA] text-[#081A33] hover:bg-[#EFF5FB] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6CB8]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="lg:hidden border-t border-[#C3D6EA] bg-white px-4 py-3"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col divide-y divide-[#EFF5FB]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 min-h-11 flex items-center text-base font-semibold text-[#081A33] hover:text-[#0B6CB8]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#areas"
              onClick={() => setMobileOpen(false)}
              className="py-3 min-h-11 flex items-center text-base font-semibold text-[#081A33] hover:text-[#0B6CB8]"
            >
              Service Areas
            </a>
            <a
              href="#faq"
              onClick={() => setMobileOpen(false)}
              className="py-3 min-h-11 flex items-center text-base font-semibold text-[#081A33] hover:text-[#0B6CB8]"
            >
              FAQ
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
