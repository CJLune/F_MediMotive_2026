#!/usr/bin/env node
/**
 * Build de/work-journey.html from work-journey.html (German mirror, /de/ paths).
 * Run: node tools/build-de-work-journey.mjs
 */
import fs from 'fs';
import path from 'path';
import { LOCALE_PAIRS, deCanonicalForEnFile, buildDeLinkReplacements } from './locale-url-map.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = 'https://medimotive.de';
const SRC = path.join(ROOT, 'work-journey.html');
const OUT = path.join(ROOT, 'de', 'work-journey.html');

const TEXT = [
  ['Skip to main content', 'Zum Hauptinhalt springen'],
  ['aria-label="MediMotive home"', 'aria-label="MediMotive Startseite"'],
  ['aria-label="Main navigation"', 'aria-label="Hauptnavigation"'],
  ['Expertise', 'Leistungen'],
  ['aria-label="Expertise areas"', 'aria-label="Leistungsbereiche"'],
  ['Rapid Response Troubleshooting', 'Schnelle Fehleranalyse'],
  ['Supplier Quality &amp; Complaint Management', 'Lieferantenqualität &amp; Reklamationsmanagement'],
  ['Ramp-Up &amp; Process Stability', 'Hochlauf &amp; Prozessstabilität'],
  ['Early-Phase Risk Control &amp; Design-for-Quality', 'Frühphasen-Risikosteuerung &amp; Design-for-Quality'],
  ['QMS, Audit &amp; Regulatory Support', 'QMS, Audit &amp; Regulatorische Unterstützung'],
  ['Knowledge Gap &amp; Transition Security', 'Wissenslücken &amp; Übergangssicherheit'],
  ['aria-label="View all expertise areas"', 'aria-label="Alle Leistungsbereiche anzeigen"'],
  ['View all expertise areas', 'Alle Leistungsbereiche anzeigen'],
  ['Case Studies', 'Referenzprojekte'],
  ['About', 'Über uns'],
  ['Contact', 'Kontakt'],
  ['aria-label="Language"', 'aria-label="Sprachauswahl"'],
  ['aria-label="Open navigation menu"', 'aria-label="Navigationsmenü öffnen"'],
  ['Rapid Response', 'Fehleranalyse'],
  ['Supplier Quality', 'Lieferantenqualität'],
  ['Ramp-Up &amp; Stability', 'Hochlauf &amp; Stabilität'],
  ['Risk Control', 'Risikosteuerung'],
  ['QMS &amp; Audit', 'QMS &amp; Audit'],
  ['Knowledge Gap', 'Wissenslücken'],
  ['aria-label="Breadcrumb"', 'aria-label="Brotkrümelnavigation"'],
  ['Work journey', 'Berufsweg'],
  ['Visual proof', 'Visueller Nachweis'],
  [
    'MediMotive Work Contexts — Manufacturing, Supplier, Regulated',
    'MediMotive Arbeitskontexte — Fertigung, Lieferanten, Reguliert',
  ],
  [
    'Professional contexts where quality, supplier work, audits, and management decisions come together. Not marketing imagery — evidence of where MediMotive’s experience was built.',
    'Professionelle Kontexte, in denen Qualität, Lieferantenarbeit, Audits und Managemententscheidungen zusammenkommen. Keine Marketingbilder — Belege dafür, wo die Erfahrung von MediMotive entstanden ist.',
  ],
  [
    'Images show real shop-floor, supplier, regulated, and international environments. Anonymised where needed. Verified outcomes remain in case studies and formal credentials.',
    'Die Bilder zeigen echte Shopfloor-, Lieferanten-, Regulierungs- und internationale Umgebungen. Anonymisiert, wo erforderlich. Verifizierte Ergebnisse finden Sie in den Referenzprojekten und formalen Qualifikationen.',
  ],
  ['View case studies', 'Referenzprojekte ansehen'],
  ['View certificates', 'Zertifikate ansehen'],
  ['aria-label="Proof links"', 'aria-label="Nachweislinks"'],
  ['About MediMotive', 'Über MediMotive'],
  ['Regional context', 'Regionaler Kontext'],
  ['Our Approach', 'Unser Ansatz'],
  ['aria-label="Manufacturing and quality work context"', 'aria-label="Fertigungs- und Qualitätsarbeitskontext"'],
  [
    'Anonymised manufacturing and quality work context in production environments',
    'Anonymisierter Fertigungs- und Qualitätsarbeitskontext in Produktionsumgebungen',
  ],
  [
    'Real production, supplier, audit, and travel contexts — anonymised where needed.',
    'Echte Produktions-, Lieferanten-, Audit- und Reisekontexte — anonymisiert, wo erforderlich.',
  ],
  ['aria-label="Image use and confidentiality"', 'aria-label="Bildnutzung und Vertraulichkeit"'],
  [
    '<strong>Context, not claims.</strong> No customer logos, confidential drawings, or identifiable production details. This gallery supports credibility — verified project outcomes are in the <a class="link" href="/case-studies" data-track="journey_ethics_cases">case studies</a>.',
    '<strong>Kontext, keine Behauptungen.</strong> Keine Kundenlogos, vertrauliche Zeichnungen oder identifizierbare Produktionsdetails. Diese Galerie unterstützt die Glaubwürdigkeit — verifizierte Projektergebnisse finden Sie in den <a class="link" href="/de/referenzprojekte" data-track="journey_ethics_cases">Referenzprojekten</a>.',
  ],
  ['aria-label="Gallery sections"', 'aria-label="Galerieabschnitte"'],
  ['aria-label="Visual proof contexts"', 'aria-label="Visuelle Nachweiskontexte"'],
  ['Shop-floor', 'Shopfloor'],
  ['Interfaces', 'Schnittstellen'],
  ['Regulated', 'Reguliert'],
  ['International', 'International'],
  ["Int'l shop-floor", 'Intl. Shopfloor'],
  ['Travel', 'Reise'],
  ['Work contexts', 'Arbeitskontexte'],
  ['Evidence dossier', 'Nachweisdossier'],
  [
    'The work behind MediMotive was built in real manufacturing environments. Machines, assembly areas, supplier discussions, audits, and management conversations where technical facts had to become decisions.',
    'Die Arbeit hinter MediMotive entstand in echten Fertigungsumgebungen. Maschinen, Montagebereiche, Lieferantengespräche, Audits und Managementgespräche, in denen technische Fakten zu Entscheidungen werden mussten.',
  ],
  [
    'Select any image to open the evidence viewer. Verified project outcomes remain in the <a class="link" href="/case-studies" data-track="journey_gallery_cases">case studies</a>.',
    'Wählen Sie ein Bild, um den Nachweis-Viewer zu öffnen. Verifizierte Projektergebnisse finden Sie in den <a class="link" href="/de/referenzprojekte" data-track="journey_gallery_cases">Referenzprojekten</a>.',
  ],
  ['Shop-floor · Anonymised', 'Shopfloor · Anonymisiert'],
  ['Electronics at source', 'Elektronik an der Quelle'],
  [
    'Printed circuit board detail in electronics manufacturing',
    'Leiterplattendetail in der Elektronikfertigung',
  ],
  [
    'Where component-level detail, process behaviour, and bench discipline are understood before issues propagate into production, supplier, or audit pressure.',
    'Wo Komponentendetails, Prozessverhalten und Werkbankdisziplin verstanden werden, bevor Probleme in Produktion, Lieferantendruck oder Auditstress eskalieren.',
  ],
  ['Related expertise: Rapid Response →', 'Zugehörige Leistung: Schnelle Fehleranalyse →'],
  ['Verified outcomes → Case studies', 'Verifizierte Ergebnisse → Referenzprojekte'],
  ['Shop-floor foundation', 'Shopfloor-Grundlage'],
  [
    'Shop-floor press and stamping tooling in manufacturing',
    'Presswerkzeug und Stanzwerkzeug auf dem Shopfloor in der Fertigung',
  ],
  [
    'Where defects, variation, and process behaviour are first understood — at the machine, bench, or assembly station.',
    'Wo Fehler, Variation und Prozessverhalten zuerst verstanden werden — an Maschine, Werkbank oder Montagestation.',
  ],
  ['Related expertise →', 'Zugehörige Leistung →'],
  ['Supplier and customer bridge', 'Lieferanten- und Kundenbrücke'],
  [
    'Supplier and customer quality context in manufacturing',
    'Lieferanten- und Kundenqualitätskontext in der Fertigung',
  ],
  [
    'Translation between R&amp;D, procurement, supplier, quality, and customer expectations.',
    'Übersetzung zwischen F&amp;E, Einkauf, Lieferant, Qualität und Kundenerwartungen.',
  ],
  ['Regulated manufacturing', 'Regulierte Fertigung'],
  [
    'Regulated automotive and medical-device manufacturing context',
    'Regulierter Automotive- und Medizinprodukte-Fertigungskontext',
  ],
  [
    'Automotive and medical-device environments where quality systems must work in production and under audit pressure.',
    'Automotive- und Medizinprodukte-Umgebungen, in denen Qualitätssysteme in Produktion und unter Auditdruck funktionieren müssen.',
  ],
  ['International work context', 'Internationaler Arbeitskontext'],
  [
    'Shop-floor production and packaging work in an international manufacturing environment',
    'Shopfloor-Produktion und Verpackungsarbeit in einem internationalen Fertigungsumfeld',
  ],
  [
    'Supplier and customer work across Germany, the USA, Taiwan, and China — where intercultural competence and experience matters as much as technical understanding.',
    'Lieferanten- und Kundenarbeit in Deutschland, den USA, Taiwan und China — wo interkulturelle Kompetenz und Erfahrung genauso wichtig sind wie technisches Verständnis.',
  ],
  ['Regional context →', 'Regionaler Kontext →'],
  ['International shop-floor', 'Internationaler Shopfloor'],
  ['International production environment', 'Internationale Produktionsumgebung'],
  [
    'Large-scale injection moulding machine on a manufacturing shop floor',
    'Großformatige Spritzgussmaschine auf einem Fertigungsshopfloor',
  ],
  [
    'On-site work where machines, material flow, and shop-floor behaviour have to be read before quality issues escalate across the supply chain.',
    'Vor-Ort-Arbeit, bei der Maschinen, Materialfluss und Shopfloor-Verhalten gelesen werden müssen, bevor Qualitätsprobleme in der Lieferkette eskalieren.',
  ],
  ['Travel context', 'Reisekontext'],
  ['International on-site context', 'Internationaler Vor-Ort-Kontext'],
  [
    'On-site international supplier and customer context during manufacturing quality work',
    'Internationaler Vor-Ort-Lieferanten- und Kundenkontext bei Fertigungsqualitätsarbeit',
  ],
  [
    'Supplier and customer work across borders often happens in everyday on-site settings — where language, expectations, and technical detail have to align before quality issues escalate.',
    'Lieferanten- und Kundenarbeit über Grenzen hinweg findet oft in alltäglichen Vor-Ort-Situationen statt — wo Sprache, Erwartungen und technische Details zusammenpassen müssen, bevor Qualitätsprobleme eskalieren.',
  ],
  ['Proof and next steps', 'Nachweis und nächste Schritte'],
  [
    'Visual proof shows where experience was built. Verified outcomes and formal credentials complete the picture.',
    'Visueller Nachweis zeigt, wo Erfahrung aufgebaut wurde. Verifizierte Ergebnisse und formale Qualifikationen vervollständigen das Bild.',
  ],
  ['Contact MediMotive', 'MediMotive kontaktieren'],
  ['Expertise areas', 'Leistungsbereiche'],
  ['aria-label="About Björn Seiler, founder of MediMotive"', 'aria-label="Über Björn Seiler, Gründer von MediMotive"'],
  ['Founder · MediMotive', 'Gründer · MediMotive'],
  [
    'Quality issues rarely have one single origin. MediMotive analyzes the actual root causes — in production, at the interfaces, and across quality and regulatory systems—and addresses it with efficient and practical solutions.',
    'Qualitätsprobleme haben selten nur eine Ursache. MediMotive analysiert die tatsächlichen Fehlerursachen — in der Produktion, an den Schnittstellen und über Qualitäts- und Regulierungssysteme hinweg — und adressiert sie mit effizienten, praktischen Lösungen.',
  ],
  ['Proof', 'Nachweise'],
  ['Visual proof', 'Visueller Nachweis'],
  ['Professional contact', 'Professioneller Kontakt'],
  ['All rights reserved.', 'Alle Rechte vorbehalten.'],
  ['Imprint', 'Impressum'],
  ['Privacy', 'Datenschutz'],
];

