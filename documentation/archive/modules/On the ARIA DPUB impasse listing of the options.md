**Editors Note.** Archived wiki page https://github.com/w3c/aria/wiki/On-the-ARIA---DPUB-impasse-listing-of-the-options, last edited Oct 17, 2019.

# On the ARIA DPUB impasse listing of the options

This is an attempt list the various possibilities potentially solving the current impasse around
DPUB-ARIA.  In view of the invested time and energy, as well as the relatively urgent needs of the
publishing community on the matter this may help in reaching a solution soon. This write-up tries to avoid
taking sides, just lists the various options that seem to be available. It is up to the PF WG and the DPUB-ARIA Task Force to choose among these options (or come up with a variant or a new one).

Note that this text looks at the issues from the point of view of DPUB-ARIA, primarily because
it is this work that is now stalled. However, the real issues reveal a more 
general set of questions on the exact role (sic!) of the `@role` attribute in general, and this writeup could be 
used as a test case to address those in general.

Some preliminaries that should be taken into account, ie, which should influence the final choice:

* Adding a new `@role` attribute to a browser/validator is an expensive operation. There is a set
of constraints imposed by the combination of the values of `@role` and the corresponding `@aria-*`
attributes which have to be checked, and that requires, essentially, a case-by-case check. 
In other words, each new `@role` value has a "price" that must be taken into
account when adding new values.

> (It is unclear, when writing this note, whether the role hierarchies introduce yet another level of difficulties or not. Any comment/update on that would be welcome. @iherman)

* Additionally to the constraint checking issue, ARIA `@role` values have mappings to the
Accessibility APIs. In practice, these calls to the API are performed by the user agent and have to be defined one-by-one.

* The (e-)publishing community has been using a number of "structural semantics" terms to
characterize the structure of a document for a long time. As specifications or usage patterns evolve, 
terms are added to the existing vocabulary. Most (if not all) of the terms ("abstract", "index",
"glossary", etc.) are part of the traditions of the publishing community, going back to,
possibly, centuries. These values have several possible usages for user agents: it can be used to
influence the user interface (e.g., a pop up window when clicking on a term that is marked as
"footnote") but they have obvious importance for accessibility, too, adding information that is not
conveyed by the bare HTML tag names. At the moment, some of the publishing communities use
(prefixed) `@class` values (e.g., in magazine publishing using terms defined by the PRISM
consortium) others have introduced namespaced XML attributes (`@epub:type` in EPUB3). None of these 
solutions are satisfactory. The goal of the DPUB-ARIA work was/is to provide an alternative that would work well with HTML5 *and* which would also be beneficial for accessibility of digital documents.

* When adding new `@role` values there is a danger of ending up with name clashes. There may be
different solutions to solve this (the usage of "hyphenspaces", a specific `@aria-vocab` attribute
on the same element, or a global `@role-vocab` have been mentioned). This summary does not deal
with this issue, acknowledging, however, that it may have to be solved depending on which direction
the work proceeds. In some cases, the details of solving this may add new "Con"-s to the
discussions below. 

* (Just to clean up a misconception) The term "structural *semantics*" is used by the publishing
community, but this is **not** semantics in the Semantic Web sense. We are not talking about RDF, OWL, etc. 
This misunderstanding did come up in some of the comments, hence the necessity to clear this up.) 

With these preliminaries in mind, the following approaches seem to be possible.

## 1. Minimal ARIA @role values for DPUB

This solution is based on the approach that an ARIA `@role` value is acceptable *if and only if*
there is a clear and direct mapping on Accessibility APIs. I.e., the second bullet item above is
reinforced by, conceptually, saying that "*every `@role` value MUST have a mapping to an Accessibility APIs*". 
If a specific `@role` value does not have an obvious mapping, or it is "covered" by another,
already existing value of ARIA `@role`, then the new value is not acceptable.

* **Pro:** This approach minimizes the number of possible `@role` values, thereby minimizing the
"costs" on user agents (which include validators) as well as on mappings. 
* **Con:** A number of issues raised so far, based on this approach on `@role`, showed that this would lead to a
dramatic reduction of the number of acceptable DPUB-ARIA terms. As a consequence, DPUB-ARIA
would *not* solve the problems of the DPUB community, because most of the structural semantic
terms would be missing.

