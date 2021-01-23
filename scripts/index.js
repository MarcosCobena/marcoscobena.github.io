// WIP replace " with ' for strings
// WIP replace "var" for "let" within functions
// WIP replace "var" for "const" where appropiate

const blogTag = 'blog';
const podcastFilename = 'juanma-y-marcos';
const weAreAtInternet = location.hostname !== 'localhost' && location.hostname !== '127.0.0.1';

var episodes = [];
var items = [];
var converter = new showdown.Converter({ strikethrough: true, tables: true });
var homeFilename = "home";
var resourceNotFoundFilename = "404";
var hashtagUrlSeparator = "#/";
var queryUrlSeparator = "/?i=";

$(document).on('click', 'a', function (event) {
    var href = $(this).attr("href");

    if (href.startsWith("http") || href.startsWith("mailto:") ||
        !href.startsWith(hashtagUrlSeparator) || !href.startsWith(queryUrlSeparator)) {
        event.returnValue = false;
        return;
    }

    event.preventDefault();

    var filename = getJustFilename(href);
    pushState(filename);
    loadItem(filename);
});

$(window).on('popstate', function (event) {
    var state = event.originalEvent.state;

    if (state !== null) {
        loadItem(state.filename);
    } else {
        if (window.location.hash.length > 0) {
            // User manually enters a different path
            entryPoint();
        } else {
            // User taps back to root (i.e. https://marcoscobena.com)
            pushHomeStateAndLoadIt();
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

function addItem(title, filename, date, allowComments = false, tags = []) {
    var tokens = date.split('/');
    var parsedDate = new Date(tokens[2], tokens[1] - 1, tokens[0]);
    var item = { title: title, filename: filename, date: parsedDate, allowComments: allowComments, tags: tags };
    items.push(item);
}

function addPost(title, filename, date, tags = []) {
    tags.push('blog');
    addItem(title, filename, date, /* allowComments: */ true, tags);
}

function entryPoint() {
    var filename = getJustFilename(window.location.href);

    if (filename.length > 0) {
        loadItem(filename);
    } else {
        pushHomeStateAndLoadIt();
    }
}

function findIn(filename, itemArray) {
    let found = itemArray.find(function (item) {
        return item.filename == filename;
    });

    return found;
}

// TODO scroll to anchors: https://marcoscobena.com/#!/2018-3-15#comment-3808745187
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
    let previousYear = -1;

    $(selector).empty();
    $(selector).append("<ul>");

    for (var i = 0; i < length; i++) {
        var item = items[i];
        const year = item.date.getFullYear();

        if (moreFilename == null && year != previousYear) {
            const html = `<strong>${year}</strong>`;
            $(selector).append(html);

            previousYear = year;
        }

        var html = `<li>
    <a href="${queryUrlSeparator}${item.filename}">${item.title}</a> (${item.date.toLocaleDateString()})
</li>`;
        $(selector).append(html);
    }

    if (moreFilename != null && items.length > length) {
        var html = `<li><a href="${queryUrlSeparator}${moreFilename}">More...</a></li>`;
        $(selector).append(html);
    }

    $(selector).append("</ul>");
}

function loadItem(filename) {
    const item = findIn(filename, items);
    const isBlogPost = item.tags.some(tag => tag == blogTag);

    if (item == undefined) {
        loadItem(resourceNotFoundFilename);
        return;
    }

    let actualPath = getMarkDownPath(filename);

    $.get(actualPath, function (data) {
        render(item, data, isBlogPost);
    });
}

function pushHomeStateAndLoadIt() {
    pushState(homeFilename);
    loadItem(homeFilename);
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

function render(item, markDown, isBlogPost) {
    $('#disqus_thread').hide();

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

    if (isBlogPost || item.allowComments) {
        $('#disqus_thread').show();
        updateDisqus(item.filename);
    }

    scrollUp();
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
    document.title = item.title;

    $("#title").html(item.title);
    $("#date").html(item.date.toLocaleDateString());

    let body = converter.makeHtml(markDown);
    $("#actualBody").html(body);
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

function updateDisqus(filename) {
    DISQUS.reset({
        reload: true,
        config: function () {
            this.page.identifier = filename;
            this.page.url = window.location.href;
        }
    });
}

$(window).on('load', entryPoint);