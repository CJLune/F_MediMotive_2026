# MediMotive — SEO Optimization Prompt

## Audit findings summary

| Issue | Pages affected | Priority |
|---|---|---|
| Meta descriptions over 160-char limit | services, our-approach, about, certificates | HIGH |
| FAQPage schema missing on 6 expertise detail pages (FAQ HTML exists, no schema) | all 6 detail pages | HIGH |
| Service schema missing on all 6 expertise detail pages | all 6 detail pages | HIGH |
| H1 tags contain zero searchable keywords | services, our-approach, about, work-journey | HIGH |
| H2 "What this work covers" identical on all 6 detail pages | all 6 detail pages | HIGH |
| gallery.html noindex but serves as hub — passes zero link equity | gallery.html | MEDIUM |
| Founder jobTitle in schema is previous employer title, not MediMotive role | about.html | MEDIUM |
| No sameAs LinkedIn/XING in Person schema | about.html, certificates.html | MEDIUM |
| HowTo schema missing on our-approach.html (step-by-step content exists) | our-approach.html | MEDIUM |
| Duplicate title tags: gallery.html + work-journey.html both say "Visual Proof" | gallery + work-journey | MEDIUM |
| No hreflang x-default tags on any page | all pages | MEDIUM |
| About.html title uses "Company Profile" — not search-intent language | about.html | LOW |
| Our-approach.html title is 70 chars — over Google display limit | our-approach.html | LOW |
| Internal body links between expertise detail pages absent | all 6 detail pages | LOW |

---

## Files to edit

All HTML files in the project root. No CSS or JS changes needed.

**Core pages:**
- `services.html`
- `our-approach.html`
- `about.html`
- `gallery.html`
- `work-journey.html`
- `certificates.html`

**Expertise detail pages:**
- `rapid-response-troubleshooting.html`
- `supplier-quality-complaint-management.html`
- `ramp-up-process-stability.html`
- `early-phase-risk-design-for-quality.html`
- `qms-audit-regulatory-support.html`
- `knowledge-gap-transition-security.html`

**Do NOT change:** Content text, h3 section prose, nav HTML, footer HTML, `vercel.json`, any CSS, JavaScript.

---

## Fix 1 — Meta descriptions: trim all over-limit descriptions

**Rule:** Max 155 characters. Must include a primary keyword phrase and a clear benefit.
Do NOT use the phrase "MediMotive's manufacturing-quality evidence hub" — this is internal jargon that means nothing to a search user.

### Replacements (exact strings to find and replace):

**services.html** (current: 189 chars)
```
Find: content="Manufacturing-quality expertise for troubleshooting, supplier escalation, ramp-up stability, early-phase risk, QMS and regulatory support, and knowledge transfer — with verified case links."

Replace: content="Six manufacturing quality work areas — troubleshooting, supplier escalation, ramp-up stability, early-phase risk, QMS, regulatory support. Shop-floor first, verified case outcomes."
```

**our-approach.html** (current: 194 chars)
```
Find: content="How MediMotive traces quality problems to the real failure path — across supplier decisions, specification gaps, production behaviour, and management choices — so the right action becomes clear."

Replace: content="How MediMotive traces manufacturing quality failures to their real cause — across supplier decisions, specification gaps, and production behaviour — so the right corrective action is clear."
```

**about.html** (current: 203 chars)
```
Find: content="Practical quality work close to production — MediMotive's company philosophy, founder background, and credentials behind 20+ years in manufacturing quality, supplier escalation, QMS, and regulatory work."

Replace: content="MediMotive founder background and company philosophy — 20+ years in manufacturing quality, supplier escalation, QMS, and regulatory work. Based in Delmenhorst, serving Germany and beyond."
```

**gallery.html** (current: 170 chars, noindex — still update for social sharing)
```
Find: content="Visual proof within MediMotive's manufacturing-quality evidence hub — certificate records and work journey from shop-floor, supplier, and regulated manufacturing context."

Replace: content="Certificate records and work-context photos from MediMotive — formal qualifications and shop-floor evidence from manufacturing quality, supplier, and regulatory work."
```

