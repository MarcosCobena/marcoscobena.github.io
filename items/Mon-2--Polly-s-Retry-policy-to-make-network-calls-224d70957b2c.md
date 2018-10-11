*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

# Mon 2: Polly’s Retry policy to make network calls

   The last day I picked a task to move some ops. from local to the cloud —there’s already an API for that.   --------
  
### Mon 2: Polly’s Retry policy to make network calls

The last day I picked a task to move some ops. from local to the cloud —there’s already an API for that.

And [Polly](https://github.com/App-vNext/Polly) came to my mind. Don’t remember where but discovered it a few months ago through Planet Xamarin. Basically the app needs to send some sensible data “through the wire” and show the results; however, it can be possible there’s no network at such time.

So ended up using Polly’s Retry policy: “I want this call to be executed and, if anything fails, retry up to 3 times”. And this’ the code for exactly that:

My mate Juan asked me whether Polly can handle different paths for different exceptions, and it [looks feasible](https://github.com/App-vNext/Polly/issues/104), although haven’t tried for my-self.