#!/usr/bin/env node

// Verify that the published HTML is complete without JavaScript and that the
// bilingual canonical, hreflang, and sitemap URLs stay in sync with the guide.
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { actions as coreActions } from '../content.js';
import { actions as familyActions } from '../expansion-family.js';
import { actions as rightsActions } from '../expansion-rights.js';
import { actions as lifeActions } from '../expansion-lifecourse.js';
import { topicGuides, guidePath } from './guide-metadata.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = 'https://livewell.sig.ai';
const actions = [...coreActions, ...familyActions, ...rightsActions, ...lifeActions];
const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

async function htmlAt(pathname) {
  try {
    return await readFile(join(root, pathname, 'index.html'), 'utf8');
  } catch (error) {
    errors.push(`${pathname}: missing HTML (${error.code || error.message})`);
    return '';
  }
}

function checkPage(html, pathname, english, spanish, language) {
  const url = `${base}${pathname}`;
  expect(html.includes(`<html lang="${language === 'es' ? 'es' : 'en'}`), `${pathname}: wrong page language`);
  expect(html.includes(`<link rel="canonical" href="${url}"`), `${pathname}: wrong self canonical`);
  for (const [tag, alternate] of [['en-US', english], ['es-US', spanish]]) {
    expect(html.includes(`<link rel="alternate" hreflang="${tag}" href="${base}${alternate}"`), `${pathname}: missing ${tag} alternate`);
  }
  expect((html.match(/<h1\b/g) || []).length === 1, `${pathname}: expected exactly one H1`);
  expect(/<meta name="description" content="[^"]+"/.test(html), `${pathname}: missing description`);
  expect(!/<meta[^>]+(?:noindex|nosnippet)/i.test(html), `${pathname}: indexing is disabled`);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [, value] of scripts) {
    try { JSON.parse(value); } catch (error) { errors.push(`${pathname}: invalid JSON-LD (${error.message})`); }
  }
  return url;
}

const expectedUrls = new Set();
for (const [english, spanish] of [['/', '/es/'], ['/editorial/', '/es/metodologia/']]) {
  for (const [pathname, language] of [[english, 'en'], [spanish, 'es']]) {
    const html = await htmlAt(pathname);
    checkPage(html, pathname, english, spanish, language);
    expectedUrls.add(`${base}${pathname}`);
  }
}

for (const guide of topicGuides) {
  const english = guidePath(guide, 'en');
  const spanish = guidePath(guide, 'es');
  const topicActions = actions.filter((action) => action.category === guide.id);
  expect(topicActions.length > 0, `${guide.id}: no actions`);
  for (const [pathname, language] of [[english, 'en'], [spanish, 'es']]) {
    const html = await htmlAt(pathname);
    checkPage(html, pathname, english, spanish, language);
    expectedUrls.add(`${base}${pathname}`);
    const articleIds = [...html.matchAll(/<article class="guide-card" id="([^"]+)"/g)].map((match) => match[1]);
    expect(articleIds.length === topicActions.length, `${pathname}: expected ${topicActions.length} visible action cards, found ${articleIds.length}`);
    for (const action of topicActions) {
      expect(articleIds.includes(action.id), `${pathname}: missing ${action.id}`);
      expect(html.includes(escapeHtml(action[language].title)), `${pathname}: stale title for ${action.id}`);
      expect(html.includes(escapeHtml(action[language].step)), `${pathname}: stale first step for ${action.id}`);
    }
    expect(!html.includes('src="/app.js'), `${pathname}: requires client-side cards`);
    expect(html.includes('class="source-list"'), `${pathname}: missing visible sources`);
    expect(html.includes(language === 'es' ? '/es/metodologia/' : '/editorial/'), `${pathname}: missing editorial-method link`);
    const home = await htmlAt(language === 'es' ? '/es/' : '/');
    expect(home.includes(`href="${pathname}"`), `${pathname}: no crawlable homepage link`);
  }
}

const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
expect(sitemapUrls.length === expectedUrls.size, `sitemap: expected ${expectedUrls.size} URLs, found ${sitemapUrls.length}`);
expect(new Set(sitemapUrls).size === sitemapUrls.length, 'sitemap: duplicate URLs');
for (const url of expectedUrls) expect(sitemapUrls.includes(url), `sitemap: missing ${url}`);
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
expect(robots.includes('Sitemap: https://livewell.sig.ai/sitemap.xml'), 'robots.txt: missing sitemap reference');

if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log(`SEO HTML OK: ${topicGuides.length * 2} complete topic pages, 2 editorial pages, ${expectedUrls.size} sitemap URLs.`);
}
