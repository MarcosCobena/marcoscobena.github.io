*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

# XAML things, merging RESX and 10.0.2.2 #XamarinForms

   Monday, 11th Finally I made the PR to ApiIntersect.   --------
  
### XAML things, merging RESX and 10.0.2.2 #XamarinForms

**Monday, 11th**  
Finally I made [the PR to ApiIntersect](https://github.com/xamarin/ApiInteresect/pull/3).

Redesigning a page I’ve found quite useful [Xamarin.Forms’ Styles](https://developer.xamarin.com/guides/xamarin-forms/user-interface/styles/) to reduce the verbosity in XAML. Sometimes I just used to see a control as the main refactoring option; however, Styles are a good way too.

**Tuesday, 12th**  
Today’s been the [DataTrigger](https://developer.xamarin.com/guides/xamarin-forms/application-fundamentals/triggers/) day 😊 Styling a page I needed something like iOS’ [UISegmentedControl](https://developer.apple.com/documentation/uikit/uisegmentedcontrol), without the borders. Trigger came quite handy when tinting items depending on its selection state:

<Label Text="Option 1">  
 <Label.Triggers>  
 <DataTrigger TargetType=”Label” Binding=”{Binding Option1Selected}” Value=”false” >  
 <Setter Property=”TextColor” Value=”Red” />  
 </DataTrigger>  
 <DataTrigger TargetType=”Label” Binding=”{Binding Option1Selected}” Value=”true” >  
 <Setter Property=”TextColor” Value=”Green” />  
 </DataTrigger>  
 </Label.Triggers>  
</Label>However, I didn’t find a quick way to share those triggers among different controls: already know Styles would do the job, but have applied some others before to the same controls and can’t simply add the triggers to them. Am looking for another way. Anyone would know any idea?

**Wednesday, 13th**  
LiveXAML is one the most powerful tools when styling UI with Forms. Period. Thanks to Yeray who bought licenses for everyone at DevsDNA 😙

![](https://cdn-images-1.medium.com/max/800/1*ua4EiwJkYsq7uY6kVn6rZw.jpeg)  
Photo by [Todd Diemer](https://unsplash.com/photos/0wdPEt-ufqs?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)We were reported with an issue with i18n and, in the end, had to do with having 3 different RESX files not consistent between them. Google-ing for a merge tool for such I stumbled upon [this answer](https://stackoverflow.com/a/32103645) which, taken into a new Console Project, solved the issue in a fraction of time.

By the end of the day pushed some small changes to the [GradientBoxView’s README](https://github.com/DevsDNA/GradientBoxView), to clear things a little bit, and make it look more professional. I didn’t like nor the previous Example nor its screenshots, so made a new one for all. Looking for device frames I came up into [this site](https://mockuphone.com) which just takes a screenshot (emulator is OK) and returns everything wrapped up.

**Thursday, 14th**  
I started the day by filling a bug on a little thing which once solved would make my days smoother:


> [](https://twitter.com/1Marcos2Cobena/status/941226957861244928)
Continuing with the page design I needed a new ListView so in order to populate it with fake data while LiveXAMLing had to look again how used to do such. [For the records](https://stackoverflow.com/q/28738090).

When the ViewModel time came in created also a new snippet in VS so writting new props. ready for ReactiveUI would be quicker:

![](https://cdn-images-1.medium.com/max/800/1*P0WkSZ3_RGXIyIuefopVuA.png)  
Simply write $name$ in lowercase and finally make upper first letter in just the prop. declaration**Friday, 15th**  
Working on a new task with Twilio had to connect an Android app running in an emulator with an ASP.NET MVC server hosted locally, at 127.0.0.1:8080. Did you know pointing to 10.0.2.2 inside the emu forwards communication to the first? I didn’t, super handy.

Our app needs to handle outgoing VoIP calls though Twilio, and the following days will be implementing the in-call screen, plus the attached service to handle the call it-self. Looks funny!