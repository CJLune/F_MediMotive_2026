#!/usr/bin/env python3
"""Apply MediMotive typography token consolidation to CSS files."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

TYPE_SCALE_BLOCK = """
  /* Type scale */
  --text-2xs: 0.625rem;     /* 10px — tiny badges only */
  --text-xs:  0.6875rem;    /* 11px — captions, diagram labels */
  --text-sm:  0.75rem;      /* 12px — eyebrows, section labels, breadcrumbs */
  --text-base-sm: 0.875rem; /* 14px — small card body, secondary copy */
  --text-base: 1rem;        /* 16px — primary body */
  --text-md:  1.0625rem;    /* 17px — slightly larger body / intro paragraphs */
  --text-lg:  1.125rem;     /* 18px — card titles, large labels */
  --text-xl:  1.25rem;      /* 20px — sub-headings */

  /* Heading fluid scale */
  --h3-size: clamp(1.05rem, 1.8vw, 1.2rem);
  --h2-size: clamp(1.35rem, 2.2vw, 1.95rem);    /* matches existing global h2 */
  --h2-card: clamp(1.28rem, 3.8vw, 1.52rem);    /* card/section h2 override */
  --h1-size: clamp(2rem, 4vw, 3.9rem);           /* matches existing global h1 */

  /* Line height scale */
  --lh-tight:   1.2;
  --lh-heading: 1.3;
  --lh-snug:    1.45;
  --lh-base:    1.6;
  --lh-loose:   1.65;

  /* Letter spacing */
  --ls-heading:  -0.025em;
  --ls-h1:       -0.035em;
  --ls-label:    0.08em;
  --ls-eyebrow:  0.1em;
  --ls-badge:    0.06em;
