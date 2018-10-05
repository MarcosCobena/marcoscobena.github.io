In the same way we continuously refactor our C# code we should trait XAML one equally. As we layout screens there uses to be pieces which can be reused here and there. After some years working with Xamarin.Forms —plus some more with WPF and co.— I've learnt from others, and my own experience, how to scaffold good XAML which maintains its good shape as time goes by.

Split into chapters, I'll try to cover everything expressed in XAML:

- ["StyleCop" for XAML and App structure (this one)](?i=xf-xaml)
- Colors
- Control Templates
- Converters
- Font Styles
- Global Styles
- Sizes
- Styles

### "StyleCop" for XAML

Nowdays, I don't know anything which checks styling in XAML files —haven't spent much time looking for to be honest. However, each one of us has a different way of writting XAML. Also, Visual Studio applies different formatting in Windows and macOS. For all this, it's not difficult to end up having a mix of styles when the project grows.

XAML's a much easier language to define than C#, so are the rules I try to follow:

1. One attribute per line —we call this Merge-friendly XAML. The main reason's just that: merges are easier to handle when changes appear per line, instead of having to look which attribute/s were changed among a bunch;
   1. As an exception to this rule we like to write `Name` and `Key` ones in the same line where the control's defined
2. 120 chars per line; it helps us work with multiple files openned as columns.
3. Empty lines around controls' XML nodes: look below how `Label` breezes inside the `ContentView`

This' an example following above rules:

```xaml
<ContentView
    VerticalOptions="Start">
    <ContentView.Padding>
        <Thickness
            Top="{StaticResource DefaultMargin}"
            Right="{StaticResource DefaultMargin}"
            Bottom="{StaticResource DefaultMargin}"/>
    </ContentView.Padding>
    
    <Label x:Name="theLabel"
        Text="{Binding Key}"
        Style="{StaticResource 20BoldFontStyle}"
        TextColor="{StaticResource WhiteColor}"/>
    
</ContentView>
```

**Update (4/10/2018):** Daniel Martín's recommended through [this tweet](https://twitter.com/danimart1991/status/1047735254046453761) to have a look to [XamlStyler](https://github.com/Xavalon/XamlStyler): although it's focused on VS on Windows, they provide a CLI through NuGet which could fit under macOS.

### App.xaml

At the opposite of what we'd think, I've found better with time to leave this file "empty". The quotes mean it's actually not empty, but blends other sources which do have XAML of value inside.

This, for example, is a typical App.xaml:

```xaml
<?xml version="1.0" encoding="utf-8"?>
<Application 
    xmlns="http://xamarin.com/schemas/2014/forms"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    xmlns:local="clr-namespace:XamarinCrumbs.XamarinForms"
    x:Class="XamarinCrumbs.XamarinForms.App">
    <Application.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <local:Colors />
                <local:ControlTemplates />
                <local:Converters />
                <local:FontStyles />
                <local:GlobalStyles />
                <local:Sizes />
                <local:Styles />
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Application.Resources>
</Application>
```

Whoever may open this file for the first time will quickly know how stuff's placed within the project.