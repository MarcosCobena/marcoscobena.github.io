listTags('#tags');
const queryString = new URLSearchParams(window.location.search);
const tag = queryString.has('t')
    ? queryString.get('t')
    : blogTag;

if (tag != blogTag) {
    const selectedTagElement = document.querySelector('#tag-selected');
    selectedTagElement.innerHTML = `Posts with tag <em>${tag}</em>:`;
}

const posts = items.filter(item => item.tags.some(eachTag => eachTag == tag));
listItems('#posts', posts);