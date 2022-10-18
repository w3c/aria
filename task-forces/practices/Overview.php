<!DOCTYPE html>
<html xmlns="https://www.w3.org/1999/xhtml">
	<head>
<?php include "../../_head.phi"; ?> 		
		<title>ARIA Authoring Practices Task Force</title>
	</head>
	<body>
<?php include "../../_header.phi"; ?>		
		<h1>ARIA Authoring Practices (APG) Task Force<br /> <span class="subhead">of the ARIA WG</span></h1>
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
$group = "apg";
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
			<p>The APG Task Force conducts its work using a variety of synchronous and asynchronous tools.<!-- The <a href="communication">communication</a> page provides details about:--></p>
			<ul>
				<li>Teleconferences of the Working Group and its task forces (also see <a href="minutes">meeting minutes</a>);</li>
				<li>Face to face meetings<!-- (also see face to face <a href="wiki/Meetings">meeting pages</a>)-->;</li>
				<li><a href="#email">Email lists</a>;</li>
				<li>IRC discussion on the <a href="irc://irc.w3.org/aria-apg">#aria-apg</a> IRC channel, used largely for minute-taking;</li>
				<li><a href="https://github.com/w3c/aria-practices/">aria-practices source repository</a>;</li>
				<li><a href="https://github.com/w3c/aria-practices/wiki">Wiki</a>;</li>
				<li><a href="/2002/09/wbs/102172/">Web-Based Surveys (WBS)</a>;</li>
				<!--<li><a href="track/">Issue Tracker</a>;</li>-->
				<li><a href="https://github.com/w3c/aria-practices/issues">aria-practices source repository issue tracker</a>.</li>
			</ul>
			<p>These tools are used by participants of the Task Force. For ways non-participants can contribute, see <a href="../../contribute">how to contribute to the Working Group and file comments</a>.</p>
			
			<section id="teleconferences">
				<h3>Teleconferences</h3>
			<ul>
				<?php
					include "../../../../2017/01/telecon-info/filtered-telecon-list.phi";
					showTeleconList("aria-apg");
				?>
			</ul>
			</section>
			<section id="minutes">
				<h3>Meeting Minutes</h3>
				<p><a href="minutes">Minutes from previous meetings</a> are available.</p>
			</section>
			<section id="email">
				<h3>Mailing Lists</h3>
				<p>The APG Task Force uses the public-aria-practices@w3.org mailing list (<a href="http://lists.w3.org/Archives/Public/public-aria-practices/">mailing list archives</a>) for email discussion. Participants are automatically added to the mailing list when they become a participant of the Task Force.</p>
				<p>Discussions of the task force prior to September 2017 are <a href="http://lists.w3.org/Archives/Public/public-aria/">archived on the public-aria mailing list</a>.</p>
			</section>
		</section>
		
		<section id="work">
			<h2>Current Work</h2>
			<!--<p>Current Task Force work is being maintained in the <a href="wiki/Work_Plan">Work Plan</a>. </p>-->
			<!--<p><a href="wiki/">See the wiki for current planning and draft documents</a>.</p>-->
			<p>The <a>scope wiki page</a> describes the task force goals. All work items are defined in the <a href="https://github.com/w3c/aria-practices/issues">issues list</a>, each of which is  scheduled into one of the <a href="https://github.com/w3c/aria-practices/milestones">milestones</a>. Issues are topically organized into <a href="https://github.com/w3c/aria-practices/projects">projects list</a>.</p>
		</section>
		<section id="publications">
			<h2>Publications</h2>
			<p>The APG Task Force is primarily developing <a href="https://www.w3.org/TR/wai-aria-practices-1.1/">WAI-ARIA Authoring Practices 1.1</a> (<a href="https://w3c.github.io/aria-practices/">WAI-ARIA Authoring Practices 1.1 Editors' Draft</a>). See also the <a href="https://github.com/w3c/aria-practices/">APG Task Force GitHub repository</a>.</p>

		</section>
		
		<section id="contribute">
			<h2>How to Comment, Contribute, and Participate</h2>
			<p>To join the APG Task Force, individuals must be participants of the <a href="../../">ARIA WG</a>. Participants are expected to <a href="work-statement#participation">actively contribute</a> to the work of the Task Force. If you are interested in participating in the APG Task Force, please send e-mail to: <a href="mailto:a11ythinker@gmail.com,jku@illinois.edu?subject=APG%20Task%20Force%20Enquiry">Matt King, Jemma Ku</a> and include a little bit about what you’re interested in and how you think that you may be able to contribute to the Task Force. Then follow the <a href="../../participation">ARIA Working Group participation</a> procedures to join the Working Group, and once you have joined ask <a href="mailto:cooper@w3.org">Michael Cooper</a> to add you to the task force.</p>
			<p>To contribute without joining the task force, see the <a href="../../contribute">ARIA Working Group contribute page</a> for general instructions. To contribute to documents under development, see <a href="https://github.com/w3c/aria-practices/">how to contribute to the source repository directly</a>.</p>
			<p><a href="https://www.w3.org/2000/09/dbwg/details?group=102172&amp;public=1">Current participants in the APG Task Force</a>.</p>
		</section> 
		
		<section id="administrative">
			<h2>Administrative Information</h2>
			<p>The APG Task Force is a Task Force of the <a href="https://www.w3.org/WAI/ARIA/">Accessible Rich Internet (ARIA) Working Group</a>. It assists this Working Group to to develop <a href="http://w3c.github.io/aria-practices/">WAI-ARIA Authoring Practices</a> and keep it in sync with WAI-ARIA.</p>
			<h3 id="facilitator">Facilitator and Contacts</h3>
			<ul>
				<li><strong>Facilitators:</strong> Matt King, JaEun (Jemma) Ku</li>
				<li><strong>Staff Contact: </strong><a href="https://www.w3.org/People/cooper/">Michael Cooper</a></li>
			</ul>
			<h3 id="work-statement">Work Statement</h3>
			<p>The <a href="work-statement">APG Task Force Work Statement</a> defines the initial objective, scope, approach, and participation of the Task Force.</p>
		</section>
<?php include "../../_footer.phi"; ?> 		
	</body>
</html>