import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Link2, Mail, Phone, Search } from "lucide-react";
import {
  ARTICLE_CATEGORIES,
  ARTICLES,
  type Article,
  type TextSegment,
} from "../data/articles";
import { CONTACT } from "../data/siteContent";

const PAGE_SIZE = 9;

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

  return (
    <section className="pb-12 md:py-10 lg:py-14 bg-[#EFF5FB] min-h-[70vh]">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 pt-5 pb-4 md:pt-0 md:pb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B6CB8] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          All roofing guides
        </Link>

        <div className="text-xs font-semibold text-[#47617F]">
          {article.cat}
          {article.town ? ` · ${article.town}` : ""}
        </div>
      </div>

      {article.image && (
        <div className="w-full md:max-w-[1100px] md:mx-auto md:px-6 mb-6 md:mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto block rounded-none md:rounded-[12px]"
          />
        </div>
      )}

      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        <article className="rounded-2xl border border-[#C3D6EA] bg-white p-6 sm:p-10 space-y-6">
          <header>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#081A33] leading-tight">
              {article.title}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-[#47617F] tabular-nums">
              {formatArticleDate(article.date)} &middot; {article.read} min read &middot;
              Paul&apos;s Roofing — Quispamsis, Saint John &amp; Southern NB
            </p>
          </header>

          <div className="space-y-4 text-base text-[#2A3D57] leading-relaxed">
            {article.blocks.map((block, bIdx) => {
              if (block.type === "h4") {
                return (
                  <h2 key={bIdx} className="font-display text-xl font-bold text-[#081A33] pt-3">
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
                <div key={q}>
                  <p className="font-semibold text-[#081A33] text-sm">{q}</p>
                  <p className="mt-1 text-sm text-[#2A3D57]">{a}</p>
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
              className="inline-flex items-center justify-center px-5 py-2.5 min-h-11 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold"
            >
              Get a Free Quote
            </Link>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold"
            >
              <Phone className="w-4 h-4" />
              Call Paul
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg border border-[#C3D6EA] text-[#081A33] font-semibold text-sm hover:bg-[#EFF5FB] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#15803D]" />
                  Link copied
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
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
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg border border-[#C3D6EA] text-[#081A33] font-semibold text-sm hover:bg-[#EFF5FB]"
            >
              <Mail className="w-4 h-4" />
              Share by email
            </a>
          </div>

          <div className="pt-5 border-t border-[#C3D6EA] flex flex-wrap items-center justify-between gap-3">
            {prevArticle ? (
              <Link
                to={`/blog/${prevArticle.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] hover:bg-[#EFF5FB]"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous guide
              </Link>
            ) : (
              <span />
            )}

            {nextArticle && (
              <Link
                to={`/blog/${nextArticle.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] hover:bg-[#EFF5FB]"
              >
                Next guide
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

export function BlogSection() {
  const { slug } = useParams<{ slug?: string }>();
  const [activeCat, setActiveCat] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const selectedArticle = useMemo(
    () => (slug ? ARTICLES.find((a) => a.id === slug) ?? null : null),
    [slug]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const catOk = activeCat === "All" || a.cat === activeCat;
      if (!catOk) return false;
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
  }, [activeCat, query]);

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
    <section id="handbook" className="scroll-mt-20 pt-6 pb-4 bg-[#EFF5FB]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
        {/* White-on-Navy Blog Hero Banner */}
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

      {/* Clean Search & Filter Bar Toolbar Card */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
        <div className="bg-white border border-[#C3D6EA] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-4">
          <div className="relative max-w-xl">
            <label htmlFor="blogSearch" className="sr-only">
              Search articles
            </label>
            <Search
              className="w-4 h-4 text-[#47617F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
              placeholder="Search: ice dam, metal roof cost, leaking roof, Quispamsis..."
              className="w-full pl-10 pr-4 py-3 min-h-12 rounded-xl border border-[#C3D6EA] bg-white text-[#081A33] placeholder:text-[#47617F] text-sm sm:text-base focus:outline-none focus:border-[#0B6CB8]"
            />
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter articles by category"
          >
            {ARTICLE_CATEGORIES.map((cat) => {
              const pressed = activeCat === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => {
                    setActiveCat(cat);
                    setShown(PAGE_SIZE);
                  }}
                  className={`px-3.5 py-2 min-h-10 rounded-lg text-xs sm:text-sm font-semibold border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    pressed
                      ? "bg-[#081A33] text-white border-[#081A33]"
                      : "bg-white text-[#2A3D57] border-[#C3D6EA] hover:border-[#0B6CB8] hover:text-[#081A33]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p className="text-sm font-semibold text-[#47617F] tabular-nums" aria-live="polite">
            Showing {Math.min(shown, filtered.length)} of {filtered.length} articles
            {activeCat !== "All" ? ` in ${activeCat}` : ""}
            {query.trim() ? ` matching “${query.trim()}”` : ""} &middot; {ARTICLES.length} guides in
            total
          </p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 max-w-7xl mx-auto px-4 md:px-6">
          <div className="rounded-xl border border-[#C3D6EA] bg-white p-8 text-center">
            <p className="text-base text-[#2A3D57]">
              No articles match that search. Clear the search or pick All to see everything.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCat("All");
              }}
              className="mt-4 px-4 py-2 min-h-10 rounded-lg bg-[#0E8FE8] text-white font-display text-sm font-bold cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 w-full md:max-w-7xl md:mx-auto md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.slice(0, shown).map((article) => (
              <article
                key={article.id}
                className="rounded-none md:rounded-xl border-y md:border border-[#C3D6EA] bg-white overflow-hidden flex flex-col justify-between hover:border-[#8FB4DC] transition-colors duration-150"
              >
                <div>
                  {article.image && (
                    <Link to={`/blog/${article.id}`} className="block w-full">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-auto block rounded-none md:rounded-t-xl"
                      />
                    </Link>
                  )}

                  <div className="px-4 pt-5 md:px-6 md:pt-5">
                    <h2 className="font-display text-lg font-bold text-[#081A33] leading-snug">
                      <Link
                        to={`/blog/${article.id}`}
                        className="hover:text-[#0B6CB8] transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h2>

                    <p className="mt-2 text-sm text-[#47617F] leading-relaxed">{article.excerpt}</p>
                  </div>
                </div>

                <div className="px-4 pb-5 pt-4 md:px-6 md:pb-6 mt-3 flex items-center justify-between gap-3">
                  <Link
                    to={`/blog/${article.id}`}
                    className="inline-flex items-center gap-1 font-display text-sm font-bold text-[#0B6CB8] hover:text-[#081A33] hover:underline transition-colors"
                  >
                    Read More
                  </Link>

                  <span className="text-xs font-medium text-[#47617F] tabular-nums">
                    {article.read} min read
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {filtered.length > shown && (
        <div className="mt-8 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <button
            type="button"
            onClick={() => setShown((s) => s + PAGE_SIZE)}
            className="px-6 py-3 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold cursor-pointer transition-colors duration-150"
          >
            Load more articles ({filtered.length - shown} remaining)
          </button>
        </div>
      )}
    </section>
  );
}
