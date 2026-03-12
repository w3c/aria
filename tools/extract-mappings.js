import { readFileSync, writeFileSync } from 'fs';
import * as cheerio from 'cheerio';

const html = readFileSync('../core-aam/index.html', 'utf8');
const $ = cheerio.load(html);

// Maps normalised <th> text to JSON field names.
const PLATFORM_KEYS = {
  'MSAA + IAccessible2': 'msaaIA2',
  'UIA':                 'uia',
  'ATK/AT-SPI':          'atkAtSpi',
  'AX API':              'axApi',
  'Android':             'android',
};

// Collapse whitespace and strip footnote markers like "[Note 1]" from <th> text.
function normalizeHeader(th) {
  return $(th).text().replace(/\s+/g, ' ').replace(/\[Note \d+\]/g, '').trim();
}

// Parse the ARIA Specification cell.
// Returns the raw inner HTML of the <td> as a string.
function parseAriaSpec(td) {
  return $(td).html().trim();
}

// Returns true when the cell contains content that cannot be represented as a
// structured items array — i.e. it has non-whitespace text nodes or elements
// other than <span>, <br>, or <p> as direct children.
function isNotStructuredCell(td) {
  let complex = false;
  $(td).contents().each((_, node) => {
    if (complex) return false;
    if (node.type === 'text') {
      if (node.data.trim() !== '') complex = true;
    } else if (node.type === 'tag' && !['span', 'br', 'p'].includes(node.name)) {
      complex = true;
    }
  });
  return complex;
}

// Parse a single <span> into a mapping item object { type, value?, description? }.
// Returns null for spans that should be skipped.
function parseSpan(span) {
  const classes = ($(span).attr('class') || '').split(/\s+/).filter(Boolean);

  if (!classes.length) return null;

  // For not-mapped, not-in-tree, and seealso spans, save the type and the
  // full inner HTML of the span as the description.
  const sentinelClass = classes.find(c => ['not-mapped', 'not-in-tree', 'seealso'].includes(c));
  if (sentinelClass) {
    return { type: sentinelClass, description: $(span).html().trim() };
  }

  // type: plain text before the first colon.
  const fullText = $(span).text().trim();
  const colonIdx = fullText.indexOf(':');
  const type = colonIdx !== -1 ? fullText.slice(0, colonIdx).trim() : fullText;

  const codeEl = $(span).find('code').first();

  if (!codeEl.length) {
    // No <code> element: everything after the first colon in the span HTML is
    // the description. The type label is always plain text at the start of the
    // span, so the first ':' in the HTML is the delimiter.
    const spanHtml = $(span).html().trim();
    const htmlColonIdx = spanHtml.indexOf(':');
    const descHtml = htmlColonIdx !== -1 ? spanHtml.slice(htmlColonIdx + 1).trim() : '';
    const item = { type };
    if (descHtml) item.description = descHtml;
    return item;
  }

  const value = codeEl.text().trim();

  // description: the HTML content of the span after the first <code> element,
  // with leading punctuation stripped.
  const contents = $(span).contents().toArray();
  const codeIdx = contents.findIndex(n => n.type === 'tag' && n.name === 'code');
  const descHtml = contents
    .slice(codeIdx + 1)
    .map(n => $.html(n))
    .join('')
    .trim()
    .replace(/^[:,.]\s*/, '')
    .trim();

  const item = { type, value };
  if (descHtml) item.description = descHtml;
  return item;
}

// Parse a mapping cell (<td>) into an item-list object.
// Falls back to { rawHtml } for cells that contain bare text or unexpected
// elements (e.g. "See <a href="...">Focus Changes</a>.").
function parseCell(td) {
  const result = { items: [] };

  if (isNotStructuredCell(td)) {
    result.note = $(td).html().trim();
    return result;
  }

  $(td).contents().each((_, node) => {
    if (node.name == 'br' ||
        node.type === 'text') {
      return;
    }
    if (node.name == 'span') {
      const item = parseSpan(node);
      if (item) result.items.push(item);
      return;
    }

    result.note = ($(node).html().trim());
  });

  return result;
}

const output = { roles: {}, attributes: {} };

$('h4[id]').each((_, h4) => {
  const id = $(h4).attr('id');
  const table = $(h4).next('table');
  if (!table.length) return;

  const isRole = id.startsWith('role-map-');
  const isAttr = !isRole && id.startsWith('aria');
  if (!isRole && !isAttr) return;

  // Store the raw inner HTML of the <h4> so the generation script can
  // faithfully recreate headings that contain extra content (e.g. "button
  // with default values for aria-pressed and aria-haspopup").
  const entry = {
    headingHtml: $(h4).html().trim(),
  };

  table.find('tr').each((_, tr) => {
    const th = $(tr).find('th').first();
    const td = $(tr).find('td').first();
    if (!th.length || !td.length) return;

    const header = normalizeHeader(th);

    if (header === 'ARIA Specification') {
      entry.ariaSpec = parseAriaSpec(td);
    } else if (header === 'Computed Role') {
      entry.computedRole = $(td).text().trim();
    } else {
      const key = PLATFORM_KEYS[header];
      if (key) entry[key] = parseCell(td);
    }
  });

  if (isRole) {
    output.roles[id] = entry;
  } else {
    output.attributes[id] = entry;
  }
});

writeFileSync('mappings.json', JSON.stringify(output, null, 2));
console.log(
  `Wrote ${Object.keys(output.roles).length} roles and ` +
  `${Object.keys(output.attributes).length} attributes to mappings.json.`
);
