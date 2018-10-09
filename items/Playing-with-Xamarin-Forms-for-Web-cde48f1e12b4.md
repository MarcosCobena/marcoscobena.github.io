*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

  # Playing with Xamarin.Forms for Web

   On Saturday I was playing a little bit with Frank’s OOUI, moreover Ooui.Wasm and Forms packages. The first allows to work with web’s DOM…   --------
  
### Playing with Xamarin.Forms for Web

On Saturday I was playing a little bit with Frank’s [OOUI](http://ooui.mecha.parts/), moreover Ooui.Wasm and Forms packages. The first allows to work with web’s DOM from C# running in client side, the second’s a Xamarin.Forms backend for web.

At home I have a 10 years old PC, with Windows 10 —running to maximize performance, except ClearType, which can’t live without nowadays. With Visual Studio Code, and Frank’s guide, could launch my first “n times clicked!” button.

I told Frank through Twitter what changes had to do into server.py because I chose Python 3.x and there were some changes, but obviously someone had already noticed that:


> [](https://twitter.com/1Marcos2Cobena/status/975033623308132354)
(Click above to see the entire thread.)

Because of having my web in GitHub, I commonly rely in [Mono’s XSP](http://www.mono-project.com/docs/web/aspnet/#aspnet-hosting-with-xsp) web server to test things out before committing. And it works too with Ooui —why not? Posted all this into [that issue](https://github.com/praeclarum/Ooui/issues/88).

I was playing with Buttons, Labels, StackLayouts, ActivityIndicators and so on. Also, moving things into an isolated ContentPage and overriding OnAppearing().

I really liked what I saw. Frank again has done an amazing and beautiful job —since a few years, for me, everything he touches simply rules. My mate Javi Suárez’s already pushed some commits into Ooui to enable more controls too. Today I woke up with the idea of moving [¡Buenos días!](https://play.google.com/store/apps/details?id=com.marcoscobena.buenosdiasaro) into Forms (fixing the images bug along the way), and thanks to OOUI can finally have the web too.