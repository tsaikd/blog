#!/bin/bash

PN="${BASH_SOURCE[0]##*/}"
PD="${BASH_SOURCE[0]%/*}"

pushd "${PD}"

rm -rf .tmp_partials/ compiled/blog/*
gor compile

popd

