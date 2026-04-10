/**
 * Generates list items in lists that include the global states and properties
 * @param {HTMLElement} globalStatesPlaceholder - placeholder in #global_states
 * @param {HTMLElement} roletypePropsPlaceholder - placeholder in #roletype
 * @param {HTMLElement} def - sdef or pdef element NOTE: from forEach loop
 * @returns 
 */
const buildGlobalStatesAndPropertiesLists = (globalStatesPlaceholder, roletypePropsPlaceholder, def) => {
  const container = def.parentElement;
  const applicabilityText = container.querySelector(".state-applicability, .property-applicability").innerText;
  const isDefault = applicabilityText === "All elements of the base markup";
  const isProhibited = applicabilityText === "All elements of the base markup except for some roles or elements that prohibit its use";
  const isDeprecated = applicabilityText === "Use as a global deprecated in ARIA 1.2";
  // NOTE: the only other value for applicabilityText appears to be "Placeholder"
  if (!(isDefault || isProhibited || isDeprecated)) return;
  const isState = def.tagName === "SDEF";
  const refTagName = isState ? "sref" : "pref";
  const htmlString = `<li><${refTagName} ${isProhibited ? "data-prohibited " : ""}${isDeprecated ? "data-deprecated " : ""}${isState ? `title="${def.innerHTML}"` : ""
    }>${def.innerHTML}${isState ? " (state)" : ""}</${refTagName}>${
    // TODO: consider moving "(state)" out of sref/pref tag; then maybe remove title attr for sref (after checking resolveReferences interference)
    isProhibited ? " (Except where prohibited)" : ""
    }${isDeprecated ? " (Global use deprecated in ARIA 1.2)" : ""}</li>\n`;
  globalStatesPlaceholder.insertAdjacentHTML('beforeend', htmlString);
  roletypePropsPlaceholder.insertAdjacentHTML('beforeend', htmlString);
}

/**
 * Rewrites rdef/sdef/pdef elements to valid HTML markup
 * @param {HTMLElement} def - rdef, sdef, or pdef element NOTE: from forEach loop
 */
const rewriteDefContainer = (def) => {
  // dummy h4
  // TODO: move *def elements into this h4
  def.insertAdjacentHTML("beforebegin", `<h4>${def.innerHTML}</h4>`); // NOTE: this h4 is used in aria.js and prevents respec from complaining about missing headings in section elements

  // change the enclosing DIV to a section with notoc
  // TODO: change the index.html instead
  const container = def.parentNode;
  const sec = document.createElement("section");
  [...container.attributes].forEach(function (attr) {
    sec.setAttribute(attr.name, attr.value);
  });
  sec.classList.add("notoc");
  const theContents = container.innerHTML;
  sec.innerHTML = theContents;
  container.parentNode.replaceChild(sec, container);
};

var ariaPreprocessing = () => {
  // run buildGlobalStatesAndPropertiesLists()
  const globalStatesPlaceholder = document.querySelector('#global_states ul[data-aria-preprocess="placeholder"]');
  const roletypePropsPlaceholder = document.querySelector('#roletype ul[data-aria-preprocess="placeholder"]');
  document.querySelectorAll("pdef, sdef").forEach(buildGlobalStatesAndPropertiesLists.bind(null, globalStatesPlaceholder, roletypePropsPlaceholder));
  globalStatesPlaceholder.removeAttribute('data-aria-preprocess');
  roletypePropsPlaceholder.removeAttribute('data-aria-preprocess');
  // run rewriteDefContainer()
  document.querySelectorAll("rdef, sdef, pdef").forEach(rewriteDefContainer);
}
