/**
 * Loads Google Search Console verification settings.
 * @see source-truth/google-verification/README.md
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..');
export const CONFIG_PATH = path.join(ROOT, 'google-site-verification.config.json');
export const DROP_DIR = path.join(ROOT, 'source-truth', 'google-verification');

export function loadGscConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch (err) {
    throw new Error(`Invalid JSON in google-site-verification.config.json: ${err.message}`);
  }
}

/** GSC HTML-file download placed in source-truth/google-verification/ */
export function discoverDroppedHtmlFile() {
  if (!fs.existsSync(DROP_DIR)) return null;
  const files = fs
    .readdirSync(DROP_DIR)
    .filter((name) => name.startsWith('google') && name.endsWith('.html') && !name.endsWith('.example.html'));
  if (files.length === 0) return null;
  if (files.length > 1) {
    throw new Error(
      `Multiple google*.html files in source-truth/google-verification/ — keep only the file from Search Console.`,
    );
  }
  const filename = files[0];
  const body = fs.readFileSync(path.join(DROP_DIR, filename), 'utf8').trim();
  return { filename, body };
}

export function resolveHtmlVerification(config) {
  if (config?.htmlFile?.filename && config?.htmlFile?.body) {
    return {
      filename: config.htmlFile.filename.trim(),
      body: config.htmlFile.body.trim(),
    };
  }
  return discoverDroppedHtmlFile();
}

export function resolveMetaContent(config) {
  const value = config?.metaContent?.trim();
  return value || null;
}

export function buildGoogleMetaTag(content) {
  const safe = content.replace(/"/g, '&quot;');
  return `  <meta name="google-site-verification" content="${safe}" />`;
}
