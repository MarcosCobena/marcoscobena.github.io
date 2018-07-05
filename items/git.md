It happens I work on projects on macOS with a Windows VM and an Ubuntu one side by side, and just want to test the latest changes in a Git repo; so end up pulling the terminal and using these commands:

- `git checkout -- path` —discards `path` changes
- `git checkout foo-branch` —changes locally to foo-branch from current one
- `git commit -a -m "Foo"` —commits the entire working copy with "Foo" message
- `git diff` —working copy diffs
- `git pull` —pulls
- `git pull origin foo-branch` —pulls foo-branch from origin
- `git push` —pushes
- `git status` —working copy changes

