import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();

function wrapImages(html) {
  const buttons = [];
  let idx = 0;
  const protectedHtml = html.replace(/<button\b[\s\S]*?<\/button>/gi, (block) => {
    const token = `__BTN_${idx++}__`;
    buttons.push({ token, block });
    return token;
  });

  const wrapped = protectedHtml.replace(
    /<img(\s[^>]*?)>/gi,
    (match, attrs) => {
      const srcMatch = attrs.match(/\ssrc="(assets\/images\/[^"]+\.(?:jpg|jpeg|png))"/i);
      if (!srcMatch) return match;
      const src = srcMatch[1];
      const webp = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      if (!existsSync(join(ROOT, webp))) return match;

      const indentMatch = match.match(/^(\s*)/);
      const baseIndent = indentMatch ? indentMatch[1] : '';
      const inner = baseIndent + '  ';
      const imgTag = `<img${attrs}>`;

      return [
        `${baseIndent}<picture>`,
        `${inner}<source srcset="${webp}" type="image/webp">`,
        `${inner}${imgTag}`,
        `${baseIndent}</picture>`,
      ].join('\n');
    }
  );

  return buttons.reduce(
    (out, { token, block }) => out.replace(token, block),
    wrapped
  );
}

const htmlFiles = readdirSync(ROOT).filter((f) => f.endsWith('.html'));
let totalWrapped = 0;

for (const file of htmlFiles) {
  const path = join(ROOT, file);
  const before = readFileSync(path, 'utf8');
  const after = wrapImages(before);
  if (after !== before) {
    const count = (after.match(/<picture>/g) || []).length - (before.match(/<picture>/g) || []).length;
    totalWrapped += count;
    writeFileSync(path, after);
    console.log(`${file}: +${count} picture wrappers`);
  }
}

console.log(`\nTotal new picture wrappers: ${totalWrapped}`);
