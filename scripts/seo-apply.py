#!/usr/bin/env python3
"""Apply MediMotive SEO HTML fixes (meta, schema, hreflang)."""

from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HREFLANG_PAGES = {
    "services.html": "https://medimotive.de/services.html",
    "our-approach.html": "https://medimotive.de/our-approach.html",
    "about.html": "https://medimotive.de/about.html",
    "gallery.html": "https://medimotive.de/gallery.html",
    "work-journey.html": "https://medimotive.de/work-journey.html",
    "certificates.html": "https://medimotive.de/certificates.html",
    "rapid-response-troubleshooting.html": "https://medimotive.de/rapid-response-troubleshooting.html",
    "supplier-quality-complaint-management.html": "https://medimotive.de/supplier-quality-complaint-management.html",
    "ramp-up-process-stability.html": "https://medimotive.de/ramp-up-process-stability.html",
    "early-phase-risk-control-design-for-quality.html": "https://medimotive.de/early-phase-risk-control-design-for-quality.html",
    "qms-audit-regulatory-support.html": "https://medimotive.de/qms-audit-regulatory-support.html",
    "knowledge-gap-transition-security.html": "https://medimotive.de/knowledge-gap-transition-security.html",
}

SERVICE_SCHEMAS: dict[str, str] = {
    "rapid-response-troubleshooting.html": """<script type="application/ld+json">{
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
}</script>""",
    "supplier-quality-complaint-management.html": """<script type="application/ld+json">{
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
}</script>""",
    "ramp-up-process-stability.html": """<script type="application/ld+json">{
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
}</script>""",
    "early-phase-risk-control-design-for-quality.html": """<script type="application/ld+json">{
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
  "url": "https://medimotive.de/early-phase-risk-control-design-for-quality.html"
}</script>""",
    "qms-audit-regulatory-support.html": """<script type="application/ld+json">{
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
}</script>""",
    "knowledge-gap-transition-security.html": """<script type="application/ld+json">{
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
}</script>""",
}

HOWTO_SCHEMA = """<script type="application/ld+json">{
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
}</script>"""

GALLERY_WEBPAGE_SCHEMA = """<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Visual Proof | MediMotive Certificates & Work Contexts",
  "description": "Certificate records and work-context photos from MediMotive — formal qualifications and shop-floor evidence from manufacturing quality, supplier, and regulatory work.",
  "url": "https://medimotive.de/gallery.html",
  "isPartOf": {"@type": "WebSite", "name": "MediMotive", "url": "https://medimotive.de/"}
}</script>"""


def strip_answer_html(fragment: str) -> str:
    text = re.sub(r"<a[^>]*>", "", fragment)
    text = re.sub(r"</a>", "", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(re.sub(r"\s+", " ", text)).strip()
    return text


def extract_faq_schema(page_path: Path) -> str:
    content = page_path.read_text(encoding="utf-8")
    blocks = re.findall(
        r'<summary><span class="ed-faq__q">(.*?)</span></summary>\s*'
        r'<div class="ed-faq__answer">(.*?)</div>\s*</details>',
        content,
        flags=re.DOTALL,
    )
    entities = []
    for question, answer_html in blocks:
        entities.append(
            {
                "@type": "Question",
                "name": html.unescape(question.strip()),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": strip_answer_html(answer_html),
                },
            }
        )
    payload = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": entities,
    }
    return (
        '<script type="application/ld+json">'
        + json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        + "</script>"
    )


def insert_after_last_ld_json(content: str, block: str) -> str:
    if block.strip() in content:
        return content
    matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
    if not matches:
        return content.replace("</head>", f"  {block}\n</head>", 1)
    last = matches[-1]
    pos = last.end()
    return content[:pos] + "\n  " + block + content[pos:]


def add_hreflang(content: str, url: str) -> str:
    if 'hreflang="x-default"' in content:
        return content
    insert = (
        f'  <link rel="alternate" hreflang="en" href="{url}" />\n'
        f'  <link rel="alternate" hreflang="x-default" href="{url}" />\n'
    )
    return content.replace(
        f'  <link rel="canonical" href="{url}" />\n',
        f'  <link rel="canonical" href="{url}" />\n{insert}',
        1,
    )


def apply_simple_replacements(content: str, pairs: list[tuple[str, str]]) -> str:
    for old, new in pairs:
        if old not in content:
            print(f"  WARN missing: {old[:60]}...")
        content = content.replace(old, new)
    return content


