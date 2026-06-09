# MediMotive — EN Content Audit (20 root pages)

**Date:** 2026-06-09
**Auditor scope:** 20 EN root HTML pages from checklist sheet `EN-review`
**Sources compared:** Live deploy target (`F_MediMotive_2026`) vs client COPIE (`F_MediMotive_2026_coPie`) vs checklist (`Medimotive website review checklist.xlsx`)
**Merge rule applied:** Visible copy must match COPIE; URLs/slugs/schema/nav preserved from live unless COPIE changed them.

---

## 1. Executive summary

| Verdict | Count | Pages |
|--------|-------|-------|
| **PASS** | 17 | index, services, rapid-response-troubleshooting, supplier-quality-complaint-management, ramp-up-process-stability, early-phase-risk-design-for-quality, knowledge-gap-transition-security, case-studies, case-coated-aluminum-parts, case-production-ramp-up, about, contact, our-approach, certificates, work-journey, regions, gallery |
| **FAIL** | 1 | qms-audit-regulatory-support (P2 schema only — copy is clean) |
| **INTENTIONAL** | 1 | imprint |
| **OPEN (legal/product)** | 1 | privacy |

**Headline:** The content merge and audit-fix work already done (per `CONTENT-MERGE-REPORT.md`) holds up under independent verification. Footer tagline, procurement wording, Risk Control nav, typo fixes, gallery/index certificate swaps, and all 14 client per-page remarks are correctly implemented. COPIE parity is clean: 14 pages are an exact text match, and every drift is an intended checklist fix (not a regression). **One genuine defect remains** and one cleanup item before deploy.

### Top 5 blockers for client sign-off

1. **qms-audit-regulatory-support — FAQPage schema is missing 1 of 4 visible FAQs** (P2). Visible FAQ has 4 questions; JSON-LD lists only 3 (missing *"What differentiates MediMotive from other Auditors or Regulatory Support providers?"*). Rich-result eligibility incomplete. Auto-fixable.
2. **`__perm_test.txt` (empty file) still at site root** (P2). Flagged for deletion at merge; still present. Delete before deploy.
3. **Privacy policy still `noindex` + draft + Strato DE-only template** (OPEN — legal). Needs counsel review; English translation and optional lawyer auto-update embed pending. *This is a known/expected hold, not a build error.*
4. **Imprint "Company in formation / under construction" notice intentionally removed** (INTENTIONAL). Confirm with counsel whether the formation notice must be restored to avoid *Abmahnung* risk before go-live — this is a legal decision, not a bug.
5. **German homepage not published** (OPEN — product). `de/index.html` is the offline fallback by design; full DE homepage in COPIE is unpublished. Out of EN scope but worth a conscious go/no-go.

---

## 2. Per-page matrix

| # | Page | Quick | Risk Control btn | Footer | Procurement | Remark | COPIE parity | SEO/Schema | Verdict |
|---|------|-------|------------------|--------|-------------|--------|--------------|------------|---------|
| 01 | index | ✅ | ✅ | ✅ | ✅ | ✅ | ✅* | ✅ | **PASS** |
| 02 | services | ✅ | ✅ | ✅ | ✅ | ✅ FDA/ISO FAQ | ✅* | ✅ 6/6 FAQ | **PASS** |
| 03 | rapid-response-troubleshooting | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ MATCH | ✅ 4/4 FAQ | **PASS** |
| 04 | supplier-quality-complaint-management | ✅ | ✅ | ✅ | ✅ | ✅ EU/Asia + cultural | ✅* | ✅ 5/5 FAQ | **PASS** |
| 05 | ramp-up-process-stability | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ MATCH | ✅ 4/4 FAQ | **PASS** |
| 06 | early-phase-risk-design-for-quality | ✅ | ✅ | ✅ | ✅ | ✅ | ✅* | ✅ 4/4 FAQ | **PASS** |
| 07 | qms-audit-regulatory-support | ✅ | ✅ | ✅ | ✅ | ✅ standards | ✅ MATCH | ❌ **3/4 FAQ** | **FAIL (P2)** |
| 08 | knowledge-gap-transition-security | ✅ | ✅ | ✅ | ✅ | ✅ both paras | ✅* | ✅ 3/3 FAQ | **PASS** |
| 09 | case-studies | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ MATCH | ✅ | **PASS** |
| 10 | case-coated-aluminum-parts | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ MATCH | ✅ | **PASS** |
| 11 | case-production-ramp-up | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ MATCH | ✅ | **PASS** |
| 12 | about | ✅ | ✅ | ✅ | ✅ | ✅ admin/intl shift | ✅ MATCH | ✅ mgmt not escalation | **PASS** |
| 13 | contact | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ MATCH | ✅ | **PASS** |
| 14 | our-approach | ✅ | ✅ | ✅ | ✅* | ✅ | ✅ MATCH | ✅ | **PASS** |
| 15 | certificates | ✅ | ✅ | ✅ | ✅ | ✅ RA-Manager + Core Tools | ✅ MATCH | ✅ | **PASS** |
| 16 | work-journey | ✅ | ✅ | ✅ | ✅ | ✅ intercultural | ✅ MATCH | ✅ | **PASS** |
| 17 | regions | ✅ | ✅ | ✅ | ✅ | ✅ Tuttlingen | ✅ MATCH | ✅ | **PASS** |
| 18 | gallery | ✅ | ✅ | ✅ | ✅ | ✅ ISO 14001 preview | ✅ MATCH | ✅ noindex | **PASS** |
| 19 | imprint | ✅ | ✅ | ✅ | ✅ | ⏭️ notice removed | ⏭️ INTENTIONAL | ✅ noindex | **INTENTIONAL** |
| 20 | privacy | ✅ | ✅ | ✅ | ✅ | ⏭️ no copy change | ✅ MATCH | ⚠️ noindex/draft | **OPEN (legal)** |

