#!/usr/bin/env node
/**
 * Applies shared SEO head tags across live HTML pages.
 * Run from repo root: node tools/apply-seo.mjs
 */
import fs from 'fs';
import path from 'path';
import { canonicalForHtmlRoute } from './vercel-clean-url-routes.mjs';
import { LOCALE_PAIRS } from './locale-url-map.mjs';
import { buildFaviconLinkTags } from './favicon-urls.mjs';
import { buildGoogleMetaTag, resolveMetaContent, loadGscConfig } from './google-site-verification.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = 'https://medimotive.de';
const OG_IMAGE = `${SITE}/assets/images/og-medimotive.jpg`;
const OG_IMAGE_WIDTH = '1200';
const OG_IMAGE_HEIGHT = '630';
const OG_IMAGE_ALT = 'MediMotive - practical manufacturing-quality evidence';

/** Legal pages: remove from this set via `node tools/publish-legal.mjs --confirm` after counsel approval */
const NOINDEX = new Set(['imprint.html', 'privacy.html', 'gallery.html']);

/** Set true when /de/ mirrors are indexable and reciprocal hreflang is on every pair. */
const HREFLANG_CLUSTER_ENABLED = true;

/** EN html filename → public path pairs (gallery excluded — noindex, no reciprocal hreflang). */
const HREFLANG_PAIRS = Object.fromEntries(
  Object.entries(LOCALE_PAIRS).filter(([file]) => file !== 'gallery.html'),
);

function buildHreflangTags(filename) {
  if (!HREFLANG_CLUSTER_ENABLED) return '';
  const pair = HREFLANG_PAIRS[filename];
  if (!pair) return '';
  const enUrl = pair.enPath === '/' ? `${SITE}/` : `${SITE}${pair.enPath}`;
  const deUrl = `${SITE}${pair.dePath}`;
  return `\n  <link rel="alternate" hreflang="en" href="${enUrl}" />\n  <link rel="alternate" hreflang="de" href="${deUrl}" />\n  <link rel="alternate" hreflang="x-default" href="${enUrl}" />`;
}

const CANONICAL = {
  'index.html': canonicalForHtmlRoute('index.html', SITE),
  'services.html': canonicalForHtmlRoute('services.html', SITE),
  'case-studies.html': canonicalForHtmlRoute('case-studies.html', SITE),
  'about.html': canonicalForHtmlRoute('about.html', SITE),
  'contact.html': canonicalForHtmlRoute('contact.html', SITE),
  'rapid-response-troubleshooting.html': canonicalForHtmlRoute('rapid-response-troubleshooting.html', SITE),
  'supplier-quality-complaint-management.html': canonicalForHtmlRoute('supplier-quality-complaint-management.html', SITE),
  'ramp-up-process-stability.html': canonicalForHtmlRoute('ramp-up-process-stability.html', SITE),
  'early-phase-risk-control-design-for-quality.html': canonicalForHtmlRoute('early-phase-risk-control-design-for-quality.html', SITE),
  'qms-audit-regulatory-support.html': canonicalForHtmlRoute('qms-audit-regulatory-support.html', SITE),
  'knowledge-gap-transition-security.html': canonicalForHtmlRoute('knowledge-gap-transition-security.html', SITE),
  'certificates.html': canonicalForHtmlRoute('certificates.html', SITE),
  'work-journey.html': canonicalForHtmlRoute('work-journey.html', SITE),
  'our-approach.html': canonicalForHtmlRoute('our-approach.html', SITE),
  'regions.html': canonicalForHtmlRoute('regions.html', SITE),
  'gallery.html': canonicalForHtmlRoute('gallery.html', SITE),
  'imprint.html': canonicalForHtmlRoute('imprint.html', SITE),
  'privacy.html': canonicalForHtmlRoute('privacy.html', SITE),
  'case-coated-aluminum-parts.html': canonicalForHtmlRoute('case-coated-aluminum-parts.html', SITE),
  'case-production-ramp-up.html': canonicalForHtmlRoute('case-production-ramp-up.html', SITE),
};

const SEO_BLOCK_START = '<!-- seo:canonical-og -->';
const SEO_BLOCK_END = '<!-- /seo:canonical-og -->';

