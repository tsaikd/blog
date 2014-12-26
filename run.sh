#!/bin/bash

set -e

PN="${BASH_SOURCE[0]##*/}"
PD="${BASH_SOURCE[0]%/*}"

pushd "${PD}"

	pushd compiled/blog

		git checkout -f gh-pages
		git fetch --all
		git reset --hard origin/gh-pages

	popd

	rm -rf .tmp_partials/ compiled/blog/* || true
	gor compile
	chown 1000:1000 -R .tmp_partials/ compiled/blog/

	pushd compiled/blog

		git add -A
		git commit -m "$(date): Auto update" --author "tsaikd <tsaikd@gmail.com>"
		git push origin gh-pages:gh-pages

	popd

popd

