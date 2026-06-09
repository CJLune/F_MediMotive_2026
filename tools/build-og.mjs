#!/usr/bin/env node
/**
 * Renders assets/images/og-medimotive.svg to 1200x630 PNG (+ JPEG).
 * Requires: npm install @resvg/resvg-js (dev dependency in package.json)
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { Resvg } from '@resvg/resvg-js';

const ROOT = path.resolve(import.meta.dirname, '..');
const SVG = path.join(ROOT, 'assets/images/og-medimotive.svg');
const PNG = path.join(ROOT, 'assets/images/og-medimotive.png');
const JPG = path.join(ROOT, 'assets/images/og-medimotive.jpg');

const svg = fs.readFileSync(SVG, 'utf8');
const rendered = new Resvg(svg).render();
const png = rendered.asPng();
fs.writeFileSync(PNG, png);

if (rendered.width !== 1200 || rendered.height !== 630) {
  console.warn(`Expected 1200x630, got ${rendered.width}x${rendered.height}`);
}

const sips = spawnSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '88', PNG, '--out', JPG], {
  stdio: 'inherit',
});
if (sips.status !== 0) process.exit(sips.status || 1);

console.log(`Wrote ${PNG} (${Math.round(png.length / 1024)} KB)`);
console.log(`Wrote ${JPG}`);
