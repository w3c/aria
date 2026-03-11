
# Open Issues in Browser Accessibility Heuristics

The following is an incomplete, running list of known heuristics in browsers that could result in potentially different behavior. The goal of this list is provide insights into existing behavior (for spec authors or browser engine implementors), and possibly to consider these for reconciliation, standardization, and specification.


## Examples of Browser Heuristics Already Added to Accesibility Specs

### Ignoring aria-hidden when applied to the root or document elements

One pre-existing example is how [engines now ignore `aria-hidden` in certain scenarios](https://w3c.github.io/aria/#aria-hidden) where it's clearly an author mistake.

> To prevent authors erroneously hiding entire window-rendered documents only to those using assistive technology, user agents MUST NOT expose the hidden state to assistive technologies if it is specified on the root element or the host language element that represents the contents of the primary document in view.


## Browser Accessibility Heuristics Not Yet Added to Specs

### Data Table vs Layout Table Heuristics

Variants of this heuristic exist in every major browser. Some analysis has been performed in the following issues.

- https://github.com/w3c/aria/pull/2576
- https://github.com/w3c/html-aam/issues/293
- https://github.com/web-platform-tests/interop-accessibility/issues/172


### Misspelled `aria-labeledby` 

Some analysis has been performed in the following issue(s).

- https://github.com/w3c/aria/issues/2093



### Author anti-pattern workaround: clickable non-clickables

Whether to expose DOM click handlers (e.g. as "clickable") on traditionally non-clickable roles where the event is registered with body event delegation. Some analysis has been performed in the following issue(s).
- https://github.com/w3c/html-aam/issues/599

Nurthen also found that Chrome accounts for a similar author error by changing non-linked `<a>` elements to links (computed role) if there is a click listener.

```cpp
if (IsA<HTMLAnchorElement>(GetNode()) || IsA<SVGAElement>(GetNode())) {
    // Assume that an anchor element is a Role::kLink if it has an href or a
    // click event listener.
    if (GetNode()->IsLink() || IsClickable())
      return ax::mojom::blink::Role::kLink;
```

### aria-modal can be ignored when demonstrably erroneous

An example from 2005 is misuse of the aria-modal attribute. [Some pages from a major online retailer](https://www.applevis.com/forum/macos-mac-apps/amazon-mac-lately), included a modal dialog that was erroneously persistent. This prevented a lot of VO-based navigation from working. Thankfully the retailer fixed some or all of these instances, but it was impactful enough that Apple [shipped a WebKit change](https://bugs.webkit.org/show_bug.cgi?id=236585) preventing web authors from being able to cause quite such an egregious disruption again.


# Elements with zero width/height bounds may be ignored.

- it's also possible some may ignore certain elements with 1x1 bounds


### More to be listed…

- TBD

