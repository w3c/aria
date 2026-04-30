import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const htmlPath = resolve(repoRoot, 'core-aam/index.html');

const mappings = JSON.parse(readFileSync('mappings.json', 'utf8'));

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Full <abbr>-wrapped markup for each platform's <th> cell.
const TH = {
  ariaSpec: 'ARIA Specification',
  computedRole: 'Computed Role',
  msaaIA2: 'MSAA + IAccessible2',
  uia: '<abbr title="User Interface Automation">UIA</abbr>',
  atkAtSpi:
    '<abbr title="Accessibility Toolkit">ATK</abbr>' +
    '/<abbr title="Assistive Technology - Service Provider Interface">AT-SPI</abbr>',
  axApi: '<abbr title="macOS Accessibility Protocol">AX API</abbr>',
  android: 'Android',
};

// Build a <td> element from an item-list object.
function buildCell(platform) {
  if (!platform) return '<td></td>';

  // Cells that could not be parsed structurally are stored as raw HTML.
  if (platform.rawHtml !== undefined) {
    return `<td>\n              ${platform.rawHtml}\n            </td>`;
  }

  const parts = platform.items.map(item => {
    if (['not-mapped', 'not-in-tree', 'seealso'].includes(item.type)) {
      return `<span class="${item.type}">${item.description}</span>`;
    }
    if (item.value === undefined) {
      const desc = item.description ? `: ${item.description}` : '';
      return `<span>${item.type}${desc}</span>`;
    }
    const desc = item.description ? ` ${item.description}` : '';
    return `<span>${item.type}: <code>${escapeHtml(item.value)}</code>${desc}</span>`;
  });

  let content = parts.join('<br />\n              ');
  if (platform.note) content += `\n              <p>${platform.note}</p>`;

  if (!content) return '<td></td>';
  return `<td>\n              ${content}\n            </td>`;
}

// Build a complete <h4> + <table> block for one mapping entry.
// id is the key from the JSON (e.g. "role-map-blockquote", "ariaErrorMessage").
function buildEntryHtml(id, entry) {
  const isRole = 'computedRole' in entry;

  const computedRoleRow = isRole
    ? `
            <tr>
              <th>${TH.computedRole}</th>
              <td>
                <p><code>${entry.computedRole}</code></p>
              </td>
            </tr>`
    : '';

  return `
          <h4 id="${id}">${entry.headingHtml}</h4>
          <table class="data" aria-labelledby="${id}">
            <tbody>
              <tr>
                <th>${TH.ariaSpec}</th>
                <td>
                  ${entry.ariaSpec}
                </td>
              </tr>${computedRoleRow}
              <tr>
                <th>${TH.msaaIA2}</th>
                ${buildCell(entry.msaaIA2)}
              </tr>
              <tr>
                <th>${TH.uia}</th>
                ${buildCell(entry.uia)}
              </tr>
              <tr>
                <th>${TH.atkAtSpi}</th>
                ${buildCell(entry.atkAtSpi)}
              </tr>
              <tr>
                <th>${TH.axApi}</th>
                ${buildCell(entry.axApi)}
              </tr>
              <tr>
                <th>${TH.android}</th>
                ${buildCell(entry.android)}
              </tr>
            </tbody>
          </table>`;
}

// Replace everything between startMarker and endMarker in the file content.
// The markers themselves are preserved.
function replaceBetweenMarkers(content, startMarker, endMarker, replacement) {
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx === -1) throw new Error(`Marker not found: ${startMarker}`);
  if (endIdx === -1) throw new Error(`Marker not found: ${endMarker}`);
  if (endIdx <= startIdx) throw new Error(`End marker appears before start marker`);
  return (
    content.slice(0, startIdx + startMarker.length) +
    '\n' +
    replacement +
    '\n          ' +
    content.slice(endIdx)
  );
}

const roleBlocks = Object.entries(mappings.roles).map(([id, entry]) => buildEntryHtml(id, entry)).join('\n');
const attrBlocks = Object.entries(mappings.attributes).map(([id, entry]) => buildEntryHtml(id, entry)).join('\n');

let content = readFileSync(htmlPath, 'utf8');
content = replaceBetweenMarkers(content, '<!-- GENERATION ROLE MAP START -->', '<!-- GENERATION ROLE MAP END -->', roleBlocks);
content = replaceBetweenMarkers(content, '<!-- GENERATION ATTRIBUTE MAP START -->', '<!-- GENERATION ATTRIBUTE MAP END -->', attrBlocks);
writeFileSync(htmlPath, content);

execSync('npx prettier --write core-aam/index.html', { cwd: repoRoot, stdio: 'inherit' });

console.log(
  `Updated ${Object.keys(mappings.roles).length} role tables and ` +
  `${Object.keys(mappings.attributes).length} attribute tables in core-aam/index.html.`
);
