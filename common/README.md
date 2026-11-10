# ARIA Common Files

[This is the repository for aria-common](https://github.com/w3c/aria-common). It contains files shared by several other ARIA repositories, and copied into those repositories. Note *content must be updated in w3c/aria-common*; changes made in copies are overwritten next time content from this repository is synced.

Resources in the common files:

## Terms

Most terms are in the main ARIA specification and should be linked to either using special classes (more of this below) or using respec functionality. If you want to add a term scoped across the whole ARIA suite, add it to the ARIA main spec. Only add terms to child specs if their scope is restricted to that particular spec.


This includes the terms file and filters it to only output ones that are referenced in that particular specification.

## Bibliography

ReSpec now resolves most of the bibliography references through [SpecRef](https://www.specref.org/). Use existing SpecRef keys directly, including versioned keys when a particular specification version is required.

Add only references missing from SpecRef to the shared [biblio.js](biblio.js). Do not duplicate these entries in individual specification directories.

The script assigns `respecConfig.localBiblio` directly. Load it after defining `respecConfig`. Use `defer` when placing it before the inline configuration:

```html
<script src="../common/biblio.js" class="remove" defer></script>
```

## Images, CSS, and Scripts

The `common` directory also contains shared images, CSS, and scripts. Some of the scripts extend the Respec formatting processor, and others are meant to be used with the final output version. When a resource is, or is likely to be, shared, put it in the common directory. Resources specific to a particular specification, including overriding CSS, can be placed in the directory for that specification. Use the same sub-directory structure of `img`, `css`, and `script` to help keep files organized.
