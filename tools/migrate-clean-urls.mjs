#!/usr/bin/env node
/**
 * Extensionless internal links + nested /services/{slug} for expertise pages.
 * Run from repo root: node tools/migrate-clean-urls.mjs
 */
import fs from 'fs';
import path from 'path';
import { ALL_PAGE_SLUGS, EXPERTISE_SLUGS } from './vercel-clean-url-routes.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE_HOST = 'medimotive.de';

const LIVE_HTML = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith('.html'))
  .map((f) => path.join(ROOT, f));

LIVE_HTML.push(path.join(ROOT, 'de', 'index.html'));

const PAGE_SLUG = new RegExp(`^(?:${ALL_PAGE_SLUGS.join('|')})$`);

function toCleanHref(slug, suffix = '') {
  if (EXPERTISE_SLUGS.includes(slug)) return `/services/${slug}${suffix}`;
  return `/${slug}${suffix}`;
}

function migrateExpertiseNested(html) {
  let out = html;
  for (const slug of EXPERTISE_SLUGS) {
    const flat = `/${slug}`;
    const nested = `/services/${slug}`;
    const flatAbs = `https://${SITE_HOST}${flat}`;
    const nestedAbs = `https://${SITE_HOST}${nested}`;

    out = out.split(flatAbs).join(nestedAbs);
    out = out.replace(new RegExp(`href="${flat}([^"]*)"`, 'g'), `href="${nested}$1"`);
    out = out.replace(new RegExp(`href='${flat}([^']*)'`, 'g'), `href='${nested}$1'`);
  }
  return out;
}

function migrateHtml(html) {
  let out = html;

  out = out.replace(new RegExp(`https://${SITE_HOST}/([a-z0-9-]+)\\.html`, 'g'), (match, slug) => {
    if (!PAGE_SLUG.test(slug)) return match;
    return `https://${SITE_HOST}${toCleanHref(slug)}`;
  });

  out = out.replace(/href="([a-z0-9-]+)\.html([^"]*)"/gi, (match, slug, rest) => {
    if (!PAGE_SLUG.test(slug)) return match;
    return `href="${toCleanHref(slug, rest)}"`;
  });

  out = out.replace(/href='([a-z0-9-]+)\.html([^']*)'/gi, (match, slug, rest) => {
    if (!PAGE_SLUG.test(slug)) return match;
    return `href='${toCleanHref(slug, rest)}'`;
  });

  out = migrateExpertiseNested(out);

  return out;
}

let changed = 0;
for (const filePath of LIVE_HTML) {
  if (!fs.existsSync(filePath)) continue;
  const before = fs.readFileSync(filePath, 'utf8');
  const after = migrateHtml(before);
  if (after !== before) {
    fs.writeFileSync(filePath, after);
    changed += 1;
    console.log(`migrated ${path.relative(ROOT, filePath)}`);
  }
}

console.log(`Done. ${changed} file(s) updated.`);
