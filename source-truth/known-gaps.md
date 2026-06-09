# Known Gaps

## Legal (before publication)

- `imprint.html` and `privacy.html` have **review drafts** with `Confirm` fields — counsel approval required. See [10-legal-client-review.md](10-legal-client-review.md).
- Pages stay **`noindex`** until approved; then run `node tools/publish-legal.mjs --confirm`.
- `terms.html` is not published; footer Terms link removed until content is ready.

## Content

- German localization is not final; English is the working master.
- Copy may reference automotive quality-system context (including environments where IATF 16949 applies) without a matching IATF certificate PDF in the archive — keep wording as context, not credential claim. **IATF 16949** appears in the QMS detail FAQ ([12-expertise-pages.md](12-expertise-pages.md)); optional body mention on pages 01/05 remains open ([expertise-detail-content-audit.md](expertise-detail-content-audit.md) O5).
- Homepage optional secondary hero media panels may stay hidden via `is-empty` — primary hero image is live.

## Content — Expertise hub and detail pages

**Canonical copy (2026-05-31):** [12-expertise-pages.md](12-expertise-pages.md) — hub connect prose, all six FAQ sets, FAQ counts, footer founder link.

**Open — page 06 body vs FAQ:** `knowledge-gap-transition-security.html` still has H3 “Important legal boundary” / “does not provide direct classroom-style training” in body while FAQ Q1 describes short in-person workshops. Align body with FAQ + [00-positioning-source-truth.md](00-positioning-source-truth.md) §10 before next edit ([expertise-detail-content-audit.md](expertise-detail-content-audit.md) O1).

**Open — meta descriptions:** Pages 02, 03, 04, 06 may still use “within MediMotive's evidence hub” wrapper — suggested rewrites in audit doc O2; change only with client approval.

**Resolved:** Hub connect step cards removed; detail FAQs updated; pages 05–06 dropped fourth “verified outcomes” FAQ; FAQ intros centered on detail pages.

## Technical SEO (implemented — verify domain)

- Canonical, Open Graph, Twitter cards, and `robots.txt` / `sitemap.xml` use `https://medimotive.de` from [site-url.md](site-url.md). Re-run `node tools/apply-seo.mjs` after domain change.
- `gallery.html` remains `noindex` and orphaned for launch. The live visual-proof destination is `work-journey.html`. Gallery is not in the header, not in the sitemap, and not linked from primary navigation. Revisit after launch.
- `imprint.html` and `privacy.html` are `noindex` until legal publish step.
- ~~XING shown as icon only (no link) until client confirms profile URL~~ — linked to [08-contact-and-facts.md](08-contact-and-facts.md) XING URL.

## UI

- Track remaining UX items in [audit-status.md](audit-status.md) (design system parity, Lighthouse, optional breadcrumbs).

## Content — Our Approach page

**Resolved (2026-05-27):** `our-approach.html` was rewritten to remove proprietary/internal method framing. Removed risk terms include Interaction Matrix, Process Purpose Audit, proprietary, developed by, living organism, 80%, method in practice, textbook Interaction Matrix failure, and Working Philosophy (including aligned `<title>`, meta, OG, and Twitter titles).

The page now follows **problem → solution direction → proof**, aligned with [11-our-approach-page.md](11-our-approach-page.md) and section 18 in [00-positioning-source-truth.md](00-positioning-source-truth.md).

**Non-blocking notes (optional future polish only):**

- Legacy CSS class names such as `organic-method-*` may still exist in markup; they are not visible copy and do not affect positioning.
- Case 02 card heading uses generic “integrated system thinking” language — not a branded framework; tone polish only if desired.

## Positioning risk

Do not let Cursor turn the site into:

- Björn’s CV only
- a generic consulting funnel
- a gallery site
- a certificate dump
- a paper-consulting website

## Conversion

Shop-Floor Check and hard sales-funnel language remain future options only unless explicitly requested.

## Deprecated docs

- [../AUDIT.txt](../AUDIT.txt) — superseded by this folder
- [../medimotive_page_map.csv](../medimotive_page_map.csv) — verify against [page-status.csv](page-status.csv)
