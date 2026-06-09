#!/usr/bin/env node
/**
 * Responsive audit — Phase 1 automated checks (Tests A–F)
 * Reporting only. Outputs JSON to stdout / file.
 */
import { createServer } from 'http';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const PORT = 8765;
const BASE = `http://127.0.0.1:${PORT}`;

const PAGES = [
  'index.html',
  'about.html',
  'services.html',
  'case-studies.html',
  'contact.html',
  'certificates.html',
  'regions.html',
  'our-approach.html',
  'work-journey.html',
  'rapid-response-troubleshooting.html',
  'supplier-quality-complaint-management.html',
  'ramp-up-process-stability.html',
  'early-phase-risk-control-design-for-quality.html',
  'qms-audit-regulatory-support.html',
  'knowledge-gap-transition-security.html',
  'case-coated-aluminum-parts.html',
  'case-production-ramp-up.html',
];

const OVERFLOW_VIEWS = [375, 390, 768, 920];
const TOUCH_VIEWS = [375, 390];
const FONT_VIEWS = [375];
const IMG_VIEWS = [375, 390];
const GRID_VIEWS = [375, 390, 768, 920];
const STICKY_VIEWS = [375];

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let path = req.url.split('?')[0];
      if (path === '/') path = '/index.html';
      const filePath = join(ROOT, decodeURIComponent(path.replace(/^\//, '')));
      if (!filePath.startsWith(ROOT) || !existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function runTests(page) {
  const testA = await page.evaluate(() => {
    return {
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      offenders: Array.from(document.querySelectorAll('*'))
        .filter((el) => el.offsetWidth > document.documentElement.clientWidth)
        .map((el) => ({
          tag: el.tagName,
          class: el.className.toString().slice(0, 80),
          id: el.id,
          offsetWidth: el.offsetWidth,
        }))
        .slice(0, 8),
    };
  });

  const testB = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        'a, button, [role="button"], summary, input, select, textarea, .btn, .expertise-situation-nav__link, .nav-dropdown__trigger, .expertise-areas-nav__link, .cert-trigger, .ed-faq summary',
      ),
    )
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.height > 0 && r.height < 44;
      })
      .map((el) => ({
        tag: el.tagName,
        text: el.textContent.trim().slice(0, 40),
        class: el.className.toString().slice(0, 60),
        height: Math.round(el.getBoundingClientRect().height),
        width: Math.round(el.getBoundingClientRect().width),
      })),
  );

  const testC = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('p, li, span, a, td, .lead, .eyebrow, .breadcrumb a, figcaption, .text-short'),
    )
      .filter((el) => {
        const size = parseFloat(window.getComputedStyle(el).fontSize);
        return size > 0 && size < 14 && el.offsetHeight > 0 && el.textContent.trim().length > 3;
      })
      .map((el) => ({
        tag: el.tagName,
        class: el.className.toString().slice(0, 60),
        fontSize: window.getComputedStyle(el).fontSize,
        text: el.textContent.trim().slice(0, 30),
      }))
      .slice(0, 15),
  );

  const testD = await page.evaluate(() =>
    Array.from(document.querySelectorAll('img, video, svg, canvas, figure'))
      .filter((el) => el.offsetWidth > document.documentElement.clientWidth + 2)
      .map((el) => ({
        tag: el.tagName,
        src: el.src ? el.src.split('/').pop() : '',
        class: el.className.toString().slice(0, 60),
        offsetWidth: el.offsetWidth,
        naturalWidth: el.naturalWidth || 0,
      })),
  );

  const testE = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        '[class*="grid"], [class*="bento"], [class*="expertise-bento"], [class*="loop__track"], [class*="cert"], [class*="footer-grid"], [class*="hero__grid"], [class*="ed-row"]',
      ),
    )
      .filter((el) => el.offsetHeight > 0)
      .map((el) => {
        const style = window.getComputedStyle(el);
        const cols =
          style.gridTemplateColumns && style.gridTemplateColumns !== 'none'
            ? style.gridTemplateColumns.split(' ').filter((c) => c !== '0px').length
            : 0;
        return {
          class: el.className.toString().slice(0, 70),
          display: style.display,
          gridTemplateColumns: style.gridTemplateColumns || 'N/A',
          columnCount: cols,
          flexDirection: style.flexDirection || 'N/A',
          overflow: style.overflow,
          offsetWidth: el.offsetWidth,
        };
      }),
  );

  const testF = await page.evaluate(() => {
    const stickies = Array.from(
      document.querySelectorAll(
        '[class*="sticky"], .expertise-situation-nav-wrap, .expertise-areas-nav, .site-header, .certificates-page [class*="subnav"]',
      ),
    )
      .filter((el) => {
        const pos = window.getComputedStyle(el).position;
        return pos === 'sticky' || pos === 'fixed';
      })
      .map((el) => ({
        class: el.className.toString().slice(0, 70),
        position: window.getComputedStyle(el).position,
        height: Math.round(el.getBoundingClientRect().height),
        top: window.getComputedStyle(el).top,
      }));
    const totalStickyHeight = stickies.reduce((sum, el) => sum + el.height, 0);
    return { stickies, totalStickyHeight, viewportRemaining: window.innerHeight - totalStickyHeight };
  });

  const phase2 = await page.evaluate(() => {
    const vw = window.innerWidth;
    const results = {};
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    results.navLinksVisible = navLinks ? window.getComputedStyle(navLinks).display !== 'none' : false;
    results.menuBtnVisible = menuBtn ? window.getComputedStyle(menuBtn).display !== 'none' : false;

    const activeNav = document.querySelector('.nav-links a.active, .mobile-drawer a.active');
    results.activeNavText = activeNav ? activeNav.textContent.trim() : null;

    const h1 = document.querySelector('h1');
    if (h1) {
      const r = h1.getBoundingClientRect();
      results.h1 = {
        fontSize: parseFloat(window.getComputedStyle(h1).fontSize),
        visible: r.height > 0 && r.width > 0,
        textAlign: window.getComputedStyle(h1).textAlign,
      };
    }

    const lead = document.querySelector('.lead');
    if (lead) {
      results.leadFontSize = parseFloat(window.getComputedStyle(lead).fontSize);
      results.leadTextAlign = window.getComputedStyle(lead).textAlign;
    }

    const heroActions = document.querySelector('.page-hero .actions, .hero .actions');
    if (heroActions) {
      const btns = heroActions.querySelectorAll('.btn');
      results.heroHasActions = btns.length > 0;
      if (vw <= 640 && btns.length) {
        const ar = heroActions.getBoundingClientRect();
        results.heroCtaFullWidth = Array.from(btns).every((b) => Math.abs(b.getBoundingClientRect().width - ar.width) < 8);
        results.heroCtaLeftGutter = ar.left;
      }
    } else {
      results.heroHasActions = false;
    }

    if (document.body.classList.contains('case-studies-page')) {
      const h1el = document.querySelector('.page-hero--evidence h1');
      results.caseHeroTextAlign = h1el ? window.getComputedStyle(h1el).textAlign : null;
      results.caseHeroHasActions = !!document.querySelector('.page-hero--evidence .actions');
      results.caseTags01 = Array.from(document.querySelectorAll('#case-01 .case-situation-tag')).map((t) => t.textContent.trim());
      results.caseTags02 = Array.from(document.querySelectorAll('#case-02 .case-situation-tag')).map((t) => t.textContent.trim());
      results.kpi75 = document.querySelector('#case-01 .case-featured-card__kpi strong')?.textContent.trim();
      results.kpi1500 = document.querySelector('#case-02 .case-featured-card__kpi strong')?.textContent.trim();
      results.visibleMailtoInMain = document.querySelectorAll('main a[href^="mailto:"]').length;
      results.anonBlock = !!document.querySelector('.case-anon-block');
      results.closingCtaHeading = document.querySelector('.case-studies-close h2')?.textContent.trim() || null;
    }

    if (document.body.classList.contains('expertise-detail-page')) {
      results.edHeroBadge = !!document.querySelector('.ed-hero__badge, .expertise-hero__number, [class*="hero__num"]');
      results.edChips = document.querySelectorAll('.ed-hero__chips span, .qualifier-chip, .ed-chip').length;
      results.edNav = !!document.querySelector('.expertise-areas-nav, .expertise-situation-nav');
      results.edHeroImage = !!document.querySelector('.ed-hero__media img, .expertise-hero__media img');
    }

    if (document.body.classList.contains('services-page')) {
      results.situationNavPills = document.querySelectorAll('.expertise-situation-nav__link').length;
      results.faqLayout = !!document.querySelector('.faq-layout');
    }

    return results;
  });

  return { testA, testB, testC, testD, testE, testF, phase2 };
}

