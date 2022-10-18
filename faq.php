<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" dir="ltr">
	<head>
<?php include "_head.phi"; ?>
		<title>Accessible Rich Internet Applications (ARIA) Working Group</title>
	</head>
	<body>
<?php include "_header.phi"; ?>
<h1>WAI-ARIA FAQ</h1>
<p>Here are answers to some frequently asked questions (FAQ) about WAI-ARIA, the <strong>Accessible Rich Internet Applications Suite</strong>. When we add significant information to this page, we'll send an e-mail to the <a href="http://www.w3.org/WAI/IG/#about">WAI IG list</a> and an update to the <a href="http://www.w3.org/WAI/highlights/rssfeed.rss">WAI Highlights RSS feed</a> to let you know. ~<em><a href="http://w3.org/People/Shawn/">Shawn Henry</a>, W3C WAI, <a href="#update">updated 20 March 2014</a></em></p>

<ul class="questions">

    	<li><a href="#start">Where can I learn about WAI-ARIA?</a></li>
	    <li><a href="#status">What is the current status of WAI-ARIA development?</a></li>
    <li><a href="#support">Is WAI-ARIA supported in browsers, assistive technologies, and other user agents? </a></li>
	<li><a href="#browsers">What happens in  older browsers when WAI-ARIA is implemented?</a></li>
	<li><a href="#toolkit_support">Are there JavaScript toolkits that provide built-in WAI-ARIA support?</a></li>
	<li><a href="#do_now">As a Web content developer, what should I do with WAI-ARIA now?</a></li>
	<li><a href="#increase_code">Does WAI-ARIA significantly increase the amount of code?</a></li>
	<li><a href="#complex">Do WAI-ARIA methods increase the complexity of the development process?</a></li>
	<li><a href="#justaria">Is the "ARIA" that is mentioned by other organizations the same as WAI-ARIA?</a></li>

	<li><a href="#ask_questions">Where can I ask more questions about WAI-ARIA?</a></li>
</ul>




<a name="start" id="start"></a>
<h2>Where can I  learn about WAI-ARIA?</h2>

<p class="listintro">The best place to start learning about WAI-ARIA and to get updated information about the WAI-ARIA documents is the <strong><a href="http://www.w3.org/WAI/intro/aria">WAI-ARIA Overview</a></strong>, which:</p>
<ul class="listafterpul">
  <li>introduces how WAI-ARIA defines a way to make  Web content and Web applications more accessible to people with disabilities,  especially dynamic content and advanced user interface controls developed with Ajax (also known as AJAX), HTML, JavaScript, and related technologies</li>
  <li><strong>provides examples of  accessibility problems</strong> with Ajax, <acronym title="dynamic hypertext markup language">DHTML</acronym>, and related technologies, which WAI-ARIA addresses</li>
  <li><strong>provides examples of the types of attributes</strong> that WAI-ARIA provides</li>
  <li><strong>introduces the different documents</strong> in the WAI-ARIA Suite</li>
</ul>
<p class="top">[<a href="#main" title="Go to top of page">top of page</a>]</p>
<a name="status" id="status"></a>
<h2>What is the current status of WAI-ARIA development?</h2>
<a name="update" id="update"></a>
      <div class="update">
         <h3><strong>March 2014 Update</strong></h3>
         <p class="listintro"><a href="http://www.w3.org/TR/wai-aria/">WAI-ARIA 1.0</a> is  a  completed W3C Recommendation.</p>
         <p class="listintro"><a href="http://www.w3.org/TR/wai-aria-1.1/">WAI-ARIA 1.1</a> is expected to include only a few changes from 1.0. Most  potential changes will be considered for WAI-ARIA 2.0. WAI-ARIA 1.1 was published as a First Public Working Draft on 26 September 2013. The primary change in this Draft is the addition of <code>aria-describedat</code>. The in-progress <a href="http://www.w3.org/WAI/PF/aria-1.1/">Editors' Draft of WAI-ARIA 1.1</a> is the latest unpublished draft &mdash; it might include early ideas that are not yet well developed, vetted, or approved.</p>
   </div>
