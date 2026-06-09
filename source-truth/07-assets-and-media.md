# Assets and Media Rules

Last updated: 2026-05-31

## Open Graph / social preview

- **File:** `assets/images/og-medimotive.jpg` (1200×630, primary OG/Twitter image)
- **Source:** `assets/images/og-medimotive.svg` — edit SVG, then `npm run build:og`
- **Do not** use `footer-founder-portrait.png` for `og:image` (too small; wrong aspect ratio)

## Image Folders

Use web-safe folder names:

- `assets/images/certificates/` — web JPGs in category subfolders (`ai-and-other/`, `audit/`, `methods/`, `quality-management/`, `regulatory-affairs/`)
- `assets/certificates/` — client PDF source files (not linked directly on the site)
- `assets/images/work-journey/`
- `assets/images/bjoern-seiler/`
- `assets/images/project-experience/` — legacy JPGs still used on case-study detail pages, case-studies hub cards, homepage hero, and some supporting pages (see **Still on project-experience** below)
- `assets/images/service_page_img/` — **canonical expertise hub + detail images** (PNG exports; edit here first, then sync HTML on `services.html` and the matching detail page)
- `assets/images/homepage_img/` — homepage-only editorial images (compare mosaic, failure search, stages evolution peel)

Use lowercase filenames, hyphens, and no spaces or umlauts.

Example:

- `bjoern-seiler-founder-portrait.jpg`
- `bjoern-seiler-vda-6-3-certificate.jpg`
- `work-shop-floor-foundation.jpg`
- `expertise1_rapid_troubleshooting.png`
- `project-cmm-contura-measurement.png`

## Expertise hub + detail image mapping (canonical)

When changing an expertise card image, update **both** `services.html` (bento) and the matching detail page (`ed-image` in “What this work covers”). Use the same `src`, `alt`, and real `width`/`height`.

| # | Area | File | Used on |
|---|------|------|---------|
| Hub hero | Expertise overview | `service_page_img/ishikawa_brainstorming.png` | `services.html` page hero only |
| 01 | Rapid Response Troubleshooting | `service_page_img/expertise1_rapid_troubleshooting.png` | `services.html` + `rapid-response-troubleshooting.html` |
| 02 | Supplier Quality & Complaint Management | `service_page_img/expertise2_supplier_quality_complaint_management.png` | `services.html` + `supplier-quality-complaint-management.html` (detail HTML: 1672×941) |
| 03 | Ramp-Up & Process Stability | `service_page_img/expertise3_ramp-up_process_stability.png` | `services.html` + `ramp-up-process-stability.html` |
| 04 | Early-Phase Risk & Design-for-Quality | `service_page_img/expertise4_early_phase_risk_control.png` | `services.html` + `early-phase-risk-design-for-quality.html` |
| 05 | QMS, Audit & Regulatory Support | `service_page_img/expertise5_QMS_audit_RS.png` | `services.html` + `qms-audit-regulatory-support.html` (1280×720; replaces legacy `project-experience/qms-process-mapping-workshop.jpg` on detail) |
| 06 | Knowledge Gap & Transition Security | `service_page_img/expertise6_knowledge_gap_security.png` | `services.html` + `knowledge-gap-transition-security.html` |

**Rule:** Do not change hub images in HTML only — detail pages must stay in sync. After image swaps, hard-refresh or cache-bust if the old asset still appears.

## Homepage editorial images (`homepage_img/`)

| Section | Files | Notes |
|---------|-------|-------|
| Compare mosaic | `comPat01.png` … `comPat04.png` | Supplier / troubleshooting / kitting / knowledge-transfer collage |
| Failure search | `Failure_search.png` | Organic connectivity section |
| Stages evolution (peel) | `caliper.png` (peel layer), `project-cmm-contura-measurement.png` (base) | Both **1200×900**; `#home-stages` scroll peel in `assets/app.js`; `object-fit: cover`, `object-position: center` |

Homepage hero ramp-up image remains on **`project-experience/hero-production-ramp-up.png`** (above the fold on `index.html`).

## Still on `project-experience/` (not migrated)

These paths are intentional until a future image pass:

- `index.html` — `hero-production-ramp-up.png`
- `case-studies.html` — case card thumbnails (`expertise-troubleshooting.jpg`, `expertise-ramp-up.jpg`)
- `case-coated-aluminum-parts.html`, `case-production-ramp-up.html` — case detail hero images
- `our-approach.html` — `qms-process-mapping-workshop.jpg` (decorative; not the expertise detail canonical)

## Certificates

Certificate images belong primarily on `certificates.html`.

About should only show credential categories and link to `certificates.html`.

## Work Journey / Visual Proof

Work journey photos should show professional context:

- manufacturing environments
- travel for supplier/customer work
- audit or quality context
- professional portrait
- non-confidential work situations
- supplier/customer context without exposing confidential details

Use gallery / visual proof to make MediMotive feel real, practical, travelled, and credible.

Do not make it feel like Instagram or a personal vacation gallery.

## Privacy and Confidentiality

Do not publish:

- confidential customer logos
- confidential documents
- technical drawings
- serial numbers
- part numbers
- identifiable workers without consent
- restricted production details
- client premises without permission

## Accessibility and SEO

Every image should use:

- descriptive filename
- meaningful alt text
- width and height attributes
- `loading="lazy"` unless above the fold

Portrait above the fold may use eager loading.

## Empty Placeholders

Do not show “future image,” “add image here,” or empty placeholder boxes on live pages.

If no real image exists, hide the image section or display the text-only card cleanly.
