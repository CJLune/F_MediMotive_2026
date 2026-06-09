#!/usr/bin/env node
/**
 * Generates sitemap.xml and site-urls.json from source-truth/page-status.csv
 * Run from repo root: node tools/generate-sitemap.mjs
 */
import fs from 'fs';
import path from 'path';
import { canonicalForHtmlRoute } from './vercel-clean-url-routes.mjs';
import { LOCALE_PAIRS } from './locale-url-map.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = 'https://medimotive.de';
const CSV_PATH = path.join(ROOT, 'source-truth', 'page-status.csv');

/** Routes excluded from sitemap (still may be live HTML; match noindex in HTML) */
const NOINDEX_ROUTES = new Set(['gallery.html']);
const DRAFT_STATUSES = new Set(['draft', 'removed']);

const PRIORITY_RULES = [
  { match: (r) => r === 'index.html', priority: 1.0, changefreq: 'monthly' },
  { match: (r) => ['services.html', 'case-studies.html'].includes(r), priority: 0.9, changefreq: 'monthly' },
  {
    match: (r) => ['case-coated-aluminum-parts.html', 'case-production-ramp-up.html'].includes(r),
    priority: 0.85,
    changefreq: 'monthly',
  },
  {
    match: (r) => ['case-coated-aluminum-parts.html', 'case-production-ramp-up.html'].includes(r),
    priority: 0.85,
    changefreq: 'monthly',
  },
  { match: (r) => r === 'about.html', priority: 0.8, changefreq: 'monthly' },
  { match: (r) => r === 'contact.html', priority: 0.7, changefreq: 'yearly' },
  {
    match: (r) =>
      [
        'rapid-response-troubleshooting.html',
        'supplier-quality-complaint-management.html',
        'ramp-up-process-stability.html',
        'early-phase-risk-control-design-for-quality.html',
        'qms-audit-regulatory-support.html',
        'knowledge-gap-transition-security.html',
      ].includes(r),
    priority: 0.8,
    changefreq: 'monthly',
  },
  { match: (r) => ['certificates.html', 'our-approach.html', 'gallery.html'].includes(r), priority: 0.6, changefreq: 'yearly' },
  { match: (r) => ['work-journey.html', 'regions.html'].includes(r), priority: 0.5, changefreq: 'yearly' },
];

function routeToLoc(route) {
  return canonicalForHtmlRoute(route, SITE);
}

function getMeta(route) {
  const rule = PRIORITY_RULES.find((r) => r.match(route));
  return rule || { priority: 0.5, changefreq: 'yearly' };
}

function parseCsv(text) {
  const lines = text.trim().split('\n');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const cols = line.split(',');
    const route = cols[0]?.trim();
    const status = cols[1]?.trim();
    if (route) rows.push({ route, status });
  }
  return rows;
}

function routeToDeLoc(enRoute) {
  const pair = LOCALE_PAIRS[enRoute];
  if (!pair?.dePath) return null;
  return pair.dePath === '/de/' ? `${SITE}/de/` : `${SITE}${pair.dePath}`;
}

function lastmodForRoute(route) {
  const filePath = path.join(ROOT, route);
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime.toISOString().slice(0, 10);
  } catch {
    return null;
  }
}

function lastmodForDeFile(deFile) {
  return lastmodForRoute(deFile);
}

function buildPages(rows) {
  const excluded = [];
  const pages = [];

  for (const { route, status } of rows) {
    if (DRAFT_STATUSES.has(status)) {
      excluded.push({ route, reason: status });
      continue;
    }
    if (NOINDEX_ROUTES.has(route)) {
      excluded.push({ route, reason: 'noindex' });
      continue;
    }
    if (status !== 'live') {
      excluded.push({ route, reason: status || 'unknown' });
      continue;
    }

    const { priority, changefreq } = getMeta(route);
    const lastmod = lastmodForRoute(route);
    pages.push({
      route,
      loc: routeToLoc(route),
      status: 'live',
      priority,
      changefreq,
      ...(lastmod ? { lastmod } : {}),
    });

    const deLoc = routeToDeLoc(route);
    if (deLoc) {
      const deFile = LOCALE_PAIRS[route]?.deFile;
      const deLastmod = deFile ? lastmodForDeFile(deFile) : lastmod;
      pages.push({
        route: deFile ?? `de/${route}`,
        loc: deLoc,
        status: 'live',
        priority,
        changefreq,
        ...(deLastmod ? { lastmod: deLastmod } : {}),
      });
    }
  }

  excluded.push({
    route: 'medimotive-all-in-one.example.html',
    reason: 'disallowed',
  });

  return { pages, excluded };
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatPriority(priority) {
  return Number(priority).toFixed(1);
}

function buildXml(pages) {
  const urls = pages
    .map((p) => {
      const lines = [
        '  <url>',
        `    <loc>${escapeXml(p.loc)}</loc>`,
        ...(p.lastmod ? [`    <lastmod>${p.lastmod}</lastmod>`] : []),
        `    <changefreq>${p.changefreq}</changefreq>`,
        `    <priority>${formatPriority(p.priority)}</priority>`,
        '  </url>',
      ];
      return lines.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function main() {
  const csv = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCsv(csv);
  const { pages, excluded } = buildPages(rows);

  const json = {
    site: SITE,
    generatedAt: new Date().toISOString(),
    sitemapXml: '/sitemap.xml',
    pages,
    excluded,
  };

  const xml = buildXml(pages);
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
  // Alias for GSC re-submission if an old sitemap URL is stuck as "Couldn't fetch"
  fs.writeFileSync(path.join(ROOT, 'google-sitemap.xml'), xml, 'utf8');
  fs.writeFileSync(path.join(ROOT, 'site-urls.json'), `${JSON.stringify(json, null, 2)}\n`, 'utf8');

  console.log(`Wrote sitemap.xml (${pages.length} URLs)`);
  console.log('Wrote google-sitemap.xml (same content, alternate GSC path)');
  console.log(`Wrote site-urls.json (${excluded.length} excluded entries)`);
}

main();
