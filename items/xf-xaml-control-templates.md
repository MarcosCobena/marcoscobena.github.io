### ControlTemplates.xaml

![](items/images/pine-watt-412305-unsplash.jpg)

*Photo by [pine  watt](https://unsplash.com/photos/3_Xwxya43hE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/frame?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

As it uses to happen, I learned what Control Templates were during a big refactoring involving styles. When you're going through the screens designed, don't you realize there's a common pattern? If you do, try to group all those things shared into Control Templates, because will frame your pages letting such concentrate just in the inner content.

Conventions:

- Key: {Identifier}Template

In order to consume them, just add those at page's definition:

```xaml
<ContentPage 
    [...]
    ControlTemplate="{StaticResource FullScreenLoadingTemplate}">
```

This one's particularly handy, as can make any page loading-aware:

```xaml
<ControlTemplate x:Key="FullScreenLoadingTemplate">
    <AbsoluteLayout>

        <ContentPresenter
            AbsoluteLayout.LayoutFlags="All"
            AbsoluteLayout.LayoutBounds="0, 0, 1, 1"
            IsVisible="{TemplateBinding BindingContext.IsBusy, Converter={StaticResource NotConverter}}" />

        <ContentView
            AbsoluteLayout.LayoutFlags="All"
            AbsoluteLayout.LayoutBounds="0, 0, 1, 1"
            IsVisible="{TemplateBinding BindingContext.IsBusy}">
            
            <ActivityIndicator
                IsRunning="true"
                HorizontalOptions="Center"
                VerticalOptions="Center" />
            
        </ContentView>

    </AbsoluteLayout>
</ControlTemplate>
```

Another scenario where I found these quite useful's pages with custom nav bars —i.e. you don't want predefined OS one. Instead of stacking once and again your "CustomNavBarControl" it can be done just once, worrying on the actual changing content.