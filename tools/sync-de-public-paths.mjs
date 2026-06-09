#!/usr/bin/env node
/**
 * Materialize German public URL paths as de/{slug}/index.html copies.
 * Ensures /de/ueber-uns etc. work on static hosts without relying on rewrites alone.
 * Run: node tools/sync-de-public-paths.mjs
 */
import fs from 'fs';
import path from 'path';
import { LOCALE_PAIRS } from './locale-url-map.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

/** Top-level slug folders only — never walk de/index.html or de/*.html sources. */
const SLUG_ROOTS = new Set(
  Object.values(LOCALE_PAIRS)
    .filter((p) => p.dePath && p.dePath !== '/de/')
    .map((p) => p.dePath.replace(/^\/de\//, '').split('/')[0]),
);

function listGeneratedPaths() {
  const out = new Set();
  for (const { dePath } of Object.values(LOCALE_PAIRS)) {
    if (!dePath || dePath === '/de/') continue;
    const rel = dePath.replace(/^\/de\//, '');
    out.add(`de/${rel}/index.html`);
  }
  return out;
}

function removeStaleGenerated(currentPaths) {
  for (const slugRoot of SLUG_ROOTS) {
    const base = path.join(ROOT, 'de', slugRoot);
    if (!fs.existsSync(base)) continue;
    walkSlugDir(base, `de/${slugRoot}`, currentPaths);
  }
}

function walkSlugDir(dir, relPrefix, currentPaths) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = `${relPrefix}/${name}`;
    if (fs.statSync(full).isDirectory()) {
      walkSlugDir(full, rel, currentPaths);
      if (!fs.readdirSync(full).length) fs.rmdirSync(full);
      continue;
    }
    if (name !== 'index.html') continue;
    const relPath = rel.replace(/\\/g, '/');
    if (!currentPaths.has(relPath)) {
      fs.unlinkSync(full);
      console.log(`removed stale ${relPath}`);
    }
  }
}

let count = 0;
const generated = listGeneratedPaths();

for (const [, { dePath, deFile }] of Object.entries(LOCALE_PAIRS)) {
  if (!dePath || dePath === '/de/') continue;
  const src = path.join(ROOT, deFile);
  if (!fs.existsSync(src)) {
    console.warn(`skip ${dePath}: missing ${deFile}`);
    continue;
  }
  const destRel = `${dePath.replace(/^\/de\//, 'de/')}/index.html`;
  const dest = path.join(ROOT, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`${deFile} → ${destRel}`);
  count += 1;
}

removeStaleGenerated(generated);
console.log(`Done. Synced ${count} German public path files.`);
