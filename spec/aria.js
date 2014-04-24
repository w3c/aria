var preProc = {
  apply:  function(c) {
            var propList = new Object;
            var globalSP = [];

            var skipIndex = 0;
            var myURL = document.URL;
            if (myURL.match(/\?fast/)) {
                skipIndex = 1;
            }


            // process the document before anything else is done
            // first get the properties
            $.each(document.querySelectorAll('pdef'), function(i, item) {
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'span' ) ;
                var tit = item.getAttribute('title') ;
                if (!tit) {
                    tit = con;
                }
                sp.className = 'property-name' ;
                sp.title=tit ;
                sp.innerHTML = "<code>"+con + "</code> <span class='type-indicator'>(property)</span>" ;
                sp.setAttribute('aria-describedby', "desc-"+tit);
                var dRef = item.nextElementSibling;
                var desc = dRef.firstElementChild.innerHTML;
                dRef.id = "desc-" +tit;
                dRef.setAttribute('role', 'definition');
                var h = document.createElement( 'h3' ) ;
                h.appendChild(sp) ;
                p.replaceChild(h, item) ;
                // add this item to the index
                propList[tit] = { is: "property", title: tit, name: con, desc: desc, roles: new Array };
                var abs = p.querySelector('.property-applicability');
                if (abs.innerText == "All elements of the base markup") {
                    globalSP.push({ is: "property", title: tit, name: con, desc: desc });
                }

            });
            
            // and states
            $.each(document.querySelectorAll('sdef') , function(i, item) {
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'span' ) ;
                var tit = item.getAttribute('title') ;
                if (!tit) {
                    tit = con;
                }
                sp.className = 'state-name' ;
                sp.title=tit ;
                sp.innerHTML = "<code>"+con + "</code> <span class='type-indicator'>(state)</span>" ;
                // sp.id=tit ;
                sp.setAttribute('aria-describedby', "desc-"+tit);
                var dRef = item.nextElementSibling;
                var desc = dRef.firstElementChild.innerHTML;
                dRef.id = "desc-"+tit;
                dRef.setAttribute('role', 'definition');
                var h = document.createElement( 'h3' ) ;
                h.appendChild(sp) ;
                p.replaceChild(h, item) ;
                // add this item to the index
                propList[tit] = { is: "state", title: tit, name: con, desc: desc, roles: new Array };
                var abs = p.querySelector('.state-applicability');
                if (abs.innerText == "All elements of the base markup") {
                    globalSP.push({ is: "state", title: tit, name: con, desc: desc });
                }
            });


            if (!skipIndex) {
                // we have all the properties and states - spit out the
                // index
                var propIndex = "";
                var sortedList = new Array();
                $.each(propList, function(i) {
                    sortedList.push(i);
                });
                sortedList = sortedList.sort();

                for (var i = 0; i < sortedList.length; i++) {
                    var item = propList[sortedList[i]];
                    propIndex += "<dt><a href='#"+item.title+"' class='"+item.is+"-reference'>"
                        + item.name + "</a></dt>\n"
                        + "<dd>" + item.desc + "</dd>\n";
                }
                var n = document.getElementById('index_state_prop');
                var p = n.parentNode;
                var l = document.createElement( 'dl' );
                l.id = "index_state_prop";
                l.className = "compact";
                l.innerHTML = propIndex;
                p.replaceChild(l, n);

                var globalSPIndex = "";
                sortedList = globalSP.sort(function(a,b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0 });
                for (var i = 0; i < sortedList.length; i++) {
                    var item = sortedList[i];
                    globalSPIndex += "<li>" ;
                    if (item.is == "state") {
                        globalSPIndex += "<sref title='" + item.name + "'>"+item.name+" (state)</sref>";
                    } else {
                        globalSPIndex += "<pref>"+item.name+"</pref>";
                    }
                    globalSPIndex += "</li>\n";
                }
                p = document.querySelector("#global_states");
                if (p) {
                    n = p.querySelector(".placeholder");
                    if (n) {
                        var l = document.createElement( 'ul' );
                        l.innerHTML = globalSPIndex;
                        p.replaceChild(l, n);
                    }
                }
                // there is only one role that uses the global properties
                p = document.querySelector("#roletype td.role-properties span.placeholder");
                if (p) {
                    n = p.parentNode;
                    if (p.innerText == "Placeholder for global states and properties") {
                        var l = document.createElement( 'ul' );
                        l.innerHTML = globalSPIndex;
                        n.replaceChild(l, p);
                    }
                }
            }

            // what about roles?
            //
            // we need to do a few things here:
            //   1. expand the rdef elements.
            //   2. accumulate the roles into a table for the indices
            //   3. grab the parent role reference so we can build up the tree
            //   4. grab any local states and properties so we can hand those down to the children
            //

            var roleInfo = new Object ;
            var subRoles = new Array ;
            var roleIndex = "";

            $.each(document.querySelectorAll('rdef'), function(i,item) {
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'h3' ) ;
                var tit = item.getAttribute('title') ;
                if (!tit) {
                    tit = con;
                }
                sp.className = 'role-name' ;
                sp.title=tit ;
                // is this a role or an abstract role
                var type = "role" ;
                var abs = p.querySelectorAll('.role-abstract');
                if (abs[0].innerText == "True") {
                    type = "abstract role";
                }
                sp.innerHTML = "<code>" + con + "</code> <span class='type-indicator'>(" + type + ")</span>" ;
                // sp.id=tit ;
                sp.setAttribute('aria-describedby', "desc-"+tit);
                var dRef = item.nextElementSibling;
                var desc = dRef.firstElementChild.innerHTML;
                dRef.id = "desc-"+tit;
                dRef.setAttribute('role', 'definition');
                p.replaceChild(sp, item) ;
                roleIndex += "<dt><a href='#" 
                    + tit 
                    + "' class='role-reference'>" 
                    + con
                    + "</a></dt>\n"
                    + "<dd>"+desc+"</dd>\n";
                // grab info about this role
                // do we have a parent class?  if so, put us in that parents list
                var n = p.querySelectorAll(".role-parent rref");
                // s will hold the name of the parent role if any
                var s = null ;
                var parentRoles = new Array();
                if (n) {
                    $.each(n, function(foo, roleref) {
                        s = roleref.innerText;

                        if (!subRoles[s]) {
                            subRoles.push(s);
                            subRoles[s] = [] ;
                        }
                        subRoles[s].push(tit);
                        parentRoles.push(s);
                    });
                }
                // are there supported states / properties in this role?  
                var SPs = new Array;
                n = p.querySelector(".role-properties") ;
                if (n.innerText.length != 1) {
                    // looks like we do
                    $.each(n.querySelectorAll("pref,sref"), function(i, item) {
                        var name = item.getAttribute("title");
                        if (!name) {
                            name = item.innerText;
                        }
                        if (item.nodeName == "SREF") {
                            SPs.push( { is: "state", name: name } );
                        } else {
                            SPs.push( { is: "property", name: name } );
                        }
                        // remember that the state or property is
                        // referenced by this role
                        propList[name].roles.push(tit) ;
                    });
                }
                roleInfo[tit] = { "name": tit, "parentRoles": parentRoles, "localprops":SPs };
            });

            var getStates = function(role) {
                var ref = roleInfo[role];
                if (!ref) {
                    msg.pub("error", "No role definition for " + role) ;
                } else if (ref.allprops) {
                    return ref.allprops;
                } else {
                    var myList = new Array;
                    $.merge(myList, ref.localprops);
                    $.each(ref.parentRoles, function(i, item) {
                        var pList = getStates(item);
                        $.merge(myList, pList);
                    });
                    ref.allprops = myList;
                    return myList;
                }
            };
                
            if (!skipIndex) {
                // build up the complete inherited SP lists for each role
                $.each(roleInfo, function(i, item) {
                    var output = "";
                    var placeholder = document.querySelector("#" + item.name + " .role-inherited");
                    if (placeholder) {
                        var myList = new Array() ;
                        $.each(item.parentRoles, function(j, role) {
                            $.merge(myList, getStates(role));
                        });
                        var sortedList = new Array ;
                        sortedList = myList.sort(function(a,b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0 });
                        var prev;
                        for (var j = 0; j < sortedList.length; j++) {
                            var role = sortedList[j];
                            if (prev != role.name) {
                                output += "<li>" ;
                                if (role.is == "state") {
                                    output += "<sref title='" + role.name + "'>"+role.name+" (state)</sref>";
                                } else {
                                    output += "<pref>"+role.name+"</pref>";
                                }
                                output += "</li>\n";
                                prev = role.name;
                            }
                        }
                        if (output != "") {
                            output = "<ul>\n" + output + "</ul>\n";
                            placeholder.innerHTML = output;
                        }
                    };
                });
                
                // Update state and property role references
                var getAllSubRoles = function(role) {
                    var ref = subRoles[role];
                    if (ref && ref.length) {
                        var myList = $.merge([], ref);
                        $.each(ref, function(j, item) {
                            var childList = getAllSubRoles(item);
                            $.merge(myList, childList);
                        });
                        return myList;
                    } else {
                        return [];
                    }
                };
                    
                $.each(propList, function(i, item) {
                    var output = "";
                    var section = document.querySelector("#"+item.name) ;
                    var placeholder = section.querySelector(".state-applicability, .property-applicability");
                    if (placeholder && placeholder.innerText == "Placeholder" && item.roles.length) {
                        // update the used in roles list
                        var sortedList = new Array ;
                        sortedList = item.roles.sort();
                        for (var j = 0; j < sortedList.length; j++) {
                            output += "<li><rref>"+sortedList[j]+"</rref></li>\n" ;
                        }
                        if (output != "") {
                            output = "<ul>\n" + output + "</ul>\n";
                        }
                        placeholder.innerHTML = output;
                        // also update any inherited roles
                        var myList = new Array();
                        $.each(item.roles, function(j, role) {
                            var children = getAllSubRoles(role);
                            $.merge(myList, children);
                        });
                        placeholder = section.querySelector(".state-descendants, .property-descendants");
                        if (placeholder && myList.length) {
                            sortedList = myList.sort();
                            for (var j = 0; j < sortedList.length; j++) {
                                var item = sortedList[j];
                                output += "<li><rref>"+item+"</rref></li>\n" ;
                            }
                            if (output != "") {
                                output = "<ul>\n" + output + "</ul>\n";
                            }
                            placeholder.innerHTML = output;
                        }
                    };
                });
                
                // spit out the index
                var n = document.getElementById('index_role');
                var p = n.parentNode;
                var l = document.createElement( 'dl' );
                l.id = "index_role";
                l.className = "compact";
                l.innerHTML = roleIndex;
                p.replaceChild(l, n);

                // assuming we found some parent roles, update those parents with their children
                for (var i=0; i < subRoles.length; i++) {
                    var item = subRoles[subRoles[i]];
                    var sortedList = item.sort(function(a,b) { return a < b ? -1 : a > b ? 1 : 0 });
                    var output = "<ul>\n";
                    for (var j=0; j < sortedList.length; j++) {
                        output += "<li><rref>" + sortedList[j] + "</rref></li>\n";
                    }
                    output += "</ul>\n";
                    // put it somewhere
                    var d = document.querySelector("div#"+subRoles[i]);
                    if (d) {
                        var l = d.querySelector(".role-children") ;
                        if (l) {
                            l.innerHTML = output;
                        }
                    }
                }

                // if there are any placeholders left, deal with it
                $.each(document.querySelectorAll(".role-children"), function(i, ref) {
                    if (ref.innerHTML == "Placeholder") {
                        ref.parentNode.remove();
                    }
                }) ;
            }

            updateReferences(document) ;

            // prune out unused rows throughout the document
            
            $.each(document.querySelectorAll('.role-abstract,.role-parent,.role-base,.role-related,.role-scope,.role-mustcontain,.role-required-properties,.role-properties,.role-namefrom,.role-namerequired,.role-namerequired-inherited,.role-childpresentational,.role-presentational-inherited,.state-related,.property-related'), function(i, item) {
                var content = item.innerText || item.textContent ;
                if (content.length == 1) {
                    // there is no item - remove the row
                    item.parentNode.remove();
                }
            });
            $.each(document.querySelectorAll('.role-inherited'), function(i, item) {
                var content = item.innerText || item.textContent ;
                if (content === "Placeholder") {
                    // there is no item - remove the row
                    item.parentNode.remove();
                }
            });
            // add a fancy CSS handler to the highlighting engine
            PR.registerLangHandler(PR.createSimpleLexer([["pln",/^[\t\n\f\r ]+/,null," \t\r\n\u000c"]],[["str",/^"(?:[^\n\f\r"\\]|\\(?:\r\n?|\n|\f)|\\[\S\s])*"/,null],["str",/^'(?:[^\n\f\r'\\]|\\(?:\r\n?|\n|\f)|\\[\S\s])*'/,null],["lang-css-str",/^url\(([^"')]+)\)/i],["kwd",/^(?:url|rgb|!important|@import|@page|@media|@charset|inherit)(?=[^\w-]|$)/i,null],["lang-css-kw",/^(-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*)\s*:/i],["com",/^\/\*[^*]*\*+(?:[^*/][^*]*\*+)*\//],
            ["com",/^(?:<\!--|--\>)/],["lit",/^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],["lit",/^#[\da-f]{3,6}\b/i],["pln",/^-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*/i],["pun",/^[^\s\w"']+/]]),["css"]);PR.registerLangHandler(PR.createSimpleLexer([],[["kwd",/^-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*/i]]),["css-kw"]);PR.registerLangHandler(PR.createSimpleLexer([],[["str",/^[^"')]+/]]),["css-str"]);
        }
} ;

function updateReferences(base) {
    // update references to properties

    $.each(base.querySelectorAll('pref, sref, rref'), function(i, item) {
        var p = item.parentNode ;
        var con = item.innerHTML ;
        var sp = document.createElement( 'a' ) ;
        sp.className = (item.localName == 'pref' ? 'property-reference' : (item.localName == 'sref' ? 'state-reference' : 'role-reference')) ;
        sp.href='#'+con ;
        sp.setAttribute('title', con);
        sp.innerHTML = con ;
        p.replaceChild(sp, item) ;
    });


    // now attributes
    $.each(base.querySelectorAll('aref'), function(i, item) {
        var p = item.parentNode ;
        var con = item.innerHTML ;
        var sp = document.createElement( 'a' ) ;
        sp.className = 'aref' ;
        sp.href='#'+con ;
        sp.setAttribute('title', con);
        sp.innerHTML = '@'+con ;
        p.replaceChild(sp, item) ;
    });

    // local datatype references
    $.each(base.querySelectorAll('ldtref'), function(i, item) {
        var p = item.parentNode ;
        var con = item.innerHTML ;
        var ref = item.getAttribute('title') ;
        if (!ref) {
            ref = item.textContent ;
        }
        if (ref) {
            ref = ref.replace(/\n/g, '_') ;
            ref = ref.replace(/\s+/g, '_') ;
        }
        var sp = document.createElement( 'a' ) ;
        sp.className = 'datatype';
        sp.title = ref ;
        sp.innerHTML = con ;
        p.replaceChild(sp, item) ;
    });
    // external datatype references
    $.each(base.querySelectorAll('dtref') , function(i, item) {
        var p = item.parentNode ;
        var con = item.innerHTML ;
        var ref = item.getAttribute('title') ;
        if (!ref) {
            ref = item.textContent ;
        }
        if (ref) {
            ref = ref.replace(/\n/g, '_') ;
            ref = ref.replace(/\s+/g, '_') ;
        }
        var sp = document.createElement( 'a' ) ;
        sp.className = 'externalDFN';
        sp.title = ref ;
        sp.innerHTML = con ;
        p.replaceChild(sp, item) ;
    });
}

// included files are brought in after proProc.  Create a DOM tree
// of content then call the updateReferences method above on it.  Return
// the transformed content
function fixIncludes(utils, content) {
    var base = document.createElement('div');
    base.innerHTML = content ;
    updateReferences(base) ;
    return (base.innerHTML) ;
}
