<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
<?php include "_head.phi"; ?> 		
		<title>ARIA Project Plan</title>
	</head>
	<body>
<?php include "_header.phi"; ?>		
		<h1>ARIA Project Plan</h1>
		
		<p>Key deliverables of WAI-ARIA 1.1 and core supporting Accessibility API mappings are currently about 9 months behind the original schedule. This is due in part to time and focus lost during the charter process in 2015 which saw an attempt to recharter the original Working Group fail the Advisory Committee review and a new Working Group form after months of discussion. There was an administrative lag in migrating participants to the new group exacerbated by the timing close to the December holiday season. Diverted focus from participants led to slower reviews and consensus procedures, while some technical issues, such as the proposed aria-describedat, turned out to be more controversial than initially expected. The Working Group has recently engaged in reprioritization, moving some technical features to a future version of the technology and focusing more tightly on resolving open issues. It also expects a shorter testing period than had been planned based on the ARIA 1.0 experience, due to much overlap in features between ARIA 1.1 and ARIA 1.0 and greater experience with the testing process. Therefore the WG still plans to bring these specifications to Recommendation in 2016.</p>
		<p>@@additional analysis of reasons for delay: dindn't update timeline with charter delay; unclear limits on scope (requirements done too late); unexpected lack of consensus on certain topics; </p>
		<p>WAI-ARIA modules for Digital Publishing and Graphics with supporting accessibility API mappings are approximately 6 months behind schedule, due to the time need to ramp up joint task forces to develop those specifications, and because of effects related to the ARIA 1.1 delays. These task forces now operate relatively independently and have sped up their productivity, so these specifications are expected to be completed relatively close to the original projections.</p>
		<p>The ARIA Working Group has not yet taken up work on the deliverables for User Context Properties, Cognitive WAI-ARIA Module, and WAI-ARIA 1.0 Interaction Module. While the group hopes eventually to develop them, there are no active plans so these deliverables are at risk. Some of this work may be moved to the ARIA 2.0 time frame.</p>

		<section>
			<h2>Updated Milestones</h2>
			<p>The <a href="/2015/10/aria-charter.html#milestones">Working Group charter</a> proposed initial milestones. Updates to those milestones are provided here. Deliverables with an asterisk at the beginning are considered critical to the success of the Working Group.</p>
			<table>
				<caption>Milestones </caption>
				<thead>
					<tr>
						<th rowspan="2" scope="col">Specification</th>
						<th rowspan="2" scope="col">Status (<?php echo date("j F Y", getlastmod()); ?>)</th>
						<th colspan="4" scope="colgroup">Projection</th>
					</tr>
					<tr>
						<th scope="col"><abbr title="First Working Draft">FPWD</abbr></th>
						<th scope="col"><abbr title="Candidate Recommendation">CR</abbr></th>
						<th scope="col"><abbr title="Proposed Recommendation">PR</abbr></th>
						<th scope="col"><abbr title="Recommendation">Rec</abbr></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>* <a href="https://www.w3.org/TR/wai-aria-1.1/">WAI-ARIA 1.1</a> [<a href="http://w3c.github.io/aria/aria/aria.html">WAI-ARIA 1.1 Editors' Draft</a>]</th>
						<td>Approx. 12 months behind schedule</td>
						<td></td>
						<td><del>Oct 2015</del><br/> Oct 2016</td>
						<td><del>Apr 2016</del><br/> Feb 2017</td>
						<td><del>Jun 2016</del><br/> Apr 2017</td>
					</tr>
					<tr>
						<th><a href="https://www.w3.org/TR/dpub-aria-1.0/">Digital Publishing WAI-ARIA module</a> [<a href="http://w3c.github.io/aria/aria/dpub.html">DPub ARIA Editors' Draft</a>]</th>
						<td>Approx. 8 months behind schedule, in part due to delays in WAI-ARIA 1.1</td>
						<td>Jun 2015</td>
						<td><del>Feb 2016</del><br/> Nov 2016</td>
						<td><del>Jun 2016</del><br/> Feb 2017</td>
						<td><del>Aug 2016</del><br/> Apr 2017</td>
					</tr>
					<tr>
						<th><a href="https://www.w3.org/TR/graphics-aria-1.0/">Graphics WAI-ARIA module</a> [<a href="http://w3c.github.io/aria/aria/graphics.html">Graphics ARIA Editors' Draft</a>]</th>
						<td>Currently ahead of target schedule, mainly waiting on SVG</td>
						<td><del>Oct 2015</del><br/> Dec 2015</td>
						<td><del>Nov 2016</del><br/><ins>Feb 2017</ins></td>
						<td><del>Oct 2017</del><br/><ins>Apr 2017</ins></td>
						<td><del>Dec 2017</del><br/><ins>Jun 2017</ins></td>
					</tr>
					<tr>
						<th>* <a href="https://www.w3.org/TR/core-aam-1.1/">Core Accessibility API Mappings</a> [<a href="http://w3c.github.io/aria/core-aam/core-aam.html">Core-AAM Editors' Draft</a>]</th>
						<td>Schedule changes in lockstep with WAI-ARIA 1.1</td>
						<td></td>
						<td><del>Oct 2015</del><br/> Jan 2017</td>
						<td><del>Apr 2016</del><br/> Mar 2017</td>
						<td><del>Jun 2016</del><br/> Apr 2017</td>
					</tr>
					<tr>
						<th>* <a href="https://www.w3.org/TR/accname-aam-1.1/">Accessible Name and Description: Computation and API Mappings 1.1</a> [<a href="http://w3c.github.io/aria/accname-aam/accname-aam.html">AccName-AAM Editors' Draft</a>]</th>
						<td>Schedule changes in lockstep with WAI-ARIA 1.1</td>
						<td></td>
						<td><del>Oct 2015</del><br/> Jan 2017</td>
						<td><del>Apr 2016</del><br/> Mar 2017</td>
						<td><del>Jun 2016</del><br/> Apr 2017</td>
					</tr>
					<tr>
						<th><del><a href="https://www.w3.org/TR/html-aam-1.0/">HTML Accessibility API Mappings</a> [<a href="http://w3c.github.io/aria/html-aam/html-aam.html">HTML-AAM Editors' Draft</a>]</del></th>
						<td>No longer a deliverable of ARIA, moved to <a href="http://www.w3.org/WebPlatform/WG/">Web Platform</a></td>
						<td></td>
						<td><del>Oct 2015</del></td>
						<td><del>Apr 2016</del></td>
						<td><del>Jun 2016</del></td>
					</tr>
					<tr>
						<th><a href="https://www.w3.org/TR/svg-aam-1.0/">SVG Accessibility API Mappings</a> [<a href="http://w3c.github.io/aria/svg-aam/svg-aam.html">SVG-AAM Editors' Draft</a>]</th>
						<td>Approx. 12 months behind schedule, in part due to delays in WAI-ARIA 1.1, and awaiting SVG to advance</td>
						<td></td>
						<td><del>Oct 2015</del><br/> Nov 2016</td>
						<td><del>Apr 2016</del><br/> May 2017</td>
						<td><del>Jun 2016</del><br/> Jul 2017</td>
					</tr>
					<tr>
						<th>Graphics Accessibility API Mappings [<a href="http://w3c.github.io/aria/graphics-aam/graphics-aam.html">Graphics-AAM Editors' Draft</a>]</th>
						<td>New deliverable to support graphics beyond specifically SVG</td>
						<td><ins>July 2016</ins></td>
						<td><ins>Feb 2017</ins></td>
						<td><ins>May 2017</ins></td>
						<td><ins>Jul 2017</ins></td>
					</tr>
					<tr>
						<th><a href="https://www.w3.org/TR/dpub-aam-1.0/">Digital Publishing WAI-ARIA Accessibility API Mappings</a> [<a href="http://w3c.github.io/aria/dpub-aam/dpub-aam.html">DPub-AAM Editors' Draft</a>]</th>
						<td>Close to on target</td>
						<td><del>Aug 2015</del><br/> Dec 2015</td>
						<td>Jan 2017</td>
						<td>Jun 2017</td>
						<td>Aug 2017</td>
					</tr>
					<tr>
						<th><a href="https://www.w3.org/TR/personalization-semantics-1.0/">Personalization Semantics</a> (<a href="https://w3c.github.io/personalization-semantics/">Personalization Semantics Editors' Draft</a>)</th>
						<td>Published as First Public Working Draft, called "User Context Properties" in the charter</td>
						<td><del>May 2016</del><br/> June 2017</td>
						<td><del>May 2017</del></td>
						<td>Nov 2017</td>
						<td>Jan 2018</td>
					</tr>
					<tr>
						<th>* WAI-ARIA 1.2</th>
						<td>Work to begin after WAI-ARIA 1.1 published as CR</td>
						<td>@@</td>
						<td>@@</td>
						<td>@@</td>
						<td>@@</td>
					</tr>
					<tr>
						<th>* WAI-ARIA 2.0</th>
						<td>Work to begin after WAI-ARIA 1.1 published as CR</td>
						<td>Jun 2017</td>
						<td>Post 2018</td>
						<td>Post 2018</td>
						<td>Post 2018</td>
					</tr>
					<tr>
						<th><del>Cognitive WAI-ARIA Module</del><ins>User Context Properties</ins> [<a href="https://w3c.github.io/personalization-semantics/">User Context Properties Editors' Draft</a>]</th>
						<td>Editors' draft work begun</td>
						<td><del>Nov 2015</del><br/> Unknown</td>
						<td>Feb 2017</td>
						<td>Apr 2018</td>
						<td>Jun 2018</td>
					</tr>
					<tr>
						<th>WAI-ARIA Interaction Module 1.0</th>
						<td>Work not yet begun, at risk</td>
						<td><del>Mar 2016</del><br/> Unknown</td>
						<td>Sep 2017</td>
						<td>Post 2018</td>
						<td>Post 2018</td>
					</tr>
				</tbody>
			</table>
		</section>
		
		<section>
			<h2>Pseudo-Gantt Chart</h2>
			<p>This table attempts to represent a Gantt chart view of the ARIA WG deliverable timeline, to help maintain an even distribution of resources. A more informative and accessible format for this is sought.</p>
		<table>
			<thead>
				<tr>
					<td></td>
					<th colspan="4" scope="colgroup">2015</th>
					<th colspan="12" scope="colgroup">2016</th>
					<th colspan="12" scope="colgroup">2017</th>
					<th colspan="8" scope="colgroup">2018</th>
				</tr>
				<tr>
					<td></td>
					<th scope="col">Sep</th>
					<th scope="col">Oct</th>
					<th scope="col">Nov</th>
					<th scope="col">Dec</th>
					<th scope="col">Jan</th>
					<th scope="col">Feb</th>
					<th scope="col">Mar</th>
					<th scope="col">Apr</th>
					<th scope="col">May</th>
					<th scope="col">Jun</th>
					<th scope="col">Jul</th>
					<th scope="col">Aug</th>
					<th scope="col">Sep</th>
					<th scope="col">Oct</th>
					<th scope="col">Nov</th>
					<th scope="col">Dec</th>
					<th scope="col">Jan</th>
					<th scope="col">Feb</th>
					<th scope="col">Mar</th>
					<th scope="col">Apr</th>
					<th scope="col">May</th>
					<th scope="col">Jun</th>
					<th scope="col">Jul</th>
					<th scope="col">Aug</th>
					<th scope="col">Sep</th>
					<th scope="col">Oct</th>
					<th scope="col">Nov</th>
					<th scope="col">Dec</th>
					<th scope="col">Jan</th>
					<th scope="col">Feb</th>
					<th scope="col">Mar</th>
					<th scope="col">Apr</th>
					<th scope="col">May</th>
					<th scope="col">Jun</th>
					<th scope="col">Jul</th>
					<th scope="col">Aug</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>WAI-ARIA 1.1</th>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="PR">PR</td>
					<td class="PR"/>
					<td class="Rec">Rec</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>WAI-ARIA 2.0</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td class="ED">ED</td>
					<td class="ED"/>
					<td class="ED"/>
					<td class="ED"/>
					<td class="ED"/>
					<td class="WD">FPWD</td>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
				</tr>
				<tr>
					<th>Core-AAM 1.1</th>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="PR">PR</td>
					<td class="Rec">Rec</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>AccName-AAM 1.1</th>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="PR">PR</td>
					<td class="Rec">Rec</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>DPub ARIA 1.0</th>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="PR">PR</td>
					<td class="PR"/>
					<td class="Rec">Rec</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Graphics ARIA 1.0</th>
					<td class="ED"/>
					<td class="WD">FPWD</td>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="PR">PR</td>
					<td class="PR"/>
					<td class="Rec">Rec</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Cognitive ARIA Module</th>
					<td class="ED"/>
					<td class="ED"/>
					<td class="WD">FPWD</td>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="PR">PR</td>
					<td class="PR"/>
					<td class="Rec">Rec</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Interaction ARIA Module</th>
					<td></td>
					<td></td>
					<td></td>
					<td class="ED">ED</td>
					<td class="ED"/>
					<td class="ED"/>
					<td class="WD">FPWD</td>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
				</tr>
				<tr>
					<th>DPub-AAM 1.0</th>
					<td class="WD">FPWD</td>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="PR">PR</td>
					<td class="PR"/>
					<td class="Rec">Rec</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>HTML-AAM 1.0</th>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="PR">PR</td>
					<td class="Rec">Rec</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>SVG-AAM 1.0</th>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="PR">PR</td>
					<td class="PR"/>
					<td class="Rec">Rec</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>ARIA 1.1 Requirements</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>ARIA Practices 1.1</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>Using ARIA in HTML</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th>User Context Properties 1.0</th>
					<td></td>
					<td class="ED">ED</td>
					<td class="ED"/>
					<td class="ED"/>
					<td class="ED"/>
					<td class="ED"/>
					<td class="ED"/>
					<td class="ED"/>
					<td class="WD">FPWD</td>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="WD"/>
					<td class="CR">CR</td>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="CR"/>
					<td class="PR">PR</td>
					<td class="PR"/>
					<td class="Rec">Rec</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
		
		</section>
				
<?php include "_footer.phi"; ?> 		
	</body>
</html>