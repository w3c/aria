**Editors Note.** Archived wiki page https://github.com/w3c/aria/wiki/Resolving-ARIA-1.1-Combobox-Issues, last edited Jul 20, 2023.

# Resolving ARIA 1.1 Combobox Issues

## Goal

resolve all open combobox-related issues in ARIA 1.2.

## Terms for describing ARIA 1.1 combobox structure

First, here are some terms to make describing problems easier.

The ARIA 1.1 combobox has 3 primary parts:
1. Input: This is an element that conveys the value of the combobox. ARIA 1.1 requires it to be a textbox.
2. Popup: This is a single-select widget that presents a collection of values the user may choose for the input. The popup is displayed when the combobox is expanded and hidden when the combobox is collapsed. ARIA 1.1 allows the popup to be a listbox, grid, tree, or dialog. 
3. Container: a wrapper `div` that has role `combobox` and contains or owns the input and the popup.

Many comboboxes also have a down arrow icon or button that serves as a control for display of the popup for mouse and touch users. That button is not part of the definition of the combobox. If it is inside the container, the authoring practices advise excluding it from the page tab sequence.

Combobox example from ARIA 1.1:

```
<div aria-label="Tag" role="combobox" aria-expanded="true" aria-owns="owned_listbox" aria-haspopup="listbox">
    <input type="text" aria-autocomplete="list" aria-controls="owned_listbox" aria-activedescendant="selected_option">
</div>
<ul role="listbox" id="owned_listbox">
    <li role="option">Zebra</li>
    <li role="option" id="selected_option">Zoom</li>
</ul>
```

You can view an [example of an ARIA 1.1 combobox here](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/combobox/aria1.1pattern/listbox-combo.html).

## ARIA 1.0 Combobox Problem

To understand the ARIA 1.1 combobox issues, it is helpful to first understand what problems we experienced with the ARIA 1.0 combobox.

ARIA 1.0 specifies two parts for the combobox -- the input and the popup. ARIA 1.0 says authors should specify the relationship between the input and the popup with `aria-owns`.

```
<input type="text" aria-label="Tag" role="combobox" aria-expanded="true"
  aria-autocomplete="list" aria-owns="owned_listbox" aria-activedescendant="selected_option">

<ul role="listbox" id="owned_listbox">
  <li role="option">Zebra</li>
  <li role="option" id="selected_option">Zoom</li>
</ul>
```

You can view an [example of the ARIA 1.0 combobox here](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/combobox/aria1.0pattern/combobox-autocomplete-both.html).

Because the input-popup relationship is specified with `aria-owns` in an ARIA 1.0 combobox, in accessibility trees, the popup is a child of the input. In other words, The accessibility tree for an ARIA 1.0 combobox has a textbox with a listbox inside of it. While the role of the textbox is `combobox`, it still functions as a textbox where users can edit text. In a sense, an ARIA 1.0 combobox input is also a container.

Of course, on the screen, the textbox input and listbox popup are two separate things. So, the accessibility tree for an ARIA 1.0 combobox does not accurately represent the semantics of the user interface.

This creates problems for screen reader users when using reading or touch modes. They cannot perceive a popup inside of an edit field. The popup is simply not present in the reading order. This is because a textbox cannot serve both as an edit field and a container for other widgets. A textbox supports editable text. The popup for a combobox is not editable text. It is not even part of the value; the popup is a separate widget that helps the user choose a value to put into the textbox.

That is, instead of perceiving a textbox input with a listbox next to it, which is what sighted users perceive, people using a screen reader in reading or touch modes can only perceive an element called a combobox that acts like a textbox. The only way screen reader users can perceive the content of the popup in an ARIA 1.0 combobox is via keyboard navigation with the screen reader in interaction mode, e.g., JAWS forms mode.

This structural issue that put a popup widget inside of a text field and thereby severely limited perception of the popup was the primary driver of changes to the ARIA 1.0 combobox.

## ARIA 1.1 problems

