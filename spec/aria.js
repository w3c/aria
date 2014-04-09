var preProc = {
  apply:  function(c) {
            var propList = [];
            var globalSP = [];


            // process the document before anything else is done
            // first get the properties
            $.each(document.querySelectorAll('pdef'), function(i, item) {
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'dfn' ) ;
                var tit = item.getAttribute('title') ;
                if (!tit) {
                    tit = con;
                }
                sp.className = 'property-name' ;
                sp.title=tit ;
                sp.innerHTML = con ;
                // sp.id=tit ;
                sp.setAttribute('role', 'definition');
                sp.setAttribute('aria-describedby', tit+"_desc");
                var dRef = item.nextElementSibling;
                var desc = dRef.firstElementChild.innerHTML;
                dRef.id = tit+"_desc";
                var h = document.createElement( 'h3' ) ;
                h.appendChild(sp) ;
                p.replaceChild(h, item) ;
                // add this item to the index
                propList.push({ is: "property", title: tit, name: con, desc: desc });
                var abs = p.querySelectorAll('.property-applicability');
                if (abs[0] && abs[0].innerText == "All elements of the base markup") {
                    globalSP.push({ is: "property", title: tit, name: con, desc: desc });
                }
            });
            
            // and states
            $.each(document.querySelectorAll('sdef') , function(i, item) {
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'dfn' ) ;
                var tit = item.getAttribute('title') ;
                if (!tit) {
                    tit = con;
                }
                sp.className = 'state-name' ;
                sp.title=tit ;
                sp.innerHTML = con ;
                // sp.id=tit ;
                sp.setAttribute('role', 'definition');
                sp.setAttribute('aria-describedby', tit+"_desc");
                var dRef = item.nextElementSibling;
                var desc = dRef.firstElementChild.innerHTML;
                dRef.id = tit+"_desc";
                var h = document.createElement( 'h3' ) ;
                h.appendChild(sp) ;
                p.replaceChild(h, item) ;
                // add this item to the index
                propList.push( { is: "state", title: tit, name: con, desc: desc });
                var abs = p.querySelectorAll('.state-applicability');
                if (abs[0].innerText == "All elements of the base markup") {
                    globalSP.push({ is: "state", title: tit, name: con, desc: desc });
                }
            });


            // we have all the properties and states - spit out the
            // index
            var propIndex = "";
            var sortedList = propList.sort(function(a,b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0 });
            for (var i = 0; i < sortedList.length; i++) {
                var item = sortedList[i];
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
                sp.className = 'role-definition' ;
                sp.title=tit ;
                // is this a role or an abstract role
                var type = "role" ;
                var abs = p.querySelectorAll('.role-abstract');
                if (abs[0].innerText == "True") {
                    type = "abstract role";
                }
                sp.innerHTML = "<code>" + con + "</code> <span class='type-indicator'>(" + type + ")</span>" ;
                // sp.id=tit ;
                sp.setAttribute('role', 'definition');
                sp.setAttribute('aria-describedby', tit+"_desc");
                var dRef = item.nextElementSibling;
                var desc = dRef.firstElementChild.innerHTML;
                dRef.id = tit+"_desc";
                p.replaceChild(sp, item) ;
                roleIndex += "<dt><a href='#" 
                    + tit 
                    + "' class='role-reference'>" 
                    + con
                    + "</a></dt>\n"
                    + "<dd>"+desc+"</dd>\n";
                // grab info about this role
                // do we have a parent class?  if so, put us in that parents list
                var n = p.querySelector(".role-parent > rref");
                // s will hold the name of the parent role if any
                var s = null ;
                var parentRole = null;
                if (n) {
                    s = n.innerText;

                    if (!subRoles[s]) {
                        subRoles.push(s);
                        subRoles[s] = [] ;
                    }
                    subRoles[s].push(tit);
                }
                if (s) {
                    parentRole = s;
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
                    });
                }
                roleInfo[tit] = { "name": tit, "parentRole": parentRole, "localprops":SPs };
            });

            var getStates = function(role) {
                var ref = roleInfo[role];
                if (ref.allprops) {
                    return ref.allprops;
                } else {
                    var myList = new Array;
                    $.each(ref.localprops, function(j, prop) {
                        myList.push(prop);
                    });
                    var pname = ref.parentRole;
                    if (pname) {
                        var pList = getStates(pname);
                        $.each(pList, function(j, prop) {
                            myList.push(prop);
                        });
                    }
                    ref.allprops = myList;
                    return myList;
                }
            };
                
            // build up the complete inherited SP lists for each role
            $.each(roleInfo, function(i, item) {
                var output = "";
                var placeholder = document.querySelector("#" + item.name + " .role-inherited");
                var p = item.parentRole;
                if (p && placeholder) {
                    var myList = getStates(p);
                    var sortedList = new Array ;
                    sortedList = myList.sort(function(a,b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0 });
                    for (var j = 0; j < sortedList.length; j++) {
                        var item = sortedList[j];
                        output += "<li>" ;
                        if (item.is == "state") {
                            output += "<sref title='" + item.name + "'>"+item.name+" (state)</sref>";
                        } else {
                            output += "<pref>"+item.name+"</pref>";
                        }
                        output += "</li>\n";
                    }
                    if (output != "") {
                        output = "<ul>\n" + output + "</ul>\n";
                    }
                    placeholder.innerHTML = output;
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
            // update references to properties

            $.each(document.querySelectorAll('pref'), function(i, item) {
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'a' ) ;
                sp.className = 'property-reference' ;
                sp.href='#'+con ;
                sp.setAttribute('title', con);
                sp.innerHTML = con ;
                p.replaceChild(sp, item) ;
            });

            // update references to states

            $.each(document.querySelectorAll('sref'), function(i, item) {
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var ref = con ;
                if (item.title) {
                    ref = item.title;
                }
                var sp = document.createElement( 'a' ) ;
                sp.className = 'state-reference' ;
                sp.href='#'+ref ;
                sp.setAttribute('title', con);
                sp.innerHTML = con ;
                p.replaceChild(sp, item) ;
            });


            // update references to roles

            $.each(document.querySelectorAll('rref'), function(i,item) {
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'a' ) ;
                sp.className = 'role-reference' ;
                sp.innerHTML = con ;
                sp.href="#"+con;
                p.replaceChild(sp, item) ;
            });

            // now attributes
            $.each(document.querySelectorAll('aref'), function(i, item) {
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'a' ) ;
                sp.className = 'aref' ;
                sp.href='#A-'+con ;
                sp.setAttribute('title', con);
                sp.innerHTML = '@'+con ;
                p.replaceChild(sp, item) ;
            });

            // local datatype references
            $.each(document.querySelectorAll('ldtref'), function(i, item) {
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
            $.each(document.querySelectorAll('dtref') , function(i, item) {
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
