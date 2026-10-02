// Fills #root in dist/index.html with the rendered page. Runs after the two
// Vite builds (see package.json "build"): the client build writes dist/, the
// SSR build writes dist/server/entry-server.js, and this script joins them
// and then removes the server bundle so only static files get deployed.
import { readFile, writeFile, rm } from 'node:fs/promises';
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
await writeFile(indexPath, template.replace(marker, html));
await rm(serverDir, { recursive: true, force: true });

console.log(`prerender: wrote ${html.length} chars of markup into dist/index.html`);
