# Cursor Instruction — Case Studies Design Upgrade v2.1 (corrected)
# MediMotive | 2026-05-18
# REPLACES: CURSOR-CASE-STUDIES-DESIGN-UPGRADE.md (v1 — do not use)
# Review fixes: real file paths, all selectors scoped to `.case-studies-page`, unified notice styling, mobile jump nav

---

## WHAT WENT WRONG IN V1 — READ THIS FIRST

The previous instruction told Cursor to append CSS to `styles.redesign.css`.
That file is a **build source** — it gets compiled into `assets/styles.css`
by a Tailwind build step. Editing build sources triggered rebuilds and cascade
ordering problems that broke layout on other pages.

This instruction fixes that with a completely different approach:
- CSS goes in a **brand new file** that Cursor creates from scratch
- That file is linked **only** in `case-studies.html`, after `assets/styles.css`
- No build step is involved. No build source file is modified.
- The new file loads last in the cascade on that page only.

---

## SCOPE

**In scope:** `case-studies.html`, new file `assets/case-studies-upgrade.css`

**Out of scope:** Every other HTML page, header, footer, hero, featured cards, intro splits, images, `assets/app.js`, and all build CSS sources.

---

## ABSOLUTE DO-NOT-TOUCH LIST

Cursor must not modify any of these files under any circumstances:

- `assets/styles.redesign.css` — build source, do not touch
- `assets/styles.legacy.css` — build source, do not touch
- `assets/styles.css` — compiled output, never edit directly
- `assets/input.css` — build entry point, do not touch
- `package.json`, `tailwind.config.js`, `postcss.config.js` — unless explicitly asked elsewhere
- Any file not explicitly named in this instruction (including `index.html`, `contact.html`, etc.)

**Do not** add `<link rel="stylesheet" href="assets/case-studies-upgrade.css" />` to any page except `case-studies.html`.

---

## STEP 1 — CREATE THE NEW CSS FILE

**Action:** Create a new file at this exact path:

```
assets/case-studies-upgrade.css
```

The file must contain exactly the following CSS — copy verbatim. Do not reformat, reorder, or add comments.

