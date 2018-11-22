*(This post belongs to [Xamarin.Forms XAML](?i=xf-xaml) series)*

### FontStyles.xaml

Dealing with fonts can be a tricky part: because the app shows font faces different from the respective OS' ones, or because the Design specs have multiple sizes, for example.

You can define here every font the app may need. This will help you refactor sizes, for instance, much more easier —although for sizes I strongly recommend to consider [named sizes](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.namedsize?view=xamarin-forms).

Conventions:
- Key: {FontKey}{FontSize}{FontAttributes}{TargetType}Style

It may be the case you need external fonts, so you can define such this way, using it as a font family:

```xaml
<OnPlatform 
    x:Key="LatoRegular"
    x:TypeArguments="x:String"
    Android="Lato-Regular.ttf#Lato"
    iOS="Lato-Regular" />

<Style 
    x:Key="LatoRegular12RegularLabelStyle"
    TargetType="Label">
    <Setter 
        Property="FontSize" 
        Value="12" />
</Style>
```

Notice how this one depends on its regular flavour, through inheritance —we don't want to rewrite stuff:

```xaml
<Style
    x:Key="LatoRegular12BoldLabelStyle"
    TargetType="Label"
    BasedOn="{StaticResource LatoRegular12RegularLabelStyle}">
    <Setter
        Property="FontAttributes"
        Value="Bold" />
</Style>
```