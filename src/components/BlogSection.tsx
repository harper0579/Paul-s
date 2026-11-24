import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Link2, Mail, Phone, Search, X } from "lucide-react";
import {
  ARTICLE_CATEGORIES,
  ARTICLES,
  type Article,
  type TextSegment,
} from "../data/articles";
import { CONTACT } from "../data/siteContent";

interface BlogSectionProps {
  openArticleId: string | null;
  onClearExternalOpen: () => void;
}

const PAGE_SIZE = 9;

function formatArticleDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getGuideIdFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const searchParams = new URLSearchParams(window.location.search);
  const queryGuide = searchParams.get("guide");
  if (queryGuide) return queryGuide;
  const hash = window.location.hash;
  if (hash.startsWith("#guide/")) {
    return decodeURIComponent(hash.slice("#guide/".length));
  }
  return null;
}

function getGuideUrl(articleId: string): string {
  if (typeof window === "undefined") return `https://www.paulroofs.com/#guide/${articleId}`;
  return `${window.location.origin}${window.location.pathname}#guide/${articleId}`;
}

function RenderSegments({
  segments,
  onNavigateHash,
}: {
  segments: TextSegment[];
  onNavigateHash: () => void;
}) {
  return (
    <>
      {segments.map((seg, i) => {
        if (!seg.href) return <span key={i}>{seg.text}</span>;
        if (seg.external) {
          return (
            <a
              key={i}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0B6CB8] underline underline-offset-2"
            >
              {seg.text}
            </a>
          );
        }
        return (
          <a
            key={i}
            href={seg.href}
            onClick={() => {
              if (seg.href?.startsWith("#")) onNavigateHash();
            }}
            className="font-semibold text-[#0B6CB8] underline underline-offset-2"
          >
            {seg.text}
          </a>
        );
      })}
    </>
  );
}