<p>When updated WAI-ARIA versions will be finalized depends on many factors, such as if additional comments come in, how long it takes to gather implementations, and how long
  is needed for the remaining stages of the W3C Process.</p>
<p>WAI-ARIA  is developed under the W3C Process introduced in <a href="http://www.w3.org/WAI/intro/w3c-process"><strong>How WAI Develops Accessibility Guidelines through the W3C Process</strong></a>. The W3C Process helps ensure that WAI-ARIA reflects the diverse needs of a
broad community, including industry, disability organizations, accessibility
researchers, government, and others interested in Web accessibility.</p>
<p class="listintro">You are  invited to comment on WAI-ARIA drafts. Calls for Review and document stages are announced via:</p>
<ul class="listafterpul"><li><a href="http://www.w3.org/WAI/IG/Overview.html#about">WAI IG mailing
    list</a>,</li>
  <li><a href="http://twitter.com/w3c_wai">Twitter</a>, <a href="http://identi.ca/wai">identi.ca</a>,</li>
  <li><a href="http://www.w3.org/WAI/#highlights"> WAI
    home page Highlights</a>, and</li>
  <li><a href="http://www.w3.org/WAI/highlights/about-rss.html">WAI Highlights RSS
    feed</a>.</li>
</ul>

<p class="top">[<a href="#main" title="Go to top of page">top of page</a>]</p>



<a name="support" id="support"></a>
<h2>Is WAI-ARIA supported in browsers, assistive technologies, and other user agents?</h2>
<p>Yes, WAI-ARIA is already supported in several browsers and assistive  technologies (even though it is not finalized yet). Once WAI-ARIA is  stable, WAI will collect and publish a list of WAI-ARIA  implementations, that is, what supports WAI-ARIA. Some information on  WAI-ARIA support is already available on other Web sites.</p>
<p class="top">[<a href="#main" title="Go to top of page">top of page</a>]</p>

<a name="browsers" id="browsers"></a>
<h2> What happens in older browsers when WAI-ARIA is implemented?</h2>
<p>Nothing; WAI-ARIA coding methods have no effect on how Web content renders in older browsers. In browsers that do not  support WAI-ARIA, Web content that adds WAI-ARIA attributes will simply continue to work as it currently does in those browsers.</p>

<p class="top">[<a href="#main" title="Go to top of page">top of page</a>]</p>
<a name="toolkit_support" id="toolkit_support"></a>
<h2> Are there JavaScript toolkits that provide built-in WAI-ARIA support?</h2>

<p>Yes, some JavaScript toolkits already have WAI-ARIA support built in, and others are adding it. <strong>We encourage you to ask your favorite toolkits and application generators to support WAI-ARIA</strong>.</p>
<p>WAI will be collecting and publishing a list of WAI-ARIA implementations in the coming months as WAI-ARIA progresses through W3C document stages.</p>
<p class="top">[<a href="#main" title="Go to top of page">top of page</a>]</p>

<a name="do_now" id="do_now"></a>
<h2> As a Web content developer, what should I do with WAI-ARIA now?</h2>
<p class="listintro">There are several benefits to starting to implement WAI-ARIA now, including:</p>
<ul class="listafterpul">
  <li>The <a href="http://www.w3.org/WAI/intro/aria#is"> WAI-ARIA Primer and
    WAI-ARIA Authoring Practices</a> provide detailed advice and examples for developers.</li>
  <li>WAI-ARIA is already being supported in some browsers, assistive technologies, and other user agents; as well as JavaScript toolkits, as mentioned above. </li>
  <li>If you have questions or suggestions for changes to the WAI-ARIA documents, now is the best time to get them addressed, while the documents are still in development.</li>
  </ul>
<p>Note that while the <a href="http://www.w3.org/WAI/intro/aria#is">Working Drafts of WAI-ARIA documents</a> are complete, some aspects of WAI-ARIA may change based on comments received at each review stage. (You can also see the latest in-progress "Editors' Drafts", with any changes since Working Draft publication, from the
  <!-- @@ link to new anchor -->
  <a href="http://www.w3.org/WAI/PF/">Protocols and Formats Working Group (PFWG) Public Page</a>.)</p>
