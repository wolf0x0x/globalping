import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = resolve(root, "data");
const failures = [];

async function json(name) {
  return JSON.parse(await readFile(resolve(dataDir, name), "utf8"));
}

const rankings = await json("rankings.json");
if (!Array.isArray(rankings.fixed) || rankings.fixed.length < 5) failures.push("rankings.fixed needs at least 5 rows.");
if (!Array.isArray(rankings.mobile) || rankings.mobile.length < 5) failures.push("rankings.mobile needs at least 5 rows.");
for (const row of [...(rankings.fixed || []), ...(rankings.mobile || [])]) {
  if (!row.country || !row.flag || !row.region || !Number.isFinite(Number(row.download))) failures.push(`Invalid ranking row: ${JSON.stringify(row)}`);
}

const proxies = await json("proxy-list.json");
if (!Array.isArray(proxies) || proxies.length < 4) failures.push("proxy-list.json needs at least 4 rows.");
for (const row of proxies) {
  if (!row.ip || !row.type || !row.status) failures.push(`Invalid proxy row: ${JSON.stringify(row)}`);
}

const vpn = await json("vpn-reviews.json");
if (!Array.isArray(vpn) || vpn.length < 4) failures.push("vpn-reviews.json needs at least 4 providers.");
for (const row of vpn) {
  if (!row.name || !row.source || !row.sourceStatus) failures.push(`Invalid VPN row: ${JSON.stringify(row)}`);
}

const speed = await json("speed-nodes.json");
if (!speed.downloadEndpoint || !speed.uploadEndpoint || !Array.isArray(speed.nodes)) failures.push("speed-nodes.json is missing endpoints or nodes.");

const syncState = await json("sync_state.json");
if (!syncState.updated || !syncState.sources) failures.push("sync_state.json is missing status metadata.");

const countries = await json("countries.json");
if (!countries.updated || !Array.isArray(countries.countries) || countries.countries.length < 50) failures.push("countries.json needs at least 50 country profiles and an updated date.");
for (const row of countries.countries || []) {
  if (!row.country || !row.flag || !row.region || !Number.isFinite(Number(row.fixedDownload)) || !Number.isFinite(Number(row.mobileDownload))) failures.push(`Invalid country profile: ${JSON.stringify(row)}`);
  if (!Array.isArray(row.isps) || row.isps.length < 3) failures.push(`Country profile needs at least 3 ISP rows: ${row.country}`);
  if (!Array.isArray(row.trend) || row.trend.length < 12) failures.push(`Country profile needs 12 trend points: ${row.country}`);
}



if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Data checks passed for rankings, proxies, VPN metadata, speed nodes, country profiles, and sync state.");
