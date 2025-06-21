listTags('#tags');
const queryString = new URLSearchParams(window.location.search);
const tag = queryString.has('t')
    ? queryString.get('t')
    : blogTag;
const posts = items.filter(item => item.tags.some(eachTag => eachTag == tag));
listItems('#posts', posts);