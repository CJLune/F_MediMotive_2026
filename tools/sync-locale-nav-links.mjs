#!/usr/bin/env node
/**
 * Sync EN/DE language switcher (nav-lang) links to matching locale URLs.
 * Run from repo root: node tools/sync-locale-nav-links.mjs
 */
import fs from 'fs';
import path from 'path';
import {
  LOCALE_PAIRS,
  deFileToEnKey,
  dePathForEnFile,
  enPathForEnFile,
} from './locale-url-map.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

function listHtmlFiles(dir, prefix = '') {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('_')) continue;
    const full = path.join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (fs.statSync(full).isDirectory()) {
      out.push(...listHtmlFiles(full, rel));
    } else if (name.endsWith('.html')) {
      out.push(rel);
    }
  }
  return out;
}

function patchEnNavLang(html, dePath) {
  return html.replace(
    /(<a class="nav-lang__item" )href="[^"]*"([^>]*hreflang="de"[^>]*>DE<\/a>)/,
    `$1href="${dePath}"$2`,
  );
}

function patchDeNavLang(html, enPath) {
  return html.replace(
    /(<a class="nav-lang__item" )href="[^"]*"([^>]*hreflang="en"[^>]*>EN<\/a>)/,
    `$1href="${enPath}"$2`,
  );
}

function patchEnFile(filename) {
  const dePath = dePathForEnFile(filename);
  if (!dePath) {
    console.warn(`skip EN ${filename}: no DE pair`);
    return false;
  }
  const filePath = path.join(ROOT, filename);
  if (!fs.existsSync(filePath)) return false;
  let html = fs.readFileSync(filePath, 'utf8');
  const next = patchEnNavLang(html, dePath);
  if (next === html) {
    console.warn(`unchanged EN ${filename} (pattern mismatch?)`);
    return false;
  }
  fs.writeFileSync(filePath, next);
  console.log(`EN ${filename} → DE ${dePath}`);
  return true;
}

function patchDeFile(deRelPath) {
  const key = deFileToEnKey(deRelPath);
  if (!key) {
    console.warn(`skip DE ${deRelPath}: no EN pair`);
    return false;
  }
  const enPath = enPathForEnFile(key);
  const filePath = path.join(ROOT, deRelPath);
  if (!fs.existsSync(filePath)) return false;
  let html = fs.readFileSync(filePath, 'utf8');
  const next = patchDeNavLang(html, enPath);
  if (next === html) {
    console.warn(`unchanged DE ${deRelPath} (pattern mismatch?)`);
    return false;
  }
  fs.writeFileSync(filePath, next);
  console.log(`DE ${deRelPath} → EN ${enPath}`);
  return true;
}

const enFiles = Object.keys(LOCALE_PAIRS);
let enCount = 0;
let deCount = 0;

for (const f of enFiles) {
  if (patchEnFile(f)) enCount += 1;
}

for (const f of listHtmlFiles(path.join(ROOT, 'de'), 'de')) {
  if (patchDeFile(f)) deCount += 1;
}

console.log(`Done. Patched ${enCount} EN and ${deCount} DE nav-lang links.`);
