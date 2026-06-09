# CURSOR BRIEF — MediMotive / Expertise Pages Consistency + SEO Pass
**Task:** Fix all content inconsistencies and SEO meta descriptions across services.html and the six expertise detail pages.  
**Date:** 2026-06-01  
**Mode:** A — Client Website Delivery  
**Stack:** Plain HTML + CSS — no framework, no build step required for these changes  
**Source of truth:** `source-truth/00-positioning-source-truth.md`, `source-truth/09-voice-and-banned.md`, `source-truth/expertise-detail-content-audit.md`

---

## Context

MediMotive is a static HTML website for Björn Seiler's manufacturing quality evidence hub. The homepage and expertise hub (`services.html`) have already been corrected. This session fixes five specific issues across `services.html` and the six expertise detail pages. Do not change any CSS, JS, images, or content beyond what is listed below. Do not rewrite copy that is not listed in this brief.

---

## Files in scope

- `services.html`
- `knowledge-gap-transition-security.html`
- `supplier-quality-complaint-management.html`
- `ramp-up-process-stability.html`
- `early-phase-risk-design-for-quality.html`

All other HTML files are out of scope for this session.

---

## Fix 1 — Bento card micro-errors on `services.html`

**Four targeted text corrections. Do not touch anything else on this page.**

### 1A — Card 02: missing space in R&D list item

**Find:**
```html
<li>Technical bridge across R&amp;D,procurement, supplier and QA Teams.</li>
```
**Replace with:**
```html
<li>Technical bridge across R&amp;D, purchasing, supplier and QA teams.</li>
```
*(Added space after comma, changed "procurement" to "purchasing" to match source-truth language, lowercased "teams" for consistency with other card bullets.)*

### 1B — Card 03: Poka Yoke formatting

**Find:**
```html
<li>Poka Yoke - Workshops​</li>
```
**Replace with:**
```html
<li>Poka-Yoke workshops</li>
```
*(Correct compound hyphenation, lowercase "workshops" to match other bullets, remove trailing invisible whitespace character.)*

### 1C — Card 04: Remove "Control" from card title

The detail page H1, `<title>`, JSON-LD, breadcrumb, and navigation all use "Early-Phase Risk & Design-for-Quality". The bento card title has an extra word that makes it inconsistent.

**Find:**
```html
<h3 class="expertise-card__title">Early-Phase Risk Control &amp; Design-for-Quality</h3>
```
**Replace with:**
```html
<h3 class="expertise-card__title">Early-Phase Risk &amp; Design-for-Quality</h3>
```

### 1D — Card 05: Mixed separator and trailing whitespace

**Find:**
```html
<li>VDA 6.3 · ISO 13485 · ISO 9001 · EU-MDR . CE-conformity, Usability, Risk Management​</li>
```
**Replace with:**
```html
<li>VDA 6.3 · ISO 13485 · ISO 9001 · EU-MDR · CE-conformity, Usability, Risk Management</li>
```
*(Changed plain period before CE-conformity to interpunct · to match the separator used throughout the list. Removed trailing invisible whitespace character.)*

### 1E — Card 06: Hyphen error and trailing whitespace

**Find:**
```html
<li>Team- and Management Workshops​ (DE legal scope)</li>
```
**Replace with:**
```html
<li>Team and Management Workshops (DE legal scope)</li>
```
*(Removed erroneous hyphen after "Team", removed trailing invisible whitespace character.)*

---

## Fix 2 — Page 06 body section: remove legal disclaimer H3, align with FAQ

**File:** `knowledge-gap-transition-security.html`

The body section currently contradicts FAQ Q1. The body says MediMotive does NOT provide classroom-style training, while FAQ Q1 says MediMotive DOES prepare and hold short in-person practice workshops. Fix the body to match the FAQ.

**Find this entire block:**
```html
        <h3>Important legal boundary</h3>
        <p>In accordance with German legal requirements, MediMotive does not provide direct classroom-style training. The scope of this work is gap analysis, technical materials creation and effectiveness verification — confirming in real production behaviour that the knowledge transfer has worked. Where direct instruction is required, MediMotive connects you with vetted external training partners appropriate to the specific competence gap.</p>
```

**Replace with:**
```html
        <h3>How this works in practice</h3>
        <p>MediMotive identifies training potential, analyses competence gaps in the receiving team, and creates the technical materials needed to transfer and preserve critical knowledge — work instructions, process descriptions, decision trees, and qualification frameworks that reflect what actually happens at the machine. Short in-person practice workshops on quality methods, technical topics, or regulatory standards can be part of the approach. Where more extensive instruction is needed, MediMotive selects the right training partners and appropriate courses. Effectiveness is verified in real production behaviour — not by confirming that documents exist, but by confirming the team can operate independently without the original expert present.</p>
```

---

## Fix 3 — Page 06 FAQ Q2: missing question mark

**File:** `knowledge-gap-transition-security.html`

**Find:**
```html
<summary><span class="ed-faq__q">What happens before a critical person retires or leaves</span></summary>
```
**Replace with:**
```html
<summary><span class="ed-faq__q">What happens before a critical person retires or leaves?</span></summary>
```

---

## Fix 4 — Meta descriptions: replace "evidence hub" wrapper on four pages

Each fix below must be applied to **three tags per page**: `<meta name="description">`, `<meta property="og:description">`, and `<meta name="twitter:description">`. All three must match exactly.

Also update the `"description"` value in the `WebPage` node inside the page's `<script type="application/ld+json">` block to a shortened version (under 160 chars, plain text, no quotes issues).

---

