*(This post belongs to [Xamarin.Forms XAML](?i=xf-xaml) series)*

### Styles.xaml

Headers, bodies, captions... all these are suitable elements to style because may appear in different XAMLs and share common properties.

Are you looking for Key-less styles? [GlobalStyles.xaml](?i=xf-xaml-global-styles) is your place.

Conventions:

- Key: {Identifier}{TargetType}Style
  - TargetType may look redundant but it really helps avoiding coming back here to know such

The following's just an example of styles I've worked with in different apps lately:

```xaml
<Style x:Key="DefaultButtonStyle"
    TargetType="Button">
    <Setter Property="BackgroundColor" Value="White" />
    <Setter Property="FontFamily" Value="{StaticResource BrandonGrotesqueMedium}" />
    <Setter Property="FontSize" Value="Medium" />
    <Setter Property="Padding">
      <Thickness
        Left="{StaticResource Default2Margin}"
        Right="{StaticResource Default2Margin}" />
    </Setter>
    <Setter Property="TextColor" Value="{StaticResource AccentColor}" />
</Style>

<Style x:Key="AccentColorButtonStyle"
    BasedOn="{StaticResource DefaultButtonStyle}"
    TargetType="Button">
    <Setter Property="BackgroundColor" Value="{StaticResource AccentColor}" />
    <Setter Property="TextColor">White</Setter>
</Style>

<Style x:Key="Accent2ColorButtonStyle"
    BasedOn="{StaticResource AccentColorButtonStyle}"
    TargetType="Button">
    <Setter Property="BackgroundColor" Value="{StaticResource Accent2Color}" />
</Style>

<Style x:Key="TitleLabelStyle"
    TargetType="Label"
    BasedOn="{StaticResource 12BoldFontStyle}">
    <Setter Property="Margin">
        <Thickness
            Top="{StaticResource DefaultMargin}"
            Bottom="{StaticResource DefaultMargin}"/>
    </Setter>
    <Setter Property="TextColor" Value="{StaticResource DefaultTextColor}" />
</Style>
```

However, take into account whether would make more sense to style in native. One example: a button which you accomplish through a `Label` plus a `TapGestureRecognizer`. In that case, Android app would loose Material Design haptics, and in the same way iOS' one the corresponding. So, it's better to style in native to assure we don't forget those differences each platform offers us.

Are you looking for styling `Grid`'s columns or rows? You can't actually do this; however, can define rows and columns definitions which really accomplish the same:

```xaml
<Grid 
    ColumnDefinitions="{StaticResource MyColumnDefinition}">
    [...]
</Grid>
```

Conventions:
- Key: {Identifier}{ColumnOrRow}Definition

NOTE: adding comments on each row/column definition's helpful to later understand what's used for

```xaml
<ColumnDefinitionCollection x:Key="MyColumnDefinition">
    <!-- Rate of interest -->
    <ColumnDefinition />
    <!-- Stretch -->
    <ColumnDefinition />
    <!-- Bonus -->
    <ColumnDefinition />
    <!-- Balance -->
    <ColumnDefinition />
</ColumnDefinitionCollection>
```

