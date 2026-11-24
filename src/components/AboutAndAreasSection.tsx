import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Check, ChevronDown, Link2, MapPin, Phone, Search } from "lucide-react";
import {
  CONTACT,
  FAQ_ITEMS,
  PROCESS_STEPS,
  SERVICE_AREAS,
  TESTIMONIALS,
} from "../data/siteContent";

export function AboutAndAreasSection() {
  const [openFaqSlug, setOpenFaqSlug] = useState<string | null>(FAQ_ITEMS[0].slug);
  const [faqQuery, setFaqQuery] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const filteredFaqs = useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [faqQuery]);

  useEffect(() => {
    const hash = location.hash;
    if (hash.startsWith("#faq-")) {
      const slug = hash.slice("#faq-".length);
      const found = FAQ_ITEMS.find((item) => item.slug === slug);
      if (found) {
        setFaqQuery("");
        setOpenFaqSlug(found.slug);
        requestAnimationFrame(() => {
          const el = document.getElementById(`faq-${found.slug}`);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  }, [location.hash]);

  function toggleFaq(slug: string) {
    const next = openFaqSlug === slug ? null : slug;
    setOpenFaqSlug(next);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", next ? `/about#faq-${next}` : "/about#faq");
    }
  }

  async function copyFaqLink(slug: string) {
    const url = `${window.location.origin}/about#faq-${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug((prev) => (prev === slug ? null : prev)), 2500);
    } catch {
      window.history.replaceState(null, "", `/about#faq-${slug}`);
    }
  }

  function handleSelectTown(town: string) {
    navigate("/quote", {
      state: {
        town,
        timestamp: Date.now(),
      },
    });
  }

  return (
    <>
      <section id="about" className="scroll-mt-20 py-14 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
                About Paul&apos;s Roofing
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
                30 years of trust, one roof at a time
              </h1>
              <p className="mt-4 text-base text-[#2A3D57] leading-relaxed">
                For over 30 years, Paul&apos;s Roofing has been a trusted name across Southern New
                Brunswick — founded on integrity, craftsmanship, and genuine customer care. Our job
                is simple: protect your home and give you peace of mind.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CONTACT.googleReviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold transition-colors duration-150"
                >
                  Read our Google reviews
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT.googleReviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-11 rounded-lg border border-[#C3D6EA] hover:border-[#0B6CB8] text-[#081A33] font-display text-sm font-bold transition-colors duration-150"
                >
                  Leave a Google review
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full overflow-hidden rounded-2xl border border-[#C3D6EA] bg-[#081A33]">
                <img
                  src="/images/work-white-siding-metal.jpg"
                  alt="Five white Southern New Brunswick homes with standing-seam metal roofs in red, blue, green, charcoal and copper tones with the official Paul's Roofing emblem."
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-[#081A33]">What neighbours say</h2>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
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

          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-[#081A33]">
              Our process: simple &amp; transparent
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} className="rounded-xl border border-[#C3D6EA] bg-white p-5">
                  <div className="font-display text-sm font-extrabold text-[#0B6CB8] tabular-nums">
                    {step.num}.
                  </div>
                  <h3 className="mt-1 font-display text-lg font-bold text-[#081A33]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#47617F] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="areas"
        className="scroll-mt-20 py-14 lg:py-16 bg-[#EFF5FB] border-y border-[#C3D6EA]"
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">Where we work</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
                Service area — town by town
              </h2>
              <p className="mt-3 text-base text-[#47617F] max-w-2xl">
                Based in Quispamsis, working across Southern New Brunswick. Free inspections,
                itemized quotes and 24/7 emergency service in every town below. Select your town to
                start a quote.
              </p>
            </div>
            <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-[#C3D6EA] bg-[#081A33]">
              <img
                src="/images/about-saint-john-harbour.jpg"
                alt="Aerial view across Saint John skyline and Atlantic harbour communities served by Paul's Roofing."
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_AREAS.map((area) => (
              <button
                key={area.town}
                type="button"
                onClick={() => handleSelectTown(area.town)}
                className="text-left rounded-xl border border-[#C3D6EA] bg-white hover:border-[#0E8FE8] p-5 transition-colors duration-150 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-[#081A33] group-hover:text-[#0B6CB8] transition-colors">
                      {area.town}
                    </h3>
                    <MapPin className="w-4 h-4 text-[#0B6CB8] shrink-0" />
                  </div>
                  <p className="mt-2 text-sm text-[#47617F] leading-relaxed">{area.note}</p>
                </div>
                <span className="mt-4 text-xs font-bold text-[#0B6CB8]">
                  Request quote in {area.town} &rarr;
                </span>
              </button>
            ))}
          </div>

          <div
            id="financing"
            className="scroll-mt-20 mt-10 rounded-2xl border border-[#C3D6EA] bg-white p-6 lg:p-8 max-w-3xl"
          >
            <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
              Financing &middot; Coming soon
            </p>
            <h3 className="mt-1.5 font-display text-2xl font-extrabold text-[#081A33]">
              Want to know when monthly financing launches?
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-[#47617F] leading-relaxed">
              We&apos;re setting up financing so a roof that needs doing now can be spread out
              instead of draining your savings. It&apos;s not available yet — ask Paul at your free
              estimate and he&apos;ll note your interest while your itemized quote stays valid for
              planning.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center px-5 py-2.5 min-h-11 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold transition-colors duration-150"
              >
                Get a free quote
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold transition-colors duration-150"
              >
                <Phone className="w-4 h-4" />
                Call Paul
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 py-14 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
            Straight answers
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
            Questions homeowners ask Paul
          </h2>
          <p className="mt-3 text-base text-[#47617F]">
            Search or tap a question to open the answer. No sales talk — the same answers
            you&apos;d get at your kitchen table.
          </p>

          <div className="mt-6 relative max-w-md">
            <label htmlFor="faqSearch" className="sr-only">
              Search FAQ
            </label>
            <Search
              className="w-4 h-4 text-[#47617F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="faqSearch"
              type="text"
              value={faqQuery}
              onChange={(e) => setFaqQuery(e.target.value)}
              placeholder="Search questions (e.g. cost, winter, ice dam)..."
              className="w-full pl-10 pr-4 py-2.5 min-h-11 rounded-xl border border-[#C3D6EA] bg-[#EFF5FB]/50 text-[#081A33] placeholder:text-[#47617F] text-sm focus:outline-none focus:border-[#0B6CB8]"
            />
          </div>

          <div className="mt-6 divide-y divide-[#C3D6EA] border-y border-[#C3D6EA]">
            {filteredFaqs.length === 0 ? (
              <div className="py-6 text-sm text-[#47617F]">
                No FAQ questions match &ldquo;{faqQuery}&rdquo;.{" "}
                <button
                  type="button"
                  onClick={() => setFaqQuery("")}
                  className="font-semibold text-[#0B6CB8] underline cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredFaqs.map((item) => {
                const isOpen = openFaqSlug === item.slug || faqQuery.trim().length > 0;
                return (
                  <div key={item.slug} id={`faq-${item.slug}`} className="scroll-mt-24">
                    <button
                      type="button"
                      onClick={() => toggleFaq(item.slug)}
                      aria-expanded={isOpen}
                      className="w-full py-4 px-1 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6CB8]"
                    >
                      <span className="font-display text-base sm:text-lg font-semibold text-[#081A33]">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#0B6CB8] shrink-0 transition-transform duration-150 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 px-1 text-sm sm:text-base text-[#2A3D57] leading-relaxed space-y-3">
                        <p>
                          {item.answer}{" "}
                          {item.linkToCompare && (
                            <Link
                              to="/services#compare"
                              className="font-semibold text-[#0B6CB8] underline underline-offset-2"
                            >
                              See the honest comparison table.
                            </Link>
                          )}
                          {item.slug === "free-inspections-and-quotes" && (
                            <Link
                              to="/quote"
                              className="font-semibold text-[#0B6CB8] underline underline-offset-2"
                            >
                              Open the Get a Quote form.
                            </Link>
                          )}
                          {item.slug === "ice-dams-causes-and-fix" && (
                            <Link
                              to="/blog/ice-dams-explained"
                              className="font-semibold text-[#0B6CB8] underline underline-offset-2"
                            >
                              Read the ice dam guide.
                            </Link>
                          )}
                        </p>
                        <button
                          type="button"
                          onClick={() => copyFaqLink(item.slug)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B6CB8] hover:underline cursor-pointer"
                        >
                          {copiedSlug === item.slug ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#15803D]" />
                              FAQ link copied
                            </>
                          ) : (
                            <>
                              <Link2 className="w-3.5 h-3.5" />
                              Copy direct link to this answer
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
