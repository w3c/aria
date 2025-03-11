#!/bin/bash

# build relative links to ARIA spec
find . -maxdepth 1 -type f -name "index.html" -exec sed -i 's|ED: "https://w3c\.github\.io/|ED: "./|g' {} +

# build lins to ARIA from chil specs
find . -mindepth 2 -type f -name "index.html" -exec sed -i 's|ED: "https://w3c\.github\.io/aria/|ED: "/|g' {} +

# build relative links for child specs
find . -mindepth 2 -type f -name "index.html" -exec perl -pi -e 's|ED: "https://w3c\.github\.io/(?!aria)|ED: "/|g' {} +
# build all specs
npx respec -s index.html -o index.html --localhost
npx respec -s accname/index.html -o accname/index.html --localhost
npx respec -s core-aam/index.html -o core-aam/index.html --localhost
npx respec -s dpub-aam/index.html -o dpub-aam/index.html --localhost
npx respec -s dpub-aria/index.html -o dpub-aria/index.html --localhost
npx respec -s graphics-aam/index.html -o graphics-aam/index.html --localhost
npx respec -s graphics-aria/index.html -o graphics-aria/index.html --localhost
npx respec -s svg-aam/index.html -o svg-aam/index.html --localhost
npx respec -s mathml-aam/index.html -o mathml-aam/index.html --localhost