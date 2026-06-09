import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGE_DIR = 'assets/images';
const QUALITY = 82;
const SIZE_THRESHOLD = 50 * 1024; // 50KB

async function findImages(dir) {
  const entries = await readdir(dir,
    { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(full));
    } else if (
      /\.(jpg|jpeg|png)$/i.test(entry.name)
    ) {
      files.push(full);
    }
  }
  return files;
}

async function convert() {
  const images = await findImages(IMAGE_DIR);
  let converted = 0;
  let skipped = 0;
  let savedBytes = 0;

  for (const imgPath of images) {
    const webpPath = imgPath.replace(
      /\.(jpg|jpeg|png)$/i, '.webp'
    );
    const info = await stat(imgPath);

    if (info.size < SIZE_THRESHOLD) {
      skipped++;
      continue;
    }

    try {
      const result = await sharp(imgPath)
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      savedBytes += info.size - result.size;
      converted++;
      console.log(
        '✓', imgPath.split('/').pop(),
        Math.round(info.size/1024) + 'KB →',
        Math.round(result.size/1024) + 'KB'
      );
    } catch (e) {
      console.error('✗', imgPath, e.message);
    }
  }

  console.log('\nConverted:', converted);
  console.log('Skipped (< 50KB):', skipped);
  console.log('Saved:',
    Math.round(savedBytes/1024/1024*10)/10,
    'MB'
  );
}

convert();