`✅*` = drift exists vs COPIE but it is an **intended checklist fix** (see §3), not a regression.
`Risk Control btn`: full label *"Early-Phase Risk Control & Design-for-Quality"* in footer on all 20; short *"04 Risk Control"* chapter-nav label on the 6 expertise-family pages; all point to the valid slug `/services/early-phase-risk-design-for-quality`. No broken/typo slugs anywhere.

---

## 3. Failures & drift detail

### 3.1 FAIL — qms-audit-regulatory-support.html (P2, schema)

- **File:** `qms-audit-regulatory-support.html`, FAQ section ~line 232–250 vs its FAQPage JSON-LD block.
- **Expected (checklist cross-check C):** FAQPage JSON-LD question count and text match the visible `<details>` FAQs.
- **Actual:** 4 visible questions, only 3 in schema. Missing from JSON-LD:
  > *"What differentiates MediMotive from other Auditors or Regulatory Support providers?"*
- **Severity:** P2 — does not affect rendered copy or layout; reduces FAQ rich-result completeness. Not flagged in `CONTENT-MERGE-REPORT.md` (that pass synced services + supplier schema only).
- **Fix:** Add the missing Question/Answer object to `mainEntity`, matching the visible answer text. Safe auto-fix.

### 3.2 Intended drifts vs COPIE (NOT failures — verification trail)

All COPIE-vs-live text differences resolve to checklist-mandated fixes:

| Page | COPIE text | Live text | Why correct |
|------|-----------|-----------|-------------|
| index | "purchasing decisions"; "DGQ . ISO" | "procurement decisions"; "DGQ · ISO 14001" | Purchase→Procurement rule + typo fix |
| services | "root cause" (singular); spaced em-dash | canonical footer tagline ("root causes") | Footer must match word-file exactly |
| supplier | "help us **finding** a new reliable supplier" | "help us **find** …" | Grammar fix (in merge report) |
| early-phase | footer line "Quality problems are rarely contained inside one function… finds the real failure path…" | canonical footer tagline | This is the **footer** founder line (line 276, inside `<footer>`), normalized to the required exact tagline — COPIE still had the old footer here |
| knowledge-gap | "regulatory **standars**" | "regulatory **standards**" | Typo fix |
| imprint | "Company in formation… under construction" | removed | **INTENTIONAL SKIP** (launch-clean) |

### 3.3 OPEN (legal/product — no code defect)

- **privacy.html** — `noindex, follow`, draft meta, English translation of Strato DE template. Counsel review + optional lawyer auto-update embed pending. Matches checklist expectation; no copy change was requested by client.
- **imprint formation notice** — removed at merge; restore only if counsel requires.
- **de/index.html** — offline fallback by design; full DE homepage unpublished.

---

## 4. Fix batch recommendation

