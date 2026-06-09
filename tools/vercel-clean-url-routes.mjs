import path from 'node:path';

/** Expertise detail pages — public URL under /services/{slug}, files at repo root. */
export const EXPERTISE_SLUGS = [
  'rapid-response-troubleshooting',
  'supplier-quality-complaint-management',
  'ramp-up-process-stability',
  'early-phase-risk-control-design-for-quality',
  'qms-audit-regulatory-support',
  'knowledge-gap-transition-security',
];

/** Top-level slugs served as *.html at repo root (excludes expertise — nested under /services). */
export const CLEAN_URL_SLUGS = [
  'services',
  'case-studies',
  'case-coated-aluminum-parts',
  'case-production-ramp-up',
  'about',
  'contact',
  'certificates',
  'work-journey',
  'our-approach',
  'gallery',
  'regions',
  'imprint',
  'privacy',
];

/** All routable slugs (flat + expertise) for link migration. */
export const ALL_PAGE_SLUGS = [...CLEAN_URL_SLUGS, ...EXPERTISE_SLUGS];

export function publicPathForHtmlRoute(route) {
  if (route === 'index.html') return '/';
  const slug = route.replace(/\.html$/, '');
  if (EXPERTISE_SLUGS.includes(slug)) return `/services/${slug}`;
  return `/${slug}`;
}

export function canonicalForHtmlRoute(route, site = 'https://medimotive.de') {
  const path = publicPathForHtmlRoute(route);
  return path === '/' ? `${site}/` : `${site}${path}`;
}

export function buildCleanUrlRewrites() {
  const flat = CLEAN_URL_SLUGS.map((slug) => ({
    source: `/${slug}`,
    destination: `/${slug}.html`,
  }));
  const nestedExpertise = EXPERTISE_SLUGS.map((slug) => ({
    source: `/services/${slug}`,
    destination: `/${slug}.html`,
  }));
  return [...flat, ...nestedExpertise];
}

/** 301 flat expertise URLs → nested /services/{slug} */
export function buildExpertiseFlatRedirects() {
  return EXPERTISE_SLUGS.map((slug) => ({
    source: `/${slug}`,
    destination: `/services/${slug}`,
    permanent: true,
  }));
}

/** Browser requests /services/assets/* when HTML uses relative assets/ on nested URLs. */
export function buildServicesAssetsRewrite() {
  return {
    source: '/services/assets/:path*',
    destination: '/assets/:path*',
  };
}

/** Vercel rewrites for German locale under /de/ */
export function buildDeCleanUrlRewrites() {
  const deHome = { source: '/de', destination: '/de/index.html' };
  const deServices = { source: '/de/services', destination: '/de/services.html' };
  const deFlat = CLEAN_URL_SLUGS.map((slug) => ({
    source: `/de/${slug}`,
    destination: `/de/${slug}.html`,
  }));
  const deNestedExpertise = EXPERTISE_SLUGS.map((slug) => ({
    source: `/de/services/${slug}`,
    destination: `/de/services/${slug}.html`,
  }));
  const deServicesAssets = {
    source: '/de/services/assets/:path*',
    destination: '/assets/:path*',
  };
  return [deHome, deServices, ...deFlat, ...deNestedExpertise, deServicesAssets];
}

function resolveDeUrl(trimmed) {
  if (trimmed === 'de') return 'de/index.html';

  const deMatch = trimmed.match(/^de\/(.+)$/);
  if (!deMatch) return null;

  const deRest = deMatch[1];

  const deServicesAssets = deRest.match(/^services\/assets\/(.+)$/);
  if (deServicesAssets) return `assets/${deServicesAssets[1]}`;

  const deNestedExpertise = deRest.match(/^services\/([a-z0-9-]+)$/);
  if (deNestedExpertise && EXPERTISE_SLUGS.includes(deNestedExpertise[1])) {
    return `de/services/${deNestedExpertise[1]}.html`;
  }

  if (deRest === 'services') return 'de/services.html';

  if (CLEAN_URL_SLUGS.includes(deRest)) return `de/${deRest}.html`;

  if (path.extname(deRest)) return `de/${deRest}`;
  return `de/${deRest}.html`;
}

/**
 * Map public URL path → repo-relative HTML/asset file (for local dev).
 * Returns string path, { redirect }, or null if unknown.
 */
export function resolveUrlToRootFile(pathname) {
  let pathOnly = pathname.split('?')[0].split('#')[0];
  if (pathOnly.endsWith('/')) pathOnly = pathOnly.replace(/\/+$/, '') || '/';
  const trimmed = pathOnly.replace(/^\/+/, '');

  if (!trimmed) return 'index.html';

  const deFile = resolveDeUrl(trimmed);
  if (deFile) return deFile;

  const servicesAssets = trimmed.match(/^services\/assets\/(.+)$/);
  if (servicesAssets) return `assets/${servicesAssets[1]}`;

  const nestedExpertise = trimmed.match(/^services\/([a-z0-9-]+)$/);
  if (nestedExpertise && EXPERTISE_SLUGS.includes(nestedExpertise[1])) {
    return `${nestedExpertise[1]}.html`;
  }

  if (trimmed === 'services') return 'services.html';

  const slug = trimmed;
  if (CLEAN_URL_SLUGS.includes(slug) || EXPERTISE_SLUGS.includes(slug)) {
    return `${slug}.html`;
  }

  if (path.extname(trimmed)) return trimmed;
  return `${trimmed}.html`;
}
