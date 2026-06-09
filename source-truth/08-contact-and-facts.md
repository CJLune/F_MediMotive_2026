# Contact and Facts

## Company Name

MediMotive

## Founder Name

Björn Seiler

Use the umlaut in visible copy.

Use `bjoern-seiler` only for filenames, URLs, or technical paths.

## Location

Delmenhorst, Germany

Relevant regional context:

- Oldenburg
- Bremen
- Hamburg
- Hannover
- Wolfsburg
- Tuttlingen

## Email

`info@medimotive.de`

## LinkedIn

Use only the confirmed LinkedIn URL.

Do not add placeholder LinkedIn links.

`https://www.linkedin.com/in/bjoern-seiler-30481b165/`

## XING

Use only the confirmed XING URL.

`https://www.xing.com/profile/Bjoern_Seiler4`

Footer founder block (portrait + name), footer XING icon, and contact-page XING link all point here with `target="_blank"` and `rel="noopener noreferrer"`.

## Contact Page Rules

- Keep contact simple and professional.
- No contact form unless explicitly requested.
- No header email CTA.
- Direct email is acceptable.
- LinkedIn is acceptable if the confirmed URL is available.

## Hero layout (locked — 2026-05-27)

**Pattern D** — narrow centered hero inside `.page-hero.contact-hero` + `.contact-hero__content`.

| Element | Alignment | Notes |
|---------|-----------|--------|
| Breadcrumb | Left | Only left-aligned hero item |
| Eyebrow | Center | `Contact · direct professional email` |
| H1 | Center | `Contact MediMotive directly` |
| Lead | Center | Direct-email intro; Björn named personally |
| Email CTA | Center | **One** highlighted line: “Send Email to:” + `info@medimotive.de` link (`.contact-hero__email`; single `mailto:`; no button) |

**Email behavior:**

- Canonical address: `info@medimotive.de` — one plain `mailto:info@medimotive.de?subject=MediMotive%20contact` on `.contact-hero__email-link` (no second link).
- No contact-page email JS; native mail app only.
- Hero ambient/canvas: `pointer-events: none` on ambient + descendants; canvas set in JS; `.contact-hero__content` at `z-index: 2`.
- Footer email on contact page: entity-encoded `mailto:` in HTML (same address).

**Implementation:** `assets/contact-upgrade.css` (linked after `assets/styles.css` on `contact.html`). This file overrides global contact-hero left-align rules in `styles.css`. Do not remove the stylesheet link or revert hero stack to left without explicit approval.

**Do not add:** contact form, trust bar, header email CTA, extra hero CTAs, or layout changes that break Pattern D centering.

**Responsive:** verify tablet (`<= 920px`) and mobile (`<= 640px`) per [design-system-tokens.md](design-system-tokens.md).

## Copy Rule

Use “MediMotive” and “we” for company positioning.

Use “Björn Seiler” when discussing founder credibility, career background, portrait, certificates, or LinkedIn.
