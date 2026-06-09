# About Page Source Truth

## Goal

The About page must be MediMotive-first and Björn-supported.

It should explain what MediMotive stands for before introducing Björn as the founder.

It must not feel like Björn’s CV.

The About page should keep the current friendly and approachable founder section. Do not make the page colder or more corporate.

The About page should be polished, not rebuilt.

The section “Practical, fair, and straightforward” is approved as the human trust layer. It should remain after the MediMotive philosophy and principles.

## Locked Section Order

1. Hero — About MediMotive
2. Company philosophy — Built for practical quality work, not paper consulting
3. What MediMotive stands for
4. Founder behind the MediMotive approach
5. Work journey / visual proof
6. Credentials summary
7. Proof in real projects

## Hero Copy Anchor

H1:

About MediMotive

Lead:

MediMotive stands for practical quality work close to production. We connect shop-floor reality, supplier communication, regulatory expectations, and management decisions so quality problems can be understood where they actually happen — not only where they are documented.

Second paragraph:

The company was founded by Björn Seiler and is shaped by more than 20 years of production quality, supplier escalation, QMS, regulatory, and leadership experience across demanding manufacturing environments.

Allowed buttons:

- View case studies → `case-studies.html`
- Explore expertise → `services.html`
- View certificates → `certificates.html`
- View visual proof → `gallery.html`

## Company Philosophy Anchor

H2:

Built for practical quality work, not paper consulting.

Copy anchor:

At MediMotive, quality is understood as something created at the workbench, on the assembly line, at the machine, and in the decisions that shape the process around them.

The focus is on situations where quality problems become expensive because the real cause sits between departments: supplier expectations, drawings, purchasing decisions, production habits, undocumented knowledge, audit pressure, or management decisions.

The goal is not to create more paperwork. The goal is to make the real failure path visible and turn it into practical, repeatable action.

## What MediMotive Stands For

Use three cards:

### Shop-Floor Pragmatism

We start with the real process, not the paperwork. A rejected part, a measurement result, a production habit, or a supplier conversation often explains more than a meeting room ever can.

### Organic Connectivity

Quality problems rarely live in one department. Purchasing, R&D, suppliers, production, quality, documentation, and management decisions affect one another — and weak interfaces create expensive failures.

Keep this card **problem-led** on About. Do not name proprietary methods here. For a fuller problem → solution narrative, link to `our-approach.html` per [11-our-approach-page.md](11-our-approach-page.md).

### Transition Security

Manufacturing companies become fragile when they scale, change suppliers, lose experienced people, or enter stricter customer and regulatory environments. MediMotive makes those risks visible before they become expensive.

## Founder Section Anchor

Eyebrow:

The founder behind the MediMotive approach

H2:

Practical, fair, and straightforward

Copy:

Lead paragraph: 20+ years through engineering, industrial training, quality management, supplier coordination, regulatory affairs, and quality leadership (HoReCa, automotive, logistics, medical-device).

Second paragraph: practical character — shop floor, CAPA/audit, OEM escalation, supplier/customer communication, quality/regulatory leadership in transition phases.

Bullets (“That experience also includes”): international QA agreements; supplier relationships across continents; leading teams and departments.

Third paragraph: disciplines — Law, Electrical Engineering, Supply Chain Management, Regulatory Affairs, and Business Education; translation across engineers, production, suppliers, auditors, official authorities, and management.

Quote (in `.about-founder__quote-band`, below the grid):

“Most problems are not solved by another form. They are solved when a diverse group of people works together with the same mindset and with a common understanding.”
— Björn Seiler

### Founder layout (responsive)

- **Desktop / tablet (`641–920px`):** left-aligned eyebrow + H2; `.about-founder__layout` is a 2-column grid — `.about-founder__body` (lead, paragraphs, highlights list) left; `.about-founder__portrait-col` (portrait only) right, sticky from `641px`. Quote is a full-width band in `.about-founder__quote-band` below the grid (max-width ~52rem, centered card).
- **Mobile (`<=640px`):** single column — body first, then portrait (`min(100%, 360px)` centered), then quote band.
- Spec: [06-design-system.md](06-design-system.md) (Portraits), tokens: [design-system-tokens.md](design-system-tokens.md) (Phase B notes).

## Work Journey / Visual Proof

Section title:

Where the work happens

Copy anchor:

The work behind MediMotive was built in real manufacturing contexts: machines, assembly areas, supplier discussions, audits, travel, and management conversations where technical facts had to become decisions.

Use four cards:

- Shop-floor foundation
- Supplier and customer bridge
- Regulated manufacturing
- International work context

About “View visual proof” links go to `work-journey.html` directly.

## Credentials Summary

About should summarize credentials by category only.

Do not list all 20 certificate records on About.

Credential groups:

- Process audit: VDA 6.3, DGQ/EOQ Quality Auditor
- Medical-device quality and regulatory: EU-MDR PRRC, ISO 13485, risk management
- Automotive and product safety: VDA product safety context
- Management systems: QMS, ISO 14001, ISO 9001 climate-action context
- International communication: Chinese Level 1 and Germany–Asia supplier context
- Applied AI in audits: DGQ continuing education in AI-supported audit work

Button:

View all certificate records → `certificates.html`

## Proof in Real Projects

H2:

Proof in real projects

Copy:

The strongest proof of MediMotive’s thinking is shown in the case studies: a supplier-related field exposure reversed through process redesign, and a production ramp-up from 100 units per year to 1,500 per month.

Button:

View case studies → `case-studies.html`

## About Page Audit

After any About edit, confirm:

- About starts with MediMotive, not Björn
- Founder section appears after MediMotive philosophy and principles
- Björn is visible but not the whole page
- all 20 certificates are not listed on About
- `certificates.html` remains the full archive
- visual proof links go to `work-journey.html` directly
- founder block: at `768px` quote + portrait are side by side; at `640px` / `375px` portrait is centered in stack (no horizontal overflow)
- no repeated philosophy blocks
- no empty image placeholders
- page feels like About MediMotive, not Björn’s CV
