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

## ARIA IDL Interface Tests

Automated tests for the [ARIA IDL interface](https://w3c.github.io/aria/#idl-interface) are in WPT. We have two test files:
* [aria-attribute-reflection.html](https://github.com/web-platform-tests/wpt/blob/master/html/dom/aria-attribute-reflection.html), [Results on wpt.fyi](https://wpt.fyi/results/html/dom/aria-element-reflection.html?label=experimental&label=master&aligned&view=subtest)
* [aria-element-reflection.html](https://github.com/web-platform-tests/wpt/blob/master/html/dom/aria-element-reflection.html), [Results on wpt.fyi](https://wpt.fyi/results/html/dom/aria-attribute-reflection.html?label=experimental&label=master&aligned&view=subtest)

When the IDL Interface section is updated, these tests should be update accordingly.

## WAI-ARIA Tests

- [Results of ARIA tests in WPT](https://wpt.fyi/results/wai-aria?label=master&label=experimental&aligned)
- [Source of ARIA tests in WPT](https://github.com/web-platform-tests/wpt/tree/master/wai-aria)
- [Additional Issues for new automated tests](https://github.com/web-platform-tests/interop-2023-accessibility-testing/issues).
- Manual Tests:
  -  Some additional platform-specific tests mapping tests are located in [WPT's core-aam folder](https://github.com/web-platform-tests/wpt/tree/master/core-aam). They are "manual" tests in that you have to use a tool outside of the web browser and WPT test suite to inspect the accessibility API. For now, Valerie will maintain these CORE-AAM tests and no one else needs to write them.

## HTML-AAM Tests

- [Results of HTML-AAM tests in WPT](https://wpt.fyi/results/html-aam?label=master&label=experimental&aligned)
- [Source of HTML-AAM tests in WPT](https://github.com/web-platform-tests/wpt/tree/master/html-aam)

## AccName Tests

- [Results of AccName tests in WPT](https://wpt.fyi/results/accname?label=master&label=experimental&aligned)
- [Source of AccName tests in WPT](https://github.com/web-platform-tests/wpt/tree/master/accname)
- Outstanding PRs
  - More structure coming in [WPT #39604](https://github.com/web-platform-tests/wpt/pull/39604)
  - ShadowDom Label Tests in [WPT #36541](https://github.com/web-platform-tests/wpt/pull/36541)

# Interop 2023 Accessibility Investigation 

Many of the automated tests in listed above started as a [Accessibility Investigation](https://github.com/web-platform-tests/interop-2023-accessibility-testing) for Web Platform Tests Interop 2023. Revew the [Issues List](https://github.com/web-platform-tests/interop-2023-accessibility-testing/issues) and [Scoring Criteria](https://github.com/web-platform-tests/interop-2023-accessibility-testing/issues/3) for more detail.
