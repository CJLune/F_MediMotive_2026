# MediMotive — Typography Consistency Audit & Fix Prompt

## What the audit found — numbers first

| Problem | Count |
|---|---|
| Total `font-size` declarations in styles.css | **495** |
| Distinct font-size values (should be ~12) | **60+** |
| Visually identical body-text sizes (0.88–1rem) | **9 values** |
| Visually identical label sizes (0.60–0.76rem) | **10+ values** |
| Near-duplicate `clamp()` h2 overrides | **1.52rem vs 1.5rem max** (15 uses combined) |
| `'Montserrat', sans-serif` (wrong fallback) | **68 uses** |
| `'Montserrat', system-ui, sans-serif` (correct) | **1 use** |
| Distinct line-height values (should be ~6) | **21** |
| Distinct letter-spacing values (should be ~5) | **21** |
| `font-weight: 300` (likely unintentional) | **2 uses** |

---

## Files to edit

- `assets/styles.css` — primary target (495 font-size declarations)
- `assets/our-approach-upgrade.css` — secondary (35 font-size declarations, includes raw px values for SVG elements — leave those alone)

**Do NOT touch:** SVG text elements in `our-approach-upgrade.css` that use `7px`, `7.5px`, `5px`, `4.5px` — these are diagram pixel sizes and must stay as-is.

---

## Phase 1 — Add a type scale to `:root`

At the top of `assets/styles.css`, inside the existing `:root {}` block, add these custom properties **after the existing color tokens**:

```css
/* Type scale */
--text-2xs: 0.625rem;     /* 10px — tiny badges only */
--text-xs:  0.6875rem;    /* 11px — captions, diagram labels */
--text-sm:  0.75rem;      /* 12px — eyebrows, section labels, breadcrumbs */
--text-base-sm: 0.875rem; /* 14px — small card body, secondary copy */
--text-base: 1rem;        /* 16px — primary body */
--text-md:  1.0625rem;    /* 17px — slightly larger body / intro paragraphs */
--text-lg:  1.125rem;     /* 18px — card titles, large labels */
--text-xl:  1.25rem;      /* 20px — sub-headings */

/* Heading fluid scale */
--h3-size: clamp(1.05rem, 1.8vw, 1.2rem);
--h2-size: clamp(1.35rem, 2.2vw, 1.95rem);    /* matches existing global h2 */
--h2-card: clamp(1.28rem, 3.8vw, 1.52rem);    /* card/section h2 override */
--h1-size: clamp(2rem, 4vw, 3.9rem);           /* matches existing global h1 */

/* Line height scale */
--lh-tight:   1.2;
--lh-heading: 1.3;
--lh-snug:    1.45;
--lh-base:    1.6;
--lh-loose:   1.65;

/* Letter spacing */
--ls-heading:  -0.025em;
--ls-h1:       -0.035em;
--ls-label:    0.08em;
--ls-eyebrow:  0.1em;
--ls-badge:    0.06em;
```

---

## Phase 2 — Global find-and-replace consolidations

Do these as **global search-and-replace** across `assets/styles.css`. These are value-for-value swaps of visually indistinguishable sizes. Do NOT change values inside `clamp()` min/max parameters unless explicitly stated.

### 2A — Consolidate near-identical body text sizes

The values `0.92rem`, `0.94rem`, `0.95rem`, `0.96rem`, `0.97rem`, `0.98rem` are all imperceptibly different from `0.9375rem` (15px) or `1rem`. Apply this mapping:

| Replace | With | Reason |
|---|---|---|
| `font-size: 0.97rem` | `font-size: var(--text-base)` | ≡ 1rem at 0.03rem diff |
| `font-size: 0.98rem` | `font-size: var(--text-base)` | ≡ 1rem at 0.02rem diff |
| `font-size: 0.96rem` | `font-size: var(--text-md)` | too close to 1rem to be distinct |
| `font-size: 0.94rem` | `font-size: var(--text-md)` | consolidate to nearest step |
| `font-size: 0.95rem` | `font-size: var(--text-md)` | consolidate to nearest step |
| `font-size: 0.92rem` | `font-size: var(--text-base-sm)` | consolidate down |
| `font-size: 0.9rem`  | `font-size: var(--text-base-sm)` | consolidate |
| `font-size: 0.88rem` | `font-size: var(--text-base-sm)` | 0.875rem ≡ 0.88rem |
| `font-size: 0.875rem` | `font-size: var(--text-base-sm)` | canonical value |
| `font-size: 1rem`    | `font-size: var(--text-base)` | canonical |
| `font-size: 1.0625rem` | `font-size: var(--text-md)` | consolidate |
| `font-size: 1.07rem` | `font-size: var(--text-md)` | ≡ 1.0625rem |
| `font-size: 1.08rem` | `font-size: var(--text-md)` | ≡ 1.0625rem |

