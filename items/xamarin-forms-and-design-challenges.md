*(This post was imported, please [contact](/?i=contact) me if there's anything wrong with it. Thanks in advance)*

Everyone looking forward to use Xamarin.Forms is asking the same question: <em>would we be able to match our Designer's layouts with Xamarin.Forms?</em> One week ago, I installed again the official Twitter app on my iPhone, and it recalled my attention the opening: it has a beautiful animation which goes from the Twitter's bird to your timeline.

<a href="items/images/tumblr_inline_n6zoo1ve6a1qh9cw7.gif"><img class="aligncenter wp-image-27 size-full" src="items/images/tumblr_inline_n6zoo1ve6a1qh9cw7.gif" alt="tumblr_inline_n6zoo1ve6a1qh9cw7" width="500" height="362" /></a>

Simple, but gorgeous. Those things make apps beautiful, a joy on our hands.

So, during the last days, I have been asking my-self: could we replicate this with Xamarin.Forms? I am aware of having <a href="http://iosapi.xamarin.com/?link=T%3aXamarin.Forms.ViewExtensions%2fM">a small subset of animations</a>, so maybe it can be done. Google-ing I have found this <a href="http://iosdevtips.co/post/88481653818/twitter-ios-app-bird-zoom-animation">page</a>, which explains in detail how to achieve the same with plain Objective-C on iOS. What I was looking for are which specific animations are executed on the "storyboard" (here that just means a consecution of animations one after the other, nothing to do with iOS' Storyboards nor nothing like that). So the trick can be done with just two of them:
<ol>
	<li>Scaling down the logo with a cubic-out easing (from fast to slow, decelerating)</li>
	<li>Scaling up "to the infinite" with a cubic-in one (from slow to fast, acelerating)</li>
</ol>
Hands to the keyboard: <a href="https://github.com/MarcosCobena/XamarinFormsZoomStartupAnimation">the following sample app</a> is composed of two pages, where the first one, <code>LoadingPage</code>, does just that, the storyboard -which can be used to load content on the background asynchronously, indeed; and, the second one, <code>MainPage</code>, which allows to revisit the first without having to kill the app.

<code>LoadingPage</code> just has the logo in the middle, and in the code behind happens all "the magic":

```c-sharp
public partial class LoadingPage : ContentPage
{
    public LoadingPage()
    {
        InitializeComponent();

        Initialize();
    }

    async void Initialize()
    {
        await ExecuteStoryboardAsync();
        await this.Navigation.PushAsync(new MainPage());
    }

    async Task ExecuteStoryboardAsync()
    {
        await Task.Delay(3000);
        await LogoImage.ScaleTo(0.75f, length: 1000, easing: Easing.CubicOut);
        await LogoImage.ScaleTo(25, length: 250, easing: Easing.CubicIn);
    }
}
```

The interesting thing here, as I pointed above, is not just the animations them-selves, but being able to do async. operations in parallel and, in the meantime, make the user feel he/she has a great app on his/her hand:

<a href="https://marcoscobena.files.wordpress.com/2015/01/zoomstartupanimationandroid.gif"><img class="alignnone wp-image-20 size-medium" style="border:1px solid #000000;" src="items/images/zoomstartupanimationandroid.gif" alt="ZoomStartupAnimationAndroid" width="184" height="300" /></a> <a href="https://marcoscobena.files.wordpress.com/2015/01/zoomstartupanimationios.gif"><img class="alignnone wp-image-21 size-medium" style="border:1px solid #000000;" src="items/images/zoomstartupanimationios.gif" alt="ZoomStartupAnimationiOS" width="169" height="300" /></a> <a href="https://marcoscobena.files.wordpress.com/2015/01/zoomstartupanimationwindowsphone.gif"><img class="alignnone wp-image-22 size-medium" style="border:1px solid #000000;" src="items/images/zoomstartupanimationwindowsphone.gif" alt="ZoomStartupAnimationWindowsPhone" width="181" height="300" /></a>

(Android, iOS and Windows Phone apps)

Why do not you get motivated and help us push Xamarin.Forms to all those design challenges out there? If you do, please share them with us. Thank you in advance! :-)