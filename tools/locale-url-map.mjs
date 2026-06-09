/**
 * EN ↔ DE public path pairs. DE URLs use translated German slugs under /de/.
 */
export const LOCALE_PAIRS = {
  'index.html': {
    enPath: '/',
    dePath: '/de/',
    deFile: 'de/index.html',
    legacyDePath: null,
  },
  'about.html': {
    enPath: '/about',
    dePath: '/de/ueber-uns',
    deFile: 'de/about.html',
    legacyDePath: '/de/about',
  },
  'services.html': {
    enPath: '/services',
    dePath: '/de/leistungen',
    deFile: 'de/services.html',
    legacyDePath: '/de/services',
  },
  'our-approach.html': {
    enPath: '/our-approach',
    dePath: '/de/unser-ansatz',
    deFile: 'de/our-approach.html',
    legacyDePath: '/de/our-approach',
  },
  'case-studies.html': {
    enPath: '/case-studies',
    dePath: '/de/referenzprojekte',
    deFile: 'de/case-studies.html',
    legacyDePath: '/de/case-studies',
  },
  'case-coated-aluminum-parts.html': {
    enPath: '/case-coated-aluminum-parts',
    dePath: '/de/referenzprojekte/beschichtung-aluminiumteile',
    deFile: 'de/case-coated-aluminum-parts.html',
    legacyDePath: '/de/case-coated-aluminum-parts',
  },
  'case-production-ramp-up.html': {
    enPath: '/case-production-ramp-up',
    dePath: '/de/referenzprojekte/produktionshochlauf',
    deFile: 'de/case-production-ramp-up.html',
    legacyDePath: '/de/case-production-ramp-up',
  },
  'certificates.html': {
    enPath: '/certificates',
    dePath: '/de/zertifikate',
    deFile: 'de/certificates.html',
    legacyDePath: '/de/certificates',
  },
  'regions.html': {
    enPath: '/regions',
    dePath: '/de/regionen',
    deFile: 'de/regions.html',
    legacyDePath: '/de/regions',
  },
  'contact.html': {
    enPath: '/contact',
    dePath: '/de/kontakt',
    deFile: 'de/contact.html',
    legacyDePath: '/de/contact',
  },
  'imprint.html': {
    enPath: '/imprint',
    dePath: '/de/impressum',
    deFile: 'de/imprint.html',
    legacyDePath: '/de/imprint',
  },
  'privacy.html': {
    enPath: '/privacy',
    dePath: '/de/datenschutz',
    deFile: 'de/privacy.html',
    legacyDePath: '/de/privacy',
  },
  'work-journey.html': {
    enPath: '/work-journey',
    dePath: '/de/berufsweg',
    deFile: 'de/work-journey.html',
    legacyDePath: '/de/work-journey',
  },
  'gallery.html': {
    enPath: '/gallery',
    dePath: '/de/galerie',
    deFile: 'de/gallery.html',
    legacyDePath: '/de/gallery',
  },
  'rapid-response-troubleshooting.html': {
    enPath: '/services/rapid-response-troubleshooting',
    dePath: '/de/leistungen/schnelle-fehleranalyse',
    deFile: 'de/services/rapid-response-troubleshooting.html',
    legacyDePath: '/de/services/rapid-response-troubleshooting',
  },
  'supplier-quality-complaint-management.html': {
    enPath: '/services/supplier-quality-complaint-management',
    dePath: '/de/leistungen/lieferantenqualitaet-reklamationsmanagement',
    deFile: 'de/services/supplier-quality-complaint-management.html',
    legacyDePath: '/de/services/supplier-quality-complaint-management',
  },
  'ramp-up-process-stability.html': {
    enPath: '/services/ramp-up-process-stability',
    dePath: '/de/leistungen/hochlauf-prozessstabilitaet',
    deFile: 'de/services/ramp-up-process-stability.html',
    legacyDePath: '/de/services/ramp-up-process-stability',
  },
  'early-phase-risk-control-design-for-quality.html': {
    enPath: '/services/early-phase-risk-control-design-for-quality',
    dePath: '/de/leistungen/fruehphasen-risikosteuerung-design-for-quality',
    deFile: 'de/services/early-phase-risk-control-design-for-quality.html',
    legacyDePath: '/de/services/early-phase-risk-control-design-for-quality',
  },
  'qms-audit-regulatory-support.html': {
    enPath: '/services/qms-audit-regulatory-support',
    dePath: '/de/leistungen/qms-audit-regulatorische-unterstuetzung',
    deFile: 'de/services/qms-audit-regulatory-support.html',
    legacyDePath: '/de/services/qms-audit-regulatory-support',
  },
  'knowledge-gap-transition-security.html': {
    enPath: '/services/knowledge-gap-transition-security',
    dePath: '/de/leistungen/wissensluecken-uebergangssicherheit',
    deFile: 'de/services/knowledge-gap-transition-security.html',
    legacyDePath: '/de/services/knowledge-gap-transition-security',
  },
};

/** Ordered DE route table for Vercel rewrites (specific paths before parents). */
export function buildDeRouteTable() {
  return Object.values(LOCALE_PAIRS)
    .filter((p) => p.dePath !== '/de/')
    .map((p) => ({
      source: p.dePath.replace(/^\//, ''),
      destination: `/${p.deFile}`,
      legacyDePath: p.legacyDePath,
      deFile: p.deFile,
    }))
    .sort((a, b) => b.source.length - a.source.length);
}

/** de/*.html relative path → LOCALE_PAIRS key */
export function deFileToEnKey(deRelPath) {
  const normalized = deRelPath.replace(/\\/g, '/');
  const entry = Object.entries(LOCALE_PAIRS).find(([, p]) => p.deFile === normalized);
  return entry ? entry[0] : null;
}

export function enPathForDeFile(deRelPath) {
  const key = deFileToEnKey(deRelPath);
  return key ? LOCALE_PAIRS[key].enPath : null;
}

export function dePathForEnFile(enFilename) {
  return LOCALE_PAIRS[enFilename]?.dePath ?? null;
}

export function enPathForEnFile(enFilename) {
  return LOCALE_PAIRS[enFilename]?.enPath ?? null;
}

export function deCanonicalForEnFile(enFilename, site = 'https://medimotive.de') {
  const dePath = dePathForEnFile(enFilename);
  if (!dePath) return null;
  return dePath === '/de/' ? `${site}/de/` : `${site}${dePath}`;
}

/** Longest-first replacements: legacy English /de/… → German slug paths. */
export function buildDeLinkReplacements() {
  return Object.values(LOCALE_PAIRS)
    .filter((p) => p.legacyDePath)
    .map((p) => ({ from: p.legacyDePath, to: p.dePath }))
    .sort((a, b) => b.from.length - a.from.length);
}
