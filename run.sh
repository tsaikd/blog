#!/bin/bash

PN="${BASH_SOURCE[0]##*/}"
PD="${BASH_SOURCE[0]%/*}"

pushd "${PD}"

git clean -fxd
gor compile
ln -s ../assets/ compiled/blog/
gor http

popd

