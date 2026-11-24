import { Link } from "react-router-dom";
import { Clock, Compass, Globe, Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import { CONTACT } from "../data/siteContent";

export function Footer() {
  return (
    <>
      <footer className="relative bg-[#081A33] border-t border-[#1E3A5F] overflow-hidden text-[#C9DDF3] pt-12 pb-24 lg:pb-12">
        {/* Full-width background graphic */}
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat pointer-events-none"
          style={{ backgroundImage: "url('/images/footer-bg.webp')" }}
          aria-hidden="true"
        />

        {/* Subtle left-to-right dark navy scrim overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#081A33]/92 via-[#081A33]/80 to-[#081A33]/40 pointer-events-none"
          aria-hidden="true"
        />

        {/* 4-Column Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Column 1: Brand */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block group mb-3">
                <img
                  src="/images/logo-badge.png"
                  alt="Paul's Roofing — Atlantic Canada's Trusted Roofing Experts official emblem"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-48 sm:w-56 h-auto block drop-shadow-[0_0_18px_rgba(69,188,255,0.45)] group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
              <p className="mt-2 text-sm text-[#C9DDF3] leading-relaxed max-w-sm">
                Your trusted roofing partner in Southern New Brunswick for over 30 years. Quality
                and reliability you can count on.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-3">
              <h4 className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#F5C451]">
                <Compass className="w-3.5 h-3.5 text-[#F5C451]" />
                QUICK LINKS
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to="/services" className="hover:text-white hover:underline transition-colors">
                    Services &amp; Compare
                  </Link>
                </li>
                <li>
                  <Link to="/winter-help" className="hover:text-white hover:underline transition-colors">
                    Winter Help
                  </Link>
                </li>
                <li>
                  <Link to="/our-work" className="hover:text-white hover:underline transition-colors">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white hover:underline transition-colors">
                    About, Areas &amp; FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white hover:underline transition-colors">
                    Blog &amp; Handbook
                  </Link>
                </li>
                <li>
                  <Link to="/quote" className="hover:text-white hover:underline transition-colors">
                    Get a Quote
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="hover:text-white hover:underline transition-colors">
                    XML Sitemap &amp; Crawler
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="lg:col-span-3">
              <h4 className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#F5C451]">
                <PhoneCall className="w-3.5 h-3.5 text-[#F5C451]" />
                CONTACT
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 hover:text-white hover:underline transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#45BCFF] shrink-0" />
                    Call {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.emailHref}
                    className="inline-flex items-center gap-2 hover:text-white hover:underline transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#45BCFF] shrink-0" />
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.facebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white hover:underline transition-colors"
                  >
                    <Globe className="w-4 h-4 text-[#45BCFF] shrink-0" />
                    Facebook
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-[#C9DDF3]">
                  <MapPin className="w-4 h-4 text-[#45BCFF] shrink-0" />
                  Quispamsis, New Brunswick
                </li>
              </ul>
            </div>

            {/* Column 4: Business Hours */}
            <div className="lg:col-span-2">
              <h4 className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#F5C451]">
                <Clock className="w-3.5 h-3.5 text-[#F5C451]" />
                BUSINESS HOURS
              </h4>
              <p className="mt-4 text-sm text-[#C9DDF3] leading-relaxed">
                {CONTACT.hours}
              </p>
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="border-t border-white/15 mt-10 pt-6 text-xs text-[#9BB4CE] flex flex-wrap gap-x-6 gap-y-2">
            <span>&copy; 2026 Paul&apos;s Roofing. All rights reserved.</span>
            <span>Based in Quispamsis, serving Southern NB</span>
            <span>
              Metal systems by Community Metal &amp; Dairy Town Exteriors &middot; Shingles by IKO
              &amp; BP
            </span>
            <span>Your quote details are only used to contact you about your roof.</span>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Quick Contact Bar */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-sm border-t border-[#C3D6EA] px-3 py-2 flex gap-2.5"
        role="navigation"
        aria-label="Quick contact"
      >
        <a
          href={CONTACT.phoneHref}
          className="btn-call-glow flex-1 inline-flex items-center justify-center gap-2 min-h-11 px-4 font-display text-sm font-extrabold tracking-tight"
        >
          <Phone className="w-4 h-4 text-[#45BCFF] drop-shadow-[0_0_6px_rgba(69,188,255,0.8)] shrink-0" />
          Call Paul
        </a>
        <Link
          to="/quote"
          className="btn-quote-glow flex-1 inline-flex items-center justify-center min-h-11 px-4 font-display text-sm font-extrabold tracking-tight"
        >
          Free Quote
        </Link>
      </div>
    </>
  );
}
