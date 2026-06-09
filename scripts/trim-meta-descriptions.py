#!/usr/bin/env python3
"""Trim meta descriptions to <=155 chars and sync og/twitter description tags."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# (filename, old_description, new_description)
TRIMS: list[tuple[str, str, str]] = [
    (
        "our-approach.html",
        "How MediMotive traces manufacturing quality failures to their real cause — across supplier decisions, specification gaps, and production behaviour — so the right corrective action is clear.",
        "How MediMotive traces manufacturing failures across suppliers, specification gaps, and production so corrective action is clear.",
    ),
    (
        "about.html",
        "MediMotive founder background and company philosophy — 20+ years in manufacturing quality, supplier escalation, QMS, and regulatory work. Based in Delmenhorst, serving Germany and beyond.",
        "Founder background and philosophy: 20+ years in manufacturing quality, supplier escalation, QMS, and regulatory work. Delmenhorst-based, serving Germany.",
    ),
    (
        "gallery.html",
        "Certificate records and work-context photos from MediMotive — formal qualifications and shop-floor evidence from manufacturing quality, supplier, and regulatory work.",
        "MediMotive certificates and work photos: qualifications and shop-floor evidence from manufacturing quality, supplier interfaces, and regulatory work.",
    ),
    (
        "work-journey.html",
        "Work-context photos from MediMotive — shop floor, supplier interfaces, regulated manufacturing, and international quality work. Real professional contexts, anonymised where needed.",
        "Shop-floor and supplier work photos from MediMotive: regulated manufacturing and international quality contexts, anonymised where needed.",
    ),
    (
        "certificates.html",
        "20+ formal qualifications supporting MediMotive's manufacturing quality work — VDA 6.3, ISO 13485, EU-MDR, ISO 9001, post-market surveillance, and applied AI in audits.",
        "20+ qualifications for MediMotive manufacturing quality: VDA 6.3, ISO 13485, EU-MDR, ISO 9001, post-market surveillance, and applied AI in audits.",
    ),
    (
        "rapid-response-troubleshooting.html",
        "Rapid response troubleshooting — recurring defects, measurement deadlocks, and the Perfect Part Paradox. MediMotive starts at the real process, not another meeting.",
        "Rapid troubleshooting for recurring defects, measurement deadlocks, and the Perfect Part Paradox. MediMotive starts at the real process, not meetings.",
    ),
    (
        "supplier-quality-complaint-management.html",
        "Complaint loops that never reach root cause, OEM Level 2 escalation, and quality agreements signed without understanding the full obligation — MediMotive starts at the specification gap.",
        "Supplier complaint loops, OEM escalation, and QSV gaps MediMotive closes, starting at the specification gap between purchasing, production, and supplier.",
    ),
    (
        "ramp-up-process-stability.html",
        "When demand outgrows informal processes, quality failures follow. MediMotive connects line design, supplier co-engineering and validation logic so scaling does not trade stability for speed.",
        "When demand outgrows informal processes, quality fails. MediMotive connects line design, supplier co-engineering and validation so scaling keeps stability.",
    ),
    (
        "early-phase-risk-control-design-for-quality.html",
        "The cheapest defect is the one that never enters production. MediMotive reviews manufacturability, tolerances and unspoken customer expectations before the first chip is cut.",
        "Prevent defects before production. MediMotive reviews manufacturability, tolerances, and unspoken customer expectations before the first chip is cut.",
    ),
    (
        "qms-audit-regulatory-support.html",
        "QMS, audit and regulatory support — VDA 6.3, ISO 13485, EU-MDR, ISO 9001. MediMotive closes the gap between documented procedures and real shop-floor behaviour.",
        "QMS, audit, regulatory support: VDA 6.3, ISO 13485, EU-MDR, ISO 9001. MediMotive links documented procedures to real shop-floor behaviour.",
    ),
    (
        "knowledge-gap-transition-security.html",
        "When critical process knowledge sits with one person, it is also a company risk. MediMotive identifies the gap, creates transferable materials, and verifies the team can operate independently.",
        "One person's critical knowledge is company risk. MediMotive identifies gaps, builds transferable materials, and verifies team independence.",
    ),
]


def replace_description_block(content: str, old: str, new: str) -> str:
    old_attr = f'content="{old}"'
    new_attr = f'content="{new}"'
    if new_attr in content:
        return content  # already trimmed (safe to re-run)
    if old_attr not in content:
        raise ValueError(
            f"Expected old description not found and new not present: {old[:50]}..."
        )
    return content.replace(old_attr, new_attr)


def main() -> None:
    for fname, old, new in TRIMS:
        if len(new) > 155:
            raise ValueError(f"{fname}: new description is {len(new)} chars")
        path = ROOT / fname
        content = path.read_text(encoding="utf-8")
        before = content
        content = replace_description_block(content, old, new)
        if content == before:
            print(f"{fname}: already up to date ({len(new)} chars)")
        else:
            path.write_text(content, encoding="utf-8")
            print(f"{fname}: {len(old)} -> {len(new)} chars")

    # services og/twitter titles
    services = ROOT / "services.html"
    s = services.read_text(encoding="utf-8")
    s = s.replace(
        'content="Expertise | MediMotive Manufacturing Quality Work Areas"',
        'content="Manufacturing Quality Expertise | MediMotive — 6 Work Areas"',
    )
    services.write_text(s, encoding="utf-8")
    print("services.html: synced og/twitter titles")


if __name__ == "__main__":
    main()
