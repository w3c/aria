# ARIA IDL

## IDL (Interface Definition Language) Overview
### What is IDL (Interface Definition Language)?
-   IDL (Interface Definition Language) is broadly used to define object interfaces in computing. On the web, Web IDL is “used to describe interfaces that are intended to be implemented in web browsers” and “...provides a syntax for specifying the surface APIs of web platform objects, as well as JavaScript bindings that detail how those APIs manifest as JavaScript constructs.”([Web IDL Section 1. Introduction](https://webidl.spec.whatwg.org/#introduction))
-  Interfaces
    -   The HTML DOM API is a good example: all HTML elements (e.g., `<button>`, `<a>`, `<input>`) extend the [`Element interface`](https://dom.spec.whatwg.org/#interface-element) and inherit IDL attributes/functions from `Element` which allow us to interact with objects via JavaScript. For a `<button>`, we can access its properties (e.g., `myButton.id`) and also functions (e.g., `myButton.getAttribute()`)
    -   Web IDL describes how these APIs should be implemented and accessed via JavaScript
-   Separates HTML (markup) and the DOM (live tree)
    -   HTML represents the initial page content, returned from a server, and it is parsed to generate the DOM tree. HTML markup defines an initial, static state of a webpage
    -   The DOM (or DOM tree) is a live, browser-generated, in-memory representation of a document which can be accessed/manipulated via APIs, of which the most popular are web APIs using JavaScript
-   Content vs. IDL attributes
    -   The “source” HTML markup is made up of ***content attributes*** (e.g., a link’s `href`, an an `<input>`'s `type`)
    -   However, pages change as a result of user interaction, scripts, etc. via JavaScript web APIs. The JavaScript representation of DOM nodes, and their related attributes, are accessed via JavaScript properties (***IDL attributes***). For example, changing `el.id` changes the associated `id` content attribute in HTML markup

See:
-   [Web IDL spec](https://webidl.spec.whatwg.org/)
-   [(MDN) IDL](https://developer.mozilla.org/en-US/docs/Glossary/IDL#)


### What are the benefits of IDL?
-   ***Separation of HTML and DOM***: Provides developers with APIs via JavaScript to easily manipulate content in a dynamic way after webpage and initial markup is served
-   ***Standardization***: Web APIs (e.g., `getAttribute()`) are implemented the same which ensures consistent behavior and usage across browsers
-   ***Language-independent***:
    -   Define interfaces in a way that isn’t tied to a programming language, e.g., could have JavaScript/C++/Python or any other language implementation
    -   Easier to generate bindings (single web IDL spec can be used to generate bindings for multiple languages)
    -   Facilitates cross-language integration (e.g., Python backend can communicate with JavaScript frontend)
-   ***Feature detection***: If (el.someIDLAttribute) is true, then the feature is supported which facilitates user agent detection for that particular attribute
-   ***Type safety***:
    - IDL defines types for properties/methods
    -   Can ensure that only valid data types are passed/returned from APIs which helps with catching errors
    -   For example, the [<input> element’s DOM interface](https://html.spec.whatwg.org/#the-input-element) contains a disabled boolean attribute
-   ***Easier binding***:
    -   IDL describes a higher-level, “abstract” and language-independent description of APIs
    -   Can easily generate bindings to bridge concrete implementation with API definition
-   ***Interoperability***: An interface defined in IDL can be implemented in C++ (by a browser engine) and used by a JavaScript application
-   ***Documentation***:
    -   Specifies how web APIs should behave for both browser implementers and developers
    -   Interfaces are largely self documenting
-   ***Backwards compatibility***: Can add new properties/methods without breaking backwards-compatibility

### How IDL works
-   Browser IDL implementation
    -   Web IDL describes “the types, interfaces, and properties that a web API should expose to JavaScript”
    -   Browsers parse the IDL definitions and specifically, interfaces, attributes, methods, and how they map to actual JavaScript objects. See [WebKit AriaAttributes.idl](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/accessibility/AriaAttributes.idl)
    -   Bindings connect the C++ implementation with JavaScript engine; bindings are generated automatically by browser from IDL files (essentially a bridge between the browser’s internal representation and the JavaScript engine)
    -   Importantly, these bindings ensure that JavaScript code can interact with the DOM objects in a way that aligns with IDL specifications. For example, IDL attributes are property accessors for DOM nodes (e.g., el.type=”text” where type is the IDL attribute)
-   How IDL works
    -   Browsers parse the HTML document and generate the DOM tree; this is an internal, live representation of the document. The internal representation comprises different node types (e.g., element node, attribute node, text node)
    -   For each node in the DOM tree, browsers generate a JavaScript object that wraps the internal (C++) representation
-   There are two ways to interact with the DOM that do the same thing in different ways:
    -   Directly accessing DOM nodes (and their [NamedNodeMap](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap) of attributes for element nodes). For example, el.getAttribute(“some-attr”) directly accesses the NamedNodeMap in the DOM tree
    -   Via the JavaScript representation/object for the element, such as el.someAttr. Importantly, the JavaScript object is a representation of the DOM node but it is separate from the DOM tree node’s internal representation
-   Engine-specific IDL details
    -   [WebKit IDL explainer](https://trac.webkit.org/wiki/WebKitIDL)
    -   [Gecko Web IDL bindings](https://firefox-source-docs.mozilla.org/dom/webIdlBindings/index.html)
    -   [Web IDL in Blink](https://www.chromium.org/blink/webidl/); [Blink IDL extended attributes](https://chromium.googlesource.com/chromium/src/+/main/third_party/blink/renderer/bindings/IDLExtendedAttributes.md#Reflect)
-   Serves as a code generator tool for browsers, not as an interface specification language for web developers

## ARIA IDL Overview

### ARIA IDL definition

See [ARIAMixin interface](https://dontcallmedom.github.io/webidlpedia/names/ARIAMixin.html).

### ARIA IDL files for major browsers

- WebKit
    -   [AriaAttributes.idl](https://github.com/WebKit/WebKit/blob/254e464e3d71ed07ac4bd8f05e6a236f757459b0/Source/WebCore/accessibility/AriaAttributes.idl)
    -   [AccessibilityRole.idl](https://github.com/WebKit/WebKit/blob/254e464e3d71ed07ac4bd8f05e6a236f757459b0/Source/WebCore/accessibility/AccessibilityRole.idl)
- Gecko
    -   [AriaMixin.idl](https://searchfox.org/mozilla-central/source/dom/webidl/ARIAMixin.webidl)
- Chromium
    -   [accessibility_role.idl](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/dom/accessibility_role.idl)
    -   [aria_attributes.idl](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/dom/aria_attributes.idl)
    -   [aria_relationship_attributes.idl](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/dom/aria_relationship_attributes.idl)

### Understanding ARIA reflection

Every ARIA content attribute reflects as one of the following types:
-   `DOMString?`

**Scenario**|**Content attribute value**|**IDL attribute value**
:-----|:-----:|:-----:
***Content attribute is missing***|null|null
***Content attribute is set to empty string***|empty string|empty string
***Content attribute is set to “undefined” string***|"undefined"|"undefined" (the string)
***Content attribute is set to any string value (i.e., “true”)***|"true"|"true"

-   `FrozenArray<E>?`

**Scenario**|**Content attribute value**|**IDL attribute value**
:-----|:-----:|:-----:
***Content attribute  is missing***|null|null
***Content attribute is set to empty string***|empty string|Empty array
***Content attribute is set to element ‘id’s (i.e., “label1 label2”)***|"label1 label2"|Array of element nodes = [label1 element, label2 element]


-   `Element?`

**Scenario**|**Content attribute value**|**IDL attribute value**
:-----|:-----:|:-----:
***Content attribute is missing***|null|null
***Content attribute is set to empty string***|empty string|null
***Content attribute is set to valid element ‘id’ (i.e., “tab1”)***|“tab1”|Element node associated with “tab1”

## ARIA IDL history

### Key decisions

-   Around 2018, the ARIA WG began formally working on incorporating reflection in the ARIA spec long after the concepts of content attributes types (e.g., enumerated, boolean attributes), relationships between content/IDL attributes and synchronizing the two (i.e., reflection) became clearly defined in HTML spec.
-   Initial efforts to define ARIA IDL behavior, and general treatment by browsers, presented numerous challenges that persist today, i.e.,:
    -   IDL-ifying ARIA states/properties came after HTML5’s categorization and taxonomy for content attribute types (and their mapping to corresponding JavaScript properties). Thus, where most HTML attributes align neatly into a content attribute type within the HTML system (e.g., enumerated, boolean), ARIA attributes are unique in their usage;
        -   e.g., supporting an explicit “undefined” state that is distinct from a content attribute’s absence (e.g., aria-orientation), content attributes that aren’t fully boolean but boolean-like (e.g., aria-checked which supports true/false/mixed),
        -   default values that are linked to an element’s role (called “implicit value”), and
        -   and content attributes that don’t fit within existing IDL attribute types (e.g., ariaRelevant)
    -   Due to the above, and ARIA historically being widely used without IDL (and alongside HTML with its robust reflection system), there was/is a strong desire to not break web compatibility. Aligning with HTML’s reflection approach is challenging because, where ARIA IDL diverges from ARIA HTML usage, this could 1) subvert existing developer expectations and understanding of how ARIA states/properties are implemented and 2) negatively impact the accessibility of existing pages in which ARIA is used
    -   HTML has a tightly coupled, well-defined relationship between its content attributes and corresponding IDL attributes (JavaScript properties) because reflection is defined in (and for) the HTML spec. However, ARIA is a specification to “augment semantics in supporting languages…like HTML” (see [ARIA 1.4 Co-evolution of WAI-ARIA and Host Languages](https://w3c.github.io/aria/#co-evolution)).
    -   HTML is only one host language with which ARIA can be used; others include SVG, MathML, etc. The need for ARIA to remain flexible/predictable in its usage, and in different host language contexts, is a priority

Since initial efforts in 2018 to codify ARIA IDL, the ARIA WG and standards community made the following key decisions that have resulted in the current ARIA IDL spec we have today and reflection via one of the following three IDL attribute types:
-   `Element?` - Rather than reflecting a simple data type (e.g., boolean, string), nullable Element? allows reflection of an element object (i.e., a weak reference to another DOM element or the null value).
    -   The ability to specify an IDL attribute with IDREFs was formalized in HTML spec in June 2022 (see [HTML PR #7934](https://github.com/whatwg/html/pull/7934)) and this capability aligned well with reflecting [ariaActiveDescendantElement](https://w3c.github.io/aria/#dom-ariamixin-ariaactivedescendantelement).
    -   At one point, [aria-errorMessageElements](https://w3c.github.io/aria/#dom-ariamixin-ariaerrormessageelements) also reflected as Element? However, it was changed to `FrozenArray<Element>` to support multiple IDs in alignment with the ARIA content attribute aria-errormessage which also changed to allow multiple IDs (see [ARIA #1730](https://github.com/w3c/aria/issues/1730)).
-   `FrozenArray<Element>?` - The `FrozenArray<Element>` IDL type was codified in HTML spec at the same time as Element? and represents an immutable array of Element objects. More precisely, HTML IDL supports `FrozenArray<T>` where T is an object of type Element (or extends the Element interface)
    -   This IDL attribute type was deemed desirable and a good fit for the following ARIA attributes that take a set of IDREFs: aria-controls, aria-describedby, aria-details, aria-flowto, aria-labelledby, aria-owns.
    -   Originally, the ARIA WG floated the idea of using simple DOMString or DOMTokenList (e.g., classList) for the above ARIA attributes however, the `FrozenArray<Element>` type came along around 2022 and was determined to be superior because it is immutable and read-only
-   `DOMString?` - The vast majority of ARIA IDL attributes are type nullable DOMString (DOMString?). The DOMString? type simply holds a string or the null value.
    -   The general usage of nullable DOMString? over non-nullable DOMString is important in ARIA because:
        -   DOMString? allows for determining behavior when an attribute is absent. For example, if aria-hidden is not set, it’s the user agent’s responsibility to determine the element’s hidden state. Generally, many ARIA states/properties don’t easily map to existing IDL attribute types or don’t easily conform with current HTML-based IDL get/set algorithms because of the greater complexity in determining what the default should be in the attribute’s absence, e.g., aria-orientation maps loosely to an enumerated attribute but its missing value default is aria-orientation=’vertical” for role=”scrollbar” and aria-orientation=”horizontal” for menubar. Nullable DOMString allows greater flexibility in determining what “undefined” means for ARIA states/properties
            -   This is further complicated because some ARIA states/properties have an “[implicit value for role](https://w3c.github.io/aria/#implictValueForRole)” which is unrelated to reflection and represents a default value assignment that depends on the element’s configuration (e.g., role, other ARIA attributes)
        -   Non-nullable DOMString doesn’t work for numeric ARIA values because it would require defaults which don’t universally apply (e.g., aria-valuemin/aria-valuemax doesn’t make sense on an indeterminate progressbar)
        -   By 2021, around the time of ARIA v1.2, the ARIA WG agreed to match what browsers were actually doing, i.e., using nullable DOMString? albeit this reflection style not fully aligning with HTML reflection (i.e., ARIA content attributes were not fully defined as enumerated/boolean attributes which is a requirement for HTML DOMString? reflection). This is why the spec currently states: “Return the value of the attribute if present and null otherwise." ([see James C.’s comment for ARIA #1598](https://github.com/w3c/aria/issues/1598#issuecomment-931775661)). Browser engines were/are performing a significant degree of “validating” ARIA attributes and this “reflection” was then documented in the ARIA spec. The usage of nullable DOMString provided flexibility in how ARIA states/properties are handled by browsers and subsequently, how this information is passed downstream to accessibility APIs
    -   Challenges with particular ARIA attributes that were changed to nullable DOMString? but were previously something else (mostly captured in this [ARIA #691 comment](https://github.com/w3c/aria/issues/691#issuecomment-385872627))
        -   Long - Long does not support being nullable, so the following ARIA attributes were changed: ariaColCount, ariaColIndex, ariaColSpan, ariaLevel, ariaPosInSet, ariaRowCount, ariaRowIndex, ariaRowSpan, ariaSetSize
        -   Double - Double-to-string conversion can be lossy/imprecise, so these were changed: ariaValueMax, ariaValueMin, ariaValueNow. Specifically for ariaValueNow, the recommended pattern for indeterminate progress bars was to leave out the aria-valuenow content attribute, making it nullable, which cannot be reflected in IDL

 ***Note***: The ariaRelevant IDL attribute was removed in ARIA 1.2 due to difficulty in aligning it with an existing IDL attribute type (and the fact that it is an irregular attribute in general); see [ARIA #1267 - Reinstate ariaRelevant IDL as custom TokenList reflection](https://github.com/w3c/aria/issues/1267). However, it was re-added in Sept 2024 because browsers were already reflecting it (see [ARIA #2326](https://github.com/w3c/aria/pull/2326)).

 ### ARIA IDL history timeline

Rough timeline with important milestones:

-   2018
    -   Up until this point, reflection in ARIA had been discussed and positively received: [ARIA #691 - Add ARIA property string reflection on Element #691](https://github.com/w3c/aria/issues/691)
        -   In #691, James C. formally proposes adding ARIA string reflection for the DOM Element interface
    -   The initial draft of the ARIA IDL addition by James ([13d8157](https://github.com/w3c/aria/commit/13d8157bb6dbb155300efa2bea83171ed8ee6ab9)) proposed that all ARIA attributes were type “DOMString”
        -   Dominec points out that the [reflection must follow DOM spec convention](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflect). He also pointed out that reflection is only valid for certain attribute types which are:
            -   DOMString
            -   DOMString?
            -   USVString
            -   Boolean
            -   Long
            -   Unsigned long
            -   Double
            -   DOMTokenList
            -   `FrozenArray<T>?` (Where T is either Element or an interface that inherits from Element)
        -   Domenic also highlights that ARIA attributes that are reflected as nullable DOMString? should be enumerated attributes (i.e., they are limited to known values, have keywords/states, invalid/missing value defaults). He notes `<area>`’s shape attribute as a good example of an enumerated content attribute: [https://html.spec.whatwg.org/multipage/image-maps.html#attr-area-shape](https://html.spec.whatwg.org/multipage/image-maps.html#attr-area-shape)
        -   Asurkov recommends using DOMTokenList for IDL attributes such as aria-labelledby (it is an ordered property)
    -   In May, [James C. posted an update in ARIA #691](https://github.com/w3c/aria/issues/691#issuecomment-385872627) laying out the reasons against DOMTokenList usage because “there is no IDL-only way to reflect DOMTokenList into a string content attribute”
        -   It was also discussed that DOMTokenList didn’t add as much value for ARIA as it does for CSS (e.g., classList)
        -   Domenic states that the \[Reflect\] is an “implementer-specific technology” that isn’t part of a spec (this is currently true per Anne). He references an issue that is still open today: [HTML #3238 - Formalize content attribute reflection](https://github.com/whatwg/html/issues/3238)
        -   References to \[Reflect\] were eventually removed
    -   In Oct, James C. raised [ARIA #834](https://github.com/w3c/aria/issues/834) related to removing “...the string reflection properties that will be replaced by incompatible element reflection properties”:
        -   `attribute DOMString? ariaActiveDescendant`;
        -   `attribute DOMString? ariaControls`;
        -   `attribute DOMString? ariaDescribedBy`;
        -   `attribute DOMString? ariaDetails`;
        -   `attribute DOMString? ariaErrorMessage`;
        -   `attribute DOMString? ariaFlowTo`;
        -   `attribute DOMString? ariaLabelledBy`;
        -   `attribute DOMString? ariaOwns`;
-   2019
    -   In September, Anne files [ARIA #1058 - ARIAAttributes cannot be nullable](https://github.com/w3c/aria/issues/1058) citing that ARIA seems “...to use HTML's reflect concept and that only works for normal strings, not nullable strings.”
        -   [Dominec recommended the following](https://github.com/w3c/aria/issues/1058#issuecomment-548544675): “At a quick look, it seems like a reasonable fix here would be some glue at the top of the ARIA spec, which says something like "when we have a table enumerating the values for an attribute, then that attribute is an enumerated attribute. When we notate one of the values as (default), then that value is the missing value default and invalid value default for the attribute."”
-   2020
    -   Continuing work on ARIA #1058, [PR #1261](https://github.com/w3c/aria/pull/1261/files) is merged which specified enumerated ARIA attributes/missing value default/invalid value default and closer aligned with HTML reflection. Of note, most ARIA IDL attributes have been made non-nullable
-   2021
    -   As part of addressing Joan Marie’s [ARIA #1598 - Updating ARIA 1.2 due to IDL implementations (exit and re-enter CR?)](https://github.com/w3c/aria/issues/1598), IDL attributes were returned to being nullable due to several reasons:
        -   Engines had already implemented validation by the backing accessibility object (see [James C. comment](https://github.com/w3c/aria/issues/1598#issuecomment-929645188))
        -   Aligning with HTML reflection would be non-trivial
        -   Per Domenic, “"Return the value of the attribute if present and null otherwise" was agreed upon since validation (not at the IDL layer) was taking place however, there appears to have been consensus that in ARIA 1.3 (or later), that attributes would become non-nullable DOMString
-   2022
    -   In April, James C. added \[CEReactions\] to the ARIA mixin interface as part of [ARIA #1242 - ARIA IDL miss CEReaction attribute](https://github.com/w3c/aria/issues/1242)
        -   The \[CEReactions\] web IDL attribute ensures that custom elements trigger the appropriate callbacks (e.g.. attributeChanged) and maintain expected behavior
    -   In May, Anne filed [ARIA #1272 - AccessibilityRole's role should probably not be nullable](https://github.com/w3c/aria/issues/1272)
        -   The role IDL attribute was changed from DOMString? -> DOMString
-   2023
    -   `Element`/`FrozenArray<Element>` reflection is now defined in HTML spec, so the following were re-added per [PR #1755](https://github.com/w3c/aria/commit/3e192b4cd884d9b5c5a81afc40ee8374f7b50f67):
        -   `attribute Element? ariaActiveDescendantElement`
        -   `attribute FrozenArray<Element> ariaControls`
        -   `attribute  FrozenArray<Element>ariaDescribedByElements`
        -   `attribute  FrozenArray<Element> ariaDetailsElements`
        -   `attribute  Element? ariaErrorMessage`
        -   `attribute  FrozenArray<Element> ariaFlowTo`
        -   `attribute  FrozenArray<Element> ariaLabelledBy`
        -   `attribute  FrozenArray<Element> ariaOwns`
    -   ariaErrorMessage is changed from `Element?`  To `FrozenArray<Element>?`

### Understanding "undefined" (the string) vs. `undefined` reflection

The term "undefined" has two different meanings:
-   In the context of JavaScript programming, `undefined` is a primitive type that means a variable hasn't been assigned a value
-   In ARIA, undefined usually means the absence of an attribute however, "undefined" (the string) can also be a permissible attribute value

The following ARIA content attributes explicitly support an "undefined" state in their ARIA "Values" table:

-   [aria-checked](https://w3c.github.io/aria/#aria-checked)
-   [aria-expanded](https://w3c.github.io/aria/#aria-expanded)
-   [aria-hidden](https://w3c.github.io/aria/#aria-hidden)
-   [aria-orientation](https://w3c.github.io/aria/#aria-orientation)
-   [aria-pressed](https://w3c.github.io/aria/#aria-pressed)
-   [aria-selected](https://w3c.github.io/aria/#aria-selected)

Code example: [https://jsfiddle.net/kiyoshisomaal/4tgo9wxv/3/](https://jsfiddle.net/kiyoshisomaal/4tgo9wxv/3/)

For these 6 ARIA states/properties and various undefined assignment techniques:

**ARIA state/property scenario**|**Content attribute value (using `.getAttribute()`)**|**IDL attribute value (JS property)**
:-----|:-----:|:-----:
Content attribute is not present; or content attribute is set but subsequently removed via `removeAttribute()`|`null`|`null` (type = object)
Content attribute is string "undefined"|"undefined"|"undefined" (type = string)
Content attribute is `“”` (empty string)|empty string|empty string (type = string)
Content attribute is "foo"|"foo"|"foo" (type = string)
Content attribute is not present AND corresponding IDL attribute is NOT set|`null`|`null` (type = object)
Content attribute is not present AND corresponding IDL attribute is set to undefined (the value, not the string)|`null`|`null` (type = object)
Content attribute is not present AND corresponding IDL attribute is set to “undefined” (the string)|"undefined"|"undefined" (type = string)
Content attribute is not present AND corresponding IDL attribute is set to “foo”|"foo"|"foo" (type = string)
Content attribute is not present AND corresponding IDL attribute is set to `null`|`null`|`null` (type = object)
Content attribute is not present AND corresponding IDL attribute is set to `“”`|empty string|empty string (type = string)

Takeaways:
-   Safari/Firefox/Chrome all behave similarly. If the content attribute is not set, the IDL attribute is not set, or the IDL attribute is set to `null` or the `undefined` value: `.getAttribute()` returns the value `null` and `el.ariaAttribute` returns the JS `null` object
-   Otherwise, browsers will return the string value of either the content attribute or IDL attribute; e.g., `“”` returns the empty string (JS type string for IDL attribute) or the string value provided (which is always type "string" for IDL attribute even with the string value “undefined” or "null")