```css
.case-studies-page .metrics-grid {
  border: none;
  border-top: 3px solid var(--brand-primary);
}

.case-studies-page .metric {
  padding: 28px 24px;
  box-shadow: none;
  position: relative;
}

.case-studies-page .metric::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(2, 115, 67, 0.45);
  border: none;
}

.case-studies-page .metric:first-child::before {
  display: none;
}

.case-studies-page .metric strong {
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  font-variant-numeric: tabular-nums;
  line-height: 1.05;
  margin-bottom: 10px;
}

.case-studies-page .metric span {
  font-size: 0.8rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
}

.case-studies-page .case-steps {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.case-studies-page .case-steps article {
  padding: 28px 26px;
  border-right: none;
  border-bottom: none;
}

.case-studies-page .case-steps article:nth-child(odd) {
  border-right: 1px solid var(--line);
}

.case-studies-page .case-steps article:nth-child(-n+2) {
  border-bottom: 1px solid var(--line);
}

.case-studies-page .case-steps h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.97rem;
  font-weight: 800;
  color: var(--brand-dark);
  line-height: 1.3;
  letter-spacing: -0.01em;
  text-transform: none;
  margin-bottom: 10px;
}

.case-studies-page .step-num {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--brand-primary);
  text-transform: uppercase;
  margin-bottom: 10px;
}

.case-studies-page .step-num__badge {
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid rgba(2, 115, 67, 0.4);
  color: var(--brand-primary);
  font-size: 0.68rem;
  font-weight: 800;
  line-height: 1;
}

.case-studies-page .notice {
  border: none;
  border-left: 4px solid var(--brand-primary);
  background: var(--brand-light);
  padding: 22px 28px;
  box-shadow: none;
  display: grid;
  gap: 12px;
}

.case-studies-page .notice__head {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--brand-dark);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0;
}

.case-studies-page .case-studies-jump {
  display: flex;
  flex-wrap: nowrap;
  gap: 0;
  border: 1px solid var(--line);
  border-radius: 0;
  justify-content: flex-start;
  margin-bottom: 28px;
  padding: 0;
}

.case-studies-page .case-studies-jump a {
  display: inline-flex;
  align-items: center;
  border-radius: 0;
  border: none;
  border-right: 1px solid var(--line);
  border-bottom: 3px solid transparent;
  background: #fff;
  padding: 11px 20px;
  flex: 1;
  justify-content: center;
  transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.case-studies-page .case-studies-jump a:last-child {
  border-right: none;
}

.case-studies-page .case-studies-jump a:hover,
.case-studies-page .case-studies-jump a:focus-visible {
  border-radius: 0;
  border-bottom-color: var(--brand-primary);
  background: var(--surface-off);
  color: var(--brand-primary);
}

@media (max-width: 920px) {
  .case-studies-page .metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .case-studies-page .metric {
    border-right: 1px solid var(--panel-divider);
    border-bottom: 1px solid var(--panel-divider);
  }

  .case-studies-page .metric:nth-child(even) {
    border-right: none;
  }

  .case-studies-page .metric:nth-last-child(-n+2) {
    border-bottom: none;
  }

  .case-studies-page .metric:last-child {
    border-bottom: none;
  }
}

@media (max-width: 640px) {
  .case-studies-page .metrics-grid {
    grid-template-columns: 1fr;
  }

  .case-studies-page .metric {
    border-right: none;
    border-bottom: 1px solid var(--panel-divider);
  }

  .case-studies-page .metric:last-child {
    border-bottom: none;
  }

  .case-studies-page .case-steps {
    grid-template-columns: 1fr;
  }

  .case-studies-page .case-steps article {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .case-studies-page .case-steps article:last-child {
    border-bottom: none;
  }

  .case-studies-page .case-studies-jump {
    flex-wrap: wrap;
  }

  .case-studies-page .case-studies-jump a {
    flex: 1 1 100%;
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .case-studies-page .case-studies-jump a:last-child {
    border-bottom: none;
  }
}
```

**Changes from original v2 CSS (intentional):**
- All selectors prefixed with `.case-studies-page` (defense in depth).
- `.case-layout .notice` → `.case-studies-page .notice` so **both** notice blocks (Case 01 + closing anonymisation) share the same left-border treatment.
- Mobile `@media (max-width: 640px)` rules added for `.case-studies-jump` (stacked tabs, no squeeze/overflow).

After creating the file, verify it was saved correctly before moving to Step 2.

---

## STEP 2 — LINK THE NEW FILE IN case-studies.html

**File:** `case-studies.html`

**Find this exact line** (currently line 29):
```html
  <link rel="stylesheet" href="assets/styles.css" />
```

**Replace with:**
```html
  <link rel="stylesheet" href="assets/styles.css" />
  <link rel="stylesheet" href="assets/case-studies-upgrade.css" />
```

This is a one-line addition. The new link goes directly after the existing stylesheet link. Nothing else on this line or surrounding lines changes.

**Do not** add this link to any other HTML file.

---

## STEP 3 — HTML CHANGES IN case-studies.html

Make five find-and-replace operations in the order listed.
Each FIND block is the exact text currently in the file.
Do not change anything outside the specified blocks.
Do not add blank lines, change indentation, or alter surrounding HTML.

**Note:** HTML-03, HTML-04, and HTML-05 change visible copy (headings and notice text). That is intentional for this upgrade. Do not change featured-card pills, hero copy, or footer.

---

### HTML-01 — Jump navigation

**FIND:**
```html
      <a href="#coated-aluminum-parts" data-track="cases_jump_01">Case 01 · Recall reversal</a>
      <a href="#production-ramp-up" data-track="cases_jump_02">Case 02 · Ramp-up stability</a>
```

**REPLACE WITH:**
```html
      <a href="#coated-aluminum-parts" data-track="cases_jump_01"><span aria-hidden="true">01 · </span>Recall reversal</a>
      <a href="#production-ramp-up" data-track="cases_jump_02"><span aria-hidden="true">02 · </span>Ramp-up stability</a>
```