**Exception:** Do NOT replace `font-size: 1rem` on the global `body {}` rule — that should remain as `1rem` (not a variable) to preserve browser default cascade.

### 2B — Consolidate near-identical label/eyebrow sizes

All these are the same semantic role (small metadata, uppercase labels):

| Replace | With | Reason |
|---|---|---|
| `font-size: 0.6rem`  | `font-size: var(--text-2xs)` | smallest badge size |
| `font-size: 0.62rem` | `font-size: var(--text-2xs)` | ≡ 0.625rem |
| `font-size: 0.64rem` | `font-size: var(--text-2xs)` | round down |
| `font-size: 0.65rem` | `font-size: var(--text-xs)` | round up |
| `font-size: 0.66rem` | `font-size: var(--text-xs)` | ≡ 0.6875rem |
| `font-size: 0.68rem` | `font-size: var(--text-xs)` | canonical label size |
| `font-size: 0.7rem`  | `font-size: var(--text-xs)` | round down |
| `font-size: 0.72rem` | `font-size: var(--text-sm)` | consolidate up |
| `font-size: 0.75rem` | `font-size: var(--text-sm)` | canonical |
| `font-size: 0.76rem` | `font-size: var(--text-sm)` | ≡ 0.75rem |

### 2C — Consolidate mid-range sizes (0.78–0.87rem)

| Replace | With | Reason |
|---|---|---|
| `font-size: 0.78rem`   | `font-size: var(--text-sm)` | round down |
| `font-size: 0.8rem`    | `font-size: var(--text-base-sm)` | consolidate |
| `font-size: 0.8125rem` | `font-size: var(--text-base-sm)` | ≡ 13px, too close to 0.875rem |
| `font-size: 0.82rem`   | `font-size: var(--text-base-sm)` | ≡ 0.8125rem |
| `font-size: 0.84rem`   | `font-size: var(--text-base-sm)` | consolidate |
| `font-size: 0.85rem`   | `font-size: var(--text-base-sm)` | consolidate |
| `font-size: 0.86rem`   | `font-size: var(--text-base-sm)` | consolidate |
| `font-size: 0.87rem`   | `font-size: var(--text-base-sm)` | ≡ 0.875rem |
| `font-size: 0.89rem`   | `font-size: var(--text-base-sm)` | ≡ 0.875rem |
| `font-size: 0.91rem`   | `font-size: var(--text-base-sm)` | consolidate |

### 2D — Consolidate upper body sizes (1.02–1.15rem)

| Replace | With | Reason |
|---|---|---|
| `font-size: 1.02rem`  | `font-size: var(--text-md)` | ≡ 1.0625rem |
| `font-size: 1.04rem`  | `font-size: var(--text-md)` | ≡ 1.0625rem |
| `font-size: 1.05rem`  | `font-size: var(--text-md)` | ≡ 1.0625rem |
| `font-size: 1.06rem`  | `font-size: var(--text-md)` | ≡ 1.0625rem |
| `font-size: 1.075rem` | `font-size: var(--text-md)` | ≡ 1.0625rem |
| `font-size: 1.1rem`   | `font-size: var(--text-lg)` | round up to 1.125rem |
| `font-size: 1.125rem` | `font-size: var(--text-lg)` | canonical |
| `font-size: 1.15rem`  | `font-size: var(--text-lg)` | ≡ 1.125rem |

### 2E — Consolidate near-duplicate h2 clamp values

These two are visually identical (2px max difference at large screens):
- `font-size: clamp(1.28rem, 3.8vw, 1.5rem)` → **replace with** `font-size: var(--h2-card)`
- `font-size: clamp(1.28rem, 3.8vw, 1.52rem)` → **replace with** `font-size: var(--h2-card)`

Also consolidate these near-duplicates to `var(--h2-card)`:
- `font-size: clamp(1.28rem, 2.4vw, 1.55rem)` → `var(--h2-card)`
- `font-size: clamp(1.25rem, 2.2vw, 1.55rem)` → `var(--h2-card)`

---

## Phase 3 — Fix font-family fallback inconsistency

**Problem:** `h1, h2, h3, h4` correctly use `'Montserrat', system-ui, sans-serif`. But 68 component-level rules use `'Montserrat', sans-serif` (missing `system-ui`). If Montserrat fails, these components fall back to the OS default `sans-serif` which may differ from `system-ui`.

**Fix:** Global replace across `assets/styles.css` and `assets/our-approach-upgrade.css`:
- Replace: `font-family: 'Montserrat', sans-serif`
- With: `font-family: 'Montserrat', system-ui, sans-serif`

