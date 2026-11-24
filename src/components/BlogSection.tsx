import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  ExternalLink,
  Flame,
  Layers,
  LayoutGrid,
  Link2,
  List,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  ARTICLE_CATEGORIES,
  ARTICLES,
  type Article,
  type TextSegment,
} from "../data/articles";
import { CONTACT } from "../data/siteContent";

const PAGE_SIZE = 9;

// Thematic Topic Clusters
export type TopicTheme = "all" | "roofing" | "maintenance" | "seasonal" | "planning";

interface ThemeDefinition {
  id: TopicTheme;
  label: string;
  shortLabel: string;
  icon: typeof Layers;
  description: string;
  categories: string[];
}

const TOPIC_THEMES: ThemeDefinition[] = [
  {
    id: "all",
    label: "All 36 Guides",
    shortLabel: "All Topics",
    icon: BookOpen,
    description: "Every homeowner guide across metal roofing, shingles, repairs, and winter prep.",
    categories: [],
  },
  {
    id: "roofing",
    label: "Roofing Systems & Materials",
    shortLabel: "Roofing",
    icon: Layers,
    description: "Standing-seam metal roofing, architectural shingles, warranties, and material comparisons.",
    categories: ["Metal Roofing", "Shingles"],
  },
  {
    id: "seasonal",
    label: "Seasonal & Winter Prep",
    shortLabel: "Seasonal",
    icon: Snowflake,
    description: "Ice dams, winter roof leaks, snow loads, snow rails, and freeze-thaw protection.",
    categories: ["Ice Dams & Winter"],
  },
  {
    id: "maintenance",
    label: "Maintenance & Leak Repairs",
    shortLabel: "Maintenance",
    icon: Wrench,
    description: "Flashing, chimneys, gutters, soffit, fascia, ventilation, moss removal, and leak detection.",
    categories: ["Repairs & Leaks", "Maintenance", "Gutters & Exterior"],
  },
  {
    id: "planning",
    label: "Cost, Quotes & Town Guides",
    shortLabel: "Cost & Towns",
    icon: MapPin,
    description: "Real New Brunswick pricing, replacement steps, financing, and town-specific guides.",
    categories: ["Cost & Financing", "Towns"],
  },
];

function formatArticleDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getGuideUrl(articleId: string): string {
  if (typeof window === "undefined") return `https://www.paulroofs.com/blog/${articleId}`;
  return `${window.location.origin}/blog/${articleId}`;
}

function RenderSegments({ segments }: { segments: TextSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (!seg.href) return <span key={i}>{seg.text}</span>;
        if (seg.external || seg.href.startsWith("tel:") || seg.href.startsWith("mailto:")) {
          return (
            <a
              key={i}
              href={seg.href}
              target={seg.external ? "_blank" : undefined}
              rel={seg.external ? "noopener noreferrer" : undefined}
              className="font-semibold text-[#0B6CB8] underline underline-offset-2"
            >
              {seg.text}
            </a>
          );
        }
        return (
          <Link
            key={i}
            to={seg.href}
            className="font-semibold text-[#0B6CB8] underline underline-offset-2"
          >
            {seg.text}
          </Link>
        );
      })}
    </>
  );
}

