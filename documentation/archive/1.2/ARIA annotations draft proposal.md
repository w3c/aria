**Editors Note.** Archived wiki page https://github.com/w3c/aria/wiki/ARIA-annotations-draft-proposal, last edited Jan 10, 2019.

# ARIA annotations draft proposal

# ARIA Annotation use cases, markup and more


## Definitions

Annotations as they relate to ARIA:

*   An _annotation_ is the combination of annotated content and its related annotation body.
*   The _annotated content_ is the range of text or other object which the _annotation body_ is "about". Note: [In the Web Annotations Data Model](https://www.w3.org/TR/annotation-model/#motivation-and-purpose), this is known as the _annotation target_. However, because the term "target" has a specific meaning in accessibility APIs as the end (and not beginning) of a relation, the term annotated content is preferred here, in order to avoid confusion with the actual directionality of aria-details in ARIA annotation markup.
*   The _annotation body_ is visible information within a page which is connected to annotated content for a related purpose.
*   The _annotation purpose_ is the role the _annotation body_ plays in relation to the _annotation target_, e.g. commentary vs. a footnote.


## How do ARIA annotations relate to the Web Annotations Data Model?

ARIA annotations are more limited than what can be expressed in the Web Annotations Data Model.
* They cannot point to information external to the web page
* They must point to additional information within that web the page (e.g. a simple "highlight" does not do this).

In addition, ARIA annotations do not contain as much information. It only contains what is necessary for the identified use cases.

For more information, please see the [Addendum on mapping Web Annotations Data Model to accessible web content](#addendum-mapping-from-the-web-annotations-data-model).

## Web content use cases



*   Document editor
*   Code editor
*   Published content


## Assistive technology use cases

* AT user issues command to navigate to previous/next annotated content (e.g. next commented text)
* AT user issues command to navigate to previous/next annotation body (e.g. next comment)
* AT user issues one of the above commands, but filtered by annotation purpose (e.g. commentary only)
* AT user issues command to navigate from annotation body to the annotated content, or vice-versa
* Screen reader provides viewing options for reading annotation purposes, where the purpose is shortened, e.g. "commentary" becomes "*ct"

### Proposed Markup


*   **aria-details** (required, IDREF)
    *   Goes on the annotated content, and points to the in-page annotation body.
    *   Example: `<mark aria-details="comments">This is commented text</mark>`
    *   No specific tag or role is required. However, it may be desirable to prefer `<mark>` over a generic element such as `<span>` when there is a visible highlight
*   **role** (optional, NMTOKENS) on the annotation body
    *   Goes on the annotation body, describing the annotation purpose. See below for a list of roles and more details.
    *   Example: `<div role="annotation-commentary">`.
    *   As is always the case, multiple roles are supported: if more than one role is provided then the first recognized role may be mapped through accessibility APIs. The most important or specific role should always go first. For example, `<div role="annotation-suggestion annotation-commentary group">` would indicate that there is a suggestion with comments, but some APIs may only expose it as a "suggestion".
*   **`<ins>`**/**`<del>`** (required for the "revision" and "suggestion" annotation purposes)
    *   Provided as children of the annotated content, and define a past change or proposed future change to the document. [TBD] @aleventhal: Alternatively, if/when ARIA provides roles for insertion and deletion, the role attribute could be used instead.
    *   Example: `<p>Everyone is encouraged to bring a <span aria-details="suggestion-info-1"><del>side dish</del><ins>beverage</ins></span> to share.</p>.`
    *   Ordering: the ARIA spec should define whether the order is important for these 1-2 children. I suggest the AT should handle all permutations in the ordering.

In addition, the following markup may be helpful but is not really part of the annotations spec:



*   **aria-label**/**aria-labelledby/aria-describedby** (optional)
    *   If this is found on the annotation body, it could provides a useful label or description for the annotation, that could be presented by a screen reader in a mode where the user wanted to understand more about the annotation bodies in context but the annotation bodies themselves would be too long.


## Roles for annotation purposes

These go on the annotation body, not the annotated content.

All annotation- prefixed roles would inherit from an abstract role of "annotation", which would inherit from "structure". If the role is not provided, then the annotation is simply treated as a description, as it would already be via aria-details usage.


*   **annotation-attribution**— authoring information for the annotated content. [TBD] @mck we may want to choose a better name as this name may ultimately just be used by screen readers and most users might not know what to make of it. [TBD#2] @aleventhal: recommend we make this redundant with annotation-revision, and remove this one.
*   **annotation-commentary**— one or more comments, or a comment thread
*   **annotation-description**  — generic description. This is also the default if the annotation purpose is unspecified. [TBD] @aleventhal: rather than add an extra role here, how about the author simply not use any of the other annotation roles.
*   **annotation-revision** — this is a historical change that has already been accepted. The source annotated content will contain 1-2 children for the insertion and/or deletion.
*   **annotation-suggestion** — proposed edit. The source annotation will contain 1-2 children for the proposed insertion and/or deletion.
*   **annotation-presence** — similar to attribution, but relates to editing that is happening right now. For example, "Mr. Smith is editing nearby".
*   **doc-footnote**/**doc-endnote** for footnotes and endnotes. When using DPUB roles, the annotated content will be the referencing note number. The author may choose to leave out the **doc-noteref** role on the annotated content, as that will be exposed as a link to ATs (see DPUB-AAM), and it may not be a link. In addition, the fact that it is a note reference number is implied by the relation with the annotation body, which will have the doc-footnote or doc-endnote role.

Use the singular form: for consistency, all of the annotation purposes are in the singular form of the word, even though in some cases the plural could have made sense, as in "suggestion" where there may be multiple suggestions.


## Rejected annotation purposes

For now, the following annotation purposes have not been assigned new roles:


*   **highlight**  — this does not fit the proposed definition of an annotation in that it does not point to additional info. Therefore, ARIA WG should consider adding something like role=mark (would need to be added for role parity), or the author can use HTML via <mark>/<em>/<strong>
*   **error** — in code in code editor: use the already supported aria-invalid="true" + aria-errormessage=id
*   **warning**— in code editor: may want to add aria-invalid="warning" as possible value (and like error, can use aria-errormessage=id)
*   **bookmark** — similar to "annotation-presence"; would need more info on this use case in order to support it. [TBD] @aleventhal: Suggest that the author can use `<mark aria-label="Bookmark name">` for a good experience.
*   **breakpoint**— does not always come with additional visible information, so it would be difficult to shoehorn into this use case. [TBD] @aleventhal: For this one, perhaps a `<mark>` or role="mark" or a new role="breakpoint" could be used, along with aria-label. Or, a visible button could be used on the line with the breakpoint, that is labelled as a breakpoint button.


## Platform Accessibility mappings



*   [UI Automation has built-in support for annotations](https://docs.microsoft.com/en-us/windows/desktop/winauto/uiauto-annotation-type-identifiers) — note that a perfect 1 to 1 mapping is not expected here. For example, a grammar error is an annotation in UIA, but in ARIA is aria-invalid="grammar". An important difference with UIA annotations is that ARIA annotations always link to visible in-page content.
*   Most of the markup is reused — there are already known ways for exposing aria-details, aria-label, aria-labelledby, aria-describedby, `<ins>` and `<del>`.
*   For aria-annotation, this should be exposed as an object attribute called "annotation" in ATK/IA2



## Addendum: Mapping from the Web Annotations Data Model

An important use case is to convert annotation data from the Web Annotations Data Model (typically in JSON format) into accessible content, with the goal of enabling AT support. The following are non-normative suggestions for accomplishing this.

### Example 1: Describing a relationship to in-page visible content

Translating a “commenting” motivation in the data model to the appropriate ARIA and HTML markup:

```html
<p>The following cats have been deemed <span aria-details=”comment-thread-1”>uncooperative</span>.</p>
<div id=”comment-thread-1” role=”annotation-commentary”>
<h1>Comment by Ruff Finkledog</h1>
<p>Wouldn’t it be simpler to list the cooperative cats?</p>
</div>
```

### Example 2: Describing a Web Annotation that does not have a relationship to other content

This example is useful for the "highlighting" motivation.

```html
<p>The word <mark>cat</mark> is highlighted</p>
```

### Example 3: Describing a Web Annotation that is related to external content only

This example is useful for the "identifying" motivation.

```html
<p>A <a href="https://en.wikipedia.org/wiki/Cat">cat</a> is one of our favorite quirky pets.</p>
```

### Proposed Mapping Table
<table>
  <tbody>
    <tr>
      <td>
        <p>Web Annotations Data Model Concept</p>
      </td>
      <td>
        <p>Proposed &nbsp;additional markup on annotation</p>
      </td>
      <td>
        <p>Proposed markup on annotated content</p>
      </td>
      <td>
        <p>Description</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Assessing motivation</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-commentary&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
      </td>
      <td>
        <p>The motivation for when the user intends to assess the target resource in some way, rather than simply make a comment about it. For example to write a review or assessment of a book, assess the quality of a dataset, or provide an assessment of a student's work.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Bookmarking motivation</p>
      </td>
      <td>
        <p>none</p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
      </td>
      <td>
        <p>The motivation for when the user intends to create a bookmark to the Target or part thereof. For example an Annotation that bookmarks the point in a text where the reader finished reading.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Classifying motivation</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-description&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code> (if classifications visible in page)</p>
      </td>
      <td>
        <p>The motivation for when the user intends to classify the Target as something. For example to classify an image as a portrait.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Commenting motivation</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-commentary&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
      </td>
      <td>
        <p>The motivation for when the user intends to comment about the Target. For example to provide a commentary about a particular PDF document.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Describing motivation</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-description&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
      </td>
      <td>
        <p>The motivation for when the user intends to describe the Target, as opposed to (for example) a comment about it. For example describing the above PDF's contents, rather than commenting on their accuracy.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Editing motivation</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-suggestion&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
        <p>Must also have &lt;ins&gt;, &lt;del&gt; child or both </p>
      </td>
      <td>
        <p>The motivation for when the user intends to request a change or edit to the Target resource. For example an Annotation that requests a typo to be corrected.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Highlighting motivation</p>
      </td>
      <td>
        <p>none</p>
      </td>
      <td>
        <p>Use <code>&lt;mark&gt;</code> or appropriate ARIA role from role parity work once available</p>
      </td>
      <td>
        <p>The motivation for when the user intends to highlight the Target resource or segment of it. For example to draw attention to the selected text that the annotator disagrees with.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Identifying motivation</p>
      </td>
      <td>
        <p>none</p>
      </td>
      <td>
        <p><code>&lt;a href=[IRI]&gt;external link&lt;/a&gt;</code></p>
      </td>
      <td>
        <p>The motivation for when the user intends to assign an identity to the Target. For example to associate the IRI that identifies a city with a mention of the city in a web page.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Linking motivation</p>
      </td>
      <td>
        <p>none</p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
      </td>
      <td>
        <p>The motivation for when the user intends to link to a resource related to the Target.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Moderating motivation</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-commentary&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
      </td>
      <td>
        <p>The motivation for when the user intends to assign some value or quality to the Target. For example annotating an Annotation to moderate it up in a trust network or threaded discussion.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Questioning motivation</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-commentary&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
      </td>
      <td>
        <p>The motivation for when the user intends to ask a question about the Target. For example, to ask for assistance with a particular section of text, or question its veracity.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Replying motivation</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-commentary&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
      </td>
      <td>
        <p>The motivation for when the user intends to reply to a previous statement, either an Annotation or another resource. For example providing the assistance requested in the above.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Tagging motivation</p>
      </td>
      <td>
        <p><code>role=&rdquo;note&rdquo;, e.g. &lt;div role=&rdquo;note&rdquo;&gt;Tags: cats, pets&lt;/div&gt;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code> (if tags are visible in content)</p>
      </td>
      <td>
        <p>The motivation for when the user intends to associate a tag with the Target.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Attribution from provenance chunk</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-attribution&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code> (if attribution is visible in content)</p>
      </td>
      <td>
        <p>Authoring information for the annotated content</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Does not currently exist in Web Annotations Data Model</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-revision&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
        <p>Must also have <code>&lt;ins&gt;</code>, <code>&lt;del&gt</code>; child or both </p>
      </td>
      <td>
        <p>This is a historical change that has already been accepted. The source annotated content will contain 1-2 children for the insertion and/or deletion</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Does not currently exist in Web Annotations Data Model</p>
      </td>
      <td>
        <p><code>role=&rdquo;annotation-presence&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details=[id]</code></p>
      </td>
      <td>
        <p</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Does not currently exist in Web Annotations Data Model</p>
      </td>
      <td>
        <p><code>role=&rdquo;doc-footnote&rdquo; | &ldquo;doc-endnote&rdquo; | &ldquo;doc-biblioentry&rdquo;</code></p>
      </td>
      <td>
        <p><code>aria-details</code></p>
      </td>
      <td>
        <p>In-page links for footnotes, endnotes, bibliographical information in a document</p>
      </td>
    </tr>
  </tbody>
</table>
