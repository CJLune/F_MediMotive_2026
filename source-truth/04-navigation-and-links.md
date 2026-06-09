# Navigation and Links

## Header Navigation

See [03-page-inventory.md](03-page-inventory.md) for the full approved site hierarchy.

The main header must stay compact:

- MediMotive wordmark → `index.html`
- Expertise → `services.html`
- Case Studies → `case-studies.html`
- About → `about.html`
- Contact → `contact.html`

Do not add:

- Home
- Gallery
- Method
- Regions
- Email CTA
- Shop-Floor Check CTA

## Footer Navigation

Footer may include deeper links:

- Expertise pages
- Our Approach
- Case Studies
- About MediMotive
- Certificates
- Gallery / Visual Proof
- Regional context
- Contact
- Email
- LinkedIn
- XING (footer social list — profile URL in [08-contact-and-facts.md](08-contact-and-facts.md))

## Footer founder block

On live root pages, the footer founder **portrait** and **name** link to `about.html#founder` — not the XING profile. XING stays in the footer social link row only.

## Certificates Flow

- About summary → `certificates.html`
- `certificates.html` is the full certificate archive.
- Do not duplicate the full certificate archive on About.

## Visual Proof Flow

`work-journey.html` **exists** in the repo. Current flow:

```text
about.html / footer “Visual proof” → work-journey.html
certificates.html “Visual proof” link → work-journey.html
gallery.html → optional hub (certificates + work journey); not used for primary “Visual proof” CTAs
```

- About hero and work-journey section “View visual proof” link to `work-journey.html` directly.
- Footer Proof “Visual proof” links to `work-journey.html`.
- `gallery.html` remains available but is not the primary visual proof entry.

If `work-journey.html` is removed in future, change all `work-journey.html` links to `gallery.html`.

## Broken Link Audit

Before finalizing any change, check:

- no `work-journey.html` links if that file has been removed (use `gallery.html` instead)
- no missing gallery page links
- no nav links to missing pages
- no dead image paths
- no old Home link in header
- no Gallery link in header
