**Editors Note.** Archived wiki page https://github.com/w3c/aria/wiki/Generic-Role-End-to-End, last edited May 23, 2019.

# Generic Role End to End 

## Current DIV Mapping

<table><tbody><tr><th><a href="https://www.w3.org/TR/wai-aria-1.1/"><abbr title="Accessible Rich Internet Application">WAI-ARIA<!---0.198688%--></abbr></a></th><td>No corresponding role</td></tr><tr><th><a href="https://msdn.microsoft.com/en-us/library/dd373608%28v=VS.85%29.aspx"><abbr title="Microsoft Active Accessibility">MSAA<!---0.198688%--></abbr></a> + <a href="http://accessibility.linuxfoundation.org/a11yspecs/ia2/docs/html/">IAccessible2</a></th><td>
                  <div class="general">
                    May not have an accessible object if has no semantic meaning. Otherwise,
                  </div>
                  <div class="role">
                    <span class="type">Roles: </span><code>ROLE_SYSTEM_GROUPING</code>; <code>IA2_ROLE_SECTION</code>
                  </div>
                  <div class="ifaces">
                    <span class="type">Interfaces: </span>
                    <code>IAccessibleText2</code>; <code>IAccessibleHypertext2</code>;
                  </div>
                </td></tr><tr><th><a href="https://msdn.microsoft.com/en-us/library/ms726297%28v=VS.85%29.aspx"><abbr title="User Interface Automation">UIA<!---0.198688%--></abbr></a></th><td>
                  <div class="general">
                    May not have an accessible object if has no semantic meaning. Otherwise,
                  </div>
                  <div class="ctrltype"><span class="type">Control Type: </span><code>Group</code></div>
                </td></tr><tr><th><a href="https://developer.gnome.org/atk/stable/">ATK</a></th><td>
                  <div class="general">
                    May not have an accessible object if has no semantic meaning. Otherwise
                  </div>
                  <div class="role">
                    <span class="type">Role: </span>
                    <code>ATK_ROLE_SECTION</code>
                  </div>
                   <div class="ifaces">
                    <span class="type">Interfaces: </span><code>AtkText</code>; <code>AtkHypertext</code>
                  </div>
                </td></tr><tr><th><a href="https://developer.apple.com/reference/appkit/nsaccessibility">AX</a></th><td>
                    <div class="role">
                        <span class="type">AXRole: </span><code>AXGroup</code>
                    </div>
                    <div class="subrole">
                        <span class="type">AXSubrole: </span><code>(nil)</code>
                    </div>
                    <div class="roledesc">
                        <span class="type">AXRoleDescription: </span><code>"group"</code>
                    </div>
                </td></tr><tr><th>Comments</th><td></td></tr></tbody>
</table>

## Current SPAN Mapping

<table><caption><a href="https://www.w3.org/TR/html/textlevel-semantics.html#the-span-element"><code>span</code></a></caption><tbody><tr><th><a href="https://www.w3.org/TR/wai-aria-1.1/"><abbr title="Accessible Rich Internet Application">WAI-ARIA<!---0.198688%--></abbr></a></th><td>No corresponding role</td></tr><tr><th><a href="https://msdn.microsoft.com/en-us/library/dd373608%28v=VS.85%29.aspx"><abbr title="Microsoft Active Accessibility">MSAA<!---0.198688%--></abbr></a> + <a href="http://accessibility.linuxfoundation.org/a11yspecs/ia2/docs/html/">IAccessible2</a></th><td><div class="general">Not mapped</div></td></tr><tr><th><a href="https://msdn.microsoft.com/en-us/library/ms726297%28v=VS.85%29.aspx"><abbr title="User Interface Automation">UIA<!---0.198688%--></abbr></a></th><td>
                    <div class="ctrltype">
                        <span class="type">Control Type: </span><code>Group</code>
                    </div>
                </td></tr><tr><th><a href="https://developer.gnome.org/atk/stable/">ATK</a></th><td><div class="general">Not mapped</div></td></tr><tr><th><a href="https://developer.apple.com/reference/appkit/nsaccessibility">AX</a></th><td>
                    <div class="role">
                        <span class="type">AXRole: </span><code>AXGroup</code>
                    </div>
                    <div class="subrole">
                        <span class="type">AXSubrole: </span><code>(nil)</code>
                    </div>
                    <div class="roledesc">
                        <span class="type">AXRoleDescription: </span><code>"group"</code>
                    </div>
                </td></tr><tr><th>Comments</th><td></td></tr></tbody></table>

### Actual Mapping today
The above is sometimes true but is dependent on the CSS applied to the DIV or SPAN
inline -> acts like SPAN
block -> acts like DIV

Other CSS display styles to be evaluated.




