. ..\utils\make-bare-remote-repo.ps1
. ..\utils\clone-remote-to-exercise.ps1

Set-Content -Value "Hello from file A!" -Path fileA.txt

git add fileA.txt
git commit -m "Add file fileA.txt"

Set-Content -Value "Hello from file B!" -Path fileB.txt
git add fileB.txt
git commit -m "Add file fileB.txt"
git commit --amend --author="Author2 <myemail@home.com>" --no-edit

Set-Content -Value "Hello from file C!" -Path fileC.txt
git add fileC.txt
git commit -m "Add file fileC.txt"

Add-Content -Value "**** Feature 1 ****" -Path fileA.txt
git add fileA.txt
git commit -m "Adds feature1"
git commit --amend --author="Author2 <author2@gmail.com>" --no-edit

Add-Content -Value "Updated!" -Path fileA.txt
Add-Content -Value "Updated!" -Path fileB.txt
git add .
git commit -m "Change fileA & fileB"

git push -u origin master
