import { readdir, readFile } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

async function htmlFiles(base) {
  const files = [];
  async function walk(dir) {
    for (const name of await readdir(dir)) {
      const target = join(dir, name);
      if (name === "dist") continue;
      if (name.endsWith(".html")) files.push(target);
      if (!name.includes(".") && name !== "node_modules") await walk(target).catch(() => {});
    }
  }
  await walk(base);
  return files;
}

const failures = [];
const TARGET_SEO_KEYWORDS = ["speed test", "internet speed", "ping check", "latency", "broadband", "isp", "wifi"];

for (const file of await htmlFiles(root)) {
  const html = await readFile(file, "utf8");
  const rel = file.replace(root + "/", "");
  for (const token of ["<title>", "name=\"description\"", "rel=\"canonical\"", "hreflang=\"x-default\"", "application/ld+json"]) {
    if (!html.includes(token)) failures.push(`${rel} missing SEO token ${token}`);
  }
  const hasKeywords = TARGET_SEO_KEYWORDS.some((kw) => html.toLowerCase().includes(kw));
  if (!hasKeywords) failures.push(`${rel} missing network SEO keyword coverage`);
}

const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
for (const url of ["/", "/about.html", "/privacy.html", "/pages/ip-lookup.html", "/pages/proxy-check.html", "/pages/global-rankings.html", "/pages/country-detail.html"]) {
  if (!sitemap.includes(`https://globalping.xyz${url}`)) failures.push(`sitemap missing ${url}`);
}

const countriesData = JSON.parse(await readFile(resolve(root, "data/countries.json"), "utf8"));
for (const country of countriesData.countries) {
  const slug = country.country.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const url = `https://globalping.xyz/pages/countries/${slug}.html`;
  if (!sitemap.includes(url)) failures.push(`sitemap missing country GEO URL: ${country.country}`);
}

const indexHtml = await readFile(resolve(root, "index.html"), "utf8");
for (const geo of countriesData.countries.slice(0, 8).map((c) => c.country)) {
  if (!sitemap.includes(geo) && !indexHtml.includes(geo)) failures.push(`missing visible GEO relation for ${geo}`);
}
if (!indexHtml.includes("Global Testing & Localization Geo Snapshot")) failures.push("index.html missing multilingual GEO snapshot block");
if (!indexHtml.includes("Global Internet Speed and ISP Latency Datasets")) failures.push("index.html missing DataFeed GEO schema");

if (failures.length) {
  console.error("SEO & GEO checks failed:\n" + failures.join("\n"));
  process.exit(1);
}

console.log("SEO & GEO health checks passed.");
