Current sprint, which ends just tomorrow, is being thrilling. Wonderful. We're crafting a beautiful app which goes beyond pixel respect, but content flow. I [think] can't say anything about it, our customer, but our skills developing apps are taking a level which I've always dreamed with, and that definitely makes me super happy. :-)

Last week we eventually needed a wrap view for a few pieces of the design. Wrap view here means an UIView which horizontally adds some other views until the max width it's allowed, and then keeps stacking things in a new row just below. It's a well-known control in Windows world, but didn't find anything similar in iOS.

As always, I look for what the community has achieved with Objective-C/Swift, and came up into this beautiful implementation of a wrapping UIView: [MyWrappingView](https://github.com/jmah/WrapDemo/blob/master/WrapDemo/MyWrappingView.m). I say beautiful not for my idealistic view of the world but due to the actual implementation of the wrapping thing, mainly focused into [this method](https://github.com/jmah/WrapDemo/blob/master/WrapDemo/MyWrappingView.m#L57) (how layoutSubviews() calls "recursively" on every subview).

What does a Xamarin guy when finds a ruby like this one? Yes, do port it to C#. And that I've [done](https://github.com/MarcosCobena/MyWrappingView). I still have had no time to make a fork-alike project in GitHub, but I'm making public the important bits, [MyWrappingView.cs](https://github.com/MarcosCobena/MyWrappingView/blob/master/MyWrappingView.cs), hoping anyone in the Internet will find it useful as well and, who knows, could build a small sample (replicating the original one, for instance) to make it faster to anyone else understand quickly how things go.

[caption id="attachment_679" align="aligncenter" width="480"]![xtka03mbiynp0rvsrc](xtka03mbiynp0rvsrc.gif) First thought when you port a control and consider sharing it[/caption]

I've tried to make the code C#-friendly, so anyone with knowledge on this last one will feel at home digging into it:

[MyWrappingView](https://github.com/MarcosCobena/MyWrappingView)

One more thing! In order to make these things work fine with AutoLayout, if you want your view to dynamically grow in height (for instance, a cell in an UICollectionView), [don't forget to set MyWrappingView's preferred max layout width](https://gist.github.com/MarcosCobena/193a0ab48a77dea40744a8812248d586).