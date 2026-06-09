# MediMotive — Responsive Fix Prompt for Cursor

## Context

You are working on a production website at `/F_MediMotive_2026/`. The site uses a custom CSS architecture split across two files:
- `assets/styles.css` — global + homepage styles
- `assets/our-approach-upgrade.css` — all Our Approach page overrides

The HTML pages involved: `index.html`, `gallery.html`, `our-approach.html`.

Do NOT touch any other HTML. All fixes go in CSS only — either in the existing `@media` blocks or by appending new ones at the bottom of the relevant file. Do NOT change any desktop/large-screen styles above the 920px breakpoint unless explicitly stated.

---

## Priority 0 — Confirmed "issues" overflow (Homepage)

**File:** `assets/styles.css`  
**Component:** `.home-pattern-showcase__body` / `.home-pattern-copy`

**Problem:** `.home-pattern-copy` is `position: absolute; inset: 24px 24px 28px` inside `.home-pattern-showcase__body` which has `min-height: 9.5rem` on mobile. The copy text for Panel 0 ends with "…We help you avoiding these **issues**." On narrow screens (~360–390px), the body container is too short, and the word "issues" overflows outside its border.

**Fix inside `@media (max-width: 920px)` block (already exists near line 3151 in styles.css):**
```css
.home-pattern-showcase__body {
  min-height: 12rem;   /* was 9.5rem — give copy room to breathe */
  position: relative;  /* ensure abs child is contained */
}

.home-pattern-copy {
  position: relative;  /* collapse absolute positioning on mobile */
  inset: auto;
  padding: 0;
}
```

**Add inside `@media (max-width: 560px)` (already exists):**
```css
.home-pattern-showcase__body {
  min-height: 0;       /* let it grow naturally at very small sizes */
  padding: 20px 18px 24px;
}
```

---

## Fix 1 — Homepage: Pattern tab quotes crowding on mobile

**File:** `assets/styles.css`  
**Component:** `.home-pattern-tab`, `.home-pattern-tab__quote`

**Problem:** At `max-width: 1024px`, `.home-pattern-tab__quote` drops to `0.9rem`. There is no further reduction at 560px or 480px. Tab button 1 reads "We already fixed the problem, but it came back." — this wraps to 3 lines on 360px screens inside the fixed `2.25rem + 1fr` grid.

**Add new block at bottom of styles.css:**
```css
@media (max-width: 560px) {
  .home-pattern-tab {
    grid-template-columns: 1.75rem minmax(0, 1fr);
    gap: 0 10px;
    padding: 14px 6px 14px 0;
  }

  .home-pattern-tab__quote {
    font-size: 0.82rem;
    line-height: 1.4;
  }

  .home-pattern-tab__index {
    font-size: 0.62rem;
    padding-top: 3px;
  }
}
```

---

## Fix 2 — Homepage: Hero eyebrow overflow

**File:** `assets/styles.css`  
**Component:** `.home-hero-copy .eyebrow`

**Problem:** The eyebrow text "Machining · Assembly · Supplier Quality · QMS · Regulatory" is 60+ characters. On 360px screens it wraps awkwardly without a smaller font size.

**Add inside the existing `@media (max-width: 920px)` block for `.home-main`:**
```css
.home-main .home-hero-copy .eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  line-height: 1.6;
}
```

**Add inside `@media (max-width: 560px)` block:**
```css
.home-main .home-hero-copy .eyebrow {
  font-size: 0.65rem;
}
```

---

## Fix 3 — Homepage: Proof-chips chapter nav

**File:** `assets/styles.css`  
**Component:** `.home-proof-chips`, `.home-proof-chips li a`

**Problem:** The chapter nav pills scroll horizontally at 920px, but "Shop-Floor Pragmatism" and "Common Patterns" are long labels with no font-size reduction. On 360px the pills are cramped even with horizontal scroll.

**Add inside `@media (max-width: 560px)` block:**
```css
.home-proof-chips li a {
  font-size: 0.75rem;
  padding: 7px 12px;
}
```

---

## Fix 4 — Homepage: Z-split sections not stacking on mobile

**File:** `assets/styles.css`  
**Component:** `.home-z-split`, `.home-z-split--media-start`

**Problem:** The `.home-z-split` sections (Project Proof with image, Failure Path section, Growth Challenges) do not have an explicit `grid-template-columns: 1fr` override at 920px. They rely on the grid definition without a guaranteed column collapse, causing the image and text to sit side-by-side on tablet.

