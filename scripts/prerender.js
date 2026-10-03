// Fills #root in dist/index.html with the rendered page. Runs after the two
// Vite builds (see package.json "build"): the client build writes dist/, the
// SSR build writes dist/server/entry-server.js, and this script joins them
// and then removes the server bundle so only static files get deployed.
import { readFile, writeFile, rm, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const indexPath = path.join(dist, 'index.html');
const serverDir = path.join(dist, 'server');

const { render } = await import(path.join(serverDir, 'entry-server.js'));
const html = render();

const template = await readFile(indexPath, 'utf8');
const marker = '<!--app-html-->';
if (!template.includes(marker)) {
  throw new Error(`prerender: ${marker} not found in dist/index.html`);
}
// Preload the latin files of the two fonts that paint above the fold, so the
// browser fetches them alongside the stylesheet rather than after parsing it.
// Vite hashes the filenames, so look them up in the built assets.
const assets = await readdir(path.join(dist, 'assets'));
const preloads = ['oswald-latin-wght-normal', 'geist-latin-wght-normal']
  .map(name => assets.find(file => file.startsWith(name) && file.endsWith('.woff2')))
  .filter(Boolean)
  .map(file => `    <link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
  .join('\n');

await writeFile(
  indexPath,
  template.replace(marker, html).replace('</head>', `${preloads}\n  </head>`),
);
await rm(serverDir, { recursive: true, force: true });

console.log(`prerender: wrote ${html.length} chars of markup into dist/index.html`);
