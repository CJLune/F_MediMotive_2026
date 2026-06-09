# CURSOR BRIEF — MediMotive / About Page Founder Section: Option C Layout
**Task:** Redesign the founder section into a 3-column layout: portrait left · quote center · bio text right.  
**Date:** 2026-06-01  
**Files:** `assets/styles.redesign.css` (CSS), `about.html` (HTML)  
**Build required:** Yes — run `npm run build:css` after CSS edits, before verifying in browser.  
**Mode:** A — Client Website Delivery

---

## Critical rules

- Only edit `assets/styles.redesign.css` and `about.html`
- Do not touch any other CSS, JS, HTML, or image file
- After editing `assets/styles.redesign.css`, run `npm run build:css` before checking the result
- Do not change any other section of `about.html` beyond the `about-founder__block` div
- Do not change the eyebrow text or H2 heading

---

## STEP 1 — CSS: append new founder layout rules to `assets/styles.redesign.css`

Append the following block at the very end of `assets/styles.redesign.css`, after all existing rules. Do not edit any existing rules — only add this block.

```css
/* === About founder: Option C — 3-column layout (portrait | quote | bio) === */

.about-page .about-founder__layout {
  grid-template-columns: minmax(200px, 260px) minmax(240px, 300px) minmax(0, 1fr);
  gap: 32px;
}

.about-page .about-founder__portrait-col {
  grid-column: 1;
  grid-row: 1;
}

.about-page .about-founder__quote-col {
  grid-column: 2;
  grid-row: 1;
  position: relative;
  z-index: 1;
}

.about-page .about-founder__quote-col .human-note {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 28px 28px 24px 3.5rem;
  border: 1px solid color-mix(in srgb, var(--brand-primary) 14%, var(--line));
  border-top: 3px solid var(--brand-primary);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(6px);
  box-shadow: 0 10px 28px rgba(28, 46, 74, 0.06);
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(0.95rem, 1.1vw, 1.08rem);
  font-weight: 600;
  line-height: 1.5;
  color: var(--text-emphasis);
  text-align: left;
}

.about-page .about-founder__quote-col .human-note::before {
  content: '\201C';
  position: absolute;
  top: 8px;
  left: 18px;
  font-size: 3.2rem;
  line-height: 1;
  color: color-mix(in srgb, var(--brand-primary) 28%, transparent);
  pointer-events: none;
}

.about-page .about-founder__quote-col .human-note cite {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 10px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid color-mix(in srgb, var(--brand-primary) 12%, var(--line));
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--brand-primary);
  font-style: normal;
}

.about-page .about-founder__body {
  grid-column: 3;
  grid-row: 1;
  max-width: none;
}

/* Tablet (641–1024px): portrait + quote stacked in left col, bio spans right */
@media (max-width: 1024px) and (min-width: 641px) {
  .about-page .about-founder__layout {
    grid-template-columns: minmax(200px, 240px) minmax(0, 1fr);
    grid-template-rows: auto auto;
  }
  .about-page .about-founder__portrait-col {
    grid-column: 1;
    grid-row: 1;
  }
  .about-page .about-founder__quote-col {
    grid-column: 1;
    grid-row: 2;
  }
  .about-page .about-founder__body {
    grid-column: 2;
    grid-row: 1 / 3;
  }
}

/* Mobile (≤640px): single column stack */
@media (max-width: 640px) {
  .about-page .about-founder__layout {
    grid-template-columns: 1fr;
  }
  .about-page .about-founder__portrait-col {
    grid-column: 1;
    grid-row: 1;
  }
  .about-page .about-founder__body {
    grid-column: 1;
    grid-row: 2;
    max-width: none;
  }
  .about-page .about-founder__quote-col {
    grid-column: 1;
    grid-row: 3;
  }
}

/* === End About founder Option C === */
```

After saving, run:
```
npm run build:css
```

---

## STEP 2 — HTML: restructure `about.html` founder layout

Find the entire `<div class="about-founder__layout">` block and replace it with the new 3-column structure below.

