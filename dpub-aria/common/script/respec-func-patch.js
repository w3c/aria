function getDfnTitles(elem) {
  const titleSet = new Set();
  // data-lt-noDefault avoid using the text content of a definition
  // in the definition list.
  // ltNodefault is === "data-lt-noDefault"... someone screwed up 😖
  const normText = (elem.dataset && ("ltNodefault" in elem.dataset)) ? "" : norm(elem.textContent);
  const child = /** @type {HTMLElement | undefined} */ (elem.children[0]);
  if (elem.dataset.hasOwnProperty('lt')) {
    // prefer @data-lt for the list of title aliases
    elem.dataset.lt
      .split("|")
      .map(item => norm(item))
      .forEach(item => titleSet.add(item));
  } else if (
    elem.childNodes.length === 1 &&
    elem.getElementsByTagName("abbr").length === 1 &&
    child.title
  ) {
    titleSet.add(child.title);
  } else if (elem.textContent === '""') {
    titleSet.add("the-empty-string");
  }

  titleSet.add(normText);
  titleSet.delete("");

  // We could have done this with @data-lt (as the logic is same), but if
  // @data-lt was not present, we would end up using @data-local-lt as element's
  // id (in other words, we prefer textContent over @data-local-lt for dfn id)
  if (elem.dataset.localLt) {
    const localLt = elem.dataset.localLt.split("|");
    localLt.forEach(item => titleSet.add(norm(item)));
  }

  const titles = [...titleSet];
  return titles;
}

function norm(str) {
  if (str) {
    return str.trim().replace(/\s+/g, " ");
  }
}

 function makeID(el, pfx, txt) {
        if (el.hasAttribute("id")) return el.getAttribute("id");
        var id = "";
        if (!txt) {
            if (el.hasAttribute("title")) txt = el.getAttribute("title");
            else                          txt = el.textContent;
        }
        txt = txt.replace(/^\s+/, "");
        txt = txt.replace(/\s+$/, "");
        id += txt;
        id = id.toLowerCase();
        if (id.length === 0) id = "generatedID";
        id = sanitiseID(id);
        if (pfx) id = pfx + "-" + id;
        id = idThatDoesNotExist(id);
        el.setAttribute("id", id);
        return id;
    }

function sanitiseID(id) {
        id = id.split(/[^\-.0-9a-zA-Z_]/).join("-");
        id = id.replace(/^-+/g, "");
        id = id.replace(/-+$/, "");
        if (id.length > 0 && /^[^a-z]/.test(id)) id = "x" + id;
        if (id.length === 0) id = "generatedID";
        return id;
    }
    
function idThatDoesNotExist(id) {
        var inc = 1;
        if (document.getElementById(id)) {
            while (document.getElementById(id + "-" + inc)) inc++;
            id = id + "-" + inc;
        }
        return id;
    }

function fixARIARelativeRefs() {
	// hack to rewrite internal aria section links in imported vocabulary
	var dl = document.querySelectorAll('section#terms dl.termlist dd a');
	dl.forEach(atag => {
		if (atag.hash && (atag.hash == "#definition" || atag.hash == "#statevsprop")) {
			atag.href = 'https://www.w3.org/TR/wai-aria-1.1/' + atag.hash;
		}
	})
}
