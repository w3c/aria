# Accessible Rich Internet Applications (WAI-ARIA)

This repository maintains specifications and related publications for the Accessible Rich Internet Applications suite of technologies. This is developed by the [Protocols and Formats Working Group](http://www.w3.org/WAI/PF/), expected soon to move to the ARIA Working Group. The staff contact in either case is [Michael Cooper](http://www.w3.org/People/cooper/). Please do not provide commit access to this repository without coordination.

* TOC
{:toc}

## Contributing to this Repository

### Role of Editors
Only formally designated editors have commit access to this repository. Editors are designated by the Working Group Chair and make the following commitments:

* Execute the consensus of the Working Group regardless of personal opinion;
* Seek Working Group review of substantive technical issues;
* In good faith separate editorial issues, which may be addressed without explicit review requests, from substantive issues which require review;
* Follow the [W3C Manual of Style](http://www.w3.org/2001/06/manual/) and the [Chicago Manual of Style](http://www.chicagomanualofstyle.org/);
* Follow [W3C Editors](http://www.w3.org/2003/Editors/) guidelines.

### Non-Editor Contributions

Working Group participants and members of the public without commit privileges may contribute to this repository in the following ways:

* Raise [issues](issues).
* Submit [pull requests](https://help.github.com/articles/using-pull-requests/).

When preparing GitHub pull requests:

* Provide a complete summary and description for each pull request. The Working Group needs to understand the rationale for proposed changes. This description may need to be very detailed in some cases, or may be quite brief, for example if providing a change to address a spelling issue.
* Keep pull requests specific to individual comments. Some comments may require changes to multiple source files, for example if an external link is incorrect in multiple files, and this is appropriate if the changes all relate to the same comment. However, if several separate comments are submitted together within a single pull request,  it is more difficult for the working group to parse the different points made in the comment and unless the group agrees with all aspects of the comment the pull request may need to be rejected.
* Following the editorial documentation below will help prepare a pull request that is ready for inclusion with minimal editing.

When a pull request is accepted by the Working Group, an editor will integrate changes. Pull requests and issues that are accepted by the working group will be merged into the source documents and the commenter will receive a notification from GitHub that the pull request was accepted.

## Editorial Documentation

Documents in this repository use the [Respec](http://www.w3.org/respec/) preprocessor.

### Special Elements and Classes

#### Role, State, and Property References

The ARIA spec allows easy generation of links to roles, states, and properties, with the right link and styling. Simply enclose the name of the role, state, or property in the following elements:

* `<rref>` for roles
* `<sref>` for states
* `<pref>` for properties

Note: this only works in the ARIA spec. Other specs must use cross references as defined below.

#### References to Other ARIA Specs

Links with special class attributes allow cross references into other specs in the suite, which are transformed by the script to be the appropriate target for the given publication, so editors' drafts point to other editors' drafts, and TR publications point to other TR publications. This requires some configuration options in the respecConfig and use of special class attributes.

First, for each document that might be referenced, a set of URLs is provided. The URLs are indexed by values of the [respec spec status](http://www.w3.org/respec/ref.html#specstatus), which ensures the target at the same level of maturity as the current version is used. A typical set of values for the main ARIA spec is:

```
// Spec URLs
ariaSpecURLs: {
  "FPWD": "http://www.w3.org/TR/wai-aria-1.1/",
  "ED": "http://w3c.github.io/aria/aria/aria.html",
  "WD" : "http://www.w3.org/TR/wai-aria-1.1/",
  "REC": "http://www.w3.org/TR/wai-aria/"
},
```

Note that even though some of these URIs are redundant, they must all be defined to work in all circumstances. If a document is a First Public Working Draft but the FPWD variant isn't defined, there won't be a match with the `specStatus` and the links won't work. 

The following properties for cross references are currently available *(todo: we should add versions for the other docs)*:

* `ariaSpecURLs`: for the main ARIA spec
* `coreMappingURLs`: for the Core AAM
* `accNameURLs`: for the AccName AAM

The task of fixing up links is done by a script that needs to be hooked in via the following line in the respecConfig:

```
preProcess: [ linkCrossReferences ]
```

Once all this is defined in the `respecConfig`, use the `class` attribute on the links to activate the script for that link. The value of the `href` should be the fragment you want to target, i.e,. the hash tag and fragment ID. For example, a link to the list of roles in the ARIA spec would be:

```
<a href="#role_definitions" class="specref">ARIA roles</a>
```

If you want to target the main spec, leave the href blank (but present). If you want other classes on the link, e.g., for styling, provide them after the script-hooking class, for instance `class="specref role-reference"`.

The set of class values currently defined are:

* `role-reference`: role definitions
* `state-reference`: state definitions
* `property-reference`: property definitions
* `specref`: other targets in the main ARIA spec
* `core-mapping`: the Core AAM
* `accname`: the AccName AAM

*Todo: we should add versions for the other docs*

### Shared Resources

#### Terms

The specifications share a common set of term definitions, located in [common/terms.html](common/terms.html). Add and update terms there, keeping in mind your edits will affect all specifications. To use the terms, at the place you want the terms to be included, provide the following line:

```
<div data-include="../common/terms.html" data-oninclude="restrictReferences"></div>
```

This includes the terms file and filters it to only output ones that are referenced in that particular specification.

#### Bibliography

The Respec processor loads a bibliography called [Specref](https://github.com/tobie/specref). This resource automatically includes most publications that have been published to the W3C Technical Reports page. While it is possible to request additions to this via pull requests, in practice to use references that are not in that database, it is easier to use a [`localBiblio`](https://github.com/tobie/specref). This allows the Respec configuration to load additional bibliographic entries, structured in the same way as in Specref.

Many of the supplementary bibliographic entries needed for the ARIA publications are common to several specifications. Therefore the bibliographic entries are all stored in [common/biblio.js](common/biblio.js). This is loaded with the other scripts at the top of the file with the following line:

```
<script src="../common/biblio.js" class="remove"></script>
```

In the respecConfig, instead of providing the set of bibliographic entries directly, simply reference the object created by that script:

```
localBiblio: biblio,
```

#### Images, CSS, and Scripts

The [common](common) directory also contains shared images, CSS, and scripts. Some of the scripts extend the Respec formatting processor, and others are meant to be used with the final output version. When a resource is, or is likely to be, shared, put it in the common directory. Resources specific to a particular specification, including overriding CSS, can be placed in the directory for that specification. Use the same sub-directory structure of `img`, `css`, and `script` to help keep files organized.

### Special Structures

Todo: special characteristics table classes etc. used by the script

### Generating Editors' Drafts

Official editors' drafts are published to a URI beginning with https://w3c.github.io/aria/. This URI is suitable for public references. Documents published here are *static* snapshots from the Respec processor. This is to minimize load time for consumers of these drafts.

It is desired to automate publishing to this URI when commits are pushed to the server, and there are actions items open for this, but that feature does not exist yet. Editors can manually generate the editors drafts using the following procedure:

* Push your edits to the server. Take note of the relative path of the document and branch name (usually master).
* On your local machine, change to the gh-pages branch.
* Point your browser to the rawgit URI for the document. This is https://rawgit.com/w3c/aria/{branch}/{path}.
* Use the "ReSpec" button to "Save Snapshot", choose "Save as HTML", and save the file in the appropriate location for the editors' draft.
* Commit that change to your local github branch and push that to the server. That puts the static snapshot in the location known by the github.io URI.
* On your local machine, switch back to the branch in which you were editing.

### How ARIA Extension Specs are Built

An extension spec is one that defines additional roles, states, and / or properties that augment
the collection defined in the core ARIA specification (aria/aria.html).  Extension specs must be
built in conjunction with the W3C PFWG if any new roles are to be in the default vocabulary space
(http://www.w3.org/1999/xhtml/vocab).

When building an extension spec, use the boiler plate provided in aria/template.html as a basis.  

Note that this template uses the aria/script/ariaChild.js script.  That script knows how to incorporate
information from the core ARIA specification into the extension spec so that new roles, states, and properties
are well integrated into the overall ARIA taxonomy.

The ariaChild.js script relies upon an input script (aria/script/roleInfo.js).  As of today, that file is not automatically generated.
If you want to ensure the file is up to date, access the core ARIA spec with the special query string "?saveRoles"
from a browser on a client that has write access to the copy of the extension spec you are editing. When the dialog appears, click
the save button and tell your browser to save the roleInfo.js file into the aria/script directory.

### Style guidelines

#### Document style

* There should always be introductory content before starting subsections.
* Sequences of steps use ordered lists, the first paragraph of which labels the step and is in a &lt;strong&gt;; subsequent block elements are the content for the step.
* Preformatted examples should "pretty-print" the example to be less than 80 characters wide, and indent the code using 2 space characters per indent step. Wrap within an element tag with an extra indent. Use line break characters, not &lt;br/&gt; elements, for new lines. Add extra line spacing as useful. They use the class "example". Use the Code Sample Expander tool to assist with this.
* Keyboard characters should be in kbd elements.
    * Spell out keys such as "control", "shift", "command", "option", "alt", "insert", "pageup", "enter", etc.
    * Use plus as delimiter for keys that are pressed together, e.g., control+v
    * Use comma as delimiter for keys that are pressed in sequence, e.g., insert, m
* Language elements should be in code elements.
* The first reference in a section to a role or state should be linked to the role or state with the appropriate class. Subsequent references needn't be referenced, but may be in certain circumstances.
* repeated links to aria features should just be in &lt;code&gt;, not in cross-reference links (just link first time)
* Headings use title case.
* "step" headings, the bold sentence at the start of a numbered list item in a list of steps, are sentence case and not marked as an actual hx element. They should summarize what the following paragraphs get into.
* Subheadings: only use sub-headers (&lt;h{x+1}&gt; following &lt;hx&gt;) if there are at least two of them. If there isn't more than two sub-sections, it isn't a sub-section and should be integrated into the parent section.
* Lists: only use lists of two or more items. If it's only one item, it isn't a list and should have a different semantic.
* Terms like "Web" are capitalized when it's "the Web", but not when referring to "web applications". Same for "internet, rich internet applications".
* Synopsize the meaning of abbreviations and glossary terms the first time they are used in a section.
* Acronyms we don't expand (but wrap in &lt;abbr&gt; elements):
    * API
* Acronyms we do expand (don't use the acronym)
    * RIA (use rich internet application)
    * AT (use assistive technology)
* Cross reference links don't include section numbers.
* Refer to states and properties in prose as "attributes", not as "states" or "properties" in order to be less confusing. (though they're still formally states or properties)

#### Preferred terminology

* When referring to an instance of a role, use "element with a role of X", not "X role" or "X element". "X role" refers to role in the taxonomy itself; "X element" is not technically meaningful.
* "Ajax" is not spelled "AJAX"
* "Assistive technologies" is plural, not singular.
* Use "WAI-ARIA" instead of "ARIA", to avoid trademark confusion.
* Use "text alternative" instead of "text equivalent" or the like, for consistency with WCAG 2.0 usage.
* Reference "DOMClick" instead of "DOMActivate" which is going to be deprecated or made optional.

#### Specification rules

* Descendants of the composite role MUST NOT have the "nameFrom" value of "contents" set.
* The composite role and its descendants MUST NOT have a childrenArePresentational value of "true".

### Quality Assurance Checklist

In general, but particularly when preparing documents for TR publication, editors should check the following quality points:

* Editor / author credits
* [Participant credits](common/acknowledgements.html)
* Documents are [valid HTML 5](http://validator.w3.org/)
* Dcouments do not have [broken links or unnecessary redirects](http://validator.w3.org/checklink)
* Spelling / typos
* Consistent use of approved spellings when multiple are possible

### Semi-Automated Sanity Checking

There is some automated sanity checking available, currently run by XSLT. Documentation on how to run to follow. The sanity check report helps determine the following potential issues:

* When inheritance of roles change, the states they support may change. The tools will indicate when there is a change of supported states by comparison to an earlier version of the spec. It is a manual decision whether the changes are desired or if the set of supported states needs to be updated.
* Ensure that supported state not defined if the state is also inherited
* Check that the role spec and the UML Class Diagram express the same thing
* Roles list only supported states that are defined
* States indicate applicability only to roles that are defined
* Roles and states cross reference each other: roles indicate supported states, and those states indicate applicability to those roles; discrepencies called out for manual attention 

### Todo

The following documentation is still needed:

* role name patterns
* how to use the taxonomy to extend roles effectively
* which components of role documentation are generated automatically what needs to be done manually
* how the ¨tying together script¨ works
* when casing is relevant, casing preferences
* where things are the same across different areas, and where they should be treated differently
* which pieces in the tables are automatically populated and should be left alone
* which pieces need to be filled in to trigger script
