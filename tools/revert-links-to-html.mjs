#!/usr/bin/env node
/**
 * Restore relative .html hrefs (works without Vercel rewrites/cleanUrls).
 * Run: node tools/revert-links-to-html.mjs
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = 'https://medimotive.de';

const SLUGS = [
  'about',
  'services',
  'case-studies',
  'case-coated-aluminum-parts',
  'case-production-ramp-up',
  'contact',
  'certificates',
  'work-journey',
  'gallery',
  'regions',
  'our-approach',
  'imprint',
  'privacy',
  'rapid-response-troubleshooting',
  'supplier-quality-complaint-management',
  'ramp-up-process-stability',
  'early-phase-risk-control-design-for-quality',
  'qms-audit-regulatory-support',
  'knowledge-gap-transition-security',
];

const LIVE_HTML = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith('.html'))
  .map((f) => path.join(ROOT, f));
LIVE_HTML.push(path.join(ROOT, 'de', 'index.html'));

function revertHtml(html) {
  let out = html;

  for (const slug of SLUGS) {
    const reSite = new RegExp(`${SITE}/${slug}(?!\\.html)(?=[/"'\\s#?]|$)`, 'g');
    out = out.replace(reSite, `${SITE}/${slug}.html`);
    out = out.replace(new RegExp(`href="/${slug}(#[^"]*)?"`, 'g'), (_, hash = '') => `href="${slug}.html${hash}"`);
  }

  return out;
}

let changed = 0;
for (const filePath of LIVE_HTML) {
  if (!fs.existsSync(filePath)) continue;
  const before = fs.readFileSync(filePath, 'utf8');
  const after = revertHtml(before);
  if (after !== before) {
    fs.writeFileSync(filePath, after);
    changed += 1;
    console.log(`reverted ${path.relative(ROOT, filePath)}`);
  }
}

console.log(`Done. ${changed} file(s) updated.`);
