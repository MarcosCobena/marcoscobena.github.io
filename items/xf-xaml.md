In the same way we continuously refactor our C# code we should trait XAML one equally. As we layout screens there uses to be pieces which can be reused here and there. After some years working with Xamarin.Forms —plus some more with WPF and co.— I've learnt from others, and my own experience, how to scaffold good XAML which maintains its good shape as time goes by.

Split into chapters, I'll try to cover everything expressed in XAML:

- [Xaml Styler and App structure (this one)](?i=xf-xaml)
- [Colors](?i=xf-xaml-colors)
- [Control Templates](?i=xf-xaml-control-templates)
- [Converters](?i=xf-xaml-converters)
- [Font Styles](?i=xf-xaml-font-styles)
- [Global Styles](?i=xf-xaml-global-styles)
- [Sizes](?i=xf-xaml-sizes)
- [Styles](?i=xf-xaml-styles)

### Xaml Styler

Thanks to [Daniel Martín](https://twitter.com/danimart1991) we've been using [Xaml Styler](https://github.com/Xavalon/XamlStyler) in [our last project](https://github.com/Microsoft/TailwindTraders-Mobile/tree/develop/Source/Tools/XamlStyler). Xaml Styler's not StyleCop: it doesn't throw errors on bad formatting but rewrites everything to conform the guidelines. My mate [Juan Antonio Cano](https://twitter.com/jacano35) [forked it](https://github.com/jacano/XamlStyler) and added the "verify" option: now it can be used within a build pipeline and stop such on styling errors. For us App Center's [post-clone scripts](https://github.com/Microsoft/TailwindTraders-Mobile/blob/develop/Source/TailwindTraders.Mobile/TailwindTraders.Mobile.Android/appcenter-post-clone.sh) have fit superb.

Since I work entirely on macOS there's no built-in option for Xaml Styler at Visual Studio for Mac, so I came up with this Custom Tool which I quickly run by `Alt`+`X` `Alt`+`S` —I passed from having a Terminal which runs a bash script into this, which's a good step:

![](items/images/XamlStylerCustomTool.png)

*The full Arguments: `../Tools/XamlStyler/XamlStyler.Console/xstyler.exe -c CodeAnalysis/XamlStylerSettings.json -d . -r true`*

The [Xaml Styler's JSON](https://github.com/Microsoft/TailwindTraders-Mobile/blob/develop/Source/TailwindTraders.Mobile/CodeAnalysis/XamlStylerSettings.json) has still stuff to do with Visual Studio for Windows which could ideally be ripped in favor of a more agnostic flavour; however, they hurt nothing.

My only concern currently is why Visual Studio for Mac doesn't like setting the column width to 2 spaces, and continuously tries to make me work at 4. This' something I still have to study deeper.

Appart from above, these are some other rules I try to follow:

1. 120 chars per line; it helps us work with multiple files openned as columns —and is consistent with the same rule on C# files
2. Empty lines around XML nodes: look below how for instance `Label` breezes inside the `ContentView`:

```xaml
<ContentView VerticalOptions="Start">
    
    <ContentView.Padding>
        
        <Thickness
            Top="{StaticResource DefaultMargin}"
            Right="{StaticResource DefaultMargin}"
            Bottom="{StaticResource DefaultMargin}" />
        
    </ContentView.Padding>
    
    <Label x:Name="theLabel"
        Text="{Binding Key}"
        Style="{StaticResource 20BoldFontStyle}"
        TextColor="{StaticResource WhiteColor}" />
    
</ContentView>
```

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