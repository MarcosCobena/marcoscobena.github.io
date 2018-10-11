*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

### Lottie, scroll’s headers and GradientBoxView #XamarinForms

**Monday, 27th  
**Back to the Xamarin.Forms project after holidays :-) Yeray assigned me to polish a task on a Lottie anim. within a splash view –the one in charge of logging in silently.

We needed something like Task.WhenAll(lottieAnimation, loggingIn) but Lottie for Xamarin.Forms doesn’t reflect when the anim. ends. I worked on [this PR](https://github.com/martijn00/LottieXamarin/pull/114) which adds a handy OnEnd event for both Android & iOS (anyone out there which would add UWP please?)

**Tuesday, 28th**  
In the redesign task am working on have needed again a top view attached to parent’s top, with an underlying ScrollView/ListView flowing below. You want the scroll’s content to begin just below the attached view, so adding a padding seems perfect. Finally, I’ve given with one way to make this dynamic, through binding the attached’s height to the scroll’s padding, thanks to a Converter:

**Wednesday, 29th**

![](https://cdn-images-1.medium.com/max/800/1*1vbZ5v_Lhx5srfzqs8qF0w.jpeg)  
Photo by [Ilnur Kalimullin](https://unsplash.com/photos/kP1AxmCyEXM?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)I’ve needed again something like a gradient view within Xamarin.Forms. Looking for existing NuGets [XFGloss](https://github.com/tbaggett/xfgloss) looked pretty promising, although after playing a little bit with it’s much more complex than my needs. In the end I found some Custom Renderers for Android & iOS through Xamarin Forums and adapted such for a new GradientBoxView, which accepts both a start color and an end one, and is very handy for placing wherever may be needed. It’s in our minds to publish it from DevsDNA.

**Thursday, 30th**  
Today has been the end of current sprint so have spent the whole day closing stuff.

**Friday, 1st**  
Airplane to Tenerife to our Christmas Dinner! 🎉