export function BlogSection({ openArticleId, onClearExternalOpen }: BlogSectionProps) {
  const [activeCat, setActiveCat] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  function openArticle(article: Article, syncUrl = true) {
    setActiveArticle(article);
    setCopiedId(null);
    if (syncUrl && typeof window !== "undefined") {
      window.history.replaceState(null, "", `#guide/${encodeURIComponent(article.id)}`);
    }
  }

  function closeArticle(syncUrl = true) {
    setActiveArticle(null);
    setCopiedId(null);
    if (syncUrl && typeof window !== "undefined" && window.location.hash.startsWith("#guide/")) {
      window.history.replaceState(null, "", "#handbook");
    }
  }

  useEffect(() => {
    const syncFromLocation = () => {
      const id = getGuideIdFromUrl();
      if (id) {
        const match = ARTICLES.find((a) => a.id === id);
        if (match) {
          setActiveCat("All");
          setQuery("");
          setActiveArticle(match);
          const handbook = document.getElementById("handbook");
          if (handbook) handbook.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    syncFromLocation();
    window.addEventListener("hashchange", syncFromLocation);
    return () => window.removeEventListener("hashchange", syncFromLocation);
  }, []);

  useEffect(() => {
    if (!openArticleId) return;
    const found = ARTICLES.find((a) => a.id === openArticleId);
    if (found) {
      setActiveCat("All");
      setQuery("");
      openArticle(found, true);
    }
    onClearExternalOpen();
  }, [openArticleId, onClearExternalOpen]);

  useEffect(() => {
    if (!activeArticle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeArticle(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeArticle]);

  const currentFilteredIdx = activeArticle
    ? filtered.findIndex((a) => a.id === activeArticle.id)
    : -1;

  async function handleCopyGuideLink(articleId: string) {
    const url = getGuideUrl(articleId);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(articleId);
      setTimeout(() => setCopiedId((prev) => (prev === articleId ? null : prev)), 2500);
    } catch {
      // Fallback: update URL bar directly so user can copy it
      window.history.replaceState(null, "", `#guide/${encodeURIComponent(articleId)}`);
    }
  }

  return (
    <section
      id="handbook"
      className="scroll-mt-20 py-14 lg:py-16 bg-[#EFF5FB] border-t border-[#C3D6EA]"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <p className="text-xs font-bold tracking-wider uppercase text-[#0B6CB8]">
          Blog &middot; Homeowner&apos;s Handbook
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#081A33]">
          Roofing Tips &amp; Blog — Paul&apos;s Roofing Quispamsis NB
        </h2>
        <p className="mt-3 text-base text-[#2A3D57] max-w-3xl leading-relaxed">
          Straight answers on metal roofing, architectural shingles, roof repair, ice dams, gutters
          and winter prep for homeowners across Southern New Brunswick. Every guide comes from 30
          years on the roof — no sales talk, just what to check, what it means, and when to call.
        </p>

        <div className="mt-8 space-y-4">
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

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border border-[#C3D6EA] bg-white p-8 text-center">
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
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(0, shown).map((article) => (
              <article
                key={article.id}
                className="rounded-xl border border-[#C3D6EA] bg-white p-6 flex flex-col justify-between hover:border-[#8FB4DC] transition-colors duration-150"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#0B6CB8]">
                    <span>{article.cat}</span>
                    {article.town && (
                      <>
                        <span aria-hidden="true">&middot;</span>
                        <span>{article.town}</span>
                      </>
                    )}
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={article.date} className="text-[#47617F] font-medium tabular-nums">
                      {formatArticleDate(article.date)}
                    </time>
                  </div>

                  <h3 className="mt-2.5 font-display text-lg font-bold text-[#081A33] leading-snug">
                    <a
                      href={`#guide/${article.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        openArticle(article, true);
                      }}
                      className="hover:text-[#0B6CB8] transition-colors"
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p className="mt-2 text-sm text-[#47617F] leading-relaxed">{article.excerpt}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EFF5FB] flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#47617F] tabular-nums">
                    {article.read} min read
                  </span>
                  <button
                    type="button"
                    onClick={() => openArticle(article, true)}
                    className="px-4 py-2 min-h-10 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150"
                  >
                    Read article
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {filtered.length > shown && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShown((s) => s + PAGE_SIZE)}
              className="px-6 py-3 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold cursor-pointer transition-colors duration-150"
            >
              Load more articles ({filtered.length - shown} remaining)
            </button>
          </div>
        )}
      </div>

      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blogDialogTitle"
          onClick={() => closeArticle(true)}
          className="fixed inset-0 z-50 bg-[#050D20]/80 flex items-center justify-center p-0 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-3xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl border border-[#C3D6EA] flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-[#C3D6EA] bg-[#EFF5FB] flex items-center justify-between gap-4 shrink-0">
              <div className="text-xs sm:text-sm font-semibold text-[#0B6CB8] truncate">
                {activeArticle.cat}
                {activeArticle.town ? ` · ${activeArticle.town}` : ""}
              </div>
              <button
                type="button"
                onClick={() => closeArticle(true)}
                aria-label="Close article"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-10 rounded-lg bg-[#081A33] text-white font-display text-xs font-bold cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <div>
                <h2
                  id="blogDialogTitle"
                  className="font-display text-2xl sm:text-3xl font-extrabold text-[#081A33] leading-tight"
                >
                  {activeArticle.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#47617F] tabular-nums">
                  {formatArticleDate(activeArticle.date)} &middot; {activeArticle.read} min read
                  &middot; Paul&apos;s Roofing — Quispamsis, Saint John &amp; Southern NB
                </p>
              </div>

              <div className="space-y-4 text-base text-[#2A3D57] leading-relaxed">
                {activeArticle.blocks.map((block, bIdx) => {
                  if (block.type === "h4") {
                    return (
                      <h4
                        key={bIdx}
                        className="font-display text-lg font-bold text-[#081A33] pt-2"
                      >
                        {block.text}
                      </h4>
                    );
                  }
                  if (block.type === "p") {
                    return (
                      <p key={bIdx}>
                        <RenderSegments
                          segments={block.segments}
                          onNavigateHash={() => closeArticle(false)}
                        />
                      </p>
                    );
                  }
                  return (
                    <ul key={bIdx} className="list-disc pl-6 space-y-1.5">
                      {block.items.map((itemSegs, liIdx) => (
                        <li key={liIdx}>
                          <RenderSegments
                            segments={itemSegs}
                            onNavigateHash={() => closeArticle(false)}
                          />
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>

              {activeArticle.faq.length > 0 && (
                <div className="rounded-xl border border-[#C3D6EA] bg-[#EFF5FB] p-5 space-y-3">
                  <h4 className="font-display text-base font-bold text-[#081A33]">
                    Common questions
                  </h4>
                  {activeArticle.faq.map(([q, a]) => (
                    <div key={q}>
                      <p className="font-semibold text-[#081A33] text-sm">{q}</p>
                      <p className="mt-1 text-sm text-[#2A3D57]">{a}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#quote"
                  onClick={() => closeArticle(false)}
                  className="inline-flex items-center justify-center px-5 py-2.5 min-h-11 rounded-lg bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold"
                >
                  Get a Free Quote
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold"
                >
                  <Phone className="w-4 h-4" />
                  Call Paul
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyGuideLink(activeArticle.id)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg border border-[#C3D6EA] text-[#081A33] font-semibold text-sm hover:bg-[#EFF5FB] cursor-pointer"
                >
                  {copiedId === activeArticle.id ? (
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
                    `${activeArticle.title} — Paul's Roofing`
                  )}&body=${encodeURIComponent(
                    `${activeArticle.title}\n\n${activeArticle.excerpt}\n\nRead the full guide: ${getGuideUrl(
                      activeArticle.id
                    )}`
                  )}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-11 rounded-lg border border-[#C3D6EA] text-[#081A33] font-semibold text-sm hover:bg-[#EFF5FB]"
                >
                  <Mail className="w-4 h-4" />
                  Share by email
                </a>
              </div>

              <div className="pt-4 border-t border-[#C3D6EA] flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={currentFilteredIdx <= 0}
                  onClick={() => {
                    if (currentFilteredIdx > 0) {
                      openArticle(filtered[currentFilteredIdx - 1], true);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] hover:bg-[#EFF5FB] disabled:opacity-40 cursor-pointer disabled:cursor-default"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous article
                </button>
                <button
                  type="button"
                  disabled={currentFilteredIdx < 0 || currentFilteredIdx >= filtered.length - 1}
                  onClick={() => {
                    if (currentFilteredIdx >= 0 && currentFilteredIdx < filtered.length - 1) {
                      openArticle(filtered[currentFilteredIdx + 1], true);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 min-h-10 rounded-lg border border-[#C3D6EA] text-sm font-semibold text-[#081A33] hover:bg-[#EFF5FB] disabled:opacity-40 cursor-pointer disabled:cursor-default"
                >
                  Next article
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