**Add inside the existing `@media (max-width: 920px)` block:**
```css
.home-z-split {
  grid-template-columns: 1fr;
  gap: 32px;
}

.home-z-split--media-start .home-z-split__media {
  order: -1;
}

.home-z-split__frame {
  max-width: 560px;
  margin-inline: auto;
}
```

**Add inside `@media (max-width: 560px)` block:**
```css
.home-z-split {
  gap: 24px;
}
```

---

## Fix 5 — Homepage: Credentials split layout

**File:** `assets/styles.css`  
**Component:** `.home-cred-split`, `.home-cred-visual-panel`, `.home-cred-thumb`

**Problem:** `.home-cred-split` shows credential text + certificate thumbnails side by side. There's no explicit mobile stacking rule and the `.home-cred-visual-panel` with 4 thumbnail images will be squeezed at tablet widths.

**Add inside `@media (max-width: 920px)` block:**
```css
.home-cred-split {
  grid-template-columns: 1fr;
  gap: 32px;
}

.home-cred-visual-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  max-width: 520px;
  margin-inline: auto;
}
```

**Add inside `@media (max-width: 560px)` block:**
```css
.home-cred-visual-panel {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  max-width: 340px;
}

.home-cred-thumb img {
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
```

---

## Fix 6 — gallery.html: Hub cards and action buttons

**File:** `assets/styles.css`  
**Component:** `.gallery-hub-card`, `.page-hero .actions`, `.gallery-page .btn`

**Problem 1:** The `.gallery-hub-grid` (`.grid.grid-2`) collapses to 1 column at 920px — that's correct. But the card images use `aspect-ratio: 16 / 10` — on a full-width single column at 360px, the image becomes very tall. Also no `max-width` limits the cards.

**Problem 2:** The CTA buttons in `.page-hero .actions` need to go full-width on mobile. Currently they use the shared `.actions` flex style but are not explicitly sized for mobile.

**Add new block targeting gallery.html at bottom of styles.css:**
```css
@media (max-width: 640px) {
  .gallery-page .gallery-hub-card__media img {
    aspect-ratio: 16 / 9;  /* tighter crop — saves vertical space */
  }

  .gallery-page .page-hero .actions {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .gallery-page .page-hero .actions .btn {
    width: 100%;
    text-align: center;
    justify-content: center;
  }

  .gallery-page .section .actions {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .gallery-page .section .actions .btn {
    width: 100%;
    max-width: 22rem;
    text-align: center;
    justify-content: center;
  }
}
```

---

## Fix 7 — our-approach.html: Diagnostic trace map on mobile

**File:** `assets/our-approach-upgrade.css`  
**Component:** `.diagnostic-map-row`, `.trace-stage`, `.diagnostic-step`, `.diagnostic-step__label`

**Problem:** `.diagnostic-map-row` uses a 2-column layout (`.trace-stage` + `.diagnostic-step`) driven by `column-gap`. Steps 3 and 6 have very long text labels (e.g., step 3: "Hears: ASAP = short lead times, high quality = reliable supplier, so let's order standard parts, but attaches high precision drawing"). At 360–480px, the `.trace-stage` label column forces the `.diagnostic-step` text into a very narrow band. The `::before` connector pseudo-element also shifts by `calc(-1 * var(--diagnostic-map-gap))` which can misalign on small screens.

**Add at bottom of `our-approach-upgrade.css`:**
```css
@media (max-width: 640px) {
  .our-approach-page .diagnostic-map-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-block: 14px;
  }

  .our-approach-page .trace-stage {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding-block: 0;
  }

  .our-approach-page .diagnostic-step {
    padding-left: 20px;  /* indent under the stage label */
    border-left: 2px solid var(--line);
    margin-left: 6px;
  }

  .our-approach-page .diagnostic-step::before {
    display: none;  /* hide connector line on mobile — it misaligns */
  }

  .our-approach-page .diagnostic-step__index {
    font-size: 0.62rem;
  }

  .our-approach-page .diagnostic-step__label {
    font-size: 0.875rem;
    line-height: 1.55;
  }

  .our-approach-page .diagnostic-step__label strong {
    display: inline;
  }
}

@media (max-width: 480px) {
  .our-approach-page .diagnostic-step__label {
    font-size: 0.84rem;
  }
}
```

---

## Fix 8 — our-approach.html: Action close panel

**File:** `assets/our-approach-upgrade.css`  
**Component:** `.approach-action-panel`, `.approach-action-panel__copy`, `.approach-action-steps`