**work-journey.html** (current: 180 chars)
```
Find: content="Visual proof from MediMotive's manufacturing-quality evidence hub — shop floor, suppliers, regulated environments, and international quality work. Anonymised professional contexts."

Replace: content="Work-context photos from MediMotive — shop floor, supplier interfaces, regulated manufacturing, and international quality work. Real professional contexts, anonymised where needed."
```

**certificates.html** (current: 166 chars)
```
Find: content="Formal credentials supporting MediMotive's manufacturing-quality evidence hub — audit, methods, quality management, regulatory affairs, and applied AI qualifications."

Replace: content="20+ formal qualifications supporting MediMotive's manufacturing quality work — VDA 6.3, ISO 13485, EU-MDR, ISO 9001, post-market surveillance, and applied AI in audits."
```

**qms-audit-regulatory-support.html** (current: 154 chars — short but uses internal jargon)
```
Find: content="QMS, audit and regulatory support within MediMotive's evidence hub — VDA 6.3, ISO 13485, EU-MDR, ISO 9001, and systems that function at the machine level."

Replace: content="QMS, audit and regulatory support — VDA 6.3, ISO 13485, EU-MDR, ISO 9001. MediMotive closes the gap between documented procedures and real shop-floor behaviour."
```

---

## Fix 2 — Title tags: targeted keyword improvements

### services.html
```
Find: <title>Expertise | MediMotive Manufacturing Quality Work Areas</title>
Replace: <title>Manufacturing Quality Expertise | MediMotive — 6 Work Areas</title>
```

### our-approach.html (currently 70 chars — trim to under 60)
```
Find: <title>Our Approach | MediMotive — Practical Quality Work Close to Production</title>
Replace: <title>Our Approach | MediMotive Manufacturing Quality Method</title>
```

### about.html
```
Find: <title>About MediMotive | Company Profile and Founder Background</title>
Replace: <title>About MediMotive | Björn Seiler — Manufacturing Quality Consultant</title>
```

### gallery.html (currently 25 chars — too short)
```
Find: <title>Visual Proof | MediMotive</title>
Replace: <title>Visual Proof | MediMotive Certificates &amp; Work Contexts</title>
```

### work-journey.html (duplicate "Visual Proof" with gallery.html)
```
Find: <title>Visual Proof | MediMotive Work Contexts</title>
Replace: <title>Work Journey | MediMotive Shop-Floor &amp; Manufacturing Contexts</title>
```

Also update the matching og:title in work-journey.html:
```
Find: <meta property="og:title" content="Visual Proof | MediMotive Work Contexts" />
Replace: <meta property="og:title" content="Work Journey | MediMotive Shop-Floor &amp; Manufacturing Contexts" />
```

### certificates.html — update og:title to match the HTML entity fix
```
Find: <meta property="og:title" content="Certificates &amp; Professional Qualifications | MediMotive" />
Replace: <meta property="og:title" content="Certificates &amp; Professional Qualifications | Björn Seiler · MediMotive" />
```

---

## Fix 3 — H1 tags: inject searchable keyword phrases

Do NOT rewrite the visual presentation text in the hero. The H1 is inside `<h1>` tags — find and replace only those.

### services.html
```
Find: <h1>Find the work area that matches your situation</h1>
Replace: <h1>Manufacturing Quality Expertise — Find the Work Area That Fits Your Situation</h1>
```

### our-approach.html
```
Find: <h1>Quality problems build at interfaces. That is where we work.</h1>
Replace: <h1>Manufacturing Quality Problems Build at Interfaces — That Is Where We Work</h1>
```

### about.html
```
Find: <h1>Quality work anchored in real production</h1>
Replace: <h1>Manufacturing Quality Consulting Anchored in Real Production</h1>
```

### work-journey.html
```
Find: <h1>Where the work happens</h1>
Replace: <h1>MediMotive Work Contexts — Manufacturing, Supplier, and Regulated Environments</h1>
```

### certificates.html
```
Find: <h1>Certificates</h1>
Replace: <h1>Certificates &amp; Professional Qualifications</h1>
```

---

## Fix 4 — H2 differentiation on expertise detail pages

