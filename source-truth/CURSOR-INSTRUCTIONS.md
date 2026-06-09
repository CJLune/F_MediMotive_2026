# Cursor Instructions

Before editing any MediMotive page, read the source-truth folder.

Priority:

1. `00-positioning-source-truth.md`
2. `01-site-purpose.md`
3. `02-constraints.md`
4. `03-page-inventory.md` (approved site hierarchy tree)
5. `05-about-page.md`
6. `04-navigation-and-links.md`
7. `09-voice-and-banned.md`
8. `known-gaps.md`
9. `audit-status.md` — done/open/stale checklist
10. `design-system-tokens.md` — spacing, type, layout widths (Phase A)
11. `11-our-approach-page.md` — Our Approach: problem → solution, not method reveal

Do not overwrite the positioning unless explicitly instructed.

Do not redesign the site unless explicitly requested.

When editing, make surgical changes and audit after each change.

After every edit, confirm:

- MediMotive remains first; Björn remains supporting credibility.
- Header nav remains compact.
- No fake logo exists.
- No contact form was added.
- No header CTA was added.
- About does not list all certificates.
- Certificate archive remains on `certificates.html`.
- Visual proof remains professional.
- `work-journey.html` exists; `gallery.html` hub may link to it. If the file is removed, point all work-journey links to `gallery.html`.
- No empty placeholders are visible.

## Client-confirmed constraints (do not break for SEO)

- **No phone number** on the site (no `tel:` links, no phone in schema).
- **No separate Home** nav item — MediMotive wordmark links to `index.html`.
- **Header nav stays compact:** Expertise → `services.html`, Case Studies → `case-studies.html`, About → `about.html`, Contact → `contact.html`.
- **Do not add to header:** Gallery, Method, Regions, email CTA, Shop-Floor Check CTA.
- **No contact form** unless explicitly requested.

## Safe technical SEO scope

When improving SEO, only apply safe technical changes:

- Title and meta description polish (on-page)
- Canonical and Open Graph tags (only after production URL is confirmed with client)
- Broken link and asset path fixes
- Accessibility fixes (`aria-current`, skip link, lightbox labels)
- Image alt text where missing or incorrect
- Empty placeholder cleanup (`is-empty` pattern)
- Mobile horizontal overflow fixes

## Reject external SEO audit recommendations that conflict

Do **not** implement these even if an audit recommends them:

- Phone number or `tel:` links
- Home button in navbar
- Mega-menu or extra header nav items
- Header email CTA
- Shop-Floor Check CTA
- Contact form or lead-magnet funnel
- Aggressive booking or conversion CTAs

`robots.txt`, `sitemap.xml`, canonical, and Open Graph use the domain in [site-url.md](site-url.md). After domain change, update that file and run `node tools/apply-seo.mjs`.
