# UI/UX audit status

Last updated: 2026-05-31  
Benchmark: [design-references.md](design-references.md), [02-constraints.md](02-constraints.md)  
Full audit narrative: conversation export (May 2026) — this file is the **live checklist**.

Update note (2026-05-28): responsive + UX follow-up pass — homepage gutters/compare section, navbar wordmark, scroll-to-top, security headers, contact email obfuscation, **About founder quote + portrait layout** (tablet 2-col, mobile centered stack).

Update note (2026-05-31): typography readability pass (homepage + services); homepage stages evolution images; **expertise hub + detail image parity** (all six areas — see [07-assets-and-media.md](07-assets-and-media.md)); Case Studies hero network background strengthened on the right; QMS detail synced to hub PNG.

## Done

| Item | Notes |
|------|--------|
| Homepage editorial hero + chapter nav + tiers | `index.html` |
| Case Studies visual proof | Featured row, jump nav, intro splits + images; hero **network mesh** (`.case-hero-network`) — canvas animation in `assets/app.js` (`initCaseStudiesHeroNetwork`), styles in `assets/case-studies-upgrade.css`; right-side ambient/grid/noise + canvas mask for visible fill beside left editorial panel |
| Expertise detail heroes | Redesigned — Option B qualifier hero (number badge + situation label + chips) + WQS editorial body + area-specific FAQ (4 Q&amp;A on pages 01–04, 3 on 05–06; before CTA). Canonical copy: [12-expertise-pages.md](12-expertise-pages.md). `assets/expertise-detail.css` |
| Expertise hub “How the areas connect” | `services.html` — `.connect-prose` editorial block (replaced Observe/Translate/Stabilise/Transfer step cards). Copy: [12-expertise-pages.md](12-expertise-pages.md) · `assets/expertise-upgrade.css` |
| Footer founder portrait link | Live root pages: portrait + founder name → `about.html#founder` (not XING on portrait) |
| About editorial hero + founder block + bento collage | `about-page` — founder section responsive: `641–920px` keeps quote + portrait in 2 columns; `<=640px` single column with centered portrait (`min(100%, 360px)`) — `.about-founder__layout` in `assets/styles.redesign.css` |
| Contact centered hero + card layout | `contact-page` — **locked** in `assets/contact-upgrade.css` + [08-contact-and-facts.md](08-contact-and-facts.md) |
| Breadcrumbs | Services, Cases, 6 expertise, About, Contact, Work journey |
| Inline `style=` removed | Live root HTML only |
| Heavy JPG compression | CMM + travel images |
| Founder figcaption clip | `about-founder__portrait-media` |
| Founder name repetition | About hero vs founder section |
| Footer LinkedIn + XING (icon + label) | All live root pages — inline SVG + visible “LinkedIn” / “XING” labels (not icon-only); linked XING per [08-contact-and-facts.md](08-contact-and-facts.md). Tablet/mobile (≤920px): icon + name stay on one line — `.footer .social-link` in `assets/styles.css` (`inline-flex`, `nowrap`; overrides footer `inline-block` / word-break) |
| Legal review drafts | `imprint.html`, `privacy.html` + [10-legal-client-review.md](10-legal-client-review.md) |
| OG social image 1200×630 | `og-medimotive.jpg` + `npm run build:og` |
| EN/DE switcher + skip link + BCG motion | Global — single header `.nav-lang` (visible ≤920px beside menu; not duplicated in mobile drawer); DE placeholder disabled until copy ships |
| Our Approach content alignment | `our-approach.html` — problem → solution → proof; method-reveal copy removed ([known-gaps.md](known-gaps.md)) |
| Gallery launch decision | `gallery.html` stays `noindex` and orphaned; live visual proof → `work-journey.html` ([known-gaps.md](known-gaps.md)) |
| Self-hosted fonts (Montserrat + Roboto) | Replaced Google Fonts CDN with `assets/fonts/` — zero external font requests |
| Homepage responsive remediation (tablet/mobile) | `index.html` sections stabilized: container gutters restored, overflow removed at 920/640/375, compare section spacing/cards adjusted for tablet+mobile |
| Navbar wordmark responsive fit | Header brand (`MediMotive`) spacing/sizing tightened for tablet/mobile to prevent clipping and preserve compact nav |
| Scroll-to-top UX hardening | Right-pinned button with explicit hidden/visible state logic (`.is-visible`) and improved footer contrast so it remains visible near dark footer |
| Security headers on Vercel hosting | Added/verified `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` via `vercel.json` |
| Contact email obfuscation in live HTML | Visible email + `mailto:` values entity-encoded (`&#64;`, `&#46;`) in root live pages (excluding JSON-LD) to reduce basic harvesting |
| Contact page email UX | Hero: **one** highlighted email line (`.contact-hero__email`: “Send Email to:” + `info@medimotive.de`); no duplicate link; ambient/canvas `pointer-events: none`; content `z-index: 2` |
| About founder block (tablet/mobile layout) | Quote (`.human-note`) + portrait (`.about-founder__portrait`) no longer stack awkwardly at tablet: 2-col editorial pair at `641–920px`; centered portrait + tuned quote spacing at `<=640px` — verified in built `assets/styles.css` |
| Typography readability (homepage) | Body **17px**, lead **18px**, card H3 **19px** (desktop); section labels stay **13px**. `@layer utilities` block at end of `assets/styles.redesign.css` (`.home-main.home-main` + `!important`) wins over Tailwind preflight. Run `npm run build:css` after `styles.redesign.css` edits |
| Typography readability (services + expertise detail) | Services hub prose/cards via `assets/expertise-upgrade.css`; expertise detail body via post-build rules in `assets/input.css` where needed — services page has no `.home-main` |
| Homepage stages evolution media | `#home-stages` peel animation: base CMM `assets/images/homepage_img/project-cmm-contura-measurement.png`, peel layer `homepage_img/caliper.png` (both 1200×900); unified `object-fit: cover` + `object-position: center`; scroll-driven peel in `assets/app.js` (`initStagesEvolution`) |
| Expertise hub + detail image parity | `services.html` bento + all six detail pages share the same `assets/images/service_page_img/expertiseN_*.png` paths (hub hero: `ishikawa_brainstorming.png`). QMS detail updated from legacy `project-experience/qms-process-mapping-workshop.jpg` → `expertise5_QMS_audit_RS.png`. Mapping table in [07-assets-and-media.md](07-assets-and-media.md) |
| Expertise bento media crop | `object-fit: cover` + hover `scale(1.03)` in `assets/expertise-upgrade.css` — brief `contain` experiment reverted per client preference |

