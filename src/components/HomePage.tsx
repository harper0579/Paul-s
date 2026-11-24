import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Phone, ShieldAlert, Snowflake, Award, ShieldCheck, MapPin, Layers, PhoneCall, SearchCheck } from "lucide-react";
import { Hero } from "./Hero";
import {
  CONTACT,
  SECONDARY_SERVICES,
  TESTIMONIALS,
  WHY_ITEMS,
  WINTER_SERVICES,
} from "../data/siteContent";

export function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-12 lg:py-14 bg-[#F7FAFD] border-y border-[#E2ECF5]">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
                Why homeowners trust Paul
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#081A33]">
                Why choose Paul&apos;s Roofing?
              </h2>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B6CB8] hover:underline whitespace-nowrap shrink-0"
            >
              Our 30-year story, areas &amp; FAQ
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_ITEMS.map((item, idx) => {
              const Icon = idx === 0 ? Award : idx === 1 ? ShieldCheck : idx === 2 ? MapPin : Layers;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-[#C3D6EA] rounded-2xl p-6 shadow-xs hover:border-[#0E8FE8] transition-all flex flex-col gap-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EBF4FC] border border-[#C3D6EA] text-[#0B6CB8] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#081A33]">{item.title}</h3>
                    <p className="mt-2 text-sm text-[#47617F] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-14 bg-[#EFF5FB] border-b border-[#C3D6EA]">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">What we do</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#081A33]">
                Roofing &amp; exterior services
              </h2>
              <p className="mt-2 text-base text-[#47617F] max-w-2xl">
                Built for coastal wind, salt air, and freeze-thaw winters across Quispamsis, Saint
                John, and Southern New Brunswick.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold whitespace-nowrap shrink-0 transition-colors"
            >
              Explore all services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-5">
            <article className="lg:col-span-6 rounded-2xl border border-[#C3D6EA] bg-white overflow-hidden flex flex-col justify-between">
              <div className="bg-[#050D20] overflow-hidden">
                <img
                  src="/images/sunset-house-panels-clean.jpg"
                  alt="New Brunswick home with dark charcoal standing-seam metal roofing at sunset and four colour panels in front."
                  className="w-full h-auto block"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
                    Our specialty
                  </p>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-[#081A33]">
                    Premium Metal Roofing
                  </h3>
                  <p className="mt-2 text-sm text-[#2A3D57] leading-relaxed">
                    50+ year lifespan with a 40-year paint warranty and lifetime steel material
                    warranty, sourced from Community Metal &amp; Dairy Town Exteriors.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-sm text-[#2A3D57]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0B6CB8] shrink-0 mt-0.5" />
                      <span>8 popular colours ready to preview</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0B6CB8] shrink-0 mt-0.5" />
                      <span>Installed for heavy snow load &amp; Bay of Fundy wind</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EFF5FB] flex flex-wrap gap-3">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B6CB8] hover:underline"
                  >
                    Preview metal colours
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/services#compare"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#081A33] hover:text-[#0B6CB8] hover:underline"
                  >
                    Compare metal vs. shingles
                  </Link>
                </div>
              </div>
            </article>

            <div className="lg:col-span-6 grid grid-cols-1 gap-4">
              {SECONDARY_SERVICES.map((svc) => (
                <article
                  key={svc.title}
                  className="rounded-xl border border-[#C3D6EA] bg-white p-5 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#081A33]">{svc.title}</h3>
                    <p className="mt-1.5 text-sm text-[#47617F] leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#EFF5FB] flex items-center justify-between gap-3">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0B6CB8] hover:underline"
                    >
                      View service details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/quote"
                      state={{
                        projectType: svc.title.includes("Chimney") ? "Repair / Leak" : "Replacement",
                        roofType: svc.title.includes("Shingles") ? "Shingles" : "Unsure",
                        description: `Interested in ${svc.title}.`,
                        timestamp: Date.now(),
                      }}
                      className="text-xs font-bold text-[#081A33] hover:text-[#0B6CB8]"
                    >
                      Request quote &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-14 bg-[#E4EFFA] border-b border-[#C3D6EA]">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
                Winter in New Brunswick
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#081A33]">
                Winter help &amp; 24/7 emergency repairs
              </h2>
              <p className="mt-2 text-base text-[#2A3D57] max-w-2xl">
                Ice dams, snow rails, winter inspections, and active leak response before snow and
                freeze-thaw cycles damage your home.
              </p>
            </div>
            <Link
              to="/winter-help"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#081A33] text-white text-xs sm:text-sm font-bold hover:bg-[#0B6CB8] transition-colors whitespace-nowrap shrink-0"
            >
              <Snowflake className="w-4 h-4" />
              All winter services
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WINTER_SERVICES.map((svc, idx) => {
              const Icon = idx === 0 ? Snowflake : idx === 1 ? PhoneCall : idx === 2 ? ShieldAlert : SearchCheck;
              return (
                <article
                  key={svc.id}
                  className="bg-white border border-[#C3D6EA] rounded-2xl p-5 shadow-xs hover:border-[#0E8FE8] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#EBF4FC] border border-[#C3D6EA] text-[#0B6CB8] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#081A33]">{svc.title}</h3>
                    <p className="mt-2 text-sm text-[#47617F] leading-relaxed">{svc.description}</p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-[#E2ECF5]">
                    {svc.action === "ice-guide" && (
                      <Link
                        to="/blog/ice-dams-explained"
                        className="flex items-center justify-between text-sm font-bold text-[#0B6CB8] hover:underline"
                      >
                        <span>{svc.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                    {svc.action === "call" && (
                      <a
                        href={CONTACT.phoneHref}
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full border border-red-200 bg-red-50 text-red-700 font-bold text-sm hover:bg-red-100 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {svc.ctaLabel}
                      </a>
                    )}
                    {svc.action === "quote-snow" && (
                      <Link
                        to="/quote"
                        state={{
                          projectType: "Repair / Leak",
                          description:
                            "Interested in snow rails over doors, deck, or walkways on a metal roof.",
                          timestamp: Date.now(),
                        }}
                        className="flex items-center justify-between text-sm font-bold text-[#0B6CB8] hover:underline"
                      >
                        <span>{svc.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                    {svc.action === "quote-inspection" && (
                      <Link
                        to="/quote"
                        state={{
                          projectType: "Inspection",
                          description:
                            "Looking to book a winter roof, flashing, and attic inspection.",
                          timestamp: Date.now(),
                        }}
                        className="flex items-center justify-between text-sm font-bold text-[#0B6CB8] hover:underline"
                      >
                        <span>{svc.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="w-full mt-6 bg-[#FEF6E6] border border-[#F3D59B] rounded-xl px-5 py-3.5 flex items-center gap-3 text-sm text-[#7A4F01]">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>
              Safety note: never climb onto an icy roof —{" "}
              <Link to="/winter-help" className="font-bold underline">
                see our winter roof safety advice
              </Link>
              .
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
                Local reviews
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#081A33]">
                What Southern New Brunswick neighbours say
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/our-work"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#081A33] hover:text-[#0B6CB8]"
              >
                See our completed roofs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={CONTACT.googleReviewsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-bold text-[#0B6CB8] hover:underline"
              >
                Google reviews
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.author}
                className="rounded-xl border border-[#C3D6EA] bg-[#EFF5FB]/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="text-amber-500 text-sm tracking-widest mb-3"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </div>
                  <p className="text-base text-[#081A33] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <footer className="mt-4 pt-3 border-t border-[#C3D6EA] font-display text-sm font-bold text-[#081A33]">
                  — {t.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-14 bg-[#050D20] text-white border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold tracking-wider uppercase text-[#45BCFF]">
              Free inspections &middot; Itemized quotes
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
              Ready for a straight, itemized quote on your roof?
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#C9DDF3] leading-relaxed">
              Free estimates across Quispamsis, Rothesay, Saint John, Hampton, Grand Bay-Westfield,
              Sussex, St. Martins, and the Kingston Peninsula. Or read our{" "}
              <Link to="/blog" className="text-[#45BCFF] font-semibold underline underline-offset-2">
                36 homeowner roofing guides
              </Link>
              .
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/quote"
                className="btn-quote-glow inline-flex items-center justify-center px-6 py-3 min-h-12 font-display font-extrabold text-base whitespace-nowrap"
              >
                Get a Free Quote
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="btn-call-glow inline-flex items-center justify-center gap-2 px-6 py-3 min-h-12 font-display font-extrabold text-base whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#45BCFF] drop-shadow-[0_0_6px_rgba(69,188,255,0.8)] shrink-0" />
                Call {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-white/15 bg-[#081A33]">
            <img
              src="/images/pauls-gmc-truck.jpg"
              alt="Paul's Roofing GMC service truck with ladders outside a dark metal-roofed home — Serving Quispamsis, NB and surrounding areas."
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>
    </>
  );
}
