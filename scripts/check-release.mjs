import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const expectedAds = "google.com, pub-8695398658548679, DIRECT, f08c47fec0942fa0";
const tagId = "G-DDHNR5DW95";

async function collectHtml(base) {
  const files = [resolve(base, "index.html")];
  for (const name of await readdir(resolve(base, "pages"))) {
    if (name.endsWith(".html")) files.push(join(base, "pages", name));
  }
  return files;
}

const failures = [];
const targets = [root, resolve(root, "dist")];

let checkedPages = 0;
for (const base of targets) {
  const label = base === root ? "source" : "dist";
  const ads = (await readFile(resolve(base, "ads.txt"), "utf8")).trim();
  if (ads !== expectedAds) failures.push(`${label}/ads.txt content does not match the required Google AdSense line.`);

  for (const file of await collectHtml(base)) {
    checkedPages += 1;
    const html = await readFile(file, "utf8");
    const headIndex = html.indexOf("<head>");
    const tagIndex = html.indexOf(`googletagmanager.com/gtag/js?id=${tagId}`);
    const occurrences = html.match(new RegExp(tagId, "g"))?.length ?? 0;
    const hasInit = html.includes("gtag('js', new Date());");
    const hasConfig = html.includes(`gtag('config', '${tagId}');`);
    const rel = file.replace(root + "/", "");
    if (tagIndex === -1) failures.push(`${rel} is missing Google tag.`);
    if (occurrences !== 2) failures.push(`${rel} should include exactly one Google tag snippet.`);
    if (!hasInit || !hasConfig) failures.push(`${rel} Google tag snippet is malformed.`);
    if (headIndex !== -1 && tagIndex > headIndex + 900) failures.push(`${rel} Google tag is not near the opening <head>.`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Release checks passed for ${checkedPages} source/dist pages, ads.txt, and Google tag ${tagId}.`);
