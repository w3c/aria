# ARIA Testing Documentation

## ARIA "author MUST" / Validator Tests

Validator tests are written for "author MUST" or "author MUST NOT" statements. An "author MUST" statement is testable if an HTML validator (such as [AXE](https://www.deque.com/axe/) or [validator.nu](https://validator.nu/) can test whether a given piece of HTML conforms to the specification. Not all "author must" statements are testable. For example, the following statement is testable:

> In order for elements with a role of img to be perceivable, authors MUST provide a label using the aria-label or aria-labelledby attribute.

But the following statement is not testable, because managing focus is dynamic and cannot be done by an html validator:

> Authors MUST manage focus on the following container roles...

The validator tests belong in the [validator-test directory](https://github.com/w3c/aria/tree/main/validator-tests). When adding or updating a test, also supply the test results required in the [README](https://github.com/w3c/aria/tree/main/validator-tests/README.md).

## ARIA "user agent MUST"

Ideally, we should have a test suite to test all "user agent MUST" statements, but we do not have the tooling to write all these tests.

If our change adds or changes a "user agent must" or "user agent must not" statement, please add a issue describing the test one the PR is ready for merge.

## ARIA IDL Interface

Automated tests for the [ARIA IDL interface](https://w3c.github.io/aria/#idl-interface) are in WPT. We have two test files:
* [aria-attribute-reflection.html](https://github.com/web-platform-tests/wpt/blob/master/html/dom/aria-attribute-reflection.html), [Results on wpt.fyi](https://wpt.fyi/results/html/dom/aria-element-reflection.html?label=experimental&label=master&aligned&view=subtest)
* [aria-element-reflection.html](https://github.com/web-platform-tests/wpt/blob/master/html/dom/aria-element-reflection.html), [Results on wpt.fyi](https://wpt.fyi/results/html/dom/aria-attribute-reflection.html?label=experimental&label=master&aligned&view=subtest)

When the IDL Interface section is updated, these tests should be update accordingly.

## CORE-AAM Tests / WPT Tests

The tests are located in [WPT's core-aam folder](https://github.com/web-platform-tests/wpt/tree/master/core-aam). They are "manual" tests in that you have to use a tool outside of the web browser and WPT test suite to inspect the accessibility API. For now, Valerie will maintain these CORE-AAM tests and no one else needs to write them.

## HTML-AAM Tests

We do not yet have tests for HTML-AAM.

## AccName Tests

We do not yet have infrastructure for AccName tests. Better AccName tests are being investigated in this issue: https://github.com/w3c/accname/issues/174

When we have a new test framework for AccName test, we will create an initial set of tests and all following PRs to AccName will have a testing requirement.