const posts = items.filter(item => item.tags.some(tag => tag == blogTag) && !item.tags.some(tag => tag == 'es'));
listItems('#posts-latest', posts, 'blog', 5);