import { actions, categories, sources } from './content.js?v=20261002b';

const locale = document.documentElement.lang.startsWith('es') ? 'es' : 'en';
const t = {
  en: {
    all: 'All topics',
    start: 'A FIRST STEP',
    source: 'Check the source',
    sources: 'Check the sources',
    sourceEnglish: 'English source',
    today: 'Start today',
    week: 'This week',
    plan: 'Make a plan',
    step: 'step',
    steps: 'steps',
    shown: 'shown',
    save: 'Save step',
    remove: 'Remove saved step',
    copy: 'Copy link to step',
    saved: 'Step saved on this device.',
    removed: 'Step removed from saved items.',
    copied: 'Link copied.',
    copyFailed: 'Could not copy the link.',
  },
  es: {
    all: 'Todos los temas',
    start: 'UN PRIMER PASO',
    source: 'Consulta la fuente',
    sources: 'Consulta las fuentes',
    sourceEnglish: 'Fuente en inglés',
    today: 'Empieza hoy',
    week: 'Esta semana',
    plan: 'Haz un plan',
    step: 'paso',
    steps: 'pasos',
    shown: 'visibles',
    save: 'Guardar paso',
    remove: 'Quitar paso guardado',
    copy: 'Copiar enlace al paso',
    saved: 'Paso guardado en este dispositivo.',
    removed: 'Paso quitado de tus guardados.',
    copied: 'Enlace copiado.',
    copyFailed: 'No se pudo copiar el enlace.',
  },
}[locale];

const bySource = new Map(sources.map((source) => [source.id, source]));
const byCategory = new Map(categories.map((category) => [category.id, category]));
const storageKey = 'livewell-saved-v1';
const themeKey = 'livewell-theme-v1';
let saved = readSaved();
let selectedCategory = 'all';
let selectedEffort = 'all';
let savedOnly = false;
let query = '';
let visibleCount = 12;

const search = document.getElementById('search');
const categoryFilters = document.getElementById('category-filters');
const effortFilter = document.getElementById('effort-filter');
const savedFilter = document.getElementById('saved-filter');
const savedCount = document.getElementById('saved-count');
const clearFilters = document.getElementById('clear-filters');
const resultsCount = document.getElementById('results-count');
const grid = document.getElementById('actions-grid');
const emptyState = document.getElementById('empty-state');
const loadMore = document.getElementById('load-more');
const status = document.createElement('div');
status.className = 'visually-hidden';
status.setAttribute('aria-live', 'polite');
document.body.append(status);

function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return new Set(Array.isArray(value) ? value.filter((id) => typeof id === 'string') : []);
  } catch {
    return new Set();
  }
}

function persistSaved() {
  try { localStorage.setItem(storageKey, JSON.stringify([...saved])); } catch { /* Private browsing can deny storage. */ }
}

