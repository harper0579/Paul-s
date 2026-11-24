import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import {
  CONTACT,
  METAL_COLOURS,
  SECONDARY_SERVICES,
  WHY_ITEMS,
} from "../data/siteContent";

interface ServicesSectionProps {
  onSelectRoofQuote: (roofType: "Metal" | "Shingles", colourNote?: string) => void;
}

export function ServicesSection({ onSelectRoofQuote }: ServicesSectionProps) {
  const [selectedColour, setSelectedColour] = useState(METAL_COLOURS[0]);

  return (
    <>
      <section className="py-14 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
            Why Paul&apos;s
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33] max-w-xl">
            Why choose Paul&apos;s Roofing?
          </h2>
          <p className="mt-3 text-base text-[#47617F] max-w-2xl">
            Over 30 years of experience. Quality workmanship and reliable service, protecting homes
            across Quispamsis, Saint John, Hampton, and Southern New Brunswick.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#C3D6EA] bg-white p-5"
              >
                <h3 className="font-display text-lg font-bold text-[#081A33]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#47617F] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 py-14 lg:py-16 bg-[#EFF5FB] border-y border-[#C3D6EA]">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">What we do</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
            Our services
          </h2>
          <p className="mt-3 text-base text-[#47617F] max-w-2xl">
            Expert solutions for every part of your roof and exterior, built to last.
          </p>

          <article className="mt-8 rounded-2xl border border-[#C3D6EA] bg-white p-6 lg:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
                    Our specialty
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-[#081A33]">
                    Premium Metal Roofing
                  </h3>
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
                  <h4 className="font-display text-base font-bold text-[#081A33]">
                    Industry-leading warranties
                  </h4>
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
                    src="/images/service-metal.jpg"
                    alt="House with a dark metal roof at sunset, with red, green, charcoal and brown metal roofing panels laid out in front."
                    className="w-full aspect-[16/9] object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="rounded-xl border border-[#C3D6EA] bg-[#EFF5FB] p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-base font-bold text-[#081A33]">
                      Popular metal roof colours
                    </h4>
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
                      onClick={() =>
                        onSelectRoofQuote("Metal", `Interested in ${selectedColour.name} metal roof.`)
                      }
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
                  <h3 className="font-display text-xl font-bold text-[#081A33]">{svc.title}</h3>
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

                {svc.hasVisualizers && (
                  <div className="mt-5 pt-4 border-t border-[#EFF5FB] flex flex-wrap gap-4 text-sm">
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
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
