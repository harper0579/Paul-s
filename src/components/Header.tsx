import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/winter-help", label: "Winter Help" },
  { to: "/our-work", label: "Our Work" },
  { to: "/about", label: "About & FAQ" },
  { to: "/blog", label: "Blog" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#C3D6EA]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#0B6CB8] focus:text-white focus:font-semibold"
      >
        Skip to content
      </a>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-8">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-[#081A33] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B6CB8]"
        >
          <img
            src="/assets/aistudio/image_2285dc99.png"
            alt=""
            aria-hidden="true"
            className="w-9 h-9 rounded-lg object-cover shrink-0"
          />
          <span>
            Paul&apos;s <span className="text-[#0B6CB8]">Roofing</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B6CB8] ${
                  isActive
                    ? "text-[#0B6CB8] underline underline-offset-4 decoration-[#0E8FE8] decoration-2"
                    : "text-[#2A3D57] hover:text-[#081A33] hover:underline underline-offset-4 decoration-[#0E8FE8] decoration-2"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <NavLink
            to="/quote"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `inline-flex items-center justify-center px-4 py-2 min-h-10 font-display text-sm font-extrabold whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081A33] ${
                isActive ? "btn-call-glow" : "btn-quote-glow"
              }`
            }
          >
            Get a Quote
          </NavLink>

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
            <NavLink
              to="/"
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `py-3 min-h-11 flex items-center text-base font-semibold ${
                  isActive ? "text-[#0B6CB8]" : "text-[#081A33] hover:text-[#0B6CB8]"
                }`
              }
            >
              Home
            </NavLink>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `py-3 min-h-11 flex items-center text-base font-semibold ${
                    isActive ? "text-[#0B6CB8]" : "text-[#081A33] hover:text-[#0B6CB8]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/quote"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `py-3 min-h-11 flex items-center text-base font-semibold ${
                  isActive ? "text-[#0B6CB8]" : "text-[#081A33] hover:text-[#0B6CB8]"
                }`
              }
            >
              Get a Quote
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
