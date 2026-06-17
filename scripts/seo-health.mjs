import { readdir, readFile } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
async function htmlFiles(base) {
  const files = [join(base, "index.html"), join(base, "about.html"), join(base, "privacy.html")];
  for (const name of await readdir(join(base, "pages"))) if (name.endsWith(".html")) files.push(join(base, "pages", name));
  return files;
}
const failures = [];
for (const file of await htmlFiles(root)) {
  const html = await readFile(file, "utf8");
  const rel = file.replace(root + "/", "");
  for (const token of ["<title>", "name=\"description\"", "rel=\"canonical\"", "hreflang=\"x-default\"", "application/ld+json"]) {
    if (!html.includes(token)) failures.push(`${rel} missing SEO token ${token}`);
  }
}
const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
for (const url of ["/", "/about.html", "/privacy.html", "/pages/ip-lookup.html", "/pages/proxy-check.html"]) {
  if (!sitemap.includes(`https://globalping.xyz${url}`)) failures.push(`sitemap missing ${url}`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("SEO health checks passed.");
