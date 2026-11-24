/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ServicesSection } from "./components/ServicesSection";
import { WinterHelpSection } from "./components/WinterHelpSection";
import { WorkGallerySection } from "./components/WorkGallerySection";
import { AboutAndAreasSection } from "./components/AboutAndAreasSection";
import { BlogSection } from "./components/BlogSection";
import { QuoteSection } from "./components/QuoteSection";
import { GmailWorkspaceSection } from "./components/GmailWorkspaceSection";
import { SitemapGeneratorSection } from "./components/SitemapGeneratorSection";
import { Footer } from "./components/Footer";

const LEGACY_HASH_ROUTES: Record<string, string> = {
  "#services": "/services",
  "#compare": "/services#compare",
  "#winter": "/winter-help",
  "#work": "/our-work",
  "#about": "/about",
  "#areas": "/about#areas",
  "#financing": "/about#financing",
  "#faq": "/about#faq",
  "#handbook": "/blog",
  "#quote": "/quote",
  "#gmail": "/gmail",
};

function ScrollAndHashManager() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/" && hash) {
      if (hash.startsWith("#guide/")) {
        const slug = hash.slice("#guide/".length);
        navigate(`/blog/${slug}`, { replace: true });
        return;
      }
      if (hash.startsWith("#faq-")) {
        navigate(`/about${hash}`, { replace: true });
        return;
      }
      const mapped = LEGACY_HASH_ROUTES[hash];
      if (mapped) {
        navigate(mapped, { replace: true });
        return;
      }
    }

    if (hash) {
      const targetId = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, navigate]);

  return null;
}

function NotFoundPage() {
  return (
    <section className="py-16 lg:py-20 bg-[#EFF5FB] min-h-[60vh]">
      <div className="max-w-xl mx-auto px-4 text-center space-y-4">
        <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">Page not found</p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
          We couldn&apos;t find that page
        </h1>
        <p className="text-base text-[#47617F]">
          Use the links below to head back home, browse roofing guides, or request a free quote.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold"
          >
            Back to Home
          </Link>
          <Link
            to="/quote"
            className="inline-flex items-center justify-center px-5 py-2.5 min-h-11 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2A3D57]">
      <ScrollAndHashManager />
      <Header />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesSection />} />
          <Route path="/winter-help" element={<WinterHelpSection />} />
          <Route path="/our-work" element={<WorkGallerySection />} />
          <Route path="/about" element={<AboutAndAreasSection />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/blog/:slug" element={<BlogSection />} />
          <Route path="/quote" element={<QuoteSection />} />
          <Route path="/gmail" element={<GmailWorkspaceSection />} />
          <Route path="/sitemap" element={<SitemapGeneratorSection />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