function ArticleDetailView({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false);

  const idx = ARTICLES.findIndex((a) => a.id === article.id);
  const prevArticle = idx > 0 ? ARTICLES[idx - 1] : null;
  const nextArticle = idx >= 0 && idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : null;

  // Headings for Table of Contents
  const headings = useMemo(() => {
    return article.blocks
      .map((b, i) => (b.type === "h4" ? { text: b.text, index: i } : null))
      .filter((h): h is { text: string; index: number } => h !== null);
  }, [article]);

  // Related articles in the same category
  const relatedArticles = useMemo(() => {
    return ARTICLES.filter((a) => a.id !== article.id && a.cat === article.cat).slice(0, 3);
  }, [article]);

  async function handleCopyLink() {
    const url = getGuideUrl(article.id);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked
    }
  }

  function scrollToHeading(index: number) {
    const el = document.getElementById(`section-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="pb-12 md:py-10 lg:py-14 bg-[#EFF5FB] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-5 pb-4 md:pt-0 md:pb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B6CB8] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all 36 guides &amp; Table of Contents
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#47617F]">
          <span className="px-2.5 py-1 rounded-md bg-white border border-[#C3D6EA] text-[#081A33]">
            {article.cat}
          </span>
          {article.town && (
            <span className="px-2.5 py-1 rounded-md bg-[#EBF4FC] border border-[#C3D6EA] text-[#0B6CB8]">
              {article.town}
            </span>
          )}
        </div>
      </div>

      {article.image && (
        <div className="w-full md:max-w-7xl md:mx-auto md:px-6 mb-6 md:mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto block rounded-none md:rounded-2xl border md:border-[#C3D6EA] shadow-sm max-h-[520px] object-cover"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Article Body */}
        <div className="lg:col-span-8">
          <article className="rounded-2xl border border-[#C3D6EA] bg-white p-6 sm:p-10 space-y-6 shadow-sm">
            <header>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#081A33] leading-tight">
                {article.title}
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-[#47617F] tabular-nums">
                {formatArticleDate(article.date)} &middot; {article.read} min read &middot; Paul&apos;s Roofing — Quispamsis, Saint John &amp; Southern NB
              </p>
            </header>

            {/* Mobile In-Article TOC */}
            {headings.length > 0 && (
              <div className="lg:hidden rounded-xl border border-[#C3D6EA] bg-[#EFF5FB] p-4">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-[#081A33] mb-2">
                  <List className="w-4 h-4 text-[#0B6CB8]" />
                  In this guide:
                </div>
                <ul className="space-y-1.5 text-xs text-[#0B6CB8]">
                  {headings.map((h) => (
                    <li key={h.index}>
                      <button
                        type="button"
                        onClick={() => scrollToHeading(h.index)}
                        className="text-left hover:underline cursor-pointer"
                      >
                        &rarr; {h.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4 text-base text-[#2A3D57] leading-relaxed">
              {article.blocks.map((block, bIdx) => {
                if (block.type === "h4") {
                  return (
                    <h2
                      key={bIdx}
                      id={`section-${bIdx}`}
                      className="scroll-mt-24 font-display text-xl sm:text-2xl font-bold text-[#081A33] pt-4 border-t border-[#EFF5FB]"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "p") {
                  return (
                    <p key={bIdx}>
                      <RenderSegments segments={block.segments} />
                    </p>
                  );
                }
                return (
                  <ul key={bIdx} className="list-disc pl-6 space-y-1.5">
                    {block.items.map((itemSegs, liIdx) => (
                      <li key={liIdx}>
                        <RenderSegments segments={itemSegs} />
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>

            {article.faq.length > 0 && (
              <div className="rounded-xl border border-[#C3D6EA] bg-[#EFF5FB] p-5 space-y-3">
                <h3 className="font-display text-base font-bold text-[#081A33]">Common questions</h3>
                {article.faq.map(([q, a]) => (
                  <div key={q} className="pt-2 border-t border-[#C3D6EA]/50 first:pt-0 first:border-0">
                    <p className="font-semibold text-[#081A33] text-sm">{q}</p>
                    <p className="mt-1 text-sm text-[#2A3D57] leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/quote"
                state={{
                  description: `Question after reading: ${article.title}`,
                  timestamp: Date.now(),
                }}
                className="btn-quote-glow inline-flex items-center justify-center px-5 py-2.5 min-h-11 font-display text-sm font-extrabold cursor-pointer"
              >
                Get a Free Quote
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Paul
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg border border-[#C3D6EA] text-[#081A33] font-semibold text-sm hover:bg-[#EFF5FB] cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#15803D]" />
                    Link copied
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4 text-[#0B6CB8]" />
                    Copy guide link
                  </>
                )}
              </button>
              <a
                href={`mailto:?subject=${encodeURIComponent(
                  `${article.title} — Paul's Roofing`
                )}&body=${encodeURIComponent(
                  `${article.title}\n\n${article.excerpt}\n\nRead the full guide: ${getGuideUrl(
                    article.id
                  )}`
                )}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg border border-[#C3D6EA] text-[#081A33] font-semibold text-sm hover:bg-[#EFF5FB] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#0B6CB8]" />
                Share by email
              </a>
            </div>

            <div className="pt-5 border-t border-[#C3D6EA] flex flex-wrap items-center justify-between gap-3">
              {prevArticle ? (
                <Link
                  to={`/blog/${prevArticle.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] hover:bg-[#EFF5FB] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {prevArticle.title.slice(0, 28)}...
                </Link>
              ) : (
                <span />
              )}

              {nextArticle && (
                <Link
                  to={`/blog/${nextArticle.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] hover:bg-[#EFF5FB] transition-colors"
                >
                  {nextArticle.title.slice(0, 28)}...
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </article>
        </div>

        {/* Sidebar: Sticky Desktop Table of Contents & Related Guides */}
        <div className="lg:col-span-4 space-y-6">
          {headings.length > 0 && (
            <div className="hidden lg:block sticky top-24 rounded-2xl border border-[#C3D6EA] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 font-display text-base font-bold text-[#081A33] pb-3 border-b border-[#EFF5FB]">
                <List className="w-4 h-4 text-[#0B6CB8]" />
                Guide Table of Contents
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {headings.map((h, i) => (
                  <li key={h.index}>
                    <button
                      type="button"
                      onClick={() => scrollToHeading(h.index)}
                      className="text-left text-[#47617F] hover:text-[#0B6CB8] hover:underline cursor-pointer flex items-start gap-2"
                    >
                      <span className="text-[#0B6CB8] font-bold text-xs shrink-0 mt-0.5">
                        0{i + 1}.
                      </span>
                      <span>{h.text}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-[#EFF5FB]">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B6CB8] hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Browse full 36-guide handbook
                </Link>
              </div>
            </div>
          )}

          {relatedArticles.length > 0 && (
            <div className="rounded-2xl border border-[#C3D6EA] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 font-display text-base font-bold text-[#081A33] pb-3 border-b border-[#EFF5FB]">
                <Sparkles className="w-4 h-4 text-[#0B6CB8]" />
                More on {article.cat}
              </div>
              <div className="mt-4 space-y-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/blog/${rel.id}`}
                    className="block group p-3 rounded-xl border border-[#EFF5FB] hover:border-[#C3D6EA] hover:bg-[#EFF5FB]/50 transition-all"
                  >
                    <h4 className="font-display text-sm font-bold text-[#081A33] group-hover:text-[#0B6CB8] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="mt-1 text-xs text-[#47617F] line-clamp-2">{rel.excerpt}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#0B6CB8]">
                      Read guide &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function BlogSection() {
  const { slug } = useParams<{ slug?: string }>();
  const [activeTheme, setActiveTheme] = useState<TopicTheme>("all");
  const [activeCat, setActiveCat] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [viewMode, setViewMode] = useState<"grid" | "toc">("grid");
  const [isTocDrawerOpen, setIsTocDrawerOpen] = useState(false);

  const selectedArticle = useMemo(
    () => (slug ? ARTICLES.find((a) => a.id === slug) ?? null : null),
    [slug]
  );

  // Dynamic Category Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: ARTICLES.length };
    for (const a of ARTICLES) {
      counts[a.cat] = (counts[a.cat] || 0) + 1;
    }
    return counts;
  }, []);

  // Theme Counts
  const themeCounts = useMemo(() => {
    return {
      all: ARTICLES.length,
      roofing: ARTICLES.filter((a) => a.cat === "Metal Roofing" || a.cat === "Shingles").length,
      seasonal: ARTICLES.filter((a) => a.cat === "Ice Dams & Winter").length,
      maintenance: ARTICLES.filter(
        (a) => a.cat === "Repairs & Leaks" || a.cat === "Maintenance" || a.cat === "Gutters & Exterior"
      ).length,
      planning: ARTICLES.filter((a) => a.cat === "Cost & Financing" || a.cat === "Towns").length,
    };
  }, []);

  // Active theme definition
  const currentThemeDef = useMemo(() => {
    return TOPIC_THEMES.find((t) => t.id === activeTheme) || TOPIC_THEMES[0];
  }, [activeTheme]);

  // Categories visible under the active theme
  const visibleCategories = useMemo(() => {
    if (activeTheme === "all") return ARTICLE_CATEGORIES;
    return ["All", ...currentThemeDef.categories];
  }, [activeTheme, currentThemeDef]);

  // Handle Theme Selection
  function handleSelectTheme(themeId: TopicTheme) {
    setActiveTheme(themeId);
    setActiveCat("All");
    setShown(PAGE_SIZE);
  }

  // Handle Category Selection
  function handleSelectCat(cat: string) {
    setActiveCat(cat);
    setShown(PAGE_SIZE);
  }

  // Filtered Articles
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      // 1. Theme check
      if (activeTheme !== "all") {
        if (!currentThemeDef.categories.includes(a.cat)) return false;
      }

      // 2. Category check
      if (activeCat !== "All" && a.cat !== activeCat) return false;

      // 3. Search query check
      if (!q) return true;
      const bodyText = a.blocks
        .map((b) =>
          b.type === "h4"
            ? b.text
            : b.type === "p"
            ? b.segments.map((s) => s.text).join("")
            : b.items.map((it) => it.map((s) => s.text).join("")).join(" ")
        )
        .join(" ");
      const haystack = `${a.title} ${a.excerpt} ${a.cat} ${a.town} ${bodyText}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [activeTheme, activeCat, currentThemeDef, query]);

  // Grouped articles for the Comprehensive Table of Contents view
  const tocChapters = useMemo(() => {
    return [
      {
        id: "roofing",
        title: "Chapter 1: Metal Roofing & Architectural Shingles",
        badge: "Systems & Comparison",
        icon: Layers,
        color: "#0B6CB8",
        articles: ARTICLES.filter((a) => a.cat === "Metal Roofing" || a.cat === "Shingles"),
      },
      {
        id: "seasonal",
        title: "Chapter 2: Winter Weather & Ice Dam Protection",
        badge: "Seasonal Emergencies",
        icon: Snowflake,
        color: "#0284C7",
        articles: ARTICLES.filter((a) => a.cat === "Ice Dams & Winter"),
      },
      {
        id: "maintenance",
        title: "Chapter 3: Roof Repairs, Flashing, Gutters & Soffits",
        badge: "Exterior Maintenance",
        icon: Wrench,
        color: "#15803D",
        articles: ARTICLES.filter(
          (a) => a.cat === "Repairs & Leaks" || a.cat === "Maintenance" || a.cat === "Gutters & Exterior"
        ),
      },
      {
        id: "planning",
        title: "Chapter 4: Cost, Financing & Southern NB Town Guides",
        badge: "Quotes & Local Info",
        icon: MapPin,
        color: "#B45309",
        articles: ARTICLES.filter((a) => a.cat === "Cost & Financing" || a.cat === "Towns"),
      },
    ];
  }, []);

  if (slug && selectedArticle) {
    return <ArticleDetailView article={selectedArticle} />;
  }

  if (slug && !selectedArticle) {
    return (
      <section className="py-16 bg-[#EFF5FB] min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
          <h1 className="font-display text-3xl font-extrabold text-[#081A33]">
            Guide not found
          </h1>
          <p className="text-base text-[#47617F]">
            We couldn&apos;t find a roofing guide matching &ldquo;{slug}&rdquo;. Browse all{" "}
            {ARTICLES.length} homeowner guides below.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center px-5 py-2.5 min-h-11 rounded-lg bg-[#0E8FE8] text-white font-display text-sm font-bold"
          >
            Back to all guides
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="handbook" className="scroll-mt-20 pt-6 pb-12 bg-[#EFF5FB]">
      {/* Blog Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
        <div className="bg-[#081A33] rounded-2xl overflow-hidden relative max-w-7xl mx-auto mb-8 shadow-sm">
          <div
            className="absolute inset-0 bg-cover bg-right bg-no-repeat hidden lg:block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #081A33 0%, #081A33 48%, rgba(8,26,51,0.75) 72%, rgba(8,26,51,0.1) 100%), url('/images/blog-hero.webp')",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-2xl p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-bold tracking-widest uppercase text-[#45BCFF]">
              BLOG &middot; HOMEOWNER&apos;S HANDBOOK
            </p>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Roofing Tips &amp; Blog &mdash; Paul&apos;s Roofing Quispamsis NB
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#C9DDF3] leading-relaxed">
              Straight answers on metal roofing, architectural shingles, roof repair, ice dams, gutters
              and winter prep for homeowners across Southern New Brunswick. Every guide comes from 30
              years on the roof &mdash; no sales talk, just what to check, what it means, and when to call.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Table of Contents & Category Filter Hub */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
        <div className="bg-white border border-[#C3D6EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
          {/* Header Row: Title, Mode Toggles & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#EFF5FB]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EBF4FC] text-[#0B6CB8] text-xs font-bold uppercase tracking-wider mb-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                36-Article Handbook Navigation
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#081A33]">
                Table of Contents &amp; Topic Filter
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* View Switcher: Card Grid vs Table of Contents */}
              <div className="inline-flex p-1 rounded-xl bg-[#EFF5FB] border border-[#C3D6EA]">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-[#081A33] shadow-xs"
                      : "text-[#47617F] hover:text-[#081A33]"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Article Cards
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("toc")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "toc"
                      ? "bg-white text-[#081A33] shadow-xs"
                      : "text-[#47617F] hover:text-[#081A33]"
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  Table of Contents
                </button>
              </div>

              {/* Quick TOC Drawer Toggle Button */}
              <button
                type="button"
                onClick={() => setIsTocDrawerOpen(!isTocDrawerOpen)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#C3D6EA] bg-white text-[#081A33] hover:border-[#0B6CB8] text-xs font-bold transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#0B6CB8]" />
                {isTocDrawerOpen ? "Hide Directory" : "Quick Index (36 Guides)"}
                {isTocDrawerOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#47617F]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#47617F]" />
                )}
              </button>
            </div>
          </div>

          {/* Quick TOC Index Drawer (Collapsible) */}
          {isTocDrawerOpen && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFD] border border-[#C3D6EA] animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-[#E2ECF5]">
                <span className="font-display text-sm font-bold text-[#081A33] flex items-center gap-1.5">
                  <List className="w-4 h-4 text-[#0B6CB8]" />
                  Complete Handbook Index by Title &amp; Category
                </span>
                <span className="text-xs text-[#47617F]">
                  Tap any guide to read immediately
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                {ARTICLES.map((art, idx) => (
                  <Link
                    key={art.id}
                    to={`/blog/${art.id}`}
                    className="p-2 rounded-lg bg-white border border-[#E2ECF5] hover:border-[#0B6CB8] hover:shadow-xs transition-all flex items-start gap-2.5 text-left group"
                  >
                    <span className="font-mono text-[11px] font-bold text-[#0B6CB8] shrink-0 mt-0.5">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}.
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#081A33] group-hover:text-[#0B6CB8] transition-colors truncate">
                        {art.title}
                      </p>
                      <span className="text-[10px] text-[#47617F]">{art.cat} &middot; {art.read}m</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Major Topic Clusters (Theme Tabs) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#47617F] block mb-2.5">
              1. Choose a Major Topic Cluster:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {TOPIC_THEMES.map((theme) => {
                const active = activeTheme === theme.id;
                const Icon = theme.icon;
                const count = themeCounts[theme.id];
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => handleSelectTheme(theme.id)}
                    className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                      active
                        ? "bg-[#081A33] border-[#081A33] text-white shadow-sm ring-2 ring-[#45BCFF]/40"
                        : "bg-white border-[#C3D6EA] text-[#2A3D57] hover:border-[#0B6CB8] hover:bg-[#EFF5FB]/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-4 h-4 ${active ? "text-[#45BCFF]" : "text-[#0B6CB8]"}`} />
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold tabular-nums ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-[#EFF5FB] text-[#081A33]"
                        }`}
                      >
                        {count}
                      </span>
                    </div>
                    <div>
                      <div className="font-display text-xs sm:text-sm font-bold leading-tight">
                        {theme.shortLabel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Category Chips & Search Bar */}
          <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#47617F] block mb-2">
                2. Filter by Category:
              </label>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter articles by category"
              >
                {visibleCategories.map((cat) => {
                  const pressed = activeCat === cat;
                  const count =
                    cat === "All"
                      ? themeCounts[activeTheme]
                      : categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => handleSelectCat(cat)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 whitespace-nowrap cursor-pointer ${
                        pressed
                          ? "bg-[#0B6CB8] text-white border-[#0B6CB8] shadow-xs"
                          : "bg-white text-[#2A3D57] border-[#C3D6EA] hover:border-[#0B6CB8] hover:text-[#081A33]"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                          pressed ? "bg-white/25 text-white" : "bg-[#EFF5FB] text-[#47617F]"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Search Input */}
            <div className="w-full md:w-80 shrink-0">
              <label htmlFor="blogSearch" className="text-xs font-bold uppercase tracking-wider text-[#47617F] block mb-2">
                Search Articles:
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#47617F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="blogSearch"
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShown(PAGE_SIZE);
                  }}
                  placeholder="e.g. ice dam, cost, shingles..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#C3D6EA] bg-white text-[#081A33] placeholder:text-[#47617F] focus:outline-none focus:border-[#0B6CB8]"
                />
              </div>
            </div>
          </div>

          {/* Active Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#EFF5FB] text-xs font-semibold text-[#47617F]">
            <p className="tabular-nums" aria-live="polite">
              Showing {filtered.length} matching guides
              {activeTheme !== "all" ? ` under ${currentThemeDef.label}` : ""}
              {activeCat !== "All" ? ` in ${activeCat}` : ""}
              {query.trim() ? ` matching “${query.trim()}”` : ""} &middot; 36 total in handbook
            </p>
            {(activeTheme !== "all" || activeCat !== "All" || query.trim()) && (
              <button
                type="button"
                onClick={() => {
                  setActiveTheme("all");
                  setActiveCat("All");
                  setQuery("");
                  setShown(PAGE_SIZE);
                }}
                className="text-[#0B6CB8] hover:underline cursor-pointer font-bold"
              >
                Reset all filters &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* VIEW MODE: TABLE OF CONTENTS DIRECTORY */}
      {viewMode === "toc" && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 animate-fadeIn">
          {tocChapters.map((chapter) => {
            const chapterArticles = chapter.articles.filter((a) => {
              if (activeCat !== "All" && a.cat !== activeCat) return false;
              if (!query.trim()) return true;
              const q = query.trim().toLowerCase();
              return (
                a.title.toLowerCase().includes(q) ||
                a.excerpt.toLowerCase().includes(q) ||
                a.cat.toLowerCase().includes(q)
              );
            });

            if (chapterArticles.length === 0) return null;

            const Icon = chapter.icon;

            return (
              <div
                key={chapter.id}
                className="bg-white border border-[#C3D6EA] rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="p-5 sm:p-6 bg-[#081A33] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#45BCFF]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#45BCFF]">
                        {chapter.badge}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-extrabold text-white">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-[#C9DDF3] shrink-0 tabular-nums">
                    {chapterArticles.length} {chapterArticles.length === 1 ? "Guide" : "Guides"}
                  </span>
                </div>

                <div className="divide-y divide-[#EFF5FB]">
                  {chapterArticles.map((art) => {
                    const globalIdx = ARTICLES.findIndex((a) => a.id === art.id) + 1;
                    return (
                      <div
                        key={art.id}
                        className="p-5 hover:bg-[#F8FAFD] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <span className="font-mono text-sm font-bold text-[#0B6CB8] w-7 shrink-0 pt-0.5">
                            #{globalIdx < 10 ? `0${globalIdx}` : globalIdx}
                          </span>
                          <div className="min-w-0">
                            <h4 className="font-display text-base font-bold text-[#081A33] group-hover:text-[#0B6CB8] transition-colors">
                              <Link to={`/blog/${art.id}`}>{art.title}</Link>
                            </h4>
                            <p className="mt-1 text-sm text-[#47617F] line-clamp-2 leading-relaxed">
                              {art.excerpt}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#47617F]">
                              <span className="px-2 py-0.5 rounded bg-[#EFF5FB] font-semibold text-[#081A33]">
                                {art.cat}
                              </span>
                              {art.town && (
                                <span className="px-2 py-0.5 rounded bg-[#EBF4FC] font-semibold text-[#0B6CB8]">
                                  {art.town}
                                </span>
                              )}
                              <span>&middot;</span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-[#47617F]" />
                                {art.read} min read
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 pt-2 md:pt-0">
                          <Link
                            to={`/blog/${art.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EFF5FB] hover:bg-[#0E8FE8] text-[#081A33] hover:text-white font-display text-xs font-bold transition-all whitespace-nowrap"
                          >
                            Read Guide
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE: ARTICLE CARDS GRID */}
      {viewMode === "grid" && (
        <>
          {filtered.length === 0 ? (
            <div className="mt-8 max-w-7xl mx-auto px-4 md:px-6">
              <div className="rounded-2xl border border-[#C3D6EA] bg-white p-8 text-center shadow-xs">
                <p className="text-base text-[#2A3D57]">
                  No guides match your selected topic filter or search query.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTheme("all");
                    setActiveCat("All");
                    setQuery("");
                  }}
                  className="mt-4 px-5 py-2.5 min-h-10 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold cursor-pointer transition-colors"
                >
                  Reset filters to All 36 Guides
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full md:max-w-7xl md:mx-auto md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(0, shown).map((article) => {
                  const globalIdx = ARTICLES.findIndex((a) => a.id === article.id) + 1;
                  return (
                    <article
                      key={article.id}
                      className="rounded-2xl border border-[#C3D6EA] bg-white overflow-hidden flex flex-col justify-between hover:border-[#0E8FE8] hover:shadow-md transition-all duration-200"
                    >
                      <div>
                        {article.image && (
                          <Link to={`/blog/${article.id}`} className="block w-full overflow-hidden bg-[#081A33]">
                            <img
                              src={article.image}
                              alt={article.title}
                              loading="lazy"
                              className="w-full h-48 object-cover block hover:scale-102 transition-transform duration-300"
                            />
                          </Link>
                        )}

                        <div className="p-5 sm:p-6">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-xs font-bold text-[#0B6CB8]">
                              Guide #{globalIdx < 10 ? `0${globalIdx}` : globalIdx}
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EFF5FB] text-[#081A33]">
                              {article.cat}
                            </span>
                          </div>

                          <h3 className="font-display text-lg font-bold text-[#081A33] leading-snug">
                            <Link
                              to={`/blog/${article.id}`}
                              className="hover:text-[#0B6CB8] transition-colors"
                            >
                              {article.title}
                            </Link>
                          </h3>

                          <p className="mt-2 text-sm text-[#47617F] leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#EFF5FB] flex items-center justify-between gap-3">
                        <Link
                          to={`/blog/${article.id}`}
                          className="inline-flex items-center gap-1 font-display text-sm font-bold text-[#0B6CB8] hover:text-[#081A33] hover:underline transition-colors"
                        >
                          Read Guide &rarr;
                        </Link>

                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#47617F] tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-[#47617F]" />
                          {article.read} min read
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {filtered.length > shown && (
            <div className="mt-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
              <button
                type="button"
                onClick={() => setShown((s) => s + PAGE_SIZE)}
                className="px-6 py-3 min-h-12 rounded-xl bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold cursor-pointer transition-colors shadow-sm"
              >
                Load more guides ({filtered.length - shown} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
