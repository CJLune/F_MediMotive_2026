# MediMotive — Responsive UX Audit Report

**Date:** 2026-05-28  
**Scope:** 17 live HTML pages  
**Method:** Headless Chromium (Playwright) automated Tests A–F + programmatic Phase 2 checks  
**Raw data:** `source-truth/responsive-audit-report.json`  
**Runner:** `tools/responsive-audit.mjs`  
**Status:** Reporting only — no fixes applied in this session

---

## Executive summary

| Test | Result | Severity |
|------|--------|----------|
| **A — Horizontal overflow** | **PASS** (0 pages, all breakpoints) | — |
| **B — Touch targets (<44px)** | **FAIL** — 232 instances across pages (375/390px) | P1 |
| **C — Font size (<14px @375px)** | **FAIL** — 209 instances (mostly intentional meta/chips) | P2 |
| **D — Image/media overflow** | **PASS** (0 instances) | — |
| **E — Grid collapse @≤390px** | **NOTE** — 2 flags on `work-journey.html` (12-col bento; no overflow) | P3 |
| **F — Sticky height @375px** | **FAIL** — `services.html` 205px sticky stack (>162px / 25% viewport) | P2 |

**Critical cross-page finding (P0):** Six expertise detail pages, `services.html`, and `certificates.html` render hero **`h1` at 16px on desktop (1024–1440px)** due to Tailwind Preflight (`font-size: inherit`) overriding legacy `h1` clamp without a page-scoped desktop rule on `.ed-hero__copy h1`.

---

## Breakpoints tested

| Label | Width | Used in |
|-------|-------|---------|
| Mobile narrow | 375px | A–F, Phase 2 |
| Mobile standard | 390px | A, B, D, E, Phase 2 |
| Tablet portrait | 768px | A, E, Phase 2 |
| Tablet landscape | 920px | A, E, Phase 2 |
| Small desktop | 1024px | Phase 2 |
| Standard desktop | 1440px | Phase 2 |

Design-system reference: tablet ≤920px, mobile ≤640px, touch min-height 44px ([design-system-tokens.md](design-system-tokens.md)).

---

## Phase 1 — Automated results

### TEST A: Horizontal overflow

**Script:** `document.documentElement.scrollWidth > clientWidth` + offender scan  
**Breakpoints:** 375, 390, 768, 920  
**Pages:** 17/17  

| Page | 375px | 390px | 768px | 920px | overflowPx |
|------|-------|-------|-------|-------|------------|
| All 17 pages | PASS | PASS | PASS | PASS | 0 |

No horizontal scroll detected on any page at any tested breakpoint.

---

### TEST B: Touch target audit (<44px height)

**Breakpoints:** 375px, 390px  
**Total failing targets:** 232 (across all pages × 2 viewports)

#### Failures by selector pattern (all pages)

| Selector / pattern | Count | Notes |
|--------------------|-------|-------|
| `a` (unclassed / generic) | 80 | Footer links, inline `.link`, breadcrumb-adjacent text links |
| `.cert-view-btn` | 40 | `certificates.html` — certificate tile triggers |
| `.link` | 36 | Text-style CTAs site-wide |
| `.brand` | 34 | Wordmark link height ~17px (width adequate; height fails) |
| `.expertise-situation-nav__link` | 12 | `services.html` — 40–43px (1px under on 2 pills) |
| `.expertise-bento__cta` | 12 | `services.html` — ~21px height |
| `.ed-case-callout__link` | 8 | Expertise detail case callouts |
| `.expertise-card__case-link` | 6 | `services.html` bento case links ~20px |
| `.social-link` | 4 | Footer LinkedIn/XING rows |

#### Per-page count @375px (worst offenders)

| Page | Failing targets @375px |
|------|------------------------|
| `services.html` | 24 |
| `certificates.html` | 23 |
| `work-journey.html` | 8 |
| `case-coated-aluminum-parts.html` | 8 |
| `case-production-ramp-up.html` | 8 |
| `regions.html` | 7 |
| Others | 2–4 each |

#### Representative measurements @375px

**`index.html` — `.brand`**
- Selector: `a.brand`
- Text: `MediMotive`
- Size: **17×228px** (height fail)

**`index.html` — `.link`**
- Selector: `a.link`
- Text: `View all certificate records →`
- Size: **19×194px**

