*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

# Tue 3: Multiple instances of the same ViewModel

   I have another issue of multiple instances of the same ViewModel live at the same time. Basically am navigating to the same page —after…   --------
  
### Tue 3: Multiple instances of the same ViewModel

I have another issue of multiple instances of the same ViewModel live at the same time. Basically am navigating to the same page —after having some others in the middle— through 1) InsertPageBefore() and 2) PopToRoot().

![](https://cdn-images-1.medium.com/max/800/0*atYJhzXMB636j8nr.)  
Photo by [The Creative Exchange](https://unsplash.com/@creativeexchange?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&amp;utm_medium=referral)Xamarin Profiler’s always helped me sort those things out, and turns out haven’t used it lately, and after taking some snapshots I see the instances decrease to just 1. However, remember those snapshots force a GC’s collect, and [that way it’s](https://forums.xamarin.com/discussion/comment/322352/#Comment_322352). So, it turns out this’ a wonderful fast way to detect whether your VM’s actually referenced.

Wasn’t there a way to see the back references for a given instance? My main concern isn’t having multiple instances live (which too), but the multiple navigations happening because of same code being executed on those places.

Such VM’s a more elaborated flavor of this one —with a cancellation token to “assure” the loop is endless:

[**MarcosCobena/XamarinFormsVisualStates**  
_XamarinFormsVisualStates - Another approach to Visual States in Xamarin.Forms_github.com](https://github.com/MarcosCobena/XamarinFormsVisualStates/blob/master/XamarinFormsVisualStates/NFCViewModel.cs)[](https://github.com/MarcosCobena/XamarinFormsVisualStates/blob/master/XamarinFormsVisualStates/NFCViewModel.cs)  
Surely, the cancellation isn’t happening…