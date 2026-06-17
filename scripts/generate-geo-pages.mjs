import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (p) => readFileSync(join(root, p), "utf8");
const write = (p, s) => writeFileSync(join(root, p), s);

const countriesData = JSON.parse(read("data/countries.json"));
const countries = countriesData.countries;
const langs = ["en", "zh", "es", "pt", "fr", "de", "ja"];
const slugify = (value) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function alternates(url) {
  return `${langs.map((lang) => `  <link rel="alternate" hreflang="${lang}" href="${url}?lang=${lang}">`).join("\n")}
  <link rel="alternate" hreflang="x-default" href="${url}">`;
}

function pageHead({ title, description, keywords, canonical, schema, depth = ".." }) {
  return `<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-DDHNR5DW95"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-DDHNR5DW95');
  </script>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="${depth}/assets/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="${depth}/site.webmanifest">
  <meta name="theme-color" content="#2563eb">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(keywords)}">
  <meta name="geo.placename" content="Global">
  <meta name="geo.region" content="001">
  <meta name="language" content="en, zh, es, pt, fr, de, ja">
  <meta name="description" lang="zh" content="全球互联网速度测试、宽带排名、ISP 延迟和 DNS 网络工具。">
  <meta name="description" lang="es" content="Prueba de velocidad de Internet, ranking global de ISP, latencia y herramientas DNS.">
  <meta name="description" lang="fr" content="Test de vitesse Internet, classement ISP mondial, latence et outils DNS.">
  <link rel="canonical" href="${canonical}">
${alternates(canonical)}
  <link rel="stylesheet" href="${depth}/assets/css/styles.css"><script defer src="${depth}/assets/js/app.js"></script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8695398658548679" crossorigin="anonymous"></script>
  <script type="application/ld+json" data-schema>${JSON.stringify(schema)}</script>
</head>`;
}

function nav(depth = "..") {
  return `<header class="site-header"><nav class="nav"><a class="brand" href="${depth}/index.html"><span class="brand-mark">G</span> GlobalPing</a><div class="nav-links"><a href="${depth}/pages/speed-test.html" data-i18n="navSpeed">Speed Test</a><a href="${depth}/pages/network-toolkit.html" data-i18n="navTools">Tools</a><a href="${depth}/pages/global-rankings.html" data-i18n="navRank">Rankings</a><a href="${depth}/pages/public-wifi-security.html" data-i18n="navSec">Security</a></div><label class="sr-only" for="lang-select-country">Language</label><select class="language-select" id="lang-select-country" data-lang-select aria-label="Language"><option value="en">English</option><option value="zh">中文</option><option value="es">Español</option><option value="pt">Português</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="ja">日本語</option></select></nav></header>`;
}

mkdirSync(join(root, "pages/countries"), { recursive: true });

