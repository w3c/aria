**Editors Note.** Archived wiki page https://github.com/w3c/aria/wiki/Monorepo-Project, last edited May 21, 2024.

# Monorepo Project

Moving specifications into a monorepo, which repos -- all of them?
* [Accessible Name and Description Computation (aka "accname")](https://github.com/w3c/accame)
* [CORE-AAM](https://github.com/w3c/core-aam)
* [HTML-AAM](https://github.com/w3c/html-aam)
* [DPUB-ARIA](https://github.com/w3c/dpub-aria)
* [DPUB-AAM](https://github.com/w3c/dpub-aam)
* [MathML-AAM](https://github.com/w3c/mathml-aam)
* [Graphics-ARIA](https://github.com/w3c/graphics-aria)
* [Graphics-AAM](https://github.com/w3c/graphics-aam)
* [SVG-AAM](https://github.com/w3c/svg-aam)

We will move after the recharter:
* [HTML-ARIA](https://github.com/w3c/html-aria)

ARIA [Monorepo](https://github.com/w3c/aria/tree/monorepo) branch starts off with a basic structure + some demo GitHub workflows for publication.
Open questions:
* What other specs use a monorepo, what is their insight on this proposal?
  * [ePub Working Group](https://github.com/w3c/epub-specs) is currently using a "monorepo" approach. Publlishing ever-green specs is doable with current [specprod options](https://w3c.github.io/spec-prod/#options). Daniel will set up a proposal for handling our specs.
* How to publish the different specifications from one repo
   * How to publish evergreen vs versioned specifications
     * Daniel suggests that we use automated publication for ever-green specs but we keep using manual publication for versioned specs. Most transition requests need to happen manually anyway.
* How to maintain old URLs (like github.io editor's drafts)
* What URL to use for editor's drafts
* How to modify ARIA process
* Whether to leave repositories open for issue tracking
* Are modifications necessary for pr-preview?
* What will we do with open PRs?
* Do we want to take the time to change some old branch mnaming and usage? HTML-aam still uses gh-pages as the main branch.

Example of monorepos:
* https://github.com/w3c/epub-specs


## notes

### merging git repositories

Based on  https://build5nines.com/git-merge-repositories-with-history/

Terminology: 'source' repository (e.g., accname) getting merged into 'target' repo (as a subfolder, e.g., aria).

Strategy: use `git-filter-repo` to rewrite source repository, moving its content into a subfolder. Then merge that rewritten repository into the target repository.

- install https://github.com/newren/git-filter-repo/
- Clone source 
  - `$ git clone https://github.com/w3c/source.git source`
  - `$ cd source`
- Use 'git-filter-repo' to rewrite 'source' repo to subfolder named 'Foo' (maintaining history)
  - `$ git filter-repo -f --to-subdirectory-filter Foo --tag-rename :foo-`
  - After running the root '/' contents of 'source' repo will be located in '/Foo/' subfolder
- Clone target
  - `$ git clone https://github.com/build5nines/target-repo.git target`
- Prep 'target' repo:
  - `$ cd target`
  - `$ git checkout -b merged-repos`
- Add source as (local folder) git remote to 'target'
  - `$ git remote add -f source ../source`
- merge source repo into target, allowing unrelated history
  `$ git merge --allow-unrelated-histories -m 'merge source repository with history' source/main` 
- Push branch to remote / GitHub
  `$ git push --set-upstream origin merged-repos`
