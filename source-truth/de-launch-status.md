# German (`/de/`) launch status

**Last updated:** 2026-06-03

## Current production behaviour

- `https://medimotive.de/de/` → fallback page (`de/index.html`) — **noindex, follow**
- All other `/de/*` URLs → **307 redirect** to `/de/` (see `vercel.json`)
- Draft homepage: `de/_draft/index.html`
- Other German HTML files in `de/` are **not deployed** (`.vercelignore`)

## Header language switch

English pages: **DE** → `/de/` (fallback). Correct — do not change to `/de/about` until go-live.

## Go-live checklist

- [ ] Content review sign-off on all `de/*.html`
- [ ] Missing pages: `privacy`, `certificates`, `work-journey`, `regions`
- [ ] Replace `de/index.html` with approved homepage; remove internal review note from fallback
- [ ] Add `vercel.json` rewrites for `/de/services`, `/de/about`, etc.
- [ ] Update `.vercelignore` to deploy full `de/` tree
- [ ] Remove `/de/:path+` → `/de/` redirect block
- [ ] Remove `noindex` from marketing DE pages; set `HREFLANG_CLUSTER_ENABLED` in `tools/apply-seo.mjs`
- [ ] Reciprocal `hreflang` on EN + DE pairs
- [ ] Extend sitemap when indexable
- [ ] GSC: request indexing for tier-1 `/de/` URLs only after above
