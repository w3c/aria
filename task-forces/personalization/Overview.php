<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" dir="ltr">
	<head>
<?php include "../../_head.phi"; ?>
<title>Personalization Accessibility Task Force</title>
	</head>
	<body>
<?php include "../../_header.phi"; ?>
 		<h1>Personalization Accessibility Task Force (Personalization Semantics Task Force)<br /> <span class="subhead">of the ARIA WG</span></h1>
		<section id="contents">
			<h2>Page Contents</h2>
				<ul>
					<li><a href="#announcements">Announcements</a></li>
					<li><a href="#communication">Meetings and Communication</a></li>
					<li><a href="#work">Current Work</a></li>
					<li><a href="#contribute">How to Comment, Contribute, and Participate</a></li>
					<li><a href="#administrative">Administrative Information</a></li>
				</ul>
		</section>
		<section id="announcements">
			<h2>Announcements</h2>
<?php
$group = "personalization";
require_once "../../_db_connect.phi";
$sth = $dbh->prepare("select * from announcements where `group` = :group and (date_start <= curdate() or date_start IS NULL) and (date_end >= curdate() or date_end is null) order by date_display, date_start, header;");
$sth->bindValue(":group", $group, PDO::PARAM_STR);
$sth->execute();
if ($sth->rowCount() > 0) {
	while ($row = $sth->fetch()) {
		print("<p>");
		if ($row['date_display'] != null) print("<em>" . $row['date_display'] . "</em> - ");
		else if ($row['date_start'] != null) print("<em>" . $row['date_start'] . "</em> - ");
		if ($row['header'] != null) print("<strong>" . $row['header']  . "</strong>: ");
		print($row['text']);
		print("</p>");
	}
} else {
	print("<p>No announcements at the moment.</p>");
}
?>
		</section>

		<section id="communication">
			<h2>Meetings and Communication</h2>
			<p>The Personalization Task Force conducts its work using a variety of synchronous and asynchronous tools. The <a href="communication">communication</a> page provides details about:</p>
			<ul>
				<li>Teleconferences of the Working Group and its task forces (also see <a href="minutes">meeting minutes</a>);</li>
				<li>Face to face meetings (also see face to face <a href="wiki/Meetings">meeting pages</a>);</li>
				<li><a href="#email">Email lists</a>;</li>
				<li>IRC discussion on the <a href="irc://irc.w3.org/personalization">#personalization</a> IRC channel, used largely for minute-taking;</li>
				<li><a href="https://github.com/w3c/personalization-semantics/">personalization-semantics source repository</a>;</li>
				<li><a href="wiki/">Wiki</a>;</li>
				<li><a href="/2002/09/wbs/101569/">Web-Based Surveys (WBS)</a>;</li>
				<!-- <li><a href="../../track/">APA Issue Tracker</a>;</li> -->
				<li><a href="https://github.com/w3c/personalization-semantics/issues">personalization-semantics source repository issue tracker</a>.</li>
			</ul>
			<p>These tools are used by participants of the Task Force. For ways non-participants can contribute, see <a href="../../contribute">how to contribute to the Working Group and file comments</a>.</p>

			<section id="teleconferences">
				<h3>Teleconferences</h3>
				<p>Teleconference details will be announced when a time is selected.</p>
			</section>
			<section id="minutes">
				<h3>Meeting Minutes</h3>
				<p><a href="minutes">Minutes from previous meetings</a> are available.</p>
			</section>
			<section id="email">
				<h3>Mailing Lists</h3>
				<p>The Personalization Semantics Task Force uses the public-personalization-tf@w3.org mailing list (<a href="http://lists.w3.org/Archives/Public/public-personalization-tf/">mailing list archives</a>) for email discussion. Participants are automatically added to the mailing list when they become a participant of the Task Force.</p>
			</section>
		</section>

		<section id="work">
			<h2>Current Work</h2>
   			<!--<p>Current Task Force work is being maintained in the <a href="wiki/Work_Plan">Work Plan</a>. </p>-->
			<p><a href="wiki/">See the wiki for current planning and draft documents</a>.</p>
		</section>
		<section id="publications">
			<h2>Publications</h2>
			<p>The Personalization Task Force is primarily developing <a href="https://www.w3.org/TR/personalization-semantics-1.0/">Personalization Semantics 1.0</a> (<a href="https://w3c.github.io/personalization-semantics/">Personalization Semantics 1.0 Editors' Draft</a>). See also the <a href="https://github.com/w3c/personalization-semantics/">Personalization Semantics Task Force GitHub repository</a>.</p>

		</section>

		<section id="contribute">
			<h2>How to Comment, Contribute, and Participate</h2>
			<p>To join the Personalization Semantics Task Force, individuals must be participants of the <a href="../../">ARIA WG</a>. Participants are expected to <a href="work-statement#participation">actively contribute</a> to the work of the Task Force. If you are interested in participating in the Personalization Semantics Task Force, please send e-mail to: <a href="mailto:lisa.seeman@zoho.com,charlesl@benetech.org?subject=Personalization%20Task%20Force%20Enquiry">Lisa Seeman-Kestenbaum, Charles LaPierre</a> and include a little bit about what you’re interested in and how you think that you may be able to contribute to the Task Force. Then follow the <a href="../../participation">ARIA Working Group participation</a> procedures to join the Working Group, and once you have joined ask <a href="mailto:cooper@w3.org">Michael Cooper</a> to add you to the task force.</p>
			<p>To contribute without joining the task force, see the <a href="../../contribute">ARIA Working Group contribute page</a> for general instructions. To contribute to documents under development, see <a href="https://github.com/w3c/personalization-semantics/">how to contribute to the source repository directly</a>.</p>
			<p><a href="https://www.w3.org/2000/09/dbwg/details?group=101569&amp;public=1">Current participants in the Personalization Semantics Task Force</a>.</p>
		</section>

		<section id="administrative">
			<h2>Administrative Information</h2>
			<p>The Personalization Accessibility Task Force (Personalization Semantics Task Force) is a Task Force of the <a href="http://www.w3.org/WAI/ARIA/">Accessible Rich Internet (ARIA) Working Group</a>. It assists this Working Group to mature Personalization Semantics 1.0 and to incubate personalization as an approach to meeting accessibility user requirements across W3C.</p>
			<h3 id="facilitator">Facilitator and Contacts</h3>
			<ul>
				<li><strong>Facilitators:</strong> Lisa Seeman-Kestenbaum, Charles LaPierre</li>
				<li><strong>Staff Contact: </strong><a href="http://www.w3.org/People/cooper/">Michael Cooper</a></li>
			</ul>
			<h3 id="work-statement">Work Statement</h3>
			<p>The <a href="work-statement">Personalization Accessibility Task Force Work Statement</a> defines the initial objective, scope, approach, and participation of the Task Force.</p>
		</section>
<?php include "../../_footer.phi"; ?>
	</body>
</html>