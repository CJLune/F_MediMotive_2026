# Design System

## Brand Palette

Approved colors:

- Brand dark: `#1c2e4a`
- Brand slate/header: `#486966`
- Brand primary green: `#027343`
- Brand light green: `#f0fdf4`
- Surface/off-white: `#f8fafc`

Do not replace the palette unless explicitly instructed.

## Visual Tone

The site should feel:

- industrial
- practical
- credible
- calm
- precise
- human
- friendly without becoming casual

Avoid:

- generic SaaS landing page look
- excessive shadows
- excessive rounded card design
- decorative animations
- stock-photo agency style
- certificate dump layout on About

## Header

Header should remain compact:

MediMotive | Expertise | Case Studies | About | Contact

No header CTA.
No fake logo.
No Home nav link.
No Gallery nav link.

## Cards

Cards should support scanning, not overload the page.

Use cards for:

- principles
- credentials summary
- work journey contexts
- case metrics
- certificate archive items

Avoid making every paragraph a card.

## Portraits

Founder portrait is allowed on About in the founder section.

The portrait supports human trust but must not make the About page feel like only Björn’s personal CV.

### About founder block layout (required)

Markup: `.about-founder` > `.about-founder__layout` with `.about-founder__body` and `.about-founder__portrait-col`; quote in `.about-founder__quote-band` below the layout.

| Breakpoint | Layout | Portrait |
|------------|--------|----------|
| Desktop (`>920px`) | 2 columns — body + portrait side by side | Full column width in grid; `object-fit: cover`, controlled crop |
| Tablet (`641–920px`) | **2 columns** — quote stays in body column, portrait in second column (editorial pair) | `width: 100%`; no `max-width: 320px` cap that leaves empty space beside portrait |
| Mobile (`<=640px`) | **1 column** — body then portrait | Centered: `width: min(100%, 360px); margin-inline: auto` |

Do not regress to tablet single-column + narrow left-aligned portrait (reads as “floating” below the quote).

CSS source: `assets/styles.redesign.css` (`.about-page .about-founder__*`); compile with `npm run build:css`.

## Certificate Lightbox

Certificate archive may use a lightbox for viewing certificate images.

Do not remove certificate lightbox behavior unless replacing it with a better accessible solution.

## Empty Image Rules

Do not show visible empty placeholders.

If no real image exists, hide the image container or show only the text card.

## Mobile

Mobile must have:

- no horizontal overflow
- readable stacked cards
- usable mobile menu
- no broken lightbox behavior
- no oversized portrait cropping

Required mobile/tablet QA for every layout change:

- Check **tablet `<= 920px`** and **mobile `<= 640px`** (quick sanity at `<= 480px`).
- Confirm **gutters** (containers) and **section rhythm** (padding/margins) are consistent and readable.
- Any desktop mosaic/grid that relies on **`nth-child` spans** must be replaced/neutralized for tablet/mobile (stable 2-col on tablet, 1-col on mobile).

## Current responsive baseline (2026-05-28)

- Homepage sections keep tablet/mobile gutters and must not run edge-to-edge.
- Homepage compare/contrast block (`MediMotive vs. Paper Consulting`) uses stacked cards on tablet/mobile with compact spacing.
- Header wordmark remains text-only and must fit with language switch + menu icon at `<=920px` without clipping.
- Language switch (`.nav-lang`): **one instance in the header only** on tablet/mobile — do not duplicate EN/DE inside `.mobile-drawer`.
- Scroll-to-top button stays fixed on right side, hidden until scroll threshold is passed, and must remain readable over dark footer backgrounds.
- About founder section: tablet keeps 2-column quote + portrait; mobile stacks with centered portrait (see **Portraits → About founder block layout**).
