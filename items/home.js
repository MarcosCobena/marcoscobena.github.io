listItems(
    '#posts-latest',
    items.filter(item => item.tags.some(tag => tag == blogTag)),
    'blog',
    5);