*(Featured cards keep `Case 01 · …` pills — do not change.)*

---

### HTML-02 — Case 01 metric values (add line breaks for wide screens)

**FIND:**
```html
    <div class="metric"><strong>12 weeks → 5 days</strong><span>lead-time reduction</span></div>
    <div class="metric"><strong>$600k → $1.5k</strong><span>annual scrap exposure reduction</span></div>
```

**REPLACE WITH:**
```html
    <div class="metric"><strong>12 weeks<br>→ 5 days</strong><span>lead-time reduction</span></div>
    <div class="metric"><strong>$600k<br>→ $1.5k</strong><span>annual scrap exposure reduction</span></div>
```

---

### HTML-03 — Case 01 steps (add step numbers, upgrade h3 headings)

**FIND:**
```html
  <div class="case-steps">
    <article>
      <h3>The situation</h3>
      <p>A manufacturer scaled production from 200 to 2,000 units per month by moving to a high-capacity all-in-one supplier. Within a year, customers reported surface coating flaking directly into the food-processing zone — a food-safety failure that triggered a $1M field-exchange programme.</p>
    </article>
    <article>
      <h3>The hidden failure</h3>
      <p>Investigation revealed the supplier had been masking inherent material instabilities by over-processing the parts — applying multiple coating layers that lacked adhesion under mechanical stress. The company's technical specifications contained no standard for coating thickness or adhesion strength, leaving them with no legal basis to reject the parts or recover costs from the supplier.</p>
    </article>
    <article>
      <h3>The approach</h3>
      <p>Instead of finding a better coating formula — the default industry response — we conducted a clean-sheet analysis of the part itself. We identified that the failure was not a coating problem. It was a consequence of the base material's sub-surface structure. We presented the part to an entirely different category of manufacturing specialists and identified a process substitution that eliminated the failure condition at its source. The technical specifications were simultaneously rewritten to include explicit performance standards — legally binding for every future supplier.</p>
    </article>
    <article>
      <h3>The outcome</h3>
      <p>The €400k project investment was fully recouped through scrap savings alone within months. Part costs fell by 75%, saving $70 per finished machine. Annual scrap exposure dropped from $600,000 to $1,500. Lead time went from 12 weeks to 5 days. Inventory requirements fell from 3 months of stock to 2 weeks. The production capacity tripled — at a lower cost per unit than before the crisis.</p>
    </article>
  </div>
```

**REPLACE WITH:**
```html
  <div class="case-steps">
    <article>
      <div class="step-num"><span class="step-num__badge" aria-hidden="true">01</span>The situation</div>
      <h3>A scaling decision that created a $1M field exposure</h3>
      <p>A manufacturer scaled production from 200 to 2,000 units per month by moving to a high-capacity all-in-one supplier. Within a year, customers reported surface coating flaking directly into the food-processing zone — a food-safety failure that triggered a $1M field-exchange programme.</p>
    </article>
    <article>
      <div class="step-num"><span class="step-num__badge" aria-hidden="true">02</span>The hidden failure</div>
      <h3>The supplier was masking the real problem</h3>
      <p>Investigation revealed the supplier had been masking inherent material instabilities by over-processing the parts — applying multiple coating layers that lacked adhesion under mechanical stress. The company's technical specifications contained no standard for coating thickness or adhesion strength, leaving them with no legal basis to reject the parts or recover costs from the supplier.</p>
    </article>
    <article>
      <div class="step-num"><span class="step-num__badge" aria-hidden="true">03</span>The approach</div>
      <h3>Clean-sheet analysis — not a better coating</h3>
      <p>Instead of finding a better coating formula — the default industry response — we conducted a clean-sheet analysis of the part itself. We identified that the failure was not a coating problem. It was a consequence of the base material's sub-surface structure. We presented the part to an entirely different category of manufacturing specialists and identified a process substitution that eliminated the failure condition at its source. The technical specifications were simultaneously rewritten to include explicit performance standards — legally binding for every future supplier.</p>
    </article>
    <article>
      <div class="step-num"><span class="step-num__badge" aria-hidden="true">04</span>The outcome</div>
      <h3>Full investment recouped through scrap savings alone</h3>
      <p>The €400k project investment was fully recouped through scrap savings alone within months. Part costs fell by 75%, saving $70 per finished machine. Annual scrap exposure dropped from $600,000 to $1,500. Lead time went from 12 weeks to 5 days. Inventory requirements fell from 3 months of stock to 2 weeks. The production capacity tripled — at a lower cost per unit than before the crisis.</p>
    </article>
  </div>
```

