// addItem/Post(
//     title, <- Here goes the user-friendly title you want to show
//     filename, <- Item's filename without .md extension, at the same level of this current one
//     date, <- Date, as is, i.e. will be rendered without conversion
//     tags, <- string array of tags
// );

// Items —it doesn't mind the order how they're added

addItem("404 Not Found", "404", "29/8/2018");
addItem("¡Hola! 👋", "home", "28/11/2022");
addItem("Audios", "audios", "28/5/2018");
addItem("Blog", "blog", "5/2/2021");
addItem("Blog", "blog-es", "5/2/2021");
addItem("Conferences", "conferences", "30/7/2019");
addItem("FPV Drones", "drones", "8/5/2018");
addItem("Git", "git", "8/6/2020");
addItem("Key-bindings", "key-bindings", "24/5/2018");
addItem("Portfolio", "portfolio", "28/11/2022");
addItem("Questions", "questions", "7/5/2018");
addItem("Reading", "reading", "29/2/2020");
addItem("Recipes", "recipes", "14/6/2018");
addItem("Screen template", "screen-template", "6/7/2018");
addItem("Tools", "tools", "20/1/2021");
//addItem("DEBUG", "debug", "1/1/1970");

addRedirection("contact", "/?i=home");
addRedirection("juanma-y-marcos", "https://www.ivoox.com/podcast-aporreando-teclados_sq_f11142253_1.html");

// addEpisode(
//     title, <- idem
//     audioFilename, <- The audio file played in HTML, expected to be placed at items/documents/
//     documentFilename, <- idem as above items & posts' filename
//     date <- idem
// );

// Episodes —this' the order they'll appear listed

// Intentionally empty

// Posts —this' the order they'll appear listed

