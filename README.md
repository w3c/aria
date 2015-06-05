# Accessible Rich Internet Applications (WAI-ARIA)

## Editorial Documentation

The following documentation to help editors ensure consistency will be expanded here:

* role name patterns
* how to use the taxonomy to extend roles effectively
* which components of role documentation are generated automatically what needs to be done manually
* how the ¨tying together script¨ works
* when casing is relevant, casing preferences
* where things are the same across different areas, and where they should be treated differently
* which pieces in the tables are automatically populated and should be left alone
* which pieces need to be filled in to trigger script

## Special Elements and Classes

### Role, State, and Property References

The ARIA spec allows easy generation of links to roles, states, and properties, with the right link and styling. Simply enclose the name of the role, state, or property in the following elements:

* `<rref>` for roles
* `<sref>` for states
* `<pref>` for properties

Note: this only works in the ARIA spec. Other specs must use cross references as defined below.

### References to Other ARIA Specs

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

## Shared Resources

### Terms

The specifications share a common set of term definitions, located in [common/terms.html](common/terms.html). Add and update terms there, keeping in mind your edits will affect all specifications. To use the terms, at the place you want the terms to be included, provide the following line:

```
<div data-include="../common/terms.html" data-oninclude="restrictReferences"></div>
```

This includes the terms file and filters it to only output ones that are referenced in that particular specification.

### Bibliography

The Respec processor loads a bibliography called [Specref](https://github.com/tobie/specref). This resource automatically includes most publications that have been published to the W3C Technical Reports page. While it is possible to request additions to this via pull requests, in practice to use references that are not in that database, it is easier to use a [`localBiblio`](https://github.com/tobie/specref). This allows the Respec configuration to load additional bibliographic entries, structured in the same way as in Specref.

Many of the supplementary bibliographic entries needed for the ARIA publications are common to several specifications. Therefore the bibliographic entries are all stored in [common/biblio.js](common/biblio.js). This is loaded with the other scripts at the top of the file with the following line:

```
<script src="../common/biblio.js" class="remove"></script>
```

In the respecConfig, instead of providing the set of bibliographic entries directly, simply reference the object created by that script:

```
localBiblio: biblio,
```

### Images, CSS, and Scripts

The [common](common) directory also contains shared images, CSS, and scripts. Some of the scripts extend the Respec formatting processor, and others are meant to be used with the final output version. When a resource is, or is likely to be, shared, put it in the common directory. Resources specific to a particular specification, including overriding CSS, can be placed in the directory for that specification. Use the same sub-directory structure of `img`, `css`, and `script` to help keep files organized.

## Special Structures

Todo: special characteristics table classes etc. used by the script

## Generating Editors' Drafts

Official editors' drafts are published to a URI beginning with https://w3c.github.io/aria/. This URI is suitable for public references. Documents published here are *static* snapshots from the Respec processor. This is to minimize load time for consumers of these drafts.

It is desired to automate publishing to this URI when commits are pushed to the server, and there are actions items open for this, but that feature does not exist yet. Editors can manually generate the editors drafts using the following procedure:

* Push your edits to the server. Take note of the relative path of the document and branch name (usually master).
* On your local machine, change to the gh-pages branch.
* Point your browser to the rawgit URI for the document. This is https://rawgit.com/w3c/aria/{branch}/{path}.
* Use the "ReSpec" button to "Save Snapshot", choose "Save as HTML", and save the file in the appropriate location for the editors' draft.
* Commit that change to your local github branch and push that to the server. That puts the static snapshot in the location known by the github.io URI.
* On your local machine, switch back to the branch in which you were editing.

## How ARIA Extension Specs are Built

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
