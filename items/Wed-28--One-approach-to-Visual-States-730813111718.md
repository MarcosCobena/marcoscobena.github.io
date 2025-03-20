*(This post was imported, please [contact](/#/contact) me if there's anything wrong with it. Thanks in advance)*

### Wed 28: One approach to Visual States

After struggling a few times with animations that respond to ViewModel changes in Xamarin.Forms —and while official Visual States arrive to stable— I started my own road to solve this particular issue: how to storyboard animations.

Originally worked on this during last Christmas, as part of a point & click demo where had some sort of scripting logic. After that, I iterated it for the NFC view the current app am working on has. And, finally, for the same app, with the help of my mate Sergio, iterated it again to make it a little bit more elegant to use.

I think it’s worth sharing. Basically, your ViewModels inherit IStateNotifier and pages IStateNotified, adding also to this last StateNotificationBehavior. With permission from our Designer, I’ve pulled just the NFC resources from above app to showcase what I can do nowadays.

![](https://cdn-images-1.medium.com/max/800/1*9o5SWTFk_2kBtKPKcGVAhQ.gif)  
Full storyboard runningAm really open to improve all this. During the last two weekends I’ve been reading Adam Pedley’s [series on functional ViewModels](https://xamarinhelp.com/more-functional-viewmodels-in-xamarin-forms-with-c/), and liked his approach of moving the states notion to just the view —this’ currently sorted out in VMs here. My main goal is performance, as my current scenarios involve a lot of bindings and the animations struggle a little bit, but please feel free to share any idea.

You can find the repo [here](https://github.com/MarcosCobena/XamarinFormsVisualStates), including the sample app.