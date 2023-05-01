#!/bin/bash

if ! command -v npm || ! npm -g list html-minifier || ! npm -g list uglify-js
then
    echo "Error: Cannot find node.js or required node packages installed!"
    echo "Try install node.js then install packages with:"
    echo "    npm -g install html-minifier"
    echo "    npm -g install uglify-js"
    echo ""
    echo "Exited without do anything."
    exit 1
fi

minHTMLorCSS() {
    html-minifier --collapse-whitespace \
        --remove-comments \
        --remove-optional-tags \
        --remove-redundant-attributes \
        --remove-script-type-attributes \
        --remove-tag-whitespace \
        --use-short-doctype \
        --minify-css true \
        --minify-js true \
        -o "${2}" "${1}"
}

minJS() {
    uglifyjs --verbose --compress --mangle --output "${2}" -- "$1"
}

error() {
    echo "$@"
    exit 1
}

DOCS_PFX="../docs/"
cd src || error "Cannot change directory to 'src'!"

echo "Create docs directory tree..."
find . -mindepth 1 -type d -print0 | xargs -0 -I{} mkdir -p "${DOCS_PFX}/"'{}'
echo "...done."

echo "Minify HTML and CSS..."
find . -type f \( -name '*.css' -o -name '*.html' -o -name '*.htm' \) -print0 | while IFS= read -r -d $'\0' fname
do
    minHTMLorCSS "${fname}" "${DOCS_PFX}/${fname}"
done
echo "...done."

echo "Minify JS..."
find . -type f -name '*.js' -print0 | while IFS= read -r -d $'\0' fname
do
    minJS "${fname}" "${DOCS_PFX}/${fname}"
done
echo "...done."
