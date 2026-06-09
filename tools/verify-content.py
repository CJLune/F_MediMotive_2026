#!/usr/bin/env python3
"""Verify visible copy unchanged vs approved content-freeze baseline.

Compares live root HTML to archive/content-freeze-2026-05-27/ (post-redesign copy
freeze). Strips layout-only blocks (language switcher, optional homepage hero bits)
before comparing multisets of visible text nodes.

Legacy reference snapshot (pre-redesign): archive/pre-redesign-2026-05-18/
"""
from collections import Counter
from pathlib import Path
import re
import sys

ARCHIVE = Path("archive/content-freeze-2026-05-27")
SKIP = {"medimotive-all-in-one.example.html"}


def strip_layout_only(html: str, is_index: bool) -> str:
    html = re.sub(r'<div class="nav-lang"[\s\S]*?</div>', "", html)
    html = re.sub(r'<div class="mobile-drawer-lang"[\s\S]*?</div>', "", html)
    if is_index:
        html = re.sub(r'<details class="home-hero-more"[\s\S]*?</details>', "", html)
        html = re.sub(r'<figure class="home-hero-mobile-lead[\s\S]*?</figure>', "", html)
        # Hero mosaic labels — layout-only; single-image hero omits these
        html = re.sub(
            r'<figcaption class="home-hero-visual-tag">[\s\S]*?</figcaption>',
            "",
            html,
        )
    return html


def text_nodes(html: str) -> list[str]:
    html = re.sub(r"<script[\s\S]*?</script>", "", html, flags=re.I)
    html = re.sub(r"<style[\s\S]*?</style>", "", html, flags=re.I)
    html = re.sub(r"<!--[\s\S]*?-->", "", html)
    parts = re.findall(r">([^<]+)<", html)
    return [p.strip() for p in parts if p.strip()]


def main() -> int:
    ok = True
    if not ARCHIVE.is_dir():
        print(f"ERROR: baseline missing: {ARCHIVE}/")
        return 1

    live_pages = sorted(
        p for p in Path(".").glob("*.html") if p.name not in SKIP
    )
    live_names = {p.name for p in live_pages}
    baseline_names = {
        p.name for p in ARCHIVE.glob("*.html") if p.name not in SKIP
    }

    for path in live_pages:
        orig_path = ARCHIVE / path.name
        if not orig_path.exists():
            print(f"NEW (no baseline): {path.name}")
            ok = False
            continue
        is_index = path.name == "index.html"
        old = text_nodes(
            strip_layout_only(orig_path.read_text(encoding="utf-8"), is_index)
        )
        new = text_nodes(
            strip_layout_only(path.read_text(encoding="utf-8"), is_index)
        )
        if Counter(old) != Counter(new):
            print(f"FAIL text (drift): {path.name}")
            ok = False
        else:
            print(f"OK text: {path.name}")

    for name in sorted(baseline_names - live_names):
        print(f"REMOVED (baseline only): {name}")
        ok = False

    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
