/* globals respecConfig */
/* exported transcludeCoreMappings */

/**
 * Replaces "Use WAI-ARIA mapping" placeholder cells in an AAM element mapping
 * table (e.g. HTML-AAM) with the platform mappings from the matching table in
 * Core AAM, so that Core AAM remains the single source of truth.
 * See https://github.com/w3c/html-aam/issues/122
 *
 * Opt in per table with `data-transclude-core-mappings`. The Core AAM table to
 * use is taken from the `a.core-mapping` link in the table's WAI-ARIA row (it
 * must point at a `#role-map-*` id). Run this as a respec preProcess step
 * AFTER linkCrossReferences, which makes that link absolute.
 *
 * If anything cannot be resolved the placeholder text is left alone and
 * turned into a link to the Core AAM table.
 */

const PLACEHOLDER = /^\s*(Role:\s*)?Use WAI-ARIA mapping\s*$/i;

// Identify a mapping row by its <th> text. Core AAM and the AAMs word these differently.
const rowKey = (th) => {
  const t = th.textContent.replace(/\s+/g, " ").trim();
  if (/^computed role/i.test(t)) return "role";
  if (/MSAA/i.test(t)) return "msaa";
  if (/^UIA/i.test(t)) return "uia";
  if (/^\[*ATK/i.test(t)) return "atk"; // html-aam writes this header as the [[ATK]] reference
  if (/^AX/i.test(t)) return "ax";
  return null;
};

const rowsByKey = (table) => {
  const map = new Map();
  table.querySelectorAll("tr").forEach((tr) => {
    const th = tr.querySelector(":scope > th");
    const td = tr.querySelector(":scope > td");
    const key = th && td && rowKey(th);
    if (key && !map.has(key)) map.set(key, td);
  });
  return map;
};

const docCache = new Map();
const loadDoc = (url) => {
  if (!docCache.has(url)) {
    docCache.set(
      url,
      fetch(url)
        .then((r) => {
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          return r.text();
        })
        .then((html) => new DOMParser().parseFromString(html, "text/html")),
    );
  }
  return docCache.get(url);
};

// Content copied from Core AAM must not introduce duplicate ids, and its fragment links must still reach Core AAM.
const adoptContent = (srcCell, coreBaseURL) => {
  const clone = srcCell.cloneNode(true);
  clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
  clone.querySelectorAll("a[href^='#']").forEach((a) => a.setAttribute("href", coreBaseURL + a.getAttribute("href")));
  return clone.innerHTML;
};

async function transcludeCoreMappings() {
  const tables = [...document.querySelectorAll("table[data-transclude-core-mappings]")];
  if (!tables.length) return;

  const coreURL = respecConfig.coreMappingURLs ? respecConfig.coreMappingURLs[respecConfig.specStatus] : null;
  if (!coreURL) return;
  // The Editor's Draft sits next to this spec; published versions are fetched from their dated /TR/ URL.
  const sources = respecConfig.specStatus === "ED" ? ["../core-aam/index.html", coreURL] : [coreURL];

  let coreDoc = null;
  for (const src of sources) {
    try {
      coreDoc = await loadDoc(src);
      break;
    } catch (e) {
      console.warn(`transcludeCoreMappings(): could not load ${src}: ${e.message}`);
    }
  }

  for (const table of tables) {
    const link = table.querySelector("a.core-mapping[href*='#role-map-']");
    const href = link && link.getAttribute("href");
    const id = href && href.slice(href.indexOf("#") + 1);
    // Look the table up by aria-labelledby rather than "the heading's next sibling": published Core AAM wraps headings in div.header-wrapper.
    const coreTable = coreDoc && id && coreDoc.querySelector(`table[aria-labelledby="${CSS.escape(id)}"]`);
    const source = coreTable ? rowsByKey(coreTable) : null;

    for (const [key, cell] of rowsByKey(table)) {
      if (!PLACEHOLDER.test(cell.textContent)) continue;
      const replacement = source && source.get(key);
      if (replacement) {
        cell.innerHTML = `<div class="general">${adoptContent(replacement, coreURL)}</div>`;
      } else if (href) {
        // Fallback (issue option 1): at least make the placeholder a link.
        const target = cell.querySelector(".general, .role") || cell;
        const text = target.textContent.trim();
        target.innerHTML = `<a href="${href}">${text}</a>`;
      }
    }
    table.removeAttribute("data-transclude-core-mappings");
  }
}