function prefixDeInternalLinks(html) {
  return html.replace(/href="(\/[^"]*)"/g, (match, p) => {
    if (
      p.startsWith('/assets/') ||
      p.startsWith('/de/') ||
      p.startsWith('//') ||
      p === '/' ||
      p.startsWith('/medimotive-favicon') ||
      p.startsWith('/apple-touch-icon')
    ) {
      return match;
    }
    return `href="/de${p}"`;
  });
}

function buildSeoBlock() {
  const title = 'Berufsweg | MediMotive Fertigungskontexte';
  const desc =
    'Shopfloor- und Lieferanten-Arbeitsfotos von MediMotive: regulierte Fertigung und internationale Qualitätskontexte, anonymisiert wo erforderlich.';
  const canonical = `${SITE}/de/work-journey`;
  return `<!-- seo:canonical-og -->
  <link rel="shortcut icon" href="/medimotive-favicon.ico?v=20260603" />
  <link rel="icon" href="/medimotive-favicon.ico?v=20260603" sizes="32x32" />
  <link rel="icon" href="/assets/favicon.svg?v=20260603" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=20260603" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="de" href="${canonical}" />
  <link rel="alternate" hreflang="en" href="${SITE}/work-journey" />
  <link rel="alternate" hreflang="x-default" href="${SITE}/work-journey" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="MediMotive" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE}/assets/images/og-medimotive.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="MediMotive — praktische Fertigungsqualität als Nachweis" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="${SITE}/assets/images/og-medimotive.jpg" />
<!-- /seo:canonical-og -->`;
}