<p>Some organizations have already started implementing WAI-ARIA in their Web content. Much of WAI-ARIA focuses on  advanced Web applications. WAI-ARIA also helps improve accessibility in simple sites using only basic  HTML.</p>
<p>Web developers can implement WAI-ARIA in two ways:</p>
<ol class="listspaced">
  <li>Use existing toolkits that incorporate WAI-ARIA techniques. In this case, you don't need to understand much about WAI-ARIA since it's already built in.</li>
  <li>Include WAI-ARIA techniques in your custom widgets. When developing custom widgets, add WAI-ARIA properties to provide basic type (role), state and change information. Documentation and examples are available in the <a href="http://www.w3.org/TR/wai-aria-practices/">WAI-ARIA Best Practices</a>. You should test the results using screen readers, other assistive technologies, and testing tools, some of which are available for free. If you need help, you can <a href="http://www.w3.org/WAI/PF/participation.html#Subscribin" class="external text" title="http://www.w3.org/WAI/PF/participation.html#Subscribin" rel="nofollow">sign up for the wai-xtech mailing list</a> and ask questions there.</li>
</ol>
<p class="top">[<a href="#main" title="Go to top of page">top of page</a>]</p>

<a name="increase_code" id="increase_code"></a>

<h2> Does WAI-ARIA significantly increase the amount of code?</h2>
<p>No, the amount of additional code required in Web content and in browsers, assistive technologies, and other user agents is minimal. For Web content, generally only a few additional attributes are needed.</p>
<p>For browsers, WAI-ARIA  requires that descriptions are added only to the module that implements accessibility, not to the core browser.  The accessibility module then passes information about role, state, and changes in state through mechanisms that are already supported. WAI-ARIA therefore integrates well with existing accessibility interfaces and does not require generation of significantly more code.</p>
<p class="top">[<a href="#main" title="Go to top of page">top of page</a>]</p>
<a name="complex" id="complex"></a>

<h2> Do WAI-ARIA methods increase the complexity of the development process? </h2>
<p>Including WAI-ARIA support does require a little extra effort, yet it is not significantly more than usual development. For those developing static Web pages or using libraries with WAI-ARIA built in, implementing WAI-ARIA is fairly straightforward. Developing custom, cross-browser JavaScript widgets is more complex, and implementing WAI-ARIA in these is proportionally more complex. </p>
<p class="top">[<a href="#main" title="Go to top of page">top of page</a>]</p>

<a name="justaria" id="justaria"></a>

<h2>Is the "ARIA" that is mentioned by other organizations the same as WAI-ARIA?</h2>

<p>As far as we know, all of the documents and references to "ARIA" that are related to making Web sites accessible are actually references to WAI-ARIA.</p>
<p>"WAI-ARIA" is the abbreviation for the Accessible Rich Internet Applications documents. In order to avoid confusion, <strong>please use "WAI-ARIA" (instead of just "ARIA"), at least in titles, headings, and on first reference in documentation.</strong></p>
<p class="top">[<a href="#main" title="Go to top of page">top of page</a>]</p>


<a name="ask_questions" id="ask_questions"></a>

<h2> Where can I ask more questions about WAI-ARIA?</h2>

<p>The <a href="http://lists.w3.org/Archives/Public/wai-xtech/" class="external text" title="http://lists.w3.org/Archives/Public/wai-xtech/" rel="nofollow">WAI-XTech list</a> is available for anyone to discuss technical issues on WAI-ARIA.</p><p>To subscribe to the WAI-XTech list, please follow the instructions under <a href="http://www.w3.org/WAI/PF/participation.html#lists">Follow work on mailing lists</a> in the Participation in the Protocols and Formats Working Group page.</p>

<p class="top">[<a href="#main" title="Go to top of page">top of page</a>]</p>
</div>
<?php include "_footer.phi"; ?>
	</body>
</html>