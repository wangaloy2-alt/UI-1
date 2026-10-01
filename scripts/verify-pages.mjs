import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
assert(!/\/src\/|\.tsx?\b/.test(html), 'Pages must publish compiled output, not the Vite source entry');
const assets = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(match => match[1]);
assert(assets.some(asset => /\.js$/.test(asset)), 'Missing compiled JS');
assert(assets.some(asset => /\.css$/.test(asset)), 'Missing compiled CSS');
for (const asset of assets) {
  assert(asset.startsWith('./'), `Asset must be relative for /UI-1/: ${asset}`);
  const file = resolve(root, asset);
  assert(file.startsWith(root + sep), 'Asset escapes deployment root');
  assert(statSync(file).isFile() && statSync(file).size > 0, `Missing or empty asset: ${asset}`);
}
console.log(`PASS: compiled Pages entry and ${assets.length} relative assets`);
