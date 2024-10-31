# ARIA WG Process Document

## Issues
1. An issue is made on an ARIA WG repository
2. New issues are "triaged" at the next ARIA WG meeting. During triage, the following happens:
   - The issues is moved to the appropriate issue tracking repo, if necessary
   - A release label is added for purposes of prioritizing which year we expect to be able to resolve the problem or feature request.
   - WG members are assigned to the issue if appropriate.
   - If the issue clearly needs group discussion, the "agenda" label is added to the issue in order for the issue to be scheduled for discussion at a later meeting.
3. WG members can add the "agenda" label to any issue they feel needs more discussion in order to reach consensus.
4. After the issue is discussed in a meeting, a WG member should be assigned to summarize the conclusion of the discussion in the issue and open a PR with relevant changes.

## Pull Requests

Newly opened PRs are "triaged" at the next ARIA meeting. At triage, it is decide:
- Who should review the PR
- If the PR needs extra discussion by the whole ARIA WG, the "agenda" label can be added.

Draft PRs are not triaged at meeting and are considered not read for review. If you want to prevent an approved PR from getting merged, add the `do not merge` label.

PR Labels:
- `waiting for implementations`: if a normative PR has been approved but there are no implementations yet, then use this flag to indicate it can be merged when the implementations are completed.
- `do not merge`: if a PR has approving reviews but there is some reason to wait for merging.

### Normative Changes

A "normative" change is change to the specification that is not editorial, that is, it will change the implementation of the ARIA in browsers (for example, adding a new attribute) OR it will change how ARIA can or should be used by web authors (for example, changing which attributes are allowed on a role).

#### Requirements for merging a normative PR:
1. **Consensus:** The change in the PR has been discussed in a ARIA WG meeting and the general direction of the change has been consensed on.
    - The ARIA WG's consensus should be recorded in comments of the PR or in the comments of the issue that the PR resolves.
    - If a working group member is not sure about whether a PR's change has consensus, they should add the tag "needs consensus" and "agenda", and it will be discussed in a meeting.
2. **Review:** Every normative PR needs 3 approving reviews from ARIA WG members, but depending on the complexity of the change, the ARIA WG may assign additional reviewers.
    - The reviewers should be made based on the text and meaning of the change, not on whether the checklist has been fulfilled.
    - Any working group member can add themselves as a reviewer.
    - Any one from the general public is allowed to review PRs in order to inform the ARIA WG of approval or concerns.
3. **Tests:** If the change is testable, tests should be add to the validators directory or WPT repo before merging, or, if the PR owner does not have the expertise to write tests, issues should be file in the ARIA repository as a follow up. See [Aria Test Overview](tests.md).
4. **APG:** If the change requires a change to the [APG](https://github.com/w3c/aria-practices), an issue on the APG should be made describing the change.
5. **Implementation:** If the change requires implementation changes, issues should be opened on the browser after the PR has been approved.
   - At least one implementation is required for merge. Implementation or implementation commitment from two browsers is required for merge.
6. **AT Commitment:** If the feature requires a change in AT, add the tag "waiting for AT commitment". AT Commitment should be record in the comments of the PR.


Note: The fact that a PR requires implementation to merge is new as of 2022. We understand this will cause the life of a PR to be long -- and that the original champion of the PR might need to hand off work to another ARIA WG member while the PR waits for implementations.

#### Stages of a normative change

##### Stage one: `Waiting for Review`

In this stage, the normative change (sometimes spanning multiple specifications) should be written and reviewed. When changes have three approving reviews, we move to the next stage.

##### Stage two: `Waiting for Tests`

Test should be written after the spec language is approved by three approving reviews. At this time, changes to test in WPT can land because the spec changes are considered finalized, but they must land with the ".tentative" file ending. Note: not all normative changes in ARIA are currently testable, so if they are not testable, tests are not required.

##### Stage three: `Waiting for Implementations`

Once tests have been written, open issues on the browsers with clear links to all relevant PRs and tests. Add the `waiting for implementations` label to the PR.

##### Stage four: merged!

When there is at least one implementation and implementation commitment from other browsers, merge!

### Editorial Changes

An "editorial" change is a change that is not normative. Editorial changes are things like grammar fixes, improvements to a section for improve readability or clarity, re-organization, the introduction of terms, etc.

1. A PR with only editorial changes MUST have "Editorial: " at the beginning of the PR's title.
2. An editorial change PR needs at least two approving review to be merged, but another reviewer can be request if the change is complex.

### Branches

Important branches in the ARIA repository:
1. **main**: All new PRs should be open against the main branch.
2. The next release branches, such as **1.3**. (At the time of current editing, Nov 4 2022, the 1.2 branch is called "stable".) 

## Normative Change Checklist

The "normative change checklist" list a kind of "to do list" for all the work that must happen in order for a change to be considered ready for merge. Check the box when there is a relevant issue or PR related to the item in the list, and link the relevant issue or PR. Some of the things in the list may not apply to your change, if they don't apply, check the box and write "n/a". If you aren't sure whether something applies, leave it unchecked.

The normative change checklist should be included in the PR template when you open a PR, if for some reason it is missing, you can copy it into the description of the PR:
[Normative Change Checklist](https://github.com/w3c/aria/blob/main/.github/pull_request_template.md).