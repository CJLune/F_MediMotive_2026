# MediMotive v5 Employer/Portfolio Prototype

**Canonical site reference:** [source-truth/README.md](source-truth/README.md)  
**Audit checklist:** [source-truth/audit-status.md](source-truth/audit-status.md)

## Strategic change from v4
This version removes the lead-generation funnel. It is no longer centered on a request form or Shop-Floor Check conversion. It is now an employer-facing and visitor-facing professional proof-of-work website.

## Implemented
- Text-only MediMotive wordmark; no logo or fake mark.
- No separate Home navigation link.
- No contact/request form.
- No thank-you conversion page.
- Contact page uses direct email only.
- Navigation CTA changed from request language to simple Contact.
- Services reframed as Expertise & Work Areas.
- About page combines company + Björn credibility.
- Certification and photo slots added for future approved images.
- Case studies remain the primary proof assets.
- Approved color palette preserved: #1c2e4a, #486966, #027343, #f0fdf4, #f8fafc.

## Local development

```bash
npm install
npm run dev          # CSS watch + static server (default http://127.0.0.1:3456)
```

**Note:** Cursor often uses port **3000** internally (“No Server Root” if you open `:3000`). Use the URL printed in the terminal (usually **3456**). Override: `PORT=4000 npm run dev`.

## Build (CSS + sitemap)

```bash
npm install
npm run build:css    # compiles assets/input.css → assets/styles.css
npm run build:og     # renders og-medimotive.svg → 1200×630 JPG/PNG
npm run sitemap      # regenerates sitemap.xml + site-urls.json
npm run build        # css + og + sitemap
```

Run `npm run build:css` before deploy if styles change. Pre-redesign snapshot: `archive/pre-redesign-2026-05-18/`.

## Deploy (Vercel)

```bash
npm run build
vercel --prod --yes
```

- **Production:** https://medimotive.de (Vercel project `f-medi-motive-2026`)
- **Build summary / audit log:** [CONTENT-MERGE-REPORT.md](CONTENT-MERGE-REPORT.md)

## GitHub

Repo: [CJLune/F_MediMotive_2026](https://github.com/CJLune/F_MediMotive_2026) (public).

```bash
git remote set-url origin https://github.com/CJLune/F_MediMotive_2026.git   # if not set
git push -u origin main
```

## Before publication
- Review Imprint and Privacy (`source-truth/10-legal-client-review.md`), then `node tools/publish-legal.mjs --confirm`.
- Terms page not published yet.
- Add approved certification images and professional photos.
- Add verified LinkedIn URL only when available.
- Confirm whether the site should include a German version.
- Replace image placeholders with optimized files and alt text.

## Suggested analytics events
- homepage_cases_click
- homepage_about_click
- contact_email_click
- contact_page_email_click
- about / case-study / expertise-page clicks

Primary goal is not form conversion. Suggested primary metric: professional contact email clicks or employer-profile engagement.