## Proposed Generic Role

### generic (role)

A nameless container element that has no semantic meaning on its own, but can provide accessible states and properties for its descendants.

Contrast with group, which semantically groups its descendants in a named container.

<strike>The aria-textseparation attribute of a generic indicates how its text content is separated from adjacent text content of adjacent generic elements.</strike>

Characteristics: 

Superclass Role: 	structure

Related Concepts: 	HTML div, HTML span

<strike>Supported States and Properties: 	aria-textseparation</strike>

Inherited States and Properties: 	
    aria-atomic
    aria-busy (state)
    aria-controls
    aria-current (state)
    aria-describedby
    aria-details
    aria-disabled (state)
    aria-dropeffect
    aria-errormessage
    aria-flowto
    aria-grabbed (state)
    aria-haspopup
    aria-hidden (state)
    aria-invalid (state)
    aria-keyshortcuts
    <strike>aria-label?</strike>
    <strike>aria-labelledby?</strike>
    aria-live
    aria-owns
    aria-relevant
    aria-roledescription

Name From: 	<strike>contents</strike> none? undefined? prohibited? N/A (i.e. not in table)?


***


### aria-textseparation (property)

<u>Defines how text content of a generic element is separated from text content of adjacent generic elements.</u>

<u>Specifically, aria-textseparation only applies to text nodes at the boundaries of a generic; it has no effect on separation between text nodes inside the generic, or on other types of elements.</u>

The value of the aria-textseparation property is a token list of size 1 or 2. The first value represents the type of text separation before the element, and the second value represents the type of text separation after the element. If a single value is given, it represents the type of text separation before and after the element. Any value not recognized in the list of allowed tokens SHOULD be treated by assistive technologies as if the default value style had been provided. If the attribute is not present or its value is an empty string or undefined, the default value of style applies.

For example, if the badge class in the following markup renders a circle around the "12" so that it is visually separated from the word "Notifications", then aria-textseparation="style space" ensures that AT render a space between the spans.

EXAMPLE
```
<a href="http://foo.com/badge.html">
    <span aria-textseparation="style space">Notifications</span><span class="badge">12</span>
</a>
```

NOTE
If adjacent generics have space separation, spaces will be collapsed to a single space.

NOTE
In the event of conflicting text separation between adjacent generics, paragraphbreak has precedence over linebreak, which has precedence over space, which has precedence over none, which has precedence over style.

Characteristics:

Related Concepts: 	String concatenation, text content, CSS rendering

Used in Roles: 	        generic

Value: 	                token list

style (default) 	Indicates that the element's text is separated from neighboring element text according to the element's display style.

linebreak 	        Indicates that the element's text is separated from neighboring element text by a line break.

none 	                Indicates that the element's text is not separated from neighboring element text; it is rendered as a continuous whole, without any delineation.

paragraphbreak   	Indicates that the element's text is separated from neighboring element text by a paragraph break.

space 	                Indicates that the element's text is separated from neighboring element text by a space.


### Proposed mapping of generic

Generic + style -> acts like Div & Span today - depends on CSS applied for mapping

Generic + linebreak -> like DIV

generic + none -> like SPAN

generic + paragraphbreak -> like DIV (do we need this?)

generic + space - > like SPAN but add a space in the ACCNAME calculation 

### Naming DIV/SPAN/generic

https://github.com/w3c/aria/issues/833

Proposal - remove aria-label,labelledby from global states and properties.
Add to widget, window, application, landmark, document, list, figure, group, img, range, table, tabpanel

Following non-abstract roles are no longer labelable - note we can add some of these if we decide to.
* alert
* blockquote
* caption
* cell
* definition (** This needs to be added - should we allow ONLY aria-labelledby?)
* deletion
* heading
* insertion
* label
* legend
* listitem
* log
* marquee
* math??
* none
* note
* paragraph
* presentation
* rowgroup
* status
* subscript
* superscript
* term
* time
* timer
* tooltip


Note - this change has a **major** impact to role presentation conflict resolution section. 
Prior to this change 
```
<ul role=presentation aria-label="list">
...
</ul>
```
Would be exposed as a list. After this change it would NOT be exposed as a list. 
We need to check browser implementations of this.

Other Questions
is aria-describedby the same or should that be left as global?
See: https://w3c.github.io/using-aria/#label-support

Heading states the following:
> Often, heading elements will be referenced with the aria-labelledby attribute of the section for which they serve as a heading. If headings are organized into a logical outline, the aria-level attribute is used to indicate the nesting level.

This implies that sections should be labelled and should be changed 

Branch created with these changes 
https://raw.githack.com/w3c/aria/NonGlobalLabelLabelledBy/index.html#roles
Draft PR https://github.com/w3c/aria/pull/967

