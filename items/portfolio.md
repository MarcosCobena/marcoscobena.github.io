*Pst!* I almost never work on projects alone; this' the result of a whole team effort:

### Ges Seguros

![](items/images/GesSeguros.png)

For a new iteration over the existing app, I worked adding some more functionality. This project doesn't bundle a highly customized UI, but's pretty large in the amount of views. I've taken the chance to refactor mostly at XAML side: taking controls out to avoid repetition, establishing bases for fonts styles, etc. I was in charge too of recovering the CI/CD environment, layed in App Center.

|            |                                                              |
| ---------- | ------------------------------------------------------------ |
| Language   | C# (.NET)                                                    |
| Frameworks | Xamarin.Forms                                                |
| Platforms  | Android, iOS                                                 |
| Date       | September 2018                                               |
| More info? | [Google Play](https://play.google.com/store/apps/details?id=com.ges.mobile)<br />[App Store](https://itunes.apple.com/es/app/ges-seguros/id1314860753) |

### Snip Insights

![](items/images/SnipInsights.png)

Starting from [Microsoft Garage's original app](https://www.microsoft.com/en-us/garage/profiles/snip-insights/), we developed a Xamarin.Forms port for macOS & Linux —and Windows too, although didn't use it finally because of a Gtk# bug with DPIs. The biggest challenge was to build a modern UI with Xamarin.Forms' Gtk# backend where there's no transparencies, for instance. I particularly enjoyed [workaround](https://gist.github.com/MarcosCobena/b4768bacc1a112a4f38a9d11a19f1251)ing a [crash](https://github.com/mono/gtk-sharp/issues/236) under macOS when taking screenshots, because had to bind some Apple's Core Graphics APIs, and glue this altogueter back to Gtk#.

|            |                                                              |
| ---------- | ------------------------------------------------------------ |
| Language   | C# (.NET)                                                    |
| Frameworks | Xamarin.Forms, Gtk#, Xamarin.Mac                             |
| Platforms  | macOS, Linux                                                 |
| Date       | August 2018                                                  |
| More info? | [https://github.com/Microsoft/ailab/tree/master/Snip-Insights](https://github.com/Microsoft/ailab/tree/master/Snip-Insights) (source code; releases can be found [here](https://github.com/Microsoft/ailab/releases)) |

