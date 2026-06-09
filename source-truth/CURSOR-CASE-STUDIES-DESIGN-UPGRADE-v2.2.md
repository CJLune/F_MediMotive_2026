# Cursor Instruction — Case Studies Design Upgrade v2.2 (current baseline)

**MediMotive | 2026-05-27**

**Status:** Authoritative baseline for Case Studies page work.

**Replaces for implementation purposes:** `CURSOR-CASE-STUDIES-DESIGN-UPGRADE-v2.md` (v2.1 — stale; do not apply).

---

## Why v2.2 exists

The v2.1 instruction assumed an older Case Studies markup:

- `.case-steps` (2-column step grid)
- `.case-studies-jump` (tab-style jump nav)

The live page now uses an **evidence-chapter** layout with `.case-timeline`, ambient bands, outcome metrics, and scoped upgrade CSS. v2.1 FIND/REPLACE blocks no longer match `case-studies.html` and must not be applied.

**This file documents the current implementation as the baseline.** Future Case Studies work must extend or surgically adjust this structure — not restore the old one.

---

## Current baseline (HTML)

`case-studies.html` currently uses:

| Element / class | Role |
|-----------------|------|
| `body.case-studies-page` | Page scope for all upgrade CSS |
| `.case-metrics-wrap` | Wrapper around outcome metrics per case chapter |
| `.metrics-grid.outcome-band` | 4-up outcome grid (primary + three supporting metrics) |
| `.metric--primary` | Dark primary metric cell (left column on desktop) |
| `.case-timeline-band` | Full-width band containing timeline + at-a-glance |
| `.case-timeline-shell` | Grid shell: sidebar + timeline |
| `.case-at-a-glance` | Compact metric summary sidebar |
| `.case-timeline` | Vertical narrative timeline (4 articles per case) |
| `.step-num` | Step number container (badge column in timeline) |
| `.step-num__badge` | Numbered circle badge |
| `.step-phase` | Phase label (e.g. “The situation”) |
| `.notice` | Case 01 disclosure block (with `.notice__head`) |

Supporting structure (also part of baseline, do not remove without explicit request):

- `.page-hero.page-hero--evidence`
- `.case-studies-intro` + `.case-featured-row` / `.case-featured-card`
- `.case-chapter` / `.case-chapter--01` / `.case-chapter--02`
- `.case-intro-band`, `.case-intro-split`, intro images + captions
- `.case-studies-close` + `.dark-panel.case-studies-close__panel`
- Footer (unchanged global chrome)

---

## What is no longer the baseline

Do **not** treat these as the current Case Studies structure:

- `.case-steps` — old 2-column step grid; **not present** on live page
- `.case-studies-jump` — old tab jump nav; **not present** on live page
- v2.1 CSS snippet targeting `.case-steps`, `.metrics-grid` (without `.outcome-band`), `.case-studies-jump`

**Do not restore** the old `.case-steps` layout.

**Do not replace** `assets/case-studies-upgrade.css` with the old v2.1 CSS block from v2.1.

---

## CSS rules (current baseline)

1. **`assets/case-studies-upgrade.css` must remain scoped to `.case-studies-page`.**  
   Every selector should be prefixed with `.case-studies-page` (defense in depth).

2. **`case-studies.html` must keep the upgrade stylesheet linked directly after global styles:**

   ```html
   <link rel="stylesheet" href="assets/styles.css" />
   <link rel="stylesheet" href="assets/case-studies-upgrade.css" />
   ```

3. **Do not link** `assets/case-studies-upgrade.css` from any other HTML page.

4. **Do not edit build sources** for Case Studies upgrades:
   - `assets/styles.redesign.css`
   - `assets/styles.legacy.css`
   - `assets/styles.css`
   - `assets/input.css`
   - `package.json`, `tailwind.config.js`, `postcss.config.js`

   Case Studies visual changes belong in `assets/case-studies-upgrade.css` only (plus surgical HTML in `case-studies.html` when explicitly requested).

---

## Positioning and constraints

Case Studies remains a **proof / evidence page**, not a sales funnel.

Read and follow source-truth before any Case Studies edit:

1. `00-positioning-source-truth.md`
2. `01-site-purpose.md`
3. `02-constraints.md`
4. `03-page-inventory.md`
5. `04-navigation-and-links.md`
6. `09-voice-and-banned.md`
7. `design-system-tokens.md`
8. `known-gaps.md`
9. `audit-status.md`

**Do not add:**

- Header CTA
- Contact form
- Booking language
- Shop-Floor Check CTA
- New header navigation item
- Fake logo

**Do not change** compact header nav: Expertise · Case Studies · About · Contact (wordmark → home).

**Do not** turn Case Studies into aggressive lead capture; direct contact / email links in closing panel are acceptable as today.

---

## Future change rules

When improving Case Studies (spacing, mobile/tablet, typography, minor UX):

1. **Target the current `.case-timeline` structure** — not `.case-steps`.
2. **Prefer surgical CSS** in `assets/case-studies-upgrade.css` under `.case-studies-page`.
3. **Prefer surgical HTML** in `case-studies.html` only when markup change is required; preserve hero, featured cards, intro images, captions, and footer unless explicitly instructed.
4. **Verify responsive spacing** per `design-system-tokens.md` (tablet ≤920px, mobile ≤640px): gutters, section rhythm, no horizontal overflow.
5. **Preserve** `R&amp;D` and other entity encoding exactly where already present.
6. **Case 01** retains `.notice` with `<p class="notice__head">On disclosure</p>`.
7. **Case 02** has no per-case notice block (closing anonymisation panel only).

If a FIND block in an older instruction does not match live HTML, **stop and update the instruction** — do not improvise against stale v2.1 blocks.

---

## Scope for typical v2.2-era tasks

**In scope:**

- `case-studies.html` (surgical)
- `assets/case-studies-upgrade.css`
- This file (`CURSOR-CASE-STUDIES-DESIGN-UPGRADE-v2.2.md`) when baseline docs need updating

**Out of scope unless explicitly requested:**

- All other HTML pages
- `assets/app.js`
- Global CSS / build pipeline
- Header, footer structure, main navigation
- Redesign of hero, featured cards, or case intro imagery

---

## Verification checklist (after any Case Studies change)

- [ ] `body` class is still `case-studies-page`
- [ ] `assets/case-studies-upgrade.css` linked only in `case-studies.html`, directly after `assets/styles.css`
- [ ] No `.case-steps` or `.case-studies-jump` reintroduced unless client explicitly reverses baseline
- [ ] Timeline articles still use `.step-num` + `.step-num__badge` + `.step-phase` + `h3` + `p`
- [ ] Outcome metrics still use `.case-metrics-wrap` > `.metrics-grid.outcome-band` > `.metric` / `.metric--primary`
- [ ] Case 01 `.notice` still has `.notice__head` “On disclosure”
- [ ] No global CSS/build files modified
- [ ] No header CTA, form, booking language, or nav expansion
- [ ] Mobile/tablet: no horizontal scroll; spacing readable (see design-system-tokens responsive audit)

---

## Reference: stale v2.1 (do not apply)

`source-truth/CURSOR-CASE-STUDIES-DESIGN-UPGRADE-v2.md` remains in the repo for history only. Its HTML-01–HTML-05 operations and verbatim CSS paste **do not match** the current page. Use **this v2.2 file** instead.
