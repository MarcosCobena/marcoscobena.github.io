Everyone looking forward to use Xamarin.Forms is asking the same question: _would we be able to match our Designer's layouts with Xamarin.Forms?_ One week ago, I installed again the official Twitter app on my iPhone, and it recalled my attention the opening: it has a beautiful animation which goes from the Twitter's bird to your timeline.

[![tumblr_inline_n6zoo1ve6a1qh9cw7](https://marcoscobena.files.wordpress.com/2015/02/tumblr_inline_n6zoo1ve6a1qh9cw7.gif)](tumblr_inline_n6zoo1ve6a1qh9cw7.gif)

Simple, but gorgeous. Those things make apps beautiful, a joy on our hands.

So, during the last days, I have been asking my-self: could we replicate this with Xamarin.Forms? I am aware of having [a small subset of animations](http://iosapi.xamarin.com/?link=T%3aXamarin.Forms.ViewExtensions%2fM), so maybe it can be done. Google-ing I have found this [page](http://iosdevtips.co/post/88481653818/twitter-ios-app-bird-zoom-animation), which explains in detail how to achieve the same with plain Objective-C on iOS. What I was looking for are which specific animations are executed on the "storyboard" (here that just means a consecution of animations one after the other, nothing to do with iOS' Storyboards nor nothing like that). So the trick can be done with just two of them:

1.  Scaling down the logo with a cubic-out easing (from fast to slow, decelerating)
2.  Scaling up "to the infinite" with a cubic-in one (from slow to fast, acelerating)
Hands to the keyboard: [the following sample app](https://github.com/MarcosCobena/XamarinFormsZoomStartupAnimation) is composed of two pages, where the first one, `LoadingPage`, does just that, the storyboard -which can be used to load content on the background asynchronously, indeed; and, the second one, `MainPage`, which allows to revisit the first without having to kill the app.

`LoadingPage` just has the logo in the middle, and in the code behind happens all "the magic":

[code language="csharp"]
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
[/code]

The interesting thing here, as I pointed above, is not just the animations them-selves, but being able to do async. operations in parallel and, in the meantime, make the user feel he/she has a great app on his/her hand:

[![ZoomStartupAnimationAndroid](zoomstartupanimationandroid.gif?w=184)](https://marcoscobena.files.wordpress.com/2015/01/zoomstartupanimationandroid.gif) [![ZoomStartupAnimationiOS](zoomstartupanimationios.gif?w=169)](https://marcoscobena.files.wordpress.com/2015/01/zoomstartupanimationios.gif) [![ZoomStartupAnimationWindowsPhone](zoomstartupanimationwindowsphone.gif?w=181)](https://marcoscobena.files.wordpress.com/2015/01/zoomstartupanimationwindowsphone.gif)

(Android, iOS and Windows Phone apps)

Why do not you get motivated and help us push Xamarin.Forms to all those design challenges out there? If you do, please share them with us. Thank you in advance! :-)