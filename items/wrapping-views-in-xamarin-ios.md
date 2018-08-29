*(This post was imported, please [contact](/?i=contact) me if there's anything wrong with it. Thanks in advance)*

Current sprint, which ends just tomorrow, is being thrilling. Wonderful. We're crafting a beautiful app which goes beyond pixel respect, but content flow. I [think] can't say anything about it, our customer, but our skills developing apps are taking a level which I've always dreamed with, and that definitely makes me super happy. :-)

Last week we eventually needed a wrap view for a few pieces of the design. Wrap view here means an UIView which horizontally adds some other views until the max width it's allowed, and then keeps stacking things in a new row just below. It's a well-known control in Windows world, but didn't find anything similar in iOS.

As always, I look for what the community has achieved with Objective-C/Swift, and came up into this beautiful implementation of a wrapping UIView: <a href="https://github.com/jmah/WrapDemo/blob/master/WrapDemo/MyWrappingView.m">MyWrappingView</a>. I say beautiful not for my idealistic view of the world but due to the actual implementation of the wrapping thing, mainly focused into <a href="https://github.com/jmah/WrapDemo/blob/master/WrapDemo/MyWrappingView.m#L57">this method</a> (how layoutSubviews() calls "recursively" on every subview).

What does a Xamarin guy when finds a ruby like this one? Yes, do port it to C#. And that I've <a href="https://github.com/MarcosCobena/MyWrappingView">done</a>. I still have had no time to make a fork-alike project in GitHub, but I'm making public the important bits, <a href="https://github.com/MarcosCobena/MyWrappingView/blob/master/MyWrappingView.cs">MyWrappingView.cs</a>, hoping anyone in the Internet will find it useful as well and, who knows, could build a small sample (replicating the original one, for instance) to make it faster to anyone else understand quickly how things go.

<img class=" size-full wp-image-679 aligncenter" src="items/images/xtka03mbiynp0rvsrc.gif" alt="xtka03mbiynp0rvsrc" width="480" height="480" />
*First thought when you port a control and consider sharing it*

I've tried to make the code C#-friendly, so anyone with knowledge on this last one will feel at home digging into it:
<p style="text-align:center;"><a href="https://github.com/MarcosCobena/MyWrappingView">MyWrappingView</a></p>
<p style="text-align:left;">One more thing! In order to make these things work fine with AutoLayout, if you want your view to dynamically grow in height (for instance, a cell in an UICollectionView), <a href="https://gist.github.com/MarcosCobena/193a0ab48a77dea40744a8812248d586">don't forget to set MyWrappingView's preferred max layout width</a>.</p>