function buildSeoBlock(file, title, description) {
  const canonical = CANONICAL[file];
  const noindex = NOINDEX.has(file);
  const robots = noindex ? '\n  <meta name="robots" content="noindex, follow" />' : '';
  const safeDesc = description.replace(/"/g, '&quot;');
  const safeTitle = title.replace(/"/g, '&quot;');

  return `${SEO_BLOCK_START}
${buildFaviconLinkTags()}
  <link rel="canonical" href="${canonical}" />${buildHreflangTags(file)}${robots}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="MediMotive" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />
  <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />
  <meta property="og:image:alt" content="${OG_IMAGE_ALT}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
${SEO_BLOCK_END}`;
}

function extractMeta(html, name) {
  const re =
    name === 'title'
      ? /<title>([^<]*)<\/title>/i
      : new RegExp(`<meta name="${name}" content="([^"]*)"`, 'i');
  const m = html.match(re);
  return m ? m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&') : '';
}

function stripOldSeoBlock(html) {
  const re = /<!-- seo:canonical-og -->[\s\S]*?<!-- \/seo:canonical-og -->\n?/g;
  let out = html.replace(re, '');
  out = out.replace(/<link rel="shortcut icon"[^>]*>\n?/g, '');
  out = out.replace(/<link rel="icon"[^>]*>\n?/g, '');
  out = out.replace(/<link rel="apple-touch-icon"[^>]*>\n?/g, '');
  out = out.replace(/<link rel="canonical"[^>]*>\n?/g, '');
  out = out.replace(/<meta name="robots" content="noindex[^"]*"[^>]*>\n?/g, '');
  out = out.replace(/<meta property="og:[^"]*"[^>]*>\n?/g, '');
  out = out.replace(/<meta name="twitter:card"[^>]*>\n?/g, '');
  out = out.replace(/<meta name="twitter:[^"]*"[^>]*>\n?/g, '');
  out = out.replace(/<link rel="alternate" hreflang="[^"]*"[^>]*>\n?/g, '');
  out = out.replace(/<!-- hreflang:[^\n]*-->\n?/g, '');
  out = out.replace(/<meta name="google-site-verification"[^>]*>\n?/g, '');
  return out;
}

function googleMetaForIndex() {
  const config = loadGscConfig();
  const content = resolveMetaContent(config);
  return content ? `\n${buildGoogleMetaTag(content)}` : '';
}

function patchFile(filename) {
  const filePath = path.join(ROOT, filename);
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  html = stripOldSeoBlock(html);

  const title = extractMeta(html, 'title');
  const description = extractMeta(html, 'description');
  const block = buildSeoBlock(filename, title, description);

  if (!html.includes('<meta name="theme-color"')) {
    console.warn(`skip ${filename}: no theme-color anchor`);
    return;
  }

  // Use function replacer — descriptions may contain "$1M"; string `$1${block}` corrupts via replace() backrefs
  const googleMeta = filename === 'index.html' ? googleMetaForIndex() : '';
  html = html.replace(
    /(<meta name="theme-color" content="[^"]*" \/>)/,
    (themeTag) => `${themeTag}${googleMeta}\n${block}`,
  );

  html = html.replace(
    /"knowsAbout": \[([^\]]*)\]/g,
    (match, inner) => {
      if (!inner.includes('IATF')) return match;
      const items = inner
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s && !s.includes('IATF'));
      return `"knowsAbout": [${items.join(', ')}]`;
    },
  );

  html = html.replace(/alt="" width="60" height="60" loading="lazy" decoding="async"/g, 'alt="Portrait of Björn Seiler, founder of MediMotive" width="60" height="60" loading="lazy" decoding="async"');

  html = html.replace(
    /(<span class="cert-card__media"><img src="[^"]+" )alt=""([^>]*data-cert-view[^>]*>)/g,
    '',
  );

  html = html.replace(
    /<span class="cert-card__media"><img src="([^"]+)" alt="" width="400" height="300" loading="lazy"><\/span>/g,
    (full, src) => {
      const triggerRe = new RegExp(
        `data-cert-src="${src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*data-cert-alt="([^"]*)"`,
      );
      const m = html.match(triggerRe);
      const alt = m ? m[1] : 'Certificate document';
      return `<span class="cert-card__media"><img src="${src}" alt="${alt}" width="400" height="300" loading="lazy"></span>`;
    },
  );

  fs.writeFileSync(filePath, html);
  console.log(`patched ${filename}`);
}

const livePages = Object.keys(CANONICAL);
livePages.forEach(patchFile);

console.log('Done. Update source-truth/site-url.md if the domain changes.');
