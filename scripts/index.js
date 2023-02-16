// WIP replace " with ' for strings
// WIP replace "var" for "let" within functions
// WIP replace "var" for "const" where appropiate
// WIP remove jQuery

const blogTag = 'blog';
const podcastFilename = 'juanma-y-marcos';
const siteTitle = 'Marcos Cobeña Morián';
const weAreAtInternet = location.hostname !== 'localhost' && location.hostname !== '127.0.0.1';

var episodes = [];
var items = [];
const redirections = [];
var converter = new showdown.Converter({ strikethrough: true, tables: true });
var homeFilename = "home";
var resourceNotFoundFilename = "404";
var hashtagUrlSeparator = "#/";
var queryUrlSeparator = "/?i=";

$(document).on('click', 'a', async function (event) {
    var href = $(this).attr("href");

    if (href.startsWith("http") || href.startsWith("mailto:") ||
        !href.startsWith(hashtagUrlSeparator) || !href.startsWith(queryUrlSeparator)) {
        event.returnValue = false;
        return;
    }

    event.preventDefault();

    var filename = getJustFilename(href);
    pushState(filename);
    await loadItemAsync(filename);
});

$(window).on('popstate', async function (event) {
    var state = event.originalEvent.state;

    if (state !== null) {
        await loadItemAsync(state.filename);
    } else {
        if (window.location.hash.length > 0) {
            // User manually enters a different path
            await entryPointAsync();
        } else {
            // User taps back to root (i.e. https://marcoscobena.com)
            await pushHomeStateAndLoadItAsync();
        }
    }
});

function addEpisode(title, audioFilename, documentFilename, date) {
    var item = {
        title: title,
        audioFilename: audioFilename,
        filename: documentFilename,
        date: date
    };
    episodes.push(item);
}

function addItem(title, filename, date, tags = []) {
    var tokens = date.split('/');
    var parsedDate = new Date(tokens[2], tokens[1] - 1, tokens[0]);
    var item = { title: title, filename: filename, date: parsedDate, tags: tags };
    items.push(item);
}

function addPost(title, filename, date, tags = []) {
    tags.push('blog');
    addItem(title, filename, date, tags);
}

function addRedirection(fromFilename, toURL) {
    const redirection = { filename: fromFilename, url: toURL };
    redirections.push(redirection);
}

async function entryPointAsync() {
    const path = window.location.href;
    const filename = getJustFilename(path);
    const anchor = getAnchor(path);

    if (filename.length > 0) {
        const redirection = findIn(filename, redirections);

        if (redirection != undefined) {
            window.location.href = redirection.url;
        } else {
            await loadItemAsync(filename, anchor);
        }
    } else {
        await pushHomeStateAndLoadItAsync();
    }
}

function findIn(filename, itemArray) {
    let found = itemArray.find(function (item) {
        return item.filename == filename;
    });

    return found;
}

function getAnchor(path) {
    const index = path.lastIndexOf("#")
    let result = null;

    if (index >= 0) {
        result = path.substring(index);
    }

    return result;
}

function getJustFilename(path) {
    let filename;

    if (path.includes(queryUrlSeparator)) {
        let index = path.lastIndexOf(queryUrlSeparator);
        filename = path.substring(index + queryUrlSeparator.length);
        index = filename.indexOf("&")

        if (index >= 0) {
            filename = filename.substring(0, index);
        }
    } else {
        // Usually /#/foo or /#!/foo, which correspond to the old fashioned way to anchor items
        let lastSlashIndex = path.lastIndexOf("/");
        filename = path.substring(lastSlashIndex + 1);
    }

    filename = removeAnchor(filename);

    return filename;
}

function getMarkDownPath(filename) {
    return `items/${filename}.md`;
}

function listItems(selector, items, moreFilename = null, amount = -1) {
    let length = amount < 0 ?
        items.length :
        amount;
    length = Math.min(length, items.length);
    const itemsPerYearMap = new Map();
    items.map(value => {
        const year = value.date.getFullYear();
        const month = value.date.getMonth();

        if (!itemsPerYearMap.has(year)) {
            itemsPerYearMap.set(year, new Map());
        }

        const itemsPerMonthMap = itemsPerYearMap.get(year);

        if (!itemsPerMonthMap.has(month)) {
            itemsPerMonthMap.set(month, []);
        }

        const itemsArray = itemsPerMonthMap.get(month);
        itemsArray.push(value);
    });
    const isMoreRequested = moreFilename != null;
    let html = renderListItems(itemsPerYearMap, isMoreRequested, length);

    if (isMoreRequested && items.length > length) {
        const listItemHtml = `<li><a href="${queryUrlSeparator}${moreFilename}">More...</a></li>`;
        html += listItemHtml;
    }

    if (isMoreRequested) {
        html = `<ul>${html}</ul>`;
    }

    if (!isMoreRequested) {
        const totalHtml = `<p>
    (Total: ${length})
</p>`;
        html += totalHtml;
    }
    
    $(selector).empty();
    $(selector).append(html);
}

