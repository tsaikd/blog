#!/bin/bash
# Build:
#   ./make.sh
# Debug:
#   ./make.sh server --watch

set -e

PN="${BASH_SOURCE[0]##*/}"
PD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

type hugo >/dev/null

HUGO_OPTS="${HUGO_OPTS} --theme=redlounge"

if [ "$(uname -s)" == "Darwin" ] ; then
	function datetime() {
		date -u +"%Y-%m-%dT%H:%M:%SZ"
	}
else
	function datetime() {
		date -Iseconds
	}
fi

pushd "${PD}" >/dev/null

if [ "$#" -eq 0 ] ; then
	pushd public >/dev/null
	git checkout -f gh-pages
	git fetch --all
	git reset --hard origin/gh-pages
	popd >/dev/null
fi

rm -rf public/* || true
mkdir -p layouts public static || true

hugo ${HUGO_OPTS} "$@"

if [ "$#" -eq 0 ] ; then
	pushd public >/dev/null
	git add -A
	git commit -m "$(datetime): Auto update" --author "tsaikd <tsaikd@gmail.com>"
	git push origin gh-pages:gh-pages
	popd >/dev/null

	git commit -m "$(datetime): Auto update submodule" --author "tsaikd <tsaikd@gmail.com>" public
fi

popd >/dev/null
