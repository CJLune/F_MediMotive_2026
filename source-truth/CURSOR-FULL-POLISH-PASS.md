# CURSOR BRIEF — MediMotive / Full Polish Pass (Content · SEO · UX)
**Task:** Apply all approved content, SEO, and UX fixes across the full site.  
**Date:** 2026-06-01  
**Mode:** A — Client Website Delivery  
**Stack:** Plain HTML + CSS — no build step required for these changes  
**Supersedes:** `CURSOR-EXPERTISE-CONSISTENCY-SEO.md` — do not run that brief separately; this brief covers everything in it plus additional fixes.  
**Source of truth:** `source-truth/00-positioning-source-truth.md`, `source-truth/09-voice-and-banned.md`, `source-truth/expertise-detail-content-audit.md`

---

## Critical rules before you start

- Do not change any CSS, JS, or image files
- Do not rewrite any body copy, FAQ answers, hero text, H2 headlines, or case narratives beyond the exact strings listed below
- Do not add, remove, or reorder any sections
- Use exact find/replace strings as given — do not paraphrase
- Work through each Part in order, file by file
- If a find string is not found on a page, skip it — do not modify the page in any other way

---

## PART A — Sitewide footer brand description (all HTML files in root)

This is a find/replace across **every `.html` file in the project root directory** (not in `archive/`, `node_modules/`, or any subdirectory). Pages that already have the new text will not match the old string and will be skipped automatically.

**Find this exact string:**
```
MediMotive is a practical manufacturing-quality evidence hub for shop-floor quality, supplier escalation, QMS, regulatory affairs, and transition security.
```

**Replace with:**
```
Quality problems are rarely contained inside one function. MediMotive finds the real failure path — in production, at the supplier interface, and across quality and regulatory systems — and turns it into practical, repeatable action.
```

Run this find/replace first. Then proceed to the file-specific fixes below.

---

## PART B — `index.html` (homepage)

**One change only.**

### B1 · Homepage closing CTA button

**Find:**
```html
<a class="btn btn-primary" href="contact.html" data-track="homepage_contact_click">Contact Us</a>
```
**Replace with:**
```html
<a class="btn btn-primary" href="contact.html" data-track="homepage_contact_click">Start the conversation</a>
```

---

## PART C — `services.html` (expertise hub bento cards)

**Five micro-corrections to bento card bullet text. Do not touch any other content on this page.**

### C1 · Card 02 — missing space in R&D bullet

**Find:**
```html
<li>Technical bridge across R&amp;D,procurement, supplier and QA Teams.</li>
```
**Replace with:**
```html
<li>Technical bridge across R&amp;D, purchasing, supplier and QA teams.</li>
```

### C2 · Card 03 — Poka Yoke formatting

**Find:**
```html
<li>Poka Yoke - Workshops​</li>
```
**Replace with:**
```html
<li>Poka-Yoke workshops</li>
```
*(The original contains an invisible trailing whitespace character — remove it.)*

### C4 · Card 05 — Mixed separator before CE-conformity

**Find:**
```html
<li>VDA 6.3 · ISO 13485 · ISO 9001 · EU-MDR . CE-conformity, Usability, Risk Management​</li>
```
**Replace with:**
```html
<li>VDA 6.3 · ISO 13485 · ISO 9001 · EU-MDR · CE-conformity, Usability, Risk Management</li>
```
*(Changed plain period before CE-conformity to interpunct ·. Removed trailing invisible whitespace.)*

### C5 · Card 06 — Hyphen error and trailing whitespace

**Find:**
```html
<li>Team- and Management Workshops​ (DE legal scope)</li>
```
**Replace with:**
```html
<li>Team and Management Workshops (DE legal scope)</li>
```

---

## PART D — Meta descriptions on four expertise detail pages

Each fix below must be applied to **three tags per page**: `<meta name="description">`, `<meta property="og:description">`, and `<meta name="twitter:description">`. All three must match exactly. Also update the `"description"` value in the `WebPage` node inside the page's `<script type="application/ld+json">` block.

### D1 · `supplier-quality-complaint-management.html`

**Find in all three meta tags:**
```
Supplier quality and complaint management within MediMotive's evidence hub — OEM escalation, QSV review, and technical communication across purchasing, production, and suppliers.
```
**Replace with:**
```
Complaint loops that never reach root cause, OEM Level 2 escalation, and quality agreements signed without understanding the full obligation — MediMotive starts at the specification gap.
```

