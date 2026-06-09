# Production site URL

Used for canonical URLs, Open Graph, `sitemap.xml`, and JSON-LD `@id` / `url` fields.

**Current value:** `https://medimotive.de`

**Public page paths** are extensionless (e.g. `https://medimotive.de/services`). Source files remain `*.html` at repo root. Vercel uses explicit **rewrites** (serve) and **redirects** (`.html` → clean) — not `cleanUrls`.

After changing routes, run `npm run urls:clean` (updates committed `vercel.json`) then deploy. Verify with `node tools/verify-clean-urls.mjs https://medimotive.de`.

Update this file and re-run `node tools/apply-seo.mjs` if the live domain changes.
