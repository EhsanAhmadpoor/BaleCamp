#!/bin/bash
# kata="basic-commits-master"
source ../utils/utils.sh
# make-exercise-repo

make-bare-remote-repo
clone-remote-to-exercise

echo "Hello from file A!" > fileA.txt

git add fileA.txt
git commit -m "Add file fileA.txt"

echo "Hello from file B!" > fileB.txt
git add fileB.txt
git commit -m "Add file fileB.txt"
git commit --amend --author="Author2 <myemail@home.com>" --no-edit

echo "Hello from file C!" > fileC.txt
git add fileC.txt
git commit -m "Add file fileC.txt"

echo "**** Feature 1 ****" >> fileA.txt
git add fileA.txt
git commit -m "Adds feature1"
git commit --amend --author="Author2 <author2@gmail.com>" --no-edit

echo "Updated!" >> fileA.txt
echo "Updated!" >> fileB.txt
git add .
git commit -m "Change fileA & fileB"


git push -u origin master
