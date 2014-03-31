var preProc = {
  apply:  function(c) {
            PR.registerLangHandler(PR.createSimpleLexer([["pln",/^[\t\n\f\r ]+/,null," \t\r\n\u000c"]],[["str",/^"(?:[^\n\f\r"\\]|\\(?:\r\n?|\n|\f)|\\[\S\s])*"/,null],["str",/^'(?:[^\n\f\r'\\]|\\(?:\r\n?|\n|\f)|\\[\S\s])*'/,null],["lang-css-str",/^url\(([^"')]+)\)/i],["kwd",/^(?:url|rgb|!important|@import|@page|@media|@charset|inherit)(?=[^\w-]|$)/i,null],["lang-css-kw",/^(-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*)\s*:/i],["com",/^\/\*[^*]*\*+(?:[^*/][^*]*\*+)*\//],
            ["com",/^(?:<\!--|--\>)/],["lit",/^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],["lit",/^#[\da-f]{3,6}\b/i],["pln",/^-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*/i],["pun",/^[^\s\w"']+/]]),["css"]);PR.registerLangHandler(PR.createSimpleLexer([],[["kwd",/^-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*/i]]),["css-kw"]);PR.registerLangHandler(PR.createSimpleLexer([],[["str",/^[^"')]+/]]),["css-str"]);
            var propList = [];
            var roleIndex = "";
            // process the document before anything else is done
            // first get the properties
            var refs = document.querySelectorAll('pdef') ;
            for (var i = 0; i < refs.length; i++) {
                var item = refs[i];
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
                sp.id=tit ;
                sp.setAttribute('role', 'definition');
                sp.setAttribute('aria-describedby', tit+"_desc");
                var dRef = item.nextElementSibling;
                var desc = dRef.firstElementChild.innerHTML;
                dRef.id = tit+"_desc";
                var h = document.createElement( 'h4' ) ;
                h.appendChild(sp) ;
                p.replaceChild(h, item) ;
                // add this item to the index
                propList.push({ is: "property", title: tit, name: con, desc: desc });
            }
            
            // and states
            refs = document.querySelectorAll('sdef') ;
            for (var i = 0; i < refs.length; i++) {
                var item = refs[i];
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
                sp.id=tit ;
                sp.setAttribute('role', 'definition');
                sp.setAttribute('aria-describedby', tit+"_desc");
                var dRef = item.nextElementSibling;
                var desc = dRef.firstElementChild.innerHTML;
                dRef.id = tit+"_desc";
                var h = document.createElement( 'h4' ) ;
                h.appendChild(sp) ;
                p.replaceChild(h, item) ;
                // add this item to the index
                propList.push( { is: "state", title: tit, name: con, desc: desc });
            }


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

            // update references to properties

            refs = document.querySelectorAll('pref') ;
            for (var i = 0; i < refs.length; i++) {
                var item = refs[i];
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'a' ) ;
                sp.className = 'property-reference' ;
                sp.href='#'+con ;
                sp.setAttribute('title', con);
                sp.innerHTML = con ;
                p.replaceChild(sp, item) ;
            }

            // update references to states

            refs = document.querySelectorAll('sref') ;
            for (var i = 0; i < refs.length; i++) {
                var item = refs[i];
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'a' ) ;
                sp.className = 'state-reference' ;
                sp.href='#'+con ;
                sp.setAttribute('title', con);
                sp.innerHTML = con ;
                p.replaceChild(sp, item) ;
            }

            // what about roles?
            refs = document.querySelectorAll('rdef') ;
            for (var i = 0; i < refs.length; i++) {
                var item = refs[i];
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'h4' ) ;
                var tit = item.getAttribute('title') ;
                if (!tit) {
                    tit = con;
                }
                sp.className = 'role-definition' ;
                sp.title=tit ;
                sp.innerHTML = "<code>" + con + "</code> <span class='type-indicator'>(role)</span>" ;
                sp.id=tit ;
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
            }

            // we have all the roles - spit out the
            // index
            var n = document.getElementById('index_role');
            var p = n.parentNode;
            var l = document.createElement( 'dl' );
            l.id = "index_role";
            l.className = "compact";
            l.innerHTML = roleIndex;
            p.replaceChild(l, n);

            // update references to roles

            refs = document.querySelectorAll('rref') ;
            for (var i = 0; i < refs.length; i++) {
                var item = refs[i];
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'a' ) ;
                sp.className = 'role-reference' ;
                sp.innerHTML = con ;
                sp.href="#"+con;
                p.replaceChild(sp, item) ;
            }

            // now attributes
            refs = document.querySelectorAll('aref') ;
            for (var i = 0; i < refs.length; i++) {
                var item = refs[i];
                var p = item.parentNode ;
                var con = item.innerHTML ;
                var sp = document.createElement( 'a' ) ;
                sp.className = 'aref' ;
                sp.href='#A-'+con ;
                sp.setAttribute('title', con);
                sp.innerHTML = '@'+con ;
                p.replaceChild(sp, item) ;
            }

            // local datatype references
            refs = document.querySelectorAll('ldtref') ;
            for (var i = 0; i < refs.length; i++) {
                var item = refs[i];
                if (!item) continue ;
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
            }
            // external datatype references
            refs = document.querySelectorAll('dtref') ;
            for (var i = 0; i < refs.length; i++) {
                var item = refs[i];
                if (!item) continue ;
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
            }
        }
} ;
