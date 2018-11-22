*(This post belongs to [Xamarin.Forms XAML](?i=xf-xaml) series)*

### Colors.xaml

Every color's placed here: it's super convenient to have all together, it helps us identify repeated ones, for instance. We try to keep them order alphabetically, although it's not a must: simply helps some of us to quickly locate them —in C# we have a drop-down menu just on top of the editor to navigate between members, but currently, VS for Mac at least, doesn't have any similar.

Conventions:

- Key: {Identifier}Color for `Color` or {Identifier}ColorString for `string`

- Value: lowercase hex format (you can opt for uppercase, but choosing one will keep consistency)
  - RGB most of the times, although ARGB works pretty well in scenarios where backgrounds are semitransparent, or gradients too

```xaml
<?xml version="1.0" encoding="UTF-8"?>
<ResourceDictionary 
    xmlns="http://xamarin.com/schemas/2014/forms" 
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml" 
    x:Class="XamarinCrumbs.XamarinForms.Colors">
    
    <Color x:Key="AccentColor">#50e3c2</Color>
    <x:String x:Key="AccentColorString">#50e3c2</x:String>
    
    <Color x:Key="DefaultTextColor">#abb3c8</Color>

    <Color x:Key="SecondaryTextColor">#868ea4</Color>

    <Color x:Key="WhiteColor">#ffffff</Color>

</ResourceDictionary>
```

You've probably asked your-self why WhiteColor's defined when there's already White in `Xamarin.Forms.Color`: sometimes it's intelligent to "duplicate" them for supporting future tonality changes, f.e.

Moreover, you've seen in above XAML there's the same color twice: it makes sense when you need to consume such for controls like [FFImageLoading](https://github.com/luberda-molinet/FFImageLoading)'s, which don't accept a `Color`, but a `string` in hex format.

Although I've personally prefered naming colors by their actual value (LightGreenColor, for example), I've ended up choosing those which give a hint on where they're applied: DefaultTextColor, SeparatorColor, things like these.

*PS.*: On 2017 I wrote this small thing, [Abanico](?i=abanico-a-few-hours-with-xamarin-forms-and-skiasharp), to understand how color wheels work. It's Xamarin.Forms too, with SkiaSharp:

![](items/images/jun-21-2017-22-47-38.gif)