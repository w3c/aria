# ARIA Validator Tests

These tests are to be run against validators to ensure changes to the ARIA spec result in
corresponding changes in validators.

## Test Files and Results

### ARIA 1.2

* [Abstract Roles Prohibited](abstract-roles-prohibited.html)
  * @axe-core/cli: [Results](absract-roles-prohibited.json)
  * validator.nu: [Results](abstract-roles-prohibited-vnu.json)
* [aria-roledescription attribute prohibited](roledescription-prohibited.html)
  * @axe-core/cli: [Results](roledescription-prohibited-axe.json)
  * validator.nu: [Results](absract-roles-prohibited-vnu.json)
* [Combobox Role Associated Popup](combobox-role-associated-popup.html)
  * @axe-core/cli: [Results](combobox-role-associated-popup-axe.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/314)
  * validator.nu: [Results](combobox-role-associated-popup-vnu.json)
* [Dialog Must Have Name](dialog-must-have-name.html)
  * @axe-core/cli: [Results](dialog-must-have-name-axe.json)
  * validator.nu: [Results](dialog-must-have-name-vnu.json)
* [Error message MUST be pertinent](errormessage-hidden-removed.html)
  * @axe-core/cli: [Results](errormessage-hidden-removed-axe.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/328)
* [Form MUST have name](form-role-must-have-name.html)
  * @axe-core/cli: [Results](form-role-must-have-name-axe.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/329)
  * validator.nu: [Results](form-role-must-have-name-vnu.json)
* [Img Role Must Have Name](img-role-must-have-name.html)
  * @axe-core/cli: [Results](img-role-must-have-name-axe.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/316)
  * validator.nu: [Results](img-role-must-have-name-vnu.json)
* [Listbox Group Children Must Be Option](listbox-group-children-must-be-option.html)
  * @axe-core/cli: [Results](listbox-group-children-must-be-option-axe.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/313)
  * validator.nu: [Results](listbox-group-children-must-be-option-vnu.json)