**Find in JSON-LD WebPage description:**
```
"description":"Supplier quality and complaint management — OEM escalation, QSV review, and technical communication."
```
**Replace with:**
```
"description":"Supplier quality and complaint management — complaint loops, OEM escalation, QSV review, and technical communication across purchasing, production, and suppliers."
```

---

### D2 · `ramp-up-process-stability.html`

**Find in all three meta tags:**
```
Ramp-up and process stability within MediMotive's evidence hub — line design, supplier co-engineering, and validation so scaling does not trade quality for speed.
```
**Replace with:**
```
When demand outgrows informal processes, quality failures follow. MediMotive connects line design, supplier co-engineering and validation logic so scaling does not trade stability for speed.
```

**Find in JSON-LD WebPage description:**
```
"description":"Ramp-up and process stability — line design, supplier co-engineering, and validation at scale."
```
**Replace with:**
```
"description":"Ramp-up and process stability — line design, supplier co-engineering, and validation logic so scaling does not trade quality stability for speed."
```

---

### D3 · `early-phase-risk-design-for-quality.html`

**Find in all three meta tags:**
```
Early-phase risk and design-for-quality within MediMotive's evidence hub — manufacturability review, tolerance risk, and specification gaps before production starts.
```
**Replace with:**
```
The cheapest defect is the one that never enters production. MediMotive reviews manufacturability, tolerances and unspoken customer expectations before the first chip is cut.
```

**Find in JSON-LD WebPage description:**
```
"description":"Early-phase risk and design-for-quality — manufacturability review and specification gaps before production."
```
**Replace with:**
```
"description":"Early-phase risk and design-for-quality — manufacturability review, tolerance stack risk, and specification gaps closed before the first chip is cut."
```

---

### D4 · `knowledge-gap-transition-security.html`

**Find in all three meta tags:**
```
Knowledge gap and transition security within MediMotive's evidence hub — preserving critical know-how through gap analysis, materials creation, and verification.
```
**Replace with:**
```
When critical process knowledge sits with one person, it is also a company risk. MediMotive identifies the gap, creates transferable materials, and verifies the team can operate independently.
```

**Find in JSON-LD WebPage description:**
```
"description":"Knowledge gap and transition security — preserving critical know-how through materials and verification."
```
**Replace with:**
```
"description":"Knowledge gap and transition security — gap analysis, transferable materials, and team verification before a critical person leaves."
```

---

## PART E — `knowledge-gap-transition-security.html` (body + FAQ)

**Two additional fixes on this page beyond Part D.**

### E1 · Body section — replace "Important legal boundary" H3 and paragraph

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

### E2 · FAQ Q2 — missing question mark

**Find:**
```html
<summary><span class="ed-faq__q">What happens before a critical person retires or leaves</span></summary>
```
**Replace with:**
```html
<summary><span class="ed-faq__q">What happens before a critical person retires or leaves?</span></summary>
```

---

## PART F — `case-studies.html` (case studies hub)

**Three fixes on this page.**

### F1 · Meta description — remove "evidence hub" phrase

**Find in all three meta tags** (`meta name="description"`, `og:description`, `twitter:description`):
```
Verified outcomes from MediMotive's manufacturing-quality evidence hub: field exposure reversed through process redesign and ramp-up from 100 units per year to 1,500 per month.
```
**Replace with:**
```
Two verified production outcomes — $1M field exposure reversed through process redesign, and ramp-up from 100 units per year to 1,500 per month in 12 months.
```

### F2 · Case 01 card — "near $1M" → "$1M"

**Find:**
```html
<h3>From near $1M field exposure to 75% lower part cost</h3>
```
**Replace with:**
```html
<h3>From $1M field exposure to 75% lower part cost</h3>
```

### F3 · Case 02 card — add 30% cost metric to H3

**Find:**
```html
<h3>From 100 units per year to 1,500 per month</h3>
```
**Replace with:**
```html
<h3>From 100 units per year to 1,500 per month — 30% lower per-piece cost</h3>
```

---

## PART G — `case-coated-aluminum-parts.html` (Case 01 detail)

**Four fixes on this page.**

### G1 · og:description — replace vague phrase with specific figures

