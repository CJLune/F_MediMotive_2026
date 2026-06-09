# CURSOR BRIEF — MediMotive / About Page + Sitewide Name Fix
**Task:** Fix about.html philosophy section, pillar copy, founder quote, meta description — plus restore "Early-Phase Risk Control" name across all pages.  
**Date:** 2026-06-01  
**Mode:** A — Client Website Delivery  
**Stack:** Plain HTML only — no CSS, JS, or image changes in this session  
**Source of truth:** `source-truth/00-positioning-source-truth.md`, `source-truth/09-voice-and-banned.md`

---

## Critical rules before you start

- Do not change any CSS, JS, or image files
- Do not add, remove, or reorder any sections or HTML structure
- Do not rewrite any content beyond the exact strings listed below
- Use exact find/replace strings as given — do not paraphrase or shorten
- If a find string is not found on a page, skip it — do not modify anything else
- Work through each Part in order

---

## PART A — Sitewide: restore "Early-Phase Risk Control" name (all root HTML files)

Run **two** sitewide find/replace passes across all `.html` files in the project root (not `archive/`, `node_modules/`, or subdirectories). Pages that already have "Control" in this name will not match and will be skipped automatically.

### Pass 1 — HTML body elements (encoded ampersand)

**Find:**
```
Early-Phase Risk &amp; Design-for-Quality
```
**Replace with:**
```
Early-Phase Risk Control &amp; Design-for-Quality
```

### Pass 2 — meta tags and JSON-LD (plain ampersand)

**Find:**
```
Early-Phase Risk & Design-for-Quality
```
**Replace with:**
```
Early-Phase Risk Control & Design-for-Quality
```

Run both passes before proceeding to Part B.

---

## PART B — `about.html` only (4 changes)

### B1 · Meta description — remove "evidence hub" (3 tags)

Apply to `<meta name="description">`, `<meta property="og:description">`, and `<meta name="twitter:description">` — all three must match exactly.

**Find in all three:**
```
About MediMotive — manufacturing-quality evidence hub. Founder background, credentials, and proof in shop-floor quality, supplier escalation, QMS, and transition security.
```
**Replace with:**
```
Practical quality work close to production — MediMotive's company philosophy, founder background, and credentials behind 20+ years in manufacturing quality, supplier escalation, QMS, and regulatory work.
```

---

### B2 · Philosophy section — replace three weak paragraphs

The H2 "Built for practical quality work, not paper consulting." and the closing blockquote are correct — do not touch them. Replace only the content of `<div class="about-philosophy__copy">`.

**Find this entire block:**
```html
  <div class="about-philosophy__copy">
    <h2>Built for practical quality work, not paper consulting.</h2>
    <p><strong>Immediate Relief. Permanent Solutions.</strong></p>
    <p>When a quality crisis hits the assembly line, you don't need more paperwork—you need answers. At MediMotive, we provide rapid, hands-on intervention to solve urgent production issues on the spot and keep your business moving.</p>
    <p>But stopping the bleeding is only step one. Real quality cannot be forced onto a product at the workbench; it must be designed into it from the start.</p>
    <p>MediMotive bridges the gaps between purchasing, engineering, and production. By finding out exactly why the crisis happened, we uncover the hidden flaws in design and workflows—fixing them at the root so errors never reach your shop floor again.</p>
  </div>
```

**Replace with:**
```html
  <div class="about-philosophy__copy">
    <h2>Built for practical quality work, not paper consulting.</h2>
    <p>MediMotive was not built around a methodology document or a service catalogue. It was built around one consistent observation: most quality problems are understood in documentation before they are understood in reality — and the gap between those two things is where failures live, repeat, and become expensive.</p>
    <p>The practical starting point is always the real process. Not the quality manual version of the process, but what actually happens at the machine, between departments, across the supplier interface, and in the decisions that management makes weeks before a problem appears on the line.</p>
    <p>That is not a philosophy borrowed from a textbook. It is the result of more than 20 years of production quality work — close to machines, through supplier escalation and OEM pressure, across QMS and regulatory environments where the decisions had real financial and operational consequences.</p>
  </div>
```

