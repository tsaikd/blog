#!/bin/bash

PN="${BASH_SOURCE[0]##*/}"
PD="${BASH_SOURCE[0]%/*}"

pushd "${PD}"

rm -rf .tmp_partials/ compiled/
gor compile
ln -s ../assets/ compiled/blog/
ln -s ./ compiled/blog/blog
ln -s ../rss.xml compiled/blog/
ln -s ../sitemap.xml compiled/blog/
gor http

popd

