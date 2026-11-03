#!/usr/bin/env node
// Captures du README : accueil, sections et assemblage mobile, en WebP dans docs/.
// Usage : node .readme/captures.mjs [.readme/config.json]
// Prérequis : npm i -D playwright sharp && npx playwright install chromium, site lancé en local.

import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const configPath = process.argv[2] ?? ".readme/config.json";
const config = JSON.parse(await readFile(configPath, "utf8"));

const { chromium } = await import("playwright").catch(() => missing("playwright"));
const sharp = (await import("sharp").catch(() => missing("sharp"))).default;

function missing(pkg) {
  console.error(`Module « ${pkg} » introuvable. Installer : npm i -D playwright sharp && npx playwright install chromium`);
  process.exit(1);
}

const outDir = config.outDir ?? "docs";
const headerOffset = config.headerOffset ?? 0;
const desktop = { width: 1440, height: 900, ...config.desktop };
await mkdir(outDir, { recursive: true });

const saveWebp = async (buffer, name, width) => {
  const file = path.join(outDir, `${name}.webp`);
  await sharp(buffer).resize({ width }).webp({ quality: 78 }).toFile(file);
  console.log(`✓ ${file}`);
};

// Fait défiler toute la page pour déclencher les apparitions au scroll avant les captures
const primePage = async (page) => {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
  }
};

// Place le haut d'un élément juste sous l'en-tête collant
const scrollToSection = (page, selector, offset = 0) =>
  page.evaluate(
    ([sel, extra]) => {
      const el = document.querySelector(sel);
      if (!el) throw new Error(`Sélecteur introuvable : ${sel}`);
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + extra);
    },
    [selector, offset - headerOffset],
  );

const browser = await chromium.launch();

try {
  // Bureau : accueil puis chaque section
  const page = await browser.newPage({ viewport: desktop, deviceScaleFactor: 1.5 });
  await page.goto(config.url, { waitUntil: "networkidle" });

  const hero = { name: "apercu-hero", width: 1600, wait: 3000, ...config.hero };
  await page.waitForTimeout(hero.wait);
  await saveWebp(await page.screenshot(), hero.name, hero.width);

  if (config.sections?.length) {
    await primePage(page);
    for (const section of config.sections) {
      await scrollToSection(page, section.selector, section.offset);
      await page.waitForTimeout(section.wait ?? 2500);
      await saveWebp(await page.screenshot(), section.name, section.width ?? 1200);
    }
  }

  // Mobile : plusieurs écrans assemblés côte à côte, coins arrondis
  if (config.mobile?.screens?.length) {
    const mobile = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await mobile.goto(config.url, { waitUntil: "networkidle" });

    const shots = [];
    let primed = false;
    for (const screen of config.mobile.screens) {
      if (screen.selector) {
        if (!primed) {
          await primePage(mobile);
          primed = true;
        }
        await scrollToSection(mobile, screen.selector, screen.offset);
      }
      if (screen.click) await mobile.click(screen.click);
      await mobile.waitForTimeout(screen.wait ?? 2000);
      shots.push(await mobile.screenshot());
      // Referme ce qu'on a ouvert (menu) pour l'écran suivant
      if (screen.click) {
        await mobile.click(screen.click);
        await mobile.waitForTimeout(600);
      }
    }

    const W = 780;
    const H = 1688;
    const gap = 72;
    const pad = 96;
    const mask = Buffer.from(`<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" rx="56" ry="56"/></svg>`);
    const tiles = await Promise.all(
      shots.map((shot) => sharp(shot).resize(W, H).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer()),
    );
    const canvas = await sharp({
      create: {
        width: pad * 2 + W * tiles.length + gap * (tiles.length - 1),
        height: pad * 2 + H,
        channels: 3,
        background: config.mobile.background ?? "#eeeeee",
      },
    })
      .composite(tiles.map((input, i) => ({ input, left: pad + i * (W + gap), top: pad })))
      .png()
      .toBuffer();
    await saveWebp(canvas, config.mobile.name ?? "apercu-mobile", config.mobile.width ?? 1440);
  }
} finally {
  await browser.close();
}
