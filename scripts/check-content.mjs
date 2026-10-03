#!/usr/bin/env node

// Local structure check for every card displayed by the guide. Run from any directory:
// node /absolute/path/to/scripts/check-content.mjs

const errors = [];
const effortIds = new Set(['today', 'week', 'plan']);
const expectedCategoryIds = new Set([
  'safety', 'health', 'money', 'support', 'home', 'work', 'connection',
  'family', 'digital', 'rights',
]);
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// "todo" is ordinary Spanish, so only treat uppercase TODO/TBD as markers.
const placeholders = /\b(?:TODO|TBD)\b|lorem ipsum|placeholder/;

function fail(message) {
  errors.push(message);
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function checkId(value, where) {
  if (typeof value !== 'string' || !idPattern.test(value)) {
    fail(`${where}: id must be a lowercase, hyphen-separated string`);
  }
}

function checkUnique(items, type) {
  const seen = new Map();
  for (const [index, item] of items.entries()) {
    const id = item?.id;
    if (typeof id !== 'string') continue;
    if (seen.has(id)) fail(`${type} id "${id}" is repeated at positions ${seen.get(id) + 1} and ${index + 1}`);
    else seen.set(id, index);
  }
}

function checkText(value, where, minimumWords) {
  if (typeof value !== 'string' || !value.trim()) {
    fail(`${where}: missing text`);
    return;
  }
  const trimmed = value.trim();
  const words = trimmed.split(/\s+/u).length;
  if (words < minimumWords) fail(`${where}: expected at least ${minimumWords} words; found ${words}`);
  if (placeholders.test(trimmed)) fail(`${where}: contains placeholder text`);
  if (/[<>]/u.test(trimmed)) fail(`${where}: contains markup-like characters; use plain text`);
}

function checkTranslation(item, where, fields) {
  for (const language of ['en', 'es']) {
    const translation = item?.[language];
    if (!isRecord(translation)) {
      fail(`${where}.${language}: missing translation object`);
      continue;
    }
    for (const [field, minimumWords] of Object.entries(fields)) {
      checkText(translation[field], `${where}.${language}.${field}`, minimumWords);
    }
  }
  for (const field of Object.keys(fields)) {
    const en = item?.en?.[field];
    const es = item?.es?.[field];
    if (typeof en === 'string' && typeof es === 'string' && en.trim().toLocaleLowerCase() === es.trim().toLocaleLowerCase()) {
      fail(`${where}.${field}: English and Spanish text are identical`);
    }
  }
}

function checkHttps(value, where) {
  if (typeof value !== 'string' || !value.trim()) {
    fail(`${where}: missing URL`);
    return;
  }
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) {
      fail(`${where}: expected a public HTTPS URL without embedded credentials`);
    }
  } catch {
    fail(`${where}: invalid URL`);
  }
}

async function loadModule(filename) {
  try {
    return await import(new URL(`../${filename}`, import.meta.url));
  } catch (error) {
    fail(`${filename}: could not import (${error.message})`);
    return {};
  }
}

function pickArray(module, filename, preferredNames, predicate) {
  for (const name of preferredNames) {
    if (Array.isArray(module[name])) return module[name];
  }
  // The expansion modules can choose descriptive export names. Their record
  // shapes still make the two collections unambiguous.
  const candidates = Object.entries(module)
    .filter(([, value]) => Array.isArray(value) && value.length && predicate(value[0]));
  if (candidates.length === 1) return candidates[0][1];
  fail(`${filename}: expected one ${preferredNames.join(' or ')} array; found ${candidates.length} shape-matched arrays`);
  return [];
}

const [core, family, rights, lifecourse, pathModule] = await Promise.all([
  loadModule('content.js'),
  loadModule('expansion-family.js'),
  loadModule('expansion-rights.js'),
  loadModule('expansion-lifecourse.js'),
  loadModule('pathways.js'),
]);

const modules = [
  { file: 'content.js', module: core, actionNames: ['actions'], sourceNames: ['sources'] },
  { file: 'expansion-family.js', module: family, actionNames: ['actions', 'expansionFamilyActions'], sourceNames: ['sources', 'expansionFamilySources'] },
  { file: 'expansion-rights.js', module: rights, actionNames: ['expansionRightsActions', 'actions'], sourceNames: ['expansionRightsSources', 'sources'] },
  { file: 'expansion-lifecourse.js', module: lifecourse, actionNames: ['expansionLifecourseActions', 'lifecourseActions', 'actions'], sourceNames: ['expansionLifecourseSources', 'lifecourseSources', 'sources'] },
];

