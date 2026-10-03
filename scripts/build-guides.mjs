#!/usr/bin/env node

// Build standalone, crawlable English and Spanish topic guides from the same
// reviewed action/source data used by the interactive guide. No client-side
// JavaScript is required to read these pages.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { actions as coreActions, categories, sources as coreSources } from '../content.js';
import { actions as familyActions, sources as familySources } from '../expansion-family.js';
import { actions as rightsActions, sources as rightsSources } from '../expansion-rights.js';
import { actions as lifeActions, sources as lifeSources } from '../expansion-lifecourse.js';
import { guidePath, topicGuides } from './guide-metadata.mjs';

const site = 'https://livewell.sig.ai';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const actions = [...coreActions, ...familyActions, ...rightsActions, ...lifeActions];
const sources = new Map([...coreSources, ...familySources, ...rightsSources, ...lifeSources].map((source) => [source.id, source]));
const byCategory = new Map(categories.map((category) => [category.id, category]));
const relatedIds = {
  safety: ['home', 'health', 'digital'],
  health: ['support', 'family', 'money'],
  money: ['support', 'work', 'rights'],
  support: ['money', 'health', 'family'],
  home: ['safety', 'support', 'rights'],
  work: ['money', 'rights', 'support'],
  connection: ['family', 'health', 'support'],
  family: ['health', 'connection', 'support'],
  digital: ['rights', 'money', 'safety'],
  rights: ['money', 'work', 'home'],
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function attr(value) {
  return escapeHtml(value);
}

function sourceList(action, language) {
  const items = action.sources.map((sourceId) => {
    const source = sources.get(sourceId);
    if (!source) throw new Error(`Unknown source ${sourceId} in ${action.id}`);
    const linkLanguage = language === 'es' && (!source.esUrl || !source.esName) ? ' lang="en"' : '';
    const url = language === 'es' && source.esUrl ? source.esUrl : source.url;
    const label = language === 'es' && source.esUrl && source.esName ? source.esName : source.name;
    const englishNote = language === 'es' && !source.esUrl
      ? ' <span class="source-note">(fuente en inglés)</span>' : '';
    return `<li><a href="${attr(url)}"${linkLanguage}>${escapeHtml(label)}</a>${englishNote}</li>`;
  });
  return `<ul class="source-list">${items.join('')}</ul>`;
}

function actionCard(action, index, language, canonical) {
  const copy = action[language];
  const labels = language === 'es'
    ? { step: 'Primer paso', source: action.sources.length === 1 ? 'Fuente' : 'Fuentes', permalink: 'Enlace directo a este paso' }
    : { step: 'First step', source: action.sources.length === 1 ? 'Source' : 'Sources', permalink: 'Direct link to this step' };
  return `<article class="guide-card" id="${attr(action.id)}">
          <div class="card-heading"><span class="card-number">${String(index + 1).padStart(2, '0')}</span><h3>${escapeHtml(copy.title)}</h3><a class="permalink" href="${attr(`${canonical}#${action.id}`)}" aria-label="${attr(`${labels.permalink}: ${copy.title}`)}">#</a></div>
          <p class="reason">${escapeHtml(copy.why)}</p>
          <div class="first-step"><h4>${labels.step}</h4><p>${escapeHtml(copy.step)}</p></div>
          <div class="card-sources"><h4>${labels.source}</h4>${sourceList(action, language)}</div>
        </article>`;
}

function relatedLinks(guide, language) {
  const links = relatedIds[guide.id].map((id) => {
    const related = topicGuides.find((item) => item.id === id);
    if (!related) throw new Error(`Unknown related guide ${id}`);
    const category = byCategory.get(id);
    return `<li><a href="${attr(guidePath(related, language))}">${escapeHtml(category[language].name)} <span aria-hidden="true">↗</span></a></li>`;
  });
  return links.join('');
}

function render(guide, language) {
  const otherLanguage = language === 'en' ? 'es' : 'en';
  const canonical = `${site}${guidePath(guide, language)}`;
  const alternate = `${site}${guidePath(guide, otherLanguage)}`;
  const enCanonical = `${site}${guidePath(guide, 'en')}`;
  const esCanonical = `${site}${guidePath(guide, 'es')}`;
  const category = byCategory.get(guide.id);
  const localized = guide[language];
  const topicActions = actions.filter((action) => action.category === guide.id);
  if (!category || !topicActions.length) throw new Error(`Missing category or actions for ${guide.id}`);
  const labels = language === 'es' ? {
    skip: 'Ir al contenido', home: 'Inicio', all: 'Todos los temas', method: 'Fuentes y metodología',
    language: 'Cambiar a inglés', eyebrow: 'GUÍA PRÁCTICA PARA LA VIDA EN EE. UU.',
    contents: 'En esta página', steps: 'Pasos que puedes dar',
    stepsIntro: `${topicActions.length} pasos para explorar. Elige uno que se ajuste a tu situación; cada paso tiene una fuente que puedes consultar.`,
    related: 'Explora otros temas', full: 'Explora la guía completa',
    note: 'Esta página ofrece información general. Los servicios y las reglas pueden variar según tu estado y cambiar con el tiempo. Consulta las fuentes y pide orientación profesional para tu situación médica, legal o financiera.',
    credit: 'Un paso útil a la vez.', brand: 'vive bien, aquí.',
  } : {
    skip: 'Skip to content', home: 'Home', all: 'All topics', method: 'Sources and editorial method',
    language: 'Switch to Spanish', eyebrow: 'A PRACTICAL GUIDE FOR LIFE IN THE U.S.',
    contents: 'On this page', steps: 'Steps you can take',
    stepsIntro: `${topicActions.length} steps to explore. Choose one that fits your situation; each step has a source you can check.`,
    related: 'Explore other topics', full: 'Explore the full guide',
    note: 'This page offers general information. Services and rules can vary by state and change over time. Check the sources and ask a qualified professional about your own medical, legal, or financial situation.',
    credit: 'One useful step at a time.', brand: 'live well, here.',
  };
  const rootPath = language === 'es' ? '/es/' : '/';
  const methodPath = language === 'es' ? '/es/metodologia/' : '/editorial/';
  const title = `${localized.title} | ${language === 'es' ? 'Vive bien, aquí' : 'Live Well, Here'}`;
  const ogLocale = language === 'es' ? 'es_US' : 'en_US';
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: labels.home, item: `${site}${rootPath}` },
      { '@type': 'ListItem', position: 2, name: category[language].name, item: canonical },
    ],
  };
  const jsonLd = JSON.stringify(breadcrumb).replace(/</g, '\\u003c');
  const tableOfContents = topicActions.map((action) => `<li><a href="#${attr(action.id)}">${escapeHtml(action[language].title)}</a></li>`).join('');
  const cards = topicActions.map((action, index) => actionCard(action, index, language, canonical)).join('\n');
  return `<!doctype html>
<html lang="${language === 'es' ? 'es-US' : 'en-US'}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#f7f5ee" />
    <meta name="description" content="${attr(localized.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Live Well, Here" />
    <meta property="og:locale" content="${ogLocale}" />
    <meta property="og:title" content="${attr(title)}" />
    <meta property="og:description" content="${attr(localized.description)}" />
    <meta property="og:url" content="${attr(canonical)}" />
    <meta name="twitter:card" content="summary" />
    <link rel="canonical" href="${attr(canonical)}" />
    <link rel="alternate" hreflang="en-US" href="${attr(enCanonical)}" />
    <link rel="alternate" hreflang="es-US" href="${attr(esCanonical)}" />
    <link rel="alternate" hreflang="x-default" href="${attr(enCanonical)}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/guide.css?v=20261002d" />
    <script type="application/ld+json">${jsonLd}</script>
    <title>${escapeHtml(title)}</title>
  </head>
  <body>
    <a class="skip-link" href="#main">${labels.skip}</a>
    <header class="guide-header">
      <div class="page-wrap header-row">
        <a class="wordmark" href="${rootPath}">${labels.brand}</a>
        <nav class="site-nav" aria-label="${language === 'es' ? 'Navegación principal' : 'Main navigation'}">
          <a href="${rootPath}#explore">${labels.all}</a>
          <a href="${methodPath}">${labels.method}</a>
        </nav>
        <a class="language-link" href="${attr(alternate)}" hreflang="${otherLanguage === 'es' ? 'es-US' : 'en-US'}" lang="${otherLanguage}" aria-label="${labels.language}">${otherLanguage === 'es' ? 'ES' : 'EN'}</a>
      </div>
    </header>
    <main id="main">
      <div class="page-wrap">
        <nav class="breadcrumbs" aria-label="${language === 'es' ? 'Ruta de navegación' : 'Breadcrumb'}"><ol><li><a href="${rootPath}">${labels.home}</a></li><li aria-current="page">${escapeHtml(category[language].name)}</li></ol></nav>
        <section class="guide-hero" aria-labelledby="page-title">
          <p class="eyebrow">${labels.eyebrow}</p>
          <h1 id="page-title">${escapeHtml(localized.title)}</h1>
          <p class="hero-intro">${escapeHtml(localized.intro)}</p>
          <p class="guide-caveat">${escapeHtml(labels.note)}</p>
        </section>
        <div class="guide-layout">
          <aside class="table-of-contents"><nav aria-label="${labels.contents}"><h2>${labels.contents}</h2><ol>${tableOfContents}</ol></nav></aside>
          <section class="guide-actions" aria-labelledby="steps-title">
            <div class="steps-heading"><p class="eyebrow">${String(topicActions.length).padStart(2, '0')} ${language === 'es' ? 'PASOS' : 'STEPS'}</p><h2 id="steps-title">${labels.steps}</h2><p>${escapeHtml(labels.stepsIntro)}</p></div>
            <div class="guide-card-list">${cards}</div>
          </section>
        </div>
        <section class="related-topics" aria-labelledby="related-title"><h2 id="related-title">${labels.related}</h2><ul>${relatedLinks(guide, language)}</ul><a class="all-guide-link" href="${rootPath}#explore">${labels.full} <span aria-hidden="true">↗</span></a></section>
      </div>
    </main>
    <footer class="guide-footer"><div class="page-wrap footer-row"><a class="wordmark" href="${rootPath}">${labels.brand}</a><p>${labels.credit}</p><a href="${methodPath}">${labels.method}</a></div></footer>
  </body>
</html>
`;
}

async function main() {
  const ids = new Set();
  const paths = new Set();
  for (const guide of topicGuides) {
    if (ids.has(guide.id)) throw new Error(`Duplicate topic guide ID: ${guide.id}`);
    ids.add(guide.id);
    for (const language of ['en', 'es']) {
      const pathname = guidePath(guide, language);
      if (paths.has(pathname)) throw new Error(`Duplicate guide URL: ${pathname}`);
      paths.add(pathname);
      const filename = resolve(root, `.${pathname}`, 'index.html');
      await mkdir(dirname(filename), { recursive: true });
      await writeFile(filename, render(guide, language), 'utf8');
    }
  }
  if (ids.size !== categories.length) throw new Error(`Expected ${categories.length} topic guides, found ${ids.size}`);
  console.log(`Generated ${paths.size} standalone topic pages across ${ids.size} topics.`);
}

await main();