* [aria-expanded no longer supported on listbox](listbox-aria-expanded-not-supported.html)
  * @axe-core/cli: [Results](listbox-aria-expanded-not-supported-axe.json), [bug](https://github.com/dequelabs/axe-core/issues/4433)
  * validator.nu: [Results](listbox-aria-expanded-not-supported-vnu.json), [bug](https://github.com/validator/validator/issues/1716)
* [Menuitemcheckbox Owned By Menu](menuitemcheckbox-owned-by-menu.html)
  * @axe-core/cli: [Results](menuitemcheckbox-owned-by-menu-axe.json)
  * validator.nu: [Results](menuitemcheckbox-owned-by-menu-vnu.json)
* [Menuitem Owned By Menu](menuitem-owned-by-menu.html)
  * @axe-core/cli: [Results](menuitem-owned-by-menu-axe.html)
  * validator.nu: [Results](menuitem-owned-by-menu-vnu.json)
* [Menuitemradio Owned By Menu](menuitemradio-owned-by-menu.html)
  * @axe-core/cli: [Results](menuitemradio-owned-by-menu-axe.html)
  * validator.nu: [Results](menuitemradio-owned-by-menu-vnu.json)
* [Must Have Owned Elements](must-have-owned-elements.html)
  * @axe-core/cli: [Results](must-have-owned-elements.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/292)
  * validator.nu: [Results](must-have-owned-elements-vnu.json)
* [Heading MUST have level](heading-role-must-have-level.html)
  * @axe-core/cli: [Results]()
  * validator.nu: [Results](heading-role-must-have-level-vnu.json)
* [Name Prohibited](name-prohibited.html)
  * @axe-core/cli: [Results](name-prohibited-axe.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/275)
  * validator.nu: [Results](name-prohibited-vnu.json)
* [Option Owned By Listbox](option-owned-by-listbox.html)
  * @axe-core/cli: [Results](option-owned-by-listbox-axe.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/313)
  * validator.nu: [Results](option-owned-by-listbox-vnu.json)
* [Row Must Not in Table Grid](row-must-not-in-table-grid.html)
  * @axe-core/cli: [Results](row-must-not-in-table-grid-axe.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/317)
  * validator.nu: [Results](row-must-not-in-table-grid-vnu.json)
* [Scrollbar Role Aria Controls](scrollbar-role-aria-controls.html)
  * @axe-core/cli: [Results](scrollbar-role-aria-controls-axe.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/318)
  * validator.nu: [Results](scrollbar-role-aria-controls-vnu.json)
* [Scrollbar Role Aria Valuenow](scrollbar-role-aria-valuenow.html)
  * @axe-core/cli: [Results](scrollbar-role-aria-valuenow-axe.json)
  * validator.nu: [Results](scrollbar-role-aria-valuenow-vnu.json)
* [Slide Role Aria Valuenow](slider-role-aria-valuenow.html)
  * @axe-core/cli: [Results](slider-role-aria-valuenow-axe.json)
  * validator.nu: [Results](slider-role-aria-valuenow-vnu.json)

## Writing Tests

In order to achieve a reasonable signal-to-noise ratio, please consider the following:

* Prefer one clearly-named test file per normative statement.
* Keep each test case in the file simple and valid, with the exception of the thing to be tested.
  This should maximize the likelihood that the validator error is due to what we are testing and
  not some other mistake.
* Each element being tested should have an id which reflects what is being tested and includes a
  sequential number. This should make it easier to spot any missing results.
* Include at the top of each file, the URL of the normative statement, the text of the normative
  statement, and a link to any additional details (such as a list of roles to which the normative
  statement applies). This information should be contained as a comment so that the validator does
  not include those elements in its validation.
* Update the README.md to include the file, results and possible bugs with the results. Put new test files in alphabetical order.

## Obtaining Results

Ideally we want results from validators with a command-line interface, JSON output, and the ability
to filter on a particular rule. As we find such validators, they will be documented here.

Having created a JSON file which is as noise-free as possible (e.g. contains only the violations),
create a pull request adding it to this repo. Please be sure to also update this README.md to
include the new results.

Please examine the results carefully to be sure that what the validator flagged is the same error
being tested, and file bugs for missing implementations. Your results submission should include a
link to the bug you filed. See what was done above for Name Prohibited for @axe-core/cli.

## Validator Tips and Tricks

### Using @axe-core/cli

* Documentation: [@axe-core/cli](https://www.npmjs.com/package/@axe-core/cli)
* Issue tracker: https://github.com/dequelabs/axe-core

#### General Tips
* Run a single test with no arguments to see all the errors:
  ```
  axe https://w3c.github.io/aria/validator-tests/name-prohibited.html
  ```
* Run a single test with `--tags cat.aria` to just get the ARIA errors
  ```
  axe https://w3c.github.io/aria/validator-tests/name-prohibited.html --tags cat.aria
  ```
* If there is already an appropriate error rule, you can use it to see if it catches all errors:
  ```
  axe https://w3c.github.io/aria/validator-tests/name-prohibited.html --rules aria-allowed-attr
  ```
* If there is not already an appropriate error rule, you can disable the irrelevant rules:
  ```
  axe https://w3c.github.io/aria/validator-tests/name-prohibited.html \
  --tags cat.aria --disable=aria-roles
  ```
* Having removed as much noise as possible by specifying or disabling rules, rerun the command with `--save`:
  ```
  axe https://w3c.github.io/aria/validator-tests/name-prohibited.html \
  --rules aria-allowed-attr --save name-prohibited.json
  ```
* When you look at the resulting JSON file, you may notice that there are both violations and other serious warnings.
  In cases where we are only interested in violations, we can do some additional processing, e.g.:
  ```
  axe https://w3c.github.io/aria/validator-tests/name-prohibited.html --rules aria-allowed-attr \
  --stdout | jq ".[0].violations" > name-prohibited-axe.json
  ```

  jq is a command line json processor - if not installed it can be installed from https://stedolan.github.io/jq/download/

#### Local Installation
If you cannot install @axe-core/cli globally as described in the documentation, install it locally:

```
mkdir local-axe && cd local-axe
npm init -y
npm install @axe-core/cli --save
```

Having done so, you can run @axe-core/cli from within `local-axe` using `npx axe`. For example:

```
npx axe https://w3c.github.io/aria/validator-tests/name-prohibited.html --tags cat.aria
```

#### Testing Local Files
If the file you want to test with @axe-core/cli is not yet on a server, you may get an error.
You can solve this by starting a local server. Let's say your test file is `foo.html` and is
inside the `my-test-files` directory.

```
cd my-test-files
python -m http.server
```

Having done the above, the URL is `http://localhost:8000/foo.html` and the following should work:

```
axe http://localhost:8000/foo.html --tags cat.aria
```

### Using Validator.nu 

First, [download the validator](https://github.com/validator/validator). You can download a java .jar or an
executable for your platform.

If you download the .jar and you have java installed, you can run the validator against the raw html files:

```
java -jar /path/to/vnu.jar /path/to/aria/validator-tests/menuitem-owned-by-menu.html
```

Vnu can output JSON but it is not easy to read. For JSON results, we recommend using `jq` to make the results more readable.

```
java -jar /path/to/vnu.jar --format json /path/to/aria/validator-tests/menuitem-owned-by-menu.html |& jq > menuitem-owned-by-menu-vnu.json
```

#### Filing bugs against Validator.nu

Bugs can be filled here: [https://github.com/validator/validator](https://github.com/validator/validator).