#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = 'https://medimotive.de';

const PAGES = [
  {
    file: 'rapid-response-troubleshooting.html',
    name: 'Rapid Response Troubleshooting',
    desc: 'Rapid response troubleshooting — recurring defects, measurement deadlocks, and the Perfect Part Paradox.',
    navLabel: 'Rapid Response Troubleshooting',
  },
  {
    file: 'supplier-quality-complaint-management.html',
    name: 'Supplier Quality & Complaint Management',
    desc: 'Supplier quality and complaint management — OEM escalation, QSV review, and technical communication.',
  },
  {
    file: 'ramp-up-process-stability.html',
    name: 'Ramp-Up & Process Stability',
    desc: 'Ramp-up and process stability — line design, supplier co-engineering, and validation at scale.',
  },
  {
    file: 'early-phase-risk-control-design-for-quality.html',
    name: 'Early-Phase Risk & Design-for-Quality',
    desc: 'Early-phase risk and design-for-quality — manufacturability review and specification gaps before production.',
  },
  {
    file: 'qms-audit-regulatory-support.html',
    name: 'QMS, Audit & Regulatory Support',
    desc: 'QMS, audit and regulatory support — VDA 6.3, ISO 13485, EU-MDR, and systems that work at the machine level.',
  },
  {
    file: 'knowledge-gap-transition-security.html',
    name: 'Knowledge Gap & Transition Security',
    desc: 'Knowledge gap and transition security — preserving critical know-how through materials and verification.',
  },
];

function pageUrl(route) {
  return `${SITE}/${route.replace(/\.html$/, '')}`;
}

function graphJson(page) {
  const url = pageUrl(page.file);
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'MediMotive', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Expertise', item: `${SITE}/services` },
          { '@type': 'ListItem', position: 3, name: page.name, item: url },
        ],
      },
      {
        '@type': 'WebPage',
        name: `${page.name} | MediMotive Expertise`,
        description: page.desc,
        url,
        isPartOf: { '@type': 'WebSite', name: 'MediMotive', url: `${SITE}/` },
      },
    ],
  });
}

for (const page of PAGES) {
  const filePath = path.join(ROOT, page.file);
  let html = fs.readFileSync(filePath, 'utf8');

  html = html.replace(
    /<a class="active" href="\/services" aria-current="page">Expertise<\/a>/g,
    '<a href="/services">Expertise</a>',
  );

  if (page.navLabel) {
    html = html.replace(
      /<a href="\/rapid-response-troubleshooting" aria-current="page">Production Troubleshooting<\/a>/,
      `<a href="/rapid-response-troubleshooting" aria-current="page">${page.navLabel}</a>`,
    );
  }

  html = html.replace(
    /<section class="section expertise-areas-section"/,
    '<section class="section expertise-areas-section expertise-areas-section--subtle"',
  );

  const ld = `<script type="application/ld+json">${graphJson(page)}</script>`;
  if (!html.includes('BreadcrumbList')) {
    html = html.replace(/<link rel="stylesheet" href="assets\/styles\.css" \/>/, `$&\n  ${ld}`);
  }

  fs.writeFileSync(filePath, html);
  console.log(`expertise: ${page.file}`);
}
