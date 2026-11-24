import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";
import {
  CONTACT,
  METAL_COLOURS,
  SECONDARY_SERVICES,
} from "../data/siteContent";

export function ServicesSection() {
  const [selectedColour, setSelectedColour] = useState(METAL_COLOURS[0]);
  const navigate = useNavigate();

  function handleQuoteColour(colourName: string) {
    navigate("/quote", {
      state: {
        projectType: "Replacement",
        roofType: "Metal",
        description: `Interested in ${colourName} metal roof.`,
        timestamp: Date.now(),
      },
    });
  }

  return (
    <>
      <section id="services" className="scroll-mt-20 py-14 lg:py-16 bg-[#EFF5FB] border-b border-[#C3D6EA]">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">What we do</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
            Our services
          </h1>
          <p className="mt-3 text-base text-[#47617F] max-w-2xl">
            Expert solutions for every part of your roof and exterior, built to last across Southern
            New Brunswick.
          </p>

          <article className="mt-8 rounded-2xl border border-[#C3D6EA] bg-white p-6 lg:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
                    Our specialty
                  </p>
                  <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-[#081A33]">
                    Premium Metal Roofing
                  </h2>
                  <p className="mt-3 text-base text-[#2A3D57] leading-relaxed">
                    High-quality metal roofing systems sourced from industry leaders like Community
                    Metal and Dairy Town Exteriors. Unparalleled durability, longevity, and
                    resistance to harsh Atlantic Canadian weather.
                  </p>

                  <ul className="mt-5 space-y-2.5 text-sm sm:text-base text-[#2A3D57]">
                    {[
                      "Superior resistance to extreme weather",
                      "Exceptional longevity (50+ years)",
                      "Energy-efficient, reflecting solar heat",
                      "Low maintenance and fire-resistant",
                      "Increases home value significantly",
                    ].map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#0B6CB8] shrink-0 mt-1" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-xl bg-[#E4EFFA] border border-[#C3D6EA] p-5">
                  <h3 className="font-display text-base font-bold text-[#081A33]">
                    Industry-leading warranties
                  </h3>
                  <ul className="mt-2.5 space-y-1.5 text-sm text-[#2A3D57]">
                    <li>
                      40-year paint warranty on most colours — won&apos;t chip, crack, or peel
                    </li>
                    <li>Lifetime material warranty on steel roofing panels against defects</li>
                    <li>Our own comprehensive workmanship guarantee on all installations</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                <div className="overflow-hidden rounded-xl border border-[#C3D6EA] bg-[#081A33]">
                  <img
                    src="/images/sunset-house-panels-clean.jpg"
                    alt="New Brunswick home with dark charcoal standing-seam metal roofing at sunset with four metal roofing panels laid out in front."
                    className="w-full h-auto block"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="rounded-xl border border-[#C3D6EA] bg-[#EFF5FB] p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-[#081A33]">
                      Popular metal roof colours
                    </h3>
                    <span className="text-xs font-medium text-[#47617F]">
                      Select a finish to preview
                    </span>
                  </div>

                  <div
                    className="mt-3 flex flex-wrap gap-2"
                    role="group"
                    aria-label="Popular metal roof colours"
                  >
                    {METAL_COLOURS.map((colour) => {
                      const active = selectedColour.name === colour.name;
                      return (
                        <button
                          key={colour.name}
                          type="button"
                          onClick={() => setSelectedColour(colour)}
                          aria-pressed={active}
                          className={`inline-flex items-center gap-2 px-3 py-2 min-h-10 rounded-lg text-xs sm:text-sm font-semibold border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                            active
                              ? "bg-[#081A33] text-white border-[#081A33]"
                              : "bg-white text-[#081A33] border-[#C3D6EA] hover:border-[#0B6CB8]"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-sm border border-black/20 shrink-0"
                            style={{ backgroundColor: colour.hex }}
                            aria-hidden="true"
                          />
                          {colour.name}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 rounded-lg bg-white border border-[#C3D6EA] p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div
                      className="w-full sm:w-20 h-14 rounded-lg border border-black/15 shrink-0"
                      style={{ backgroundColor: selectedColour.hex }}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-[#081A33] text-sm">
                        {selectedColour.name}
                      </div>
                      <p className="mt-0.5 text-xs sm:text-sm text-[#47617F]">
                        {selectedColour.pairing}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuoteColour(selectedColour.name)}
                      className="px-3.5 py-2 min-h-10 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150"
                    >
                      Quote in {selectedColour.name}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <span className="text-[#47617F]">Try on your own house:</span>
                    <a
                      href={CONTACT.ikoVisualizerHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#0B6CB8] hover:underline"
                    >
                      IKO Roof Viewer
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={CONTACT.bpVisualizerHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#0B6CB8] hover:underline"
                    >
                      BP Canada Visualizer
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#C3D6EA]">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#47617F] mb-2">
                      Full showroom metal sample wall (24 panel colours)
                    </p>
                    <div className="overflow-hidden rounded-lg border border-[#C3D6EA] bg-white">
                      <img
                        src="/images/color-wall-24.jpg"
                        alt="Showroom wall of 24 real steel roofing panel samples including Copper, Shiny Black, Burnished Slate, Charcoal, Hartford Green, Burgundy, Crimson Red, Gallery Blue, Stone, Bright White, Gold, Tan, and Galvalume."
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {SECONDARY_SERVICES.map((svc) => (
              <article
                key={svc.title}
                className="rounded-xl border border-[#C3D6EA] bg-white p-6 flex flex-col justify-between"
              >
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/quote", {
                        state: {
                          projectType: svc.defaultProjectType,
                          roofType: svc.defaultRoofType,
                          description: `Interested in ${svc.title}.`,
                          timestamp: Date.now(),
                        },
                      })
                    }
                    className="mb-4 block w-full overflow-hidden rounded-lg border border-[#C3D6EA] bg-[#081A33] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6CB8]"
                    aria-label={`Request a quote for ${svc.title}`}
                  >
                    <img
                      src={svc.imageSrc}
                      alt={svc.imageAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block"
                    />
                  </button>
                  <h2 className="font-display text-xl font-bold text-[#081A33]">{svc.title}</h2>
                  <p className="mt-2.5 text-sm sm:text-base text-[#47617F] leading-relaxed">
                    {svc.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-[#2A3D57]">
                    {svc.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#0B6CB8] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EFF5FB] space-y-3">
                  {svc.hasVisualizers && (
                    <div className="flex flex-wrap gap-4 text-sm">
                      <a
                        href={CONTACT.ikoVisualizerHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#0B6CB8] hover:underline"
                      >
                        IKO Roof Viewer
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={CONTACT.bpVisualizerHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#0B6CB8] hover:underline"
                      >
                        BP Canada Visualizer
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/quote", {
                        state: {
                          projectType: svc.defaultProjectType,
                          roofType: svc.defaultRoofType,
                          description: `Interested in ${svc.title}.`,
                          timestamp: Date.now(),
                        },
                      })
                    }
                    className="btn-quote-glow w-full inline-flex items-center justify-center px-4 py-2.5 min-h-10 font-display text-sm font-extrabold cursor-pointer"
                  >
                    Get a Quote
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="compare" className="scroll-mt-20 py-14 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">Straight talk</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
            Metal vs. shingle: an honest comparison
          </h2>
          <p className="mt-3 text-base text-[#47617F] max-w-2xl">
            No sales pitch — here&apos;s how the two materials actually stack up for a New Brunswick
            home.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#C3D6EA] bg-[#081A33]">
            <img
              src="/images/metal-vs-shingle-compare.jpg"
              alt="Side-by-side comparison showing architectural shingles and standing-seam metal roofing with key differences in lifespan, initial cost, maintenance, weather resistance, and energy efficiency."
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-auto block"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                navigate("/quote", {
                  state: {
                    projectType: "Replacement",
                    roofType: "Unsure",
                    description: "Looking for advice comparing metal vs. shingles for my home.",
                    timestamp: Date.now(),
                  },
                })
              }
              className="px-6 py-3 min-h-12 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-base font-bold cursor-pointer transition-colors"
            >
              Get an itemized comparison quote
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
