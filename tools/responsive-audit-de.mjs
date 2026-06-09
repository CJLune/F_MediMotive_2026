#!/usr/bin/env node
/**
 * DE locale responsive audit — mobile (375/390/640) + tablet (768/920)
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import { LOCALE_PAIRS } from './locale-url-map.mjs';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const BASE = process.env.AUDIT_BASE || 'https://medimotive.de';

const PAGES = Object.values(LOCALE_PAIRS).map((p) => ({
  path: p.dePath,
  name: p.dePath.replace(/^\/de\/?/, 'de-').replace(/\//g, '-').replace(/-$/, '') || 'de-index',
}));

const VIEWPORTS = [
  { w: 375, h: 667, label: 'mobile-375' },
  { w: 390, h: 844, label: 'mobile-390' },
  { w: 640, h: 900, label: 'mobile-max-640' },
  { w: 768, h: 1024, label: 'tablet-768' },
  { w: 920, h: 1180, label: 'tablet-max-920' },
];

async function runChecks(page, viewport) {
  return page.evaluate((vw) => {
    const issues = [];
    const doc = document.documentElement;
    const overflowPx = doc.scrollWidth - doc.clientWidth;
    if (overflowPx > 1) {
      const offenders = Array.from(document.querySelectorAll('*'))
        .filter((el) => el.offsetWidth > doc.clientWidth + 1)
        .slice(0, 5)
        .map((el) => ({
          tag: el.tagName,
          class: String(el.className).slice(0, 70),
          width: el.offsetWidth,
        }));
      issues.push({ type: 'overflow', overflowPx, offenders });
    }

    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuVisible = menuBtn && getComputedStyle(menuBtn).display !== 'none';
    const navHidden = navLinks && getComputedStyle(navLinks).display === 'none';
    if (vw <= 920 && (!menuVisible || !navHidden)) {
      issues.push({ type: 'nav', menuVisible, navHidden, vw });
    }

    const smallTargets = Array.from(
      document.querySelectorAll('a.btn, button.btn, .actions .btn, .menu-btn'),
    )
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.height > 0 && r.height < 44;
      })
      .map((el) => ({
        text: el.textContent.trim().slice(0, 40),
        height: Math.round(el.getBoundingClientRect().height),
      }));
    if (smallTargets.length) issues.push({ type: 'touch-target', items: smallTargets });

    const container = document.querySelector('.container, .container.narrow');
    if (container) {
      const cr = container.getBoundingClientRect();
      const gutterLeft = cr.left;
      const gutterRight = vw - cr.right;
      if (gutterLeft < 8 || gutterRight < 8) {
        issues.push({ type: 'gutter', gutterLeft: Math.round(gutterLeft), gutterRight: Math.round(gutterRight) });
      }
    }

    if (vw <= 640) {
      const actions = document.querySelector('.page-hero .actions, .hero .actions, .actions');
      if (actions) {
        const btns = actions.querySelectorAll('.btn');
        const ar = actions.getBoundingClientRect();
        const stacked = btns.length > 1 && btns[0].getBoundingClientRect().top !== btns[1]?.getBoundingClientRect().top;
        const narrow = Array.from(btns).some((b) => b.getBoundingClientRect().width < 120);
        if (btns.length > 1 && !stacked && ar.width < vw - 32) {
          issues.push({ type: 'cta-not-stacked', btnCount: btns.length });
        }
        if (narrow && btns.length) issues.push({ type: 'cta-narrow', btnCount: btns.length });
      }
    }

    const wideMedia = Array.from(document.querySelectorAll('img, video, table, pre'))
      .filter((el) => el.offsetWidth > doc.clientWidth + 2)
      .slice(0, 3)
      .map((el) => ({ tag: el.tagName, class: String(el.className).slice(0, 50), width: el.offsetWidth }));
    if (wideMedia.length) issues.push({ type: 'wide-media', items: wideMedia });

    const lang = document.documentElement.lang;
    if (lang !== 'de') issues.push({ type: 'lang', lang });

    return { issueCount: issues.length, issues };
  }, viewport.w);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const report = {
    base: BASE,
    generatedAt: new Date().toISOString(),
    viewports: VIEWPORTS.map((v) => v.label),
    pages: [],
    summary: { totalChecks: 0, pagesWithIssues: 0, issueCounts: {} },
  };

  for (const pg of PAGES) {
    const pageReport = { ...pg, url: `${BASE}${pg.path}`, viewports: [] };
    let pageHasIssue = false;

    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
      const page = await ctx.newPage();
      try {
        const res = await page.goto(pageReport.url, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);
        const status = res?.status() ?? 0;
        const checks = await runChecks(page, vp);
        const entry = { ...vp, status, ...checks };
        pageReport.viewports.push(entry);
        report.summary.totalChecks++;
        if (checks.issueCount > 0) {
          pageHasIssue = true;
          for (const iss of checks.issues) {
            report.summary.issueCounts[iss.type] = (report.summary.issueCounts[iss.type] || 0) + 1;
          }
        }
      } catch (e) {
        pageReport.viewports.push({ ...vp, error: String(e.message || e) });
        pageHasIssue = true;
      }
      await ctx.close();
    }
    if (pageHasIssue) report.summary.pagesWithIssues++;
    report.pages.push(pageReport);
  }

  await browser.close();
  const out = join(ROOT, 'source-truth', 'responsive-audit-de-report.json');
  mkdirSync(join(ROOT, 'source-truth'), { recursive: true });
  writeFileSync(out, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report.summary, null, 2));
  const failing = report.pages.filter((p) => p.viewports.some((v) => v.issueCount > 0 || v.error));
  for (const p of failing) {
    console.log('\n---', p.name, '---');
    for (const v of p.viewports.filter((x) => x.issueCount > 0 || x.error)) {
      console.log(`  ${v.label}:`, v.error || v.issues?.map((i) => i.type).join(', '));
      if (v.issues) v.issues.forEach((i) => console.log('   ', JSON.stringify(i)));
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
