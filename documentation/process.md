# ARIA WG Process Document

## Issues
1. An issue is made on the ARIA repository
2. New issues are "triaged" at the next ARIA WG meeting. During triage, the following happens:
   - A release tag is added for purposes of prioritizing whether the issue is resolved in the current release of ARIA or a subsequent release.
   - WG members are assigned to the issue if appropriate.
   - If the issue clearly needs group discussion, the "agenda" tag is added to the issue in order for the issue to be scheduled for discussion at a later meeting.
3. WG members can add the "agenda" tag to any issue they feel needs more discussion in order to reach consensus.
4. After the issue is discussed in a meeting, a WG member should be assigned to summarize the conclusion of the discussion in the issue and open a PR with relevant changes.

## Pull Requests

Newly opened PRs are "triaged" at the next ARIA meeting. At triage, it is decide:
- Who should review the PR
- If the PR needs extra discussion by the whole ARIA WG, the "agenda" tag can be added.

### Normative Changes

A "normative" change is change to the specification that is not editorial, that is, it will change the implementation of the ARIA in browsers (for example, adding a new attribute) OR it will change how ARIA can or should be used by web authors (for example, changing which attributes are allowed on a role).

#### Requirements for merging a normative PR:
1. **Consensus:** The change in the PR has been discussed in a ARIA WG meeting and the general direction of the change has been consensed on. The ARIA WG's consensus should be recorded in comments of the PR or in the comments of the issue that the PR resolves.
    - If a PR has been opened for an issue that has not been discussed, or if the PR has been open to explore an option that the ARIA WG has not yet come to consensus on, the PR should be left in the draft state.
    - During the course of review of the PR, the consensus of the ARIA WG might change. This can happen in any ARIA WG meeting. Changes should be recorded in the comments of the PR.
2. **Review:** Every PR needs at least two approving reviews from ARIA WG members, but depending on the complexity of the change, the ARIA WG may assign additional reviewers.
    - The reviewers should be made based on the text and meaning of the change, not on whether the checklist has been fulfilled.
    - Any working group member can add themselves as a reviewer.
    - Any one from the general public is allowed to review PRs in order to inform the ARIA WG of approval or concerns.
3. **Tests:** If the change is testable, tests should be add to the validators directory or WPT repo before merging, or, if the PR owner does not have the expertise to write tests, issues should be file in the ARIA repository as a follow up. See [Aria Test Overview](tests.md).
4. **APG:** If the change requires a change to the [APG](https://github.com/w3c/aria-practices), an issue on the APG should be made describing the change.
5. **Implementation:** If the change requires implementation changes, issues should be opened on the browser after the PR has been approved.
   - At least one implementation is required for merge. Implementation or implementation commitment from two browsers is required for merge.
6. **Related Spec Changes:** If the change requires changes to CORE-AAM, HTML-AAM or AccName, the PRs with dependent changes should be merged at the same time. All repositories have the same review and implementation requirements before merging.

Note: The fact that a PR requires implementation to merge is new as of 2022. We understand this will cause the life of a PR to be long -- and that the original champion of the PR might need to hand off work to another ARIA WG member while the PR waits for implementations.

### Editorial Changes

An "editorial" change is a change that is not normative. Editorial changes are things like grammar fixes, improvements to a section for improve readability or clarity, re-organization, the introduction of terms, etc.

1. A PR with only editorial changes MUST have "Editorial: " at the beginning of the PR's title.
2. An editorial change PR needs at least two approving review to be merged, but another reviewer can be request if the change is complex.

### Branches

Important branches in the ARIA repository:
1. **main**: All new PRs should be open against the main branch.
2. The next release branches, such as **1.3**. (At the time of current editing, Nov 4 2022, the 1.2 branch is called "stable".) 

## Normative Change Checklist

The "normative change checklist" list a kind of "to do list" for all the changes that must happen else where (in CORE-AAM, browsers, or the APG) in order for a change to be considered ready for merge. Check the box when there is a relevent issue or PR related to the item in the list, and link the relevant issue or PR. Some of the things in the list may not apply to your change, if they don't apply, check the box and write "n/a". If you aren't sure whether something applies, leave it uncheck.

The normative change checklist should be included in the PR template when you open a PR, if for some reason it is missing, you can copy it into the description of the PR:
[Normative Change Checklist](https://github.com/w3c/aria/blob/main/.github/pull_request_template.md).