import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = resolve(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of ["index.html", "pages", "assets", "data", "CNAME", "robots.txt", "sitemap.xml"]) {
  await cp(resolve(root, entry), resolve(dist, entry), { recursive: true });
}

console.log("Static build complete: dist/");
