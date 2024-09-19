**Editors Note.** Archived wiki page https://github.com/w3c/aria/wiki/Plans-regarding-attribute-parity, last edited Jan 24, 2022.

# Plans regarding attribute parity

## Introduction

This triage is based on what is in the HTML-AAM. Joanie did not go through the HTML spec looking for attributes that are in there, but not in the HTML-AAM. It would be great if someone could do that.

## Parity not planned

These are not mapped on any platform: `accept`, `accept-charset`, `action`, `allow`, `allowfullscreen`, `allowpaymentrequest`, `as`, `async`, `autocapitalize`, `autofocus`, `autoplay`, `charset`, `class`, `color`, `content`, `crossorigin`, `data`, `decoding`, `default`, `defer`, `dirname`, `download`, `enctype`, `form`, `formaction`, `formenctype`, `formmethod`, `formnovalidate`, `formtarget`, `href` (on `link`), `hreflang`, `http-equiv`, `id`, `ismap`, `kind`, `loop`, `media`, `method`, `multiple` (on `input`), `muted`, `name`, `novalidate`, `ping`, `playsinline`, `poster`, `preload`, `referrerpolicy`, `rel`, `rows`, `sandbox`, `shape`, `sizes` (on `link`), `slot`, `srcdoc`, `srclang`, `target`, `title` (on `link`, `style`), `translate`, `type`, `usemap`, `value` (on `button`, `option`, `param`, `data`), `wrap`

In addition, these will not be done for the stated reason:

. `controls` on `audio`, `video`: We are not creating `audio` and `video` roles at this time. See https://github.com/w3c/aria/issues/517. Therefore attribute parity for roles which do not exist makes no sense.

## Already done via AccName

`alt`, `label`, `title`

## Already done via ARIA

. `checked`: `aria-checked`
. `colspan`: `aria-colspan`
. `disabled`: `aria-disabled`
. `hidden`: `aria-hidden`
. `indeterminate`: `aria-checked=mixed`
. `max`: `aria-valuemax`
. `min`: `aria-valuemin`
. `multiple` (on `select`): `aria-multiselectable`
. `selected`: `aria-selected`
. `placeholder`: `aria-placeholder`
. `readonly`: `aria-readonly`
. `required`: `aria-required`
. `rowspan`: `aria-rowspan`
. `scope=col`: `columnheader` role
. `scope=row`: `rowheader` role
. `value` (on `meter`, `progress`): `aria-valuenow`

## Already "done" via exposure of rendered result

. `coords` on `area`: Exposure to ATs should come from rendered object; not the property.
. `height` on `canvas`, `embed`, `iframe`, `img`, `input`, `object`, `video`: Exposure to ATs should come from rendered object; not the property.
. `reversed` on `ol`: Exposure comes via the text exposed for the list item markers.
. `size` on `input`: Exposure based on bounding box rendered widget.
. `size` on `select`: Exposure based on rendered widget (similar to type on input).
. `sizes` on `img`, `source`: Exposure to ATs should come from rendered object; not the property.
. `start` on `ol`: Exposure comes via the text exposed for the list item markers.
. `style`: Exposure to ATs should come from the rendered/calculated styles.
. `tabindex`: Exposure mostly done via focusability (when not -1). We also have coverage by managing keyboard focus spec contents.
. `type` on `ol`: Exposure comes via the text exposed for the list item markers.
. `width` on `canvas`, `embed`, `iframe`, `img`, `input`, `object`, `video`: Exposure to ATs should come from rendered object; not the property.

## TODO 

. `high` on `meter`
. `low` on `meter`
. `optimum` on `meter`

https://github.com/w3c/aria/issues/1336

## Candidates (Mapped on at least one platform)

Do ATs really need these? If so, can we get mappings for all platforms?

. `abbr` on `th`
. `cite` on `blockquote`, `del`, `ins`, `q`
. `cols` on `textarea`
. `contenteditable`
. `datetime` on `del` and `ins`
. `datetime` on `time`
. `dir`
. `headers` on `td` and `th`
. `href` on `a`, `area`
. `list` on `input` https://github.com/w3c/aria/issues/472 [closed / rejected (for now)]
. `lang`
. `open` on `details`
. `pattern` on `input` (current mapping is for the presence of error; not the pattern itself)
. `spellcheck` on `input` (current mapping is for the presence of error; not if checking is enabled)
. `span` (on `colgroup`)
. `src` on `img`
. `step` on `input` https://github.com/w3c/aria/issues/471 [closed / rejected (for now)]
. `value` on `li`

These need further discussion:

. `accesskey`: Do we have sufficient parity through aria-keyshortcuts?
. `autocomplete`: Need to get/update mappings for UIA, AXAPI. In addition, in HTML values are on/off. ARIA lacks these.
. `draggable`: not mapped. Question: Do we want to deal with drag and drop during 1.3?
. `for` on `label` and `output`: Can this be covered via `aria-labelledby`?
. `maxlength` on `input`, `textarea`: not mapped. But maybe it should be? https://github.com/w3c/aria/issues/1119[Joanie thinks so].
. `minlength` on `input`, `textarea`: not mapped. Also maybe it should be?
. `type` on `button`: Exposure mainly based on label. But see also https://github.com/w3c/aria/issues/842
. `type` on `input`: Exposure based on rendered widget. But see also https://github.com/w3c/aria/issues/962
. `value` on `input`: Exposure comes via the text/value exposed as the content of the `input`.