## Open — launch blockers

| Priority | Item | Action |
|----------|------|--------|
| P0 | Legal publish | Counsel approves copy → `node tools/publish-legal.mjs --confirm` |
| P0 | Legal pages: complete all Confirm fields | Counsel review → node tools/publish-legal.mjs --confirm (see 10-legal-client-review.md) |

## Open — professional polish

| Priority | Item | Action |
|----------|------|--------|
| P1 | German (DE) copy | When ready; test longer strings in nav/hero |
<!-- German pages require <html lang="de"> -->
| P1 | XING profile URL | Add link when client confirms ([08-contact-and-facts.md](08-contact-and-facts.md)) |
| P2 | Design system parity | Phase A **complete** for live supporting pages — [design-system-tokens.md](design-system-tokens.md) |
| P2 | Breadcrumbs | Done on all proof/supporting pages except legal (draft) |
| P2 | Body classes | Done on all scoped inner pages (see design-system-tokens) |
| P3 | Services featured expertise row | One highlighted card + grid |
| P3 | Case Studies sticky sub-nav | Optional |
| P3 | Lighthouse + WCAG contrast pass | Home, About, Case Studies targets |
| P3 | `npm run verify:content` | Run after copy changes |
| P3 | OG image URL | Resolves automatically on domain switch to medimotive.de — verify og:image resolves after launch |
| P3 | Footer DRY chrome | All 17+ pages share duplicated footer markup — migrate to Astro/11ty post-launch |
| Later | Astro/11ty for DRY chrome | No visual change required |

## Stale docs (fix when touching that area)

| File | Stale claim | Reality |
|------|-------------|---------|
| [known-gaps.md](known-gaps.md) | Founder figcaption may clip | **Fixed** — remove or update UI section |
| [known-gaps.md](known-gaps.md) | Homepage hero media panels commented out | Verify `index.html` — hero image is live |
| [07-assets-and-media.md](07-assets-and-media.md) | Listed only `project-experience/` for page images | **Updated 2026-05-31** — adds `service_page_img/` + `homepage_img/` and expertise mapping |
| [AUDIT.txt](../AUDIT.txt) | Superseded | Use this file + source-truth |

## v1 professional definition of done

- [ ] Every primary page: clear hero + one obvious next step
- [ ] Case Studies match homepage proof quality (visual + metrics)
- [x] No inline `style=` on live pages
- [ ] Critical images ≤ ~400KB on main user paths (spot-check deploy)
- [ ] Lighthouse Performance ≥90, Accessibility ≥95 (home, about, case-studies)
- [ ] Legal live; `noindex` only where intentional
- [ ] `npm run verify:content` passes

## Phase map

| Phase | Focus | Status |
|-------|--------|--------|
| A | Tokens + inner-page hero/section parity | **Done** (May 2026) — all live inner pages scoped |
| B | Responsive polish on supporting pages + Gallery/Work journey dedupe; Our Approach content **done** | **In progress** — homepage + About founder + navbar/scroll-to-top baseline in [design-system-tokens.md](design-system-tokens.md) |
| C | Legal publish + DE + XING | Waiting on client/counsel |
| D | Verification (Lighthouse, contrast, verify-content) | Not started |
