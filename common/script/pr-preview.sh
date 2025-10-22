#!/bin/bash

# build relative links to ARIA spec
find . -maxdepth 1 -type f -name "index.html" -exec sed -i 's|ED: "https://w3c\.github\.io/|ED: "./|g' {} +

# build lins to ARIA from child specs
find . -mindepth 2 -type f -name "index.html" -exec sed -i 's|ED: "https://w3c\.github\.io/aria/|ED: "/|g' {} +

# build relative links for child specs
find . -mindepth 2 -type f -name "index.html" -exec perl -pi -e 's|ED: "https://w3c\.github\.io/(?!aria)|ED: "/|g' {} +

# make output directory
mkdir -p public/accname
mkdir -p public/core-aam
mkdir -p public/dpub-aam
mkdir -p public/dpub-aria
mkdir -p public/graphics-aam
mkdir -p public/graphics-aria
mkdir -p public/svg-aam
mkdir -p public/mathml-aam
mkdir -p public/pdf-aam

# build all specs
npx respec -s index.html -o public/index.html --localhost
echo "Built ARIA"
npx respec -s accname/index.html -o public/accname/index.html --localhost
echo "Built AccName"
npx respec -s core-aam/index.html -o public/core-aam/index.html --localhost
echo "Built Core AAM"
npx respec -s dpub-aam/index.html -o public/dpub-aam/index.html --localhost
echo "Built DPub AAM"
npx respec -s dpub-aria/index.html -o public/dpub-aria/index.html --localhost
echo "Built DPUB ARIA"
npx respec -s graphics-aam/index.html -o public/graphics-aam/index.html --localhost
echo "Built graphics AAM"
npx respec -s graphics-aria/index.html -o public/graphics-aria/index.html --localhost
echo "Built graphics ARIA"
npx respec -s svg-aam/index.html -o public/svg-aam/index.html --localhost
echo "Built SVG AAM"
npx respec -s mathml-aam/index.html -o public/mathml-aam/index.html --localhost
echo "Built mathml-aam"
npx respec -s pdf-aam/index.html -o public/pdf-aam/index.html --localhost
echo "Built PDF AAM"