**`services.html` — situation nav @375px**
- Selector: `.expertise-situation-nav__link`
- `Audit / regulatory`: **40×161px**
- `Knowledge at risk`: **40×161px**
- Others: **43×161px** (1px under 44px threshold)

**`services.html` — bento CTAs @375px**
- Selector: `.expertise-bento__cta.expertise-card__cta`
- Text: `Open expertise page →`
- Size: **21×290px** (all 6 cards)

**`certificates.html` — `.cert-view-btn` @375px**
- 23 failing controls per viewport (40 total across 375+390)
- Typical height: **~36–40px** (needs spot-check per tile)

---

### TEST C: Font size audit (<14px @375px)

**Breakpoint:** 375px  
**Total flagged elements:** 209 (capped at 15 per page in script; counts below are full matches)

#### Recurring patterns (site-wide)

| Selector | Computed size | Pages affected | Assessment |
|----------|---------------|----------------|------------|
| `.ed-hero__chip` | **12px** (0.75rem) | 6 expertise detail | Intentional chip meta; below 14px |
| `.eyebrow` | **11.52px** (0.72rem) | Most pages | Design token; below audit threshold |
| `.pill` | **11.52px** | Case cards, tags | Meta label |
| `.case-situation-tag` | **11.52px** | `case-studies.html` | Situation tags |
| `.expertise-situation-nav__link` | **10.88px** | `services.html` | Nav pill label text |
| `.step-phase` | **10.88px** | Case detail timelines | Phase label |
| `.footer-founder-role` | **12.48px** | All pages (footer) | Caption |
| Footer `LI` / `A` | **10.4–10.88px** | All pages | Footer column links |

**Hero lead paragraphs @375px:** All pages **≥16px** — PASS for lead readability.

**Not a failure:** Eyebrows/pills at 0.72rem match [design-system-tokens.md](design-system-tokens.md) eyebrow scale — flag for WCAG review, not layout bug.

---

### TEST D: Image overflow

**Breakpoints:** 375, 390  
**Result:** **0** overflowing `img`, `video`, `svg`, `canvas`, or `figure` elements on any page.

---

### TEST E: Grid collapse @≤390px

**Flag rule:** `display: grid` with `columnCount > 1` at ≤390px

| Page | Viewport | Selector | Columns | offsetWidth | Notes |
|------|----------|----------|---------|-------------|-------|
| `work-journey.html` | 375px | `.work-journey-collage.work-journey-collage--bento` | 12 | 303px | Mosaic uses 12 implicit tracks (~12px each); **no horizontal overflow** (Test A pass) |
| `work-journey.html` | 390px | same | 12 | 318px | Same as above |

No other pages flagged. Bento on `services.html` collapses to 1 column at mobile (verified via CSS; not flagged by column-count heuristic).

---

### TEST F: Sticky element height @375px

**Threshold:** >162px (25% of 667px viewport height)

| Page | Total sticky height | Viewport remaining | Flagged |
|------|---------------------|--------------------|---------|
| All except services | ≤54px (header only) | ≥613px | No |
| **`services.html`** | **205px** | **462px** | **YES** |

**`services.html` @375px — sticky stack:**

| Selector | position | height | top |
|----------|----------|--------|-----|
| `.site-header` | sticky | 54px | 0px |
| `.expertise-situation-nav-wrap` | sticky | 151px | 64px |

Combined sticky chrome consumes **~31%** of viewport before content scroll — usability risk on small phones.

---

## Phase 2 — Visual / structural checks

Automated where measurable; manual interaction items marked **MANUAL**.

### Navigation (all pages)

| Check | 375 | 390 | 768 | 920 | 1024 | 1440 | Notes |
|-------|-----|-----|-----|-----|------|------|-------|
| `.nav-links` visible | FAIL | FAIL | FAIL | FAIL | PASS | PASS | Hamburger breakpoint = **≤920px** (matches `styles.css` `@media (max-width: 920px)`) |
| `.menu-btn` visible | PASS | PASS | PASS | PASS | FAIL | FAIL | Menu button 44×44px — PASS |
| Active nav item in header | varies | — | — | — | — | — | Expertise sub-pages: main nav **Expertise not `.active`** (expected — no parent highlight) |
| Hamburger opens drawer | — | — | — | — | — | — | **MANUAL** — not exercised in headless pass |
| Mobile drawer 6 sub-links | — | — | — | — | — | — | **MANUAL** |
| Expertise dropdown hover @desktop | — | — | — | — | — | — | **MANUAL** |
| Dropdown Escape / outside click | — | — | — | — | — | — | **MANUAL** (requires `app.js` interaction) |