### 4A — `supplier-quality-complaint-management.html`

**Find (all three meta tags):**
```
Supplier quality and complaint management within MediMotive's evidence hub — OEM escalation, QSV review, and technical communication across purchasing, production, and suppliers.
```
**Replace with:**
```
Complaint loops that never reach root cause, OEM Level 2 escalation, and quality agreements signed without understanding the full obligation — MediMotive starts at the specification gap.
```

**JSON-LD WebPage description — find:**
```
"description":"Supplier quality and complaint management — OEM escalation, QSV review, and technical communication."
```
**Replace with:**
```
"description":"Supplier quality and complaint management — complaint loops, OEM escalation, QSV review, and technical communication across purchasing, production, and suppliers."
```

---

### 4B — `ramp-up-process-stability.html`

**Find (all three meta tags):**
```
Ramp-up and process stability within MediMotive's evidence hub — line design, supplier co-engineering, and validation so scaling does not trade quality for speed.
```
**Replace with:**
```
When demand outgrows informal processes, quality failures follow. MediMotive connects line design, supplier co-engineering and validation logic so scaling does not trade stability for speed.
```

**JSON-LD WebPage description — find:**
```
"description":"Ramp-up and process stability — line design, supplier co-engineering, and validation at scale."
```
**Replace with:**
```
"description":"Ramp-up and process stability — line design, supplier co-engineering, and validation logic so scaling does not trade quality stability for speed."
```

---

### 4C — `early-phase-risk-design-for-quality.html`

**Find (all three meta tags):**
```
Early-phase risk and design-for-quality within MediMotive's evidence hub — manufacturability review, tolerance risk, and specification gaps before production starts.
```
**Replace with:**
```
The cheapest defect is the one that never enters production. MediMotive reviews manufacturability, tolerances and unspoken customer expectations before the first chip is cut.
```

**JSON-LD WebPage description — find:**
```
"description":"Early-phase risk and design-for-quality — manufacturability review and specification gaps before production."
```
**Replace with:**
```
"description":"Early-phase risk and design-for-quality — manufacturability review, tolerance stack risk, and specification gaps closed before the first chip is cut."
```

---

### 4D — `knowledge-gap-transition-security.html`

**Find (all three meta tags):**
```
Knowledge gap and transition security within MediMotive's evidence hub — preserving critical know-how through gap analysis, materials creation, and verification.
```
**Replace with:**
```
When critical process knowledge sits with one person, it is also a company risk. MediMotive identifies the gap, creates transferable materials, and verifies the team can operate independently.
```

**JSON-LD WebPage description — find:**
```
"description":"Knowledge gap and transition security — preserving critical know-how through materials and verification."
```
**Replace with:**
```
"description":"Knowledge gap and transition security — gap analysis, transferable materials, and team verification before a critical person leaves."
```

---

## Verification checklist — run after all changes

After saving all files, open each in a browser or check the raw HTML and confirm:

- [ ] `services.html` bento cards: no trailing whitespace, consistent separators, "Early-Phase Risk & Design-for-Quality" (no "Control"), "R&D, purchasing" (with space), "Poka-Yoke workshops" (hyphenated), interpunct before CE-conformity, "Team and Management Workshops" (no hyphen after Team)
- [ ] `knowledge-gap-transition-security.html` body: H3 now reads "How this works in practice", no "German legal requirements" citation, no "Important legal boundary" heading
- [ ] `knowledge-gap-transition-security.html` FAQ Q2: ends with question mark
- [ ] All four updated pages: `<meta name="description">`, `<meta property="og:description">`, and `<meta name="twitter:description">` all match and contain no "within MediMotive's evidence hub"
- [ ] JSON-LD WebPage `"description"` on all four pages: updated, no HTML entities, under 160 characters
- [ ] No other content changed on any page not listed above

---

## What is NOT in this session

- Do not change any CSS, JS, or image files
- Do not change `index.html`, `about.html`, `contact.html`, `case-studies.html`, `case-coated-aluminum-parts.html`, `case-production-ramp-up.html`, `qms-audit-regulatory-support.html`, `rapid-response-troubleshooting.html`, or any other HTML file not named above
- Do not rewrite any body copy, FAQ answers, hero leads, or H2 headlines not listed in this brief
- Do not add, remove, or reorder any sections
- Do not change the navigation, footer, or schema.org structured data beyond the WebPage description fields listed above

---

## BUILD SUMMARY — Fill and paste back to Claude after Cursor session

```
Date:
Task: Expertise pages consistency + SEO pass
Files modified:
  - services.html
  - knowledge-gap-transition-security.html
  - supplier-quality-complaint-management.html
  - ramp-up-process-stability.html
  - early-phase-risk-design-for-quality.html

Changes made (check each):
  [ ] Fix 1A — R&D, purchasing space (services.html card 02)
  [ ] Fix 1B — Poka-Yoke workshops (services.html card 03)
  [ ] Fix 1C — Early-Phase Risk card title (services.html card 04)
  [ ] Fix 1D — Interpunct separator (services.html card 05)
  [ ] Fix 1E — Team and Management Workshops (services.html card 06)
  [ ] Fix 2  — Page 06 body section rewritten
  [ ] Fix 3  — Page 06 FAQ Q2 question mark added
  [ ] Fix 4A — Meta descriptions (supplier-quality)
  [ ] Fix 4B — Meta descriptions (ramp-up)
  [ ] Fix 4C — Meta descriptions (early-phase-risk)
  [ ] Fix 4D — Meta descriptions (knowledge-gap)

Copy deviations from brief (or "none"):
Blockers or unexpected issues:
```