**Find this exact block:**
```html
        <div class="about-founder__layout">
          <div class="about-founder__body">
            <p>Over more than 20 years, his work has moved through engineering, industrial training, quality management, supplier coordination, regulatory affairs, and quality leadership in HoReCa appliances, automotive, logistics, and medical-device manufacturing environments.</p>
            <p>That path gives MediMotive its practical character. Björn has worked close to machines and production teams, written corrective-action reports for audit situations, handled OEM escalation pressure, supported supplier and customer communication, and led quality and regulatory work through demanding transition phases. He negotiated quality assurance agreements in international business, built and maintained good relationships with suppliers on different continents and led teams and departments.</p>
            <p>His background also crosses disciplines: Law, Electrical Engineering. Supply Chain Management, Regulatory Affairs and Business Education. This combination supports the way MediMotive works — translating between engineers, production teams, suppliers, auditors, official authorities, and management so technical as well as administrational problems become understandable and actionable.</p>
            <blockquote class="human-note about-founder__quote">
              Most problems are not solved by another form. They are solved when a diverse group of people works together with the same mindset and with a common understanding.
              <cite>Björn Seiler</cite>
            </blockquote>
          </div>
          <div class="about-founder__portrait-col">
            <figure class="about-founder__portrait">
              <div class="about-founder__portrait-media">
                <picture>
  <source srcset="assets/images/bjoern-seiler-founder-portrait.webp" type="image/webp">
  <img src="assets/images/bjoern-seiler-founder-portrait.jpg" alt="Björn Seiler, founder of MediMotive" width="1024" height="682" loading="lazy" decoding="async">
</picture>
              </div>
              <figcaption class="about-founder__caption">Founder · MediMotive</figcaption>
            </figure>
          </div>
        </div>
```

**Replace with:**
```html
        <div class="about-founder__layout">
          <div class="about-founder__portrait-col">
            <figure class="about-founder__portrait">
              <div class="about-founder__portrait-media">
                <picture>
  <source srcset="assets/images/bjoern-seiler-founder-portrait.webp" type="image/webp">
  <img src="assets/images/bjoern-seiler-founder-portrait.jpg" alt="Björn Seiler, founder of MediMotive" width="1024" height="682" loading="lazy" decoding="async">
</picture>
              </div>
              <figcaption class="about-founder__caption">Founder · MediMotive</figcaption>
            </figure>
          </div>
          <div class="about-founder__quote-col">
            <blockquote class="human-note about-founder__quote">
              Most problems are not solved by another form. They are solved when the right people look at the real process together.
              <cite>Björn Seiler</cite>
            </blockquote>
          </div>
          <div class="about-founder__body">
            <p class="about-founder__lead">Björn Seiler started his career as an Electronics Technician for Automation Technology — on the shop floor. Over more than 20 years, that path moved through engineering, quality management, supplier coordination, regulatory affairs, and quality leadership across demanding manufacturing environments.</p>
            <p>His work has spanned:</p>
            <ul class="about-founder__highlights">
              <li>HoReCa appliances, automotive, logistics, and medical-device manufacturing</li>
              <li>OEM escalation, supplier negotiation, and international quality agreements</li>
              <li>VDA 6.3 process audits, EU-MDR PRRC (Article 15), and ISO 13485 systems</li>
              <li>Quality leadership through growth, transition, and regulatory change</li>
            </ul>
            <p>His background also crosses disciplines — Law, Electrical Engineering, Supply Chain Management, Regulatory Affairs, and Business Education — which supports the way MediMotive works: translating between engineers, production teams, suppliers, auditors, and management so technical problems become decisions.</p>
          </div>
        </div>
```

---

## Verification checklist

- [ ] `npm run build:css` ran successfully with no errors
- [ ] Desktop (≥1025px): 3 columns visible — portrait left, quote card center, bio text right
- [ ] Tablet (641–1024px): portrait top-left, quote below portrait, bio text spans right column
- [ ] Mobile (≤640px): portrait → bio → quote stacked in single column
- [ ] Quote card has the branded top border (teal/dark), large opening quotation mark, and styled cite
- [ ] Portrait image is cropped to portrait ratio (3:4) — face visible
- [ ] No console errors
- [ ] H2 "Practical, fair, and straightforward" is unchanged
- [ ] Eyebrow "The founder behind the MediMotive approach" is unchanged
- [ ] No other about.html section changed

---

## BUILD SUMMARY — Fill and paste back to Claude after session

```
Date:
Task: About founder section Option C layout

CSS:
  [ ] Appended new rules to assets/styles.redesign.css
  [ ] npm run build:css ran without errors

HTML:
  [ ] about-founder__layout restructured to 3 columns
  [ ] Portrait moved to column 1
  [ ] Quote extracted to about-founder__quote-col (column 2)
  [ ] Bio restructured with lead + highlights list (column 3)
  [ ] Old blockquote quote updated to canonical source-truth version

Responsive verified:
  [ ] Desktop 3-col  [ ] Tablet 2-col  [ ] Mobile 1-col

Copy deviations from brief (or "none"):
Blockers or unexpected issues:
```
