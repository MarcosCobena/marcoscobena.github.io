*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

  # Unit Testing #XamarinForms controls, the simplest SwipeGestureRecognizer and no more…

   Following with previous week, I’ve kept with the carousel control. However, I started with one weird bug where a navigation between two…   --------
  
### Unit Testing #XamarinForms controls, the simplest SwipeGestureRecognizer and no more Debug.WriteLine()

Following with previous week, I’ve kept with the carousel control. However, I started with one weird bug where a navigation between two Pages was taking too long.

It’s funny because every time I stumble upon these things I go deep in my code and start measuring time between breakpoints –how handy is VS for Mac’s Breakpoint Actions:

![](https://cdn-images-1.medium.com/max/800/1*_RCs4suCdxCfUk6PWiIqfA.png)  
Instead of plenty of Debug.WriteLine() this came to save our lifesAnd, finally, after 1 or 2 h of no success I went through Xamarin Profiler and BOOM the issue was in a JSON deserialization process. Fixing was quick because decided to move away from such JSON and create the hierarchy on demand in C# –we weren’t expecting that to change in a dynamic fashion.

So, first learning of the week, by Monday: every time I’ll have another performance issue


  1. I’ll rely on Xamarin Profiler and, if such didn’t help, then
  2. will debug manuallyAs I was telling above I kept with the carousel. Mainly my task was to add a cyclic behavior and support lower than 3 items. Also, in the end, allow to specify which item’s selected from the beginning.

Making the carousel cyclic was an easy task. Since the entire thing relies on an int index a few module ops. were needed. The complex stuff came with supporting lower than 3 items. I started to feel pain on any modification made in the future breaking my code so added a new nUnit project in order to protect our-selves from those.

As the control heavily relies in animations, thus Xamarin.Forms libs, I reentered into [Jonathan Peppers’ Xamarin.Forms.Mocks](https://github.com/jonathanpeppers/Xamarin.Forms.Mocks) NuGet. It helps you test straightforward your code with cool things as making every animation complete instantly. It saved my day.

Also, making the CarouselControl offer a well-known binding scenario made me testing it quite easy and joyable:

[Test]  
 public void FirstItemIsFocusedByDefaultFromThree()  
 {  
 AddItems(3);  
   
 carouselControl.ItemsSource = items;  
   
 Assert.AreEqual(items[0], carouselControl.SelectedItem);  
 }Finally, I had to support swipe gestures so at Page level any left or right swipe is directly taken as a left/right movement for the carousel. I became a little bit crazy looking for [different swipe gesture implementations](https://github.com/xamarin/Xamarin.Forms/pull/1007/files) but finally, reusing PanGestureRecognizer was much easier and cleaner (ThresholdToFireSwipeGesture takes 100):

Learnings? Things can be easier than we think –or we think too complex from the semaphore. Tests are helpful to feel confidence, and avoids debugging time. VS 4 Mac still has nice surprises to discover, like those beautiful “break”points :-)

  
  
  By [Marcos Cobeña Morián](https://medium.com/@MarcosCobena) on [October 31, 2017](https://medium.com/p/2ecf7d448fbf).

[Canonical link](https://medium.com/@MarcosCobena/unit-testing-xamarinforms-controls-the-simplest-swipegesturerecognizer-and-no-more-debug-2ecf7d448fbf)

Exported from [Medium](https://medium.com) on October 9, 2018.

