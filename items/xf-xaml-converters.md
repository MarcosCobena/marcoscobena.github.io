### Converters.xaml

I think it's no new for anyone. If a particular converter's used only on a single XAML, just define it there. However, for those in more than one, having them here will help you adding new ones.

Conventions:

- Key: `nameof(YourActualConverter).Replace("Converter", string.Empty)`

  - The reason why "Converter" is ripped from the key comes from better readability when using them in XAML: it just feels nicer things like —the word already appears a few times:

  `IsEnabled="{Binding ImagePath, Converter={StaticResource StringEmptyToBool}, ConverterParameter=inverse}"`

​    I think will keep here all those I reuse from project to project:    

`<converters:`[AnyConverter](https://github.com/MarcosCobena/XamarinCrumbs/blob/master/XamarinCrumbs/XamarinForms/Converters/AnyConverter.cs)` x:Key="Any" />`

`<converters:`[AreEqualsConverter](https://github.com/MarcosCobena/XamarinCrumbs/blob/master/XamarinCrumbs/XamarinForms/Converters/AreEqualsConverter.cs)` x:Key="AreEquals" />`

`<converters:`[IsStringNullOrWhiteSpaceConverter](https://github.com/MarcosCobena/XamarinCrumbs/blob/master/XamarinCrumbs/XamarinForms/Converters/IsStringNullOrWhiteSpaceConverter.cs)` x:Key="IsStringNullOrWhiteSpace" />`

`<converters:`[NotConverter](https://github.com/MarcosCobena/XamarinCrumbs/blob/master/XamarinCrumbs/XamarinForms/Converters/NotConverter.cs)` x:Key="Not" />`

