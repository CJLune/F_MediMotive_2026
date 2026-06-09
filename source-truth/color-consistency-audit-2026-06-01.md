# Color consistency audit — MediMotive (root pages)

**Date:** 2026-06-01  
**Scope:** All 21 root `.html` pages (excludes `archive/`, `medimotive-all-in-one.example.html` bundle)  
**CSS chain:** `assets/styles.css` ← `input.css` imports legacy + redesign + page upgrades  
**Excluded from changes:** `.footer-founder-portrait` frame colors (white ring, `var(--brand-primary)` border, hover glow) — locked per client request.

---

## Canonical palette (`:root`)

| Token | Hex | Role |
|-------|-----|------|
| `--brand-dark` | `#1c2e4a` | Headings on light, footer background |
| `--brand-slate` | `#486966` | Header bar, theme-color meta, scroll-to-top |
| `--brand-primary` | `#027343` | CTAs, links, accents |
| `--brand-primary-hover` | `#025f3a` | Primary hover |
| `--brand-light` | `#f0fdf4` | Quote cards, soft fills |
| `--surface-off` | `#f8fafc` | `.section.alt` bands |
| `--compare-surface` | `#f0f4f8` | Homepage compare blocks |
| `--text` / `--text-secondary` / `--text-emphasis` | slate grays | Body copy |
| `--line` | `#c5ced6` | Borders |
| `--white` | `#fff` | Page canvas, cards |

**Rule:** New work should use tokens. Literal hex duplicates the same values but breaks findability and theming.

---

## Sitewide — consistent

| Element | Color source | All root pages? |
|---------|--------------|-----------------|
| `<meta name="theme-color">` | `#486966` (= `--brand-slate`) | Yes — 21/21 |
| `body` background | `var(--white)` | Yes |
| `.site-header` | `var(--brand-slate)` | Yes (shared partial) |
| `.footer` | `var(--brand-dark)` | Yes |
| `.btn-primary` | `var(--brand-primary)` | Yes |
| `.link` | `var(--brand-primary)` | Yes |
| `.section.alt` | `var(--surface-off)` | Where class used |
| Stylesheet | `assets/styles.css` only | Yes (no per-page CSS file) |

---

## Sitewide — inconsistencies (CSS)

| Issue | Where | Drift | Severity |
|-------|-------|-------|----------|
| Literal `#fff` vs `var(--white)` | legacy `.card`, `.btn-secondary`, `.about-anchor-links a` | Same color, mixed syntax | Low |
| Brand gradient `linear-gradient(90deg, #027343, #486966)` | redesign, expertise-upgrade, case-studies-upgrade, our-approach-upgrade | Should use `var(--brand-primary)`, `var(--brand-slate)` | Low |
| `#f0fdf4` in `color-mix()` | expertise-upgrade, redesign regions | Should use `var(--brand-light)` | Low |
| Scroll-to-top `#486966` / hover `#3f5d5a` | `styles.redesign.css` | Values match slate; not tokenized | Low |
| Shadow rgba `(15, 23, 42, …)` | `expertise-detail.css` | Tailwind slate vs brand-dark `(28, 46, 74)` | Low |
| Glass panels `rgba(255,255,255,0.72)` | about-founder quote, expertise bento | Intentional; not in token set | Info |
| **Footer founder frame** | `.footer-founder-portrait` | `#fff` padding ring + `--brand-primary` border | **Locked — do not change** |
| Mobile footer override | `styles.redesign.css` ≤640px | `border-color: #fff` on portrait | **Locked — part of frame treatment** |

---

## Per-page audit (root HTML)

### Page shell

