# Search Console sitemaps — when everything shows “Couldn’t fetch”

## Your site is OK (verified externally)

These URLs return **200** and valid content:

- https://medimotive.de/sitemap.xml (XML)
- https://medimotive.de/google-sitemap.xml (XML)
- https://medimotive.de/robots.txt (points to sitemap)

GSC errors do **not** mean the files are missing on the server.

---

## Common mistakes (from your screenshots)

| Mistake | Fix |
|--------|-----|
| Submitted **`/`** or **`services`** | Those are **HTML pages**, not sitemaps. Ignore their red status. |
| Opened **Removals** to delete sitemaps | **Removals** = hide pages from Google Search. It does **not** manage sitemaps. Use **Indexing → Sitemaps** only. |
| Can’t delete old rows | **Normal.** Leave them; they don’t block indexing. |
| Submitted many sitemaps same day | Google may still show errors for 24–72h after DNS/SSL changes. |

---

## One test that matters (do this now)

1. Search Console → top bar **URL inspection**
2. Paste: `https://medimotive.de/sitemap.xml`
3. Click **Test live URL**
4. Read the result:

| Result | Meaning |
|--------|---------|
| **URL is available** / success | Google **can** reach the file now. Sitemap table will catch up; use URL Inspection on pages to index. |
| **Failed** / 403 / 401 | **Vercel Deployment Protection** or firewall is blocking Google → fix in Vercel (below). |
| **Failed** / DNS | Check Strato DNS: **A** → `76.76.21.21`, **remove bad AAAA** records. |

---

## Vercel: allow Google (if live test fails)

1. https://vercel.com → project **f-medi-motive-2026**
2. **Settings → Deployment Protection**
3. For **Production**: turn **OFF** password / Vercel Authentication / “Standard Protection” that blocks visitors
4. **Settings → Firewall** (if enabled): don’t block bots on production
5. Save, wait 5 minutes, run **Test live URL** again on the sitemap

---

## What to submit in Sitemaps (only once)

Property: **https://medimotive.de/**

Enter only:

```
sitemap.xml
```

Do **not** submit `/`, `services`, or full `https://...` URLs again.

---

## Index without waiting for green sitemaps

Sitemap status does **not** block manual indexing:

1. **URL inspection** → `https://medimotive.de/` → **Request indexing**
2. Repeat for `/services`, `/about`, `/contact`, `/case-studies`

---

## When to worry

- **URL inspection live test** on `sitemap.xml` fails after Vercel/DNS fixes
- **Manual actions** report shows an issue (Settings → Manual actions)

Otherwise: red sitemap rows are cosmetic if the live test passes.