All 6 detail pages currently share the identical h2 "What this work covers." This creates duplicate content signals and wastes keyword differentiation.

Replace each instance with a page-specific, keyword-rich h2:

### rapid-response-troubleshooting.html
```
Find: <h2>What this work covers</h2>
Replace: <h2>What Rapid Response Troubleshooting Covers</h2>
```

### supplier-quality-complaint-management.html
```
Find: <h2>What this work covers</h2>
Replace: <h2>What Supplier Quality &amp; Complaint Management Covers</h2>
```

### ramp-up-process-stability.html
```
Find: <h2>What this work covers</h2>
Replace: <h2>What Ramp-Up &amp; Process Stability Work Covers</h2>
```

### early-phase-risk-design-for-quality.html
```
Find: <h2>What this work covers</h2>
Replace: <h2>What Early-Phase Risk Control &amp; Design-for-Quality Covers</h2>
```

### qms-audit-regulatory-support.html
```
Find: <h2>What this work covers</h2>
Replace: <h2>What QMS, Audit &amp; Regulatory Support Covers</h2>
```

### knowledge-gap-transition-security.html
```
Find: <h2>What this work covers</h2>
Replace: <h2>What Knowledge Gap &amp; Transition Security Work Covers</h2>
```

---

## Fix 5 — FAQPage schema: add to all 6 expertise detail pages

Each expertise detail page has FAQ content in `<details>` elements but no `FAQPage` structured data. Add a `FAQPage` schema block to each page's `<head>` **after** the existing `<script type="application/ld+json">` blocks.

Use the exact FAQ questions already present in each page's `<details><summary>` elements. Extract the question text from each `<span class="ed-faq__q">` and the answer text from each `<div class="ed-faq__answer"><p>`.

### Template (apply to each page with the correct questions/answers extracted from that page's HTML):

```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[EXACT QUESTION TEXT FROM <span class='ed-faq__q'>]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[EXACT ANSWER TEXT FROM <div class='ed-faq__answer'>]"
      }
    }
  ]
}</script>
```

For each page, extract ALL questions and answers from the `ed-faq` section and include them all in the `mainEntity` array.

---

## Fix 6 — Service schema: add to all 6 expertise detail pages

Each expertise detail page currently has only `WebPage` + `BreadcrumbList` schema. Add a `Service` schema block to each page's `<head>`.

### rapid-response-troubleshooting.html — add after existing ld+json blocks:
```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Rapid Response Troubleshooting",
  "serviceType": "Manufacturing Quality Consulting",
  "description": "Rapid response troubleshooting for recurring defects, measurement deadlocks, and Perfect Part Paradox situations — tracing the real failure path across production, supplier, and specification interfaces.",
  "provider": {
    "@type": "Organization",
    "name": "MediMotive",
    "url": "https://medimotive.de/"
  },
  "areaServed": ["Germany", "Delmenhorst", "Bremen", "Hamburg", "Hannover", "Oldenburg"],
  "url": "https://medimotive.de/rapid-response-troubleshooting.html"
}</script>
```

### supplier-quality-complaint-management.html:
```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Supplier Quality & Complaint Management",
  "serviceType": "Manufacturing Quality Consulting",
  "description": "Supplier quality and complaint management — closing 8D loops that recur, navigating OEM escalation, reviewing quality assurance agreements, and bridging technical communication across purchasing, R&D, production, and supplier.",
  "provider": {
    "@type": "Organization",
    "name": "MediMotive",
    "url": "https://medimotive.de/"
  },
  "areaServed": ["Germany", "Delmenhorst", "Bremen", "Hamburg", "Hannover", "Oldenburg"],
  "url": "https://medimotive.de/supplier-quality-complaint-management.html"
}</script>
```

### ramp-up-process-stability.html:
```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Ramp-Up & Process Stability",
  "serviceType": "Manufacturing Quality Consulting",
  "description": "Production ramp-up and process stability — line design, supplier co-engineering from day one, DQ/IQ/OQ/PQ validation, and Poka-Yoke workshops to scale without trading quality for speed.",
  "provider": {
    "@type": "Organization",
    "name": "MediMotive",
    "url": "https://medimotive.de/"
  },
  "areaServed": ["Germany", "Delmenhorst", "Bremen", "Hamburg", "Hannover", "Oldenburg"],
  "url": "https://medimotive.de/ramp-up-process-stability.html"
}</script>
```

