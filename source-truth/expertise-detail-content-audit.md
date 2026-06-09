# Expertise detail pages — content audit (status)

**Date:** 2026-05-31 (updated after copy pass)  
**Canonical copy:** [12-expertise-pages.md](12-expertise-pages.md) — use that file when editing FAQs or the expertise hub connect section.

---

## Resolved in live HTML (2026-05-31)

| Item | Resolution |
|------|------------|
| Hub “How the areas connect” | Observe/Translate/Stabilise/Transfer cards removed → `.connect-prose` on `services.html` ([12-expertise-pages.md](12-expertise-pages.md)) |
| Detail FAQs 01–06 | Client-approved Q&A sets shipped; intro links to `services.html#faq` |
| FAQ counts | 4 on pages 01–04; **3** on pages 05–06 (removed “verified outcomes” FAQ) |
| FAQ intro layout | Centered H2 + intro on `.expertise-detail-page` (`expertise-detail.css` / `input.css`) |
| Page 06 FAQ legal voice | FAQ Q1 no longer cites “German legal requirements”; describes workshops + partners |
| Page 05 standards list | FAQ Q2 includes IATF 16949, VDA 6.3, ISO family, EU-MDR, OHAS, etc. |
| Footer founder portrait | Portrait + name → `about.html#founder` (XING remains in footer social list per [08-contact-and-facts.md](08-contact-and-facts.md)) |

---

## Still open (not blocking FAQ canonical copy)

### O1 · Page 06 body vs FAQ (training scope)

**Where:** `knowledge-gap-transition-security.html` — H3 “Important legal boundary” + body still says no direct classroom-style training; FAQ Q1 allows short in-person practice workshops.  
**Action:** Align body with [12-expertise-pages.md](12-expertise-pages.md) FAQ Q1 and [00-positioning-source-truth.md](00-positioning-source-truth.md) §10 (no unnamed legal citation; lead with what MediMotive does).  
**Priority:** High for voice consistency before employer-facing review.

### O2 · Meta descriptions — “evidence hub” wrapper (pages 02, 03, 04, 06)

**Problem:** Passive structural phrase weakens CTR vs page 01 style.  
**Suggested rewrites:** Still in the May 2026 audit below — apply only with client approval; do not change `<meta>` without explicit request.

<details>
<summary>Suggested meta copy (unchanged from pre-FAQ audit)</summary>

- **02:** Complaint loops that never reach root cause, OEM Level 2 escalation, and quality agreements signed without understanding the full obligation — MediMotive starts at the specification gap.
- **03:** When demand outgrows informal processes, quality failures follow. MediMotive connects line design, supplier co-engineering and validation logic so scaling does not trade stability for speed.
- **04:** The cheapest defect is the one that never enters production. MediMotive reviews manufacturability, tolerances and unspoken customer expectations before the first chip is cut.
- **06:** When critical process knowledge sits with one person, it is also a company risk. MediMotive identifies the gap, creates transferable materials, and verifies the team can operate independently.

</details>

### O3 · Case 01 — $600k scrap figure only on page 04

**Assessment:** Intentional angle per page (investigation / specification / prevention). Optional: add scrap figure to page 02 if client wants consistent quantified proof across Case 01 references.

### O4 · Pages 05–06 — no `ed-case-callout` block

**Assessment:** Structural choice after FAQ trim; credentials list on 05 remains. Optional generalised outcome callout — only with real or approved generalised language (no fabricated case data).

### O5 · IATF in body copy (not only FAQ)

**Where:** Page 05 FAQ lists IATF 16949; hero/body on pages 01 and 05 may still omit IATF for employer SEO — optional one natural sentence in body if approved.

### O6 · JSON-LD Person entity

Low priority post-launch E-E-A-T enhancement.

---

## Page snapshot (post–FAQ pass)

| Page | Voice | FAQ canonical | Meta | Body / structure |
|------|-------|---------------|------|------------------|
| 01 Rapid Response | ✓ | ✓ [12-expertise-pages](12-expertise-pages.md) | ✓ | ✓ |
| 02 Supplier Quality | ✓ | ✓ | △ evidence hub | ✓ |
| 03 Ramp-Up | ✓ | ✓ | △ evidence hub | ✓ |
| 04 Early-Phase | ✓ | ✓ | △ evidence hub | ✓ |
| 05 QMS | ✓ | ✓ (3 FAQs) | ✓ | △ no case callout |
| 06 Knowledge Gap | △ body legal H3 | ✓ (3 FAQs) | △ evidence hub | △ body vs FAQ |

---

## Historical audit items (archived)

The following were filed **before** the 2026-05-31 FAQ/hub copy pass. Do not re-apply obsolete fixes (e.g. restoring “German legal requirements” in FAQ, or fourth “verified outcomes” FAQ on 05/06).

- **C2 (old):** Legal phrase in FAQ — **FAQ fixed**; body on page 06 still needs O1.
- **C3:** Meta descriptions — see O2.
- **C1:** $600k scrap — see O3.
- **S1–S3:** Case callouts, IATF body, legal H3 — see O3–O5.

---

*For full pre-change narrative, see git history of this file. Live HTML is source of truth until [12-expertise-pages.md](12-expertise-pages.md) is updated again.*