**Find:**
```html
  <meta property="og:description" content="Field exposure reversed through process redesign — 75% part-cost reduction and measurable scrap recovery." />
```
**Replace with:**
```html
  <meta property="og:description" content="How a food-safety field exposure near $1M was reversed through process redesign — 75% part-cost reduction, lead time from 12 weeks to 5 days." />
```

### G2 · Add complete social meta stack

**Find:**
```html
  <meta property="og:image" content="https://medimotive.de/assets/images/og-medimotive.jpg" />
```
**Replace with:**
```html
  <meta property="og:image" content="https://medimotive.de/assets/images/og-medimotive.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="MediMotive — manufacturing quality case study" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Case 01 · Recall Reversal | MediMotive" />
  <meta name="twitter:description" content="How a food-safety field exposure near $1M was reversed through process redesign — 75% part-cost reduction, lead time from 12 weeks to 5 days." />
  <meta name="twitter:image" content="https://medimotive.de/assets/images/og-medimotive.jpg" />
```

### G3 · Add JSON-LD structured data

**Find:**
```html
  <link rel="stylesheet" href="assets/fonts/fonts.css">
  <link rel="stylesheet" href="assets/styles.css" />
</head>
```
**Replace with:**
```html
  <link rel="stylesheet" href="assets/fonts/fonts.css">
  <link rel="stylesheet" href="assets/styles.css" />
  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"MediMotive","item":"https://medimotive.de/"},{"@type":"ListItem","position":2,"name":"Case Studies","item":"https://medimotive.de/case-studies.html"},{"@type":"ListItem","position":3,"name":"Case 01 · Recall Reversal","item":"https://medimotive.de/case-coated-aluminum-parts.html"}]},{"@type":"WebPage","name":"Case 01 · Recall Reversal | MediMotive Case Studies","description":"How a food-safety field exposure near $1M was reversed through process redesign — 75% part-cost reduction and lead time from 12 weeks to 5 days.","url":"https://medimotive.de/case-coated-aluminum-parts.html","isPartOf":{"@type":"WebSite","name":"MediMotive","url":"https://medimotive.de/"}}]}</script>
</head>
```

### G4 · Case 01 narrative — currency clarification in step 04

**Find:**
```html
<p>The €400k project investment was fully recouped through scrap savings alone within months.
```
**Replace with:**
```html
<p>The €400k project cost was fully recouped through scrap savings alone within months — against a field exposure that had already reached $1M.
```
*(Do not change anything else in this paragraph — only the opening sentence.)*

### G5 · Related expertise link — fix "Production troubleshooting" label

**Find:**
```html
<a class="link" href="rapid-response-troubleshooting.html">Production troubleshooting</a>
```
**Replace with:**
```html
<a class="link" href="rapid-response-troubleshooting.html">Rapid Response Troubleshooting</a>
```

---

## PART H — `case-production-ramp-up.html` (Case 02 detail)

**Two fixes on this page.**

### H1 · Add complete social meta stack

**Find:**
```html
  <meta property="og:image" content="https://medimotive.de/assets/images/og-medimotive.jpg" />
```
**Replace with:**
```html
  <meta property="og:image" content="https://medimotive.de/assets/images/og-medimotive.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="MediMotive — manufacturing quality case study" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Case 02 · Ramp-Up Stability | MediMotive" />
  <meta name="twitter:description" content="How production scaled from 100 units per year to 1,500 per month in 12 months — 30% per-piece cost reduction, zero quality failures on first shipment." />
  <meta name="twitter:image" content="https://medimotive.de/assets/images/og-medimotive.jpg" />
```

### H2 · Add JSON-LD structured data

**Find:**
```html
  <link rel="stylesheet" href="assets/fonts/fonts.css">
  <link rel="stylesheet" href="assets/styles.css" />
</head>
```
**Replace with:**
```html
  <link rel="stylesheet" href="assets/fonts/fonts.css">
  <link rel="stylesheet" href="assets/styles.css" />
  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"MediMotive","item":"https://medimotive.de/"},{"@type":"ListItem","position":2,"name":"Case Studies","item":"https://medimotive.de/case-studies.html"},{"@type":"ListItem","position":3,"name":"Case 02 · Ramp-Up Stability","item":"https://medimotive.de/case-production-ramp-up.html"}]},{"@type":"WebPage","name":"Case 02 · Ramp-Up Stability | MediMotive Case Studies","description":"How production scaled from 100 units per year to 1,500 per month in 12 months — 30% per-piece cost reduction, zero quality failures on first shipment.","url":"https://medimotive.de/case-production-ramp-up.html","isPartOf":{"@type":"WebSite","name":"MediMotive","url":"https://medimotive.de/"}}]}</script>
</head>
```

