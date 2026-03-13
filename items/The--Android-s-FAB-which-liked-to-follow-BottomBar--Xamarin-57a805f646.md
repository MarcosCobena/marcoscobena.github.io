

### The #Android’s FAB which liked to follow BottomBar #Xamarin

I’ve been thinking more and more from my last 5 years or so the following: if our users just touch Design, why do we become so crazy with source code? Why do we invest so much time in improving the backend if the frontend is actually what we perceive? It turns out I’ve been last week with an UI Review in Beezy for Android, so had time to think on the first as well.

Part of that review has been to fix some wrong margins/paddings around items within RecyclerViews. We were setting such in code which means units are expressed in pixels, although Design asked for 16 dps. I’ve learnt how to reference in code units originally in dps, also taking advantage of dimens.xml files. This snippet shows how to gather 16 dps in pixel-size on an actual device:

// 'v' stands for a View  
var sixteenDps = TypedValue.ApplyDimension(ComplexUnitType.Dip, 16, v.Resources.DisplayMetrics);Android’s API uses to work on pxs (int, also, not float), so this is super handy. There’s also this other way to bring dps into action coming from dimens.xml:

var offset = (int)view.Resources.GetDimension(Resource.Dimension.default_margin_padding);If you mix both above, you have that. This stupid thing has allowed to start a standardization process heading a single point of truth for this as well 👌🏼

#### The BottomBar shyness with a coupled FAB

I’ve been tweeting during this week on this thing. The Design Review also asked to hide BottomBar when scrolling down the RecyclerView –as [Material Design suggests](https://material.io/guidelines/components/bottom-navigation.html#bottom-navigation-behavior). After digging on this I came up with the idea there’s no easy-to-go way with our current UI hierarchy:

  
![](https://cdn-images-1.medium.com/max/1000/1*rP3mHI0tOOds53QlT9AIww.png)  
Xamarin Inspector (Workbooks) to rescue once again  
A FAB which could be attached to the BottomBar needs –AFAIK– to live in the same plane as the second, together with the RecyclerView, and everything on direct top of a CoordinatorLayout. Such and the BottomBar now are (I made an initial refactoring past sprint), and second’s shyness now works, but FAB was feeling alone…

So, I said: why don’t I animate it manually? Trade-off. And it worked! Thanks to accessing BottomBar’s source code could see the anims. durations, and this’ the final result:

![](https://cdn-images-1.medium.com/max/800/1*r36D_mUE1Q9f44qI--jLhg.gif)  
Pay attention to how one looks like pushing the other 🤠The initial animations I played with where Animation objects run with View.StartAnimation(), until I noticed the reverse flavor needed to be done manually, and didn’t like the result. So it ended being this way:

Super simple, super easy to understand.

Well, this week I’ve double checked that it’s important how you create an UI hierarchy from the very beginning –actually it’s important to spend time on it. If not, there’s the need to look for workarounds. Also, I’ve felt how standardization at an UI level also leverages consistency along your app, which in the end is what you and I see, and touch.