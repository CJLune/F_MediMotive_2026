#!/usr/bin/env node
/**
 * Smoke-test clean URL routing (local file check + optional live host).
 * Usage:
 *   node tools/verify-clean-urls.mjs
 *   node tools/verify-clean-urls.mjs https://medimotive.de
 */
import fs from 'fs';
import path from 'path';
import { CLEAN_URL_SLUGS, EXPERTISE_SLUGS } from './vercel-clean-url-routes.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const host = process.argv[2]?.replace(/\/$/, '');

let failed = 0;

for (const slug of CLEAN_URL_SLUGS) {
  const file = path.join(ROOT, `${slug}.html`);
  if (!fs.existsSync(file)) {
    console.error(`MISSING file: ${slug}.html`);
    failed += 1;
  }
}

for (const slug of EXPERTISE_SLUGS) {
  const file = path.join(ROOT, `${slug}.html`);
  if (!fs.existsSync(file)) {
    console.error(`MISSING expertise file: ${slug}.html`);
    failed += 1;
  }
}

const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
if (vercel.cleanUrls) {
  console.error('FAIL: vercel.json must not set cleanUrls (use rewrites + redirects only)');
  failed += 1;
}

const rewriteSources = new Set((vercel.rewrites ?? []).map((r) => r.source));
for (const slug of CLEAN_URL_SLUGS) {
  if (!rewriteSources.has(`/${slug}`)) {
    console.error(`MISSING rewrite: /${slug}`);
    failed += 1;
  }
}
for (const slug of EXPERTISE_SLUGS) {
  if (!rewriteSources.has(`/services/${slug}`)) {
    console.error(`MISSING nested rewrite: /services/${slug}`);
    failed += 1;
  }
}

const redirectMap = new Map((vercel.redirects ?? []).map((r) => [r.source, r.destination]));
for (const slug of EXPERTISE_SLUGS) {
  if (redirectMap.get(`/${slug}`) !== `/services/${slug}`) {
    console.error(`MISSING flat→nested redirect: /${slug} → /services/${slug}`);
    failed += 1;
  }
}

if (host) {
  const samples = [
    '/',
    '/services',
    '/case-studies',
    '/contact',
    '/services/rapid-response-troubleshooting',
  ];
  for (const p of samples) {
    const url = `${host}${p}`;
    try {
      const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      const ok = res.status >= 200 && res.status < 400;
      console.log(`${ok ? 'OK' : 'FAIL'} ${res.status} ${url}`);
      if (!ok) failed += 1;
    } catch (err) {
      console.error(`FAIL fetch ${url}:`, err.message);
      failed += 1;
    }
  }

  try {
    const legacy = await fetch(`${host}/rapid-response-troubleshooting`, {
      method: 'HEAD',
      redirect: 'manual',
    });
    const redirected = legacy.status === 308 || legacy.status === 301;
    const loc = legacy.headers.get('location') || '';
    const ok = redirected && loc.includes('/services/rapid-response-troubleshooting');
    console.log(`${ok ? 'OK' : 'FAIL'} legacy flat expertise → ${legacy.status} ${loc}`);
    if (!ok) failed += 1;
  } catch (err) {
    console.error('FAIL legacy redirect check:', err.message);
    failed += 1;
  }

  try {
    const legacyHtml = await fetch(`${host}/services.html`, { method: 'HEAD', redirect: 'manual' });
    const redirected = legacyHtml.status === 308 || legacyHtml.status === 301;
    const loc = legacyHtml.headers.get('location') || '';
    console.log(
      `${redirected && loc.includes('/services') ? 'OK' : 'FAIL'} legacy /services.html → ${legacyHtml.status} ${loc}`,
    );
    if (!redirected || !loc.includes('/services')) failed += 1;
  } catch (err) {
    console.error('FAIL services.html redirect:', err.message);
    failed += 1;
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll clean URL checks passed.');
