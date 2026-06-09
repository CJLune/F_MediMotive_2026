# Legal pages — client review and publication

## Status

| Page | Review draft | Indexed (no `noindex`) |
|------|----------------|-------------------------|
| `imprint.html` | Ready for counsel review | After approval only |
| `privacy.html` | Ready for counsel review | After approval only |
| `gallery.html` | N/A (visual hub) | Separate decision — stays `noindex` by default |

Imprint and privacy remain **`noindex, follow`** until you run the publish step below. Footer links stay live so reviewers can open them.

## Client checklist (confirm or correct in the HTML)

### Imprint (`imprint.html`)

- [ ] Legal form of business (e.g. sole proprietor, company name as registered)
- [ ] Full postal address (street, postcode, city, country)
- [ ] VAT ID (USt-IdNr.) if applicable
- [ ] Commercial register entry (Handelsregister) if applicable
- [ ] Professional title / chamber membership if legally required
- [ ] Responsible for content (name) — currently Björn Seiler
- [ ] Whether a German Impressum (DE) is required in addition to English copy
- [ ] EU ODR platform link still current: https://ec.europa.eu/consumers/odr/

### Privacy (`privacy.html`)

- [ ] Hosting provider name, address, and region (EU/non-EU)
- [ ] Whether any analytics, fonts CDN, or tracking will be added before launch
- [ ] Email provider/hosting for `info@medimotive.de` — confirm for privacy text
- [ ] Retention periods for server logs (hosting contract)
- [ ] Data Protection Officer required? (usually no for small sole operators)
- [ ] Supervisory authority wording for Delmenhorst / Lower Saxony
- [ ] Last updated date

### Site facts (already in source-truth)

- Company brand: **MediMotive**
- Founder: **Björn Seiler**
- Location: **Delmenhorst, Germany**
- Email: **info@medimotive.de**
- No contact form on the website
- No analytics scripts in the codebase at time of draft

## After counsel approval — remove `noindex`

From repo root:

```bash
node tools/publish-legal.mjs --confirm
npm run sitemap
```

This will:

1. Remove `noindex` from `imprint.html` and `privacy.html`
2. Remove the yellow “pending legal approval” review banner from those pages
3. Update meta descriptions (drop “draft” wording)
4. Set `imprint.html` and `privacy.html` to `live` in `source-truth/page-status.csv`
5. Regenerate `sitemap.xml` and `site-urls.json`

**Do not run** until imprint and privacy text are approved for publication.

## Revert (if needed)

Restore `noindex` manually or from git. Re-run `node tools/apply-seo.mjs` and `npm run sitemap`.
