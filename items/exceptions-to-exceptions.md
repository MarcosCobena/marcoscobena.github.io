A few weeks? ago I read [Federico's post](https://people.gnome.org/~federico/blog/propagating-errors.html) on how they're handling errors with Rust —moving from C to Rust in librsvg, one the Gnome core libraries. I liked the article by it-self, because analyzes from 0 different approaches and, in the end, points to another one on how Midori did the same —for those who like me didn't know what Midori was: a Microsoft Research project to vertically analyze how an OS could be rewritten in managed code.

When making apps with Xamarin, and I guess this' shared among every framework, there's a moment when you need to retrieve data from an API, making a HTTP call, and things can go wrong.

One of my first implementations was something similar to —imagine we're in a ViewModel:

```c#
private async Task LoadDataAsync()
{
	ResultDTO result;
	
	try
	{
		// Think of refitAPI as a static readonly field
    	result = await refitAPI.GetAsync();
    }
    catch (Exception exception)
    {
        await DisplayAlertAsync("Ops, something went wrong. Thanks for your patience.");
    }
    
    if (result == null)
    {
        return;
    }
    
    // Here we assign result to a prop binded to the view
}
```

From the user perspective she shouldn't worry because anything that could go wrong is handled, although is presented with a generic valueless alert. It can also happen the API call ends just fine but it returns `null` —it can happen if the JSON payload is empty, for instance. We should tell the user something about this too...

My desk-mate [Sergio](https://twitter.com/sescaladab) shared with me his tooling to better handle all this stuff, which we've been using in [Tailwind Traders](https://github.com/Microsoft/TailwindTraders-Mobile), where the API call is boxed and a more appropriate return value is obtained:

```c#
private async Task LoadDataAsync()
{
	var result = await TryExecuteWithLoadingIndicatorsAsync(refitAPI.GetAsync);
    
    if (!result.IsSucceeded || result.Result == null)
    {
        return;
    }
    
    // Here we assign result to a prop binded to the view
}
```

This' a great improvement because:

- we no longer are in charge of handling the different exceptions on each API call;
- when having such, there's a standard way to present such to our users;
- the returning value has better semantics —i.e. `IsSucceeded`; and
- `IsBusy` is handled too so it'll end up on a loading overlay giving feedback

While I was reading Federico's article, and Midori one, it called my attention how we were using a somewhat similar approach to them —saving the distance—, but they both have a language which's richer in error handling. Our, C#, heavily works on unchecked exceptions: each method can return any exception and there's no way of noticing that in develop-time:

- we can read the method documentation header, as we use to do with such coming from the .NET Framework it-self; or
- we can disassemble it and see what it's internally doing, although we can't guarantee there's a inner call which does throw any other one

Java, for instance, forces developers to explicitly type which exceptions a method may throw. It's quite verbose —it's been ~10 years since I don't write Java code— but makes us think what to do with them.

Using the hype those articles promoted in my interior I went to NuGet home and typed "Rust" in the search box. I found [CSharp.OperationResult](https://www.nuget.org/packages/CSharp.OperationResult) project, which takes Rust approach into C# and, while I don't see the point on heavily relying in such everywhere in our projects, I do see its great value with above examples.

(Its owner has merged our [PR moving the lib into .NET Standard](https://github.com/gnaeus/OperationResult/pull/1#issuecomment-447576656) and there'll be a new NuGet soon.)

This week I've spent a few hours rewriting our [TaskHelper](https://github.com/Microsoft/TailwindTraders-Mobile/blob/feature/163-product-detail/Source/TailwindTraders.Mobile/TailwindTraders.Mobile/Framework/TaskHelper.cs) class by moving from our `WrapResult` class to `Result` and `Status`, which reduces even more the code needed at ViewModel level but makes beautiful the one at the inner implementation:

```c#
public async Task<Result<T>> TryWithErrorHandlingAsync<T>(
    Task<T> task,
    Func<Exception, Task<bool>> customErrorHandler = null)
{
    whenStarting?.Invoke();

    if (!connectivityService.IsThereInternet)
    {
        loggingService?.Warning("There's no Internet access");
        return Error();
    }

    try
    {
        T actualResult = await task;
        return Ok(actualResult);
    }
    // Here goes multiple catches for each error scenario, alerting users accordingly

    whenFinished?.Invoke();

    return Error();
}
```

From above method perspective anyone can quickly understand where things are leaving OK and where don't: `Ok` and `Error` methods speak for them-selves. But, more important, consumers from outside don't have to worry on catching exceptions, but wiring the result or alerting valuable information on what went wrong and could they could do then.

I think am personally in a phase where don't want to fill my code of try/catch everywhere, I prefer to leave things happen while I'm developing and, trust time will tell me which exceptions I should worry on. I too see the point on protecting that sensible stuff which could definitely go wrong don't know currently why however. I'm curious on what other feel on this area, which's the pros and cons of their work with errors and what are the findings while walking in that direction.