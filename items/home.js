listItems(
    '#posts-latest',
    items.filter(item => item.tags.some(tag => tag == blogTag)),
    'blog',
    3);

async function listLatestTootsAsync() {
    const mastodonUrl = 'https://dotnet.social/@MarcosCobena';
    const response = await fetch(`${mastodonUrl}.rss`);
    const text = await response.text();
    const data = new window.DOMParser().parseFromString(text, "text/xml");
    const items = data.querySelectorAll('item');
    let html = ``;

    for (let i = 0; i < 3; i++) {
        const element = items[i];
        const textContent = element.querySelector('description').textContent;
        const date = new Date(element.querySelector('pubDate').textContent);
        html += `<li>`
            + `(<a href="${element.querySelector('link').textContent}">${date.toLocaleDateString()}</a>)`
            + ` ${textContent}`
            + `</li>`;
    }

    html += `<li><a href="${mastodonUrl}">More...</a></li>`;
    html = `<ul>${html}</ul>`;
    const tootsWrapperElement = document.getElementById('toots-latest');
    tootsWrapperElement.innerHTML = html;
}

listLatestTootsAsync();