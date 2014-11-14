function linkCrossReferences() {

  var specBaseURL = ( respecConfig.ariaSpecURLs ?
    respecConfig.ariaSpecURLs[respecConfig.specStatus] : null
  );

  var coreMappingURL = (respecConfig.coreMappingURLs ?
    respecConfig.coreMappingURLs[respecConfig.specStatus] : null
  );

  var accNameURL = (respecConfig.accNameURLs ?
    respecConfig.accNameURLs[respecConfig.specStatus] : null
  );

  function setHrefs (selString, baseUrl) {
    $ (selString).each (
      function (idx, el) {
        var href = $ (el).attr ('href');
        $ (el).attr ('href', baseUrl + href);
    });
  }

  // First the links to the definitions of roles, states, and properties.
  if (!!specBaseURL) {
    setHrefs ('a.role-reference, a.property-reference, a.state-reference, a.specref', specBaseURL);
  }
  else {
    console.log ("linkCrossReferences():  specBaseURL is not defined.");
  }

  // Second, for links to role, state, and property mappings in the core mapping
  // doc.
  if (!!coreMappingURL) {
    setHrefs ('a.core-mapping', coreMappingURL);
  }
  else {
    console.log ("linkCrossReferences():  Note -- coreMappingURL is not defined.");
  }

  // Third, for links into the accname document.
  if (!!accNameURL) {
    setHrefs ('a.accname', accNameURL);
  }
  else {
    console.log ("linkCrossReferences():  Note -- accNameURL is not defined.");
  }
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