---

### HTML-04 — Case 01 notice block

**FIND:**
```html
  <div class="notice">
    <strong>Why the solution is not described in full detail.</strong> The specific manufacturing method used is intentionally not disclosed here. If you are dealing with a comparable situation — a recurring surface, adhesion or coating failure where conventional inspection has not resolved the root cause — the approach is transferable. Direct email is the right starting point.
  </div>
```

**REPLACE WITH:**
```html
  <div class="notice">
    <p class="notice__head">On disclosure</p>
    <p>The specific manufacturing method used is intentionally not described here. The approach involved a process category change that, if disclosed in full, would narrow the identification of the client and supplier.</p>
    <p>If you are dealing with a comparable situation — a recurring surface, adhesion, or coating failure where conventional inspection has not resolved the root cause — the approach is transferable. Direct email is the right starting point.</p>
  </div>
```

---

### HTML-05 — Case 02 steps (add step numbers, upgrade h3 headings)

**FIND:**
```html
  <div class="case-steps">
    <article>
      <h3>The situation</h3>
      <p>A niche product went global overnight following a high-profile marketing event. Orders jumped from 100 units per year to a projected 1,500 per month. The existing assembly process was single-piece, manual and built for precision — not for volume. There was no clear path to scaling it without breaking the quality and delivery model the brand had been built on.</p>
    </article>
    <article>
      <h3>The constraint</h3>
      <p>Two simultaneous requirements made this unusually difficult. First, changed international regulations — energy efficiency directives, safety standards and RoHS — required a complete technical overhaul of the product's internal architecture. Second, the product's external design, its visual and brand identity, had to remain completely unchanged. The inside had to be re-engineered behind an unchanged exterior.</p>
    </article>
    <article>
      <h3>The approach</h3>
      <p>We assembled a cross-functional tiger team from Assembly, R&amp;D, Quality and Logistics — and extended it immediately to include the most critical suppliers. Rather than treating suppliers as vendors waiting for a specification, they co-engineered the redesign alongside the internal team from the start. The production model was redesigned from individual island assembly to dual-track in-line assembly. Two new production lines were built. Two suppliers were identified who could re-engineer both the product internals and the supply chain simultaneously.</p>
    </article>
    <article>
      <h3>The outcome</h3>
      <p>Within 12 months: production capacity reached 1,500 units per month, per-piece cost fell by 30%, full global regulatory compliance was achieved across all target markets, and the first high-volume batch shipped without quality failures. By involving key suppliers in the engineering phase from day one, the team eliminated the scaling friction that typically separates the volume ramp from quality stability.</p>
    </article>
  </div>
```

