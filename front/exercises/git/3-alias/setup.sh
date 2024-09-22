#!/bin/bash

# Include utils
source ../utils/utils.sh

kata="$(basename $(pwd))"
make-exercise-repo

echo "dummy" > dummy.txt
git add dummy.txt
git commit -m "dummy commit"

