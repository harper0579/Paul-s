import { Link, useNavigate } from "react-router-dom";
import { Phone, BookOpen, Snowflake, ShieldAlert } from "lucide-react";
import { CONTACT, WINTER_SERVICES } from "../data/siteContent";

export function WinterHelpSection() {
  const navigate = useNavigate();

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

  return (
    <section
      id="winter"
      className="scroll-mt-20 py-14 lg:py-16 bg-[#E4EFFA] border-b border-[#C3D6EA]"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[#C3D6EA] bg-[#081A33] max-w-md lg:ml-auto">
              <img
                src="/assets/aistudio/image_b39e51-stop-with-the-30-years-strong-and-better-call-paul_d90b71d9.jpg"
                alt="Misty Atlantic morning over the Damascus Covered Bridge with the official Paul's Roofing emblem."
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WINTER_SERVICES.map((svc) => (
            <article
              key={svc.id}
              id={`winter-${svc.id}`}
              className="scroll-mt-24 rounded-xl border border-[#C3D6EA] bg-white p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="font-display text-lg font-bold text-[#081A33]">{svc.title}</h2>
                <p className="mt-2 text-sm text-[#47617F] leading-relaxed">{svc.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#EFF5FB] space-y-2">
                {svc.action === "ice-guide" && (
                  <Link
                    to="/blog/ice-dams-explained"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold transition-colors duration-150"
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    {svc.ctaLabel}
                  </Link>
                )}

                {svc.action === "call" && (
                  <>
                    <a
                      href={CONTACT.phoneHref}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold transition-colors duration-150"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      {svc.ctaLabel}
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
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold cursor-pointer transition-colors duration-150"
                  >
                    <Snowflake className="w-4 h-4 shrink-0" />
                    {svc.ctaLabel}
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
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold cursor-pointer transition-colors duration-150"
                  >
                    {svc.ctaLabel}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-[#D97706]/35 bg-[#FFF7E6] px-5 py-4 flex items-start gap-3 max-w-3xl">
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
