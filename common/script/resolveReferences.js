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

  var htmlMappingURL = (respecConfig.htmlMappingURLs ?
    respecConfig.htmlMappingURLs[respecConfig.specStatus] : null
  );

  var dpubModURL = ( respecConfig.dpubModURLs ?
    respecConfig.dpubModURLs[respecConfig.specStatus] : null
  );

  var graphicsModURL = ( respecConfig.graphicsModURLs ?
    respecConfig.graphicsModURLs[respecConfig.specStatus] : null
  );
  var graphicsMappingModURL = ( respecConfig.graphicsMappingModURLs ?
    respecConfig.graphicsMappingModURLs[respecConfig.specStatus] : null
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
  // Fourth, for links to role, state, and property mappings in the html mapping
  // doc.
  if (!!htmlMappingURL) {
    setHrefs ('a.html-mapping', htmlMappingURL);
  }
  else {
    console.log ("linkCrossReferences():  Note -- htmlMappingURL is not defined.");
  }
  // Links to the DPub WAI-ARIA Module.
  if (!!dpubModURL) {
    setHrefs ('a.dpub-role-reference, a.dpub-property-reference, a.dpub-state-reference, a.dpub', dpubModURL);
  }
  else {
    console.log ("linkCrossReferences():  specBaseURL is not defined.");
  }
// Links to the Graphics WAI-ARIA Module.
  if (!!graphicsModURL) {
    setHrefs ('a.graphics-role-reference, a.graphics-property-reference, a.graphics-state-reference, a.graphics', graphicsModURL);
  }
  else {
    console.log ("linkCrossReferences():  specBaseURL is not defined.");
  }
// Links to the Graphics Mapping WAI-ARIA Module.
  if (!!graphicsMappingModURL) {
    setHrefs ('a.graphics-role-mapping, a.graphics-property-mapping, a.graphics-state-mapping, a.graphics-mapping', graphicsMappingModURL);
  }
  else {
    console.log ("linkCrossReferences():  specBaseURL is not defined.");
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
        var URL = (item.localName === "pref" || item.localName === "sref") ? baseURL+"#" : "#";
        var ref = item.getAttribute("title");
        if (!ref) {
            ref = content;
        }
        if (item.localName == 'rref') {
            if (typeof localRoleInfo !== 'undefined' && localRoleInfo[ref]) {
                ref = localRoleInfo[ref].fragID;
            } else if (baseURL && roleInfo[ref]) {
                ref = roleInfo[ref].fragID;
                URL = baseURL + "#";
            } else {
                // no roleInfo structure.  Make an assumption
                URL = baseURL + "#";
            }
        }
        sp.href = URL + ref;
        sp.setAttribute("title", content);
        sp.innerHTML = content;
        parentNode.replaceChild(sp, item);
    });
}

// We should be able to remove terms that are not actually
// referenced from the common definitions
var termNames = [] ;

function restrictReferences(utils, content) {
    var base = document.createElement("div");
    var termContainer = $(base).makeID("terms") ;
    base.innerHTML = content;
    updateReferences(base);

    // strategy: Traverse the content finding all of the terms defined
    $.each(base.querySelectorAll("dfn"), function(i, item) {
        var $t = $(item) ;
        var titles = $t.getDfnTitles() ;
        var n = $t.makeID("dfn", titles[0]) ;
        if (n) {
            // remember that we have this term
            termNames[n] = 1;
        }
    }) ;

    // add a handler to come in after all the definitions are resolved
    //
    // New logic: If the reference is within a 'dl' element of
    // class 'termlist', and if the target of that reference is
    // also within a 'dl' element of class 'termlist', then
    // consider it an internal reference and ignore it.

    respecEvents.sub('end', function(message) {
        if (message == 'core/link-to-dfn') {
            // all definitions are linked
            // get a list of all the references to something that is
            // in our collection from ourside of our collection
            var refList = [] ;
            $("a.internalDFN").each(function () {
                var $item = $(this) ;
                var t = $item.attr('href').replace(/^#/,"") ;
                if (termNames[t] && !refList[t]
                        && ! $item.closest("div#" + termContainer).length ) {
                    // this reference is to one of our items and is also 
                    // from outside the included terms
                    refList[t] = 1;
                }
            });

            // loop will "restart" if terms are added as a result of following
            // links
            var restart = 1;
            while (restart) {
                restart = 0;
                Object.keys(refList).forEach(function(term) {
                    // $t is the dt element
                    var $t = $("#"+term).closest("dt");
                    // $d is the dd element
                    var $d = $t.next() ;
                    var needRestart = 0;
                    $("a.internalDFN", $d).each(function() {
                        var $item = $(this) ;
                        var t = $item.attr('href').replace(/^#/,"") ;
                        if (termNames[t] && !refList[t]) {
                            refList[t] = 1;
                            needRestart = 1;
                        }
                    });
                    if (needRestart) {
                        restart = 1;
                        needRestart = 0;
                    }
                }) ;
            }

            // okay - refList should now contain every term that is actually
            // referenced.  Take those out of the termNames list
            Object.keys(refList).forEach(function(term) {
                delete termNames[term];
            });

                
            // anything still in the termNames list can be removed
            Object.keys(termNames).forEach(function(term) {
                var $p = $("#"+term) ;
                if ($p) {
                    var tList = $p.getDfnTitles() ;
                    var $t = $p.closest("dt");
                    $t.next().remove() ;
                    $t.remove() ;
                    tList.forEach(function( item ) {
                        if (respecConfig.definitionMap[item]) {
                            delete respecConfig.definitionMap[item];
                        }
                    }) ;
                }
            });
        }
    });
    return (base.innerHTML);
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

