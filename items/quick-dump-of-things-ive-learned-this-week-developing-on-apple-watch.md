It turns out we're lately at [Plain Concepts](http://www.plainconcepts.com) working on a few iOS apps which involve Apple Watch. And we're using Xamarin. :-) The one I'm working on is quite simple, but I've learned a few things which can be interesting to any other one making a first landing into a similar project.

I've noticed some differences with Storyboards on iPhone/iPad (iPod Touch keeps alive?) By default, the Watch App's UI lives inside an stack layout. You drop an element, it stacks at the bottom of the last one. It opens an small world of interesting effects, as you can hide/show elements to simulate different states of the app life-cycle.

AutoLayout? Well, no more. Margins to the Watch edges aren't longer needed, since the bezel implicitly has those. Just assume it'll look good on the device. And labels, buttons, etc. look good also when stacked. Simply I haven't seen my-self needing those, although we've been able to reproduce our Design quite good.

Group is also a joy: just be aware you can set an image as background, it opens also more possibilities.

Typefaces can't be modified within the Designer, it must be done from the Controller:

[code language="c-sharp"]
var attrString = new NSAttributedString("Foo", 
    new UIStringAttributes 
    { 
        Font = UIFont.SystemFontOfSize(14, UIFontWeight.Medium) 
    });
fooLabel.SetText(attrString);
[/code]

Strip-like animations can be easily done. Just add the whole list of images to the App's Resources, with a common patten such like "stripX.png", where X is a number, and the following code will do the rest for you (here the animation is set on a Group's background, `step` is an int with a value within the strip limits):

[code language="c-sharp"]
fooGroup.SetBackgroundImage("strip");
countdownGroup.StartAnimating(new NSRange(0, step), 1, 1);
[/code]

[WormHoleSharp](https://github.com/Clancey/WormHoleSharp) is our friend (James Clancey, thanks for your effort). If the app is quite small, and only needs iPhone to Watch communication, you may find it better to lay on `AppDelegate.HandleWatchKitExtensionRequest()`. Stop! It can be tricky, at least under my opinion, to forward the communication through the AppDelegate (messaging, for instance, can be an option). Instead, it's much more elegant, wherever you need to send/receive info (did I mention you can also send info from the Watch back?), to do something like:

[code language="c-sharp"]
_wormhole.PassMessage(FooMessage.MessageType, 
    new FooMessage 
    { 
        Text = "Hello, Watch!" 
    });
[/code]

And... that's all for now. Maybe those small things make you landing on Apple Watch easier.

Happy weekend!