## 2. Permissive ARIA @role values for DPUB

This solution is based on a more general approach on the possible values of `@role`: while some
values have a clear and direct mapping on Accessibility APIs, some others may rely on
the inheritance of `@role` values only and would not map directly to Accessibility APIs.

* **Pro:** This makes it possible to map all the structural semantics terms of DPUB on ARIA `@role`
values. (Provided the name clash issue is solved without raising additional problems.) 
* **Con:** The extra complexity on user agents would become significant (see the first bullet item above) for a potentially large number of new values. Furthermore, deciding on which value is mapped on Accessibility APIs or not is an extra burden.

## 3. *Partially* de-associating @role from ARIA

This solution, in some sense, goes back to the history of the `@role` attribute, when it
was not yet closely related to ARIA. What it means it that `@role` MAY have values that are *not*
associated to ARIA *at all* although, in contrast to the original `@role` recommendation, the
possible values are strictly specified and not open ended (and therefore can be checked by a validator).

Although there *is* an extra complexity on user agents, because they have to separate 
the ARIA `@role` values from the non-ARIA ones, once the separation is done validators can just check the values against a simple list of acceptable values, and other user agents may simply ignore those values as far as
Assistive Technologies are concerned.

* **Pro:** The DPUB structural semantic terms could be mapped onto `@role` without restriction
(provided the name clash issue is solved without raising additional problems). Some
of these values would have no relationships to ARIA `@role` in sense of assistive
technologies; others would be bona fide ARIA `@role` values.  
* **Con:** The extra complexity on user agents in separating the various `@role` values, though manageable, is real. 
* **Con:** It is, conceptually, fairly messy, and not a clean design to have a "dual" behavior for an attribute.
* **Con:** On a social level, this line of thoughts may re-start old discussions with the HTML WG, and would therefore tear up old scars...

## 4. Use a separate HTML5 extension

This solution means that the DPUB community defines a *separate* attribute (let us use the term `@pub-type` hereafter, although a the exact term can change) as an official extension to HTML5. This means the possible values of the attribute would be defined in a separate specification (whether it is specified by a W3C group or an IDPF group has to be agreed with the HTML5 Working Group). This solution bypasses ARIA altogether.

* **Pro:** The DPUB structural semantics gets a clear syntax, compatible with HTML5. It solves the
DPUB community's main original problem. 
* **Con:** Cutting the ties with ARIA means that there would be no automatic relationships of the structural 
semantics terms with accessibility. User agents would have to deal with the accessibility aspects of structural
semantics separately.

## 5. Use a separate HTML5 extension with extra AT mapping

This is a slight extension to the previous (#4) solution. Whilst the bulk of the structural semantics
terms would be defined for `@pub-type` only, an extra step would be taken to identify those terms
that may have a reasonable mapping on Accessibility APIs and formally define those. This means that user agents, aware of the `@pub-type` attribute, can make the mapping.

* **Pro:** Like before, DPUB structural semantics gets a clear syntax, and the accessibility
consideration are also taken into account (at least partially) 
* **Con:** User agents would have to recognize an extra attribute for some of the values to execute the mapping on the Accessibility APIs; the probability that being implemented by all browsers is probably low (although dedicated ebook readers would probably do it).

## 6. Use a separate HTML5 extension with @role mapping

This is a slight extension to the previous (#5) solution: instead of defining Accessibility API mapping, a 
dedicated values are also defined in ARIA 1.1 as `@role` values (but not as a separate module). This would also include a mapping to the Accessibility APIs.

* **Pro:** Like before, DPUB structural semantics gets a clear syntax, and the accessibility
consideration are also taken into account (at least partially). 
* **Pro:** Enriching the ARIA 1.1 terms would be beneficial for the Web user community at large, and that is always a good thing. User agents would not have to do anything special, because all values would fall under the general ARIA 1.1 set.
* **Con:** DPUB authors would be expected to duplicate the information, e.g.,
`<span pub-type="chapter" role="chapter">...</span>`; this is prone to errors and not
clear whether authors would do this in practice.
