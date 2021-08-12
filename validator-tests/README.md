# ARIA Validator Tests

These tests are to be run against validators to ensure changes to the ARIA spec result in
corresponding changes in validators.

## Test Files and Results

### ARIA 1.2

* [Abstract Roles Prohibited](abstract-roles-prohibited.html)
  * @axe-core/cli: [Results](absract-roles-prohibited.json)
* [Dialog Must Have Name](dialog-must-have-name.html)
  * @axe-core/cli: [Results](dialog-must-have-name-axe.json)
* [Error message MUST be pertinent](errormessage-hidden-removed.html)
  * @axe-core/cli: [Results](errormessage-hidden-removed-axe.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/328)
* [Img Role Must Have Name](img-role-must-have-name.html)
* [Menuitemcheckbox Owned By Menu](menuitemcheckbox-owned-by-menu.html)
* [Menuitem Owned By Menu](menuitem-owned-by-menu.html)
* [Menuitemradio Owned By Menu](menuitemradio-owned-by-menu.html)
* [Must Have Owned Elements](must-have-owned-elements.html)
  * @axe-core/cli: [Results](must-have-owned-elements.json), [bug](https://github.com/dequelabs/axe-core-npm/issues/292)

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
* Issue tracker: https://github.com/dequelabs/axe-core-npm

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
python -m SimpleHTTPServer
```

Having done the above, the URL is `http://localhost:8000/foo.html` and the following should work:

```
axe http://localhost:8000/foo.html --rules aria-allowed-attr
```