let html = fs.readFileSync(SRC, 'utf8');
html = html.replace(/lang="en"/, 'lang="de"');
html = html.replace(
  /<title>[^<]*<\/title>/,
  '<title>Berufsweg | MediMotive Fertigungskontexte</title>',
);
html = html.replace(
  /<meta name="description" content="[^"]*" \/>/,
  '<meta name="description" content="Shopfloor- und Lieferanten-Arbeitsfotos von MediMotive: regulierte Fertigung und internationale Qualitätskontexte, anonymisiert wo erforderlich." />',
);
html = html.replace(/<!-- seo:canonical-og -->[\s\S]*?<!-- \/seo:canonical-og -->/, buildSeoBlock());
html = html.replace(
  /"name":"Work journey"/g,
  '"name":"Berufsweg"',
);
html = html.replace(
  /"name":"About"/g,
  '"name":"Über uns"',
);
html = html.replace(/https:\/\/medimotive\.de\/about/g, deCanonicalForEnFile('about.html', SITE));
html = html.replace(
  /https:\/\/medimotive\.de\/work-journey/g,
  deCanonicalForEnFile('work-journey.html', SITE),
);

for (const { from, to } of buildDeLinkReplacements()) {
  html = html.split(`href="${from}`).join(`href="${to}`);
  html = html.split(`${SITE}${from}`).join(to === '/de/' ? `${SITE}/de/` : `${SITE}${to}`);
}
html = html.replace(
  /MediMotive Work Contexts — Manufacturing, Supplier, Regulated/g,
  'MediMotive Arbeitskontexte — Fertigung, Lieferanten, Reguliert',
);

