This blog has a RSS feed thanks to a [small .NET project](https://github.com/MarcosCobena/marcoscobena.github.io/tree/main/RSS) which analyzes [items.js](https://github.com/MarcosCobena/marcoscobena.github.io/blob/main/items/items.js) looking for the latest items, everything through regular expresions.

Until today. I thought the other day: could not I interpret items.js from C#, instead of analyzing it? A quick Duck Duck Go search and it took me to [Jint](https://github.com/sebastienros/jint).
Also, I could get rid of [this issue](https://github.com/MarcosCobena/marcoscobena.github.io/issues/4), by the way.

Please, look how beautiful [the change](https://github.com/MarcosCobena/marcoscobena.github.io/commit/fdccb4b732581054330fa6e1a1e5d1bdf23f0316#diff-cd7202f2071b9b8d4c556cc79c2767ded364ae98637bf096c0645053a150bcd4) has been.

And voilá! It works like a charm, it is a joy to mix languages like this :-)
