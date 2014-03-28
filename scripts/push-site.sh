#!/bin/bash

set -e
MESSAGE="update docs to `git rev-parse HEAD`"
cd site
git add .
git commit -am "$MESSAGE"
git push
