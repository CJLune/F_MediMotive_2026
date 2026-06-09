# Content Merge Report — COPIE → Final Site

**Date:** 2026-06-09 (merge) · **Audit fixes:** 2026-06-09 · **Deploy:** 2026-06-09
**Direction:** Web copy/content from `F_MediMotive_2026_coPie` → final site `F_MediMotive_2026`
**Rule applied:** Visible copy/text taken from COPIE (the edited source). Links, slugs, schema URLs, and final design markup preserved from the target. German homepage fallback and the imprint "under construction" notice intentionally NOT carried over.

## Backup (rollback point)
A full pre-merge backup of every HTML page was saved to:

```
backups/pre-content-merge-2026-06-09_1640/   (36 files, root + de/)
```

To roll back any page, copy it from that folder back over the live version.

## What changed (content merge)

**16 pages — applied automatically (unambiguous):**
- 15 pages had only in-place wording differences → COPIE copy adopted wholesale, structure/links untouched:
  about, case-coated-aluminum-parts, case-production-ramp-up, case-studies, certificates, contact, de/about, gallery, our-approach, privacy, ramp-up-process-stability, rapid-response-troubleshooting, regions, services, work-journey.
- **index.html** — COPIE copy adopted, then 3 broken service URLs corrected back to the valid slug `/services/early-phase-risk-design-for-quality` (COPIE contained `…-contorl-…` typo and `…-control-…` variants that would have broken navigation).

**5 pages — applied after review (your decisions):**
- **early-phase-risk-design-for-quality**, **knowledge-gap-transition-security**, **qms-audit-regulatory-support**, **supplier-quality-complaint-management** — full COPIE content restored, including the extra FAQs, service lines, hero chips, FDA/21 CFR 820 mention, and ISO 9001 paragraph that the target had trimmed. Slugs verified identical (no breakage).
- **imprint** — COPIE wording adopted, BUT the "Company in formation…" and "This web presence is currently under construction" notices were removed to keep the imprint launch-clean.

**Left unchanged (intentional):**
- **de/index.html** — kept as the existing "Seite derzeit nicht erreichbar" offline fallback (noindex). The full German homepage in COPIE was NOT published.

## Audit fixes (checklist review — 2026-06-09)

Applied after EN content audit against `Medimotive website review checklist.xlsx`:

| Fix | Files |
|-----|-------|
| Gallery cert preview: VDA 6.3 → ISO 14001 environmental management | `gallery.html` |
| Homepage cert carousel: lead thumb ISO 14001, fourth thumb DGQ AI Tools (removed overdue VDA preview) | `index.html` |
| Footer tagline aligned to word-file copy on last remaining page | `early-phase-risk-design-for-quality.html` |
| JSON-LD org `description` synced to new footer tagline | `index.html`, `services.html`, `regions.html`, `our-approach.html` |
| Footer wording normalized (`root causes`, em-dash spacing) | `services.html` |
| Typos: `Phillipines`, `orS`, `standars`, `DGQ . ISO 14001` | `supplier-quality-complaint-management.html`, `services.html`, `knowledge-gap-transition-security.html`, `index.html` |
| RA cert card: visible title matches modal/alt (`Medical Device Regulatory Affairs Manager`) | `certificates.html` |
| About proof links: clean paths (no `.html` suffix) | `about.html` |
| HTML entities for `&` in supplier hero chip / FAQ | `supplier-quality-complaint-management.html` |
| FAQ grammar: "help us find a new reliable supplier" | `supplier-quality-complaint-management.html` |
| Nav dropdown double-space before `&` | `qms-audit-regulatory-support.html` |

## Audit fixes — schema / meta / footer (2026-06-09)

Second pass after footer, breadcrumb, SEO, and JSON-LD review:

| Fix | Files |
|-----|-------|
| FAQPage JSON-LD synced to visible FAQ (procurement, IATF 16949, ISO 14001, FDA/21 CFR 820, cultural language, workshops) | `services.html` |
| Meta/OG/Twitter descriptions: purchasing → procurement | `supplier-quality-complaint-management.html` |
| FAQPage JSON-LD: 5 questions (added Europe/Asia supplier search), procurement/cultural bridge wording, removed stale “Read the full case →” | `supplier-quality-complaint-management.html` |
| Meta/OG/Twitter + AboutPage schema: supplier escalation → supplier management | `about.html` |
| Homepage footer XING: static span → live profile link (matches other pages) | `index.html` |

## Audit fixes — QMS FAQ schema sync (2026-06-09)

Third pass after EN content audit (20-page checklist verification):

| Fix | Files |
|-----|-------|
| FAQPage JSON-LD: 4/4 questions (added differentiators FAQ; standards answer synced with FDA / 21 CFR 820) | `qms-audit-regulatory-support.html` |
| Deleted empty `__perm_test.txt` from site root | (root) |

**Still open (not changed — needs legal / product decision):**
- **Imprint formation notice** — intentionally omitted at merge; restore only after counsel confirms.
- **Privacy policy** — still `noindex`, draft meta, English translation of Strato DE template; counsel review + optional lawyer auto-update embed pending.
- **Nav label consistency** — "Risk Control" vs full "Early-Phase Risk Control & Design-for-Quality" preserved per COPIE.
- **German homepage** — full DE homepage in COPIE not yet published.
- **Cleanup** — deleted empty `__perm_test.txt` from site root (2026-06-09 audit pass).