### early-phase-risk-design-for-quality.html:
```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Early-Phase Risk Control & Design-for-Quality",
  "serviceType": "Manufacturing Quality Consulting",
  "description": "Early-phase risk control and design-for-quality — manufacturability review, tolerance stack analysis, Design of Experiments, and specification gaps closed before the first chip is cut.",
  "provider": {
    "@type": "Organization",
    "name": "MediMotive",
    "url": "https://medimotive.de/"
  },
  "areaServed": ["Germany", "Delmenhorst", "Bremen", "Hamburg", "Hannover", "Oldenburg"],
  "url": "https://medimotive.de/early-phase-risk-design-for-quality.html"
}</script>
```

### qms-audit-regulatory-support.html:
```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "QMS, Audit & Regulatory Support",
  "serviceType": "Manufacturing Quality Consulting",
  "description": "QMS, audit and regulatory support — VDA 6.3 process audit, ISO 13485, ISO 9001, EU-MDR, CE conformity, usability, and risk management. Closes gaps between documented procedures and real shop-floor behaviour.",
  "provider": {
    "@type": "Organization",
    "name": "MediMotive",
    "url": "https://medimotive.de/"
  },
  "areaServed": ["Germany", "Delmenhorst", "Bremen", "Hamburg", "Hannover", "Oldenburg"],
  "url": "https://medimotive.de/qms-audit-regulatory-support.html"
}</script>
```

### knowledge-gap-transition-security.html:
```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Knowledge Gap & Transition Security",
  "serviceType": "Manufacturing Quality Consulting",
  "description": "Knowledge gap analysis and transition security — identifying where tacit process knowledge sits, creating transferable materials, and verifying team independence before a critical person leaves.",
  "provider": {
    "@type": "Organization",
    "name": "MediMotive",
    "url": "https://medimotive.de/"
  },
  "areaServed": ["Germany", "Delmenhorst", "Bremen", "Hamburg", "Hannover", "Oldenburg"],
  "url": "https://medimotive.de/knowledge-gap-transition-security.html"
}</script>
```

---

## Fix 7 — HowTo schema on our-approach.html

The page contains a 6-step diagnostic trace (Management → Engineering → Procurement → Supplier → Production → Quality). This maps directly to a `HowTo` schema.

Add after existing ld+json blocks in `our-approach.html`:

```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How MediMotive Traces a Manufacturing Quality Failure Path",
  "description": "A six-step diagnostic approach for tracing manufacturing quality failures from visible symptom back to upstream cause across management, engineering, procurement, supplier, production, and quality functions.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Management decision",
      "text": "High precision, high quality, ASAP — the decision is made without specifying how each function should interpret it."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Engineering interpretation",
      "text": "High quality becomes narrow tolerances. ASAP becomes a problem for procurement, not engineering."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Procurement interpretation",
      "text": "ASAP means short lead times. High quality means reliable supplier. Standard parts ordered with a high-precision drawing attached."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Supplier response",
      "text": "Supplier reads the order, reads the drawing, identifies a tolerance conflict. Confirms and delivers standard parts as ordered."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Production failure",
      "text": "Parts do not fit. Production stops."
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Quality diagnosis",
      "text": "Procurement ordered A, Engineering designed B, supplier confirmed C — nobody communicated across functions. The real failure path is now visible."
    }
  ]
}</script>
```

---

## Fix 8 — About.html schema: fix jobTitle, add sameAs

### Fix founder jobTitle (currently shows previous employer title):
```
Find: "jobTitle": "Head of Quality and Regulatory Affairs"
Replace: "jobTitle": "Founder, Manufacturing Quality Consultant"
```
(Apply this fix in BOTH `about.html` AND `certificates.html` — same error exists in both)

### Add sameAs to the Person node in about.html:

