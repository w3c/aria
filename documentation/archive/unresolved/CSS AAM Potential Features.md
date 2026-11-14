**Editors Note.** Archived wiki page https://github.com/w3c/aria/wiki/CSS-AAM-Potential-Features, last edited Feb 26, 2018.


# CSS-AAM Potential Features and Potential CSS WCAG Techniques
The goal of this document is to provide a *preliminary* list the CSS Modules under development that have impacts on accessibility. Some of these require documenting how the CSS features should be mapped to Accessibility APIs on various platforms. Some need authoring advice, in the form of WCAG Techniques and Failures and/or CSS Best Practices. Others are potentially useful for accessibility scenarios, and should be further explored. Some were too long or complex for a cursory read to determine their accessibility implications, and need additional review.  

Finally, there are two broad categories of issues where there is no consensus on how to proceed. These are areas where we hope that frank and open discussion among experts from the CSS and APA working groups can yield deeper understanding and new approaches. These are: 

1. Order and Flow for screen-readers and sequential navigation on pages where visual layout and DOM order are not in synch.
2. Whether and how to use CSS and media queries to create experiences optimized for accessibility scenarios and users. 

The list below is a *first attempt* at slotting the various CSS modules into these categories for further exploration and discussion. It is an early draft intended to stimulate further discussion among members of both APA and CSS.

## CSS-AAM Candidates
### Possibly related to reading/navigation order question

