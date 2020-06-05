It happens I work on projects on macOS with a Windows VM and an Ubuntu one side by side, and just want to test the latest changes in a Git repo; so end up pulling the terminal and using these commands:

- `git checkout -- path` —discards `path` changes
- `git checkout foo-branch` —changes locally to foo-branch from current one
- `git clean -xfd` —removes everything not tracked
- `git commit -a -m "Foo"` —commits the entire working copy with "Foo" message
- `git diff` —working copy diffs
- `git pull` —pulls
- `git pull origin foo-branch` —pulls foo-branch from origin
- `git push` —pushes
- `git status` —working copy changes

### Semantic (Emoji) commits

Working with my mate [Ángel Carlos López](https://twitter.com/_aclopez) on a new project, he introduced me this way to write better, and more semantic, commit messages. I've taken his list of actions and made this small tool.

**IMPORTANT:** if you're new into this please, read [this article](https://opensource.com/article/19/2/emoji-log-git-commit-messages) first: it reinforces the *why* behind.

The resulting message is copied automatically into the clipboard 😊

<select id="commit-action" style="width: 170px;">
  <option value="❓">Choose action...</option>
  <option value="🎉">Initial</option>
  <option value="♿">Accessibility</option>
  <option value="📈">Analytics</option>
  <option value="💫">Animation/Transition</option>
  <option value="🏗">Architectural</option>
  <option value="💚">Build fix</option>
  <option value="🚀">Build new</option>
  <option value="😒">Chore</option>
  <option value="🧹">Clean-up</option>
  <option value="💄">Cosmetic</option>
  <option value="🐳">DevOps</option>
  <option value="📝">Documentation</option>
  <option value="✨">Feature</option>
  <option value="🛠/🐛">Fix</option>
  <option value="🎨">Format/structure</option>
  <option value="💩">Hack</option>
  <option value="🚑">Hotfix</option>
  <option value="🌐">I18n/L10n</option>
  <option value="☸️">Kubernetes</option>
  <option value="🤡">Mock</option>
  <option value="♻️">Refactor</option>
  <option value="🚀">Release</option>
  <option value="✅">Test add</option>
  <option value="🧪">Test architecture</option>
  <option value="✔️">Test pass</option>
  <option value="🚧">WIP</option>
</select>
<input id="commit-message" placeholder="type message..." style="width: 330px;" type="text" /><br />
<label id="commit-error" />

<code id="result"></code>

<script>
    let commitAction = '❓';
    let commitMessage = '';

    const span = document.getElementById('result');

    const updateResult = () => {
        const message = `${commitAction}: ${commitMessage}`;

        span.textContent = message;

        navigator.clipboard.writeText(message)
            .catch(_ => {
                const errorLabel = document.querySelector('#commit-error');
                errorLabel.textContent = 'Sorry, we could not copy to the clipboard. Please, make it manually.';
            });
    }

    const select = document.querySelector('#commit-action');
    select.addEventListener('input', event => {
        commitAction = event.target.value;
        updateResult();
    });
    
    const input = document.querySelector('#commit-message');
    input.addEventListener('input', event => {
        commitMessage = event.target.value;
        updateResult();
    });
</script>