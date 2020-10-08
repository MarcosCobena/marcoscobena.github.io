let commitAction = '❓';
let commitMessage = 'type message...';
let result = '';

const statusLabel = document.querySelector('#commit-status');
const resultSpan = document.getElementById('result');

const updateResult = () => {
    result = `${commitAction}: ${commitMessage}`;
    resultSpan.textContent = result;
}

const actionSelect = document.querySelector('#commit-action');
actionSelect.addEventListener('input', event => {
    commitAction = event.target.value;
    updateResult();
});

const messageInput = document.querySelector('#commit-message');
messageInput.addEventListener('input', event => {
    commitMessage = event.target.value;
    updateResult();
});

const copyButton = document.querySelector('#commit-copy');
copyButton.addEventListener('click', event => {
    navigator.clipboard.writeText(result)
        .then(() => statusLabel.textContent = 'Copied! 😊')
        .catch(_ => statusLabel.textContent = 'Sorry 😐 May you copy it manually?')
        .then(() => window.setTimeout(() => statusLabel.textContent = '', 3000));
});

updateResult();