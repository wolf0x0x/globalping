import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = resolve(root, "data");
const now = new Date().toISOString();

const countryMeta = {
  Singapore: ["SG", "Asia"],
  "United Arab Emirates": ["AE", "Middle East"],
  "Hong Kong": ["HK", "Asia"],
  Chile: ["CL", "Americas"],
  France: ["FR", "Europe"],
  "United States": ["US", "Americas"],
  Japan: ["JP", "Asia"],
  Spain: ["ES", "Europe"],
  Qatar: ["QA", "Middle East"],
  "South Korea": ["KR", "Asia"],
  Denmark: ["DK", "Europe"],
  China: ["CN", "Asia"],
  Brazil: ["BR", "Americas"],
  Romania: ["RO", "Europe"],
  Thailand: ["TH", "Asia"],
  Switzerland: ["CH", "Europe"]
};

const vpnSources = [
  {name: "NordVPN", officialUrl: "https://nordvpn.com/", country: "Global", type: "paid", bestFor: "Streaming and privacy", editorialScore: 4.8, speed: 85, security: 95},
  {name: "ExpressVPN", officialUrl: "https://www.expressvpn.com/", country: "Global", type: "paid", bestFor: "Travel and cross-region streaming", editorialScore: 4.7, speed: 89, security: 93},
  {name: "Surfshark", officialUrl: "https://surfshark.com/", country: "Global", type: "paid", bestFor: "Unlimited devices", editorialScore: 4.6, speed: 82, security: 91},
  {name: "Proton VPN", officialUrl: "https://protonvpn.com/", country: "Europe", type: "free/paid", bestFor: "Open-source security", editorialScore: 4.5, speed: 76, security: 96}
];

async function readJSON(name) {
  return JSON.parse(await readFile(resolve(dataDir, name), "utf8"));
}

async function writeJSON(name, data) {
  await writeFile(resolve(dataDir, name), `${JSON.stringify(data, null, 2)}\n`);
}

async function fetchText(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout ?? 20000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {"user-agent": "GlobalPingBot/1.0 (+https://globalping.xyz)"}
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function headStatus(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, {method: "HEAD", signal: controller.signal});
    return {status: res.ok ? "online" : "warning", httpStatus: res.status};
  } catch (error) {
    return {status: "unreachable", error: error.message};
  } finally {
    clearTimeout(timeout);
  }
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

function parseSpeedRowsFromWikipedia(html) {
  const rows = [];
  const trMatches = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  for (const tr of trMatches) {
    const cells = [...tr.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => stripTags(m[1]));
    if (cells.length < 3) continue;
    const joined = cells.join(" ");
    const rank = Number((joined.match(/\b([1-9][0-9]?)\b/) || [])[1]);
    const country = Object.keys(countryMeta).find((name) => joined.includes(name));
    const speeds = cells.map((cell) => Number((cell.match(/([0-9]+(?:\.[0-9]+)?)/) || [])[1])).filter((n) => Number.isFinite(n) && n > 20);
    const download = speeds.at(-1);
    if (country && download) {
      const [flag, region] = countryMeta[country];
      rows.push({rank: rank || rows.length + 1, country, flag, region, download: Math.round(download), upload: null, latency: null, trend: "flat"});
    }
  }
  const deduped = [];
  for (const row of rows) {
    if (!deduped.some((item) => item.country === row.country)) deduped.push({...row, rank: deduped.length + 1});
  }
  return deduped.slice(0, 12);
}

async function syncRankings(state) {
  const current = await readJSON("rankings.json");
  const urls = [
    "https://en.wikipedia.org/wiki/List_of_countries_by_Internet_connection_speeds",
    "https://www.speedtest.net/global-index"
  ];
  for (const url of urls) {
    try {
      const html = await fetchText(url);
      const parsed = parseSpeedRowsFromWikipedia(html);
      if (parsed.length >= 6) {
        const fixed = parsed.map((row, index) => ({...row, rank: index + 1, upload: row.upload ?? Math.round(row.download * 0.45), latency: row.latency ?? null}));
        const mobile = (current.mobile || []).map((row, index) => ({...row, rank: index + 1}));
        await writeJSON("rankings.json", {
          updated: now.slice(0, 10),
          source: url,
          sourceStatus: "synced",
          fixed,
          mobile
        });
        state.sources.rankings = {status: "synced", source: url, rows: fixed.length};
        return;
      }
    } catch (error) {
      state.sources.rankings = {status: "fallback", source: url, error: error.message};
    }
  }
  await writeJSON("rankings.json", {...current, updated: now.slice(0, 10), sourceStatus: "fallback-cache"});
}

function normalizeProxy(item) {
  if (typeof item === "string") {
    const match = item.match(/(?:(https?|socks4|socks5):\/\/)?([^:\s]+):(\d+)/i);
    if (!match) return null;
    return {ip: `${match[2]}:${match[3]}`, location: "Unknown", type: (match[1] || "HTTP").toUpperCase(), speed: "Unverified", latency: null, status: "unchecked"};
  }
  const ip = item.ip || item.host || item.proxy;
  const port = item.port ? `:${item.port}` : "";
  if (!ip) return null;
  return {
    ip: `${ip}${port}`,
    location: item.country || item.geolocation?.country || "Unknown",
    type: String(item.protocol || item.type || "HTTP").toUpperCase(),
    speed: item.responseTime ? `${item.responseTime} ms` : "Unverified",
    latency: item.responseTime || null,
    status: "unchecked"
  };
}

async function syncProxies(state) {
  const current = await readJSON("proxy-list.json");
  const sources = [
    {url: "https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/all/data.json", type: "json"},
    {url: "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt", type: "text"}
  ];
  for (const source of sources) {
    try {
      const body = await fetchText(source.url);
      const raw = source.type === "json" ? JSON.parse(body) : body.split(/\r?\n/).filter(Boolean);
      const rows = raw.map(normalizeProxy).filter(Boolean).slice(0, 40);
      if (rows.length) {
        await writeJSON("proxy-list.json", rows);
        state.sources.proxies = {status: "synced", source: source.url, rows: rows.length};
        return;
      }
    } catch (error) {
      state.sources.proxies = {status: "fallback", source: source.url, error: error.message};
    }
  }
  await writeJSON("proxy-list.json", current);
}

async function syncVpnReviews(state) {
  const rows = [];
  for (const source of vpnSources) {
    const status = await headStatus(source.officialUrl);
    rows.push({
      ...source,
      score: source.editorialScore,
      price: "See official site",
      source: source.officialUrl,
      sourceStatus: status.status,
      httpStatus: status.httpStatus || null,
      lastChecked: now
    });
  }
  await writeJSON("vpn-reviews.json", rows);
  state.sources.vpnReviews = {status: "synced", source: "official provider URLs", rows: rows.length};
}

async function syncSpeedNodes(state) {
  const speedNodes = await readJSON("speed-nodes.json");
  const status = await headStatus(`${speedNodes.downloadEndpoint}?bytes=1000000`);
  await writeJSON("speed-nodes.json", {...speedNodes, updated: now.slice(0, 10), sourceStatus: status.status});
  state.sources.speedNodes = {status: status.status, source: speedNodes.provider, endpoint: speedNodes.downloadEndpoint};
}

const state = {updated: now, status: "synced", sources: {}};
await syncSpeedNodes(state);
await syncRankings(state);
await syncProxies(state);
await syncVpnReviews(state);
await writeJSON("sync_state.json", state);

console.log(JSON.stringify(state, null, 2));
