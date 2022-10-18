<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<?php include "../../_head.phi"; ?>
		<title>ARIA User Agent Implementation Task Force</title>
	</head>
	<body>
		<?php include "../../_header.phi"; ?>
		<h1>ARIA User Agent Implementation Task Force (UAI TF) Work Statement</h1>
		<p>UAI TF is a joint task force of the <a href="/WAI/ARIA/">Accessible Rich Internet Applications (ARIA) Working Group</a> and the <a href="/WebPlatform/WG/">Web Platform Working Group</a>. It assists these Working Groups with the work identified below.</p>
		<ul>
			<li><a href="#status">Status</a></li>
			<li><a href="#objective">Objective</a></li>
			<li><a href="#deliverables">Deliverables</a></li>
			<li><a href="#approach">Work Approach</a></li>
			<li><a href="#participation">Participation </a></li>
			<li><a href="#facilitation">Facilitation</a></li>
			<li><a href="#participants">Participants</a></li>
		</ul>
		<section id="status">
			<h2>Status</h2>
			<p>This work statement has been accepted by the ARIA WG and the Web Platform WG. The task force is active. </p>
		</section>
		<section id="objective">
			<h2>Objective</h2>
			<p>The objective of UAI TF is to develop guidelines for interoperable user agent implementation of the <a href="/TR/wai-aria/">WAI-ARIA specification</a>. Because user agent implementation of ARIA creates an impact on other languages supported by the user agent (notably, HTML and XHTML), the guidelines require cooperative development between maintainers of multiple technologies, and should not be sequestered within the Protocols and Formats Working Group.</p>
			<p>Accordingly, the UAI TF operates under the <a href="/WAI/ARIA/charter">ARIA WG charter</a> and the <a href="https://www.w3.org/2015/10/webplatform-charter.html">Web Platform WG charter</a>. Documents about WAI-ARIA will be published by ARIA WG. Documents about HTML5 by will be published by the Web Platform WG.</p>
		</section>
		<section id="deliverables">
			<h2>Deliverables</h2>
			<ol>
				<li><a href="http://www.w3.org/WAI/PF/aria-implementation/">WAI-ARIA User Agent Implementation Guidelines</a>, as a deliverable of the ARIA WG. This would be a Working Group Note and include a mapping of ARIA features to accessibility API features or some neutral abstraction. It is separate from the ARIA specification, but (if the User Agent Implementation Guidelines is on the Recommendation track) both documents should reach CR at the same time, as the user agent implementation guidelines is needed to document implementation experience for ARIA.</li>
				<li>Mapping of HTML features to accessibility API features, as a deliverable of the Web Platform WG. The mapping needs to be developed together with the ARIA mapping in the previous deliverable, in order to ensure that the recommendations of these two mappings are consistent. This may be subsumed into one or another of the HTML5 deliverables.</li>
				<li>The tests that are used to get WAI-ARIA through CR<a href="http://www.w3.org/WAI/PF/aria-implementation/"></a>, as a deliverable of the ARIA WG.</li>
				<li>The tests that are used to get HTML5 through CR<a href="http://www.w3.org/WAI/PF/aria-implementation/"></a>, as a deliverable of the Web Platform WG.</li>
			</ol>
			<p>In addition to the above deliverables, the task force works on the following:</p>
			<ul>
				<li>Produce implementation guidance dealing with how access information from the formats is communicated to AT.</li>
				<li>Test suite development to a degree which can be adjusted as the work progresses. </li>
				<li>Propose additions and edits to the WAI-ARIA specification that are necessary to ensure user agent interoperability.</li>
			</ul>
		</section>
		<section id="approach">
			<h2>Work approach</h2>
			<p>UAI TF communications are publicly visible. Communication mechanisms for UAI TF include:</p>
			<ol>
				<li> E-mail discussion takes place on the <a href="mailto:wai-xtech@w3.org">wai-xtech mailing list</a> [<a href="http://lists.w3.org/Archives/Public/wai-xtech/">wai-xtech archives</a>]. Please add the prefix &quot;[AAPI]&quot; to your messages to separate threads from other topics on the list.</li>
				<li>Weekly (or more frequently, as needed) teleconferences; minutes from the teleconferences are sent to the mailing list;</li>
				<li>Discussion in IRC <a href="irc://irc.w3.org:6665/aapi">irc.w3.org:6665 channel #aapi</a>;</li>
				<li>Monthly (or more frequently, as needed) updates and feedback in ARIA WG and Web Platform WG teleconferences, as appropriate;</li>
				<li>Issues are tracked in <a href="http://www.w3.org/Bugs/Public/">W3C Bugzilla</a>. Use the Product &quot;ARIA&quot; and the Component &quot;Platform APIs&quot; for all issues relevant to this task force. <a href="http://www.w3.org/Bugs/Public/buglist.cgi?product=ARIA&amp;component=Platform+APIs">Search for task force issues</a>.</li>
				<li>Some documents are available from the <a href="http://www.w3.org/WAI/PF/wiki/User_Agent_Implementation_Task_Force">wiki</a>. Relevant documents are tagged with the <a href="http://www.w3.org/WAI/PF/wiki/Category:ARIA_User_Agent_Implementation_Guide">category &quot;ARIA User Agent Implementation Guide&quot;</a>.</li>
			</ol>
			<p>The Task Force allows focused work on particular deliverables of the ARIA WG and the Web Platform WG. The Task Force does not represent consensus of either of those WGs. All output of the Task Force should be considered as proposals, subject to vetting and modification by the WG receiving the proposal. Only once formal consensus of the WG is given does the deliverable satisfy charter requirements of the WG.</p>
			<p> HTML5 documents may have normative dependencies on WAI-ARIA documents, but not the reverse. </p>
		</section>
		<section id="participation">
			<h2>Participation</h2>
			<p>UAI TF participants must be members of either the ARIA WG, the Web Platform WG, or another W3C Working Group. This requirement ensures that all participants have accepted the <a href="/Consortium/Patent-Policy/">W3C Patent Policy</a>.</p>
			<p>Participants must actively contribute to the work of UAI TF, including:</p>
			<ol>
				<li>6 to 8 hours per month of UAI TF work;</li>
				<li>Remain current on the UAI TF mailing list and respond in a timely manner to postings;</li>
				<li>Participate in UAI TF telephone meetings, or send regrets to the UAI TF mailing list.</li>
			</ol>
			<p>Contact <a href="http://www.w3.org/People/cooper/">Michael Cooper</a> to become a participant of UAI TF or with questions.</p>
			<p>Members of the public who are not covered by the W3C Patent Policy can send input to the <a href="mailto:public-aria">public-aria</a> mailing list [<a href="http://lists.w3.org/Archives/Public/public-aria/">public-aria archive</a>], or the <a href="mailto:public-html@w3.org">public-html</a> mailing list [<a href="http://lists.w3.org/Archives/Public/public-html/">public-html archive</a>]. Messages should clearly indicate the deliverable to which they are related and that they are relevant to the work of the UAI TF.</p>
		</section>
		<section id="facilitation">
			<h2>Facilitation</h2>
			<p>Staff contacts from the respective WGs oversee attention to W3C Process with respect to the chartered requirements of the respective WGs. The facilitator sets agenda, leads meetings, determines consensus, and is the primary liaison to the WGs.</p>
			<ul>
				<li><strong>ARIA WG Staff Contact: </strong><a href="http://www.w3.org/People/cooper/">Michael Cooper</a></li>
				<li><strong>Web Platform WG Staff Contact:</strong>
					<a href="/People/Smith/">Michael Smith</a></li>
				<li><strong>Facilitator:</strong> Joseph Scheuhammer</li>
			</ul>
		</section>
		<section id="participants">
			<h2>Participants</h2>
			<p>The Task Force participants as of the last update to this page are:</p>
			<ol>
				<li>Joanmarie Diggs</li>
				<li>Bryan Garaventa</li>
				<li>Jason Kiss</li>
				<li>Joseph Scheuhammer</li>
				<li>Rich Schwerdtfeger</li>
				<li>Cynthia Shelly</li>
				<li>Alexander Surkov</li>
			</ol>
		</section>
		<?php include "../../_footer.phi"; ?>
	</body>
</html>