async function loadItemAsync(filename, anchor = null) {
    const item = findIn(filename, items);
    
    if (item == undefined) {
        await loadItemAsync(resourceNotFoundFilename);
        return;
    }
    
    let actualPath = getMarkDownPath(filename);
    const response = await fetch(actualPath);
    const data = await response.text();
    const isBlogPost = item.tags.some(tag => tag == blogTag);
    render(item, data, isBlogPost, anchor);
}

async function pushHomeStateAndLoadItAsync() {
    pushState(homeFilename);
    await loadItemAsync(homeFilename);
}

function pushState(filename) {
    history.pushState({ filename: filename }, "", queryUrlSeparator + filename);
}

function removeAnchor(filename) {
    let result = new String(filename);
    let index = filename.lastIndexOf("#")

    if (index >= 0) {
        result = filename.substring(0, index);
    }

    return result;
}

function render(item, markDown, isBlogPost, anchor) {
    let isHome = item.filename == homeFilename;

    if (isHome) {
        $('#homeReturn').hide(0);
    } else {
        $('#homeReturn').show(0);
    }

    renderItem(item, markDown);

    if (isBlogPost) {
        $('#date').fadeIn(0);
    } else {
        $('#date').fadeOut(0);
    }

    if (item.filename == podcastFilename) {
        renderPodcast();
    }

    if (anchor != null) {
        location.hash = anchor;
    }
}

function renderEpisode(item, markDown) {
    let src = `items/documents/${item.audioFilename}`;
    let html = converter.makeHtml(markDown);
    let body = `<h3>${item.title} - ${item.date}</h3>
<audio controls loop>
    <source src="${src}" type="audio/mpeg">
    (Perdona, tu navegador no soporta empotrar audio. 
    Pero puedes descargar el episodio directamente <a href="${src}">aquí</a>.)
</audio>
${html}`;

    return body;
}

function renderItem(item, markDown) {
    document.title = `${item.title} — ${siteTitle}`;

    $("#title").html(item.title);
    $("#date").html(item.date.toLocaleDateString());

    const body = converter.makeHtml(markDown);
    const bodyElement = document.getElementById('actualBody');
    bodyElement.innerHTML = body;
    const itemScriptElement = document.createElement('script');
    itemScriptElement.src = `items/${item.filename}.js`;
    itemScriptElement.type = "text/javascript";
    bodyElement.appendChild(itemScriptElement);
}

function renderListItems(itemsPerYearMap, isMoreRequested, length) {
    let html = '';
    let count = 0;

    for (const [year, itemsPerMonthMap] of itemsPerYearMap) {
        if (!isMoreRequested) {
            html += `<h2>${year}</h2>`;
        }

        for (const [month, itemsArray] of itemsPerMonthMap) {
            if (!isMoreRequested) {
                const date = new Date(year, month);
                const monthAndYear = date.toLocaleString('en', { month: 'long', year: 'numeric' });
                html += `<h3>${monthAndYear}</h3>`;
                html += '<ul>';
            }

            for (const item of itemsArray) {
                const listItemHtml = '<li>'
                    + `<a href="${queryUrlSeparator}${item.filename}">${item.title}</a>`
                    + ` (${item.date.toLocaleDateString()})`
                    + '</li>';
                html += listItemHtml;
                count++;

                if (isMoreRequested && (count == length)) {
                    return html;
                }
            }

            if (!isMoreRequested) {
                html += '</ul>';
            }
        }
    }

    return html;
}

function renderPodcast() {
    let promises = [];

    episodes.forEach(item => {
        let actualPath = getMarkDownPath(item.filename);

        promises.push(fetch(actualPath)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject();
                }

                let markDown = response.text();

                return markDown;
            })
            .catch(_ => {
                let markDown = `*Lo siento*, hubo un problema cargando el texto. 
Creo que se puede arreglar recargando la página.`;

                return markDown;
            })
            .then(markDown => renderEpisode(item, markDown)));
    });

    Promise
        .all(promises)
        .then(bodies => {
            let body = bodies.join('\n');
            $('#episodes').html(body);
        });
}

function scrollUp() {
    window.scrollTo(0, 0);

    return false;
}

document.addEventListener('DOMContentLoaded', async _ => await entryPointAsync());