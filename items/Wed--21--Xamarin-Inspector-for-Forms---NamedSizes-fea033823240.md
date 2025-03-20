*(This post was imported, please [contact](/#/contact) me if there's anything wrong with it. Thanks in advance)*

### Wed, 21: Xamarin Inspector for Forms & NamedSizes

Was it me the only one in Earth who didn’t know [Xamarin Inspector](https://docs.microsoft.com/en-us/xamarin/tools/inspector/) now shows not only the native OS’ UI hierarchy but also Forms one? I was struggling with a mysterious margin and BOOM, Inspector showed me the path :-)

![](https://cdn-images-1.medium.com/max/800/0*7pMarMbujb1W_lFY.)  
Photo by [Igor Ovsyannykov](https://unsplash.com/@igorovsyannykov?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&amp;utm_medium=referral)For some reason I thought a control which’s not visible computes its margin even so. But no, as always the issue’s between the monitor and the chair.

The UI refactoring was finally finished! Phew, after all am super happy with the result, as using a custom font and increasing the entire sizes was a blast.

On that last piece, I followed the recommendation from yesterday and also my mate Sergio’s one of using Forms’ built-in [NamedSize](https://developer.xamarin.com/api/type/Xamarin.Forms.NamedSize/)s, where having source code at GitHub really helped understand [the underneath calcs](https://github.com/xamarin/Xamarin.Forms/blob/b96f65bdd9e7e931971338b122a8940e2a35ccc7/Xamarin.Forms.Platform.Android/Forms.cs#L429) to render its different sizes.

The app now shines in a 7’’ tablet, running Full HD, but also on more smaller form factors. What I learnt? My next project will start yes or yes with font styles and, if fits, with named sizes and, if fits, with Control Templates, all in this order.