| Page | `body` class | Scoped CSS file | theme-color | Notes |
|------|--------------|-----------------|-------------|-------|
| `index.html` | *(none)* | — | `#486966` | Uses `.home-main`; compare surfaces use `--compare-surface` |
| `about.html` | `about-page` | `styles.redesign.css` | OK | Philosophy proof CTAs: `btn-secondary` + `brand-light` override |
| `services.html` | `services-page` | `expertise-upgrade.css` | OK | Mid CTAs: `btn-secondary` + `.link` (not white chips) |
| `our-approach.html` | `our-approach-page` | `our-approach-upgrade.css` | OK | Many literal hex in upgrade file |
| `regions.html` | `regions-page` | `regions-upgrade.css` | OK | |
| `work-journey.html` | `work-journey-page` | `work-journey-upgrade.css` | OK | |
| `case-studies.html` | `case-studies-page` | `case-studies-upgrade.css` | OK | |
| `case-coated-aluminum-parts.html` | `case-studies-page` | case-studies-upgrade | OK | Shares case detail tokens |
| `case-production-ramp-up.html` | `case-studies-page` | case-studies-upgrade | OK | |
| `certificates.html` | `certificates-page` | redesign | OK | |
| `gallery.html` | `gallery-page` | redesign | OK | |
| `contact.html` | `contact-page` | redesign | OK | |
| `rapid-response-troubleshooting.html` | `expertise-detail-page` | `expertise-detail.css` | OK | `ed-hero` gradients |
| `supplier-quality-complaint-management.html` | `expertise-detail-page` | expertise-detail | OK | |
| `ramp-up-process-stability.html` | `expertise-detail-page` | expertise-detail | OK | |
| `early-phase-risk-design-for-quality.html` | `expertise-detail-page` | expertise-detail | OK | |
| `qms-audit-regulatory-support.html` | `expertise-detail-page` | expertise-detail | OK | |
| `knowledge-gap-transition-security.html` | `expertise-detail-page` | expertise-detail | OK | |
| `privacy.html` | *(none)* | — | OK | Generic `.page-hero`; no page scope |
| `imprint.html` | *(none)* | — | OK | Same as privacy |

**Body class gap:** `index.html`, `privacy.html`, `imprint.html` have no page class — only affects scoped overrides, not base colors.

---

## Per-page — section & CTA colors

| Page | Hero / main surface | Alt sections | Primary CTA | Secondary / proof |
|------|---------------------|--------------|-------------|-------------------|
| Index | white + compare `#f0f4f8` | `.section.alt` off-white | `.btn-primary` green | `.btn-tertiary` text green |
| About | editorial hero white panel | philosophy `alt` + quote `brand-light` | hero primary | philosophy `btn-secondary` on `brand-light` |
| Services | expertise hub gradient scrim | bento white cards | hub CTAs | connect: `btn-secondary` + `.link` |
| Expertise ×6 | `ed-hero` white/surface gradient | FAQ `surface-off` | `.btn-primary` | `.btn-tertiary` |
| Case hub/detail | evidence hero network | proof bands | primary | secondary |
| Regions | regions hero upgrade | alt blocks | primary | secondary |
| Our approach | octagon hero dark gradient | mixed | primary | link |
| Contact | contact hero | form white | primary | — |
| Legal | narrow hero white | prose white | — | — |

No page uses a conflicting primary green or header slate — **brand hues are consistent**.

---

## Footer (every page) — line audit

| Sub-element | Colors | Consistent? |
|-------------|--------|-------------|
| `.footer` bg | `var(--brand-dark)` | Yes |
| Column headings | light / on-dark tokens | Yes |
| Links | `--footer-link`, hover `#fff` | Yes |
| `.footer-founder-name a` | `#fff` | Yes (on dark footer) |
| `.footer-founder-role` | `var(--on-dark-muted)` | Yes |
| **`.footer-founder-portrait` frame** | `background: #fff`, `border: 2px solid var(--brand-primary)`, shadow rgba | **Locked** |
| **Portrait hover** | `border-color: #fff`, primary outer ring | **Locked** |
| Tablet/mobile portrait override | `border-color: #fff` (redesign) | **Locked** |

---

## About page — proof link fix (2026-06-01)

Philosophy nav no longer uses `.about-anchor-links` white chips. Uses `btn btn-secondary` with `.about-page .about-philosophy__proof-nav .btn-secondary { background: var(--brand-light); }` — **consistent with quote card**, not flat `#fff` on `#f8fafc`.

---

## Fixes applied in this pass

1. Tokenized scroll-to-top (`--brand-slate` + hover mix) in `styles.redesign.css`.
2. Brand gradients and `#f0fdf4` mixes → CSS variables in `styles.redesign.css` and `expertise-upgrade.css`.
3. **Not changed:** any `.footer-founder-portrait` / hover rules.

---

## Remaining backlog (optional)

- Tokenize literals in `our-approach-upgrade.css`, `case-studies-upgrade.css` (many `#027343`, `#1c2e4a`).
- Replace legacy `#fff` with `var(--white)` in `styles.legacy.css` / base components.
- Add `body` classes to `privacy.html`, `imprint.html`, `index.html` only if page-specific color overrides are needed later.
- Align `expertise-detail.css` shadow rgba to `var(--brand-dark)` alpha for one shadow system.

---

## Verification checklist

- [ ] Header: slate `#486966` on every root page
- [ ] Footer: dark `#1c2e4a` on every root page
- [ ] Founder portrait frame: white ring + green border unchanged
- [ ] About philosophy CTAs: green-tinted secondary, not invisible white
- [ ] Scroll-to-top: slate fill, visible on footer
- [ ] No page loads a second theme or alternate stylesheet
