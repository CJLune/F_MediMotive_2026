#!/usr/bin/env node
/**
 * Publishes Google Search Console verification to the site root (Vercel static).
 *
 * Setup (pick one):
 *   A) Drop the downloaded HTML file into source-truth/google-verification/
 *   B) Copy google-site-verification.config.example.json → google-site-verification.config.json and fill in
 *
 * Then: npm run gsc:verify && vercel --prod --yes
 */
import fs from 'fs';
import path from 'path';
import {
  ROOT,
  buildGoogleMetaTag,
  discoverDroppedHtmlFile,
  loadGscConfig,
  resolveHtmlVerification,
  resolveMetaContent,
} from './google-site-verification.mjs';

const SITE = 'https://medimotive.de';

function writeHtmlFile({ filename, body }) {
  const dest = path.join(ROOT, filename);
  fs.writeFileSync(dest, `${body}\n`, 'utf8');
  return dest;
}

function patchIndexMeta(metaContent) {
  const indexPath = path.join(ROOT, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  html = html.replace(/<meta name="google-site-verification"[^>]*>\n?/g, '');
  const tag = buildGoogleMetaTag(metaContent);
  if (!html.includes('<meta name="theme-color"')) {
    throw new Error('index.html: missing theme-color anchor');
  }
  html = html.replace(/(<meta name="theme-color" content="[^"]*" \/>)/, `$1\n${tag}`);
  fs.writeFileSync(indexPath, html);
}

function main() {
  const config = loadGscConfig();
  const html = resolveHtmlVerification(config);
  const metaContent = resolveMetaContent(config);

  if (!html && !metaContent) {
    console.error(`
Google Search Console verification is not configured yet.

HTML file method (recommended if you chose "HTML file" in GSC):
  1. In Search Console, download the verification file (googleXXXXXXXX.html).
  2. Save it here (exact name from Google):
     source-truth/google-verification/googleXXXXXXXX.html
  3. Run: npm run gsc:verify
  4. Deploy: vercel --prod --yes
  5. Open in browser: ${SITE}/googleXXXXXXXX.html  (must not be 404)
  6. Click Verify in Search Console.

OR copy google-site-verification.config.example.json to google-site-verification.config.json
and paste filename + file body (and optional metaContent).

See source-truth/google-verification/README.md
`);
    process.exit(1);
  }

  if (html) {
    const dest = writeHtmlFile(html);
    console.log(`Wrote ${path.relative(ROOT, dest)}`);
    console.log(`Check live after deploy: ${SITE}/${html.filename}`);
  }

  if (metaContent) {
    patchIndexMeta(metaContent);
    console.log('Added google-site-verification meta tag to index.html');
    console.log('(Re-run node tools/apply-seo.mjs after editing index if SEO block is regenerated)');
  }

  if (html && !metaContent) {
    console.log('\nNext: vercel --prod --yes  then Verify in Search Console.');
  } else if (metaContent && !html) {
    console.log('\nNext: vercel --prod --yes  then Verify in Search Console (HTML tag method).');
  } else {
    console.log('\nHTML file + meta tag both set. Use the method you selected in Search Console.');
    console.log('Next: vercel --prod --yes');
  }
}

main();
