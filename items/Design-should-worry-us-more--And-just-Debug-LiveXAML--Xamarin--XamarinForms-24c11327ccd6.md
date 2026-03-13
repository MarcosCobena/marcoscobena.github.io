
  
### Design should worry us more. And just-Debug LiveXAML #Xamarin #XamarinForms

Past Tuesday I spent a talk at Madrid on the mindset change have experienced last years working with people who really care on Design, mainly aimed at Xamarin ecosystem. One of my goals was to make people conscious of the need to get our hands dirtier when developing apps, as not the entire value comes from C# files.

I’m sorry because it’s in pure Spanish (with some Andalusian), but it may be easy to follow up:

If you see the practice exercise where give out paper to everyone, it’s basically the template I made back in February and which nowadays use to implement apps. You can find it [here](/#/app-screen-creation-template).

![](https://cdn-images-1.medium.com/max/800/1*_Kh8TzABRb5lAqAz69Ftnw.jpeg)  
Photo by [Alice Achterhof](https://unsplash.com/photos/FwF_fKj5tBo?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)Taking advantage of going to Madrid I spent Tuesday and Wednesday mornings working at Google Campus. I thought there could be any issue –slow Wi-Fi, no free plug-ins, no empty space at all, etc.; however, everything went smooth and would definitely work there again for 1 or 2 days –no more because of my back, I thank any elaborated chair which cares of it.

I finally gave a try to LiveXAML: liked it a lot. Initially was just adding the NuGet package with the idea of removing it after PR-ing my branch back but find out a way to make StyleCop not bark with LiveXAML’s minified.cs: after looking for different solutions, the one I most liked was telling first to avoid such file, as if it was a design-generated one. It can be done by adding this to Settings.StyleCop XML file:

<Parsers>  
 <Parser ParserId=”StyleCop.CSharp.CsParser”>  
 <ParserSettings>  
 <CollectionProperty Name=”GeneratedFileFilters”>  
 [...]  
 <!-— Avoid LiveXAML’s minified.cs too -->  
 <Value>minified.cs$</Value>  
 </CollectionProperty>  
 </ParserSettings>  
 </Parser>  
</Parsers>Adding LiveXAML’s NuGet doesn’t touch any DLL, adding references, but adds an Import step while compiling, so I wanted as well to get rid of it when not being in Debug mode. Some CSPROJ magic and done (pay attention to the second condition):

<Import Project=”..\..\packages\LiveXAML.1.3.8\build\LiveXAML.targets” Condition=”Exists(‘..\..\packages\LiveXAML.1.3.8\build\LiveXAML.targets’) And ‘$(Configuration)’==’Debug’” />And voilá! LiveXAML’s just here in Debug, and nobody will notice it in Release 😇