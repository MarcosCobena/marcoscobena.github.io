*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

  # Xamarin.Forms Design Framework

   In my personal trip to leverage all those small problems I found in my day to day, there’s one which sistematically reappears: I’m about to…   --------
  
### Xamarin.Forms Design Framework

In my personal trip to leverage all those small problems I found in my day to day, there’s one which sistematically reappears: I’m about to start a new Xamarin.Forms project for X platforms — please note the plural — but just have its design for one of them. For instance: I want my app to target Android & iOS, but just have the Android design.

The reasons why this happen would give for a different thread but I feel them as an homogeneus mix of:


  * Xamarin.Forms’ missunderstood, or we didn’t explain it quite well: it’s felt like Flutter — it appeared! — when it’s not
  * We don’t want to increase the time and money by spending a few more days with the rest of designs, for one reason or another we don’t see its valueI’ve been thinking a lot on this and nowadays have a strong opinnion which proposes one possible exit:

#### **Xamarin.Forms Design Framework**

Most of the times, when I’m working with a Zeplin project for a Forms app, the first servers as a handful guide of margins/paddings, sizes and colors. It’s not so much whether the status bar has a particular background color, or the button has any tweak which makes it look different. Obviously, those are things which in the end need to be done, but aren’t at the top of value.

Imagine we had something like [http://design.xamarin.com](http://design.xamarin.com) where our Designers could head on and learn without the first scroll what actually Xamarin.Forms’ all about. In their language.

After this, it could propose a Design Framework which would isolate from platform specifics and would concentrate on letting Designers express our apps in an agnostic way. A quick example to explain this: a button in such Framework would be a flat box with text inside: as a Developer, I can gather its width & height, its relative position to the parent view, margins with close controls, padding with its internal title and even its font size & color, which could also be done latter by Platform Translators.

  
![](https://cdn-images-1.medium.com/max/1000/0*t7UJdpwx2KGsTC1N)  
Photo by [Hal Gatewood](https://unsplash.com/@halgatewood?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&amp;utm_medium=referral)  
Platform Translators are the pieces which our Designer could fulfill to tell us how buttons should look like in iOS, in a closer aspect, or which’s the predominant font family to use in Android.

Such Design Framework could be seen as an imaginary device which focuses on wireframing, and then could have it’s Forms backend, letting us express the UIs internally with XAML.

Even more, all this also sets the scenario up for something like a WYSIWYG editor, where XAML brights, now yes, serving as a bridge where Designers and Developers can interact. XAML was conceived with this in mind more than a decade ago but the reality is it’s heavily focused on just Developers. Let’s change this.

Designers could have templates for Sketch or PhotoShop where every control is just there to drag & drop into their designs, in the same way there are toolkits for the most known platforms.

The truth’s we are moving into an ecosystem where our apps can be mobile or desktop or cloud, but such can’t only rely in the Development side. If we don’t make our Designers happier — with its direct impact on the later development — we’ll keep having a very beatiful app on X, with a “free” version on Y and Z.

And the best: there’s nothing to change on Forms. There’s nothing dependant on development tools, or SDKs. Sketching’s nothing new. It’s more of a mind change.

  
  
  By [Marcos Cobeña Morián](https://medium.com/@MarcosCobena) on [June 11, 2018](https://medium.com/p/b23a2f12cce5).

[Canonical link](https://medium.com/@MarcosCobena/xamarin-forms-design-framework-b23a2f12cce5)

Exported from [Medium](https://medium.com) on October 9, 2018.

