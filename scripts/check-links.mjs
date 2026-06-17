import { readdir, readFile, stat } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";

const root = resolve(dirname(new URL(import.meta.url).pathname), "..");
const htmlFiles = [];

async function walk(dir) {
  for (const item of await readdir(dir)) {
    const path = join(dir, item);
    const info = await stat(path);
    if (info.isDirectory() && item !== "dist") await walk(path);
    if (info.isFile() && path.endsWith(".html")) htmlFiles.push(path);
  }
}

await walk(root);
const missing = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const [, href] of html.matchAll(/href="([^"#][^"]*)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(href) || href.startsWith("#")) continue;
    const target = resolve(dirname(file), href);
    try {
      await stat(target);
    } catch {
      missing.push(`${file.replace(root + "/", "")} -> ${href}`);
    }
  }
}

if (missing.length) {
  console.error("Broken local links:\n" + missing.join("\n"));
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML files. Local links are valid.`);
