# A.m.e.d.i.o.

*From <https://github.com/MarcosCobena/marcoscobena.github.io> to <https://marcoscobena.github.io>*

This may be the number n blog engine I have written. It could start on around 2000 with PHP?, until I learned C# and all the rest were written in such. There is something magical in using your own stuff, maybe similar to wood-working. First versions were named Amelio, as a joke of the cartoon Marco whose mate was the monkey Amedio (it was years since I noticed Amelio was misspelled). I named this one Amedio as well by 2017 but, as soon as I noticed was not interested in distributing it for others, I removed that README and simply iterated it following my own joy.

# How it is made

I like Markdown, JavaScript and running stuff on browsers (client side), so what you are reading is:
- a Markdown file
- fetched from the server
- transformed into HTML, and
- dinamically injected into the index.html

That is all. I learned this approach by reading the source code of [www.darkwater.info](https://web.archive.org/web/20020212122136/http://www.darkwater.info/) a long time ago. Every item/post is listed in the form of a function call at items.js, and index.js makes the work from above. You can see items.js as a database, created locally in your browser, which is queried on demand.

# Features

Let me try collecting everything currently supported:
- two types of entries: items (pages) and blog posts
- list of latests blog posts: both titles and full text
- blog archive view by
    - years and months
    - tags
- RSS generation: this is the only piece written in C#, simply call `dotnet run --project .\RSS\RSS.csproj` at root and it will output feed.rss ready to publish
    - Since March 8th, 2024, there is a custom workflow which automates this while deploying the web site, so there is no need to track feed.rss in the repository anymore
- URL redirections

These features are supported as well but I am not using them nowadays (however, you can navigate the repo back in time and you will find some examples):
- podcast: in the form of a third type of entry, you can add episodes along with their audio files
- list of latests Mastodon posts
- scripts to speed up adding new posts and publishing them (see tools/)

# Work in progress

These are the features which I have started working on (see the features branches):
- test engine
- navigation bar (side menu)

# Import from other engines

Because I needed them for my-self, I wrote the following exporters to Markdown:
- [Medium](https://github.com/MarcosCobena/MediumExportToMarkdown)
- [WordPress](https://github.com/MarcosCobena/WordPressExportToMarkdown)

# Close-up

My workmate [Carnero](https://carnero.net) told me he was writting his own blog engine from scratch, and it lifted my energy to write this post so, it is dedicated to him. It may serve for others as well, feel free to fork the repo and adapt it to your needs.