for (const country of countries) {
  const slug = slugify(country.country);
  const canonical = `https://globalping.xyz/pages/countries/${slug}.html`;
  const topIsp = country.isps[0];
  const title = `${country.country} Internet Speed Test, Broadband Ranking & ISP Latency | GlobalPing`;
  const description = `${country.country} internet speed profile: ${country.fixedDownload} Mbps fixed broadband, ${country.mobileDownload} Mbps mobile speed, ${country.latency} ms latency, ISP comparison and 12-month trend.`;
  const keywords = `${country.country} internet speed test, ${country.country} broadband ranking, ${country.country} ISP latency, ${country.country} mobile network speed, ${country.country} fiber speed, ping check, DNS guide, VPN proxy latency`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${country.country} Internet Speed and ISP Latency Dataset`,
    description,
    url: canonical,
    spatialCoverage: { "@type": "Place", name: country.country },
    variableMeasured: ["fixed broadband download", "mobile download", "latency", "ISP upload", "12-month speed trend"],
    measurementTechnique: "Static public network speed dataset transformed by GlobalPing",
    dateModified: countriesData.updated,
    provider: { "@type": "Organization", name: "GlobalPing", url: "https://globalping.xyz/" }
  };
  const rows = country.isps.map((isp) => `<tr><td>${esc(isp.name)}</td><td>${isp.download} Mbps</td><td>${isp.upload} Mbps</td><td>${isp.rating}/5</td></tr>`).join("");
  const trend = country.trend.map((row) => `<div><span class="fine">${row.month}</span><div class="bar"><span style="width:${Math.min(100, Math.round(row.download / country.fixedDownload * 100))}%"></span></div><strong>${row.download} Mbps</strong></div>`).join("");
  const html = `<!doctype html>
<html lang="en">
${pageHead({ title, description, keywords, canonical, schema, depth: "../.." })}
<body>
  ${nav("../..")}
  <main class="section"><div class="container">
    <p class="fine"><a href="../../index.html">Home</a> / <a href="../country-detail.html">Country Deep Dive</a> / ${esc(country.country)}</p>
    <section class="hero-grid compact">
      <div>
        <p class="eyebrow">Geo internet speed profile</p>
        <h1>${country.flag} ${esc(country.country)} Internet Speed Test & ISP Ranking</h1>
        <p class="lead">${esc(description)}</p>
      </div>
      <aside class="card panel">
        <h2>${esc(country.country)} quick metrics</h2>
        <p class="fine">Region: ${esc(country.region)} · Data updated ${countriesData.updated}</p>
      </aside>
    </section>
    <section class="grid grid-4">
      <div class="metric card"><span class="fine">Fixed broadband speed</span><b>${country.fixedDownload} Mbps</b></div>
      <div class="metric card"><span class="fine">Mobile network speed</span><b>${country.mobileDownload} Mbps</b></div>
      <div class="metric card"><span class="fine">ISP latency</span><b>${country.latency} ms</b></div>
      <div class="metric card"><span class="fine">Annual change</span><b>${country.annualChange > 0 ? "+" : ""}${country.annualChange}%</b></div>
    </section>
    <section class="section grid grid-2">
      <div class="card table-wrap"><h2>${esc(country.country)} ISP comparison</h2><table><thead><tr><th>ISP</th><th>Download</th><th>Upload</th><th>Rating</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="card panel"><h2>${esc(country.country)} 12-month broadband trend</h2><div class="chart-bars">${trend}</div></div>
    </section>
    <section class="card panel"><h2>${esc(country.country)} network search intent</h2><p class="muted">${esc(country.country)} users often compare broadband speed test results, mobile network latency, ${esc(topIsp.name)} ISP performance, DNS setup and VPN proxy latency before choosing a network plan or troubleshooting slow WiFi.</p></section>
  </div></main>
  <footer class="footer"><div class="container"><a href="../../privacy.html">Privacy & Disclosure</a> · <a href="../../about.html">About</a></div></footer>
</body>
</html>
`;
  write(`pages/countries/${slug}.html`, html);
}

const topPlaces = countries.slice(0, 12).map((country) => ({
  "@type": "Place",
  name: country.country,
  additionalProperty: [
    { "@type": "PropertyValue", name: "fixed broadband download", value: `${country.fixedDownload} Mbps` },
    { "@type": "PropertyValue", name: "mobile network download", value: `${country.mobileDownload} Mbps` },
    { "@type": "PropertyValue", name: "latency", value: `${country.latency} ms` }
  ]
}));
const dataFeedSchema = {
  "@context": "https://schema.org",
  "@type": "DataFeed",
  name: "Global Internet Speed and ISP Latency Datasets",
  description: "Live network broadband rankings and connection intelligence across 52+ countries including Singapore, UAE, United States, China, Japan, France, and Germany.",
  spatialCoverage: [{ "@type": "Place", name: "Global Network Nodes" }, ...topPlaces],
  provider: { "@type": "Organization", name: "GlobalPing", url: "https://globalping.xyz/" },
  dateModified: countriesData.updated
};

function injectBeforeHeadClose(html, marker, block) {
  if (html.includes(marker)) return html;
  return html.replace("</head>", `${block}\n</head>`);
}

let index = read("index.html");
index = index.replace(
  '<meta name="keywords" content="speed test, internet speed test, network toolkit, wifi ping check, proxy latency, broadband rankings, fast speedtest, dns lookup, vpn reviews">',
  '<meta name="keywords" content="speed test, internet speed test, network toolkit, wifi ping check, proxy latency, broadband rankings, fast speedtest, dns lookup, vpn reviews, Singapore fiber speed, United States broadband ranking, China mobile latency, global ISP latency">'
);
index = injectBeforeHeadClose(index, "Global Internet Speed and ISP Latency Datasets", `  <script type="application/ld+json" data-geo-schema>${JSON.stringify(dataFeedSchema)}</script>`);
if (!index.includes("Global Testing & Localization Geo Snapshot")) {
  index = index.replace("</main>", `  <section class="seo-geo-snapshot" aria-label="Global Testing & Localization Geo Snapshot">
    <h2>Global Testing & Localization Geo Snapshot</h2>
    <p>测试你在全球各地的互联网速度。包括宽带网络速度测试、全球 ISP 排名、DNS 设置指南和代理延迟过滤，覆盖 Singapore、United States、China、Japan、France 等地区。</p>
    <p>Prueba de velocidad de Internet en todo el mundo. Rankings globales de ISP, guías de configuración de DNS, filtros de latencia de proxy y datos de banda ancha por país.</p>
    <p>Testen Sie Ihre Internetgeschwindigkeit überall auf der Welt. Globale ISP-Rankings, DNS-Einrichtungsanleitungen, Ping Check, Latenz und Länder-Breitbanddaten.</p>
    <p>Test de vitesse Internet mondial avec latence ISP, classement haut débit, vitesse mobile, WiFi et outils DNS pour les marchés internationaux.</p>
  </section>
  </main>`);
}
write("index.html", index);

let countryDetail = read("pages/country-detail.html");
countryDetail = injectBeforeHeadClose(countryDetail, "Global Internet Speed and ISP Latency Datasets", `  <script type="application/ld+json" data-geo-schema>${JSON.stringify(dataFeedSchema)}</script>`);
write("pages/country-detail.html", countryDetail);

const baseUrls = [
  "/",
  "/about.html",
  "/privacy.html",
  "/pages/speed-test.html",
  "/pages/global-rankings.html",
  "/pages/vpn-reviews.html",
  "/pages/public-wifi-security.html",
  "/pages/network-troubleshooting.html",
  "/pages/dns-guide.html",
  "/pages/network-toolkit.html",
  "/pages/country-detail.html",
  "/pages/ip-lookup.html",
  "/pages/ping-test.html",
  "/pages/port-check.html",
  "/pages/proxy-check.html",
  "/pages/about-privacy.html"
];
const countryUrls = countries.map((country) => `/pages/countries/${slugify(country.country)}.html`);
const allUrls = [...baseUrls, ...countryUrls];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url><loc>https://globalping.xyz${url}</loc></url>`).join("\n")}
</urlset>
`;
write("sitemap.xml", sitemap);

console.log(`Generated ${countries.length} GEO country pages and sitemap.xml.`);
