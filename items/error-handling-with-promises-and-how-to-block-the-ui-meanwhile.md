*(This post was imported, please [contact](/?i=contact) me if there's anything wrong with it. Thanks in advance)*

<div>

During my day-to-day job I’ve found out my-self again with a programming question I didn’t manage to answer the 1st time: which is a proper way to handle errors on a chain of async calls, and how to avoid the user to interact with the UI while the ops. are working. Well, actually those are 2 different questions, but let’s say I’ve always found both blended.

</div>
The 1st time I worked on this was on a Windows Store App (a.k.a. Windows Style UI App –former Metro- for Windows 8) done with HTML5. Microsoft provides such sandbox with WinJS, which abstracts the underlying OS for ops. like taking a photo, recording a video, and so on. Most of these are async ops. so Microsoft also provides an implementation of JavaScript Promises in order to handle all the async stuff.

My current Project is a SPA (Single Page Application) so there’s no WinJS anymore but jQuery among other ones. And, good for me, I’ve discovered jQuery provides also an implementation of Promises but they call these <a href="http://api.jquery.com/category/deferred-object/">Deferreds</a>. There are some differences between ones and the others but what I’d like to point out here is that thanks to following the same patterns on both places I’ve been able to reuse what I learnt some months ago.

One of the things I got for clear is that when one is programming with Promises, and chaining a bunch of those, must be careful with the way those are chained. I read <a href="http://msdn.microsoft.com/en-us/library/windows/apps/hh700334.aspx">an article from Microsoft’s MSDN</a> that was pretty clear on this: make use of the plain syntax.

So let’s go back to the road, and we’ll start 1st with the error handling. Suppose we have a few different async functions that we’ve got to chain in order to get something done (for instance, a loginWithFacebookAsync() that returns a token that need to be passed by to authenticateAsync(token) and after that we navigate to the home page), so we’d write something like this:

```c-sharp
opAsync(1)

.then(function () {

return opAsync(2);

})

.then(function () {

return opAsync(3);

});
```

In order to simplify the explanation I’ve used the same function but changing the param these receive:

```c-sharp
function opAsync(number) {

console.log(&quot;Starting op. &quot; + number + &quot;...&quot;);

var dfd = $.Deferred();

setTimeout(function () {

var random = Math.random(),

message;

if (random &amp;gt; 0.75) {

message = &quot;Error on op. &quot; + number + &quot;!&quot;;

console.log(message);

dfd.reject(message);

} else {

message = &quot;Success on op. &quot; + number + &quot;!&quot;;

console.log(message);

dfd.resolve(message);

}

}, 1000);

console.log(&quot;Finished op. &quot; + number + &quot;&quot;);

return dfd.promise();

}
```

I’ve introduced a random component so from time to time the op. could fail. But on an ideal execution –no fails- the op. 1 would be executed, once it ends goes #2, and the same happens with 3rd one. But what happens if one fails? As we’ve followed the plain form of chaining Promises the error will be spread along the pipeline, avoiding the following functions to execute, but just passing by the error to the next one.

The way I’ve gone to handle errors on this situation until yesterday was adding a 2nd param to the last then() for the error callback:

```c-sharp
opAsync(1)

.then(function () {

return opAsync(2);

})

.then(function () {

return opAsync(3);

}, function (error) {

alert(error);

});
```

BIG FAIL. Maybe from a brief analysis one could think, and the way the chain is written invited me to do so, that as the error callback is at the end and after the last op. call, the 1st would handle every error occurred. But sadly it wasn’t true, I misunderstood the chain process, at least at this particular point. If opAsync(1) or opAsync(2) fail, in fact the error will be catch because such handler is “subscribed” to a then() after both functions, but if opAsync(3) barks the alert() will never be called as both are at the same level of the chain. Actually, it was so easy to understand but maybe not for one which was touching Promises for the very first time like I did.

But the fix is really easy: move the error handling one step further on the calls chain. Even more, we can make use of done() instead of then() as there won’t be any async op. after that, in case of a success result; and add a call to fail() to handle whatever error could happen during the async calls (we move the error callback to such one). So the code would result on this:

```c-sharp
opAsync(1)

.then(function () {

return opAsync(2);

})

.then(function () {

return opAsync(3);

// Bad practice: handling errors just here avoids the last call (return) ones

//}, function (error) {

//    alert(error);

//});

})

.done(function () {

alert(“Yeah!”);

}).fail(function (error) {

alert(error);

});
```

Param error will contain the one passed to reject() on the Deferred object. Here are just strings, but you could make use of Error (btw, this is something I’d like to investigate further: what’s the benefit of using Error, any hint is appreciated :-)).

And do you remember the other point of the main question, how to block the UI? Well that’s been pretty surprising for me the last weekend to find out a jQuery UI plug-in called <a href="http://www.malsup.com/jquery/block/">jQuery BlockUI</a> that solves my particular question just adding 3 lines to the above code:

```c-sharp
$.blockUI();

opAsync(1)

.then(function () {

return opAsync(2);

})

.then(function () {

return opAsync(3);

// Bad practice: handling errors just here avoids the last call (return) ones

//}, function (error) {

//    alert(error);

//});

})

.done(function () {

$.unblockUI();

})

.fail(function (error) {

alert(error);

$.unblockUI();

});
```

And voilá! Less is more. :-) You can see all this in action, and modify as you desire, <a href="http://jsfiddle.net/HVH8Z/">here</a>. Remember to enable the developer panel (F12 uses to do that) to see the output in the console.

Thanks for reading the whole thing, it’s of the sort of those that I find important to have a clear picture of how to work with.