* [CSS Flexible Box Layout](https://drafts.csswg.org/css-flexbox-1/) 
* [CSS Grid Layout Level 1](http://www.w3.org/TR/css-grid-1) 
* [CSS Positioned Layout Level 3](http://www.w3.org/TR/css3-positioning/)

#### The specs below are less clearly related, but are worth a look while thinking about holistic solutions
* [CSS Multi-column Layout](http://www.w3.org/TR/css3-multicol) 
* [CSS Fragmentation Level 3](http://www.w3.org/TR/css3-break)
* [CSS Box Alignment Module Level 3](http://www.w3.org/TR/2016/WD-css-align-3-20160614/)
* [CSS Basic Box Model Level 3](http://www.w3.org/TR/css3-box)
* [CSS Paged Media Level 3](http://www.w3.org/TR/css3-page)
* [CSS Intrinsic & Extrinsic Sizing Module Level 3](http://www.w3.org/TR/css3-sizing/)
* [CSS Template Layout](http://www.w3.org/TR/css-template-3)
* [CSS Regions](http://www.w3.org/TR/css3-regions)
* [CSS Round Display Level 1](http://www.w3.org/TR/css-round-display-1/)
* [CSS Basic User Interface Module Level 4](http://www.w3.org/TR/css3-ui)  (resize section)

### Document existing mappings and implementation consensus

* [CSS Display Level 3](http://www.w3.org/TR/css-display-3/): Display:none changes the AAPI tree. Document that and any other features that do.
* [CSS Generated Content Module Level 3](http://www.w3.org/TR/css-content-3/): Document how generated content should be exposed in AAPI 
* [CSS Generated Content for Paged Media](http://www.w3.org/TR/css3-gcpm):  Document how generated content should be exposed in AAPI
* [CSS Counter Styles Level 3](http://www.w3.org/TR/css-counter-styles-3/): Document how to expose generated list numbers and bullets in AAPI
* [CSS Lists Level 3](http://www.w3.org/TR/css3-lists): Document how to expose lists in AAPI, including numbers and order
* [CSS Tables Level 3](http://dev.w3.org/csswg/css3-tables/): Document how it impacts mappings of HTML tables
* [CSS Basic User Interface Module Level 4](http://www.w3.org/TR/css3-ui): Document how caret and keyboard direction maps to AAPI
* [CSS Image Values and Replaced Content Level 3](http://www.w3.org/TR/css3-images): How does this interact with name calculation? Does it impact the accessibility tree structure?
* [CSS Writing Modes Level 3](http://www.w3.org/TR/css3-writing-modes): Text Direction exposed in AAPI. Discuss with bidi AT developers about what needs they have, if any.
* [CSS Ruby Level 1](http://www.w3.org/TR/css3-ruby): Document how to expose Ruby in AAPI. Get input from international AT vendors, especially in Japan.
* [CSS Backgrounds and Borders Level 3](http://www.w3.org/TR/css3-background): The way IE did high contrast caused some problems. Consider documenting how high contrast, themes, color inversion should be handled by browsers with respect to backgrounds and borders.
* [CSS Masking Level 1](http://www.w3.org/TR/css-masking/), [CSS Overflow Level 3](http://www.w3.org/TR/css-overflow-3/): 
Should masking and clipping impact what text is in AAPI? If so, when and how. Document consensus.
* [CSS Values and Units Level 3](http://www.w3.org/TR/css3-values): Document how zooming and text sizing should impact each unit, to avoid situations like the differences in handling of pt and px in IE and Firefox.
* [CSSOM View](http://www.w3.org/TR/cssom-view), [CSS Object Model](http://www.w3.org/TR/cssom), [CSS Typed OM Level 1](http://www.w3.org/TR/css-typed-om-1/): Document relationship between CSSOM and AAPI
* [CSS Pseudo-Elements Module Level 4](http://www.w3.org/TR/css-pseudo-4): Should any pseudo-element styling be reflected in AAPI?
* [Filter Effects](http://www.w3.org/TR/filter-effects/): Document interactions with high contrast, color inversion, etc.

# Authoring Advice Needed

## WCAG techniques/failures and CSS Best Practices for how to use feature

The CSS WCAG techniques are very old, and don't cover many features of CSS that have known accessibility utility and pitfalls. Some of these are covered in the CSS Best Practices. The following specs could benefit from coordination between CSS and WCAG to develop techniques and define the relationship between CSS Best Practices and WCAG techniques. 

* [CSS Fonts Level 3](http://www.w3.org/TR/css3-fonts): Techniques on how to do UI glyphs accessibly. (may not be directly related to this spec) 
* [CSS Values and Units Level 3](http://www.w3.org/TR/css3-values):  There are known issues with resizing and re-layout when mixing different types of units.
* [CSS Animations](http://www.w3.org/TR/css3-animations), [Web Animations 1.0](http://www.w3.org/TR/web-animations/), [CSS Transitions](http://www.w3.org/TR/css3-transitions), [Motion Path Module Level 1](http://www.w3.org/TR/motion-1/): look into techniques for animations related to WCAG requirements for stopping/pausing motion, seizures, and improving understanding for user with cognitive disabilities.
* [Non-element Selectors](http://www.w3.org/TR/selectors-nonelement-1): WCAG technique for using role and aria-* attributes as selectors
* [CSS Color Module Level 4](https://www.w3.org/tr/css-color-4/): Look into techniques and failures related to contrast

### Older WCAG ideas for CSS techniques
These are links to lists of ideas the WCAG working group had for CSS techniques a few years ago. They were last reviewed in 2015, so should not be taken as definitive.
* [Techniques to do](https://www.w3.org/WAI/GL/wiki/Techniques/ToDo#CSS)
* [Techniques/CSS](https://www.w3.org/WAI/GL/wiki/Techniques/CSS)

### Might be useful for other WCAG techniques
These specs have features that could be leveraged in WCAG techniques, particularly WCAG techniques related to cognitive accessibility optimizations. Have the WCAG and COGA teams take a look at these for technique ideas.
* [CSS Text Decoration Module Level 3](http://www.w3.org/TR/css-text-decor-3/)
* [CSS Text Level 3](http://www.w3.org/TR/css3-text) 
* [CSS Shapes Level 1](http://www.w3.org/TR/css-shapes-1/)

## Using CSS to optimize for Accessibility

APA has been interested in ways that CSS can be used for accessibility-optimized views. The CSS working group has a particular view on the intentions of these features and how they interact with accessibility. This is an area where a joint task force can be useful to understand the different viewpoints and seek common ground. This work should start with examining design goals of these features and accessibility use cases. It might results in new CSS features, CSS-AAM mappings, authoring guidance or some combination, and has a fairly long time horizon.

* [Media Queries](http://www.w3.org/TR/css3-mediaqueries)
* [Media Queries level 4](http://www.w3.org/TR/2016/WD-mediaqueries-4-20160706/) 
* [CSS Conditional Rules Level 3](http://www.w3.org/TR/css3-conditional)
* [CSS Device Adaptation](http://www.w3.org/TR/css3-conditional): Should accessibility views (e.g. magnification, symbol replacement for users with cognitive disabilities) be treated as devices?


## Do further review
* [CSS Level 1](http://www.w3.org/TR/CSS22/) (largely covered by existing WCAG techniques) 
* [CSS Level 2](http://www.w3.org/TR/CSS22/): Look for areas that are not covered by reviews of later modules
* [CSS Speech](http://www.w3.org/TR/css3-speech): Has much potential for accessibility enhancements
* [Compositing and Blending Level 1](http://www.w3.org/TR/compositing-1/):  Look at interaction with SVG-AAM
* [CSS Transforms](http://www.w3.org/TR/css3-transforms): Look at interaction with SVG-AAM and whether this has any relationship to the order issue.
* [CSS Painting API Level 1](http://www.w3.org/TR/css-paint-api-1/): Is there a mechanism for text alternatives?
* [CSS Properties and Values API Level 1](http://www.w3.org/TR/2016/WD-css-properties-values-api-1-20160607/): Extensibility mechanism for CSS. How will this impact AAPI construction? Will there be a way to reflect these new things in AAPI?
* [Worklets Level 1](http://www.w3.org/TR/2016/WD-worklets-1-20160607/): Will this impact AAPI construction?

## Out of Scope
These are CSS specs that, on first review, don't seem to have accessibility impact.
* [CSS Snapshot 2015](http://www.w3.org/TR/css-2015)
* [CSS Snapshot 2010](http://www.w3.org/TR/css-2010)
* [CSS Snapshot 2007](http://www.w3.org/TR/css-beijing)
* [CSS Color Level 3](http://www.w3.org/TR/css3-color)
* [CSS Namespaces](http://www.w3.org/TR/css3-namespace)
* [Selectors Level 3](http://www.w3.org/TR/selectors)
* [CSS Print Profile](http://www.w3.org/TR/css-print)
* [CSS Style Attributes](http://www.w3.org/TR/css-style-attr)
* [CSS Cascading and Inheritance Level 3](http://www.w3.org/TR/css3-cascade)
* [CSS Syntax Level 3](http://www.w3.org/TR/css3-syntax)
* [Geometry Interfaces Module Level 1 ](http://www.w3.org/TR/geometry-1)
* [CSS Cascading and Inheritance Level 4](http://www.w3.org/TR/css-cascade-4)
* [Cascading Variables](http://www.w3.org/TR/css-variables) 
* [CSS Will Change Level 1](http://www.w3.org/TR/css-will-change-1/)
* [Selectors Level 4](http://www.w3.org/TR/selectors4) 
* [CSS Scroll Snap Points Module Level 1](http://www.w3.org/TR/css-snappoints-1)
* [CSS Line Grid](http://www.w3.org/TR/css-line-grid-1/)
* [CSS Font Loading](http://www.w3.org/TR/css-font-loading-3/)
* [CSS Scoping Level 1](http://www.w3.org/TR/css-scoping-1/) 
