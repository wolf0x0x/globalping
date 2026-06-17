import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const app = await readFile(resolve(root, "assets/js/app.js"), "utf8");
const failures = [];
for (const lang of ["zh", "es", "ja"]) {
  if (!app.includes(`${lang}: {`) && !app.includes(`textTranslations.${lang}`)) failures.push(`Missing runtime text map for ${lang}.`);
}
for (const phrase of ["Proxy & VPN Reviews", "Global Internet Speed Rankings", "Privacy Policy", "Packet Loss"]) {
  if (!app.includes(phrase)) failures.push(`Missing translated phrase coverage for ${phrase}.`);
}
if (!app.includes("applyTextTranslations(lang)")) failures.push("Language switching does not apply full-page text translations.");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("I18n checks passed for runtime full-page translation coverage.");
