# ARIA WG Process Document

## Issues
1. An issue is made on an ARIA WG repository.
2. New issues are "triaged" at the next ARIA WG meeting. During triage, the following happens:
   - The issues are moved to the appropriate issue tracking repo, if necessary.
   - A release label is added for purposes of prioritizing which year we expect to be able to resolve the problem or feature request.
   - WG members are assigned to the issue if appropriate.
   - If the issue clearly needs group discussion, the `agenda` label is added to the issue in order for the issue to be scheduled for discussion at a later meeting.
3. WG members can add the `agenda` label to any issue they feel needs more discussion in order to reach consensus.
4. After the issue is discussed in a meeting, a WG member should be assigned to summarize the conclusion of the discussion in the issue and open a PR with relevant changes.

## Pull requests

Newly opened PRs are triaged at the next ARIA meeting. At triage, the group decides who should review the PR. If the PR needs extra discussion by the whole ARIA WG, the `agenda` label can be added

Draft PRs are not triaged at meeting and are considered not ready for review. If you want to prevent an approved PR from getting merged, add the `do not merge` label.

PR Labels:
- `spec:aria`, `spec:accname`, `spec:core-aam`, `spec:html-aam`, `spec:<spec-short-hand>` should be used for all specs which have changes in this PR. 
- `waiting for implementations`: if a normative PR has been approved but there are no implementations yet, then use this flag to indicate it can be merged when the implementations are completed.
- `do not merge`: if a PR has approving reviews and implementations but there is other some reason to wait for merging.
- `*-tracker`: the group has asked the relevant horizontal group for review and is waiting for them to finish their review.
- `*-needs-resolution`: the horizontal group has provided feedback that needs to be resolved before advancing through the REC Track.

### Normative changes

A "normative" change is a change to the specification that:

- will change the implementation of ARIA in browsers (for example, adding a new attribute)
- will change how ARIA can or should be used by web authors (for example, changing which attributes are allowed on a role)

Changes that are meant to clarify how to conform to ARIA (both for author and user agent requirements) are considered normative if they make a previously non-conforming implementation conforming or vice-versa. For more details, see [Class 3 changes prose in W3C process](https://www.w3.org/policies/process/#class-3).

#### Requirements for merging a normative PR

The evergreen process allows for significant reduction of the necessary steps for a normative spec change to be included in the Recommendation.

- The change (together with its proper annotation  that allows readers to understand its scope) is included in a "Recommendation with Proposed Amendments".
- The change is reviewed by the Advisory Committee. Generally we submit a batch with several changes, once per Charter period (every two years).
- If approved, the change is incorporated into the existing Recommendation.
- If not approved, the change is brought back to the group for further refinement.

This in practice diminishes the concept of Editor's Draft. Spec editors, Chairs, and Staff Contact should merge PRs only when the group considers that the change is ready for AC review.

1. **Consensus:** The change in the PR has been discussed in an ARIA WG meeting and the group agrees the change is ready for Advisory Committee review.
    - The ARIA WG's consensus should be recorded in comments of the PR or in the comments of the issue that the PR resolves.
2. **Review:** Every normative PR needs 3 approving reviews from ARIA WG members, but depending on the complexity of the change, the ARIA WG may assign additional reviewers.
    - The reviewers should be made based on the text and meaning of the change, not on whether the checklist has been fulfilled.
    - Any Working Group member can add themselves as a reviewer.
    - Any one from the general public is allowed to review PRs in order to inform the ARIA WG of approval or concerns.
3. **Tests:** If the change is testable, tests should be added to the validators directory or WPT repo before merging. If the PR owner does not have the expertise to write tests, issues should be file in the ARIA repository as a follow up. See [Aria Test Overview](tests.md).
4. **APG:** If the PR will require changes to the [APG](https://github.com/w3c/aria-practices), an issue on the APG should be made describing the change.
5. **Horizontal Review:** The horizontal review labels are applied to alert W3C Horizontal Groups of the proposed change and to start the Horizontal Review process. These include:
    - `security-tracker`
    - `privacy-tracker`
    - `a11y-tracker`
    - `i18n-tracker`
    - `tag-tracker`
6. **ACT Review:** If the PR will require [ACT rules](https://www.w3.org/WAI/standards-guidelines/act/rules/) changes, then the label `needs ACT review` must be added. This will trigger the process of triage and potentially review by the [ACT Task Force](https://www.w3.org/WAI/about/groups/task-forces/conformance-testing/). When the PR has been reviewed and concerns resolved, the ACT Task Force will mark the PR as approved by checking the box in the PR tracking list in the description of the PR. The label may be added at different times:
    - If the change introduces an "authors must", or if the editors think the change will have a significant effect on authors, the label should be added the same time reviewers are requested.
    - If the change minimally affects authors, the label can be added when issues are opened on browsers.
7. **Implementation:** If the change requires implementation changes, issues should be opened on the browsers after the PR has been approved and tests have been authored.
    Because we don't plan to go back to Candidate Recommendation, two implementations are required for merge.

#### After merge

If the change introduces, removes or affects existing "Author MUST" statements, open issues on validators.

#### Stages of a normative change

##### Stage one: `waiting for review`

In this stage, the normative change (sometimes spanning multiple specifications) should be written and reviewed. When changes have three approving reviews, we move to the next stage.

##### Stage two: `waiting for tests`

Test should be written after the spec language is approved by three approving reviews. At this time, changes to test in WPT can land because the spec changes are considered finalized, but they must land with the ".tentative" file ending. Note: not all normative changes in ARIA are currently testable, so if they are not testable, tests are not required.

##### Stage 3: Horizontal Review:

As long as the PR has any of the `*-tracker` or `*-needs-resolution` labels, the PR is considered to be on the Horizontal Review phase. It is not advised to proceed with implementations at least until it is clear that the Horizontal Review comments are not going to significantly alter the proposed change.

##### Stage four: `waiting for implementations`

Once tests have been written, open issues on the browsers with clear links to all relevant PRs and tests. Add the `waiting for implementations` label to the PR.

##### Stage five: merged!

When there are two implementations from browsers, merge!

If the change introduces an author MUST requirement, then open issues on validators to inform them of the change. Validators include:
* [Axe-Core](https://github.com/dequelabs/axe-core/issues)
* [Nu Html Checker ](https://github.com/validator/validator/issues)

### Editorial changes

An "editorial" change is a change that is not normative. Editorial changes are things like grammar fixes, improvements to a section for improving readability or clarity, re-organization, the introduction of terms, etc.

1. A PR with only editorial changes MUST have "Editorial: " at the beginning of the PR's title.
2. An editorial change PR needs at least two approving reviews to be merged, but another reviewer can be request if the change is complex.

### Branches

Important branches in the ARIA repository:
1. **main**: All new PRs should be open against the main branch.
2. Feature branches: Where the changes are discussed, horizontally reviewed, and agreed upon by the group.
3. Stacked PR branches: For cases where the change is either two complex or it's taking too long to reach consensus, it may be easier to see other proofs of concept as stacked PRs against the feature branch.

## Normative change checklist

The "normative change checklist" lists a kind of "to do list" for all the work that must happen in order for a change to be considered ready for merge. Check the box when there is a relevant issue or PR related to the item in the list, and link the relevant issue or PR. Some of the things in the list may not apply to your change, if they don't apply, check the box and write "n/a". If you aren't sure whether something applies, leave it unchecked.

The normative change checklist should be included in the PR template when you open a PR, if for some reason it is missing, you can copy it into the description of the PR:
[Normative Change Checklist](https://github.com/w3c/aria/blob/main/.github/pull_request_template.md).
