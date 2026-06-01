const posts = items.filter(item => item.tags.some(tag => tag == blogTag));
listItems('#posts-latest', posts, /* moreFilename */ 'archive', /* amount */ 5);