---

### Hero sections

| Page | H1 @375 | H1 @1440 | Lead @375 | Lead @1440 | Left-aligned | CTAs @375 full-width |
|------|---------|----------|-----------|------------|--------------|----------------------|
| `index.html` | 40px | 40px | 16px | 18.4px | center (home) | N/A (tertiary CTAs) |
| `about.html` | — | 47.2px | 16px | — | yes | — |
| `services.html` | 25.5px | **16px FAIL** | 16px | 16.8px | yes | PASS (gutter 24px) |
| `case-studies.html` | 28px | 44px | 16px | 18px | **yes** | N/A (no hero CTAs) |
| `contact.html` | — | 42.4px | 16px | — | yes | — |
| `certificates.html` | 26.25px | **16px FAIL** | — | — | — | — |
| 6× expertise detail | 24–25px | **16px FAIL** | 16px | 16–18px | start | PASS (gutter 24px) |
| Case detail pages | — | 44px | — | — | left | — |

**P0 — Desktop hero H1 at 16px:**  
Affected selectors share missing desktop `font-size` after Tailwind Preflight reset (`assets/styles.css` ~L9300 `h1 { font-size: inherit }`).

- `.expertise-detail-page .ed-hero__copy h1` — only sized at `@media (max-width: 640px)` in `expertise-detail.css`
- Measured: **16px × 38px height** @1440 on `rapid-response-troubleshooting.html`

---

### Expertise detail pages (6)

| Check | Result | Evidence |
|-------|--------|----------|
| Option B hero: badge + situation + H1 + lead + chips | **PASS** @375–640 | `.ed-hero__num`, `.ed-hero__situation`, 4× `.ed-hero__chip` detected |
| 2 CTAs in hero | **PASS** | `.actions` with primary + secondary |
| Qualifier chips wrap @375 | **PASS** (no overflow) | Test A pass; chips 12px font |
| Hero image right column @1440 | **FAIL / N/A** | `.ed-hero__media img` **not present** in DOM (images removed in prior session) |
| Image stacks @≤920 | **N/A** | No hero media column |
| Expertise nav bar (6 links) | **PASS** | `.expertise-areas-nav` present; horizontal scroll CSS @920 |
| Active pill highlighted | **PASS** | `aria-current="page"` on correct link per page |
| Body Section 1 prose + image | **MANUAL** | Not measured in this pass |
| Case callout green border | **MANUAL** | Present in markup; not color-verified headless |
| CTA section alignment @640 | **MANUAL** | — |

---

### Services page

| Check | 375px | 768px | 920px | 1440px |
|-------|-------|-------|-------|--------|
| Situation nav 6 pills | PASS (2×3 grid) | PASS | PASS | PASS |
| Pills ≥44px height | **FAIL** (2 at 40px) | — | — | — |
| Featured card 01 green border | **MANUAL** | — | — | — |
| Bento 3→2→1 col | **MANUAL** (CSS) | — | — | — |
| Connect-steps 4→2→1 | **MANUAL** (CSS) | — | — | — |
| FAQ 2-col @≥1024 | `.faq-layout` present | — | — | **MANUAL** |
| Mid-page CTAs as buttons | bento CTAs fail touch | — | — | — |

---

### Case studies page

