#!/usr/bin/env node
/**
 * Generates root favicon.ico and apple-touch-icon.png from assets/favicon.svg.
 * Run: node tools/build-favicons.mjs
 */
import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SVG_PATH = path.join(ROOT, 'assets', 'favicon.svg');

async function main() {
  const svg = fs.readFileSync(SVG_PATH);
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) => sharp(svg).resize(size, size).png().toBuffer()),
  );
  const ico = await toIco(pngBuffers);
  const icoPath = path.join(ROOT, 'medimotive-favicon.ico');
  fs.writeFileSync(icoPath, ico);
  fs.writeFileSync(path.join(ROOT, 'favicon.ico'), ico);

  await sharp(svg).resize(180, 180).png().toFile(path.join(ROOT, 'apple-touch-icon.png'));

  console.log('Wrote medimotive-favicon.ico + favicon.ico (16/32/48)');
  console.log('Wrote apple-touch-icon.png (180×180)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