**Problem:** `.approach-action-panel` uses a 2-column grid (copy + numbered steps) at desktop. The `@media (max-width: 640px)` block already handles some of this but `.approach-action-steps li` items (with the `<span>`, `<strong>`, `<p>` layout) may not stack cleanly on 360px — the step numbers can collide with the text.

**Add at bottom of `our-approach-upgrade.css`:**
```css
@media (max-width: 640px) {
  .our-approach-page .approach-action-panel {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px 20px 32px;
  }

  .our-approach-page .approach-action-steps {
    padding-left: 0;
  }

  .our-approach-page .approach-action-steps li {
    display: grid;
    grid-template-columns: 2rem minmax(0, 1fr);
    grid-template-rows: auto auto;
    column-gap: 12px;
    row-gap: 4px;
    align-items: start;
  }

  .our-approach-page .approach-action-steps li > span {
    grid-row: 1 / 3;
    padding-top: 2px;
  }

  .our-approach-page .approach-action-steps li > strong {
    grid-column: 2;
    grid-row: 1;
  }

  .our-approach-page .approach-action-steps li > p {
    grid-column: 2;
    grid-row: 2;
    font-size: 0.9rem;
    line-height: 1.55;
  }
}
```

---

## Fix 9 — our-approach.html: Interface map oct-grid at 360px

**File:** `assets/our-approach-upgrade.css`  
**Component:** `.approach-hero__oct-grid`, `.approach-hero__constellation`

**Problem:** At `max-width: 640px`, the constellation is constrained to `width: min(100%, 320px)`. But on a 360px device with 16px padding on each side, the effective width is 328px — only 8px of clearance. The SVG `viewBox="0 0 420 420"` is `overflow: visible`, meaning node labels at the edges (Purchasing, Supplier, Management) can clip into the padding area.

**Add at bottom of `our-approach-upgrade.css`:**
```css
@media (max-width: 400px) {
  .our-approach-page .approach-hero__instrument {
    width: min(100%, 300px);
  }

  .our-approach-page .approach-hero__constellation {
    width: min(100%, 280px);
  }

  .our-approach-page .approach-hero__oct {
    --oct-size: 68px;
  }

  .our-approach-page .approach-hero__oct--anchor {
    --oct-size: 78px;
  }

  .our-approach-page .approach-hero__oct-label {
    font-size: 0.52rem;
  }

  .our-approach-page .approach-hero__oct-hint {
    display: none;  /* remove hint subtitles — too cramped at 360px */
  }
}
```

---

## Fix 10 — Global: `.actions` button groups on mobile

**File:** `assets/styles.css`  
**Component:** `.actions`, `.btn`

**Problem:** Multiple pages (gallery.html hero, our-approach.html CTA, homepage hero) use `.actions` flex groups. On 360px, 2-button rows force each button below ~140px width, which is too narrow for the longer button labels like "See how a failure path connects".

**Add at bottom of styles.css:**
```css
@media (max-width: 480px) {
  .actions {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .actions .btn {
    width: 100%;
    text-align: center;
    justify-content: center;
    min-height: 44px;  /* WCAG touch target */
  }
}
```

> **Exception:** If `.actions` inside `.home-hero-copy` already has a custom mobile layout, scope this to `.page-hero .actions, .section .actions` to avoid collisions.

---

## Verification checklist — test at these exact viewport widths

After applying all fixes, verify in browser DevTools at:
- **360 × 780** (Android baseline)
- **390 × 844** (iPhone 14)
- **768 × 1024** (iPad portrait)
- **1024 × 768** (iPad landscape)

For each viewport check:
- [ ] Homepage: "issues" word is fully inside the pattern copy box — no clipping
- [ ] Homepage: All 4 pattern tab quotes are fully readable, no overflow
- [ ] Homepage: Z-split sections (Project Proof, Failure Path, Growth Challenges) stack vertically
- [ ] Homepage: Credentials section stacks with 2-col thumbnail grid below copy
- [ ] Homepage: Compare table rows stack cleanly at 360px
- [ ] gallery.html: Both hub cards stack to full width, images don't stretch excessively tall
- [ ] gallery.html: CTA buttons go full-width at 640px and below
- [ ] our-approach.html: Interface map hex nodes are not clipped at 360px
- [ ] our-approach.html: Diagnostic trace rows (all 6 steps) are fully readable and not overflowing
- [ ] our-approach.html: Action close panel stacks and numbered steps align cleanly
- [ ] All pages: No horizontal scrollbar at any tested viewport
