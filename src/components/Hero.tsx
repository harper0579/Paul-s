import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { CONTACT } from "../data/siteContent";

export function Hero() {
  return (
    <section className="bg-[#050D20] text-white">
      {/* Full-width hero banner showing more of the image */}
      <div className="w-full bg-[#050D20] overflow-hidden border-b border-white/10 shadow-lg">
        <img
          src="/images/hero-winter-bridge.jpg"
          alt="Paul's Roofing winter banner featuring the snowy Damascus covered bridge in New Brunswick at sunset."
          className="w-full h-auto block mx-auto object-cover"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Centered sub text and action buttons below the image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 lg:py-14 text-center flex flex-col items-center">
        <p className="text-[#C9DDF3] text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
          Premium metal roofing and architectural shingles for homes across Quispamsis, Saint John,
          Hampton and Southern New Brunswick. Straight work, done right.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full">
          <Link
            to="/quote"
            className="btn-quote-glow inline-flex items-center justify-center px-6 py-3.5 min-h-12 font-display font-extrabold text-base whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-md"
          >
            Get a Free Quote
          </Link>

          <a
            href={CONTACT.phoneHref}
            className="btn-call-glow inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-12 font-display font-extrabold text-base whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45BCFF] shadow-md"
          >
            <Phone className="w-4 h-4 text-[#45BCFF] drop-shadow-[0_0_6px_rgba(69,188,255,0.8)] shrink-0" />
            Call Now
          </a>

          <a
            href={CONTACT.emailHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-12 rounded-lg border border-white/30 hover:border-[#45BCFF] text-white hover:text-[#BFE3FF] font-semibold text-sm whitespace-nowrap shrink-0 transition-colors duration-150"
          >
            <Mail className="w-4 h-4 shrink-0 text-[#45BCFF]" />
            Email Paul
          </a>

          <a
            href={CONTACT.facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3.5 min-h-12 rounded-lg border border-white/30 hover:border-[#45BCFF] text-white hover:text-[#BFE3FF] font-semibold text-sm whitespace-nowrap shrink-0 transition-colors duration-150"
          >
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
