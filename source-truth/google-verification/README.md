# Google Search Console verification

The live site is on **Vercel**. Google must find your verification file at the **domain root**, e.g.  
`https://medimotive.de/googleXXXXXXXX.html`

## Quick steps (HTML file method)

1. In [Google Search Console](https://search.google.com/search-console), add property **https://medimotive.de**
2. Choose verification: **HTML file**
3. **Download** the file Google gives you (name like `googleabc123….html`)
4. Save it in this folder with the **exact** name Google gave you:
   - `source-truth/google-verification/googleabc123….html`
5. From repo root run:
   ```bash
   npm run gsc:verify
   vercel --prod --yes
   ```
6. In a browser, open `https://medimotive.de/<your-exact-filename>.html` — you must see the verification line, not 404.
7. In Search Console, click **Verify**

## Alternative: config file

```bash
cp google-site-verification.config.example.json google-site-verification.config.json
# Edit JSON with exact filename and file body from Google
npm run gsc:verify
vercel --prod --yes
```

## Alternative: HTML meta tag

In Search Console, choose **HTML tag** and copy the `content="..."` value into `google-site-verification.config.json` as `metaContent`, then run `npm run gsc:verify` and deploy.

## Alternative: DNS (no deploy)

In Search Console, choose **Domain name provider** → add the **TXT** record at Strato for `medimotive.de`. No file upload needed.

## After verification

Full checklist: **[GSC-POST-VERIFICATION.md](./GSC-POST-VERIFICATION.md)** (sitemap submit, priority URLs to inspect, backup verification, what to watch).

Quick version:

1. Submit sitemap: `sitemap.xml` only (Indexing → Sitemaps)
2. URL Inspection → request indexing for homepage, services, case-studies, about, contact (see checklist for full list)
