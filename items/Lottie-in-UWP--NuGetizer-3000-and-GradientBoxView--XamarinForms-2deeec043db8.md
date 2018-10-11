*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

### Lottie in UWP, NuGetizer-3000 and GradientBoxView #XamarinForms

**Monday, 4th**  
I finally could spend some time on UWP for Lottie. Had to reinstall my whole Windows 10 + VS 2017 from scratch as latest UWP SDK works with latest VS only (it saved also some extra space in my SSD which’s good too). Martijn’s already approved [the latest changes](https://github.com/martijn00/LottieXamarin/pull/114) so expect to have it merged soon :-)

![](https://cdn-images-1.medium.com/max/800/1*pPDzN59Ek9_pH88AUZyg8g.jpeg)  
Photo by [Kirstyn Paynter](https://unsplash.com/photos/B6e96uSIApE?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)I’m in the process of publishing our “DNAGradientBoxView” NuGets, and have learned about [NuGetizer 3000](https://github.com/NuGet/Home/wiki/NuGetizer-3000), an easy way to create NuGets directly from VS. To be honest it’s my first time creating packages, and am struggling a little bit, but expect to have this all sorted out soon. Am currently trying the [bait-and-switch technique](https://github.com/NuGet/Home/wiki/NuGetizer-Core-Scenarios#bait-and-switch), which adds platform-specific code by just referencing a NuGet from the PCL project.

**Tuesday, 5th**  
Hooray!


> [](https://twitter.com/1Marcos2Cobena/status/938003588827058176)
I keep struggling with NuGet packaging –am focused on doing this with the IDE. After recreating the solution n + 1 times I’ve received again the same error, which seems half-fixed from their side:

[**NuGetizer api intersection does not support referenced assemblies · Issue #4597 · NuGet/Home**  
_Details about Problem There needs to be a way to specify reference assembly paths for the ApiIntersect tool. Currently…_github.com](https://github.com/NuGet/Home/issues/4597)[](https://github.com/NuGet/Home/issues/4597)  
It looks like Bait and Switch can’t be done from VS, so will go back to nuspec files and Terminal 🤷🏻‍♂️

**Wednesday, 6th**  
Bank holiday!

**Thursday, 7th**  
Bank holiday too, but have spent some time updating my [web](http://marcoscobena.com/#/home) and [Now](http://marcoscobena.com/#/now) page.

I’ve kept with my determination to make NuGetizer-3000 work for my little project, and decided to clone [ApiIntersect](https://github.com/xamarin/ApiInteresect) repo to debug the exception I got. Going through the code I’ve finally understood why Bait-and-switch doesn’t work in my scenario: it can’t work when the platform implementation inherits a class which’s out of the intersection with a .NET client profile. However, ApiIntersect wasn’t handling this fine –at least giving a hint on the issue–, so I’ll make a PR to improve this for others.

And, finally, I published GradientBoxView! –also in [GitHub](https://github.com/DevsDNA/GradientBoxView):

[**DevsDNA.GradientBoxView 1.0.1**  
_An empowered Xamarin.Forms' BoxView with 2-color gradients._www.nuget.org](https://www.nuget.org/packages/DevsDNA.GradientBoxView)[](https://www.nuget.org/packages/DevsDNA.GradientBoxView)  
**Friday, 8th**  
Bank holiday!