# German homepage draft (not deployed)

`index.html` in this folder is the **full German homepage** moved here while `/de/` serves the public fallback (`de/index.html`).

## Review locally

Open the draft in a browser from the repo root, for example:

- `de/_draft/index.html` (file URL), or
- run `npm run dev` and add a local path if your dev server is extended for drafts.

## Production

Vercel deploy excludes everything under `de/` except `de/index.html` (see `.vercelignore`). Other `de/*.html` files remain in the repo for translation review but are not published.

## Go-live (when approved)

1. Replace `de/index.html` with the approved draft (or merge from this file).
2. Add `/de/*` rewrites in `vercel.json`.
3. Remove `noindex` and enable `hreflang` per `tools/apply-seo.mjs`.
4. Update `.vercelignore` to deploy the full `de/` tree.
