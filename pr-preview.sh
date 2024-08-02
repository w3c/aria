# change specStatus value to include relative paths
echo "Updating specStatus to unofficial"
find . -name "index.html" -exec sed -i 's/specStatus:[[:space:]]*"ED"/specStatus: "unofficial"/g' {} +

# update spec URLs mappings for ARIA
echo "updating ARIA mappings"
find . -wholename "./index.html" -exec sed -i 's/ariaSpecURLs: {/ariaSpecURLs: {\n          "unofficial": "\/",/g' {} +
find . -wholename "./index.html" -exec sed -i 's/accNameURLs: {/accNameURLs: {\n          "unofficial": ".\/accname\/",/g' {} +
find . -wholename "./index.html" -exec sed -i 's/coreMappingURLs: {/coreMappingURLs: {\n          "unofficial": ".\/core-aam\/",/g' {} +

# update specURLs mapping for child specs
echo "updating child spec mappings"
# aria
find . -mindepth 1 -name "index.html" -exec sed -i 's/ariaSpecURLs: {/ariaSpecURLs: {\n          "unofficial": "..\/",/g' {} +
# accname
find . -mindepth 1 -name "index.html" -exec sed -i 's/accNameURLs: {/accNameURLs: {\n          "unofficial": "..\/accname\/",/g' {} +
# core-aam
find . -mindepth 1 -name "index.html" -exec sed -i 's/coreMappingURLs: {/coreMappingURLs: {\n          "unofficial": "..\/core-aam\/",/g' {} +
# dpub
find . -mindepth 1 -name "index.html" -exec sed -i 's/dpubModURLs: {/dpubModURLs: {\n          "unofficial": "..\/dpub-aria\/",/g' {} +
# graphicsMappingModURLs
find . -mindepth 1 -name "index.html" -exec sed -i 's/graphicsMappingModURLs: {/graphicsMappingModURLs: {\n          "unofficial": "..\/graphics-aam\/",/g' {} +
# graphicsModURLs
find . -mindepth 1 -name "index.html" -exec sed -i 's/graphicsModURLs: {/graphicsModURLs: {\n          "unofficial": "..\/graphics-aria\/",/g' {} +
# htmlMappingURLs
find . -mindepth 1 -name "index.html" -exec sed -i 's/htmlMappingURLs: {/htmlMappingURLs: {\n          "unofficial": "..\/html-aam\/",/g' {} +
# build all specs
echo "building specs"

commands=(
  "npx respec -s index.html -o index.html --localhost"
  "npx respec -s accname/index.html -o accname/index.html --localhost"
  "npx respec -s core-aam/index.html -o core-aam/index.html --localhost"
  "npx respec -s dpub-aam/index.html -o dpub-aam/index.html --localhost"
  "npx respec -s dpub-aria/index.html -o dpub-aria/index.html --localhost"
  "npx respec -s graphics-aam/index.html -o graphics-aam/index.html --localhost"
  "npx respec -s graphics-aria/index.html -o graphics-aria/index.html --localhost"
  "npx respec -s svg-aam/index.html -o svg-aam/index.html --localhost"
  "npx respec -s mathml-aam/index.html -o mathml-aam/index.html --localhost"
)
for cmd in "${commands[@]}"; do
  echo "Executing: $cmd"
  if ! $cmd; then
    echo "Error: Command failed - $cmd"
  fi
done
