#!/usr/bin/env node
/**
 * Local dev: initial CSS build, PostCSS watch, and static file server.
 * Default port 3456 — Cursor often binds 3000 (causes EADDRINUSE + "No Server Root").
 */
import { spawn } from 'node:child_process';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveUrlToRootFile } from './vercel-clean-url-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(path.join(__dirname, '..'));
const PREFERRED_PORT = Number(process.env.PORT) || 3456;
const PORT_CANDIDATES = [
  PREFERRED_PORT,
  3456,
  3457,
  3458,
  3001,
  3002,
  3080,
  3081,
].filter((p, i, arr) => Number.isInteger(p) && p > 0 && p < 65536 && arr.indexOf(p) === i);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function run(cmd, args) {
  return spawn(cmd, args, { cwd: root, stdio: 'inherit', shell: true });
}

/** Mirror Vercel rewrites (incl. /services/{slug} and /services/assets/*). */
function resolvePathname(pathname) {
  if (pathname === '/' || pathname === '') return 'index.html';

  const trimmed = pathname.replace(/^\/+/, '');
  const ext = path.extname(trimmed);
  if (ext === '.html' && trimmed !== 'index.html') {
    const clean = `/${trimmed.replace(/\.html$/, '')}` || '/';
    return { redirect: clean };
  }

  const resolved = resolveUrlToRootFile(pathname);
  if (resolved) return resolved;

  return trimmed;
}

function listenOnPort(port) {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url ?? '/', `http://127.0.0.1:${port}`);
        let pathname = decodeURIComponent(url.pathname);
        const resolved = resolvePathname(pathname);
        if (resolved && typeof resolved === 'object' && resolved.redirect) {
          const location = resolved.redirect + (url.search || '');
          res.writeHead(301, { Location: location }).end();
          return;
        }
        pathname = typeof resolved === 'string' ? resolved : pathname;
        const filePath = path.normalize(path.join(root, pathname));
        if (!filePath.startsWith(root)) {
          res.writeHead(403).end('Forbidden');
          return;
        }
        const info = await stat(filePath);
        if (!info.isFile()) {
          res.writeHead(404).end('Not found');
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const noCache = ['.html', '.css', '.js'].includes(ext);
        res.writeHead(200, {
          'Content-Type': MIME[ext] ?? 'application/octet-stream',
          ...(noCache ? { 'Cache-Control': 'no-store, must-revalidate' } : {}),
        });
        createReadStream(filePath).pipe(res);
      } catch {
        res.writeHead(404).end('Not found');
      }
    });

    server.on('error', (err) => {
      server.close();
      reject(err);
    });

    server.listen(port, '127.0.0.1', () => {
      server.removeAllListeners('error');
      resolve({ server, port });
    });
  });
}

async function startStaticServer() {
  let lastErr;
  for (const port of PORT_CANDIDATES) {
    try {
      const { port: boundPort } = await listenOnPort(port);
      const url = `http://127.0.0.1:${boundPort}/`;
      console.log('\n  MediMotive dev server');
      console.log(`  Workspace root: ${root}`);
      console.log(`  Open in browser: ${url}`);
      if (boundPort !== 3000) {
        console.log('  (Port 3000 is often used by Cursor — use the URL above, not :3000)\n');
      } else {
        console.log('');
      }
      return;
    } catch (err) {
      lastErr = err;
      if (err?.code !== 'EADDRINUSE') throw err;
    }
  }

  console.error('\n  Could not bind a dev port. Stop other servers or set PORT=4000 npm run dev\n');
  process.exit(1);
}

const build = run('npx', ['postcss', 'assets/input.css', '-o', 'assets/styles.css']);
build.on('exit', (code) => {
  if (code !== 0) process.exit(code ?? 1);
  run('npx', ['postcss', 'assets/input.css', '-o', 'assets/styles.css', '--watch']);
  startStaticServer();
});

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
