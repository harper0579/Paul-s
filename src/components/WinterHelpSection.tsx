import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Phone, BookOpen, Snowflake, ShieldAlert, ChevronLeft, ChevronRight } from "lucide-react";
import { CONTACT, WINTER_SERVICES } from "../data/siteContent";

const WINTER_SLIDES = [
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

export function WinterHelpSection() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WINTER_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  function goToQuote(
    projectType: "Repair / Leak" | "Inspection",
    description: string,
    urgency: "standard" | "emergency" = "standard"
  ) {
    navigate("/quote", {
      state: {
        urgency,
        projectType,
        description,
        timestamp: Date.now(),
      },
    });
  }

  const slide = WINTER_SLIDES[activeIndex];

  return (
    <section
      id="winter"
      className="scroll-mt-20 py-14 lg:py-16 bg-[#E4EFFA] border-b border-[#C3D6EA]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
              Winter in New Brunswick
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
              Winter help — before the snow piles up
            </h1>
            <p className="mt-3 text-base text-[#2A3D57] max-w-2xl leading-relaxed">
              November is when small roof problems turn into January leaks. Four things we get
              called for most in winter — plain and simple. If water is coming in right now, skip
              the reading and tap Call.
            </p>
          </div>
        </div>

        {/* Hero Carousel Container */}
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

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {WINTER_SERVICES.map((svc, idx) => {
            const activeCard = idx === activeIndex;
            return (
              <article
                key={svc.id}
                id={`winter-${svc.id}`}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`scroll-mt-24 rounded-xl border bg-white p-5 flex flex-col justify-between transition-all duration-200 ${
                  activeCard
                    ? "border-[#0B6CB8] shadow-lg ring-2 ring-[#0B6CB8]/20"
                    : "border-[#C3D6EA] hover:border-[#8FB4DC]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0B6CB8]">
                      0{idx + 1}
                    </span>
                    {activeCard && (
                      <span className="w-2 h-2 rounded-full bg-[#0E8FE8] animate-pulse" />
                    )}
                  </div>
                  <h2 className="font-display text-lg font-bold text-[#081A33]">{svc.title}</h2>
                  <p className="mt-2 text-sm text-[#47617F] leading-relaxed">{svc.description}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EFF5FB] space-y-2">
                  {svc.action === "ice-guide" && (
                    <Link
                      to="/blog/ice-dams-explained"
                      className="btn-quote-glow w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 font-display text-sm font-extrabold transition-colors duration-150"
                    >
                      <BookOpen className="w-4 h-4 shrink-0" />
                      Read the ice dam guide
                    </Link>
                  )}

                  {svc.action === "call" && (
                    <>
                      <a
                        href={CONTACT.phoneHref}
                        className="btn-quote-glow w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 font-display text-sm font-extrabold transition-colors duration-150"
                      >
                        <Phone className="w-4 h-4 shrink-0" />
                        Call (506) 271-4162
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          goToQuote(
                            "Repair / Leak",
                            "Active leak / emergency repair needed.",
                            "emergency"
                          )
                        }
                        className="w-full inline-flex items-center justify-center px-3 py-2 min-h-10 rounded-lg border border-[#C3D6EA] hover:border-[#B91C1C] text-[#B91C1C] font-display text-xs font-bold cursor-pointer transition-colors duration-150"
                      >
                        Send 24/7 emergency request
                      </button>
                    </>
                  )}

                  {svc.action === "quote-snow" && (
                    <button
                      type="button"
                      onClick={() =>
                        goToQuote(
                          "Repair / Leak",
                          "Interested in snow rails over doors, deck, or walkways on a metal roof."
                        )
                      }
                      className="btn-quote-glow w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 font-display text-sm font-extrabold cursor-pointer transition-colors duration-150"
                    >
                      <Snowflake className="w-4 h-4 shrink-0" />
                      Ask about snow rails
                    </button>
                  )}

                  {svc.action === "quote-inspection" && (
                    <button
                      type="button"
                      onClick={() =>
                        goToQuote(
                          "Inspection",
                          "Looking to book a winter roof, flashing, and attic inspection."
                        )
                      }
                      className="btn-quote-glow w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 font-display text-sm font-extrabold cursor-pointer transition-colors duration-150"
                    >
                      Book a free inspection
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Full-Width Safety Banner */}
        <div className="mt-8 w-full max-w-7xl mx-auto rounded-xl border border-[#D97706]/35 bg-[#FFF7E6] px-5 py-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#7C4A03] shrink-0 mt-0.5" />
          <p className="text-sm text-[#7C4A03] leading-relaxed">
            <strong className="font-semibold">Safety first:</strong> never climb on a snowy or icy
            roof, and never chip ice off shingles or metal — it damages the roof and it&apos;s how
            people get hurt. Contain the water inside, protect your belongings, and call.
          </p>
        </div>
      </div>
    </section>
  );
}
