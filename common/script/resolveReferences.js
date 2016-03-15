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
//
// the termlist is in a block of class "termlist", so make sure that
// has an ID and put that ID into the termLists array so we can 
// interrogate all of the included termlists later.
var termNames = [] ;
var termLists = [] ;
var termsReferencedByTerms = [] ;

function restrictReferences(utils, content) {
    var base = document.createElement("div");
    base.innerHTML = content;
    updateReferences(base);

    // New new logic:
    //
    // 1. build a list of all term-internal references
    // 2. When ready to process, for each reference INTO the terms, 
    // remove any terms they reference from the termNames array too.
    $.each(base.querySelectorAll("dfn"), function(i, item) {
        var $t = $(item) ;
        var titles = $t.getDfnTitles();
        var n = $t.makeID("dfn", titles[0]);
        if (n) {
            termNames[n] = $t.parent() ;
        }
    });

    var $container = $(".termlist",base) ;
    var containerID = $container.makeID("", "terms") ;
    termLists.push(containerID) ;

    // add a handler to come in after all the definitions are resolved
    //
    // New logic: If the reference is within a 'dl' element of
    // class 'termlist', and if the target of that reference is
    // also within a 'dl' element of class 'termlist', then
    // consider it an internal reference and ignore it.

    respecEvents.sub('end', function(message) {
        if (message == 'core/link-to-dfn') {
            // all definitions are linked; find any internal references
            $(".termlist a.internalDFN").each(function() {
                var $r = $(this);
                var id = $r.attr('href');
                var idref = id.replace(/^#/,"") ;
                if (termNames[idref]) {
                    // this is a reference to another term
                    // what is the idref of THIS term?
                    var $def = $r.closest('dd') ;
                    if ($def.length) {
                        var $p = $def.prev('dt').find('dfn') ;
                        var tid = $p.attr('id') ;
                        if (tid) {
                            if (termsReferencedByTerms[tid]) {
                                termsReferencedByTerms[tid].push(idref);
                            } else {
                                termsReferencedByTerms[tid] = [] ;
                                termsReferencedByTerms[tid].push(idref);
                            }
                        }
                    }
                }
            }) ;

            // clearRefs is recursive.  Walk down the tree of 
            // references to ensure that all references are resolved.
            var clearRefs = function(theTerm) {
                if ( termsReferencedByTerms[theTerm] ) {
                    $.each(termsReferencedByTerms[theTerm], function(i, item) {
                        if (termNames[item]) {
                            delete termNames[item];
                            clearRefs(item);
                        }
                    });
                };
                // make sure this term doesn't get removed
                if (termNames[theTerm]) {
                    delete termNames[theTerm];
                }
            };
           
            // now termsReferencedByTerms has ALL terms that 
            // reference other terms, and a list of the 
            // terms that they reference
            $("a.internalDFN").each(function () {
                var $item = $(this) ;
                var t = $item.attr('href');
                var r = t.replace(/^#/,"") ;
                // if the item is outside the term list
                if ( ! $item.closest('dl.termlist').length ) {
                    clearRefs(r);
                }
            });

            // delete any terms that were not referenced.
            Object.keys(termNames).forEach(function(term) {
                var $p = $("#"+term) ;
                if ($p) {
                    var tList = $p.getDfnTitles();
                    $p.parent().next().remove();
                    $p.remove() ;
                    tList.forEach(function( item ) {
                        if (respecConfig.definitionMap[item]) {
                            delete respecConfig.definitionMap[item];
                        }
                    });
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

