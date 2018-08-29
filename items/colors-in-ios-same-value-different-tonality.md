*(This post was imported, please [contact](/?i=contact) me if there's anything wrong with it. Thanks in advance)*

<em>This entry was originally written at <a href="http://blogs.plainconcepts.com/xamarinteam/2015/10/05/colors-in-ios-same-value-different-tonality/">Plain Concepts' Xamarin Team Blog</a>.</em>

While working on a native Xamarin.iOS app, I noticed a difference between the same color applied through source code to the navigation bar and through Interface Builder to the background of a scroll view. There was a small difference between both colors' tonality, although I had entered the same RGB values on both places. You can appreciate the difference on this small sample app, where pure red (<span style="color:#ff0000;">#ff0000</span>) is used on both views:

<img class="aligncenter size-full wp-image-127" src="items/images/screenshot-color-issue.png" alt="screenshot-color-issue" width="573" height="500" />

When you enter an RGB value in code, through an <code>UIColor</code> for instance, it's rendered fine. The color you see on the emulator/device is correct, and should match the one on the design (take care not to have a semi-transparent layer on top of it, or something similar).

```c-sharp
redView.BackgroundColor = UIColor.Red;
```

<p style="text-align:center;"><img class="aligncenter size-full wp-image-128" src="items/images/screenshot-color-debugging.png" alt="screenshot-color-debugging" width="947" height="418" /><em>Note the RGB matches the one we're expecting: 255, 0, 0; or #ff0000</em></p>
Doing the same through Interface Builder... well, it's a little bit different. It's done through the Colors window and, more specifically, the Color Sliders tab (2<sup>nd</sup> one from left), where you can enter an RGB value in hex format.

<img class="aligncenter size-full wp-image-129" src="items/images/screenshot-color-picker.png" alt="screenshot-color-picker" width="450" height="518" />

So, if I entered the same exact value on both places, why those look different? The answer is not so easy to see by one-self.

Back on the Colors window, do you see the small "settings" button at the top-right side? Doing click on it presents you all the available color spaces, which understand in a different way the color value entered previously. In my case, sRGB IEC61966-2.1 is predefined. If I change it to Generic RGB, the <span style="color:#ff0000;">#ff0000</span> red value is updated to <span style="color:#fb0007;">#fb0007</span>, which's indeed the color being rendered when the app is run on the emulator. Then, If I want exact #ff0000 to be rendered, I must assure to choose first Generic RGB and, just after, modify the R, G, B sliders manually, until matching the value 255, 0, 0; or #ff0000. This way pure red color will be codified on the Storyboard, thus correctly shown on the device:

<img class="aligncenter size-full wp-image-130" src="items/images/screenshot-color-issue-fixed.png" alt="screenshot-color-issue-fixed" width="582" height="500" />

Dear Reader: if you know a different way to quickly set the dessired color exactly as you intend in Interface Builder, please share it as a comment, or ping me at <a href="https://twitter.com/CobenaMarcos">Twitter</a>!

I hope it'll be useful for anyone else! <a href="https://en.wikipedia.org/wiki/The_Devil_is_in_the_detail">The Devil is in the detail</a>. :-)