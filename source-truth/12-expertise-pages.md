# Expertise hub and detail pages — canonical copy

**Last updated:** 2026-05-31  
**Live files:** `services.html`, six expertise detail pages (`rapid-response-troubleshooting.html` through `knowledge-gap-transition-security.html`)  
**CSS:** `assets/expertise-upgrade.css`, `assets/expertise-detail.css`, `assets/input.css` (FAQ intro centering)

Read with [00-positioning-source-truth.md](00-positioning-source-truth.md) §9–10 (six work areas; training boundary). This file is the **approved on-page copy** for expertise hub + detail FAQs unless counsel or client requests a change.

---

## Expertise overview — `services.html`

### Section: How the areas connect

**Structure (2026-05-31):** Replaced four-step cards (Observe / Translate / Stabilise / Transfer) with editorial prose (`.connect-prose`). No step pills or numbered framework on this page — methodology belongs on [11-our-approach-page.md](11-our-approach-page.md) / `our-approach.html`.

**Heading:** How the areas connect  

**Removed intro paragraph** (content moved into prose block).

**Prose block (`.connect-prose`):**

| Block class | Copy |
|-------------|------|
| `connect-prose__lead` | Most quality failures are not contained inside one function. |
| `connect-prose__body` (×2) | The defect appears in assembly. The root cause is in the drawing. The real decision was made in purchasing six months earlier. The documentation that should have caught it was written by someone who has since left. |
| | Each of the six work areas above reflects a different zone where these failures occur — machining, supplier interfaces, process stability, early-phase risk, QMS, and knowledge continuity. What makes the combination useful is not that each area is covered individually. It is that quality problems rarely stay inside one of them. |
| `connect-prose__callout` | Failure at the interface between supplier communication and internal specification is not a supplier quality problem. It is not a documentation problem. It is both — and fixing only one side produces a report, not a solution. |
| `connect-prose__close` | Twenty years of manufacturing quality work built across these areas — not specialised in one of them — means the diagnostic view follows where the problem actually goes. |

**CTAs (unchanged):** View case studies → `case-studies.html` · Read Our Approach → `our-approach.html`

**Layout:** Left-aligned editorial column (`max-width: 42rem`); CTAs left-aligned under prose on desktop; centered FAQ-style intro patterns do not apply here.

---

## Expertise detail pages — shared patterns

| Element | Rule |
|---------|------|
| FAQ section id | `#faq` |
| FAQ heading | Common questions about this work area |
| FAQ count | **4** on pages 01–04; **3** on pages 05–06 (no “verified outcomes” FAQ) |
| FAQ intro | One paragraph + link to `services.html#faq`; **centered** (`.ed-faq__intro`) |
| Accordion | `<details name="{area}-faq">` — one `name` per page |
| Case links | Case 01 → `case-coated-aluminum-parts.html` · Case 02 → `case-production-ramp-up.html` |

**Footer founder portrait (all live root pages except homepage pattern):** `about.html#founder` — not XING on portrait click ([08-contact-and-facts.md](08-contact-and-facts.md) for XING in footer list).

---

## 01 — Rapid Response Troubleshooting

**File:** `rapid-response-troubleshooting.html`  
**FAQ intro:** Practical answers for leaders evaluating rapid response troubleshooting. For questions across all six work areas, see common questions on the expertise hub.

### FAQ

**Q1:** When is rapid response different from our usual quality process?  
**A1:** This work applies when all internal methods have failed: a defect keeps reappearing again and again, suppliers stop delivery due to unsolved quality disagreements, or your customer put you on hold — and the usual corrective-action cycle has already failed. We focus on the whole picture with all its functions (design, supplier, production, quality, assembly) with an unbiased look. We do not just make another round of paperwork about the visible symptom.

**Q2:** What happens first when MediMotive gets involved?  
**A2:** The first step is not a report. It is a walk-through of the real process — the machine, the rejected part, the measurement results, the production habits, and where the failure appears in the sequence. Documentation shows what was recorded; the shop floor reveals what actually happens.

**Q3:** Can you help when every part meets the drawing but assembly still fails?  
**A3:** Yes. That is the “Perfect Part Paradox” — individually acceptable components producing an assembly failure no single-part inspection would catch. The investigation looks at tolerance stack, interfaces, and production habits, not only whether each part passed inspection.

