/* globals respecConfig */
/* exported transcludeCoreMappings */

/**
 * Replaces "Use WAI-ARIA mapping" placeholders in an AAM element mapping table
 * (e.g. HTML-AAM) with the platform mappings from the matching table in
 * Core AAM, so that Core AAM remains the single source of truth.
 * See https://github.com/w3c/html-aam/issues/122
 *
 * The Core AAM table to use is taken from the `a.core-mapping` link in the
 * table's WAI-ARIA row: a role mapping (`#role-map-*`) for element tables, or a
 * state/property mapping (e.g. `#ariaCheckedTrue`) for attribute tables. It must
 * point at exactly one table. Tables whose WAI-ARIA row is conditional (links to
 * several mappings) are left untouched. Run this as a
 * respec preProcess step AFTER linkCrossReferences, which makes that link absolute.
 *
 * Only the placeholder itself is replaced, so any extra content the AAM adds
 * to the same cell (e.g. relations) is preserved. If the Core AAM table cannot
 * be loaded or lacks a matching row, the placeholder is turned into a link to
 * the Core AAM table instead.
 */

const PLACEHOLDER = /Use WAI-ARIA mapping/i;

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

// The href of the single Core AAM role mapping a table's WAI-ARIA row points to, or null if there is none or it is ambiguous.
const coreMappingHref = (table) => {
  const ariaRow = [...table.querySelectorAll("tr")].find((tr) => /wai-aria/i.test(tr.querySelector(":scope > th")?.textContent ?? ""));
  if (!ariaRow) return null;
  // Element tables link to a role mapping (#role-map-*); attribute tables link to a state or property mapping (e.g. #ariaCheckedTrue).
  let links = [...ariaRow.querySelectorAll("a.core-mapping[href*='#role-map-']")];
  if (!links.length) links = [...ariaRow.querySelectorAll("a.core-mapping[href*='#']")];
  const hrefs = new Set(links.map((a) => a.getAttribute("href")));
  return hrefs.size === 1 ? [...hrefs][0] : null;
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

// The child of `cell` (or `cell` itself) that holds the placeholder text, so only that part is replaced.
const placeholderBlock = (cell) => {
  if (!PLACEHOLDER.test(cell.textContent)) return null;
  const child = [...cell.children].find((el) => PLACEHOLDER.test(el.textContent));
  return child ?? cell;
};

async function transcludeCoreMappings() {
  const tables = [...document.querySelectorAll("table.data")].filter((t) => PLACEHOLDER.test(t.textContent) && coreMappingHref(t));
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
    const href = coreMappingHref(table);
    const id = href.slice(href.indexOf("#") + 1);
    // Look the table up by aria-labelledby rather than "the heading's next sibling": published Core AAM wraps headings in div.header-wrapper.
    const coreTable = coreDoc?.querySelector(`table[aria-labelledby="${CSS.escape(id)}"]`);
    const source = coreTable ? rowsByKey(coreTable) : null;

    for (const [key, cell] of rowsByKey(table)) {
      const block = placeholderBlock(cell);
      if (!block) continue;
      let replacement = source?.get(key);
      // "Role: Use WAI-ARIA mapping" means only the role comes from ARIA; the AAM supplies the rest (e.g. an AXSubrole
      // override), so copy just Core AAM's first line (role / control type) to avoid conflicting extra properties.
      if (replacement && /^\s*Role:/i.test(block.textContent)) {
        replacement = replacement.querySelector(".property");
      }
      if (replacement) {
        block.outerHTML = `<div class="general">${adoptContent(replacement, coreURL)}</div>`;
      } else {
        // Fallback (issue option 1): at least make the placeholder a link.
        const target = block.querySelector(".general, .role") ?? block;
        target.innerHTML = `<a href="${href}">${target.textContent.trim()}</a>`;
      }
    }
  }
}
