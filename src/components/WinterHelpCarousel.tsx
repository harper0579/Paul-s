import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CONTACT } from "../data/siteContent";

export const WINTER_SLIDES = [
  {
    id: "ice-dam",
    tab: "Ice Dam Help",
    image: "/images/winter-ice-dams.webp",
    alt: "Ice dam formation and winter roofing protection in Quispamsis and Rothesay.",
    link: "/blog/ice-dams-explained",
    isExternal: false,
  },
  {
    id: "emergency",
    tab: "24/7 Emergency Leak",
    image: "/images/winter-emergency-leak.webp",
    alt: "Emergency winter roof leak repair and storm response in Southern New Brunswick.",
    link: CONTACT.phoneHref,
    isExternal: true,
  },
  {
    id: "snow-rails",
    tab: "Snow Rails",
    image: "/images/winter-snow-rails.webp",
    alt: "Snow retention rails installed on a metal roof to prevent sliding snow avalanches.",
    link: "/quote",
    isExternal: false,
  },
  {
    id: "inspection",
    tab: "Winter Inspection",
    image: "/images/winter-inspection.webp",
    alt: "Comprehensive winter roof, flashing, and attic inspection for NB homeowners.",
    link: "/quote",
    isExternal: false,
  },
] as const;

interface WinterHelpCarouselProps {
  activeIndex: number;
  setActiveIndex: (index: number | ((prev: number) => number)) => void;
}

export function WinterHelpCarousel({ activeIndex, setActiveIndex }: WinterHelpCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WINTER_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, setActiveIndex]);

  const slide = WINTER_SLIDES[activeIndex];

  return (
    <div
      className="max-w-7xl mx-auto mb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Tab Switcher Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {WINTER_SLIDES.map((s, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-3.5 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer text-center ${
                active
                  ? "bg-[#081A33] text-white shadow-md ring-2 ring-[#45BCFF]"
                  : "bg-white text-[#2A3D57] border border-[#C3D6EA] hover:border-[#0B6CB8] hover:text-[#081A33]"
              }`}
            >
              {s.tab}
            </button>
          );
        })}
      </div>

      {/* Active Slide Frame */}
      <div className="relative rounded-2xl border border-[#C3D6EA] bg-white shadow-md overflow-hidden">
        {/* Left/Right Chevrons */}
        <button
          type="button"
          onClick={() =>
            setActiveIndex((prev) => (prev === 0 ? WINTER_SLIDES.length - 1 : prev - 1))
          }
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 text-[#081A33] border border-[#C3D6EA] shadow-lg flex items-center justify-center hover:bg-white hover:scale-105 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev + 1) % WINTER_SLIDES.length)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 text-[#081A33] border border-[#C3D6EA] shadow-lg flex items-center justify-center hover:bg-white hover:scale-105 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {slide.isExternal ? (
          <a href={slide.link} className="block w-full">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-auto block"
            />
          </a>
        ) : (
          <Link to={slide.link} className="block w-full">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-auto block"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