**Q4:** Is there a verified troubleshooting example?  
**A4:** Yes. The coated-aluminium case documents a field failure where the visible symptom was coating-related but the real failure path was sub-surface material instability masked by supplier over-processing. Link: Read the full case → `case-coated-aluminum-parts.html`

---

## 02 — Supplier Quality & Complaint Management

**File:** `supplier-quality-complaint-management.html`  
**FAQ intro:** Practical answers for leaders facing supplier complaints, OEM escalation, or quality agreement risk. For questions across all six work areas, see common questions on the expertise hub.

### FAQ

**Q1:** Should MediMotive be involved before or after we sign a quality assurance agreement?  
**A1:** Before, when possible. The most expensive supplier problems are test specifications that do not reflect the reality, written by lawyers instead of practitioners. Another issue are performance standards that were assumed to be clear, but never written into the agreement. Once the obligation is binding, your position in a field complaint is weaker if the failing property was never specified.

**Q2:** Can you help when our QA keeps sending complaints but the supplier insist the parts are as ordered?  
**A2:** Yes. Measurement deadlocks and complaint loops that generate 8D reports without working results are a core part of this work. We’re experienced in multiple production technologies, standards and industries. We’re working on finding a solution to get the process running again, not on winning an argument.

**Q3:** What does technical bridge communication mean in practice?  
**A3:** It means aligning R&D, purchasing, supplier, and customer on the same production problem when each function uses different terminology. The goal is a common understanding on what is what — not more reports exchanged between quality departments.

**Q4:** Is there a verified supplier – quality example?  
**A4:** Yes. Case 01 shows how a missing adhesion standard in the quality specification left no contractual basis to reject parts when failure reached customers — and how specification revision was part of the resolution. Link: Read the full case → `case-coated-aluminum-parts.html`

---

## 03 — Ramp-Up & Process Stability

**File:** `ramp-up-process-stability.html`  
**FAQ intro:** Practical answers for leaders scaling production without trading stability for speed. For questions across all six work areas, see common questions on the expertise hub.

### FAQ

**Q1:** When should critical suppliers be involved in a ramp up or product development?  
**A1:** As early as possible — in any case before the internal specification is fixed. Co-engineering brings supplier capabilities, new technology options and possible constraints into the thinking model before assumptions collide with supply-chain reality during ramp-up.

**Q2:** Can quality stay stable while volume increases sharply?  
**A2 (two paragraphs):**  
- That is the objective. This work connects line design, supplier readiness, changed customer expectations and shop-floor behavior so scaling does not trade process stability for volume.  
- Often, quality can even increase with volume due to different production technologies.

**Q3:** Do regulatory requirements stay the same when we don’t change the product?  
**A3:** The clear answer is „It depends“: On the market, on the customer, on the material, on the way or place of production, transport and technological development. We have vast experience on this field and can give practical guidance.

**Q4:** Is there a verified ramp-up example?  
**A4:** Yes. Case 02 documents demand growth from 100 units per year to 1,500 per month in 12 months, with line redesign, supplier co-engineering, and stable quality on the first high-volume batch. Link: Read the full case → `case-production-ramp-up.html`

---

## 04 — Early-Phase Risk & Design-for-Quality

**File:** `early-phase-risk-design-for-quality.html`  
**FAQ intro:** Practical answers for leaders reviewing risk before production release. For questions across all six work areas, see common questions on the expertise hub.

### FAQ

**Q1:** When is the right time for a design-for-quality review?  
**A1 (two paragraphs):**  
- Before the first chip is cut — when manufacturability, tolerances, and unspoken expectations can still be integrated into the specifications. Prevention at this stage is typically far cheaper than field exposure after production has started.  
- Also before substantial changes to product, process or relevant conditions such as new suppliers, new laws, significant changes in production volume or expansion to new markets.

**Q2:** What does „hidden expectations“ mean?  
**A2:** Requirements that will generate complaints the moment they are not met, but were never written into the specification or quality agreement — often surface quality, adhesion, dimensional stability under load, or environmental resistance that both customer and supplier assumed were covered. Cultural differences in different markets are another point to add.

**Q3:** How does tolerance stack risk show up before production?  
**A3:** Individually acceptable components can still produce assembly failure in the build context. Review looks at how the combination behaves in the real assembly sequence — not only whether each part passes drawing limits in isolation.