As described above, ARIA 1.1 specifies the combobox structure to be a combobox composite container with two widgets inside -- an input and a popup. The addition of the container element fixed the problem of the popup being inside the input. But, unfortunately, it has created many other issues.

More detail is provided about each of the following problems in sections below. Each of these problems has spawned multiple issues against the ARIA spec.

1. Naming: In code, there are 3 parts that can be named -- the combobox, the input, and the popup. On the screen, there is only one thing rendered that needs an accessible name -- the input. The spec says to name only the container. But, the spec does not require the browser to compute a name for the input from the container, which leads to an unlabeled input fieled, violating WCAG. Thus, authors tend to name all three parts, which creates verbosity problems that are difficult for screen reader developers to mitigate.
2. Screen reader presentation of the container: The container is sometimes being partially rendered by screen readers as a group. This adds elements to the screen reader experience that do not exist on screen and do not add value. In fact, it can be confusing for screen reader users because these extra grouping elements have never previously been part of how screen readers present comboboxes.
3. Screen reader presentation of the input: The ARIA spec says the wrapper has the `combobox` role but does not state what the role of the input should be. This is critical because the input is what gets focused. The spec needs to tell screen readers how the input should be conveyed to users.
4. Lack of `select` support: There is a type of combobox that does not include a textbox. HTML:select@size=1 is one example of this. This type of control cannot be created using the ARIA 1.1 combobox definition.
5. Author confusion: Because the container does not correspond to anything displayed on screen, it is difficult for authors to understand which ARIA attributes belong on the container and which belong on the input. As a result, author errors that cause problems for screen reader developers are a significant problem.

## ARIA 1.2 Proposal to eliminate container

One way to fix all these problems is to eliminate the container and make the combobox more like a menubutton. This is essentially returning to the 1.0 pattern with one small modification -- use `aria-controls` to specify the input-popup relationship instead of `aria-owns`.

```
<input type="text" aria-label="Tag" role="combobox" aria-expanded="true"
  aria-autocomplete="list" aria-controls="popup_listbox" aria-activedescendant="selected_option">

<ul role="listbox" id="popup_listbox">
  <li role="option">Zebra</li>
  <li role="option" id="selected_option">Zoom</li>
</ul>
```

