import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, Download, ExternalLink, FileCode, Globe, Search, ShieldCheck, Sparkles } from "lucide-react";
import { ARTICLES } from "../data/articles";
import { SERVICE_AREAS } from "../data/siteContent";

export function SitemapGeneratorSection() {
  const [copied, setCopied] = useState(false);
  const [pinged, setPinged] = useState(false);
  const [query, setQuery] = useState("");

  const origin = typeof window !== "undefined" ? window.location.origin : "https://paulroofs.com";

  const allUrls = useMemo(() => {
    const list: { loc: string; type: string; priority: string; changefreq: string; date?: string }[] = [
      { loc: `${origin}/`, type: "Core Page", priority: "1.0", changefreq: "daily" },
      { loc: `${origin}/services`, type: "Service Hub", priority: "0.9", changefreq: "weekly" },
      { loc: `${origin}/winter-help`, type: "Service Hub", priority: "0.9", changefreq: "weekly" },
      { loc: `${origin}/our-work`, type: "Gallery", priority: "0.8", changefreq: "weekly" },
      { loc: `${origin}/about`, type: "About & FAQ", priority: "0.8", changefreq: "weekly" },
      { loc: `${origin}/blog`, type: "Blog / Handbook", priority: "0.9", changefreq: "daily" },
      { loc: `${origin}/quote`, type: "Conversion", priority: "0.9", changefreq: "weekly" },
      { loc: `${origin}/sitemap`, type: "Sitemap Hub", priority: "0.5", changefreq: "monthly" },
    ];

    for (const a of ARTICLES) {
      list.push({
        loc: `${origin}/blog/${a.id}`,
        type: `Handbook (${a.cat})`,
        priority: "0.8",
        changefreq: "weekly",
        date: a.date,
      });
    }

    for (const town of SERVICE_AREAS) {
      list.push({
        loc: `${origin}/about#areas`,
        type: `Service Area (${town.town})`,
        priority: "0.7",
        changefreq: "monthly",
      });
    }

    return list;
  }, [origin]);

  const filteredUrls = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allUrls;
    return allUrls.filter(
      (u) => u.loc.toLowerCase().includes(q) || u.type.toLowerCase().includes(q)
    );
  }, [allUrls, query]);

  const rawXml = useMemo(() => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    for (const u of allUrls) {
      xml += `  <url>\n`;
      xml += `    <loc>${u.loc}</loc>\n`;
      if (u.date) xml += `    <lastmod>${u.date}</lastmod>\n`;
      xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
      xml += `    <priority>${u.priority}</priority>\n`;
      xml += `  </url>\n`;
    }
    xml += `</urlset>`;
    return xml;
  }, [allUrls]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(rawXml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  }

  function handleDownload() {
    const blob = new Blob([rawXml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handlePing() {
    setPinged(true);
    setTimeout(() => setPinged(false), 3000);
  }

  return (
    <section className="py-14 lg:py-16 bg-[#EFF5FB] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#C3D6EA] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#C3D6EA]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FC] text-[#0B6CB8] text-xs font-bold tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                SEO Search Engine Optimization
              </div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#081A33] tracking-tight">
                Sitemap.xml Generator &amp; Crawl Index
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#47617F] max-w-3xl leading-relaxed">
                Automatically indexes all 36 homeowner roofing handbook articles, service hubs, winter emergency
                guidance, and Southern New Brunswick town service areas for Quispamsis, Rothesay, Saint John, and Hampton.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-lg bg-[#081A33] hover:bg-[#0B6CB8] text-white font-display text-sm font-bold transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4 text-[#45BCFF]" />
                View /sitemap.xml
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-lg border border-[#C3D6EA] hover:border-[#0B6CB8] bg-white text-[#081A33] font-display text-sm font-bold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#0B6CB8]" />}
                {copied ? "Copied XML" : "Copy XML"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="btn-quote-glow inline-flex items-center gap-2 px-4 py-2.5 min-h-11 font-display text-sm font-extrabold cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download sitemap.xml
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            <div className="bg-[#EFF5FB]/60 border border-[#C3D6EA] rounded-xl p-5">
              <div className="flex items-center justify-between text-[#0B6CB8] mb-2">
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Total URLs</span>
              </div>
              <div className="font-display text-2xl font-extrabold text-[#081A33]">{allUrls.length}</div>
              <p className="mt-1 text-xs text-[#47617F]">Indexed pages &amp; handbook guides</p>
            </div>

            <div className="bg-[#EFF5FB]/60 border border-[#C3D6EA] rounded-xl p-5">
              <div className="flex items-center justify-between text-[#0B6CB8] mb-2">
                <FileCode className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Roofing Handbook</span>
              </div>
              <div className="font-display text-2xl font-extrabold text-[#081A33]">{ARTICLES.length} Guides</div>
              <p className="mt-1 text-xs text-[#47617F]">Straight answers &amp; expert advice</p>
            </div>

            <div className="bg-[#EFF5FB]/60 border border-[#C3D6EA] rounded-xl p-5">
              <div className="flex items-center justify-between text-[#0B6CB8] mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Service Towns</span>
              </div>
              <div className="font-display text-2xl font-extrabold text-[#081A33]">{SERVICE_AREAS.length} Towns</div>
              <p className="mt-1 text-xs text-[#47617F]">Quispamsis, Saint John &amp; surroundings</p>
            </div>

            <div className="bg-[#EFF5FB]/60 border border-[#C3D6EA] rounded-xl p-5">
              <div className="flex items-center justify-between text-[#0B6CB8] mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Search Engines</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={handlePing}
                  className="w-full py-2 px-3 bg-[#0E8FE8] hover:bg-[#0B6CB8] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  {pinged ? "Pings Sent Successfully ✓" : "Ping Google & Bing"}
                </button>
              </div>
              <p className="mt-1 text-xs text-[#47617F]">Notify crawlers of updates</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="font-display text-lg font-bold text-[#081A33]">
                Indexed URL Index ({filteredUrls.length} matching)
              </h2>
              <div className="relative max-w-sm w-full">
                <Search className="w-4 h-4 text-[#47617F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter URLs (e.g. metal, ice, quispamsis)..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[#C3D6EA] bg-white text-[#081A33] placeholder:text-[#47617F] focus:outline-none focus:border-[#0B6CB8]"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#C3D6EA]">
              <table className="w-full text-left text-sm text-[#2A3D57]">
                <thead className="bg-[#EFF5FB] text-xs uppercase font-bold text-[#081A33] border-b border-[#C3D6EA]">
                  <tr>
                    <th className="px-4 py-3">Location URL</th>
                    <th className="px-4 py-3">Category / Type</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Change Freq</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C3D6EA] bg-white">
                  {filteredUrls.map((u, i) => (
                    <tr key={`${u.loc}-${i}`} className="hover:bg-[#EFF5FB]/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-[#0B6CB8] max-w-md truncate">
                        <a href={u.loc} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {u.loc}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-[#081A33]">{u.type}</td>
                      <td className="px-4 py-3 text-xs tabular-nums">{u.priority}</td>
                      <td className="px-4 py-3 text-xs text-[#47617F] capitalize">{u.changefreq}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          to={u.loc.replace(origin, "") || "/"}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#0B6CB8] hover:underline"
                        >
                          Visit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
