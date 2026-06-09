# MediMotive — Security Audit & Clean Code Implementation Brief
## For Cursor · Strict Line-by-Line Execution

---

## RULES BEFORE YOU START

1. **Do not change any visual output.** No layout, no copy, no colour, no animation.
2. **Do not refactor working logic.** Fix only what is listed below.
3. **Do not add new features.** Security hardening only.
4. **Work file by file in the order listed.** Complete each file fully before moving on.
5. **Do not touch node_modules, archive/, or .playwright-browsers/.**
6. **After every file change, verify the page still renders correctly in the browser.**

---

## PRIORITY 1 — vercel.json (HTTP Security Headers)

File: `vercel.json`

### Add these two headers to the existing `"source": "/(.*)"` header block:

**1. Strict-Transport-Security (HSTS)**
Forces HTTPS for all visitors. Add immediately after the existing Permissions-Policy entry:
```json
{
  "key": "Strict-Transport-Security",
  "value": "max-age=31536000; includeSubDomains; preload"
}
```

**2. Content-Security-Policy (CSP)**
Controls which resources the browser is allowed to load.
Add after HSTS:
```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; frame-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
}
```

**Why `unsafe-inline` for scripts and styles:**
The existing app.js uses inline canvas drawing, style property writes, and dynamic class toggling that depend on inline execution. Do NOT attempt to remove `unsafe-inline` without a full nonce/hash refactor — that is out of scope for this brief.

**Why `object-src 'none'` and `frame-src 'none'`:**
This site has no plugins, no iframes, and no embedded objects. Blocking these entirely eliminates clickjacking and plugin injection vectors not covered by X-Frame-Options alone.

**3. Add X-XSS-Protection for legacy browser support:**
```json
{
  "key": "X-XSS-Protection",
  "value": "1; mode=block"
}
```

**Final `"source": "/(.*)"` headers block should contain (in order):**
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security
- Content-Security-Policy
- X-XSS-Protection

---

## PRIORITY 2 — assets/app.js (innerHTML Replacement)

File: `assets/app.js`

There are 3 `innerHTML` assignments. All use static strings (no user data), so they are low XSS risk — but `innerHTML` is unsafe by pattern and should be replaced with safe DOM methods. Fix each one precisely.

---

### Fix 1 — Line 136 (mobile drawer chevron toggle)

**Current code:**
```js
toggle.innerHTML = '<span class="mobile-drawer__chevron" aria-hidden="true"></span>';
```

**Replace with:**
```js
const chevron = document.createElement('span');
chevron.className = 'mobile-drawer__chevron';
chevron.setAttribute('aria-hidden', 'true');
toggle.appendChild(chevron);
```

---

### Fix 2 — Line 2308 (certificate lightbox scaffold)

**Current code:**
```js
overlay.innerHTML = `
  <div class="cert-lightbox__nav" hidden>
    <button type="button" class="cert-lightbox__prev" aria-label="Previous image">‹</button>
    <button type="button" class="cert-lightbox__next" aria-label="Next image">›</button>
  </div>
  <div class="cert-lightbox__dialog">
    <button type="button" class="cert-lightbox__close" aria-label="Close image view">&times;</button>
    <div class="cert-lightbox__meta">
      <p class="cert-lightbox__title" id="cert-lightbox-title"></p>
      <p class="cert-lightbox__context" id="cert-lightbox-context" hidden></p>
      <p class="cert-lightbox__counter" id="cert-lightbox-counter" hidden></p>
    </div>
    <img class="cert-lightbox__img" id="cert-lightbox-img" alt="">
  </div>
`;
```

**Replace with a `<template>` element approach:**
Add this HTML template to the bottom of `certificates.html`, immediately before `</body>`:
```html
<template id="cert-lightbox-template">
  <div class="cert-lightbox__nav" hidden>
    <button type="button" class="cert-lightbox__prev" aria-label="Previous image">&#8249;</button>
    <button type="button" class="cert-lightbox__next" aria-label="Next image">&#8250;</button>
  </div>
  <div class="cert-lightbox__dialog">
    <button type="button" class="cert-lightbox__close" aria-label="Close image view">&times;</button>
    <div class="cert-lightbox__meta">
      <p class="cert-lightbox__title" id="cert-lightbox-title"></p>
      <p class="cert-lightbox__context" id="cert-lightbox-context" hidden></p>
      <p class="cert-lightbox__counter" id="cert-lightbox-counter" hidden></p>
    </div>
    <img class="cert-lightbox__img" id="cert-lightbox-img" alt="">
  </div>
</template>
```

Then in `app.js`, replace the `overlay.innerHTML = ...` block with:
```js
const tmpl = document.getElementById('cert-lightbox-template');
if (tmpl) {
  overlay.appendChild(tmpl.content.cloneNode(true));
}
```

**Important:** The lines immediately after the `overlay.innerHTML` block query child elements using `overlay.querySelector(...)`. These must remain unchanged — they will work correctly with the template approach since `cloneNode(true)` preserves all IDs and classes.

---

### Fix 3 — Line 3066 (scroll-to-top SVG button)

**Current code:**
```js
btn.innerHTML =
  '<svg class="scroll-to-top__icon" width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 5.5 4.5 11h11L10 5.5Z" fill="currentColor"/></svg>';
```

