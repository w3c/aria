const rewriteDefContainer = (def) => {
    // dummy h4
    // TODO: move *def elements into this h4
    def.insertAdjacentHTML('beforebegin', `<h4>${def.innerHTML}</h4>`); // NOTE: this h4 is used in aria.js and prevents respec from complaining about missing headings in section elements

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
var ariaPreprocessing = () => document.querySelectorAll('rdef, sdef, pdef').forEach(rewriteDefContainer);
