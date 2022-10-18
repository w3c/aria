<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" dir="ltr">
	<head>
<?php include "../_head.phi"; ?>
		<title>ARIA Editors</title>
	</head>
	<body>
<?php include "../_header.phi"; ?>
		<h1>ARIA Editors</h1>

		<p>Editors of specifications for the ARIA Working Group coordinate using resources detailed here.</p>

		<section id="email">
			<h2>Mailing lists</h2>
			<p>ARIA editors use the public-aria-editors@w3.org mailing list (<a href="http://lists.w3.org/Archives/Public/public-aria-editors/">mailing list archives</a>) for email discussion. Participants are added to this list when appointed as editor of an ARIA WG deliverable.</p>
		</section>

		<section id="teleconferences">
			<h2>Teleconferences</h2>
			<ul>
				<?php
					include "../../../2017/01/telecon-info/filtered-telecon-list.phi";
					showTeleconList("aria-editors");
				?>
			</ul>
		</section>
		
		<section id="minutes">
			<h2>Meeting minutes</h2>
			<p><a href="minutes">Minutes from previous meetings</a> are available.</p>
		</section>
		
		<section id="styleguides">
			<h2>Style guides</h2>
			<p>The ARIA editors use the following resources to ensure the quality of technical specifications:</p>
			<ul>
				<li><a href="https://www.w3.org/WAI/PF/editors/qa">QA Checklist</a> (old resource) - a list of the points we attend to to ensure quality of the ARIA specifications. </li>
				<li><a href="https://www.w3.org/WAI/PF/editors/style_editorial">Editorial style guide</a> (old resource) - guidelines to ensure editorial consistency. </li>
				<li><a href="https://github.com/w3c/aria/#user-content-editorial-documentation">Technical style guide</a> in the aria repository readme - coding practices to support document automation. </li>
			</ul>
		</section>
		
		<?php include "../_footer.phi"; ?>
	</body>
</html>