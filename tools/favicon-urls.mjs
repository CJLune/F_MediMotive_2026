/** Bump when replacing favicon assets (cache-bust for browsers that cached WordPress icon). */
export const FAVICON_CACHE_VERSION = '20260603';

export const FAVICON_ICO = `/medimotive-favicon.ico?v=${FAVICON_CACHE_VERSION}`;
export const FAVICON_SVG = `/assets/favicon.svg?v=${FAVICON_CACHE_VERSION}`;
export const APPLE_TOUCH_ICON = `/apple-touch-icon.png?v=${FAVICON_CACHE_VERSION}`;

export function buildFaviconLinkTags() {
  return `  <link rel="shortcut icon" href="${FAVICON_ICO}" />
  <link rel="icon" href="${FAVICON_ICO}" sizes="32x32" />
  <link rel="icon" href="${FAVICON_SVG}" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="${APPLE_TOUCH_ICON}" />`;
}