addPost("Frustated 2022 recap", "2022", "1/1/2023");
addPost("Por una git-arra con menos cuerdas", "git-interactively-rebase", "23/9/2022", ['es']);
addPost("Haz tests", "haz-tests", "19/5/2021", ['es']);
addPost("Design follows logic", "design-follows-logic", "16/2/2021");
addPost("Creativity, Inc.", "creativity-inc", "8/10/2020");
addPost("La solución al reto: división en GOTO", "la-solucion-al-reto-division-en-goto", "9/5/2020", ['es']);
addPost("Introducción a la Programación para Niños", "ipn", "9/5/2020", ['es']);
addPost("Wave Engine Web performance", "wave-engine-web-performance", "26/4/2020");
addPost("Wave Engine's on-line glTF viewer", "wave-engines-on-line-gltf-viewer", "7/2/2020");
addPost("The 'last' Visual Test #WaveEngine #WebGL #Wasm", "2019-8-2", "2/8/2019");
addPost("Wave Engine & WebGL.NET status", "2019-7-26", "26/7/2019");
addPost("Your first Wasm app with C#", "wasmapp1", "6/7/2019");
addPost("Unit Testing WebGL.NET", "unit-testing-webglnet", "28/6/2019");
addPost("Pull-Request reviews", "pr-reviews", "20/2/2019");
addPost("GoTo", "goto", "4/1/2019");
addPost("Xamarin.Forms XAML", "xf-xaml", "21/12/2018");
addPost("Exceptions to Exceptions (Xamarin)", "exceptions-to-exceptions", "15/12/2018");
addPost("Xamarin.Forms XAML: Styles", "xf-xaml-styles", "22/11/2018");
addPost("Xamarin.Forms XAML: Sizes", "xf-xaml-sizes", "20/11/2018");
addPost("Xamarin.Forms XAML: Global Styles", "xf-xaml-global-styles", "14/11/2018");
addPost("Xamarin.Forms XAML: Font Styles", "xf-xaml-font-styles", "9/11/2018");
addPost("Xamarin.Forms XAML: Converters", "xf-xaml-converters", "31/10/2018");
addPost("Xamarin.Forms XAML: Control Templates", "xf-xaml-control-templates", "18/10/2018");
addPost("Xamarin.Forms XAML: Colors", "xf-xaml-colors", "10/10/2018");
addPost("Xamarin.Forms Design Framework", "Xamarin-Forms-Design-Framework-b23a2f12cce5", "11/6/2018");
addPost("Fri 6: Sum up &amp; fuget.org", "Fri-6--Sum-up---fuget-org-defecbf27385", "6/4/2018");
addPost("Thu 5: Analysing an app written by others", "Thu-5--Analysing-an-app-written-by-others-ab9c50246d5a", "5/4/2018");
addPost("Wed 4: Meetings", "Wed-4--Meetings-2556117737e8", "4/4/2018");
addPost("Tue 3: Multiple instances of the same ViewModel", "Tue-3--Multiple-instances-of-the-same-ViewModel-5e696e8dd793", "3/4/2018");
addPost("Mon 2: Polly’s Retry policy to make network calls", "Mon-2--Polly-s-Retry-policy-to-make-network-calls-224d70957b2c", "2/4/2018");
addPost("Wed 28: One approach to Visual States", "Wed-28--One-approach-to-Visual-States-730813111718", "28/3/2018");
addPost("Tips &amp; tricks to rely in VirtualBox", "Tips---tricks-to-rely-in-VirtualBox-e9e28c8cd180", "23/3/2018");
addPost("Thu, 22: Charles with Android, VirtualBox’ HD size &amp; UWP debugging", "Thu--22--Charles-with-Android--VirtualBox--HD-size---UWP-debugging-284998a21a5e", "22/3/2018");
addPost("Wed, 21: Xamarin Inspector for Forms &amp; NamedSizes", "Wed--21--Xamarin-Inspector-for-Forms---NamedSizes-fea033823240", "21/3/2018");
addPost("Tuesday, 20/3/2018", "Tuesday--20-3-2018-f42e8eb10d25", "20/3/2018");
addPost("Playing with Xamarin.Forms for Web", "Playing-with-Xamarin-Forms-for-Web-cde48f1e12b4", "19/3/2018");
addPost("How to centralize font-related styling", "2018-3-15", "16/3/2018");
addPost("Let's use Control Templates", "2018-3-14", "15/3/2018");
addPost("Pushing our-selves into our users' perspective", "2018-3-13", "14/3/2018");
addPost("Cannot connect to local IIS Express", "2018-3-12", "13/3/2018");
addPost("Gathering Android's density & Entity Framework's CLI", "2018-3-9", "12/3/2018");
addPost("Using again my sort of Visual State management", "2018-3-6", "7/3/2018");
addPost("VS for Mac bugs & LiteDB learning", "2018-3-5", "6/3/2018");
addPost("Back with Wave Engine & some Visual Studio for Mac bugs", "2018-3-1", "2/3/2018");
addPost("SQLite & Material Design Frames on iOS", "2018-2-27", "1/3/2018");
addPost("xUnit & SQLite", "2018-2-26", "27/2/2018");
addPost("FFImageLoading's SVGCachedImage & converters chaining", "2018-2-22", "23/2/2018");
addPost("Git-LFS & CarouselView & Xamarin.Forms Chrome's shortcut", "2018-2-21", "22/2/2018");
addPost("SVGs in Xamarin.Forms & Git's cherry picking", "2018-2-20", "21/2/2018");
addPost("Connecting your app with an ASP.NET API running on a local VM", "2018-2-19", "20/2/2018");
addPost("Falling in love with ValueTuples and a small heart break", "2018-2-15", "16/2/2018");
addPost("Suave scroll-less lists in Xamarin.Forms", "2018-2-13", "14/2/2018");
addPost("Rapid styling ListViews", "2018-2-12", "13/2/2018");
addPost("Embedding JSON responses conditionally", "2018-2-9", "12/2/2018");
addPost("Thursday", "2018-2-8", "9/2/2018");
addPost("Wednesday", "2018-2-7", "8/2/2018");
addPost("Tuesday", "2018-2-6", "7/2/2018");
addPost("Tuesday", "2018-1-30", "30/1/2018");
addPost("Monday", "2018-1-29", "29/1/2018");
addPost("Saturday", "2018-1-27", "27/1/2018");
addPost("Friday", "2018-1-26", "26/1/2018");
addPost("Thursday", "2018-1-25", "25/1/2018");
addPost("Wednesday", "2018-1-24", "24/1/2018");
addPost("Tuesday", "2018-1-23", "23/1/2018");
addPost("Monday", "2018-1-22", "22/1/2018");
addPost("Sunday", "2018-1-21", "21/1/2018");
addPost("Friday", "2018-1-19", "19/1/2018");
addPost("Thursday", "2018-1-18", "18/1/2018");
addPost("Wednesday", "2018-1-17", "17/1/2018");
addPost("Tuesday", "2018-1-16", "16/1/2018");
addPost("Monday", "2018-1-15", "15/1/2018");
addPost("Saturday", "2018-1-13", "13/1/2018");
addPost("Thursday", "2018-1-11", "11/1/2018");
addPost("Wednesday", "2018-1-10", "10/1/2018");
addPost("Tuesday", "2018-1-9", "9/1/2018");
addPost("Monday", "2018-1-8", "8/1/2018");
addPost("Thursday", "2018-1-4", "4/1/2018");
addPost("Thursday", "2017-12-21", "21/12/2017");
addPost("Wednesday", "2017-12-20", "20/12/2017");
addPost("Tuesday", "2017-12-19", "19/12/2017");
addPost("Monday", "2017-12-18", "18/12/2017");
addPost("XAML things, merging RESX and 10.0.2.2 #XamarinForms", "XAML-things--merging-RESX-and-10-0-2-2--XamarinForms-b7ab15533176", "18/12/2017");
addPost("Lottie in UWP, NuGetizer-3000 and GradientBoxView #XamarinForms", "Lottie-in-UWP--NuGetizer-3000-and-GradientBoxView--XamarinForms-2deeec043db8", "13/12/2017");
addPost("Lottie, scroll’s headers and GradientBoxView #XamarinForms", "Lottie--scroll-s-headers-and-GradientBoxView--XamarinForms-2e0afb12a4a", "6/12/2017");
addPost("Design should worry us more. And just-Debug LiveXAML #Xamarin #XamarinForms", "Design-should-worry-us-more--And-just-Debug-LiveXAML--Xamarin--XamarinForms-24c11327ccd6", "15/11/2017");
addPost("Just-PCL OpenID authentication in #XamarinForms, Firebase and limited resources", "Just-PCL-OpenID-authentication-in--XamarinForms--Firebase-and-limited-resources-53591bb20887", "8/11/2017");
addPost("Unit Testing #XamarinForms controls, the simplest SwipeGestureRecognizer and no more…", "Unit-Testing--XamarinForms-controls--the-simplest-SwipeGestureRecognizer-and-no-more--2ecf7d448fbf", "31/10/2017");
addPost("The Carousel party in #Xamarin Forms", "The-Carousel-party-in--Xamarin-Forms-70b96a692124", "25/10/2017");
addPost("“Design should worry us more than code” #Xamarin", "-Design-should-worry-us-more-than-code---Xamarin-fecc2b436e08", "18/10/2017");
addPost("Senseful StyleCop for Visual Studio –Mac and Windows #Xamarin", "Senseful-StyleCop-for-Visual-Studio--Mac-and-Windows--Xamarin-e02fdf15d039", "11/10/2017");
addPost("The #Android’s FAB which liked to follow BottomBar #Xamarin", "The--Android-s-FAB-which-liked-to-follow-BottomBar--Xamarin-57a805f646", "4/10/2017");
addPost("The refreshes bug and i18n", "The-refreshes-bug-and-i18n-3d9ad2a9421b", "25/9/2017");
addPost("Abanico, a few hours with Xamarin.Forms and SkiaSharp", "abanico-a-few-hours-with-xamarin-forms-and-skiasharp", "21/6/2017");
addPost("Reflexiones", "reflexiones", "21/3/2017", ['es']);
addPost("Qué puedo hacer / What can I do", "que-puedo-hacer", "14/3/2017", ['es']);
addPost("Wrapping views in Xamarin.iOS", "wrapping-views-in-xamarin-ios", "22/12/2016");
addPost("My UICollectionView doesn't refresh on new items", "my-uicollectionview-doesnt-refresh-on-new-items", "12/12/2016");
addPost("Para los que nacimos en los 80, y para los que no", "para-los-que-nacimos-en-los-80-y-para-los-que-no", "11/12/2016", ['es']);
addPost("Hacia la e-Tauromaquia. Una propuesta para la convivencia y el emprendimiento", "Hacia-la-e-Tauromaquia--Una-propuesta-para-la-convivencia-y-el-emprendimiento-fe84192e75c4", "15/8/2016", ['es']);
addPost("Mask Animation with Xamarin.iOS and AutoLayout", "mask-animation-with-xamarin-ios-and-autolayout", "26/7/2016");
addPost("Introducing Xamarin.iOS to Objective-C/Swift developers", "introducing-xamarin-ios-to-objective-c-swift-developers", "21/7/2016");
addPost("Me gusta, no me gusta, me gusta...", "me-gusta-no-me-gusta-me-gusta", "29/6/2016", ['es']);
addPost("Si no lo tengo me lo invento", "si-no-lo-tengo-me-lo-invento", "20/6/2016", ['es']);
addPost("La mala-vergüenza", "la-mala-verguenza", "12/6/2016", ['es']);
addPost("El valor de ir al mínimo con aquello que sueñas sin querer", "el-valor-de-ir-al-minimo-con-aquello-que-suenas-sin-querer", "5/6/2016", ['es']);
addPost("ADAL and how to sign in with Microsoft accounts in Xamarin.iOS", "adal-and-how-to-sign-in-with-microsoft-accounts-in-xamarin-ios", "16/5/2016");
addPost("Inject Wave Engine into Xamarin.iOS Apps", "inject-wave-engine-into-xamarin-ios-apps", "19/4/2016");
addPost("Álvaro and I fighting the crisis", "alvaro-and-i-fighting-the-crisis", "10/4/2016");
addPost("Setting up Xamarin.iOS builds in Visual Studio Team Services (formerly Visual Studio Online) through MacinCloud, and a bonus (HockeyApp)", "setting-up-xamarin-ios-builds-in-visual-studio-team-services-formerly-visual-studio-online-through-macincloud-and-a-bonus-hockeyapp", "28/3/2016");
addPost("Monkey.Tap with Wave Engine", "monkey-tap-with-wave-engine", "15/3/2016");
addPost("The Value on Microsoft-Xamarin Agreement", "the-value-on-microsoft-xamarin-agreement", "25/2/2016");
addPost("New App: ¡Buenos días! aro", "new-app-buenos-dias-aro", "11/2/2016");
addPost("Por qué voto a Podemos", "Por-qu--voto-a-Podemos-a96b2bde0ba8", "11/12/2015", ['es']);
addPost("We've Reviewed Grial UI Kit at Plain Concepts", "weve-reviewed-grial-ui-kit-at-plain-concepts", "2/12/2015");
addPost("Wave Engine: Frustum Culling", "wave-engine-frustum-culling", "10/11/2015");
addPost("Quick Dump of Things I've Learned This Week Developing on Apple Watch", "quick-dump-of-things-ive-learned-this-week-developing-on-apple-watch", "6/11/2015");
addPost("Wave Engine: Create a Custom UI Control", "wave-engine-create-a-custom-ui-control", "29/10/2015");
addPost("Wave Engine: Play Sound (Sound Effects & Themes)", "wave-engine-play-sound-effects-and-themes", "13/10/2015");
addPost("Colors in iOS: Same Value, Different Tonality", "colors-in-ios-same-value-different-tonality", "5/10/2015");
addPost("Missing Shadows on Lollipop's CardView", "missing-shadows-on-lollipops-cardview", "21/9/2015");
addPost("My First App Published: ¡Buenos días!", "my-first-app-published-buenos-dias", "8/6/2015");
addPost("¡Buenos días! aro", "buenosdias", "4/6/2015", ['es']);
addPost("Recipes for Wave Engine", "recipes-for-wave-engine", "28/5/2015");
addPost("FormsPresenters: Setting Up MvvmCross with Xamarin.Forms", "formspresenters-setting-up-mvvmcross-with-xamarin-forms", "21/5/2015");
addPost("Introducing SVQXDG", "introducing-svqxdg", "3/5/2015");
addPost("Case Study: Sage", "case-study-sage", "8/4/2015");
addPost("Translating Designs into Layouts: Units Conversion", "translating-designs-into-layouts-units-conversion", "6/4/2015");
addPost("Xamarin.Forms and Design challenges", "xamarin-forms-and-design-challenges", "1/2/2015");
addPost("Enabling Xamarin.Forms with MVVMCross on Windows Phone", "enabling-xamarin-forms-with-mvvmcross-on-windows-phone", "25/1/2015");
addPost("Error handling with Promises, and how to block the UI meanwhile", "error-handling-with-promises-and-how-to-block-the-ui-meanwhile", "19/5/2013");
