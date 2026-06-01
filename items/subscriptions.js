(function() {
    const button = document.createElement('button');
    button.textContent = 'Open all in new tabs';
    button.addEventListener('click', function() {
        const links = Array.from(document.querySelectorAll('#actualBody a[href^="http"]'));
        for (let index = links.length - 1; index >= 0; index -= 1) {
            window.open(links[index].href, '_blank', 'noopener,noreferrer');
        }
    });
    const container = document.getElementById('actualBody');
    container.appendChild(button);
})();