### Auto-fix (safe — copy/meta/schema sync)
1. **qms-audit-regulatory-support.html** — add the 4th FAQ ("What differentiates MediMotive…") to the FAQPage JSON-LD so schema = 4 visible questions.
2. **Delete `__perm_test.txt`** (empty) from site root before deploy.

### Needs client / legal decision
1. **Privacy** — counsel review; decide on English-vs-DE publication and the lawyer auto-update link before removing `noindex`.
2. **Imprint** — confirm whether the "Company in formation / under construction" notice must be restored for *Abmahnung* protection.
3. **German homepage** — go/no-go on publishing the COPIE DE homepage vs keeping the offline fallback.

### Already fixed (do NOT re-recommend — confirmed live)
Verified present and correct, matching `CONTENT-MERGE-REPORT.md`:
- Footer tagline exact on all 20 pages (incl. em-dash spacing).
- Gallery preview = ISO 14001 (VDA 6.3 removed); homepage carousel = ISO 14001 lead + DGQ AI tools (overdue VDA preview removed).
- Typos cleared sitewide: `Phillipines`, `orS`, `standars`, `DGQ . ISO`.
- Procurement wording in supplier meta/OG/Twitter; about uses "supplier management" not "escalation".
- services + supplier FAQPage schema synced (6/6, 5/5).
- Homepage XING footer = live link (no `social-link--static`).
- Certificates: "Regulatory Affairs Manager" (not Risk Manager); "Automotive Core Tools" present.
- All per-page client remarks (rows 02–17) implemented.

---

## 5. Verification commands run

| Check | Command (essence) | Result |
|-------|-------------------|--------|
| Page inventory | `ls *.html` in live + COPIE | All 20 EN pages present in both |
| Footer tagline exact | grep `root causes — in production` + `regulatory systems—and` ×20 | **PASS** all 20 (exact dash pattern) |
| Risk Control nav | grep `04 Risk Control`, full footer label, slug refs | Short label on 6 expertise pages; full label all 20; valid slug |
| Service slugs | `grep -rhoE '/services/[a-z-]+'` sorted unique | Only 6 valid slugs; no typos |
| Procurement | `grep -i purchasing` ×20 + visible-text strip on our-approach | No visible/meta "purchasing" (only CSS class/asset names) |
| Typo patterns | grep `Phillipines\|orS\|standars\|DGQ . ISO` | None (index "DGQ ·" is middot, correct) |
| noindex | `grep -ci noindex` ×20 | Only gallery, imprint, privacy |
| Per-page remarks | targeted greps (FDA/ISO, EU/Asia FAQ, Tuttlingen, RA-Manager, intercultural, ISO 14001 preview…) | All implemented |
| COPIE parity | Python visible-text segment diff live vs COPIE ×20 | 14 MATCH; drifts all intended (§3.2) |
| JSON-LD valid | Python `json.loads` on every `ld+json` block ×20 | All parse |
| FAQ schema vs visible | Python: count `<summary>` vs FAQPage `mainEntity` | services 6/6, supplier 5/5, rapid 4/4, ramp 4/4, early 4/4, knowledge 3/3, **qms 4 visible / 3 schema → MISMATCH** |
| Footer chrome | Python footer `<h4>` count + XING/LinkedIn/static/founder | 4-col structure consistent; XING+LinkedIn live; no `social-link--static`; `/about#founder` present all 20 |
| Breadcrumbs | presence check + `.html` in breadcrumb items | Present except index/imprint/privacy; no `.html` |
| Canonical/SEO | Python canonical regex ×20 | All `https://medimotive.de/…`, no `.html`; 1 title + 1 description each |
| Responsive | inline fixed-width/nowrap scan on services/about/supplier | No inline overflow culprits *(true ≤920/≤640 render not performed — recommend a visual spot-check)* |
| `npm run verify:content` | vs `archive/content-freeze-2026-05-27` | "FAIL drift" on ~all pages — **expected**: baseline is May freeze, not COPIE. Post-merge content updates intentionally differ. Interpret separately. |

---

### Bottom line
The site is content-clean for EN sign-off. **One P2 schema fix (qms FAQ) + one file deletion** are the only build-side actions; the remaining three items are conscious legal/product decisions. Recommend doing the two auto-fixes, then proceeding to launch on the EN pages while privacy/imprint clear counsel.
