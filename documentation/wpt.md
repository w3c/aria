
# Running the WPT Tests for ARIA and Related Specs


1. Clone the WPT Git Repository https://github.com/web-platform-tests/wpt

2. Review [System Setup Documentation](https://web-platform-tests.org/running-tests/from-local-system.html#system-setup) on the WPT site.



## Setting up a macOS machine for WPT testing.

1. Add the following to `~/.zprofile` or wherever you define your shell path.
```shell
export PATH="$( python3 -m site --user-base )/bin:$PATH"
```
To get the change, open a new shell tab/window, or paste the same line into your current shell.

2. In Terminal, `cd` to a directory where you downloaded the WPT source, then:
```shell
./wpt make-hosts-file | sudo tee -a /etc/hosts
```

3. Set up the virtual environment.
```shell
pip3 install --user virtualenv
```

4. Add the local WPT server hostname to your `/etc/hosts` file.
```shell
./wpt make-hosts-file | sudo tee -a /etc/hosts
```

For more information on setting up macOS or other systems review the [System Setup Documentation](https://web-platform-tests.org/running-tests/from-local-system.html#system-setup) on the WPT site.



## Running the WPT tests on Mac.

1. Download Safari Technology Preview and Google Chrome Canary.

2. In Safari Technology Preview, select Safari Menu… Settings… Advanced… "Show Develop menu in menu bar" then select Develop Menu… "Allow Remote Automation." or alternately, in Terminal, do: 
```shell
sudo /Applications/Safari\ Technology\ Preview.app/Contents/MacOS/safaridriver --enable
```

3. Attempt to run the ARIA tests in Safari from Terminal.
```shell
./wpt run --log-mach-level debug --log-mach - --webdriver-arg="--diagnose" safari wai-aria html-aam accname
```
  - Note 1: Watch out for hyphens in CLI params. Depending on the text field you copy out of, autocorrect may convert the double hyphens to en dashes (–) which look identical in a monospace shell. Speaking from experience. 😉
  - Note 2: the tokens "wai-aria html-aam accname" are relative directory paths... You can also use an absolute path from the top-level WPT repo to a dir (/wai-aria) or to a single file (/wai-aria/role/role.html).

4. You'll receive some amount of currently expected failures, but look for an overall results block in the scroll back similar to this:
```
web-platform-test
~~~~~~~~~~~~~~~~~
Ran 300 checks (280 subtests, 20 tests)
Expected results: 256
Unexpected results: 44
  test: 2 (2 crash)
  subtest: 42 (42 fail)
```

5. You should be able to run the same tests in Chrome by changing "safari" to "chrome" in Terminal: (Note, it will likely prompt to install chromedriver on first run.)
```shell
./wpt run --log-mach-level debug --log-mach - --webdriver-arg="--diagnose" chrome wai-aria html-aam accname
```

## Notes

When you run multiple tests (e.g. 'accname' will run everything in the accname dir) auto-dismiss is enabled, so the browser windows will appear and disappear quickly, leaving you with shell terminal log output as the only result. 

However, when you run a single HTML test, TestDriver will pause and let you review the source and results in the browser window for further inspection.

Run the "region roles" test as an example.
```shell
./wpt run --log-mach-level debug --log-mach - --webdriver-arg="--diagnose" safari /wai-aria/role/region-roles.html
```

### Security Dialog Note

1. When the test completes in Safari, click on the browser window displaying the test results. 
2. A security prompt will inform you this Window is being controlled by automation. 
3. Select "Stop Session" to inspect the Window. 
4. Don't select "Turn Off All Automation" as this will disable remote testing and you'll need to re-enable it using the Safari steps listed above, before running additional WPT tests. 

Note: Chrome does not give a similar Security prompt. I presume it stops the session and just leaves the window open.


### Writing New WPT Tests for ARIA and Related Specs

- Start by reviewing the existing WPT tests in /wai-aria, /html-aam, /accname, and other spec directories. 
- Check the META.yml file in those directories to find the primary reviewers. 
- Review [/wai-aria/scripts/aria-utils.js](https://github.com/web-platform-tests/wpt/blob/master/wai-aria/scripts/aria-utils.js), as this contains a few convenience methods many of the other tests use.
- WPT doesn't require an Issue for every PR, but you're welcome (encouraged) to file WPT Issues in the relevant spec repository. (E.g., /w3c/aria/issues/new for a new ARIA WPT test, rather than /web-platform-tests/wpt/issues/new).
- Some issues are being tracked elsewhere, for example, the [Interop 2023 Accessibilty Investigation](https://github.com/web-platform-tests/interop-accessibility/issues)
- Additional info in the [ARIA "Tests" documentation](./tests.md)


### Viewing the Continuous Integration Results for a Pull Request in WPT

When you write a new test in WPT, or update an existing one, wait for the PR Checks to complete in your Draft PR. There should be three results listings for the WebKit ("safari"), Gecko ("firefox"), and Chromium ("chrome"). These can appear in any order, but they are usually near the bottom of the Checks list.

 - wpt.fyi - safari[experimental]
 - wpt.fyi - firefox[experimental]
 - wpt.fyi - chrome[experimental]

Once you select a test result:

1. Click on the Details link for either safari or chrome. (At the time of this writing, firefox was not running most of the accessibilty tests in WPT)
2. On the results page, click "Visual comparison of the results"… Explore these results similar to the CI listings on wpt.fyi
3. Once you get down to an individual test run, you may also wish to enabled the "Show Details" switch to see the log messages for each failing subtest.

