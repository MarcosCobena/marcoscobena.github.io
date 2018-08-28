*Pst!* I almost never work on projects alone; this' the result of a whole team effort.

![](items/images/SnipInsights.png)

**Snip Insights** Starting from [Microsoft Garage's original app](https://www.microsoft.com/en-us/garage/profiles/snip-insights/), we developed a Xamarin.Forms port for macOS & Linux —and Windows too, although didn't use it finally because of a Gtk# bug with DPIs. The biggest challenge was to build a modern UI with Xamarin.Forms' Gtk# backend where there's no transparencies, for instance. I particularly enjoyed [workaround](https://gist.github.com/MarcosCobena/b4768bacc1a112a4f38a9d11a19f1251)ing a [crash](https://github.com/mono/gtk-sharp/issues/236) under macOS when taking screenshots, because had to bind some Apple's Core Graphics APIs, and glue this altogueter back to Gtk#.

|            |                                                              |
| ---------- | ------------------------------------------------------------ |
| Language   | C# (.NET)                                                    |
| Frameworks | Xamarin.Forms, Gtk#, Xamarin.Mac                             |
| Platforms  | macOS, Linux                                                 |
| Date       | August 2018                                                  |
| More info? | [https://github.com/Microsoft/Snip-Insights](https://github.com/Microsoft/Snip-Insights) (source code; pending merge by August 28th 2018) |

