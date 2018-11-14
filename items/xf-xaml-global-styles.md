### GlobalStyles.xaml

Wouldn't be great to default `StackLayout`'s `Spacing` to 0 everywhere, or having every `Label` a default font size and color? Less code to write, easier refactorings. All these fit here perfectly.

You may ask: why default controls' spacing, padding, margin, etc. to 0? Because, personally, when working with Design specs it helps a lot to just take into account those sizes I explicitly type.

```xaml
<!-- This exposes DefaultButtonStyle as the predefined one for every Button -->
<Style
  BasedOn="{StaticResource DefaultButtonStyle}"
  TargetType="Button" />

<Style TargetType="Entry">
  <Setter Property="TextColor" Value="{StaticResource AccentColor}" />
</Style>

<Style TargetType="Frame">
  <Setter Property="HasShadow" Value="false" />
  <Setter Property="Padding" Value="0" />
</Style>

<Style TargetType="Grid">
  <Setter Property="ColumnSpacing" Value="0" />
  <Setter Property="RowSpacing" Value="0" />
</Style>

<!-- This sets font-related settings to every Label -->
<Style
  BasedOn="{StaticResource BrandonGrotesqueMediumMediumFontStyle}"
  TargetType="Label">
  <Setter Property="TextColor" Value="{StaticResource AccentColor}" />
</Style>

<Style TargetType="StackLayout">
  <Setter Property="Spacing" Value="0" />
</Style>
```

Are you looking for Key-full styles? [Styles.xaml](?i=xf-xaml-styles) is your place.