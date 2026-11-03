#!/usr/bin/env node
// Palette du README : lit les couleurs dans les variables CSS et écrit docs/palette.svg.
// Usage : node .readme/palette.mjs [.readme/config.json]

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const configPath = process.argv[2] ?? ".readme/config.json";
const { palette } = JSON.parse(await readFile(configPath, "utf8"));
if (!palette?.colors?.length) {
  console.error("Aucune couleur dans « palette.colors » de la configuration.");
  process.exit(1);
}

const css = palette.css ? await readFile(palette.css, "utf8") : "";

// Première déclaration de la variable (le :root, avant un éventuel thème sombre)
const resolve = (color) => {
  if (color.hex) return color.hex;
  const name = color.var.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!match) throw new Error(`Variable ${color.var} introuvable (ou pas en hex) dans ${palette.css}`);
  return match[1].toLowerCase();
};

const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const swatches = palette.colors.map((color) => ({ ...color, hex: resolve(color) }));
const W = 1200;
const H = 300;
const pad = 40;
const gap = 16;
const width = (W - pad * 2 - gap * (swatches.length - 1)) / swatches.length;
const serif = escape(palette.serif ?? "Georgia, serif");
const sans = escape(palette.sans ?? "system-ui, sans-serif");

const svg = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
  `<rect width="${W}" height="${H}" rx="16" fill="${palette.background ?? "#ffffff"}"/>`,
  ...swatches.flatMap((s, i) => {
    const x = (pad + i * (width + gap)).toFixed(1);
    return [
      `<rect x="${x}" y="${pad}" width="${width.toFixed(1)}" height="150" rx="8" fill="${s.hex}" stroke="${palette.border ?? "#dddddd"}"/>`,
      `<text x="${x}" y="${pad + 186}" font-family="${serif}" font-size="22" font-weight="600" fill="${palette.text ?? "#111111"}">${escape(s.name)}</text>`,
      `<text x="${x}" y="${pad + 210}" font-family="${sans}" font-size="14" fill="${palette.muted ?? "#666666"}">${s.hex}</text>`,
      s.var
        ? `<text x="${x}" y="${pad + 230}" font-family="${sans}" font-size="12" fill="${palette.muted ?? "#666666"}" opacity="0.8">${escape(s.var)}</text>`
        : "",
    ];
  }),
  "</svg>",
]
  .filter(Boolean)
  .join("\n");

const out = palette.out ?? "docs/palette.svg";
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, `${svg}\n`);
console.log(`✓ ${out} (${swatches.map((s) => `${s.name} ${s.hex}`).join(", ")})`);
