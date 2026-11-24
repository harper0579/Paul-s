import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/winter-help", label: "Winter Help" },
  { to: "/our-work", label: "Our Work" },
  { to: "/about", label: "About & FAQ" },
  { to: "/blog", label: "Blog" },
] as const;

const MOBILE_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services", end: false },
  { to: "/winter-help", label: "Winter Help", end: false },
  { to: "/our-work", label: "Our Work", end: false },
  { to: "/about", label: "About & FAQ", end: false },
  { to: "/blog", label: "Blog", end: false },
  { to: "/quote", label: "Get a Quote", end: false },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-[#C3D6EA]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#0B6CB8] focus:text-white focus:font-semibold"
      >
        Skip to content
      </a>

      <div className="h-full flex items-stretch justify-between">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="bg-[#081A33] text-white px-3.5 sm:px-5 lg:px-6 flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#45BCFF]"
        >
          <img
            src="/images/logo-circle.jpg"
            alt="Paul's Roofing official emblem"
            className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-[#45BCFF]/50"
          />
          <div className="min-w-0 leading-none">
            <div className="font-display text-base sm:text-lg font-extrabold tracking-tight whitespace-nowrap">
              <span className="text-white">PAUL&apos;S</span>{" "}
              <span className="text-[#45BCFF]">ROOFING</span>
            </div>
            <div className="mt-1 text-[8px] sm:text-[9px] font-semibold tracking-[0.11em] uppercase text-[#C9DDF3] whitespace-nowrap truncate max-w-[165px] sm:max-w-none">
              ATLANTIC CANADA&apos;S TRUSTED ROOFING EXPERTS
            </div>
          </div>
        </Link>

        <div className="flex-1 bg-white px-3 sm:px-5 lg:px-6 flex items-center justify-end lg:justify-between gap-4 sm:gap-6 min-w-0">
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B6CB8] ${
                    isActive
                      ? "text-[#0B6CB8] after:content-[''] after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:rounded-full after:bg-[#0E8FE8] after:shadow-[0_2px_10px_rgba(14,143,232,0.75)]"
                      : "text-[#081A33] hover:text-[#0B6CB8]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <NavLink
              to="/quote"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `inline-flex items-center justify-center px-3.5 sm:px-4 py-2 min-h-10 font-display text-xs sm:text-sm font-extrabold whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081A33] ${
                  isActive ? "btn-call-glow" : "btn-quote-glow"
                }`
              }
            >
              Get a Quote
            </NavLink>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#C3D6EA] bg-white text-[#081A33] hover:bg-[#EFF5FB] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6CB8]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="lg:hidden fixed top-16 inset-x-0 bottom-0 z-50 bg-cover bg-center overflow-y-auto"
          style={{ backgroundImage: "url('/images/menu-panels-bg.jpg')" }}
          aria-label="Mobile navigation"
        >
          <div className="min-h-full w-full bg-gradient-to-r from-[#081A33]/85 via-[#081A33]/45 to-transparent px-6 py-8 flex flex-col justify-start">
            <div className="flex flex-col items-start gap-2">
              {MOBILE_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-2.5 min-h-11 inline-flex items-center text-xl font-display font-bold drop-shadow transition-colors duration-150 ${
                      isActive
                        ? "text-[#45BCFF] underline underline-offset-8 decoration-2"
                        : "text-white hover:text-[#BFE3FF]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
