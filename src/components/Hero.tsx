import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { CONTACT, HERO_STATS } from "../data/siteContent";

export function Hero() {
  return (
    <section className="bg-[#050D20] text-white py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 text-left">
            <p className="text-[#45BCFF] text-xs sm:text-sm font-bold tracking-wide">
              Quispamsis, NB &middot; Serving Saint John, Hampton &amp; Southern New Brunswick
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mt-3">
              The last roof you&apos;ll <span className="text-[#45BCFF]">ever need.</span>
            </h1>

            <p className="mt-4 text-[#C9DDF3] text-base sm:text-lg leading-relaxed max-w-xl">
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
          </div>

          {/* Right Column: Framed Card with Bridge Image & Glass Caption Bar */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#1E3A5F] shadow-2xl relative bg-[#081A33]">
              <img
                src="/images/hero-damascus-bridge.jpg"
                alt="Damascus covered bridge near Hampton, New Brunswick at sunset with the Paul's Roofing emblem over the bridge and river."
                className="w-full h-auto object-cover block"
                fetchPriority="high"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[#050D20]/85 backdrop-blur-md px-4 py-3 border-t border-white/10">
                <p className="text-xs sm:text-sm font-display font-semibold text-white text-center">
                  Damascus, New Brunswick
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-4">
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
    </section>
  );
}
