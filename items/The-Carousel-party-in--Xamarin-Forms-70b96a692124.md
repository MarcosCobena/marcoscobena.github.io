*(This post was imported, please [contact](/#/contact) me if there's anything wrong with it. Thanks in advance)*

### The Carousel party in #Xamarin Forms

Back from my on-site visit I’ve joined a new Xamarin.Forms project –which’s both cool and engaging, since I wanted that change after being somewhat like a year with pure Xamarin.Android/iOS.

My main task’s been to create a carousel control, where 3 items are showed at the same time and the one in the middle is aesthetically focused. Something similar to Finder’s Cover View, iTunes’ album carousel or this tvOS effect:

![](https://cdn-images-1.medium.com/max/800/1*hQcO0Qjsu8WeVbK6487dfQ.gif)  
🤔How many items are rendered at the same time? 3? 4? 5? maybe more?Before reading, please think about above question (just below the GIF).

The answer is 4: if you’d see in slow-motion the animation just 4 items are rendered at a time, when most. This’ something I’ve learnt from making video-games, which’s part of my past as developer: what you see can largely differ from how things are actually made, and focus must be on the first.

So, back to Xamarin.Forms, just playing with 4 ContentViews I can make the animations go back and forth. Let me show you just the case when user wants to go left:

void Handle_BtnLeftTapped(object sender, System.EventArgs e)  
 {  
 if (thereAreAnimationsInProgress)  
 {  
 return;  
 }  
   
 if (leftViewItemsSourceIndex < 0)  
 {  
 return;  
 }  
   
 thereAreAnimationsInProgress = true;  
   
 currentlyHiddenView.TranslationX = -1 * 2 * offsetBetweenBoxes;  
   
 if (leftViewItemsSourceIndex == 0)  
 {  
 currentlyHiddenView.BindingContext = null;  
 }  
 else  
 {  
 currentlyHiddenView.BindingContext = ItemsSource.ElementAt(leftViewItemsSourceIndex - 1);  
 }  
   
 Task.WhenAll(  
 currentlyHiddenView.TranslateTo(currentlyHiddenView.TranslationX + offsetBetweenBoxes, 0),  
 currentlyHiddenView.FadeTo(leftAndRightViewsOpacity),  
   
 currentlyLeftView.TranslateTo(currentlyLeftView.TranslationX + offsetBetweenBoxes, 0),  
 currentlyLeftView.ScaleTo(centerBoxScaleFactor),  
 currentlyLeftView.FadeTo(1),  
   
 currentlyCenterView.TranslateTo(currentlyCenterView.TranslationX + offsetBetweenBoxes, 0),  
 currentlyCenterView.ScaleTo(1 / centerBoxScaleFactor),  
 currentlyCenterView.FadeTo(leftAndRightViewsOpacity),  
   
 currentlyRightView.TranslateTo(currentlyRightView.TranslationX + offsetBetweenBoxes, 0),  
 currentlyRightView.FadeTo(0))  
 .ContinueWith(_ =>  
 {  
 var temporalRightView = currentlyRightView;  
 currentlyRightView = currentlyCenterView;  
 currentlyCenterView = currentlyLeftView;  
 currentlyLeftView = currentlyHiddenView;  
 currentlyHiddenView = temporalRightView;  
   
 leftViewItemsSourceIndex--;  
   
 SetSelectedItemAndUpdateTitle();  
   
 thereAreAnimationsInProgress = false;  
 });  
 }The code I think’s self-explanatory:


  * currently*View handles each of the 4 views we told before, and
  * temporalRightView, since we want to move left, is the 4th in the row which’s placed hidden at right side, just before executing the storyboardPacked in a single XAML and XAML.CS tuple we have a carousel-alike control which, too, exposes ItemsSource and SelectedItem bindings, very handy to play well outside.

In order to write XAML it turned out Xamarin’s Previewer didn’t work for me anymore after updating to last stable. So, I gave a try to Gorilla Player. I’ve successfully worked on the carousel control with Gorilla, and performed quite well since is totally isolated from Visual Studio –I work in Mac.

However, our ContentPages inherit ones linked to ReactiveUI, so such simply doesn’t work, which’s feasible. In the middle of the week I came into this article on LiveXAML, and saw the sky open:


> [](https://twitter.com/1Marcos2Cobena/status/920714659010891776)
Jim couldn’t use Gorilla so I don’t have a pre-comparison on both but I’ll definitely give it a try. I have a hope this yes will render things other can’t nowadays.

I’ve remembered this week that widely-known recurrent sentence from Steve Jobs: points are linked looking back: I was able to make this implementation because I had the chance to work on games.

Whatever we do nowadays, will serve us in the future ☺️