Find the founder object in the ld+json script in about.html:
```
Find: "knowsAbout": ["Production Quality", "Supplier Escalation", "VDA 6.3", "EU-MDR", "ISO 13485", "Ramp-Up Management", "Knowledge Transfer"]
```

Replace with (add sameAs after knowsAbout):
```
"knowsAbout": ["Production Quality", "Supplier Escalation", "VDA 6.3", "EU-MDR", "ISO 13485", "Ramp-Up Management", "Knowledge Transfer"], "sameAs": ["https://www.linkedin.com/in/bjoern-seiler-30481b165/", "https://www.xing.com/profile/Bjoern_Seiler4"]
```

---

## Fix 9 — Add hreflang x-default to all target pages

Each page currently has a DE nav link `hreflang="de"` on the `<a>` element but no `<link rel="alternate" hreflang>` in the `<head>`. Add both the EN self-referencing alternate and the x-default to every target page's `<head>`, immediately after `<link rel="canonical">`.

### Template (replace URL per page):
```html
<link rel="alternate" hreflang="en" href="https://medimotive.de/[PAGE-URL]" />
<link rel="alternate" hreflang="x-default" href="https://medimotive.de/[PAGE-URL]" />
```

Apply to all 12 target pages with their respective canonical URLs.

---

## Fix 10 — gallery.html: resolve noindex + hub status conflict

`gallery.html` is `noindex, follow` but functions as a hub linking to `certificates.html` and `work-journey.html`. A noindexed page passes no PageRank through its links.

**Decision: index it.** It has real content (h1, two linked sub-pages, a CTA section). Remove the noindex:
```
Find: <meta name="robots" content="noindex, follow" />
Replace: <meta name="robots" content="index, follow" />
```

Also add the missing `WebPage` schema to gallery.html (it currently only has `BreadcrumbList`):
```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Visual Proof | MediMotive Certificates & Work Contexts",
  "description": "Certificate records and work-context photos from MediMotive — formal qualifications and shop-floor evidence from manufacturing quality, supplier, and regulatory work.",
  "url": "https://medimotive.de/gallery.html",
  "isPartOf": {"@type": "WebSite", "name": "MediMotive", "url": "https://medimotive.de/"}
}</script>
```

---

## Verification checklist

After all fixes, verify:

```bash
# 1. No meta description over 160 chars
python3 -c "
import re, glob
for f in glob.glob('*.html'):
  c = open(f).read()
  m = re.search(r'<meta name=\"description\" content=\"(.*?)\"', c)
  if m and len(m.group(1)) > 160:
    print(f'{f}: {len(m.group(1))} chars — TRIM')
"

# 2. No duplicate title tags across all pages
python3 -c "
import re, glob
titles = {}
for f in glob.glob('*.html'):
  c = open(f).read()
  m = re.search(r'<title>(.*?)</title>', c)
  if m:
    t = m.group(1)
    if t in titles: print(f'DUPLICATE: {t} in {f} and {titles[t]}')
    titles[t] = f
"

# 3. Confirm all 6 detail pages have FAQPage schema
grep -l "FAQPage" rapid-response-troubleshooting.html supplier-quality-complaint-management.html ramp-up-process-stability.html early-phase-risk-design-for-quality.html qms-audit-regulatory-support.html knowledge-gap-transition-security.html
# Expected: all 6 listed

# 4. Confirm all 6 detail pages have Service schema
grep -l '"@type": "Service"' rapid-response-troubleshooting.html supplier-quality-complaint-management.html ramp-up-process-stability.html early-phase-risk-design-for-quality.html qms-audit-regulatory-support.html knowledge-gap-transition-security.html
# Expected: all 6 listed

# 5. Confirm gallery.html is no longer noindex
grep "robots" gallery.html
# Expected: index, follow
```

---

## What NOT to change

- Any visible content text, paragraphs, bullet copy
- CSS, JavaScript, or asset files
- Existing schema blocks that are correct (BreadcrumbList, existing WebPage on detail pages)
- The `hreflang="de"` nav link (this is a UI element, not a head meta)
- `imprint.html` and `privacy.html` — both are correctly `noindex`
- The `vercel.json` file
- `sitemap.xml` — update this separately after all HTML changes are done
