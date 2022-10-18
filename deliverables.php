<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" dir="ltr">
	<head>
<?php include "_head.phi"; ?>
		<title>ARIA Project Plan</title>
	</head>
	<body>
<?php include "_header.phi"; ?>
		<h1>ARIA Deliverables</h1>

		<p>WAI-ARIA, the Accessible Rich Internet Applications Suite, defines a way to make Web content and Web applications more accessible to people with disabilities. It especially helps with dynamic content and advanced user interface controls developed with Ajax, HTML, JavaScript, and related technologies. The <a href="project">ARIA Project Plan</a> details intended timeline and milestones for this work.</p>
		<p>The work has been divided into a series of modules and related documents. The deliverables are: </p>
		<table>
			<thead>
				<tr>
					<th scope="col">Deliverable</th>
					<th scope="col">Description</th>
					<th scope="col">Status</th>
					<th scope="col">Editors' Draft</th>
					<th scope="col">Formal Version</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="rowgroup" colspan="5">ARIA Core Specifications</th>
				</tr>
				<tr>
					<th scope="row">Accessible Rich Internet Applications (WAI-ARIA) 1.1</th>
					<td>This specification provides an ontology of roles, states, and properties that set out an abstract model for accessible interfaces and can be used to improve the accessibility and interoperability of Web Content and Applications. This information can be mapped to accessibility frameworks that use this information to provide alternative access solutions. Similarly, this information can be used to change the rendering of content dynamically using different style sheet properties. The result is an interoperable method for associating behaviors with document-level markup.</td>
					<td>In Working Drafts; Approaching readiness for CR</td>
					<td><a href="https://w3c.github.io/aria/aria/aria.html">Editors' draft of Accessible Rich Internet Applications (WAI-ARIA) 1.1</a></td>
					<td><a href="http://www.w3.org/TR/wai-aria-1.1/">Formal published version of Accessible Rich Internet Applications (WAI-ARIA) 1.1</a></td>
				</tr>
				<tr>
					<th scope="row">Core Accessibility API Mappings 1.1</th>
					<td>Describes how user agents should map WAI-ARIA features to platform accessibility APIs. Other Accessibility <abbr title="application programming interface">API</abbr> Mappings specifications depend on and extend this Core specification for specific technologies, including native techology features and <abbr title="Accessible Rich Internet Application">WAI-ARIA</abbr> extensions.</td>
					<td>In Working Drafts; Approaching readiness for CR</td>
					<td><a href="https://w3c.github.io/aria/core-aam/core-aam.html">Editors' draft of Core Accessibility API Mappings 1.1</a></td>
					<td><a href="http://www.w3.org/TR/core-aam-1.1/">Formal published version of Core Accessibility API Mappings 1.1</a></td>
				</tr>
				<tr>
					<th scope="row">Accessible Name and Description: Computation and API Mappings 1.1</th>
					<td>Describes how user agents determine names and descriptions of accessible objects from web content languages and expose them in accessibility <abbr title="Application Programming Interfaces">APIs</abbr>.</td>
					<td>In Working Drafts; Approaching readiness for CR</td>
					<td><a href="https://w3c.github.io/aria/accname-aam/accname-aam.html">Editors' draft of Accessible Name and Description: Computation and API Mappings 1.1</a></td>
					<td><a href="http://www.w3.org/TR/accname-aam-1.1/">Formal published version of Accessible Name and Description: Computation and API Mappings 1.1</a></td>
				</tr>
				<tr>
					<th scope="row">Accessible Rich Internet Applications (WAI-ARIA) 2.0</th>
					<td></td>
					<td>Work to begin after ARIA 1.1 wraps up</td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
			<tbody>
				<tr>
					<th scope="rowgroup" colspan="5">ARIA Extensions</th>
				</tr>
				<tr>
					<th scope="row">Digital Publishing WAI-ARIA Module 1.0</th>
					<td>Defines a WAI-ARIA module encompassing an ontology of roles, states and properties specific to the digital publishing industry. This allows an author to convey user interface behaviors and structural information to assistive technologies and to enable semantic navigation, styling and interactive features used by readers. It is expected this will complement HTML5.</td>
					<td>In Working Drafts</td>
					<td><a href="https://w3c.github.io/aria/aria/dpub.html">Editors' draft of Digital Publishing WAI-ARIA Module 1.0</a></td>
					<td><a href="http://www.w3.org/TR/dpub-aria-1.0/">Formal published version of Digital Publishing WAI-ARIA Module 1.0</a></td>
				</tr>
				<tr>
					<th scope="row">Graphics WAI-ARIA Module 1.0</th>
					<td>Defines a WAI-ARIA module of roles, states, and properties specific to web graphics. These semantics allow an author to convey user interface behaviors and structural information to assistive technologies and to enable semantic navigation, styling and interactive features used by readers. It is expected this will complement HTML5 and SVG2.</td>
					<td>In Editors' Drafts, FPWD anticipated soon</td>
					<td><a href="https://w3c.github.io/aria/aria/graphics.html">Editors' draft of Graphics WAI-ARIA Module 1.0</a></td>
					<td><a href="http://www.w3.org/TR/graphics-aria-1.0/">Formal published version of WAI-ARIA Graphics Module 1.0</a></td>
				</tr>
				<tr>
					<th scope="row">Cognitive WAI-ARIA Module 1.0</th>
					<td></td>
					<td>Work not yet begun</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">WAI-ARIA Interaction Module 1.0</th>
					<td></td>
					<td>Work not yet begun</td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
			<tbody>
				<tr>
					<th scope="rowgroup" colspan="5">Accessibility API Mapping Extensions</th>
				</tr>
				<tr>
					<th scope="row">Digital Publishing Accessibility API Mappings 1.1</th>
					<td>This document describes how user agents maps digital publishing markup to platform accessibility <abbr title="application programming interfaces">APIs</abbr> based on the Core Accessibility <abbr title="application programming interface">API</abbr> Mappings</a> specification for user agents.</td>
					<td>In Editors' Drafts</td>
					<td><a href="https://w3c.github.io/aria/dpub-aam/dpub-aam.html">Editors' draft of Digital Publishing Accessibility API Mappings 1.0</a></td>
					<td><a href="http://www.w3.org/TR/dpub-aam-1.0/">Formal published version of Digital Publishing Accessibility API Mappings 1.0</a></td>
				</tr>
				<tr>
					<th scope="row">HTML Accessibility API Mappings 1.1</th>
					<td>This document describes how user agents map <abbr title="HyperText Markup Language">HTML</abbr>5.1 [[!HTML51]] elements and attributes to platform accessibility <abbr title="Application Programming Interface">API</abbr> roles, states and properties on a variety of platforms, based on the Core Accessibility API Mappings specification for user agents. This document is designed to leverage these core mappings for the HTML5.1 host language.</td>
					<td>In Working Drafts</td>
					<td><a href="https://w3c.github.io/aria/html-aam/html-aam.html">Editors' draft of HTML Accessibility API Mappings 1.0</a></td>
					<td><a href="http://www.w3.org/TR/html-aam-1.0/">Formal published version of HTML Accessibility API Mappings 1.0</a></td>
				</tr>
				<tr>
					<th scope="row">SVG Accessibility API Mappings 1.1</th>
					<td>This document describes how user agents maps SVG2 markup to platform accessibility <abbr title="application programming interfaces">APIs</abbr> based on the Core Accessibility <abbr title="application programming interface">API</abbr> Mappings</a></cite> specification for user agents.</td>
					<td>In Working Drafts</td>
					<td><a href="https://w3c.github.io/aria/svg-aam/svg-aam.html">Editors' draft of SVG Accessibility API Mappings 1.0</a></td>
					<td><a href="http://www.w3.org/TR/svg-aam-1.0/">Formal published version of SVG Accessibility API Mappings 1.0</a></td>
				</tr>
			</tbody>
			<tbody>
				<tr>
					<th scope="rowgroup" colspan="5">ARIA Support Resources</th>
				</tr>
				<tr>
					<th scope="row">Requirements for Accessible Rich Internet Applications 1.1</th>
					<td>This roadmap that describes the problem, what W3C specifications will be used to correct the problem, and the timeline for the new specifications.</td>
					<td>Work not yet begun</td>
					<td><a href="https://w3c.github.io/aria/requirements/aria-requirements.html">Editors' draft of Requirements for Accessible Rich Internet Applications 1.1</a></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">WAI-ARIA Authoring Practices 1.1</th>
					<td>Provides recommended approaches to create accessible Web content using WAI-ARIA roles, states, and properties to make widgets, navigation, and behaviors accessible. Also describes considerations that might not be evident to most implementors from the WAI-ARIA specification alone.</td>
					<td>in Working Drafts</td>
					<td><a href="https://w3c.github.io/aria/practices/aria-practices.html">Editors' draft of WAI-ARIA Authoring Practices 1.1</a></td>
					<td><a href="http://www.w3.org/TR/wai-aria-practices-1.1/">Formal published version of WAI-ARIA Authoring Practices 1.1</a></td>
				</tr>
				<tr>
					<th scope="row">Using WAI-ARIA in HTML</th>
					<td>Practical guide for developers on how to add accessibility information to HTML elements using the WAI-ARIA 1.1 in  HTML 5.1, which especially helps with dynamic content and advanced user interface controls developed with Ajax, HTML, JavaScript, and related technologies.</td>
					<td>In Working Drafts</td>
					<td><a href="http://w3c.github.io/aria-in-html/">Editors' draft of Using WAI-ARIA in HTML</a></td>
					<td><a href="http://www.w3.org/TR/aria-in-html/">Formal published version of Using WAI-ARIA in HTML</a></td>
				</tr>
			</tbody>
			<tbody>
				<tr>
					<th scope="rowgroup" colspan="5">User Context Properties</th>
				</tr>
				<tr>
					<th scope="row">User Context Properties 1.0</th>
					<td>defines a set of preferences that users can choose to expose to web applications. Web applications can use this information to optimize the presentation without a requirement to target a specific device, operating system, or locale.</td>
					<td>Handover from IndieUI WG not yet completed</td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
		<p>Also see the <a href="/WAI/intro/aria">WAI-ARIA Overview Page</a>. Editors' sources for the above specifications are maintained in the <a href="https://github.com/w3c/aria/">W3C ARIA GitHub repository</a>. GitHub users can watch this repository and send pull requests.</p>

<?php include "_footer.phi"; ?>
	</body>
</html>