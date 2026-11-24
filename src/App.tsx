/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ServicesSection } from "./components/ServicesSection";
import { WinterHelpSection } from "./components/WinterHelpSection";
import { WorkGallerySection } from "./components/WorkGallerySection";
import { AboutAndAreasSection } from "./components/AboutAndAreasSection";
import { BlogSection } from "./components/BlogSection";
import { QuoteSection, type QuotePrefill } from "./components/QuoteSection";
import { GmailWorkspaceSection } from "./components/GmailWorkspaceSection";
import { Footer } from "./components/Footer";

function scrollToQuote() {
  const el = document.getElementById("quote");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [quotePrefill, setQuotePrefill] = useState<QuotePrefill | null>(null);
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);

  const handleSelectRoofQuote = useCallback(
    (roofType: "Metal" | "Shingles", colourNote?: string) => {
      setQuotePrefill({
        projectType: "Replacement",
        roofType,
        description: colourNote,
        timestamp: Date.now(),
      });
      scrollToQuote();
    },
    []
  );

  const handleSelectWinterQuote = useCallback(
    (
      projectType: "Repair / Leak" | "Inspection",
      note: string,
      urgency: "standard" | "emergency" = "standard"
    ) => {
      setQuotePrefill({
        urgency,
        projectType,
        description: note,
        timestamp: Date.now(),
      });
      scrollToQuote();
    },
    []
  );

  const handleSelectTown = useCallback((town: string) => {
    setQuotePrefill({
      town,
      timestamp: Date.now(),
    });
    scrollToQuote();
  }, []);

  const handleOpenIceDamGuide = useCallback(() => {
    setOpenArticleId("ice-dams-explained");
  }, []);

  const handleClearExternalOpen = useCallback(() => {
    setOpenArticleId(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2A3D57]">
      <Header />
      <main className="flex-1">
        <Hero />
        <ServicesSection onSelectRoofQuote={handleSelectRoofQuote} />
        <WinterHelpSection
          onOpenIceDamGuide={handleOpenIceDamGuide}
          onSelectWinterQuote={handleSelectWinterQuote}
        />
        <WorkGallerySection />
        <AboutAndAreasSection onSelectTown={handleSelectTown} />
        <BlogSection
          openArticleId={openArticleId}
          onClearExternalOpen={handleClearExternalOpen}
        />
        <QuoteSection prefill={quotePrefill} />
        <GmailWorkspaceSection />
      </main>
      <Footer />
    </div>
  );
}
