#!/usr/bin/env node

// Update this date only after a substantive change to the published pages.
// Link checks or rebuilding unchanged HTML do not advance sitemap <lastmod>.
const lastModified = '2026-10-02';
const base = 'https://livewell.sig.ai';

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { topicGuides, guidePath } from './guide-metadata.mjs';

const pairs = [
  ['/', '/es/'],
  ...topicGuides.map((guide) => [guidePath(guide, 'en'), guidePath(guide, 'es')]),
  ['/editorial/', '/es/metodologia/'],
];

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function entry(path, english, spanish) {
  const url = `${base}${path}`;
  const en = `${base}${english}`;
  const es = `${base}${spanish}`;
  return `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(en)}" />\n    <xhtml:link rel="alternate" hreflang="es-US" href="${escapeXml(es)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(en)}" />\n  </url>`;
}

const entries = pairs.flatMap(([english, spanish]) => [
  entry(english, english, spanish),
  entry(spanish, english, spanish),
]);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
await writeFile(fileURLToPath(new URL('../sitemap.xml', import.meta.url)), xml);
console.log(`Wrote ${entries.length} sitemap URLs (${pairs.length} language pairs).`);
