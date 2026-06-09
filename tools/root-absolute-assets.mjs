#!/usr/bin/env node
/**
 * Use root-absolute /assets/ paths so nested URLs (/services/foo) resolve assets correctly.
 */
import fs from 'fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

const LIVE_HTML = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith('.html'))
  .map((f) => path.join(ROOT, f));

function toRootAbsoluteAssets(html) {
  return html
    .replace(/(\s(?:href|src|srcset|content)=["'])assets\//g, '$1/assets/')
    .replace(/(\sdata-cert-src=["'])assets\//g, '$1/assets/')
    .replace(/(\spreload\s+[^>]*\shref=["'])assets\//g, '$1/assets/');
}

let changed = 0;
for (const filePath of LIVE_HTML) {
  const before = fs.readFileSync(filePath, 'utf8');
  const after = toRootAbsoluteAssets(before);
  if (after !== before) {
    fs.writeFileSync(filePath, after);
    changed += 1;
    console.log(`root-assets ${path.basename(filePath)}`);
  }
}

console.log(`Done. ${changed} file(s) updated.`);
