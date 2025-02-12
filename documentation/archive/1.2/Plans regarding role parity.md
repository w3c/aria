**Editors Note.** Archived wiki page https://github.com/w3c/aria/wiki/Plans-regarding-role-parity, last edited Apr 1, 2022.

# Plans regarding role parity

## Parity not planned

These elements are not mapped and thus no parity is planned for them: `base`, `body`, `br`, `col`, `colgroup`, `data`, `head`, `html` `input` (`type=hidden`), `link`, `map` (when used as an imagemap), `meta`, `noscript`, `param`, `picture`, `script`, `source`, `style`, `template`, `title`, `track`, `wbr`.

These elements are currently a WONTFIX due to an inability to achieve proper, accessible parity: `audio`, `video`.

## Parity Achieved in ARIA &lt;= 1.2

These ARIA roles provide parity for the elements listed.

* `article`: `article`
* `blockquote`: `blockquote`
* `button`: `button`, `input` (`type` is `button`, `image`, `reset`, `submit`)
* `caption`: `caption`, `figcaption`
* `cell`: `td` and `th` (in a `table` that is not a `grid`)
* `checkbox`: `input` (`type` is `checkbox`, parent is not `menu`)
* `code`: `code`
* `columnheader`: `th` (when it is a column header)
* `combobox`: `input` (`type` is `text`, `email`, `search`, `telephone`, `url` with suggestions source element) (https://github.com/w3c/aria/issues/962[An additional attribute may be created in 1.3])
* `definition`: `dd`
* `deletion`: `del`
* `dialog`: `dialog`
* `emphasis`: `em`
* `figure`: `figure`
* `form`: `form` (with an accessible name)
* `generic` (with no additional attribute): `div`, `span`, `cite`, `footer` and `header` (not scoped to `body`), `form` and `section` (without accessible name), `tfoot`, `thead`, `details`
* `generic` (https://github.com/w3c/aria/issues/960[an additional attribute may be created in 1.3]): `abbr`, `address`, `b`, `i`, `kbd`, `mark`, `pre`, `q`, `s`, `samp`, `small`, `u`, `var`
* `gridcell`: `td` and `th` (in a `table` that is a `grid`)
* `group`: `optgroup`
* `heading`: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
* `img`: `img`, `area` (no `href`)
* `insertion`: `ins`
* `link`: `a` and `area` (when they represent a hyperlink)
* `list`: `ol` and `ul` (https://github.com/w3c/aria/issues/961[an additional attribute may be created in 1.3])
* `listitem`: `li` (parent is `ol` or `ul`)
* `listbox`: `datalist` (when represents pre-defined options for input element), `keygen`, `select` (with `multiple` attribute or `size` > 1)
* `main`: `main`
* `math`: `math`
* `menuitem`: `a` (when it represents a hyperlink and parent is a `menu`), `input` (`type` is `button` or `image`, parent is `menu`), `menu` (`type` is `context`), `menuitem` (`type` is `command`)
* `menuitemcheckbox`: `input` (`type` is `checkbox`, parent is `menu`), `menuitem` (`type` is `checkbox`)
* `menuitemradio`: `input` (`type` is `radio`, parent is `menu`), `menuitem` (`type` is `radio`)
* `meter`: `meter`
* `navigation`: `nav`
* `none`/`presentation`: `img` (empty alt value)
* `option`: `option` (in a list of options or represents a suggestion in a `datalist`)
* `paragraph`: `p`
* `progressbar`: `progress`
* `radio`: `input` (`type` is `radio`, parent is not `menu`)
* `region`: `section` (with accessible name)
* `rowgroup`: `tbody`
* `rowheader`: `th` (when it is a row header)
* `separator`: `hr`
* `searchbox`: `input` (`type` is `search`, no suggestions source element)
* `slider`: `input` (`type` is `range`)
* `spinbutton`: `input` (`type` is `number`)
* `status`: `output` (Is this sufficient for all of output's potential semantics?)
* `strong`: `strong`
* `subscript`: `sub`
* `summary`: `button` role with `aria-expanded`
* `superscript`: `sup`
* `table`: `table`
* `textbox`: `input` (`type` is `text`, `email`, `search`, `telephone`, `url` and no suggestions source element) (https://github.com/w3c/aria/issues/962[An additional attribute may be created in 1.3])
* `textbox` + `aria-multiline` is `true`: `textarea`
* `term`: `dfn`
* `time`: `time`

## Originally planned but moved out of 1.2, potentially to 1.3

### `label` - `label` role (Needs: APG, AccName, 2 implementations)

* ARIA:
** Editor's Draft: https://github.com/w3c/aria/commit/78b9178
** Working Draft: TODO
* Core AAM:
** Editor's Draft: https://github.com/w3c/core-aam/commit/8691f89
** Working Draft: TODO
* AccName: https://github.com/w3c/accname/issues/54
* Authoring Practices: https://github.com/w3c/aria-practices/issues/1108
* WPT: TODO
* Implementations:
** WebKit: TODO
** Gecko: TODO
** Blink: TODO
* Results: TODO

### `fieldset`, `legend` - `legend` role (Needs: APG, AccName, 2 implementations)
* ARIA:
** Editor's Draft: https://github.com/w3c/aria/commit/71d5024 (plus a https://github.com/w3c/aria/commit/8194d29[typo fix])
** Working Draft: TODO
* Core AAM:
** Editor's Draft: https://github.com/w3c/core-aam/commit/a5f1673
** Working Draft: TODO
* AccName: https://github.com/w3c/accname/issues/54
* Authoring Practices: https://github.com/w3c/aria-practices/issues/1108
* WPT: TODO
* Implementations:
** WebKit: TODO
** Gecko: TODO
** Blink: TODO
* Results: TODO

### `dl`, `dt`, `dd` - `associationlist`, `associationlistitemkey`, `associationlistitemvalue` roles (Needs: Core-AAM, 2 implementations)
* ARIA:
** Editor's Draft: https://github.com/w3c/aria/commit/b371203c
** Working Draft: TODO
* Core AAM:
** Editor's Draft: https://github.com/w3c/core-aam/issues/56
** Working Draft: TODO
* AccName: TODO
* Authoring Practices: Done (https://github.com/w3c/aria-practices/issues/1106)
* WPT: TODO
* Implementations:
** WebKit: TODO
** Gecko: TODO
** Blink: TODO
* Results: TODO

## TODO - 1.3

See also: https://github.com/w3c/aria/projects/8

* a (no href) - triage needed
* bdi - triage needed
* bdo - triage needed
* canvas (https://github.com/w3c/aria/issues/927[#927])
* embed, object (https://github.com/w3c/aria/issues/929[#929]) - Assigned to Scott
* iframe (https://github.com/w3c/aria/issues/879[#879]) - Assigned to Peter
* input (type=color) (https://github.com/w3c/aria/issues/930[#930])
* input (type=date) (https://github.com/w3c/aria/issues/931[#931])
* input (type=datetime-local) (https://github.com/w3c/aria/issues/932[#932])
* input (type=file) (https://github.com/w3c/aria/issues/933[#933])
* input (type=month) (https://github.com/w3c/aria/issues/934[#934])
* input (type=password) (https://github.com/w3c/aria/issues/935[#935])
* input (type=time) (https://github.com/w3c/aria/issues/936[#936])
* input (type=week) (https://github.com/w3c/aria/issues/937[#937])
* rp, rt, ruby (also check with i18n) (https://github.com/w3c/aria/issues/488[#488])
* aria-textattribute for role parity with generic (https://github.com/w3c/aria/issues/960[#960])
* aria-listtype for role parity with ul and ol (https://github.com/w3c/aria/issues/961[#961]) - Assigned to Harris
* aria-inputtype for role parity (https://github.com/w3c/aria/issues/962[#962])

## Template for Adding New Items

The following template should be used for all items whose role parity is being achieved by an addition to ARIA:

```
### $HTML_ELEMENT - $NEW_ROLE role
* ARIA:
** Editor's Draft: TODO
** Working Draft: TODO
* Core AAM:
** Editor's Draft: TODO
** Working Draft: TODO
* AccName: TODO
* Authoring Practices: TODO
* WPT: TODO
* Implementations:
** WebKit: TODO
** Gecko: TODO
** Blink: TODO
* Results: TODO
```
