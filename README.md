aria
====

Accessible Rich Internet Applications (WAI-ARIA)

Editorial Documentation
====

The following documentation to help editors ensure consistency will be expanded here:

* role name patterns
* how to use the taxonomy to extend roles effectively
* which components of role documentation are generated automatically what needs to be done manually
* how the ¨tying together script¨ works
* when casing is relevant, casing preferences
* where things are the same across different areas, and where they should be treated differently
* which pieces in the tables are automatically populated and should be left alone
* which pieces need to be filled in to trigger script

How ARIA Extension Specs are Built
====

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
