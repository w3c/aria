<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>WAI-ARIA Schemata</title>
<link rel="stylesheet" href="/WAI/wai-main.css" type="text/css" /></head>

<body>
<div id="controls">
	<ul>
		<li><a href="#main" shape="rect"><img src="/Icons/downinpage.png" alt="" /> Skip to content </a></li>

		<li><a href="/WAI/changedesign.html" shape="rect">| Change 
			text size or colors </a> </li>
	</ul>
</div>
<div id="masthead">
	<p id="logos"><a href="http://www.w3.org/" title="W3C Home" shape="rect"><img alt="W3C logo" height="48" src="/Icons/w3c_home" width="72" /></a><a href="http://www.w3.org/WAI/" title="WAI Home" shape="rect"><img alt="Web Accessibility Initiative (WAI)         logo" height="48" src="/WAI/images/wai-temp" /></a></p>
</div>
<div id="tagline">
	<p>WAI: Strategies, guidelines, resources to make the
		Web accessible to people with disabilities</p>
</div>

<div>
<p id="breadcrumbs"><strong>Site Navigation: <a href="http://www.w3.org/">W3C</a> &gt; <a href="http://www.w3.org/WAI/">WAI</a> &gt; <a href="/WAI/ARIA/">ARIA</a></strong></p>
<h1>WAI-ARIA Schemata</h1>
<p>WAI-ARIA roles, states, and properties are available in a number of machine-readable formats to support validation of content using WAI-ARIA attributes. WAI-ARIA is not finalized, however, so these files are subject to change without notice.</p>
<p>It is not appropriate to use these document types for live content. These are made available only for download, to support local use in development, evaluation, and validation tools. Using these versions directly from the W3C server could cause automatic blockage, preventing them from loading.</p>
<p>If it is necessary to use schemata in content, follow <a href="http://www.w3.org/blog/systeam/2008/02/08/w3c_s_excessive_dtd_traffic">guidelines to avoid excessive DTD traffic</a>. For instance, use caching proxies to avoid fetching the schema each time it is used, or ensure software uses a local cache, such as with <a href="http://nwalsh.com/docs/articles/xml2003/">XML catalogs</a>.</p>
<dl>
	<dt><a href="http://www.w3.org/WAI/ARIA/Schemata/aria-1.rdf">Roles Implementation</a></dt>
	<dd>
	<p>The taxonomy for WAI-ARIA expressed in RDF.</p>
	</dd>
	
	<dt><a href="http://www.w3.org/MarkUp/DTD/aria-attributes-1.mod"><abbr title="Accessible Rich Internet Applications">WAI-ARIA</abbr> Attributes Module</a></dt>
	<dd>
	<p>This module declares the <abbr title="Accessible Rich Internet Applications">WAI-ARIA</abbr> attributes as a module that can be included in a modularlized <abbr title="Document Type Definition">DTD</abbr>.  Note the WAI-ARIA  attributes are in no namespace, and the attribute name begins with  &quot;aria-&quot; to reduce the likelihood of collision with existing attributes.</p>
	</dd>
	<dt><a href="http://www.w3.org/WAI/ARIA/Schemata/xhtml-aria-1.dtd"><abbr title="Extensible Hypertext Markup Language">XHTML</abbr> plus <abbr title="Accessible Rich Internet Applications">WAI-ARIA</abbr> <abbr title="Document Type Definition">DTD</abbr></a></dt>
	<dd>
	<p>This <abbr title="Document Type Definition">DTD</abbr> extends <abbr title="Extensible Hypertext Markup Language">XHTML</abbr> 1.1 and adds the <abbr title="Accessible Rich Internet Applications">WAI-ARIA</abbr> state and property attributes to all its elements. In order to provide broader keyboard support, it also adds the tabindex attribute to a wider set of elements. </p>
	<p>This is not a formal document type and may be obsoleted by future formal XHTML DTDs that support WAI-ARIA.</p>
      <p>Documents written using this XHTML Family markup language can be validated
        using the above DTD. If a document author wants to faciliate such validation,
      they can include the following declaration at the top of their document: </p>
      <pre>&lt;!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML+ARIA 1.0//EN&quot; 
    &quot;http://www.w3.org/WAI/ARIA/schemata/xhtml-aria-1.dtd&quot;&gt;</pre>
      <p> However, note that when this DOCTYPE is present in a document, most
        user agents treat the document as generic XML rather than HTML. This
        causes them to be unable to support named character entities defined
        by the DTD (e.g., &amp;copy;). Therefore, authors need to avoid use of
        named entities outside of the <cite><a href="http://www.w3.org/TR/xml/#sec-predefined-ent">predefined
        entities in XML</a></cite> ([<cite><a href="#ref_XML">XML</a></cite>],
        Section 4.6). </p>
      <p> To avoid the above problem, authors can omit the above DOCTYPE statement.
        This causes user agents to treat the document as generic HTML with named
        character entity support as well as built-in ARIA support. However, it
        causes user agents to enter &quot;quirks&quot; mode which affects CSS
        rendering, and causes conformance checkers to fail the document due to
        the added ARIA attributes. </p>
      <p>To avoid the issues of named character entity support and quirks mode,
        authors can instead use the following generic DOCTYPE declaration for
        HTML: </p>
      <pre>&lt;!DOCTYPE html&gt;</pre>
      <p>However, this still does not guarantee that documents will be validated
        by conformance checkers.</p>
	</dd>
	<dt><a href="http://www.w3.org/MarkUp/SCHEMA/aria-attributes-1.xsd"><abbr title="Accessible Rich Internet Applications">WAI-ARIA</abbr> Attributes <abbr title="Extensible Markup Language">XML</abbr> Schema Module</a></dt>
	<dd>
	<p>This module declares the <abbr title="Accessible Rich Internet Applications">WAI-ARIA</abbr> attributes as an <abbr title="Extensible Markup Language">XML</abbr> Schema module that can be included in a modularlized schema. Note the  WAI-ARIA attributes are in no namespace, and the attribute name begins  with &quot;aria-&quot; to reduce the likelihood of collision with existing  attributes.</p>
	</dd>
	<dt><a href="html4-aria-1.dtd">HTML 4 plus WAI-ARIA DTD</a></dt>
	<dd>
		<p>This standalone DTD adds WAI-ARIA state and property attributes to all elements in HTML 4.01, as well as a role attribute. In order to provide broader keyboard support, it also adds the tabindex attribute to a wider set of elements. </p>
		<p>The DTD is based on the HTML 4.01 Transitional DTD, and includes all entity references needed to make it a standalone file. <em>This is not an official W3C DTD</em> and
	    should be considered a derivative work of HTML 4.01.</p>
        <p>Documents written using
		  this markup language can be validated using the above DTD. If
		  a document author wants to faciliate such validation, they can include
        the following declaration at the top of their document: </p>
		<pre>&lt;!DOCTYPE html PUBLIC &quot;-//W3C//DTD HTML+ARIA 1.0//EN&quot; 
    &quot;http://www.w3.org/WAI/ARIA/schemata/html4-aria-1.dtd&quot;&gt;</pre>
        <p> However, note that when this DOCTYPE is present in a document, most
          user agents treat the document as generic XML rather than HTML. This
          causes them to be unable to support named character entities defined
          by the DTD (e.g., &amp;copy;). Therefore, authors need to avoid use
          of named entities outside of the <cite><a href="http://www.w3.org/TR/xml/#sec-predefined-ent">predefined
          entities in XML</a></cite> ([<cite><a href="#ref_XML">XML</a></cite>],
          Section 4.6). </p>
        <p> To avoid the above problem, authors can omit the above DOCTYPE statement.
          This causes user agents to treat the document as generic HTML with
          named character entity support as well as built-in ARIA support. However,
          it causes user agents to enter &quot;quirks&quot; mode which affects
          CSS rendering, and causes conformance checkers to fail the document
          due to the added ARIA attributes. </p>
        <p>To avoid the issues of named character entity support and quirks mode,
          authors can instead use the following generic DOCTYPE declaration for
          HTML: </p>
        <pre>&lt;!DOCTYPE html&gt;</pre>
        <p>However, this still does not guarantee that documents will be validated
          by conformance checkers.</p>
        <p>The <a href="http://www.w3.org/html/wg/">HTML Working Group</a> is incorporating WAI-ARIA into <a href="http://www.w3.org/TR/html5/">HTML 5</a>. Official support for WAI-ARIA in HTML will be provided in that specification. This DTD is made available <em>only</em> as a bridging solution for applications requiring DTD validation but not using HTML 5.</p>
	</dd>