**REPLACE WITH:**
```html
  <div class="case-steps">
    <article>
      <div class="step-num"><span class="step-num__badge" aria-hidden="true">01</span>The situation</div>
      <h3>An 18,000% demand increase with no path to scaling</h3>
      <p>A niche product went global overnight following a high-profile marketing event. Orders jumped from 100 units per year to a projected 1,500 per month. The existing assembly process was single-piece, manual and built for precision — not for volume. There was no clear path to scaling it without breaking the quality and delivery model the brand had been built on.</p>
    </article>
    <article>
      <div class="step-num"><span class="step-num__badge" aria-hidden="true">02</span>The constraint</div>
      <h3>Full internal redesign behind an unchanged exterior</h3>
      <p>Two simultaneous requirements made this unusually difficult. First, changed international regulations — energy efficiency directives, safety standards and RoHS — required a complete technical overhaul of the product's internal architecture. Second, the product's external design, its visual and brand identity, had to remain completely unchanged. The inside had to be re-engineered behind an unchanged exterior.</p>
    </article>
    <article>
      <div class="step-num"><span class="step-num__badge" aria-hidden="true">03</span>The approach</div>
      <h3>Suppliers co-engineered the solution from day one</h3>
      <p>We assembled a cross-functional tiger team from Assembly, R&amp;D, Quality and Logistics — and extended it immediately to include the most critical suppliers. Rather than treating suppliers as vendors waiting for a specification, they co-engineered the redesign alongside the internal team from the start. The production model was redesigned from individual island assembly to dual-track in-line assembly. Two new production lines were built. Two suppliers were identified who could re-engineer both the product internals and the supply chain simultaneously.</p>
    </article>
    <article>
      <div class="step-num"><span class="step-num__badge" aria-hidden="true">04</span>The outcome</div>
      <h3>1,500 units per month. No quality failures on first shipment.</h3>
      <p>Within 12 months: production capacity reached 1,500 units per month, per-piece cost fell by 30%, full global regulatory compliance was achieved across all target markets, and the first high-volume batch shipped without quality failures. By involving key suppliers in the engineering phase from day one, the team eliminated the scaling friction that typically separates the volume ramp from quality stability.</p>
    </article>
  </div>
```

---

---



## STEP 4 — VERIFY BEFORE CLOSING

Use the original v2 file-system checklist, plus these v2.1 items:

**File system (original v2):**
- [ ] `assets/case-studies-upgrade.css` exists and is not empty
- [ ] Line 29 still reads `<link rel="stylesheet" href="assets/styles.css" />`
- [ ] Line 30 (new) reads `<link rel="stylesheet" href="assets/case-studies-upgrade.css" />`
- [ ] Both `.case-steps` blocks have `.step-num` divs with `.step-num__badge` spans
- [ ] Every `<article>` has exactly three children: `.step-num` div, `h3`, `p`
- [ ] Case 01 `.notice` contains `<p class="notice__head">On disclosure</p>`
- [ ] Case 02 `.case-steps` has NO notice block — do not add one
- [ ] `R&amp;D` entity in Case 02 step 03 preserved exactly
- [ ] No images moved; footer unchanged; page hero unchanged


**Browser check (open case-studies.html):**
- [ ] Metric numbers are visibly larger than before
- [ ] The metrics panel has a 3px green top border, no outer border
- [ ] Between metrics 2, 3, 4: a faint green strip appears at the top of each cell
- [ ] Case steps show in a 2-column grid (2 wide columns, not 4 narrow ones)
- [ ] Each step article shows: numbered badge + label, then h3, then paragraph
- [ ] The notice block has a 4px left green border, no surrounding border
- [ ] The jump nav is a full-width tab bar with squared corners
- [ ] At viewport width 640px or less, metrics and steps stack to single column
- [ ] The case intro images and their captions are unaffected
- [ ] The featured card section at the top is unaffected

**v2.1 additions:**

- [ ] `assets/styles.redesign.css` unchanged (**not** `styles_redesign.css`)
- [ ] `assets/styles.legacy.css` unchanged (**not** `styles_legacy.css`)
- [ ] `assets/styles.css` and `assets/input.css` unchanged
- [ ] `assets/case-studies-upgrade.css` exists; linked **only** from `case-studies.html` line 30
- [ ] `index.html`, `contact.html`, and all other pages do **not** load upgrade CSS
- [ ] Hero, featured row, intro splits, images, footer unchanged on case studies
- [ ] Jump nav OK at 375px (stacked, no horizontal scroll)
- [ ] Both `.notice` blocks use left-border style (Case 01 + closing anonymisation)
- [ ] Optional: `npm run verify:content` if copy lock applies to HTML-03/04/05