#!/usr/bin/env node
/**
 * Replace legacy English /de/… paths with translated German slug URLs in HTML.
 * Run: node tools/migrate-de-german-urls.mjs
 */
import fs from 'fs';
import path from 'path';
import {
  LOCALE_PAIRS,
  buildDeLinkReplacements,
  deCanonicalForEnFile,
} from './locale-url-map.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = 'https://medimotive.de';
const REPLACEMENTS = buildDeLinkReplacements();

function listDeHtml() {
  const out = [];
  function walk(dir, prefix) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const rel = prefix ? `${prefix}/${name}` : name;
      if (fs.statSync(full).isDirectory()) walk(full, rel);
      else if (name.endsWith('.html')) out.push(rel);
    }
  }
  walk(path.join(ROOT, 'de'), 'de');
  return out;
}

function migrateHtml(html) {
  let out = html;
  for (const { from, to } of REPLACEMENTS) {
    const fromAbs = `${SITE}${from}`;
    const toAbs = to === '/de/' ? `${SITE}/de/` : `${SITE}${to}`;
    out = out.split(fromAbs).join(toAbs);
    out = out.split(`href="${from}`).join(`href="${to}`);
    out = out.split(`href='${from}`).join(`href='${to}`);
  }
  return out;
}

function patchDeCanonicals(html, deRelPath) {
  const key = Object.entries(LOCALE_PAIRS).find(([, p]) => p.deFile === deRelPath)?.[0];
  if (!key) return html;
  const canonical = deCanonicalForEnFile(key, SITE);
  if (!canonical) return html;

  let out = html.replace(/<link rel="canonical" href="[^"]*" \/>/g, `<link rel="canonical" href="${canonical}" />`);
  out = out.replace(/<meta property="og:url" content="[^"]*" \/>/g, `<meta property="og:url" content="${canonical}" />`);

  const enPath = LOCALE_PAIRS[key].enPath;
  const enUrl = enPath === '/' ? `${SITE}/` : `${SITE}${enPath}`;
  out = out.replace(
    /<link rel="alternate" hreflang="de" href="[^"]*" \/>/g,
    `<link rel="alternate" hreflang="de" href="${canonical}" />`,
  );
  out = out.replace(
    /<link rel="alternate" hreflang="en" href="[^"]*" \/>/g,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
  );
  out = out.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/g,
    `<link rel="alternate" hreflang="x-default" href="${enUrl}" />`,
  );
  return out;
}

let count = 0;
for (const rel of listDeHtml()) {
  const filePath = path.join(ROOT, rel);
  const before = fs.readFileSync(filePath, 'utf8');
  let after = migrateHtml(before);
  after = patchDeCanonicals(after, rel);
  if (after !== before) {
    fs.writeFileSync(filePath, after);
    console.log(`patched ${rel}`);
    count += 1;
  }
}

console.log(`Done. Updated ${count} DE HTML files.`);
