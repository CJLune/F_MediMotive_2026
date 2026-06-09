# Google Search Console — after ownership is verified

Use property: **https://medimotive.de** (URL-prefix property matches the live canonical host).

Technical checks (already OK on production as of setup):

- `https://medimotive.de/robots.txt` → `Sitemap: https://medimotive.de/sitemap.xml`
- `https://medimotive.de/sitemap.xml` → 17 indexable URLs (gallery is `noindex` and excluded)
- Verification file stays at repo root via `npm run gsc:verify` on each deploy

---

## 1. Submit the sitemap (do this first)

1. Open [Search Console](https://search.google.com/search-console) → property **https://medimotive.de**
2. Left menu: **Indexing** → **Sitemaps**
3. Under **Add a new sitemap**, enter only: `sitemap.xml`
4. Click **Submit**

**Success looks like:** Status **Success**, discovered URLs ~17 (may take hours to populate).

**If it says “Couldn’t fetch” or “Couldn’t read”:**

1. Confirm the GSC property matches the sitemap host:
   - Sitemap URLs use **`https://medimotive.de`** (no `www`).
   - Use property **`https://medimotive.de`** (URL prefix), **not** `https://www.medimotive.de`.
   - If you only have a **Domain** property (`medimotive.de`), submit the **full** URL: `https://medimotive.de/sitemap.xml`.
2. In Sitemaps, delete the failed entry, wait 2 minutes, submit again as **`sitemap.xml`** only (no leading `https://` for URL-prefix properties).
3. Open https://medimotive.de/sitemap.xml in a browser — you must see XML, not an HTML page.
4. `www` now **301-redirects** to non-`www`; after deploy, retest from GSC.

### Cannot remove a failed sitemap?

You often **do not need to remove it**. A red “Couldn’t fetch” row does **not** block indexing if the live file is fixed and you submit (or robots.txt points to) a working sitemap.

**To remove a *submitted* sitemap** (only works on the detail page):

1. **Indexing → Sitemaps**
2. **Click the sitemap path** in the table (opens the detail page — not just the checkbox)
3. Top-right **⋮** (three dots) → **Remove sitemap** → confirm

If **Remove sitemap** is missing: you may be on a **Domain** property with a different layout, lack **Owner/Full** permission, or the row is **auto-discovered** from `robots.txt` (those are not in the “Submitted” list; you cannot delete them, only fix the live file).

**Workaround:** Ignore old failed rows. On property **`https://medimotive.de`**, submit a fresh entry: `sitemap.xml` (or `sitemap.xml?v=2` if you need a second line while the old one ages out). Google will use the fetchable file.

---

## 2. Request indexing (priority URLs)

Google limits how many manual requests you can make per day (~10–12). Use **URL Inspection** (top search bar in GSC), paste each URL, wait for “URL is on Google” or “URL is not on Google”, then click **Request indexing** only when offered.

Do these **in order** (same day is fine; spread over 2 days if the button is greyed out):

| Priority | URL |
|----------|-----|
| 1 | https://medimotive.de/ |
| 2 | https://medimotive.de/services |
| 3 | https://medimotive.de/case-studies |
| 4 | https://medimotive.de/about |
| 5 | https://medimotive.de/contact |
| 6 | https://medimotive.de/case-coated-aluminum-parts |
| 7 | https://medimotive.de/case-production-ramp-up |
| 8 | https://medimotive.de/services/rapid-response-troubleshooting |
| 9 | https://medimotive.de/services/supplier-quality-complaint-management |
| 10 | https://medimotive.de/work-journey |

**Do not request indexing for:**

- `https://medimotive.de/gallery` (intentionally `noindex`)
- `https://medimotive.de/de/` (German fallback page only; `noindex` until full DE site is approved — see `source-truth/de-launch-status.md`)
- `https://medimotive.de/imprint` / `https://medimotive.de/privacy` (legal drafts, noindex until publish step)

---

## 3. Add a backup verification method (recommended)

**Settings** (gear) → **Ownership verification** → **Add verification method**

Pick one:

| Method | When to use |
|--------|-------------|
| **DNS TXT** | Best backup; survives redeploys. Add the TXT record Strato shows for `medimotive.de`. |
| **HTML tag** | Add `metaContent` to `google-site-verification.config.json`, run `npm run gsc:verify` + deploy. |

Keep the **HTML file** method in place; do not delete `google7e5a6b2842c9dcf1.html` from the repo root.

---

## 4. What to watch (first 2–4 weeks)

| Report | What you want |
|--------|----------------|
| **Pages** → Indexed | Count rises toward ~17; old WordPress URLs should drop off over time |
| **Pages** → Not indexed | Investigate only if important URLs stay excluded after 2+ weeks |
| **Sitemaps** | `sitemap.xml` = Success |
| **Experience** → Core Web Vitals | No urgent fixes required for a static site; check if mobile URLs flag issues |

**Snippets still showing old WordPress text?** That is stale index, not live HTML. After indexing requests, allow **days to a few weeks** for Google to refresh. You can confirm live HTML anytime with URL Inspection → **View tested page** → **More info** → HTML.

---

## 5. Optional: remove old URLs from results

If obsolete URLs still appear in Google (old blog paths, `www` duplicates):

1. **Settings** → **Removals** → **New request** → **Temporarily remove URL** (only for urgent cases; expires after ~6 months)
2. Prefer fixing redirects in `vercel.json` and letting crawl replace them (301s are already set for flat expertise paths → `/services/...`)

Ensure Search Console has **both** `https://medimotive.de` and, if you use it, `https://www.medimotive.de` as properties, or set a single preferred host in DNS/Vercel.

---

## Deploy checklist (when you change the site)

```bash
npm run gsc:verify    # keeps google*.html at repo root
npm run sitemap       # refresh sitemap.xml
vercel --prod --yes
```

Re-submit sitemap in GSC only if you add/remove major sections; Google re-reads it automatically on crawl.
