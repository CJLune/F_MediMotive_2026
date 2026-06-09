#!/usr/bin/env node
/**
 * Writes Vercel rewrites (/services → file) and redirects (*.html → clean).
 * Expertise pages: /services/{slug} → {slug}.html; flat /{slug} → 301 nested.
 * Does NOT use cleanUrls (that broke production: redirect without rewrite).
 * Run before deploy: node tools/sync-vercel-clean-urls.mjs
 */
import fs from 'fs';
import path from 'path';
import {
  buildCleanUrlRewrites,
  buildDeCleanUrlRewrites,
  buildDeLegacySlugRedirects,
  buildExpertiseFlatRedirects,
  buildServicesAssetsRewrite,
  CLEAN_URL_SLUGS,
  EXPERTISE_SLUGS,
} from './vercel-clean-url-routes.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const VERCEL_PATH = path.join(ROOT, 'vercel.json');

/** Always preserved — not generated from slug list */
const STATIC_REDIRECTS = [
  {
    source: '/:path*',
    has: [{ type: 'host', value: 'www.medimotive.de' }],
    destination: 'https://medimotive.de/:path*',
    permanent: true,
  },
  { source: '/index.html', destination: '/', permanent: true },
  { source: '/de/index.html', destination: '/de/', permanent: true },
  { source: '/favicon.ico', destination: '/medimotive-favicon.ico', permanent: false },
  {
    source: '/apple-touch-icon-precomposed.png',
    destination: '/apple-touch-icon.png',
    permanent: false,
  },
  { source: '/organic-quality-method.html', destination: '/our-approach', permanent: true },
  { source: '/organic-quality-method', destination: '/our-approach', permanent: true },
];

function buildHtmlToCleanRedirects() {
  const flat = CLEAN_URL_SLUGS.map((slug) => ({
    source: `/${slug}.html`,
    destination: `/${slug}`,
    permanent: true,
  }));
  const expertise = EXPERTISE_SLUGS.map((slug) => ({
    source: `/${slug}.html`,
    destination: `/services/${slug}`,
    permanent: true,
  }));
  return [...flat, ...expertise];
}

function main() {
  const config = JSON.parse(fs.readFileSync(VERCEL_PATH, 'utf8'));

  delete config.cleanUrls;

  config.rewrites = [
    ...buildCleanUrlRewrites(),
    buildServicesAssetsRewrite(),
    ...buildDeCleanUrlRewrites(),
  ];
  config.redirects = [
    ...STATIC_REDIRECTS,
    ...buildHtmlToCleanRedirects(),
    ...buildExpertiseFlatRedirects(),
    ...buildDeLegacySlugRedirects(),
  ];

  fs.writeFileSync(VERCEL_PATH, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  console.log(
    `Updated vercel.json: ${config.rewrites.length} rewrites, ${config.redirects.length} redirects (cleanUrls off)`,
  );
}

main();
