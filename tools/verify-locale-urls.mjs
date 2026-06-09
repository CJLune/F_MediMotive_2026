#!/usr/bin/env node
/**
 * Verify EN↔DE locale URL pairs in nav-lang and hreflang tags.
 * Run: node tools/verify-locale-urls.mjs
 */
import fs from 'fs';
import path from 'path';
import { LOCALE_PAIRS, deFileToEnKey, dePathForEnFile } from './locale-url-map.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const errors = [];

function listDeHtml() {
  const out = [];
  function walk(dir, prefix) {
    for (const name of fs.readdirSync(dir)) {
      if (name.startsWith('_')) continue;
      const full = path.join(dir, name);
      const rel = prefix ? `${prefix}/${name}` : name;
      if (fs.statSync(full).isDirectory()) walk(full, rel);
      else if (name.endsWith('.html')) out.push(rel);
    }
  }
  walk(path.join(ROOT, 'de'), 'de');
  return out;
}

function checkEnNavLang(file, html) {
  const dePath = dePathForEnFile(file);
  if (!dePath) return;
  const m = html.match(
    /<a class="nav-lang__item" href="([^"]*)" hreflang="de" lang="de">DE<\/a>/,
  );
  if (!m) {
    errors.push(`EN ${file}: missing DE nav-lang link`);
    return;
  }
  if (m[1] !== dePath) {
    errors.push(`EN ${file}: nav-lang DE href="${m[1]}" expected "${dePath}"`);
  }
}

function checkDeNavLang(deRel, html) {
  const key = deFileToEnKey(deRel);
  if (!key) return;
  const enPath = LOCALE_PAIRS[key].enPath;
  const m = html.match(
    /<a class="nav-lang__item" href="([^"]*)" hreflang="en" lang="en">EN<\/a>/,
  );
  if (!m) {
    errors.push(`DE ${deRel}: missing EN nav-lang link`);
    return;
  }
  if (m[1] !== enPath) {
    errors.push(`DE ${deRel}: nav-lang EN href="${m[1]}" expected "${enPath}"`);
  }
}

function checkDeFileExists(dePath, deFile) {
  if (!fs.existsSync(path.join(ROOT, deFile))) {
    errors.push(`Missing DE mirror file: ${deFile} (${dePath})`);
  }
}

for (const [file, { dePath, deFile }] of Object.entries(LOCALE_PAIRS)) {
  if (file === 'gallery.html') continue;
  checkDeFileExists(dePath, deFile);
  const enPath = path.join(ROOT, file);
  if (fs.existsSync(enPath)) {
    checkEnNavLang(file, fs.readFileSync(enPath, 'utf8'));
  }
}

for (const deRel of listDeHtml()) {
  const full = path.join(ROOT, deRel);
  const html = fs.readFileSync(full, 'utf8');
  checkDeNavLang(deRel, html);

  for (const { legacyDePath } of Object.values(LOCALE_PAIRS)) {
    if (!legacyDePath) continue;
    if (html.includes(`href="${legacyDePath}"`) || html.includes(`${legacyDePath}"`)) {
      errors.push(`DE ${deRel}: still contains legacy path ${legacyDePath}`);
    }
  }
}

if (errors.length) {
  console.error(`Locale URL verification failed (${errors.length} issues):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`OK — ${Object.keys(LOCALE_PAIRS).length} locale pairs verified.`);
