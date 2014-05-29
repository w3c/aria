function linkCrossReferences() {

  var baseURL = respecConfig.ariaSpecURLs[respecConfig.specStatus];

  $ ('a.role-reference, a.property-reference, a.state-reference, a.specref').each (
    function (idx, el) {
      var href = $ (el).attr ('href');
      $ (el).attr ('href', baseURL + href);
    }
  ); 
}