</dl>
</div>
<div id="footer">
	<h2>Document Information</h2>
	<p><strong>Content last updated:</strong> 16 September 2010</p>

	<p>[<a href="/WAI/contacts" shape="rect">Contacting WAI</a>]</p>
	<div class="copyright">
		<p><a rel="Copyright" href="/Consortium/Legal/ipr-notice#Copyright" shape="rect">Copyright</a> © 2009 <a href="/" shape="rect"><acronym title="World Wide Web Consortium">W3C</acronym></a><sup>®</sup> (<a href="http://www.csail.mit.edu/" shape="rect"><acronym title="Massachusetts Institute of Technology">MIT</acronym></a>, <a href="http://www.ercim.org/" shape="rect"><acronym title="European Research Consortium for Informatics and Mathematics">ERCIM</acronym></a>, <a href="http://www.keio.ac.jp/" shape="rect">Keio</a>), All Rights Reserved. W3C <a href="/Consortium/Legal/ipr-notice#Legal_Disclaimer" shape="rect">liability</a>, <a href="/Consortium/Legal/ipr-notice#W3C_Trademarks" shape="rect">trademark</a>, <a rel="Copyright" href="/Consortium/Legal/copyright-documents" shape="rect">document use</a> and <a rel="Copyright" href="/Consortium/Legal/copyright-software" shape="rect">software
			licensing</a> rules apply. Your interactions with this site are in
			accordance with our <a href="/Consortium/Legal/privacy-statement#Public" shape="rect">public</a> and <a href="/Consortium/Legal/privacy-statement#Members" shape="rect">Member</a> privacy
			statements.</p>

	</div>
</div>
</body>
</html>