async function main() {
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const report = {
    generatedAt: new Date().toISOString(),
    breakpoints: { overflow: OVERFLOW_VIEWS, touch: TOUCH_VIEWS, font: FONT_VIEWS, img: IMG_VIEWS, grid: GRID_VIEWS, sticky: STICKY_VIEWS },
    phase1: { testA: [], testB: [], testC: [], testD: [], testE: [], testF: [] },
    phase2: [],
    summary: { overflowIssues: 0, touchIssues: 0, fontIssues: 0, imgIssues: 0, gridFlags: 0, stickyFlags: 0 },
  };

  const phase2Views = [375, 390, 768, 920, 1024, 1440];
  const allViews = [...new Set([...OVERFLOW_VIEWS, ...TOUCH_VIEWS, ...FONT_VIEWS, ...IMG_VIEWS, ...GRID_VIEWS, ...STICKY_VIEWS, ...phase2Views])].sort((a, b) => a - b);

  for (const page of PAGES) {
    for (const w of allViews) {
      const context = await browser.newContext({ viewport: { width: w, height: w <= 375 ? 667 : 812 } });
      const pg = await context.newPage();
      await pg.goto(`${BASE}/${page}`, { waitUntil: 'networkidle', timeout: 45000 });
      await pg.waitForTimeout(400);

      const { testA, testB, testC, testD, testE, testF, phase2 } = await runTests(pg);

      if (OVERFLOW_VIEWS.includes(w) && testA.hasOverflow) {
        report.summary.overflowIssues++;
        report.phase1.testA.push({ page, viewport: w, ...testA });
      }

      if (TOUCH_VIEWS.includes(w) && testB.length) {
        report.summary.touchIssues += testB.length;
        report.phase1.testB.push({ page, viewport: w, items: testB });
      }

      if (FONT_VIEWS.includes(w) && testC.length) {
        report.summary.fontIssues += testC.length;
        report.phase1.testC.push({ page, viewport: w, items: testC });
      }

      if (IMG_VIEWS.includes(w) && testD.length) {
        report.summary.imgIssues += testD.length;
        report.phase1.testD.push({ page, viewport: w, items: testD });
      }

      if (GRID_VIEWS.includes(w)) {
        const multiCol = testE.filter((g) => w <= 390 && g.display === 'grid' && g.columnCount > 1);
        if (multiCol.length) {
          report.summary.gridFlags += multiCol.length;
          report.phase1.testE.push({ page, viewport: w, multiColAtMobile: multiCol });
        }
      }

      if (STICKY_VIEWS.includes(w)) {
        report.phase1.testF.push({
          page,
          viewport: w,
          ...testF,
          flagged: testF.totalStickyHeight > 162,
        });
        if (testF.totalStickyHeight > 162) report.summary.stickyFlags++;
      }

      if (phase2Views.includes(w)) {
        report.phase2.push({ page, viewport: w, checks: phase2 });
      }

      await context.close();
    }
  }

  await browser.close();
  server.close();

  const outDir = join(ROOT, 'source-truth');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'responsive-audit-report.json');
  writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log('Report written to', outPath);
  console.log('Summary:', JSON.stringify(report.summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
