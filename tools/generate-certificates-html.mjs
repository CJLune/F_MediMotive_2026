#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  CERT_GROUPS,
  HAS_CREDENTIAL_JSON,
  renderCertChapterNav,
  renderCertGroups,
} from './certificates-data.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = join(root, 'certificates.html');
let html = readFileSync(htmlPath, 'utf8');

const chapterNavHtml = renderCertChapterNav();
const navStart = html.indexOf('<ul class="home-proof-chips" data-home-chapter-nav>');
const navEnd = html.indexOf('</ul>', navStart);
if (navStart !== -1 && navEnd !== -1) {
  html =
    html.slice(0, navStart) +
    `<ul class="home-proof-chips" data-home-chapter-nav>\n${chapterNavHtml}\n        ` +
    html.slice(navEnd);
}

const groupsHtml = renderCertGroups();
const start = html.indexOf('<div class="cert-groups"');
const end = html.indexOf('</div></section>', start);
if (start === -1 || end === -1) {
  console.error('Could not find cert-groups block in certificates.html');
  process.exit(1);
}
const before = html.slice(0, start);
const after = html.slice(end);
html =
  before +
  `<div class="cert-groups" aria-label="Certificate records">\n${groupsHtml}\n  </div>` +
  after;

const credentials = HAS_CREDENTIAL_JSON.map((name) => ({
  '@type': 'EducationalOccupationalCredential',
  name,
}));
const ldJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Björn Seiler',
  url: 'https://medimotive.de',
  jobTitle: 'Head of Quality and Regulatory Affairs',
  worksFor: { '@type': 'Organization', name: 'MediMotive' },
  hasCredential: credentials,
});
html = html.replace(
  /<script type="application\/ld\+json">\{[^<]*hasCredential[^<]*<\/script>/,
  `<script type="application/ld+json">${ldJson}</script>`
);

const metaDesc =
  'Formal credentials supporting MediMotive\'s manufacturing-quality evidence hub — audit, methods, quality management, regulatory affairs, and applied AI qualifications.';
html = html.replace(
  /<meta name="description" content="[^"]*" \/>/,
  `<meta name="description" content="${metaDesc}" />`
);
html = html.replace(
  /<meta property="og:description" content="[^"]*" \/>/,
  `<meta property="og:description" content="${metaDesc}" />`
);
html = html.replace(
  /<meta name="twitter:description" content="[^"]*" \/>/,
  `<meta name="twitter:description" content="${metaDesc}" />`
);

writeFileSync(htmlPath, html);
console.log(`Updated ${htmlPath} (${CERT_GROUPS.reduce((n, g) => n + g.certs.length, 0)} certificates)`);