**Replace with:**
```js
const svgNs = 'http://www.w3.org/2000/svg';
const icon = document.createElementNS(svgNs, 'svg');
icon.setAttribute('class', 'scroll-to-top__icon');
icon.setAttribute('width', '16');
icon.setAttribute('height', '16');
icon.setAttribute('viewBox', '0 0 20 20');
icon.setAttribute('aria-hidden', 'true');
icon.setAttribute('focusable', 'false');
const path = document.createElementNS(svgNs, 'path');
path.setAttribute('d', 'M10 5.5 4.5 11h11L10 5.5Z');
path.setAttribute('fill', 'currentColor');
icon.appendChild(path);
btn.appendChild(icon);
```

---

## PRIORITY 3 — Remove Exposed Example File

**Action:** Delete `medimotive-all-in-one.example.html` from the project root.

This file is disallowed in `robots.txt` but remains publicly accessible at its direct URL. Robots disallow is not a security measure — any visitor who knows the URL can access it. The file contains the full site layout and may expose structural information.

After deleting the file, also remove the `Disallow` line from `robots.txt` since it no longer exists:

**Remove from robots.txt:**
```
Disallow: /medimotive-all-in-one.example.html
```

---

## PRIORITY 4 — Full HTML Audit (Every .html File in Root)

Run the following checks on every `.html` file in the project root. Files to audit:
`index.html`, `about.html`, `services.html`, `contact.html`, `imprint.html`, `privacy.html`, `case-studies.html`, `certificates.html`, `our-approach.html`, `work-journey.html`, `regions.html`, `gallery.html`, `rapid-response-troubleshooting.html`, `supplier-quality-complaint-management.html`, `ramp-up-process-stability.html`, `early-phase-risk-design-for-quality.html`, `qms-audit-regulatory-support.html`, `knowledge-gap-transition-security.html`

Also audit the German versions in `de/`.

### Check 1 — External links
Every `<a target="_blank">` must have `rel="noopener noreferrer"`.
Command to verify no violations remain:
```
grep -rn 'target="_blank"' *.html de/*.html | grep -v 'rel="noopener'
```
Expected output: nothing. If any results appear, add `rel="noopener noreferrer"` to that element.

### Check 2 — No javascript: URLs
```
grep -rn 'href="javascript:' *.html de/*.html
```
Expected output: nothing. Remove any found.

### Check 3 — No inline event handlers in HTML
```
grep -rn 'onclick=\|onload=\|onerror=\|onmouseover=' *.html de/*.html
```
Expected output: nothing. Move any found to app.js as proper addEventListener calls.

### Check 4 — No http:// in resource src attributes
```
grep -rn 'src="http://' *.html de/*.html
grep -rn 'href="http://' *.html de/*.html
```
Expected output: nothing. Upgrade any found to https:// or self-hosted paths.

### Check 5 — Charset on every page
```
grep -rL 'charset' *.html de/*.html
```
Expected output: nothing. Every page must have `<meta charset="utf-8" />`.

### Check 6 — Viewport meta on every page
```
grep -rL 'viewport' *.html de/*.html
```
Expected output: nothing. Every page must have `<meta name="viewport" content="width=device-width, initial-scale=1" />`.

### Check 7 — No exposed sensitive paths in HTML comments
```
grep -rn '<!--.*password\|<!--.*secret\|<!--.*token\|<!--.*api.key' *.html de/*.html -i
```
Expected output: nothing.

### Check 8 — JSON-LD script tags
Every `<script type="application/ld+json">` block must contain only hardcoded static data. Verify no variable interpolation or dynamic content is injected into any JSON-LD block. Visual inspection only — do not modify if clean.

---

## PRIORITY 5 — assets/styles.css

File: `assets/styles.css`

Run one check only:
```
grep -n 'expression(\|behavior:\|javascript:' assets/styles.css
```
Expected output: nothing. These are legacy IE injection vectors. Remove any found.

---

## PRIORITY 6 — robots.txt Final State

After removing the example file (Priority 3), `robots.txt` should read exactly:
```
User-agent: *
Allow: /

Sitemap: https://medimotive.de/sitemap.xml
```

No other changes to robots.txt.

---

## VERIFICATION CHECKLIST

Run these after all changes are complete:

- [ ] `vercel.json` — all 7 headers present in the `/(.*)`  block
- [ ] `app.js` — zero `innerHTML` assignments remain
- [ ] `medimotive-all-in-one.example.html` — deleted from root
- [ ] `robots.txt` — Disallow line removed
- [ ] All HTML files — zero `target="_blank"` without `rel="noopener noreferrer"`
- [ ] All HTML files — zero `javascript:` URLs
- [ ] All HTML files — zero inline event handlers
- [ ] All HTML files — zero `src="http://"` mixed-content references
- [ ] All pages load and render correctly in browser after changes
- [ ] Certificate lightbox still opens and closes correctly
- [ ] Mobile navigation drawer still opens and closes correctly
- [ ] Scroll-to-top button still appears and functions correctly

---

## DO NOT TOUCH

- Any content copy, headings, or paragraph text
- Any CSS visual rules or design tokens
- Any image files or font files
- Any canvas animation logic (wave, mesh, geometry functions)
- Any structured data (JSON-LD) unless a vulnerability is found in Check 8
- `sitemap.xml` — no changes needed
- `package.json`, `tailwind.config.js`, `postcss.config.js`
- The `de/` German pages — run the HTML audit checks only, do not edit content

---

*MediMotive Security Brief · F_MediMotive_2026*
*Pre-audit state: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy already in place.*
*This brief adds: CSP, HSTS, X-XSS-Protection, innerHTML elimination, example file removal, full HTML audit.*
