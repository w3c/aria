# Web Applications Working Group

Contributions to this repository are intended to become part of Recommendation-track documents
governed by the [W3C Patent Policy](http://www.w3.org/Consortium/Patent-Policy/) and
[Document License](http://www.w3.org/Consortium/Legal/copyright-documents). To contribute, you must
either participate in the relevant W3C Working Group or make a non-member patent licensing
commitment.

If you are not the sole contributor to a contribution (pull request), please identify all
contributors in the pull request's body or in subsequent comments.

To add a contributor (other than yourself, that's automatic), mark them one per line as follows:

```
+@github_username
```

If you added a contributor by mistake, you can remove them in a comment with:

```
-@github_username
```

If you are making a pull request on behalf of someone else but you had no part in designing the
feature, you can remove yourself with the above syntax.

## Tests

For normative changes, a corresponding
[web-platform-tests](https://github.com/web-platform-tests/wpt) PR should be included. Typically,
both PRs will be merged at the same time. Note that a test change that contradicts the spec should
not be merged before the corresponding spec change. If testing is not practical, please explain why
and if appropriate [file an issue](https://github.com/web-platform-tests/wpt/issues/new) to follow
up later. Add the `type:untestable` or `type:missing-coverage` label as appropriate.

## Style guide to contributors

- the spec uses [ReSpec](https://github.com/w3c/respec/wiki)
- the spec is tidied using [HTML5 Tidy](https://github.com/w3c/tidy-html5). For
  instructions on running HTML5 tidy, see below.
- put comments in front of sections, for better readability with
  syntax coloring editors

## Running HTML5 Tidy

Please make sure you have HTML5 tidy installed, instead of
the one that ships with \*nix systems. You can confirm this by running:

```bash
tidy --version
#HTML Tidy for [some OS] version...
```

Once you have confirmed (make sure you have committed your changes before
running tidy, as the changes are destructive ... in a good way:)):

```bash
tidy -config tidyconfig.txt -o index.html index.html
```