function announce(message) {
  status.textContent = '';
  window.setTimeout(() => { status.textContent = message; }, 20);
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderFilters() {
  if (!categoryFilters.childElementCount) {
    const choices = [{ id: 'all', en: { name: t.all }, es: { name: t.all } }, ...categories];
    for (const category of choices) {
      const button = element('button', 'filter-chip', category[locale].name);
      button.type = 'button';
      button.dataset.category = category.id;
      categoryFilters.append(button);
    }
  }
  categoryFilters.querySelectorAll('button[data-category]').forEach((button) => {
    button.setAttribute('aria-pressed', String(selectedCategory === button.dataset.category));
  });
}

function filteredActions() {
  const fold = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase(locale === 'es' ? 'es-US' : 'en-US');
  const needle = fold(query.trim());
  return actions.filter((action) => {
    if (selectedCategory !== 'all' && action.category !== selectedCategory) return false;
    if (selectedEffort !== 'all' && action.effort !== selectedEffort) return false;
    if (savedOnly && !saved.has(action.id)) return false;
    if (!needle) return true;
    const category = byCategory.get(action.category);
    const linkedSources = action.sources.map((id) => bySource.get(id)).filter(Boolean);
    const words = fold([action.en.title, action.en.why, action.en.step, action.es.title, action.es.why, action.es.step, category?.en.name, category?.es.name, ...linkedSources.flatMap((source) => [source.name, source.esName || ''])].join(' ')).split(/[^a-z0-9]+/).filter(Boolean);
    return needle.split(/\s+/).every((term) => words.some((word) => word.startsWith(term)));
  });
}

function makeCard(action, index) {
  const copy = action[locale];
  const category = byCategory.get(action.category);
  const card = element('article', 'action-card');
  card.id = action.id;
  card.dataset.category = action.category;

  const top = element('div', 'action-top');
  const badge = element('span', 'action-category');
  badge.append(element('span', 'category-dot'), document.createTextNode(category[locale].name));
  const number = element('span', 'action-index', String(index + 1).padStart(2, '0'));
  top.append(badge, number);
  card.append(top, element('h3', '', copy.title), element('p', 'action-why', copy.why));

  const step = element('div', 'action-step');
  step.append(element('span', '', t.start), element('p', '', copy.step));
  card.append(step);

  const footer = element('div', 'action-footer');
  footer.append(element('span', 'effort-label', t[action.effort]));
  const controls = element('div', 'action-controls');
  const saveButton = element('button', 'action-control', saved.has(action.id) ? '♥' : '♡');
  saveButton.type = 'button';
  saveButton.title = saved.has(action.id) ? t.remove : t.save;
  saveButton.setAttribute('aria-label', `${saved.has(action.id) ? t.remove : t.save}: ${copy.title}`);
  saveButton.setAttribute('aria-pressed', String(saved.has(action.id)));
  saveButton.addEventListener('click', () => {
    const wasSaved = saved.has(action.id);
    if (wasSaved) saved.delete(action.id);
    else saved.add(action.id);
    persistSaved();
    announce(saved.has(action.id) ? t.saved : t.removed);
    render();
    if (savedOnly && wasSaved) savedFilter.focus();
    else document.getElementById(action.id)?.querySelector('.action-controls button')?.focus();
  });
  const copyButton = element('button', 'action-control', '↗');
  copyButton.type = 'button';
  copyButton.title = t.copy;
  copyButton.setAttribute('aria-label', `${t.copy}: ${copy.title}`);
  copyButton.addEventListener('click', () => copyLink(action.id));
  controls.append(saveButton, copyButton);
  footer.append(controls);
  card.append(footer);

  const details = element('details', 'action-source');
  details.append(element('summary', '', action.sources.length === 1 ? t.source : t.sources));
  const list = element('ul');
  for (const sourceId of action.sources) {
    const source = bySource.get(sourceId);
    if (!source) continue;
    const item = element('li');
    const link = element('a', '', locale === 'es' && source.esName ? source.esName : source.name);
    if (locale === 'es' && !source.esName) link.lang = 'en';
    link.href = locale === 'es' && source.esUrl ? source.esUrl : source.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    item.append(link);
    if (locale === 'es' && !source.esUrl) item.append(document.createTextNode(` (${t.sourceEnglish})`));
    list.append(item);
  }
  details.append(list);
  card.append(details);
  return card;
}

async function copyLink(id) {
  const url = `${location.origin}${location.pathname}#${encodeURIComponent(id)}`;
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
    else {
      const field = document.createElement('textarea');
      field.value = url;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.append(field);
      field.select();
      const success = document.execCommand('copy');
      field.remove();
      if (!success) throw new Error('Copy failed');
    }
    announce(t.copied);
  } catch {
    announce(t.copyFailed);
  }
}

function render() {
  renderFilters();
  const found = filteredActions();
  const displayed = found.slice(0, visibleCount);
  grid.replaceChildren(...displayed.map((action, index) => makeCard(action, index)));
  resultsCount.textContent = `${found.length} ${found.length === 1 ? t.step : t.steps}${found.length > displayed.length ? ` · ${displayed.length} ${t.shown}` : ''}`;
  emptyState.hidden = found.length !== 0;
  loadMore.hidden = found.length <= displayed.length;
  clearFilters.hidden = selectedCategory === 'all' && selectedEffort === 'all' && !savedOnly && !query;
  savedCount.textContent = saved.size;
  savedFilter.setAttribute('aria-pressed', String(savedOnly));
}

categoryFilters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  selectedCategory = button.dataset.category;
  visibleCount = 12;
  render();
});
search.addEventListener('input', () => { query = search.value; visibleCount = 12; render(); });
effortFilter.addEventListener('change', () => { selectedEffort = effortFilter.value; visibleCount = 12; render(); });
savedFilter.addEventListener('click', () => { savedOnly = !savedOnly; visibleCount = 12; render(); });
clearFilters.addEventListener('click', () => {
  selectedCategory = 'all'; selectedEffort = 'all'; savedOnly = false; query = ''; visibleCount = 12;
  search.value = ''; effortFilter.value = 'all'; render(); search.focus();
});
loadMore.addEventListener('click', () => { visibleCount += 12; render(); });
document.addEventListener('keydown', (event) => {
  if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable) return;
  event.preventDefault(); search.focus();
});

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('.theme-toggle').forEach((button) => button.setAttribute('aria-pressed', String(theme === 'dark')));
}
let theme = 'light';
try { theme = localStorage.getItem(themeKey) || 'light'; } catch { /* Continue with light theme. */ }
applyTheme(theme === 'dark' ? 'dark' : 'light');
document.querySelectorAll('.theme-toggle').forEach((button) => button.addEventListener('click', () => {
  theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem(themeKey, theme); } catch { /* Theme still changes for this view. */ }
}));

render();
document.querySelectorAll('a[hreflang]').forEach((link) => {
  if (location.hash) link.href += location.hash;
});
if (location.hash) {
  let id = '';
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { /* Ignore malformed fragments. */ }
  if (actions.some((action) => action.id === id)) {
    visibleCount = actions.length;
    render();
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }
}
window.addEventListener('beforeprint', () => { visibleCount = actions.length; render(); });
