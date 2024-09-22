# Aliases

While working, we tend to write a lot of commands. This can get tedious, especially when the commands are rather long. Git allows you to create an alias for commands, dramatically shortening the time spent typing them and reducing the risk of doing typos.

Aliases are stored in your git config and can thus be system, global or local. System is valid for every user on the machine, global config is tied to your user, while local config lives inside a specific repository.

## Setup

1. Run `source setup.sh` (or `.\setup.ps1` in PowerShell)

## The task

1. View your config by running `git config --list`
2. Add a new **global** alias `lol` for command `log --oneline --graph --all`.
3. Run your alias `git lol`
4. Run the full command `git log --oneline --graph --all`\
Are there any difference in the output?
5. Create another alias `lome`, this time **local**, that lists commits where you are the author\
`"log --author=\"$(git config --get user.name)\""`
6. Run your alias `git lome`
7. View your git config and its sources by running `git config --list --show-origin`\
 Can you find your alias configurations?
8. Try running `git lome` in a different git repository\
Does it work?
9. Remove your `git lol` alias.

## Useful commands

- `git config --list`
- `git config --list --show-origin`
- `git config --get <configuration>`
- `git config --unset <configuration>`
