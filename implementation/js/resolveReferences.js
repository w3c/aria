function linkCrossReferences() {

  var ariaSpecURL = {
    "ED": "http://rawgithub.com/w3c/aria/master/spec/aria.html",
    "WD" : "http://www.w3.org/TR/wai-aria-1.1/",
    "REC": "http://www.w3.org/TR/wai-aria/"
  }

  var baseURL = ariaSpecURL[respecConfig.specStatus];
  
  $ ('a.role-reference, a.property-reference, a.state-reference').each (
    function (idx, el) {
      var href = $ (el).attr ('href');
      $ (el).attr ('href', baseURL + href);
    }
  ); 
}

