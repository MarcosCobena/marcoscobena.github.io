_This entry was originally written at [Plain Concepts' Xamarin Team Blog](http://blogs.plainconcepts.com/xamarinteam/2015/10/05/colors-in-ios-same-value-different-tonality/)._

While working on a native Xamarin.iOS app, I noticed a difference between the same color applied through source code to the navigation bar and through Interface Builder to the background of a scroll view. There was a small difference between both colors' tonality, although I had entered the same RGB values on both places. You can appreciate the difference on this small sample app, where pure red (<span style="color:#ff0000;">#ff0000</span>) is used on both views:

![screenshot-color-issue](screenshot-color-issue.png)

When you enter an RGB value in code, through an `UIColor` for instance, it's rendered fine. The color you see on the emulator/device is correct, and should match the one on the design (take care not to have a semi-transparent layer on top of it, or something similar).

[sourcecode language="csharp"]
redView.BackgroundColor = UIColor.Red;
[/sourcecode]

![screenshot-color-debugging](screenshot-color-debugging.png)_Note the RGB matches the one we're expecting: 255, 0, 0; or #ff0000_

Doing the same through Interface Builder... well, it's a little bit different. It's done through the Colors window and, more specifically, the Color Sliders tab (2<sup>nd</sup> one from left), where you can enter an RGB value in hex format.

![screenshot-color-picker](screenshot-color-picker.png)

So, if I entered the same exact value on both places, why those look different? The answer is not so easy to see by one-self.

Back on the Colors window, do you see the small "settings" button at the top-right side? Doing click on it presents you all the available color spaces, which understand in a different way the color value entered previously. In my case, sRGB IEC61966-2.1 is predefined. If I change it to Generic RGB, the <span style="color:#ff0000;">#ff0000</span> red value is updated to <span style="color:#fb0007;">#fb0007</span>, which's indeed the color being rendered when the app is run on the emulator. Then, If I want exact #ff0000 to be rendered, I must assure to choose first Generic RGB and, just after, modify the R, G, B sliders manually, until matching the value 255, 0, 0; or #ff0000. This way pure red color will be codified on the Storyboard, thus correctly shown on the device:

![screenshot-color-issue-fixed](screenshot-color-issue-fixed.png)

Dear Reader: if you know a different way to quickly set the dessired color exactly as you intend in Interface Builder, please share it as a comment, or ping me at [Twitter](https://twitter.com/CobenaMarcos)!

I hope it'll be useful for anyone else! [The Devil is in the detail](https://en.wikipedia.org/wiki/The_Devil_is_in_the_detail). :-)