"""

FONT_SIZE_REPLACEMENTS = [
    # 2A body — longer values first where needed
    ("font-size: 1.0625rem", "font-size: var(--text-md)"),
    ("font-size: 0.97rem", "font-size: var(--text-base)"),
    ("font-size: 0.98rem", "font-size: var(--text-base)"),
    ("font-size: 0.96rem", "font-size: var(--text-md)"),
    ("font-size: 0.94rem", "font-size: var(--text-md)"),
    ("font-size: 0.95rem", "font-size: var(--text-md)"),
    ("font-size: 0.92rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.9rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.88rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.875rem", "font-size: var(--text-base-sm)"),
    ("font-size: 1.07rem", "font-size: var(--text-md)"),
    ("font-size: 1.08rem", "font-size: var(--text-md)"),
    # 2B labels
    ("font-size: 0.6rem", "font-size: var(--text-2xs)"),
    ("font-size: 0.62rem", "font-size: var(--text-2xs)"),
    ("font-size: 0.64rem", "font-size: var(--text-2xs)"),
    ("font-size: 0.65rem", "font-size: var(--text-xs)"),
    ("font-size: 0.66rem", "font-size: var(--text-xs)"),
    ("font-size: 0.68rem", "font-size: var(--text-xs)"),
    ("font-size: 0.7rem", "font-size: var(--text-xs)"),
    ("font-size: 0.72rem", "font-size: var(--text-sm)"),
    ("font-size: 0.75rem", "font-size: var(--text-sm)"),
    ("font-size: 0.76rem", "font-size: var(--text-sm)"),
    # 2C mid
    ("font-size: 0.78rem", "font-size: var(--text-sm)"),
    ("font-size: 0.8125rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.8rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.82rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.84rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.85rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.86rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.87rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.89rem", "font-size: var(--text-base-sm)"),
    ("font-size: 0.91rem", "font-size: var(--text-base-sm)"),
    # 2D upper body
    ("font-size: 1.02rem", "font-size: var(--text-md)"),
    ("font-size: 1.04rem", "font-size: var(--text-md)"),
    ("font-size: 1.05rem", "font-size: var(--text-md)"),
    ("font-size: 1.06rem", "font-size: var(--text-md)"),
    ("font-size: 1.075rem", "font-size: var(--text-md)"),
    ("font-size: 1.125rem", "font-size: var(--text-lg)"),
    ("font-size: 1.1rem", "font-size: var(--text-lg)"),
    ("font-size: 1.15rem", "font-size: var(--text-lg)"),
    # our-approach only extras
    ("font-size: 0.52rem", "font-size: var(--text-2xs)"),
    ("font-size: 0.58rem", "font-size: var(--text-2xs)"),
]

FONT_SIZE_1REM = ("font-size: 1rem", "font-size: var(--text-base)")
FONT_SIZE_1REM_IMPORTANT = ("font-size: 1rem !important", "font-size: var(--text-base) !important")

CLAMP_REPLACEMENTS = [
    ("font-size: clamp(1.28rem, 3.8vw, 1.5rem)", "font-size: var(--h2-card)"),
    ("font-size: clamp(1.28rem, 3.8vw, 1.52rem)", "font-size: var(--h2-card)"),
    ("font-size: clamp(1.28rem, 2.4vw, 1.55rem)", "font-size: var(--h2-card)"),
    ("font-size: clamp(1.25rem, 2.2vw, 1.55rem)", "font-size: var(--h2-card)"),
]

LETTER_SPACING = [
    ("letter-spacing: -0.035em", "letter-spacing: var(--ls-h1)"),
    ("letter-spacing: -0.028em", "letter-spacing: var(--ls-heading)"),
    ("letter-spacing: -0.026em", "letter-spacing: var(--ls-heading)"),
    ("letter-spacing: -0.025em", "letter-spacing: var(--ls-heading)"),
    ("letter-spacing: -0.02em", "letter-spacing: var(--ls-heading)"),
    ("letter-spacing: -0.015em", "letter-spacing: var(--ls-heading)"),
    ("letter-spacing: -0.01em", "letter-spacing: var(--ls-heading)"),
    ("letter-spacing: 0.12em", "letter-spacing: var(--ls-eyebrow)"),
    ("letter-spacing: 0.1em", "letter-spacing: var(--ls-eyebrow)"),
    ("letter-spacing: 0.09em", "letter-spacing: var(--ls-label)"),
    ("letter-spacing: 0.08em", "letter-spacing: var(--ls-label)"),
    ("letter-spacing: 0.07em", "letter-spacing: var(--ls-label)"),
    ("letter-spacing: 0.06em", "letter-spacing: var(--ls-badge)"),
    ("letter-spacing: 0.05em", "letter-spacing: var(--ls-badge)"),
    ("letter-spacing: 0.04em", "letter-spacing: var(--ls-badge)"),
    ("letter-spacing: 0.03em", "letter-spacing: 0"),
    ("letter-spacing: 0.025em", "letter-spacing: 0"),
    ("letter-spacing: 0.02em", "letter-spacing: 0"),
    ("letter-spacing: 0.01em", "letter-spacing: 0"),
]

LINE_HEIGHT = [
    # Longest decimals first — avoids 1.3 matching inside 1.38
    ("line-height: 1.72", "line-height: var(--lh-loose)"),
    ("line-height: 1.68", "line-height: var(--lh-loose)"),
    ("line-height: 1.65", "line-height: var(--lh-loose)"),
    ("line-height: 1.62", "line-height: var(--lh-base)"),
    ("line-height: 1.58", "line-height: var(--lh-base)"),
    ("line-height: 1.55", "line-height: var(--lh-base)"),
    ("line-height: 1.45", "line-height: var(--lh-snug)"),
    ("line-height: 1.38", "line-height: var(--lh-heading)"),
    ("line-height: 1.35", "line-height: var(--lh-heading)"),
    ("line-height: 1.32", "line-height: var(--lh-heading)"),
    ("line-height: 1.25", "line-height: var(--lh-heading)"),
    ("line-height: 1.22", "line-height: var(--lh-heading)"),
    ("line-height: 1.16", "line-height: var(--lh-tight)"),
    ("line-height: 1.15", "line-height: var(--lh-tight)"),
    ("line-height: 1.14", "line-height: var(--lh-tight)"),
    ("line-height: 1.12", "line-height: var(--lh-tight)"),
    ("line-height: 1.08", "line-height: var(--lh-tight)"),
    ("line-height: 1.7", "line-height: var(--lh-loose)"),
    ("line-height: 1.6", "line-height: var(--lh-base)"),
    ("line-height: 1.5", "line-height: var(--lh-base)"),
    ("line-height: 1.4", "line-height: var(--lh-snug)"),
    ("line-height: 1.3", "line-height: var(--lh-heading)"),
    ("line-height: 1.2", "line-height: var(--lh-heading)"),
    ("line-height: 1.1", "line-height: var(--lh-tight)"),
]

# Protect SVG px font sizes in our-approach
SVG_PX_PATTERN = re.compile(r"font-size:\s*\d+(?:\.\d+)?px")

BODY_1REM_PLACEHOLDER = "/*__BODY_BASE_FONT__*/ font-size: 1rem;"


def inject_type_scale(content: str) -> str:
    if "--text-2xs:" in content:
        return content
    marker = "  --panel-divider: rgba(255, 255, 255, 0.12);\n}"
    if marker not in content:
        raise RuntimeError(":root marker not found")
    return content.replace(marker, f"  --panel-divider: rgba(255, 255, 255, 0.12);{TYPE_SCALE_BLOCK}\n}}", 1)


def protect_body_1rem(content: str) -> str:
    """Keep literal 1rem on body { font-size } rules only."""
    lines = content.splitlines(keepends=True)
    out = []
    in_body = False
    brace_depth = 0
    for line in lines:
        stripped = line.strip()
        if re.match(r"^body\s*\{", stripped):
            in_body = True
            brace_depth = stripped.count("{") - stripped.count("}")
        elif in_body:
            brace_depth += stripped.count("{") - stripped.count("}")
            if re.search(r"font-size:\s*1rem", line) and "var(" not in line:
                line = re.sub(
                    r"font-size:\s*1rem",
                    "font-size: /*__BODY_BASE__*/1rem",
                    line,
                    count=1,
                )
            if brace_depth <= 0 and "}" in stripped:
                in_body = False
        out.append(line)
    return "".join(out)


def restore_body_1rem(content: str) -> str:
    return content.replace("font-size: /*__BODY_BASE__*/1rem", "font-size: 1rem")


def apply_replacements(content: str, pairs: list[tuple[str, str]]) -> str:
    for old, new in pairs:
        content = content.replace(old, new)
    return content


def process_file(path: Path, *, include_1rem: bool = True, skip_svg_px: bool = False) -> None:
    content = path.read_text(encoding="utf-8")
    original = content

    if path.name == "styles.css":
        content = inject_type_scale(content)

    content = protect_body_1rem(content)

    protected: list[str] = []
    if skip_svg_px:

        def stash(m: re.Match[str]) -> str:
            protected.append(m.group(0))
            return f"/*__SVG_PX_{len(protected)-1}__*/"

        content = SVG_PX_PATTERN.sub(stash, content)

    content = apply_replacements(content, FONT_SIZE_REPLACEMENTS)
    content = apply_replacements(content, CLAMP_REPLACEMENTS)

    if include_1rem:
        content = content.replace(*FONT_SIZE_1REM_IMPORTANT)
        content = content.replace(*FONT_SIZE_1REM)

    content = content.replace(
        "font-family: 'Montserrat', sans-serif",
        "font-family: 'Montserrat', system-ui, sans-serif",
    )

    content = apply_replacements(content, LETTER_SPACING)
    content = apply_replacements(content, LINE_HEIGHT)

    if skip_svg_px and protected:
        for i, val in enumerate(protected):
            content = content.replace(f"/*__SVG_PX_{i}__*/", val, 1)

    content = restore_body_1rem(content)

    if content != original:
        path.write_text(content, encoding="utf-8")
        print(f"Updated {path.relative_to(ROOT)}")
    else:
        print(f"No changes {path.relative_to(ROOT)}")


def main() -> None:
    process_file(ROOT / "assets" / "styles.css")
    process_file(ROOT / "assets" / "our-approach-upgrade.css", skip_svg_px=True)


if __name__ == "__main__":
    main()
