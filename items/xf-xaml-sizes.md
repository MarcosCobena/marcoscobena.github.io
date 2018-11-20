### Sizes.xaml

This' the perfect place for sizes: margins, paddings, spacings, font sizes, etc. It's quite common designs rely in recurrent sizes to place stuff, thus are suitable to be reused —Designers use to call this "working on the grid" :-)

Conventions:

- Key: {Negative?}{Adjective}{Identifier}{Type}, where Type stands for Margin, Padding, etc.

```xaml
<x:Double x:Key="DefaultMargin">16</x:Double>
<x:Int32 x:Key="DefaultMarginInt">16</x:Int32>
<!-- Notice how we've defined the negative version, as it's neat for disabling outer margins, f.e. -->
<x:Double x:Key="NegativeDefaultMargin">-16</x:Double>
<x:Int32 x:Key="NegativeDefaultMarginInt">-16</x:Int32>

<x:Double x:Key="0.5xDefaultMargin">8</x:Double>

<x:Double x:Key="2xDefaultMargin">32</x:Double>
<x:Double x:Key="Negative2xDefaultMargin">-32</x:Double>

<x:Double x:Key="3xDefaultMargin">48</x:Double>

<x:Double x:Key="4xDefaultMargin">64</x:Double>

<x:Double x:Key="Default2Margin">24</x:Double>

<!-- This can be handy if you drop shadows through PlatformConfigurations' VisualElement.Elevation -->
<x:Int32 x:Key="DefaultElevation">30</x:Int32>
```

I like to ask Designers during the first days which's their default grid size, and then start building above list up on such value —for instance above relies in 16, the default one.

It may not be significant if you've never used this approach before; however, it enforces the grid along every page, pushing a sense of visual coherence —at least for those like me who are highly sensitive to this stuff.