const categories = pickArray(core, 'content.js', ['categories'], value => isRecord(value) && isRecord(value.en) && isRecord(value.es) && !('effort' in value));
const sources = [];
const actions = [];
for (const entry of modules) {
  const moduleSources = pickArray(entry.module, entry.file, entry.sourceNames, value => isRecord(value) && 'url' in value && 'name' in value);
  const moduleActions = pickArray(entry.module, entry.file, entry.actionNames, value => isRecord(value) && 'category' in value && 'effort' in value && 'sources' in value);
  for (const source of moduleSources) sources.push({ ...source, __file: entry.file });
  for (const action of moduleActions) actions.push({ ...action, __file: entry.file });
}
const pathways = pickArray(pathModule, 'pathways.js', ['pathways'], value => isRecord(value) && Array.isArray(value.actions));

checkUnique(categories, 'Category');
checkUnique(sources, 'Source');
checkUnique(actions, 'Action');
checkUnique(pathways, 'Pathway');

const categoryIds = new Set(categories.map(category => category?.id).filter(id => typeof id === 'string'));
if (categoryIds.size !== expectedCategoryIds.size || [...expectedCategoryIds].some(id => !categoryIds.has(id))) {
  fail(`content.js: expected exactly these ${expectedCategoryIds.size} category ids: ${[...expectedCategoryIds].join(', ')}`);
}
for (const [index, category] of categories.entries()) {
  const where = `category ${category?.id ?? `#${index + 1}`}`;
  checkId(category?.id, where);
  checkTranslation(category, where, { name: 1, description: 4 });
}

const sourceIds = new Set(sources.map(source => source?.id).filter(id => typeof id === 'string'));
for (const [index, source] of sources.entries()) {
  const where = `${source.__file} source ${source?.id ?? `#${index + 1}`}`;
  checkId(source?.id, where);
  checkText(source?.name, `${where}.name`, 1);
  checkHttps(source?.url, `${where}.url`);
  if ('esName' in source) checkText(source.esName, `${where}.esName`, 1);
  if ('esUrl' in source) checkHttps(source.esUrl, `${where}.esUrl`);
}

const actionIds = new Set(actions.map(action => action?.id).filter(id => typeof id === 'string'));
for (const [index, action] of actions.entries()) {
  const where = `${action.__file} action ${action?.id ?? `#${index + 1}`}`;
  checkId(action?.id, where);
  if (!categoryIds.has(action?.category)) fail(`${where}: unknown category "${action?.category}"`);
  if (!effortIds.has(action?.effort)) fail(`${where}: effort must be today, week, or plan`);
  checkTranslation(action, where, { title: 3, why: 5, step: 7 });
  if (!Array.isArray(action?.sources) || action.sources.length === 0) {
    fail(`${where}: needs at least one source id`);
  } else {
    if (new Set(action.sources).size !== action.sources.length) fail(`${where}: repeats a source id`);
    for (const id of action.sources) {
      if (!sourceIds.has(id)) fail(`${where}: source "${id}" does not exist`);
    }
  }
}

for (const [index, pathway] of pathways.entries()) {
  const where = `pathways.js pathway ${pathway?.id ?? `#${index + 1}`}`;
  checkId(pathway?.id, where);
  checkTranslation(pathway, where, { title: 3, description: 5 });
  if (!Array.isArray(pathway?.actions)) {
    fail(`${where}: actions must be an array`);
    continue;
  }
  if (pathway.actions.length < 3 || pathway.actions.length > 8) {
    fail(`${where}: expected 3 to 8 actions; found ${pathway.actions.length}`);
  }
  if (new Set(pathway.actions).size !== pathway.actions.length) fail(`${where}: repeats an action id`);
  for (const id of pathway.actions) {
    if (!actionIds.has(id)) fail(`${where}: action "${id}" does not exist`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  console.error(`Content validation failed: ${errors.length} issue${errors.length === 1 ? '' : 's'}.`);
  process.exitCode = 1;
} else {
  console.log(`Content OK: ${categories.length} categories, ${actions.length} actions, ${sources.length} sources, ${pathways.length} pathways.`);
}