def main() -> None:
    META_BY_FILE: dict[str, list[tuple[str, str]]] = {
        "services.html": [
            (
                'content="Manufacturing-quality expertise for troubleshooting, supplier escalation, ramp-up stability, early-phase risk, QMS and regulatory support, and knowledge transfer — with verified case links."',
                'content="Six manufacturing quality work areas — troubleshooting, supplier escalation, ramp-up stability, early-phase risk, QMS, regulatory support. Shop-floor first, verified case outcomes."',
            ),
        ],
        "our-approach.html": [
            (
                'content="How MediMotive traces quality problems to the real failure path — across supplier decisions, specification gaps, production behaviour, and management choices — so the right action becomes clear."',
                'content="How MediMotive traces manufacturing quality failures to their real cause — across supplier decisions, specification gaps, and production behaviour — so the right corrective action is clear."',
            ),
        ],
        "about.html": [
            (
                'content="Practical quality work close to production — MediMotive\'s company philosophy, founder background, and credentials behind 20+ years in manufacturing quality, supplier escalation, QMS, and regulatory work."',
                'content="MediMotive founder background and company philosophy — 20+ years in manufacturing quality, supplier escalation, QMS, and regulatory work. Based in Delmenhorst, serving Germany and beyond."',
            ),
        ],
        "gallery.html": [
            (
                'content="Visual proof within MediMotive\'s manufacturing-quality evidence hub — certificate records and work journey from shop-floor, supplier, and regulated manufacturing context."',
                'content="Certificate records and work-context photos from MediMotive — formal qualifications and shop-floor evidence from manufacturing quality, supplier, and regulatory work."',
            ),
        ],
        "work-journey.html": [
            (
                'content="Visual proof from MediMotive\'s manufacturing-quality evidence hub — shop floor, suppliers, regulated environments, and international quality work. Anonymised professional contexts."',
                'content="Work-context photos from MediMotive — shop floor, supplier interfaces, regulated manufacturing, and international quality work. Real professional contexts, anonymised where needed."',
            ),
        ],
        "certificates.html": [
            (
                'content="Formal credentials supporting MediMotive\'s manufacturing-quality evidence hub — audit, methods, quality management, regulatory affairs, and applied AI qualifications."',
                'content="20+ formal qualifications supporting MediMotive\'s manufacturing quality work — VDA 6.3, ISO 13485, EU-MDR, ISO 9001, post-market surveillance, and applied AI in audits."',
            ),
        ],
        "qms-audit-regulatory-support.html": [
            (
                'content="QMS, audit and regulatory support within MediMotive\'s evidence hub — VDA 6.3, ISO 13485, EU-MDR, ISO 9001, and systems that function at the machine level."',
                'content="QMS, audit and regulatory support — VDA 6.3, ISO 13485, EU-MDR, ISO 9001. MediMotive closes the gap between documented procedures and real shop-floor behaviour."',
            ),
        ],
    }

    title_h1_pairs = {
        "services.html": [
            ("<title>Expertise | MediMotive Manufacturing Quality Work Areas</title>", "<title>Manufacturing Quality Expertise | MediMotive — 6 Work Areas</title>"),
            ("<h1>Find the work area that matches your situation</h1>", "<h1>Manufacturing Quality Expertise — Find the Work Area That Fits Your Situation</h1>"),
        ],
        "our-approach.html": [
            ("<title>Our Approach | MediMotive — Practical Quality Work Close to Production</title>", "<title>Our Approach | MediMotive Manufacturing Quality Method</title>"),
            ("<h1>Quality problems build at interfaces. That is where we work.</h1>", "<h1>Manufacturing Quality Problems Build at Interfaces — That Is Where We Work</h1>"),
        ],
        "about.html": [
            ("<title>About MediMotive | Company Profile and Founder Background</title>", "<title>About MediMotive | Björn Seiler — Manufacturing Quality Consultant</title>"),
            ("<h1>Quality work anchored in real production</h1>", "<h1>Manufacturing Quality Consulting Anchored in Real Production</h1>"),
            (
                '"jobTitle": "Head of Quality and Regulatory Affairs"',
                '"jobTitle": "Founder, Manufacturing Quality Consultant"',
            ),
            (
                '"knowsAbout": ["Production Quality", "Supplier Escalation", "VDA 6.3", "EU-MDR", "ISO 13485", "Ramp-Up Management", "Knowledge Transfer"]}',
                '"knowsAbout": ["Production Quality", "Supplier Escalation", "VDA 6.3", "EU-MDR", "ISO 13485", "Ramp-Up Management", "Knowledge Transfer"], "sameAs": ["https://www.linkedin.com/in/bjoern-seiler-30481b165/", "https://www.xing.com/profile/Bjoern_Seiler4"]',
            ),
        ],
        "gallery.html": [
            ("<title>Visual Proof | MediMotive</title>", "<title>Visual Proof | MediMotive Certificates &amp; Work Contexts</title>"),
            ('<meta name="robots" content="noindex, follow" />', '<meta name="robots" content="index, follow" />'),
        ],
        "work-journey.html": [
            ("<title>Visual Proof | MediMotive Work Contexts</title>", "<title>Work Journey | MediMotive Shop-Floor &amp; Manufacturing Contexts</title>"),
            ('<meta property="og:title" content="Visual Proof | MediMotive Work Contexts" />', '<meta property="og:title" content="Work Journey | MediMotive Shop-Floor &amp; Manufacturing Contexts" />'),
            ("<h1>Where the work happens</h1>", "<h1>MediMotive Work Contexts — Manufacturing, Supplier, and Regulated Environments</h1>"),
        ],
        "certificates.html": [
            ("<h1>Certificates</h1>", "<h1>Certificates &amp; Professional Qualifications</h1>"),
            (
                '<meta property="og:title" content="Certificates &amp; Professional Qualifications | MediMotive" />',
                '<meta property="og:title" content="Certificates &amp; Professional Qualifications | Björn Seiler · MediMotive" />',
            ),
            (
                '"jobTitle": "Head of Quality and Regulatory Affairs"',
                '"jobTitle": "Founder, Manufacturing Quality Consultant"',
            ),
        ],
        "rapid-response-troubleshooting.html": [
            ("<h2>What this work covers</h2>", "<h2>What Rapid Response Troubleshooting Covers</h2>"),
        ],
        "supplier-quality-complaint-management.html": [
            ("<h2>What this work covers</h2>", "<h2>What Supplier Quality &amp; Complaint Management Covers</h2>"),
        ],
        "ramp-up-process-stability.html": [
            ("<h2>What this work covers</h2>", "<h2>What Ramp-Up &amp; Process Stability Work Covers</h2>"),
        ],
        "early-phase-risk-control-design-for-quality.html": [
            ("<h2>What this work covers</h2>", "<h2>What Early-Phase Risk Control &amp; Design-for-Quality Covers</h2>"),
        ],
        "qms-audit-regulatory-support.html": [
            ("<h2>What this work covers</h2>", "<h2>What QMS, Audit &amp; Regulatory Support Covers</h2>"),
        ],
        "knowledge-gap-transition-security.html": [
            ("<h2>What this work covers</h2>", "<h2>What Knowledge Gap &amp; Transition Security Work Covers</h2>"),
        ],
    }

    for fname, pairs in title_h1_pairs.items():
        path = ROOT / fname
        content = path.read_text(encoding="utf-8")
        content = apply_simple_replacements(content, pairs)
        path.write_text(content, encoding="utf-8")
        print(f"Updated {fname}")

    for fname, pairs in META_BY_FILE.items():
        path = ROOT / fname
        content = path.read_text(encoding="utf-8")
        content = apply_simple_replacements(content, pairs)
        path.write_text(content, encoding="utf-8")
        print(f"Meta updated {fname}")

    # Hreflang
    for fname, url in HREFLANG_PAGES.items():
        path = ROOT / fname
        content = add_hreflang(path.read_text(encoding="utf-8"), url)
        path.write_text(content, encoding="utf-8")

    # Detail pages: FAQ + Service schema
    for fname in SERVICE_SCHEMAS:
        path = ROOT / fname
        content = path.read_text(encoding="utf-8")
        faq = extract_faq_schema(path)
        content = insert_after_last_ld_json(content, faq)
        content = insert_after_last_ld_json(content, SERVICE_SCHEMAS[fname])
        path.write_text(content, encoding="utf-8")
        print(f"Schema added to {fname}")

    # our-approach HowTo
    path = ROOT / "our-approach.html"
    content = insert_after_last_ld_json(path.read_text(encoding="utf-8"), HOWTO_SCHEMA)
    path.write_text(content, encoding="utf-8")
    print("HowTo added to our-approach.html")

    # gallery WebPage schema
    path = ROOT / "gallery.html"
    content = insert_after_last_ld_json(path.read_text(encoding="utf-8"), GALLERY_WEBPAGE_SCHEMA)
    path.write_text(content, encoding="utf-8")
    print("WebPage schema added to gallery.html")


if __name__ == "__main__":
    main()
