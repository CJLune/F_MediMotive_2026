#!/usr/bin/env python3
"""Restructure index.html main: McKinsey hero, chapter nav, section reorder."""
from pathlib import Path
import re

FIGURES = """          <figure class="home-hero-visual-cell home-hero-visual-cell--lead">
            <div class="home-hero-visual-media">
              <img src="assets/images/work-journey/work-shop-floor-foundation.jpg" alt="Shop-floor manufacturing context for production quality work" width="240" height="400" decoding="async">
            </div>
            <figcaption class="home-hero-visual-tag">Shop-floor foundation</figcaption>
          </figure>
          <figure class="home-hero-visual-cell">
            <div class="home-hero-visual-media">
              <img src="assets/images/work-journey/work-supplier-customer-bridge.jpg" alt="Supplier and customer quality context in manufacturing" width="1200" height="1600" decoding="async">
            </div>
            <figcaption class="home-hero-visual-tag">Supplier and customer bridge</figcaption>
          </figure>
          <figure class="home-hero-visual-cell">
            <div class="home-hero-visual-media">
              <img src="assets/images/work-journey/work-regulated-manufacturing.jpg" alt="Regulated automotive and medical-device manufacturing context" width="640" height="480" decoding="async">
            </div>
            <figcaption class="home-hero-visual-tag">Regulated manufacturing</figcaption>
          </figure>
          <figure class="home-hero-visual-cell">
            <div class="home-hero-visual-media">
              <img src="assets/images/work-journey/work-international-context.jpg" alt="On-site international supplier and manufacturing work in Japan" width="4000" height="1848" decoding="async">
            </div>
            <figcaption class="home-hero-visual-tag">International work context</figcaption>
          </figure>"""

path = Path("index.html")
text = path.read_text(encoding="utf-8")

m = re.search(r'(<main id="main-content" class="home-main">)(.*?)(</main>)', text, re.S)
if not m:
    raise SystemExit("main not found")

sections = re.findall(r"\n<section[\s\S]*?</section>", m.group(2))
if len(sections) != 10:
    raise SystemExit(f"expected 10 sections, got {len(sections)}")

hero, chips, failure, patterns, compare, cases, cred, stages, code, contact = sections

hero = hero.replace('<section class="hero home-hero">', '<section class="hero home-hero home-hero--editorial">', 1)

hero_support_m = re.search(r"(<p class=\"hero-support\">[\s\S]*?</p>)", hero)
hero_support = hero_support_m.group(1) if hero_support_m else ""
if hero_support:
    hero = hero.replace(hero_support + "\n      ", "", 1)

caption_m = re.search(r"(<p class=\"home-hero-visual-caption\">[\s\S]*?</p>)", hero)
caption = caption_m.group(1) if caption_m else ""
if caption:
    hero = hero.replace("\n        " + caption, "", 1)

visual_block = f"""    <aside class="home-hero-visual reveal" aria-label="Professional work context">
      <div class="home-hero-visual-panel">
        <div class="home-hero-visual-grid home-hero-visual-grid--desktop">
{FIGURES}
        </div>
        <details class="home-hero-more">
          <summary aria-hidden="true"></summary>
          <div class="home-hero-visual-grid home-hero-visual-grid--more">
{FIGURES}
          </div>
        </details>
      </div>
      <div class="home-hero-meta reveal">
        {hero_support.strip()}
        {caption.strip()}
      </div>
    </aside>"""

hero = re.sub(r'    <aside class="home-hero-visual reveal"[\s\S]*?</aside>', visual_block, hero, count=1)

chips = chips.replace(
    '<section class="home-proof-chips-wrap" aria-label="Core proof themes">',
    '<section class="home-proof-chips-wrap home-chapter-nav" aria-label="Core proof themes">',
    1,
)
chips = chips.replace(
    '<ul class="home-proof-chips reveal-stagger">',
    '<nav aria-label="Page sections"><ul class="home-proof-chips reveal-stagger" data-home-chapter-nav>',
    1,
)
chips = chips.replace("</ul>\n  </div>", "</ul></nav>\n  </div>", 1)
for label, href in [
    ("Shop-Floor Pragmatism", "#home-failure-path"),
    ("Organic Connectivity", "#home-patterns"),
    ("Transition Security", "#home-stages"),
    ("Formal Credentials", "#home-credentials"),
    ("Case Proof", "#home-cases"),
]:
    chips = chips.replace(f"<li>{label}</li>", f'<li><a href="{href}" data-chapter-link>{label}</a></li>', 1)

failure = failure.replace('<section class="home-section">', '<section class="home-section home-tier-b" id="home-failure-path">', 1)
patterns = patterns.replace(
    '<section class="home-section home-section-alt home-section-patterns">',
    '<section class="home-section home-section-alt home-section-patterns home-tier-b" id="home-patterns">',
    1,
)
compare = compare.replace(
    '<section class="home-section home-section-compare">',
    '<section class="home-section home-section-compare home-tier-c">',
    1,
)
cases = cases.replace(
    '<section class="home-section home-section-cases">',
    '<section class="home-section home-section-cases home-tier-a" id="home-cases">',
    1,
)
cred = cred.replace(
    '<section class="home-section home-section-cred">',
    '<section class="home-section home-section-cred home-tier-b" id="home-credentials">',
    1,
)
stages = stages.replace(
    '<section class="home-section home-section-alt">',
    '<section class="home-section home-section-alt home-tier-b" id="home-stages">',
    1,
)
contact = contact.replace(
    '<section class="home-section home-contact-panel">',
    '<section class="home-section home-contact-panel home-tier-c">',
    1,
)

ordered = [hero, chips, cases, patterns, failure, compare, cred, stages, code, contact]
new_main = m.group(1) + "\n" + "\n".join(ordered) + "\n\n" + m.group(3)
text = text[: m.start()] + new_main + text[m.end() :]
path.write_text(text, encoding="utf-8")
print("ok")
