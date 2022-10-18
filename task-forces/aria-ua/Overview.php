<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" dir="ltr">
	<head>
<?php include "../../_head.phi"; ?>
<title>User Agent Implementation Task Force</title>
	</head>
	<body>
<?php include "../../_header.phi"; ?>
 		<h1>User Agent Implementation Task Force (UA TF)<br /> <span class="subhead">of the ARIA WG</span></h1>
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
$group = "AAPI";
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
			<p>The UA TF conducts its work using a variety of synchronous and asynchronous tools. The <a href="communication">communication</a> page provides details about:</p>
			<ul>
				<li>Teleconferences of the Working Group and its task forces (also see <a href="minutes">meeting minutes</a>);</li>
				<li>Face to face meetings (also see face to face <a href="wiki/Meetings">meeting pages</a>);</li>
				<li><a href="#email">Email lists</a>;</li>
				<li>IRC discussion on the <a href="irc://irc.w3.org/aapi">#aapi</a> IRCchannel, used largely for minute-taking;</li>
				<li><a href="https://github.com/w3c/aria/">aria source repository</a>;</li>
				<li><a href="wiki/">Wiki</a>;</li>
				<li><a href="/2002/09/wbs/83726/">Web-Based Surveys (WBS)</a>;</li>
				<li><a href="../../track/">ARIA Issue Tracker</a>;</li>
				<li><a href="https://github.com/w3c/rqtf/issues">UA TF source repository issue tracker</a>.</li>
			</ul>
			<p>These tools are used by participants of the Task Force. For ways non-participants can contribute, see <a href="../../contribute">how to contribute to the Working Group and file comments</a>.</p>

			<section id="teleconferences">
				<h3>Teleconferences</h3>
				<p>The task force is currently no conducting teleconferences.</p>
			</section>
			<section id="minutes">
				<h3>Meeting Minutes</h3>
				<p><a href="minutes">Minutes from previous meetings</a> are available.</p>
			</section>
			<section id="email">
				<h3>Mailing Lists</h3>
				<p>The UA TF uses the public-aria@w3.org mailing list (<a href="http://lists.w3.org/Archives/Public/public-aria/">mailing list archives</a>) for email discussion.</p>
			</section>
		</section>

		<section id="work">
			<h2>Current Work</h2>
			<p><a href="wiki/">See the wiki for current planning and draft documents</a>.</p>
		</section>
		<section id="publications">
			<h2>Publications</h2>
			<p>When the Task Force develops publications, they will be listed here. See also the <a href="https://github.com/w3c/aria">ARIA GitHub repository</a>.</p>

		</section>

		<section id="contribute">
			<h2>How to Comment, Contribute, and Participate</h2>
			<p>To join the UA TF, individuals must be participants of the ARIA WG. Participants are expected to <a href="work-statement#participation">actively contribute</a> to the work of the Task Force. If you are interested in participating in the UA TF, please send e-mail to: <a href="mailto:clown.idi@gmail.com@ets.org?subject=UA%20Task%20Force%20Enquiry">Joseph Scheuhammer</a> and include a little bit about what you’re interested in and how you think that you may be able to contribute to the Task Force. Then follow the <a href="../../participation">ARIA Working Group participation</a> procedures to join the Working Group.</p>
			<p>To contribute without joining the task force, see the <a href="../../contribute">ARIA Working Group contribute page</a> for general instructions. To contribute to documents under development, see <a href="https://github.com/w3c/aria/">how to contribute to the source repository directly</a>.</p>
		</section>

		<section id="administrative">
			<h2>Administrative Information</h2>
			<p>The User Agent Implementation Task Force (UA TF) is a Task Force of the <a href="http://www.w3.org/WAI/ARIA/">Accessible Rich Internet (ARIA) Working Group</a>. It assists these Working Groups to produce techniques, understanding, and guidance documents, as well as updates to existing related W3C  material that addresses the cognitive space.</p>
			<h3 id="facilitator">Facilitator and Contacts</h3>
			<ul>
				<li> <strong>Task Force facilitator:</strong> Joseph Scheuhammer</li>
				<li><strong>Staff Contact: </strong><a href="http://www.w3.org/People/cooper/">Michael Cooper</a> </li>
			</ul>
			<h3 id="work-statement">Work Statement</h3>
			<p>The <a href="work-statement">User Agent Implementation Task Force Work Statement</a> defines the initial objective, scope, approach, and participation of the Task Force.</p>
		</section>
<?php include "../../_footer.phi"; ?>
	</body>
</html>