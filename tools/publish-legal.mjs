#!/usr/bin/env node
/**
 * Publishes approved legal pages: removes noindex, review banners, updates CSV + sitemap.
 * Usage: node tools/publish-legal.mjs --confirm
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const LEGAL_PAGES = ['imprint.html', 'privacy.html'];
const REVIEW_BANNER_START = '<!-- legal:review-banner -->';
const REVIEW_BANNER_END = '<!-- /legal:review-banner -->';

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

if (!process.argv.includes('--confirm')) {
  fail(
    'Refusing to publish without --confirm.\n' +
      'Ensure imprint.html and privacy.html are approved by counsel, then run:\n' +
      '  node tools/publish-legal.mjs --confirm'
  );
}

function stripReviewBanner(html) {
  const start = html.indexOf(REVIEW_BANNER_START);
  if (start === -1) return html;
  const end = html.indexOf(REVIEW_BANNER_END, start);
  if (end === -1) return html;
  return html.slice(0, start) + html.slice(end + REVIEW_BANNER_END.length);
}

function removeNoindex(html) {
  return html.replace(/\n?\s*<meta name="robots" content="noindex, follow" \/>/g, '');
}

function polishMeta(html, file) {
  let out = html;
  if (file === 'imprint.html') {
    out = out.replace(
      /content="Legal identity and contact information for MediMotive\. Draft imprint[^"]*"/g,
      'content="Legal identity and contact information for MediMotive."'
    );
    out = out.replace(/Legal · draft/g, 'Legal');
    out = out.replace(
      /This draft must be reviewed by qualified legal counsel before the site is published\./g,
      'Legal identity and contact details for this website.'
    );
  }
  if (file === 'privacy.html') {
    out = out.replace(
      /content="How MediMotive handles personal data on this manufacturing-quality evidence hub website\. Draft[^"]*"/g,
      'content="How MediMotive handles personal data on this website."'
    );
    out = out.replace(/Legal · draft/g, 'Legal');
    out = out.replace(
      /This draft must be reviewed for GDPR compliance before publication\./g,
      'How personal data is handled when you use this website.'
    );
  }
  return out;
}

function updatePageStatusCsv() {
  const csvPath = path.join(ROOT, 'source-truth', 'page-status.csv');
  const lines = fs.readFileSync(csvPath, 'utf8').split('\n');
  const out = lines.map((line) => {
    for (const route of LEGAL_PAGES) {
      if (line.startsWith(`${route},draft,`)) {
        return line
          .replace(`${route},draft,`, `${route},live,`)
          .replace(/Placeholder — [^,]+$/, 'Published after legal review');
      }
    }
    return line;
  });
  fs.writeFileSync(csvPath, out.join('\n'));
}

for (const file of LEGAL_PAGES) {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) fail(`Missing ${file}`);
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('noindex')) {
    console.warn(`${file}: no noindex tag found (already published?)`);
  }
  html = stripReviewBanner(html);
  html = removeNoindex(html);
  html = polishMeta(html, file);
  fs.writeFileSync(filePath, html);
  console.log(`Published: ${file}`);
}

updatePageStatusCsv();
console.log('Updated source-truth/page-status.csv');

// Sync NOINDEX set in apply-seo.mjs
const seoPath = path.join(ROOT, 'tools', 'apply-seo.mjs');
let seoSrc = fs.readFileSync(seoPath, 'utf8');
seoSrc = seoSrc.replace(
  "const NOINDEX = new Set(['imprint.html', 'privacy.html', 'gallery.html']);",
  "const NOINDEX = new Set(['gallery.html']);"
);
fs.writeFileSync(seoPath, seoSrc);

const seo = spawnSync('node', ['tools/apply-seo.mjs'], { cwd: ROOT, stdio: 'inherit' });
if (seo.status !== 0) fail('apply-seo.mjs failed');

const sitemap = spawnSync('node', ['tools/generate-sitemap.mjs'], { cwd: ROOT, stdio: 'inherit' });
if (sitemap.status !== 0) fail('generate-sitemap.mjs failed');

console.log('\nDone. imprint.html and privacy.html are indexable. Verify in browser and Search Console.');