for (const [from, to] of TEXT) {
  html = html.split(from).join(to);
}

html = prefixDeInternalLinks(html);

html = html.replace(
  /<div class="nav-lang" role="navigation" aria-label="Sprachauswahl">\s*<span class="nav-lang__item nav-lang__item--active" aria-current="true">EN<\/span>\s*<span class="nav-lang__sep" aria-hidden="true">\/<\/span>\s*<a class="nav-lang__item" href="[^"]*" hreflang="de" lang="de">DE<\/a>/,
  `<div class="nav-lang" role="navigation" aria-label="Sprachauswahl">
      <a class="nav-lang__item" href="/work-journey" hreflang="en" lang="en">EN</a>
      <span class="nav-lang__sep" aria-hidden="true">/</span>
      <span class="nav-lang__item nav-lang__item--active" aria-current="true">DE</span>`,
);

html = html.replace(/href="\/de\/"/g, 'href="/de/"');

html = html.replace(
  /<link rel="alternate" hreflang="en" href="https:\/\/medimotive\.de\/de\/work-journey" \/>/,
  `<link rel="alternate" hreflang="en" href="${SITE}/work-journey" />`,
);
html = html.replace(
  /<link rel="alternate" hreflang="x-default" href="https:\/\/medimotive\.de\/de\/work-journey" \/>/,
  `<link rel="alternate" hreflang="x-default" href="${SITE}/work-journey" />`,
);

fs.writeFileSync(OUT, html);
console.log(`Wrote ${path.relative(ROOT, OUT)}`);