**Q4:** Is there a verified early-phase failure example?  
**A4:** Yes. Case 01 shows a coated-aluminium field programme where coating adhesion strength was never specified — a gap that would have been far cheaper to close in the specification than to resolve in the field. Link: Read the full case → `case-coated-aluminum-parts.html`

---

## 05 — QMS, Audit & Regulatory Support

**File:** `qms-audit-regulatory-support.html`  
**FAQ intro:** Practical answers for leaders preparing audits or closing gaps between documentation and shop-floor behaviour. For questions across all six work areas, see common questions on the expertise hub.

### FAQ (3 items — removed “verified outcomes” FAQ)

**Q1:** How is this different from preparing documents only for an audit?  
**A1 (two paragraphs):**  
- We check whether following the documented process produces the intended result at the machine — or whether experienced workers know to do something different. This work closes the gap between what the quality manual says and what actually happens in production, not only what satisfies an auditor on the day.  
- We also check whether your ISO-Standard conform process passes the “reality check” in production, procurement, sales, service, marketing, …

**Q2:** What standards and audit contexts does this work cover?  
**A2:** Our practical experience includes VDA 6.3 process audits, IATF 16949, ISO 9001, ISO 13485, EU-MDR (2017/745/EU), CE – compliance, Usability, Risk Management, Product and Process Validation (DQ/IQ/OQ/PQ), Product Safety, Environment, OHAS and much more. Where regulatory expectations apply in administration and production — with emphasis on actions that reduce defects and complaints and increase safety and compliance – not only on paper.

**Q3:** What does „Process review and CAPA fitting to shop floor standards“ mean?  
**A3:** Corrective and preventive action must change what happens at the machine — not only update documents to close a finding. “Re-training the staff” is never an acceptable action. Recurring audit findings and complaints often originate in that gap between written process and practiced daily work.

**Removed:** Where can I see verified outcomes for this type of work? (and any “audit findings confidential” variant — never shipped on live site).

---

## 06 — Knowledge Gap & Transition Security

**File:** `knowledge-gap-transition-security.html`  
**FAQ intro:** Practical answers for leaders securing operational knowledge before a key person leaves. For questions across all six work areas, see common questions on the expertise hub.

### FAQ (3 items — removed “verified outcomes” FAQ)

**Q1:** Does MediMotive provide classroom training?  
**A1:** MediMotive identifies training potential and prepares and holds short in-person practice workshops e.g. in Quality Methods, technical or regulatory standars. Where extensive training is required, we select the right training partners and courses. We also check if critical knowledge is evenly spread in the company and support with documentation where required. However, we focus on the practical work in daily operations and only train in few exceptional cases where time, place or other circumstances require immediate action.

**Q2:** What happens before a critical person retires or leaves  
**A2:** MediMotive identifies where the knowledge lies, analyses competence gaps in the receiving team, and supports documentation and creation of training materials that reflect what actually happens at the place of action — work instructions, process descriptions, decision trees, and qualification materials — not a documentation exercise that copies the manual.

**Q3:** How do you verify the team can use the materials independently?  
**A3:** Effectiveness verification confirms in real production behaviour that the receiving team can operate the knowledge before the person who carries it leaves — not only that documents exist, but that the operation can function without that individual.

**Removed:** Where can I see verified outcomes for transition work?

### Body copy still out of sync (see [known-gaps.md](known-gaps.md))

The section **Important legal boundary** still states MediMotive does not provide direct classroom-style training. FAQ Q1 now describes short in-person workshops. Align body with FAQ + [00-positioning-source-truth.md](00-positioning-source-truth.md) §10 before next edit pass.

---

## Change log (expertise copy)

| Date | Change |
|------|--------|
| 2026-05-31 | `services.html`: connect-steps → `.connect-prose` editorial block |
| 2026-05-31 | All six detail pages: FAQ copy replaced per client-approved Q&A sets |
| 2026-05-31 | Pages 05–06: drop fourth FAQ (“verified outcomes” / case-studies link) |
| 2026-05-31 | FAQ intro centered site-wide on `.expertise-detail-page` |
| 2026-05-31 | Footer founder portrait → `about.html#founder` (site-wide, documented in [04-navigation-and-links.md](04-navigation-and-links.md)) |

---

## Do not restore without approval

- Observe / Translate / Stabilise / Transfer step cards on `services.html`
- Generic “verified outcomes” FAQ on pages 05–06 unless client adds a real case link
- “In accordance with German legal requirements” on page 06 (body or FAQ) unless counsel approves
