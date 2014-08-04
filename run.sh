#!/bin/bash

PN="${BASH_SOURCE[0]##*/}"
PD="${BASH_SOURCE[0]%/*}"

pushd "${PD}" || exit $?

	rm -rf .tmp_partials/ compiled/blog/*
	gor compile || exit $?
	chown 1000:1000 -R .tmp_partials/ compiled/blog/ || exit $?

	pushd compiled/blog || exit $?

		git add -A || exit $?
		git commit -m "$(date): Auto update" --author "tsaikd <tsaikd@gmail.com>" || exit $?
		git push origin gh-pages:gh-pages || exit $?

	popd || exit $?

popd || exit $?