**Do NOT change** `font-family: 'Roboto', system-ui, sans-serif` (body) — leave as-is.

---

## Phase 4 — Fix font-weight anomalies

**`font-weight: 300`** — appears 2 times. Roboto 300 (Light) is almost certainly unintentional for a professional B2B site. Find both instances and confirm intent; if decorative text, change to `400`. If intentional, add a comment `/* intentional light weight */`.

**`font-weight: 500`** — appears 9 times. Roboto 500 is nearly indistinguishable from 400 in most rendering environments. Review each instance:
- If the intent is "slightly stronger than body" → change to `600`
- If it's body text that was accidentally given a weight → change to `400`

---

## Phase 5 — Consolidate letter-spacing

The site uses 21 distinct letter-spacing values. Map them to the 5 tokens defined in Phase 1:

| Current value(s) | → Token | Used for |
|---|---|---|
| `-0.035em` | `var(--ls-h1)` | h1 headings |
| `-0.025em`, `-0.026em`, `-0.028em` | `var(--ls-heading)` | h2 and large headings |
| `-0.02em`, `-0.015em`, `-0.01em` | `var(--ls-heading)` | secondary headings |
| `0.08em`, `0.09em`, `0.07em` | `var(--ls-label)` | labels, metadata |
| `0.1em`, `0.12em` | `var(--ls-eyebrow)` | eyebrow text only |
| `0.04em`, `0.05em`, `0.06em` | `var(--ls-badge)` | number badges, small tags |
| `0.01em`, `0.02em`, `0.03em`, `0.025em` | `0` | remove — imperceptible |

---

## Phase 6 — Consolidate line-height

The site uses 21 distinct line-height values. Map to the 5 tokens from Phase 1:

| Current | → Token | Context |
|---|---|---|
| `1`, `1.08`, `1.1`, `1.12`, `1.14`, `1.15`, `1.16` | `var(--lh-tight)` | headings, hero text |
| `1.2`, `1.22`, `1.25`, `1.3`, `1.35`, `1.38` | `var(--lh-heading)` | card titles, sub-headings |
| `1.4`, `1.45` | `var(--lh-snug)` | compact body, list items |
| `1.5`, `1.55`, `1.58`, `1.6`, `1.62` | `var(--lh-base)` | standard body text |
| `1.65`, `1.68`, `1.7`, `1.72` | `var(--lh-loose)` | lead paragraphs, readable long text |

**Exception:** `line-height: 0` — leave as-is (used to collapse line boxes on images/media). `line-height: 1` on specific SVG/icon elements — leave as-is.

---

## Phase 7 — Update `our-approach-upgrade.css`

Apply the same Phase 2–4 consolidations. Additionally:
- Replace `font-size: 0.52rem` → `font-size: var(--text-2xs)` (only instance; this is extremely small — verify it's intentional for the OCT node hint label)
- Replace `font-size: 0.58rem` → `font-size: var(--text-2xs)`
- Leave `7px`, `7.5px`, `5px`, `4.5px` untouched (SVG diagram elements)

---

## Verification checklist

After all phases, run these checks:

```bash
# Count remaining distinct font-size values — should be < 15
grep -oh "font-size:.*;" assets/styles.css | sed 's/font-size: //;s/;//' | sort -u | wc -l

# Confirm no more 'Montserrat', sans-serif without system-ui
grep -c "Montserrat', sans-serif\"" assets/styles.css
# Expected output: 0

# Confirm no more sub-0.6rem font sizes (except SVG px values)
grep "font-size: 0\.[0-5]" assets/styles.css
# Expected output: empty

# Confirm no more near-duplicate body sizes
grep "font-size: 0\.9[2-8]rem\|font-size: 0\.97rem\|font-size: 0\.91rem" assets/styles.css
# Expected output: empty
```

**Visual check — open each page at 1280px and 390px:**
- [ ] All eyebrows/section labels same size and weight across pages
- [ ] Card body text looks consistent across all 6 expertise cards
- [ ] Breadcrumbs same size on every page
- [ ] h2 section headings same visual weight across homepage sections
- [ ] No text appears unexpectedly bold (300/500 weight audit complete)

---

## What NOT to change

- `clamp()` values on **h1 hero overrides** per-page (homepage, services, approach) — these are intentional per-page sizing decisions
- `font-size: 0` on any element (intentional hide)
- Any `font-size` inside `@media print` if present
- Raw pixel values `7px`, `7.5px`, `5px`, `4.5px` in `our-approach-upgrade.css`
- The global `body { font-size: 1rem; }` baseline rule
- `font-size: inherit` declarations
