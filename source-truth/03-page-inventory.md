# Page Inventory

**Repo check:** 17 HTML files in project root (2026-05-18).

## Primary site structure

This is the approved hierarchy. **Header navigation** includes only the wordmark (home) plus four links: Expertise, Case Studies, About, Contact. Everything else is reached from body copy or footer.

- `services.html` is the **expertise overview**; the six expertise detail pages sit underneath it (not in the header).
- `certificates.html` and `work-journey.html` are **proof paths** reached from About and footer (not in the header).

```text
MediMotive Website
│
├── Home / Credibility Summary
│   └── index.html
│
├── Expertise Overview
│   └── services.html
│       │
│       ├── Rapid Response Troubleshooting
│       │   └── rapid-response-troubleshooting.html
│       │
│       ├── Supplier Quality & Complaint Management
│       │   └── supplier-quality-complaint-management.html
│       │
│       ├── Ramp-Up & Process Stability
│       │   └── ramp-up-process-stability.html
│       │
│       ├── Early-Phase Risk & Design-for-Quality
│       │   └── early-phase-risk-design-for-quality.html
│       │
│       ├── QMS, Audit & Regulatory Support
│       │   └── qms-audit-regulatory-support.html
│       │
│       └── Knowledge Gap & Transition Security
│           └── knowledge-gap-transition-security.html
│
├── Case Studies
│   └── case-studies.html
│
├── About MediMotive
│   └── about.html
│       │
│       ├── Certificates Archive
│       │   └── certificates.html
│       │
│       └── Visual Proof / Work Journey
│           └── work-journey.html
│
└── Contact
    └── contact.html
```

## Outside main tree (footer or body only)

These pages exist in the repo and may be linked from **footer** or **in-page body**. They must **not** be added to the header.

| File | Role | How users find it |
|------|------|-------------------|
| `our-approach.html` | How MediMotive addresses connected manufacturing problems (problem → solution; not method reveal) | Footer Proof; homepage link |
| `gallery.html` | Optional visual proof hub | Footer only — primary visual proof entry is `work-journey.html` |
| `regions.html` | Regional and industry context | Footer only |
| `imprint.html` | Legal imprint (draft) | Footer bottom |
| `privacy.html` | Privacy policy (draft) | Footer bottom |

## Core pages (header or primary routes)

| File | Role |
|------|------|
| `index.html` | Homepage / credibility summary |
| `services.html` | Expertise overview — six area cards + **How the areas connect** (`.connect-prose`, not step cards) + hub FAQ. Copy: [12-expertise-pages.md](12-expertise-pages.md) |
| `case-studies.html` | Primary proof page |
| `about.html` | MediMotive-first company story and founder credibility |
| `contact.html` | Simple professional contact (email only) |
| `certificates.html` | Full certificate archive |
| `work-journey.html` | Work journey / visual proof (primary entry from About) |

## Expertise detail pages

| File | Role |
|------|------|
| `rapid-response-troubleshooting.html` | Production crisis and troubleshooting |
| `supplier-quality-complaint-management.html` | Supplier complaints and OEM escalation |
| `ramp-up-process-stability.html` | Ramp-up and process stability |
| `early-phase-risk-design-for-quality.html` | Early risk and design-for-quality |
| `qms-audit-regulatory-support.html` | QMS, audit, regulatory support |
| `knowledge-gap-transition-security.html` | Knowledge transfer and transition security — FAQ copy in [12-expertise-pages.md](12-expertise-pages.md); body training boundary still pending alignment |

## Supporting pages

| File | Role |
|------|------|
| `our-approach.html` | Our Approach — problem-led working philosophy; links to expertise and case proof |
| `gallery.html` | Visual proof hub (secondary to `work-journey.html`) |
| `regions.html` | Regional & industry context (MediMotive-first copy; May 2026 adaptation) |

## Legal pages

| File | Status |
|------|--------|
| `imprint.html` | Draft placeholder — legal review required |
| `privacy.html` | Draft placeholder — GDPR review required |
| `terms.html` | Not published — footer link removed |

## Rule

If a page is linked from the header, footer, or body, it must exist.

See [page-status.csv](page-status.csv) for machine-readable status.
