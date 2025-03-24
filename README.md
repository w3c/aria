# Accessible Rich Internet Applications (ARIA)

This repository maintains specifications and related publications for the Accessible Rich Internet Applications suite of technologies. This is developed by the [ARIA Working Group](http://www.w3.org/WAI/about/groups/ariawg). The W3C staff contact is Daniel Montalvo. Please do not provide commit access to this repository without coordination.

## Specifications in this repository

This repository contains the main deliverable of the ARIA Working Group, Accessible Rich Internet Applications (ARIA), and should be used for issues related to the ARIA spec as well as issues that involve both the ARIA spec in conjunction with other specifications maintained by the ARIA working group. All other specifications maintained by ARIA can be found in this repository as well, however, we have separate issue tracking repos for these separate specifications.

* Accessible Rich Internet Applications (aria)
  * [Spec](./index.html)
  * [Editor's Draft](https://w3c.github.io/aria/)
  * [Issue Repository](https://github.com/w3c/aria)
* Accessible Name and Description Computation (accname)
  * [Spec](accname/index.html)
  * [Editor's Draft](https://w3c.github.io/accname/)
  * [Issue Repository](https://github.com/w3c/accname)
* Core Accessibility API Mappings (core-aam)
  * [Spec](core-aam/index.html)
  * [Editor's Draft](https://w3c.github.io/core-aam/)
  * [Issue Repository](https://github.com/w3c/core-aam)
* HTML Accessibility API Mappings (html-aam)
  * [Spec](html-aam/index.html)
  * [Editor's Draft](https://w3c.github.io/html-aam/)
  * [Issue Repository](https://github.com/w3c/html-aam)
* Digital Publishing WAI-ARIA Module (dpub-aria)
  * [Spec](dpub-aria/index.html)
  * [Editor's Draft](https://w3c.github.io/dpub-aria/)
  * [Issue Repository](https://github.com/w3c/dpub-aria)
* Digital Publishing Accessibility API Mappings (dpub-aam)
  * [Spec](dpub-aam/index.html)
  * [Editor's Draft](https://w3c.github.io/dpub-aam/)
  * [Issue Repository](https://github.com/w3c/dpub-aam)
* Graphics WAI-ARIA Module (graphics-aria)
  * [Spec](graphics-aria/index.html)
  * [Editor's Draft](https://w3c.github.io/graphics-aria/)
  * [Issue Repository](https://github.com/w3c/graphics-aria)
* Graphics Accessibility API Mappings (graphics-aam)
  * [Spec](graphics-aam/index.html)
  * [Editor's Draft](https://w3c.github.io/graphics-aam)
  * [Issue Repository](https://github.com/w3c/graphics-aam)
* SVG Accessibility API Mappings (svg-aam)
  * [Spec](svg-aam/index.html)
  * [Editor's Draft](https://w3c.github.io/svg-aam/)
  * [Issue Repository](https://github.com/w3c/svg-aam)
* MathML Accessibility API Mappings (mathml-aam)
  * [Spec](mathml-aam/index.html)
  * [Editor's Draft](https://w3c.github.io/mathml-aam/)
  * [Issue Repository](https://github.com/w3c/mathml-aam)
* Portable Document Format Accessibility API Mappings (pdf-aam)
  * [Editor's Draft](https://w3c.github.io/pdf-aam/)
  * [Issue Repository](https://github.com/w3c/pdf-aam)

In addition to these specifications, there are other deliverables as specified in the [ARIA Charter](https://www.w3.org/2025/01/aria-charter.html). Please file issues in the repository specific to the specification or deliverable to which the issue applies.

## Contributing to this Repository

Please review the [ARIA Process Document](documentation/process.md) for information about how the working group tracks issues and pull request.

### Role of Editors

Only formally designated editors have commit access to this repository. Editors are designated by the Working Group Chair and make the following commitments:

* Execute the consensus of the Working Group regardless of personal opinion;
* Seek Working Group review of substantive technical issues;
* In good faith separate editorial issues, which may be addressed without explicit review requests, from substantive issues which require review;
* Follow the [W3C Manual of Style](https://www.w3.org/Guide/manual-of-style/) and the [Chicago Manual of Style](https://www.chicagomanualofstyle.org/);
* Follow [W3C Editors](https://www.w3.org/Guide/editor/) guidelines.

### Non-Editor Contributions

Working Group participants and members of the public without commit privileges may contribute to this repository in the following ways:

* Raise [issues](https://github.com/w3c/aria/issues/).
* Submit [pull requests](https://help.github.com/articles/using-pull-requests/).

Issues can be assigned to people who are members of the [ARIA Contributors](https://github.com/orgs/w3c/teams/aria-contributors) team. If you are an ARIA Working Group participant and need access, ask [Daniel Montalvo](mailto:dmontalvo@w3.org).

When preparing GitHub pull requests:

* Provide a complete summary and description for each pull request. The Working Group needs to understand the rationale for proposed changes. This description may need to be very detailed in some cases, or may be quite brief, for example if providing a change to address a spelling issue.
* Following the editorial documentation below will help prepare a pull request that is ready for inclusion with minimal editing.
* Keep it up-to-date with the base branch, for example by selecting "rebase" under the "Update branch options" menu on the GitHub web interface.

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

```js
// Spec URLs
ariaSpecURLs: {
  "FPWD": "http://www.w3.org/TR/wai-aria-1.3/",
  "ED": "http://w3c.github.io/aria/aria/aria.html",
  "WD": "http://www.w3.org/TR/wai-aria-1.3/",
  "CR": "http://www.w3.org/TR/wai-aria/"
  "CRD": "http://www.w3.org/TR/wai-aria/"
  "PR": "http://www.w3.org/TR/wai-aria/",
  "REC": "http://www.w3.org/TR/wai-aria/"
},
```

Note that even though some of these URIs are redundant, they must all be defined to work in all circumstances. If a document is a First Public Working Draft but the FPWD variant isn't defined, there won't be a match with the `specStatus` and the links won't work.

The following properties for cross references are currently available:

* `ariaSpecURLs`: for the main ARIA spec
* `coreMappingURLs`: for the Core AAM
* `accNameURLs`: for the AccName AAM
* `htmlMappingURLs`: for the HTML AAM
* `dpubModURLs`: for DPUB ARIA
* `graphicsModURL`: for Graphics ARIA
* `graphicsMappingModURL`: for Graphics AAM
* `practicesURL`: for Practices

The task of fixing up links is done by a script that needs to be hooked in via the following line in the respecConfig:

```js
preProcess: [ linkCrossReferences ]
```

Once all this is defined in the `respecConfig`, use the `class` attribute on the links to activate the script for that link. The value of the `href` should be the fragment you want to target, i.e,. the hash tag and fragment ID. For example, a link to the list of roles in the ARIA spec would be:

```html
<a href="#role_definitions" class="specref">ARIA roles</a>
```

If you want to target the main spec, leave the href blank (but present). If you want other classes on the link, e.g., for styling, provide them after the script-hooking class, for instance `class="specref role-reference"`.

The set of class values currently defined are:

* `role-reference`: ARIA role definitions
* `state-reference`: ARIA state definitions
* `property-reference`: ARIA property definitions
* `specref`: other ARIA references
* `core-mapping`: the Core AAM
* `accname`: the AccName AAM
* `html-mapping`: the HTML AAM
* `dpub-role-reference`: DPUB-ARIA role definitions
* `dpub-property-reference`: DPUB-ARIA property definitions
* `dpub-state-reference`: DPUB-ARIA state definitions
* `dpub`: other DPUB-ARIA references
* `graphics-role-reference`: Graphics-ARIA role definitions
* `graphics-property-reference`: Graphics-ARIA property definitions
* `graphics-state-reference: Graphics-ARIA state definitions
* `graphics-role-mapping`: Graphics role mapping
* `graphics-property-mapping`: GRAPHICS property mapping
* `graphics-state-mapping`: GRAPHICS staet mapping
* `graphics-mapping`: other GRAPHIC mapping references
* `graphics`: other Graphics-ARIA references
* `practices`: ARIA Practices

#### References to Other W3C Specs

When referencing other W3C specifications such as <a
href="https://html.spec.whatwg.org/">HTML</a> and <a
href="https://dom.spec.whatwg.org/">DOM</a>, we can take advantage of ReSpec’s
<a href="https://github.com/speced/respec/wiki/xref">`xref`</a> feature to
automatically generate canonical links in context.

In the text below, for example, `xref` will automatically convert “`[^button^]`”
into a link to the definition of the `<button>` element in the HTML
spec:

```html
A [^button^] performs an operation when pressed.
```

When authoring text for the ARIA spec, you can [search `xref`’s collection of
exported terms](https://respec.org/xref/) to find the correct syntax for the
desired specification. By default, the ARIA spec’s `xref` configuration will
attempt to resolve terms for the following specs:

- [DOM](https://dom.spec.whatwg.org/)
- [HTML](https://html.spec.whatwg.org/)
- [Accessible Name and Description
  Computation](https://www.w3.org/TR/accname-1.2/)
- [Core Accessibility API Mappings](https://www.w3.org/TR/core-aam-1.2/)
- [Infra](https://infra.spec.whatwg.org/)

If you wish to reference a spec that is not included in ARIA’s default `xref`
configuration, you must specify it with a `data-cite` attribute.  For example,
the following markup references [“nullable
type”](https://respec.org/xref/?term=nullable+type) and
[“DOMString”](https://respec.org/xref/?term=DOMString) from the Web IDL spec:

```html
<section data-cite="webidl">
    <p>
        All ARIA attributes reflect in IDL as [=nullable type|nullable=]
        {{DOMString}} attributes.
    </p>
</section>
```

In this example, "nullable" will show up in the spec text as a [ReSpec alias](https://respec.org/docs/#aliases-and-synonyms) for "nullable type" in the WebIDL spec. Aliases can only be provided for [concepts in spec](https://respec.org/docs/#concept-shorthands) (such as terms) and are helpful when you'd like the visible text for a ReSpec link to be different than the term being linked. Please note that it is not currently possible to provide an alias for an interface (e.g., #element in the DOM spec).

In some cases, a term may be defined in multiple specifications with the same
`xref` syntax.  For example, [“`[=range=]`” is defined in both the DOM and
Internationalization Glossary specs](https://respec.org/xref/?term=range). The
`data-cite` attribute can also be used in these cases to disambiguate and target
the intended spec.

For more information, please refer to [`xref`’s auto-linking external references
guide](https://github.com/speced/respec/wiki/Auto-linking-external-references).

### Shared Resources

The ARIA repositories share a common set of resources to reduce redundancy. Shared resources are in the [common](./common/) directory, and copied to every child spec at built time.

### Special Structures

Todo: special characteristics table classes etc. used by the script

### Editors' Drafts

Official editors' drafts are published to  [https://w3c.github.io/<shortName>/], where `shortName` is the value of `respecConfig.shortName` for each of the specs. This URIs are suitable for public references. Documents published to those locations are *static* snapshots from the Respec processor. This is to minimize load time for consumers of these drafts. Editors' drafts are automatically updated (if there are no errors) by GitHub actions run when commits are pushed to the main branch.

### How ARIA Extension Specs are Built

An extension spec is one that defines additional roles, states, and / or properties that augment
the collection defined in the core ARIA specification (index.html). Extension specs must be
built in conjunction with the W3C ARIA WG if any new roles are to be in the default vocabulary space
(http://www.w3.org/1999/xhtml/vocab).

When building an extension spec, use the boiler plate provided in aria/template.html as a basis.  

Note that this template uses the aria/script/ariaChild.js script.  That script knows how to incorporate
information from the core ARIA specification into the extension spec so that new roles, states, and properties
are well integrated into the overall ARIA taxonomy.

The ariaChild.js script relies upon an input script (aria/script/roleInfo.js).  As of today, that file is not automatically generated.
If you want to ensure the file is up to date, access the core ARIA spec with the special query string "#saveRoles"
from a browser on a client that has write access to the copy of the extension spec you are editing. When the dialog appears, click
the save button and tell your browser to save the roleInfo.js file into the [common/script](./common/script directory.

### Style guidelines

#### Document style

* There should always be introductory content before starting subsections.
* Sequences of steps use ordered lists, the first paragraph of which labels the step and is in a `<stron>`; subsequent block elements are the content for the step.
* Preformatted examples should "pretty-print" the example to be less than 80 characters wide, and indent the code using 2 space characters per indent step. Wrap within an element tag with an extra indent. Use line break characters, not `<br/>` elements, for new lines. Add extra line spacing as useful. They use the class "example". Use the Code Sample Expander tool to assist with this.
* Keyboard characters should be in `<kbd>` elements.
    * Spell out keys such as "control", "shift", "command", "option", "alt", "insert", "pageup", "enter", etc.
    * Use plus as delimiter for keys that are pressed together, e.g., control+v
    * Use comma as delimiter for keys that are pressed in sequence, e.g., insert, m
* Language elements should be in `<code>` elements.
* The first reference in a section to a role or state should be linked to the role or state with the appropriate class. Subsequent references needn't be referenced, but may be in certain circumstances.
* Repeated links to aria features should just be in `<code>`, not in cross-reference links (just link first time)
* Headings use title case.
* "step" headings, the bold sentence at the start of a numbered list item in a list of steps, are sentence case and not marked as an actual hx element. They should summarize what the following paragraphs get into.
* Subheadings: only use sub-headers (`<h{x+1}> following `<hx>) if there are at least two of them. If there isn't more than two sub-sections, it isn't a sub-section and should be integrated into the parent section.
* Lists: only use lists of two or more items. If it's only one item, it isn't a list and should have a different semantic.
* Terms like "Web" are capitalized when it's "the Web", but not when referring to "web applications". Same for "internet, rich internet applications".
* Synopsize the meaning of abbreviations and glossary terms the first time they are used in a section.
* Acronyms we don't expand (but wrap in `<abbr>` elements):
    * API
* Acronyms we do expand (don't use the acronym)
    * RIA (use rich internet application)
    * AT (use assistive technology)
* Cross reference links don't include section numbers.
* Refer to states and properties in prose as "attributes", not as "states" or "properties" in order to be less confusing. (though they're still formally states or properties)

#### Preferred terminology

* When referring to an instance of a role, use "element with a role of X", not "X role" or "X element". "X role" refers to role in the taxonomy itself; "X element" is not technically meaningful.
* "Assistive technologies" is plural, not singular.
* If in doubt as to when to use "ARIA" or "WAI-ARIA", see [use of ARIA as   word instead of abbreviation](https://github.com/w3c/aria/discussions/2441)
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
* Documents use the [HTML Polyglot](https://www.w3.org/TR/html-polyglot/) syntax to allow XML-based tools to process them and help catch errors caused by markup ambiguities.
* Documents do not have [broken links or unnecessary redirects](http://validator.w3.org/checklink)
* Spelling / typos
* Consistent use of approved spellings when multiple are possible

### Semi-Automated Checking

There was some automated checking available, previously run by XSLT. This feature may be restored. This report helped determine the following potential issues:

* When inheritance of roles change, the states they support may change. The tools will indicate when there is a change of supported states by comparison to an earlier version of the spec. It is a manual decision whether the changes are desired or if the set of supported states needs to be updated.
* Ensure that supported state not defined if the state is also inherited
* Check that the role spec and the UML Class Diagram express the same thing
* Roles list only supported states that are defined
* States indicate applicability only to roles that are defined
* Roles and states cross reference each other: roles indicate supported states, and those states indicate applicability to those roles; discrepancies called out for manual attention
## The default branch has been renamed

If you have a local clone, run the following commands to update the name of the default branch.

s```
$ git branch -m master main
$ git fetch origin
$ git branch -u origin/main main
```