| Check | Result | Measurement |
|-------|--------|-------------|
| Hero dark background | **NOTE** | Computed `background-color: rgba(248, 250, 252, 0.62)` — **light**, not dark. Checklist wording may be stale vs current design (`case-hero-network` mesh on `#f8fafc`) |
| Hero text left-aligned | **PASS** | `text-align: left` @375–1440 |
| No CTAs in hero | **PASS** | `.case-heroHasActions: false` |
| Case 01 tags | **PASS** | Supplier failure · Field exposure · Process redesign |
| Case 02 tags | **PASS** | Demand spike · Regulatory compliance · 12 months |
| 75% / 1,500/mo KPI dominant | **PASS** @1440 | KPI `strong` inherits `clamp(2.4rem, 5vw, 3.6rem)` from upgrade CSS |
| Zero email in `<main>` | **PASS** | `visibleMailtoInMain: 0` |
| Anonymisation block | **PASS** | `.case-anon-block` present |
| Closing CTA heading | **PASS** | “Dealing with a comparable situation?” |
| Closing buttons @1440 | **PASS** | Contact 198×**48px**, View expertise 157×**48px** |
| Buttons stack @≤640 | **MANUAL** | CSS present in `case-studies-upgrade.css`; not re-measured @640 in this pass |
| `.notice` “On disclosure” in Case 01 | **N/A** | Index page has featured cards only; disclosure notice lives on `case-coated-aluminum-parts.html` |

---

### Certificates page

| Check | Result |
|-------|--------|
| Touch targets | **FAIL** — 23 controls @375px (`.cert-view-btn`, `.brand`, nav drawer links) |
| Hero H1 @1440 | **FAIL** — 16px (same inherit issue) |
| Horizontal overflow | **PASS** |

---

### Contact, About, Regions, Our Approach, Work journey, Case detail

- **Overflow:** PASS all breakpoints  
- **Touch @375:** 2–8 minor failures (mostly `.link`, `.brand`, footer)  
- **Hero H1 @1440:** PASS on `about`, `contact`, `regions`, `our-approach`, `work-journey`, both case detail pages  
- **Work journey bento:** 12-col grid @375 — no overflow; **MANUAL** visual density check recommended  

---

## Priority fix backlog (for separate session)

### P0 — Desktop hero H1 collapsed to 16px

**Pages:** `services.html`, `certificates.html`, all 6 expertise detail pages  
**Selector:** `.ed-hero__copy h1`, `.page-hero .container.narrow > h1` (where affected)  
**Viewport:** 641px–1440px+  
**Measurement:** `font-size: 16px` (inherits body; Tailwind preflight wins)  
**Fix direction:** Add desktop `font-size: clamp(...)` in page-scoped CSS (`expertise-detail.css` / `expertise-upgrade.css`) — **do not edit `styles.css` in isolation without rebuild plan**

### P1 — Touch targets

1. **`.brand`** — 17px height site-wide → extend hit area to 44px min  
2. **`.cert-view-btn`** — certificates archive  
3. **`.expertise-bento__cta` / `.expertise-card__case-link`** — services bento  
4. **`.link`** text CTAs — add min-height/padding or accept as secondary links (document exception)  
5. **`.expertise-situation-nav__link`** — 2 pills at 40px @375 → +4px padding

### P2 — Sticky chrome on services @375

**Selector:** `.expertise-situation-nav-wrap` (151px) + `.site-header` (54px)  
**Measurement:** 205px total sticky (>162px threshold)  
**Fix direction:** Compact nav on mobile, collapse labels, or reduce sticky scope

### P2 — Meta text below 14px

Review `.eyebrow`, `.pill`, `.case-situation-tag`, `.ed-hero__chip` for WCAG — may be acceptable as non-body meta per design tokens

### P3 — Work journey bento

12-column mosaic @375 — verify intentional; no overflow detected

---

## Manual follow-up checklist (not run)

- [ ] Hamburger drawer open/close + focus trap  
- [ ] Expertise dropdown hover, edge alignment @1024/1440  
- [ ] Escape / outside-click dropdown close (`app.js`)  
- [ ] Services bento / connect-steps / FAQ column layout visual @1024/640  
- [ ] Expertise detail body sections + case callout colors  
- [ ] Case studies closing CTA stack @640  
- [ ] Lighthouse + WCAG contrast (audit-status P3)  
- [ ] German string length stress (P1 in audit-status)

---

## Artifacts

| File | Purpose |
|------|---------|
| `source-truth/responsive-audit-report.json` | Full machine output (all pages × viewports) |
| `tools/responsive-audit.mjs` | Reproducible runner |
| `source-truth/responsive-audit-report.md` | This human-readable summary |

**Re-run:**
```bash
PLAYWRIGHT_BROWSERS_PATH="$PWD/.playwright-browsers" node tools/responsive-audit.mjs
```

---

*End of report — no code changes made to live pages or global CSS during this audit.*
