listItems(
    '#posts-latest',
    items.filter(item => item.tags.some(tag => tag == blogTag)),
    'blog',
    3);

// https://stackoverflow.com/a/35385518
/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

async function listLatestTootsAsync() {
    const mastodonUrl = 'https://dotnet.social/@MarcosCobena';
    const response = await fetch(`${mastodonUrl}.rss`);
    const text = await response.text();
    const data = new window.DOMParser().parseFromString(text, "text/xml");
    const items = data.querySelectorAll('item');
    let html = ``;

    for (let i = 0; i < 3; i++) {
        const element = items[i];
        const descriptionTextContent = element.querySelector('description').textContent;
        const descriptionElements = htmlToElements(descriptionTextContent);
        const description = `${descriptionElements[0].innerHTML}...`;
        const date = new Date(element.querySelector('pubDate').textContent);
        html += `<li>`
            + `${description}`
            + ` (<a href="${element.querySelector('link').textContent}">${date.toLocaleDateString()}</a>)`
            + `</li>`;
    }

    html += `<li><a href="${mastodonUrl}">More...</a></li>`;
    html = `<ul>${html}</ul>`;
    const tootsWrapperElement = document.getElementById('toots-latest');
    tootsWrapperElement.innerHTML = html;
}

listLatestTootsAsync();