## Verification performed

**Content merge:**
- No broken/typo service slugs anywhere (site-wide scan): PASS
- No internal service links pointing to non-existent pages: PASS
- All JSON-LD / schema blocks parse as valid JSON: PASS
- All restored content blocks confirmed present: PASS
- Imprint notices confirmed removed: PASS
- HTML structure (html/head/body) intact on all pages: PASS
- Final diff vs COPIE shows only the 3 intended deviations (index URLs, imprint notice, de fallback): PASS

**Post-audit fixes:**
- No remaining `Phillipines`, `orS`, `standars`, or old footer tagline in live EN pages: PASS
- Gallery + homepage no longer use VDA 6.3 as certificate preview: PASS
- JSON-LD org descriptions match visible footer tagline on index, services, regions, our-approach: PASS

**Schema / meta pass (2026-06-09):**
- `services.html` FAQPage schema matches visible FAQ (procurement, IATF 16949, ISO 14001, FDA/21 CFR 820): PASS
- `supplier-quality-complaint-management.html` meta uses procurement (not purchasing): PASS
- `supplier-quality-complaint-management.html` FAQPage schema has 5 questions aligned with visible FAQ: PASS
- `about.html` meta + AboutPage schema use supplier management (not escalation): PASS
- `index.html` footer XING is live link (no `social-link--static`): PASS

**QMS FAQ schema sync (2026-06-09):**
- `qms-audit-regulatory-support.html` FAQPage schema has 4 questions aligned with visible FAQ (incl. differentiators + FDA / 21 CFR 820): PASS
- All expertise pages with FAQPage JSON-LD match visible `<details>` count: PASS (services 6/6, supplier 5/5, rapid 4/4, ramp 4/4, early-phase 4/4, qms 4/4, knowledge-gap 3/3)

## EN checklist sign-off (page-by-page review — 2026-06-09)

Independent verification against COPIE (`F_MediMotive_2026_coPie`) and checklist sheet `EN-review`:

| # | Page | COPIE parity | Verdict |
|---|------|--------------|---------|
| 01 | index | Intended drifts only (procurement, cert carousel) | **PASS** |
| 02 | services | Intended drifts (footer, FAQ) | **PASS** |
| 03 | rapid-response-troubleshooting | Exact match | **PASS** |
| 04 | supplier-quality-complaint-management | Intended drifts (grammar, entities, procurement meta) | **PASS** |
| 05 | ramp-up-process-stability | Exact match | **PASS** |
| 06 | early-phase-risk-design-for-quality | Footer tagline only | **PASS** |
| 07 | qms-audit-regulatory-support | Exact match (+ schema sync) | **PASS** |
| 08 | knowledge-gap-transition-security | `standars` → `standards` typo fix | **PASS** |
| 09–11 | case-studies, case-coated-aluminum-parts, case-production-ramp-up | Exact match | **PASS** |
| 12 | about | Body exact; meta uses supplier management | **PASS** |
| 13 | contact | Exact match | **PASS** |
| 14 | our-approach | Exact match | **PASS** |
| 15 | certificates | Exact match; RA modal titles synced | **PASS** |
| 16 | work-journey | Exact match | **PASS** |
| 17 | regions | Exact match (Tuttlingen in intro) | **PASS** |
| 18 | gallery | ISO 14001 preview (not VDA 6.3) | **PASS** |
| 19 | imprint | Formation notice **intentionally omitted** on live | **INTENTIONAL** |
| 20 | privacy | No copy change expected; still `noindex` | **OPEN (legal)** |

**EN content sign-off:** 18/20 PASS · 1 INTENTIONAL · 1 OPEN (legal). No remaining build-side blockers except optional P2 FAQ schema word-sync on `rapid-response-troubleshooting` (count matches; minor wording drift in JSON-LD only).

## Production deploy (2026-06-09)

| Item | Value |
|------|-------|
| Platform | Vercel — project `f-medi-motive-2026` (team: cjlune's projects) |
| Production URL | https://medimotive.de |
| Vercel alias | https://f-medi-motive-2026.vercel.app |
| Pre-deploy build | `npm run build` (`build:css` + `build:og` + `sitemap`) |
| Deploy command | `vercel --prod --yes` |
| Deployment ID | `dpl_HKe3wRiDSxcDzdXJWH4UVPx1JiEq` |
| Inspect | https://vercel.com/cjlunes-projects/f-medi-motive-2026/HKe3wRiDSxcDzdXJWH4UVPx1JiEq |
| GitHub | Local repo initialized + commit `main` (2026-06-09). Remote target: `https://github.com/CJLune/f-medi-motive-2026` — push pending GitHub auth in your terminal (`gh auth login` or SSH remote). |

**This deploy includes:** COPIE content merge, all checklist audit fixes (footer, procurement, gallery/index cert previews, typos, FAQ/schema/meta sync, QMS 4/4 FAQ schema, `__perm_test.txt` removal).
