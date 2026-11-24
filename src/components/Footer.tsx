import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { CONTACT } from "../data/siteContent";

export function Footer() {
  return (
    <>
      <footer className="bg-[#081A33] text-[#C9DDF3] pt-12 pb-20 lg:pb-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="inline-block">
                <img
                  src="/images/logo-footer-emblem.png"
                  alt="Paul's Roofing — Atlantic Canada's Trusted Roofing Experts official emblem"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-44 h-auto rounded-xl border border-white/15 block"
                />
              </Link>
              <p className="mt-3 text-sm text-[#C9DDF3] leading-relaxed">
                Your trusted roofing partner in Southern New Brunswick for over 30 years. Quality
                and reliability you can count on.
              </p>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Quick links
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/services" className="hover:text-white hover:underline">
                    Services &amp; Compare
                  </Link>
                </li>
                <li>
                  <Link to="/winter-help" className="hover:text-white hover:underline">
                    Winter Help
                  </Link>
                </li>
                <li>
                  <Link to="/our-work" className="hover:text-white hover:underline">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white hover:underline">
                    About, Areas &amp; FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white hover:underline">
                    Blog &amp; Handbook
                  </Link>
                </li>
                <li>
                  <Link to="/quote" className="hover:text-white hover:underline">
                    Get a Quote
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="hover:text-white hover:underline">
                    XML Sitemap &amp; Crawler
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Contact
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href={CONTACT.phoneHref} className="hover:text-white hover:underline">
                    Call {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.emailHref} className="hover:text-white hover:underline">
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.facebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    Facebook
                  </a>
                </li>
                <li>Quispamsis, New Brunswick</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Business hours
              </h4>
              <p className="mt-3 text-sm text-[#C9DDF3] leading-relaxed">{CONTACT.hours}</p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#9CC8F2]">
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