---

## What is NOT in this session

- Do not change any CSS, JS, or image files
- Do not change `about.html`, `contact.html`, `our-approach.html`, `certificates.html`, `work-journey.html`, `regions.html`, `gallery.html`, `imprint.html`, `privacy.html` beyond the Part A sitewide footer find/replace
- Do not rewrite body copy, hero leads, H2 headlines, FAQ answers, or case narratives beyond the exact strings listed above
- Do not add, remove, or reorder any page sections
- Do not change the navigation, breadcrumbs, or any structured data beyond what is listed in Parts G3 and H2
- Do not modify `archive/` directory files

---

## Verification checklist — run after all changes

### Part A — Footer (sitewide)
- [ ] Open 5 random pages not named above (about, contact, our-approach, certificates, rapid-response) and confirm footer brand description now reads "Quality problems are rarely contained inside one function..."
- [ ] Confirm case study pages (case-coated-aluminum-parts, case-production-ramp-up) still have the new text (they already had it — verify it wasn't accidentally duplicated or changed)

### Part B — Homepage
- [ ] `index.html` closing CTA reads "Start the conversation"

### Part C — Services hub
- [ ] Card 02: "R&D, purchasing" (space after comma)
- [ ] Card 03: "Poka-Yoke workshops" (hyphen, lowercase)
- [ ] Card 04: "Early-Phase Risk Control & Design-for-Quality" (includes "Control")
- [ ] Card 05: interpunct · before CE-conformity (not a period)
- [ ] Card 06: "Team and Management Workshops" (no hyphen after Team)

### Part D — Expertise meta descriptions
- [ ] Pages 02, 03, 04, 06: no "within MediMotive's evidence hub" in any meta tag
- [ ] All three meta tags on each page match exactly

### Part E — Knowledge Gap page
- [ ] H3 reads "How this works in practice"
- [ ] No "German legal requirements" or "Important legal boundary" in body
- [ ] FAQ Q2 ends with question mark

### Part F — Case studies hub
- [ ] Meta description: no "evidence hub" phrase
- [ ] Case 01 card H3: "$1M" (not "near $1M")
- [ ] Case 02 card H3: includes "30% lower per-piece cost"

### Part G — Case 01 detail
- [ ] og:description: contains specific figures (not "measurable scrap recovery")
- [ ] Social meta stack complete: og:image:width, og:image:height, og:image:alt, twitter:card, twitter:title, twitter:description, twitter:image all present
- [ ] JSON-LD script block present in `<head>` with BreadcrumbList + WebPage
- [ ] Step 04 narrative: currency clarification added ("against a field exposure that had already reached $1M")
- [ ] Related expertise: "Rapid Response Troubleshooting" (not "Production troubleshooting")

### Part H — Case 02 detail
- [ ] Social meta stack complete (same 7 tags as G)
- [ ] JSON-LD script block present in `<head>` with BreadcrumbList + WebPage

---

## BUILD SUMMARY — Fill and paste back to Claude after Cursor session

```
Date:
Task: MediMotive full polish pass — content, SEO, UX

Part A — Footer sitewide:
  [ ] Completed — pages updated (list any that were skipped):

Part B — Homepage CTA:
  [ ] "Start the conversation" confirmed

Part C — Services hub bento cards:
  [ ] C1 R&D purchasing  [ ] C2 Poka-Yoke
  [ ] C4 interpunct      [ ] C5 Team and Management

Part D — Expert meta descriptions:
  [ ] D1 Supplier Quality  [ ] D2 Ramp-Up
  [ ] D3 Early-Phase       [ ] D4 Knowledge Gap

Part E — Knowledge Gap body + FAQ:
  [ ] E1 H3 + body rewritten  [ ] E2 FAQ Q2 question mark

Part F — Case studies hub:
  [ ] F1 meta description  [ ] F2 $1M  [ ] F3 30% metric

Part G — Case 01 detail:
  [ ] G1 og:description  [ ] G2 social meta  [ ] G3 JSON-LD
  [ ] G4 currency fix    [ ] G5 related link label

Part H — Case 02 detail:
  [ ] H1 social meta  [ ] H2 JSON-LD

Copy deviations from brief (or "none"):
Blockers or unexpected issues:
```
