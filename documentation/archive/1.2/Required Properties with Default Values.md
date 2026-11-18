**Editors Note.** Archived wiki page https://github.com/w3c/aria/wiki/Required-Properties-with-Default-Values, last edited Sep 28, 2018.

# Required Properties with Default Values

For issue #787 this is a list of all required properties that have default values defined

Moved meta comment back into https://github.com/w3c/aria/issues/787 so that discussion can take place.

Role | State/Property | Current Default Value | Notes
--- | --- | --- | ---
[checkbox](http://w3c.github.io/aria/#checkbox) | aria-checked | false | Required. Default in [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable) only.
[combobox](http://w3c.github.io/aria/#combobox) | aria-expanded | false | Required. Default in [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable) only.
[heading](http://w3c.github.io/aria/#heading) | aria-level | 2 | Required. Default in [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable) only.
[menuitemcheckbox](http://w3c.github.io/aria/#menuitemcheckbox) | aria-checked | false | Required. Default in [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable) only.
[menuitemradio](http://w3c.github.io/aria/#menuitemradio) | aria-checked | false | Required. Default in [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable) only.
[option](http://w3c.github.io/aria/#option) | aria-selected | false | Supported. No default. [PR #799](https://github.com/w3c/aria/pull/799)
[radio](http://w3c.github.io/aria/#radio) | aria-checked | false | Required. Default in [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable) only.
[scrollbar](http://w3c.github.io/aria/#scrollbar) | aria-orientation | vertical | Supported. Default in ARIA and [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable).
scrollbar | aria-valuemin | 0 | Supported. Default in ARIA and [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable).
scrollbar | aria-valuemax | 100 | Supported. Default in ARIA and [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable).
scrollbar | aria-valuenow | halfway between valuemax and valuemin | Required. Default in [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable) only. **Consider changing default value to aria-valuemin.**
[separator (focusable)](http://w3c.github.io/aria/#separator) | aria-valuemin | 0 | Supported. Default in ARIA and needs to be added to [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable).
separator (focusable) | aria-valuemax | 100 | Supported. Default in ARIA and needs to be added to [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable).
separator (focusable) | aria-valuenow | 50 | Required. Default needs to be removed from ARIA and added to [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable) as "(aria-valuemax - aria-valuemin) / 2".
[slider](http://w3c.github.io/aria/#slider) | aria-valuemin | 0 | Supported. Default in ARIA and [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable).
slider | aria-valuemax | 100 | Supported. Default in ARIA and [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable).
slider | aria-valuenow | halfway between valuemax and valuemin | Required. Default in [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable) only.
[spinbutton](http://w3c.github.io/aria/#spinbutton) | aria-valuemin | no minimum value | Supported. Default in ARIA and [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable).
spinbutton | aria-valuemax | no maximum value | Supported. Default in ARIA and [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable).
spinbutton | aria-valuenow | 0 | Supported. Default in ARIA and [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable). **Consider changing default value to empty.** See [#797](https://github.com/w3c/aria/issues/797) and [PR#813](https://github.com/w3c/aria/pull/813).
[switch](http://w3c.github.io/aria/#switch) | aria-checked | false | Required. Default in [Core AAM Default Values Table](https://w3c.github.io/core-aam/#authorErrorDefaultValuesTable) only.
[treeitem](http://w3c.github.io/aria/#treeitem) | aria-selected | false | Supported. No default. [PR #799](https://github.com/w3c/aria/pull/799)
