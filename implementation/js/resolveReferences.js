function linkCrossReferences() {

  var baseURL = respecConfig.ariaSpecURLs[respecConfig.specStatus];

  $ ('a.role-reference, a.property-reference, a.state-reference, a.specref').each (
    function (idx, el) {
      var href = $ (el).attr ('href');
      $ (el).attr ('href', baseURL + href);
    }
  ); 
}

function updateReferences(base) {
    // update references to properties

    var baseURL = respecConfig.ariaSpecURLs[respecConfig.specStatus];

    $.each(base.querySelectorAll("pref, sref, rref"), function(i, item) {
        var parentNode = item.parentNode;
        var content = item.textContent || item.innerText;
        var sp = document.createElement("a");
        sp.className = (item.localName === "pref" ? "property-reference" : (item.localName === "sref" ? "state-reference" : "role-reference"));
        var ref = item.getAttribute("title");
        if (!ref) {
            ref = content;
        }
        sp.href = baseURL + "#" + ref;
        sp.setAttribute("title", content);
        sp.innerHTML = content;
        parentNode.replaceChild(sp, item);
    });
}

// included files are brought in after proProc.  Create a DOM tree
// of content then call the updateReferences method above on it.  Return
// the transformed content
function fixIncludes(utils, content) {
    var base = document.createElement("div");
    base.innerHTML = content;
    updateReferences(base);
    return (base.innerHTML);
}