You can view an [example implementation of the proposed ARIA 1.2 combobox here](https://raw.githack.com/w3c/aria-practices/aria1.2-combobox-proposal/examples/combobox/combobox-autocomplete-list.html).
The proposed specification changes are in [ARIA pull request 1051](https://github.com/w3c/aria/pull/1051).

In this proposal, the combobox has only one part -- the input. The popup is a related widget but is not technically part of the combobox. This is analogous to a menu button. The button controls the menu, and the menu itself is not part of the button.

Semantically, this matches what is on the screen. There is an input element that displays a value. In some cases, that input is an edit field where users can type a value and typing may or may not open a popup that suggests possible values for the input. In other cases, the input is not an edit field; users must open the popup to change its value.

How does this proposal fix the problems?

1. Naming: There is only one thing that can be named. While it would be technically possible to name the popup, naming the popup would have no impact on the combobox itself.
2. Screen reader presentation of the container: Since there is no container, there is no chance that screen readers will render superfluous group elements that clutter the interface.
3. Screen reader presentation of the input: The input is unambiguously a combobox; it has role combobox.
4. No `select` support: The `input` in the above code can be replaced with a `div` or `span` whose content displays the current value. This exactly replicates the functionality of combobox widgets that do not have a textbox.
5. Author confusion: There is only one place to put all attributes. There is no room for confusion about where to put required states and properties.

The best part of this proposal to eliminate the container is that it is already functional using any screen reader on any desktop platform. There is no need for modification to current screen reader or browser implementations. It even enables access to popup elements that are grids, trees, and dialogs without additional work by screen reader developers.

The ARIA 1.1 pattern is not yet fully functional with any screen reader on any platform.
If this proposal to eliminate the container is not adopted in ARIA 1.2, other changes would need to be made to the ARIA specification to resolve the problems with the ARIA 1.1 pattern before screen reader developers can make comboboxes reliably functional.

## Alternative resolution paths

The following sections explore alternative approaches to resolving the 5 issues with the ARIA 1.1 combobox.
That is, if ARIA 1.2 keeps the combobox container, these sections attempt to answer the question of how ARIA 1.2 might otherwise resolve the above 5 problems.

### Resolving issues with naming an ARIA 1.1 combobox

There are two critical questions:
1. Should authors be required to name the container or the input?
2. Should authors be allowed to name both the container and the input?

From the perspective of screen reader users, the second question is easy to answer. Only one name is necessary. Multiple names for a single widget do not add clarity for assistive technology users.

There is only one name on the screen. That is the name that needs to be conveyed to assistive technology users. 

Because a collapsed combobox is a single element, and expanding a combobox reveals only a single adjacent element, a distinctly named grouping element is not helpful. In this way, a combobox is similar to a menu button and completely dissimilar from composites, such as radio group, menubar, and grid.

Regardless of where authors specify the name, they do not need to specify names for both the container and the input. If they do, one should take precedence over the other.

Currently the spec requires a name on the container. ARIA 1.1 does not clearly specify whether a name is required on the input. The textbox role requires a name. However, when a textbox is inside of a combobox, it is not clear whether or not it is still a textbox; it should probably be considered a combo edit box.

ARIA 1.1 does not require browsers to calculate a name for the input from the container.

An alternative approach to resolving naming problems is to:
1. Prohibit naming of the combobox container.
2. Require authors to name the input; this is already required if the input is a textbox.

### Resolving problems with Screen reader presentation of ARIA 1.1 combobox containers

While the container in the ARIA 1.1 combobox specification is a coding construct for ensuring the popup is adjacent to the input in the reading order, exposing the container itself does not add semantic value for assistive technology users.
Ideal reading order can be achieved without a container that has a semantic role.

Arguably, exposing the container to screen reader users detracts from the screen reader experience by adding verbosity that does not serve an important purpose.
A collapsed combobox is a single input element; it does not need any type of grouping.
An expanded combobox renders only two elements that are intrinsically related by context, and potentially by name.
This is similar to other ARIA widgets that conditionally display a secondary element, such as disclosures and menu buttons.
Those patterns do not superimpose a semantic grouping container; doing so would add authoring complexity without improving the experience for end users.

If ARIA 1.2 does not eliminate the container from the combobox specification, then it could help resolve this problem by adding a normative statement that says assistive technologies SHOULD NOT expose the container to users. This would align with prohibitting accessible names on the container.

### Resolving problems with Screen reader presentation of ARIA 1.1 combobox input

The ARIA spec says the wrapper has role `combobox`. And, it requires the input to be a textbox. When a screen reader reads the textbox, what should the screen reader convey for the role of the textbox? The computed role is simply textbox.

Historically, screen readers announce the input as a combobox if it does not support editable text and a combo edit box if it supports editable text. Screen readers could look up the tree for all single-line edit fields to assess whether or not to announce them as a combo edit box. While feasible, this is inconsistent with the rest of ARIA. In other composites, the role of a composite ancestor does not change the role of the element with focus.

Alternatively, another valid screen reader behavior would be to convey the textbox as a textbox and not expose the combobox role to end users. Instead, the screen reader could announce the availability of specific behaviors, such as auto completion and value suggestions.

In practice, screen readers need to convey a role but are not bound to the ARIA lexicon. ARIA does not prescribe screen reader rendering.

Nonetheless, a valid concern is that the ARIA 1.1 combobox definition and structure create ambiguity for screen reader developers. This increases the likelihood that multiple screen readers running on the same platform and in the same browser will render the same combobox in meaningfully different ways. While it is expressly not the goal of ARIA to dictate assistive technology experiences, it is not helpful to authors or end users when ARIA needlessly promotes variation.

If ARIA 1.2 were to keep the container element, then one way of promoting consistency would be to add a role for the textbox, e.g., comboboxinput. This would be consistent with the structure of other composite widgets, e.g., a `menu` contains `menuitem` elements, a `radiogroup` includes `radio` elements, and a `grid` contains `gridcell` elements.

### Resolving lack of `select` support

There is a type of combobox that does not include a textbox. HTML:select@size=1 is one example of this. This is an input that has an associated drop down list. The value of the input must be chosen from the list. The input itself does not support editable text.

This type of widget cannot be created using the ARIA 1.1 combobox pattern. It is possible to create a similar widget by adding `readonly` to an `input@type="text"` in a `combobox`, but that method of implementation is limiting for authors and troublesome for users.

Ideally, authors would be able to create a widget that is semantically identical to an HTML select. They could use an element for the input that they can style any way they like and that is not treated by screen readers as a text field. For example, they could use a `span` or `div` for the input as follows:

```
<div aria-label="Tag" role="combobox" aria-expanded="true" aria-owns="owned_listbox" aria-haspopup="listbox">
    <span tabindex="0" aria-autocomplete="list" aria-controls="owned_listbox" aria-activedescendant="selected_option">Zoom</span>
</div>
<ul role="listbox" id="owned_listbox">
    <li role="option">Zebra</li>
    <li role="option" id="selected_option">Zoom</li>
</ul>
```

In this case, the `span` with `aria-autocomplete` is the input element that displays the current value. When it receives focus, it should be announced as a `combobox`.

One significant problem with this pattern is that the focusable element does not have a role.

If ARIA 1.2 were to keep the container element, then one possible solution is to add the above suggested "comboboxinput" role. The specification could advise screen readers to render elements with role `comboboxinput` as `combobox`.

### Reducing author Confusion

The ARIA 1.1 combobox pattern is relatively complex due to the fact that there are two places to place relevant attributes -- the container and the input.
This has been a source of author errors.
At least one screen reader developer is identifying such errors as a significant concern.

Short of eliminating the container, there is no clear way to mitigate this other than to encourage browsers to correct author errors when populating the accessibility tree. Of course, checkers can help prevent the errors from getting out in the wild. But, that will not remove the necessaty of robust error correction.

## Summary of resolution options

* Option 1: Remove the container and change combobox from composite to input -- [See pull request 1051](https://github.com/w3c/aria/pull/1051).
* Option 2:
  * Add a role for the input, e.g., comboboxinput.
  * Require a name on elements with role comboboxinput.
  * Advise screen readers to present elements with role `comboboxinput` as `combobox`.
  * Prohibit naming the container.
  * Add a normative statement that says assistive technologies SHOULD NOT expose the container to users.
  * Advise user agents to align the accessibility tree with the combobox pattern when authors misplace required or supported attributes.

## Responses to other objections to removing the container

One objection to making yet another change is that it will create churn for authors.
In practice, we have seen very little use of the ARIA 1.1 pattern because it does not work well with assistive technologies.
In addition, converting the 1.1 pattern to match the 1.2 proposal is very simple: move the combobox role, `aria-expanded`, and the accessible name from the container to the input.

## Related GitHub issues

### aria-controls vs aria-owns
* [998: Combobox 1.0 pattern incorrectly includes aria-owns instead of aria-controls](https://github.com/w3c/aria/issues/998)
* [776: aria-controls a required property for Combobox?](https://github.com/w3c/aria/issues/776)
* [716: aria-controls or owns should be on input, not on combobox element](https://github.com/w3c/aria/issues/716)
### Naming
* [893: 1.1 Combobox pattern endorses unlabelled form fields](https://github.com/w3c/aria/issues/893)
* [909: Clarify combobox label placement](https://github.com/w3c/aria/issues/909)
* [1046: Does combobox require an accessible name?](https://github.com/w3c/aria/issues/1046)
### Other inconsistencies
* 853: Combobox has aria-expanded required, but there is a default value
* 742: combobox incorrect regarding searchbox?
### HTML select
* 817: Update combobox spec as per html spec
* w3c/html-aam#46: select should map to listbox regardless of presentation
* 721: Add aria-valuetext to listbox 
* 722: Add aria-expanded to listbox
