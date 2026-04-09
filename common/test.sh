#!/bin/bash

# NOTE: Assumes there's a copy of w3c/aria in ../aria/

rm before.html after.html
git -C ../aria/ checkout ./common/script/aria.js
echo "Run respec on ../aria/index.html to generate 'before.html'"
npx respec --src ../aria/index.html --out before.html
echo "Copy ./script/aria.js to ../aria/common/script/"
cp ./script/aria.js ../aria/common/script/.
echo "Run respec on ../aria/index.html to generate 'after.html'"
npx respec --src ../aria/index.html --out after.html
echo "Run diff on 'before.html' and 'after.html'"
diff before.html after.html
echo "Clean up aria spec"
git -C ../aria/ checkout ./common/script/aria.js