---

### B3 · Organic Connectivity pillar — replace with specific, vivid copy

**Find this exact block:**
```html
    <article class="card">
      <h3>Organic Connectivity</h3>
      <p>Quality problems rarely live in one department. Purchasing, R&amp;D, suppliers, production, quality, documentation, and management decisions affect one another — and weak interfaces create expensive failures.</p>
    </article>
```

**Replace with:**
```html
    <article class="card">
      <h3>Organic Connectivity</h3>
      <p>A defect appears in assembly. The root cause is in a drawing decision. The purchasing shortcut that enabled it was made months earlier. Quality problems rarely stay inside one function — and fixing only the visible symptom without understanding where the decision was made means the failure comes back.</p>
    </article>
```

---

### B4 · Founder quote — restore canonical source-truth version

**Find:**
```
Most problems are not solved by another form. They are solved when a diverse group of people works together with the same mindset and with a common understanding.
```
**Replace with:**
```
Most problems are not solved by another form. They are solved when the right people look at the real process together.
```

---

## What is NOT in this session

- Do not change any other sections of `about.html` (hero, founder section, credentials, work journey, proof close)
- Do not touch `index.html`, `services.html`, any expertise detail page, or any case study page beyond the Part A sitewide name fix
- Do not change CSS, JS, or images
- Do not change the Shop-Floor Pragmatism or Transition Security pillar text — only Organic Connectivity (B3)
- Do not change the blockquote `"Quality work should stay close to the real process..."` — only the founder quote in the `<blockquote class="human-note">` element (B4)
- Do not change the about.html JSON-LD blocks

---

## Verification checklist

### Part A — Sitewide name fix
- [ ] Open `early-phase-risk-design-for-quality.html` — H1 reads "Early-Phase Risk Control & Design-for-Quality"
- [ ] Open `early-phase-risk-design-for-quality.html` — `<title>` includes "Early-Phase Risk Control"
- [ ] Open `services.html` — bento card 04 already has "Control" (should be unchanged)
- [ ] Open `rapid-response-troubleshooting.html` nav dropdown — "Early-Phase Risk Control & Design-for-Quality" in the dropdown panel
- [ ] Open `about.html` footer Expertise list — still reads "Early-Phase Risk Control & Design-for-Quality" (was already correct, no double-Control added)

### Part B — About page
- [ ] Meta descriptions: no "evidence hub" in any of the three tags
- [ ] Philosophy section: no "Immediate Relief. Permanent Solutions." — no "rapid, hands-on intervention" — no "keep your business moving"
- [ ] Philosophy section: three new paragraphs starting with "MediMotive was not built around..." / "The practical starting point..." / "That is not a philosophy..."
- [ ] Organic Connectivity pillar starts with "A defect appears in assembly."
- [ ] Founder quote reads: "Most problems are not solved by another form. They are solved when the right people look at the real process together."
- [ ] Blockquote `"Quality work should stay close to the real process..."` is unchanged
- [ ] Shop-Floor Pragmatism and Transition Security pillar text are unchanged
- [ ] JSON-LD on the page is unchanged

---

## BUILD SUMMARY — Fill and paste back to Claude after session

```
Date:
Task: About page + Early-Phase Risk Control name fix

Part A — Sitewide name fix:
  Pages updated (list any where name was changed):
  Pages already correct (skipped):
  Double-check: about.html footer has "Control" once only (not duplicated)?

Part B — About page:
  [ ] B1 meta descriptions (3 tags updated, no "evidence hub")
  [ ] B2 philosophy section rewritten (3 new paragraphs)
  [ ] B3 Organic Connectivity pillar replaced
  [ ] B4 founder quote restored

Copy deviations from brief (or "none"):
Blockers or unexpected issues:
```
