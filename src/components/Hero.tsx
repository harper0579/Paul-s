import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { CONTACT, HERO_STATS } from "../data/siteContent";

export function Hero() {
  return (
    <section className="bg-[#050D20] text-white">
      <div className="relative bg-[#050D20] overflow-hidden">
        <img
          src="/assets/aistudio/image_b39e51-stop-with-the-30-years-strong-and-better-call-paul-try-the-first-damascus-bridge-image_f8b7f0a6.jpg"
          alt="Damascus covered bridge near Hampton, New Brunswick at sunset with the Paul's Roofing emblem over the bridge and river."
          className="w-full h-auto md:max-h-[540px] md:w-auto md:mx-auto object-contain block"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-[#050D20] to-transparent"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 pt-6 pb-10 lg:pb-12">
        <p className="text-sm font-semibold text-[#9CC8F2] mb-3">
          Quispamsis, NB &middot; Serving Saint John, Hampton &amp; Southern New Brunswick
        </p>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-white max-w-2xl">
          The last roof you&apos;ll <span className="text-[#45BCFF]">ever need.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#DCE9F8] max-w-2xl leading-relaxed">
          Premium metal roofing and architectural shingles for homes across Quispamsis, Saint John,
          Hampton and Southern New Brunswick. Straight work, done right.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            to="/quote"
            className="btn-quote-glow inline-flex items-center justify-center px-6 py-3 min-h-12 font-display font-extrabold text-base whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get a Free Quote
          </Link>

          <a
            href={CONTACT.phoneHref}
            className="btn-call-glow inline-flex items-center justify-center gap-2 px-6 py-3 min-h-12 font-display font-extrabold text-base whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45BCFF]"
          >
            <Phone className="w-4 h-4 text-[#45BCFF] drop-shadow-[0_0_6px_rgba(69,188,255,0.8)] shrink-0" />
            Call {CONTACT.phoneDisplay}
          </a>

          <a
            href={CONTACT.emailHref}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-12 rounded-lg border border-white/30 hover:border-[#45BCFF] text-white hover:text-[#BFE3FF] font-semibold text-sm whitespace-nowrap shrink-0 transition-colors duration-150"
          >
            <Mail className="w-4 h-4 shrink-0" />
            Email Paul
          </a>

          <a
            href={CONTACT.facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-3 min-h-12 rounded-lg border border-white/30 hover:border-[#45BCFF] text-white hover:text-[#BFE3FF] font-semibold text-sm whitespace-nowrap shrink-0 transition-colors duration-150"
          >
            Facebook
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white/[0.06] border border-white/15 px-4 py-4"
            >
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#45BCFF] tabular-nums leading-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-[#C9DDF3]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-b border-[#EFF5FB]">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-3">
          <p className="text-xs sm:text-sm text-[#47617F]">
            <strong className="font-display font-bold text-[#081A33]">
              Damascus Covered Bridge — Hampton area.
            </strong>{" "}
            Local landmark, local crew.
          </p>
        </div>
      </div>
    </section>
  );
}
