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

const MOBILE_MENU_ITEMS = [
  {
    to: "/",
    label: "Home",
    end: true,
    bgImage: "/images/menu-band-1.jpg",
    lightBg: false,
  },
  {
    to: "/services",
    label: "Services",
    end: false,
    bgImage: "/images/menu-band-2.jpg",
    lightBg: false,
  },
  {
    to: "/winter-help",
    label: "Winter Help",
    end: false,
    bgImage: "/images/menu-band-3.jpg",
    lightBg: false,
  },
  {
    to: "/our-work",
    label: "Our Work",
    end: false,
    bgImage: "/images/menu-band-4.jpg",
    lightBg: true,
  },
  {
    to: "/about",
    label: "About & FAQ",
    end: false,
    bgImage: "/images/menu-band-5.jpg",
    lightBg: false,
  },
  {
    to: "/blog",
    label: "Blog",
    end: false,
    bgImage: "/images/menu-band-6.jpg",
    lightBg: false,
  },
  {
    to: "/quote",
    label: "Get a Quote",
    end: false,
    bgImage: "/images/menu-band-7.jpg",
    lightBg: true,
  },
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
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-[#C3D6EA] relative before:content-[''] before:hidden lg:before:block before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:bg-[#081A33] before:-z-10">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#0B6CB8] focus:text-white focus:font-semibold"
      >
        Skip to content
      </a>

      <div className="max-w-7xl mx-auto h-full flex items-stretch justify-between px-0 lg:px-6">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="bg-[#081A33] text-white px-3 sm:px-4 lg:px-6 flex items-center min-w-0 lg:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#45BCFF]"
        >
          <img
            src="/images/header-logo.png"
            alt="Paul's Roofing — Atlantic Canada's Trusted Roofing Experts"
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </Link>

        <div className="flex-1 bg-white px-3 sm:px-5 lg:px-6 flex items-center justify-end lg:justify-between gap-2.5 sm:gap-6 min-w-0">
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

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <NavLink
              to="/quote"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `${mobileOpen ? "hidden lg:inline-flex" : "inline-flex"} items-center justify-center px-3 sm:px-4 py-2 min-h-10 font-display text-xs sm:text-sm font-extrabold whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#081A33] ${
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
          className="lg:hidden fixed top-16 inset-x-0 bottom-0 z-50 overflow-y-auto bg-[#081A33]"
          aria-label="Mobile navigation"
        >
          <div className="min-h-full w-full flex flex-col">
            {MOBILE_MENU_ITEMS.map((item) => (
              <NavLink
                key={item.to + item.label}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                style={{
                  backgroundImage: `url('${item.bgImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className={({ isActive }) =>
                  `relative w-full flex-1 flex items-center min-h-[68px] px-6 py-3.5 text-[25px] leading-none font-display font-extrabold tracking-tight transition-opacity active:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#45BCFF] ${
                    item.lightBg
                      ? "text-[#081A33] [text-shadow:0_1px_2px_rgba(255,255,255,0.95)]"
                      : "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.65)]"
                  } ${isActive ? "underline underline-offset-8 decoration-[3px]" : ""}`
                }
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 ${
                    item.lightBg ? "bg-white/15" : "bg-black/10"
                  }`}
                />
                <span className="relative z-10">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
