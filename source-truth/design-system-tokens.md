# Design system tokens (Phase A)

Use these in `assets/styles.redesign.css`. Avoid new magic numbers on pages.

## Type scale

| Role | Class / element | Size (approx) | Use |
|------|-----------------|---------------|-----|
| Eyebrow | `.eyebrow` | 0.75–0.8rem, uppercase | Section label above h2/h1 |
| H1 | `h1` in hero | clamp 1.75–2.75rem | One per page |
| H2 | `.section-head h2` | 1.35–1.6rem | Section titles |
| H3 | `h3` in prose/cards | 1.05–1.15rem | Subsections |
| Lead | `.lead` | 1.05–1.15rem, max ~52ch | Hero intro |
| Body | `p` | 0.94–1rem | Default copy |
| Caption | figcaption, `.text-short` | 0.88rem | Images, meta |

## Spacing (8px base)

| Token | Value | Utilities | Use |
|-------|-------|-----------|-----|
| xs | 8px | — | Tight gaps |
| sm | 12px | — | Card padding inner |
| md | 16px | — | Grid gaps small |
| lg | 24px | `.mt-24` | Between blocks |
| xl | 28px | `.mt-28` | Subsection spacing |
| 2xl | 32px | `.mt-32` | Section tail / CTA spacing |
| section | 56–72px | `.section` padding | Vertical section rhythm |

Prefer `.mt-14` … `.mt-32` utilities over inline styles.

## Responsive spacing audit (required)

When editing any page spacing/layout, verify **tablet + mobile** before the change is considered done.

Breakpoints:

- **Tablet**: `<= 920px`
- **Mobile**: `<= 640px` (quick sanity at `<= 480px`)

Checklist:

- **Gutters**: on tablet/mobile, ensure `.container` / `.container.narrow` keep consistent side padding (avoid edge-to-edge text/cards unless intentional).
- **Section rhythm**: ensure `.section` vertical padding and child margins don’t “double up” or create awkward gaps.
- **No horizontal overflow**: if anything scrolls sideways, fix the offender (common: grids/bentos, long chips, fixed-width media).
- **Grid stability**: if a desktop layout uses `nth-child` grid spans or mosaics, you MUST override on smaller screens:
  - Tablet: stable **2-column** layout (equal columns) and neutralize spans.
  - Mobile: stable **1-column** stack and normalize media aspect ratios/heights.
- **CTAs**: on mobile, `.actions` rows should stack with full-width buttons and touch-friendly height.

## Layout widths

| Name | CSS | When |
|------|-----|------|
| **Narrow** | `.container.narrow` (~720px max) | Hero, FAQ, legal, prose sections (Regions) |
| **Content** | `.container` (~1120–1240px) | Grids, expertise hub, certificates archive |
| **Prose** | `max-width: 52ch` on `.lead` | Readable line length in centered heroes |
| **Section intro** | `.section-head` max ~42rem centered, or `.section-head--left` | Centered default; left for case intros |

## Elevation

| Level | Use |
|-------|-----|
| Border + white/`--brand-light` bg | Cards, cert tiles |
| `--shadow` | Founder portrait, featured case cards |
| Avoid | Third shadow level, heavy glassmorphism |

## Components (reuse)

| Component | Markup pattern |
|-----------|----------------|
| Page hero | `.page-hero` > `.container.narrow` > breadcrumb, eyebrow, h1, lead, `.actions` |
| Editorial hero | `.about-hero--editorial` or `.page-hero--expertise` |
| Section intro | `.section-head` (+ `.center` or `--left`) |
| CTA band | `.section.alt.expertise-proof-cta` > narrow > head + `.actions` (primary = contact, secondary = case studies) |
| Button primary | `.btn-primary` | Main CTA on light backgrounds |
| Button secondary | `.btn-secondary` | Supporting CTA on light backgrounds |
| Button tertiary | `.btn-tertiary` | Text-style second action (e.g. homepage hero) |
| Proof band | `.proof-band` / `.about-proof-band` |
| About founder block | `.about-founder` > `.about-founder__layout` (body + portrait) + `.about-founder__quote-band` (`.human-note`) — 2-col through `920px` down to `641px`; 1-col stack at `<=640px` |
| Breadcrumb | `nav.breadcrumb` in hero |

## Page body classes

| Class | Page |
|-------|------|
| `about-page` | about.html |
| `contact-page` | contact.html |
| `case-studies-page` | case-studies.html |
| `services-page` | services.html |
| `regions-page` | regions.html |
| `certificates-page` | certificates.html |
| `our-approach-page` | our-approach.html |
| `gallery-page` | gallery.html |
| `work-journey-page` | work-journey.html |

Scoped CSS lives under `.services-page`, etc. in `styles.redesign.css`.

## Phase B implementation notes (2026-05-28)

These are now part of the live baseline and should be preserved unless explicitly replaced:

- **Homepage gutters:** at tablet/mobile, homepage containers keep side gutters (not edge-to-edge).
- **Homepage contrast section:** `MediMotive vs. Paper Consulting` uses stacked card treatment on tablet/mobile with compact rhythm (`<=920px` and tighter at `<=640px`).
- **Navbar brand fit:** header wordmark (`MediMotive`) has tablet/mobile sizing + spacing guards to avoid clipping with language toggle + menu button.
- **Scroll-to-top control:** fixed on right side, hidden by default, shown only when `.is-visible` is applied by JS, and styled for contrast over dark footer.
- **No-overflow guarantee:** homepage verified at `920px`, `640px`, and `375px` with no horizontal scroll.
- **Side gutters (tablet/mobile):** width inset `min(100% - 24px)` at `<=920px`, `min(100% - 16px)` at `<=640px` / `<=480px`; global `.container` side padding `12px` at `<=640px`; width-gutter pages zero extra horizontal padding to avoid double inset.
- **About founder block (`.about-founder`):** desktop keeps text + portrait in a 2-column grid (`minmax(0, 38rem)` + portrait column); founder quote lives in `.about-founder__quote-band` below the grid (full-width card, max ~52rem). At **`641–920px`**, stay 2-column; portrait sticky; quote band below. At **`<=640px`**, stack body → centered portrait → quote band. Selectors: `.about-founder__layout`, `.about-founder__quote-band`, `.about-founder__portrait` under `.about-page` in `styles.redesign.css`.

## Expertise hub + detail (2026-05-31)

| Pattern | File | Notes |
|---------|------|--------|
| `.connect-prose` | `expertise-upgrade.css` | Hub “How the areas connect” — max-width ~42rem, left-aligned; modifiers `__lead`, `__body`, `__callout`, `__close`. Copy: [12-expertise-pages.md](12-expertise-pages.md) |
| `.ed-section--faq` | `expertise-detail.css` | FAQ H2 + `.ed-faq__intro` centered on detail pages |
| `.ed-faq` | `expertise-detail.css` | Accordion; one `name` attribute per page |

Do not reintroduce `.connect-steps` / Observe–Transfer cards on `services.html` without client approval.
