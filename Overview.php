<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
<?php include "_head.phi"; ?> 		
		<title>Accessible Rich Internet Applications (ARIA) Working Group</title>
	</head>
	<body>
<?php include "_header.phi"; ?>		
		<h1>Accessible Rich Internet Applications (ARIA) Working Group</h1>
		
		<p>The mission of the Accessible Rich Internet Applications Working Group (ARIA WG) is to develop technologies that enhance accessibility of web content for people with disabilities. This includes continued development of the Accessible Rich Internet Applications (WAI-ARIA) suite of technologies and other technical specifications when needed to bridge known gaps. </p>
		
		<section id="announcements">
			<h2>Announcements</h2>
<?php
$group = "ARIA";
require_once "_db_connect.phi";
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
		
		<section id="work">
			<h2>Current Work</h2>
			<p>The Working Group has established a <a href="roadmap">road map</a> for upcoming work. This road map is executed via <a href="deliverables">publications and status</a>, which include:</p>
			<ul>
				<li>WAI-ARIA 1.1,</li>
				<li>WAI-ARIA 1.1 modules for Digital Publishing and Graphics,</li>
				<li>Accessibility API Mappings for ARIA, Digital Publishing, HTML, and SVG, and</li>
				<li>WAI-ARIA Authoring Practices.</li>
			</ul>
			<p>The <a href="project">ARIA Project Plan</a> details intended timeline and milestones for this work and proceeds according to the <a href="workflow">ARIA Working Group Work Flow</a>.</p>

		</section>
		
		<section id="taskforces">
			<h2>Task Forces</h2>
			<p>The ARIA WG uses <a href="task-forces">task forces</a> to focus work on specific projects. Current task forces include:</p>
			<ul>
				<li>ARIA Authoring Practices sub-group: focuses on ARIA Authoring Practices.</li>
				<li>CSS Accessibility Task Force; focuses on accessibility of CSS, ARIA role is to explore ARIA and accessibility API mapping features.</li>
			</ul>
		</section>
		
		<section id="contribute">
			<h2>How to Comment, Contribute, and Participate</h2>
			<p>The ARIA Working Group engages with stakeholders in a variety of ways. See the following resources for information on:</p>
			<ul>
				<li><a href="contribute">How to contribute to the Working Group, file comments, and contribute to the source code repositories</a>;</li>
				<li><a href="participation">How to participate in (join) the Working Group</a>.</li>
			</ul>
		</section> 
		
		<section id="communication">
			<h2>Meetings and Communication</h2>
			<p>The ARIA WG conducts its work using a variety of synchronous and asynchronous tools. The <a href="communication">communication</a> page provides details about:</p>
			<ul>
				<li>Teleconferences of the Working Group and its task forces (also see <a href="minutes">meeting minutes</a>);</li>
				<li>Face to face meetings (also see face to face <a href="wiki/Meetings">meeting pages</a>);</li>
				<li>Email lists;</li>
				<li><a href="https://github.com/w3c/aria/">ARIA source repository</a>;</li>
				<li><a href="wiki/">Wiki</a>;</li>
				<li><a href="/2002/09/wbs/83726/">Web-Based Surveys (WBS)</a>;</li>
				<li><a href="track/">Issue Tracker</a>;</li>
				<li><a href="https://github.com/w3c/aria/issues">ARIA source repository issue tracker</a>.</li>
			</ul>
			<p>These tools are used by participants of the Working Group. For ways non-participants can contribute, see <a href="contribute">how to contribute to the Working Group and file comments</a>.</p>
			<section id="minutes">
				<h3>Meeting Minutes</h3>
				<p><a href="minutes">Minutes from previous meetings</a> are available.</p>
			</section>
			
		</section>
		
		<section id="administrative">
			<h2>Administrative Information</h2>
			<p> Work of the ARIA WG is in accordance with the <a href="http://www.w3.org/2015/Process-20150901/">W3C Process</a>. ARIA WG work is funded in part by the <a href="http://www.w3.org/WAI/Core2015/">WAI Core 2015 Project</a>. The work of this group does not necessarily reflect the views or policies of the funders.</p>
			<p>The chairs of the ARIA WG, responsible for overall leadership and management, are <a href="mailto:group-aria-chairs@w3.org">James Nurthen and Valerie Young</a>. The staff contact, responsible for <a href="http://www.w3.org/Consortium/Process/">W3C Process</a> and general support, is <a href="http://www.w3.org/People/cooper/">Michael Cooper</a>. <!--Administrative inquiries may be sent to <a href="mailto:group-aria-chairs@w3.org">group-aria-chairs@w3.org</a>.--></p> 
			<p>The Accessible Rich Internet Architectures maintains the following operational resources:</p>
			<ul>
				<li><a href="decision-policy">Decision policy</a>;</li>
				<li><a href="wiki/Decisions">Record of decisions made by the WG</a>;</li>
				<li><a href="archive">Archives of past activity</a>;</li>
				<li><a href="minutes">meeting minutes</a>.</li>
			</ul>
			<p>W3C maintains a <a href="http://www.w3.org/2004/01/pp-impl/83726/status">public list of any patent disclosures</a> made in connection with the deliverables of the group; that page also includes instructions for disclosing a patent.</p>
			<p><a href="https://www.w3.org/2000/09/dbwg/details?group=83726&amp;public=1">Current participants in the ARIA WG</a>.</p>
			
		</section>
<?php include "_footer.phi"; ?> 		
	</body>
</html>