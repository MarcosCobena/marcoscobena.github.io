*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

# Senseful StyleCop for Visual Studio –Mac and Windows #Xamarin

   I’ve switched from Beezy to prepare material for some days I’m spending this week on-site. More specifically how to improve performance in…   --------
  
### Senseful StyleCop for Visual Studio –Mac and Windows #Xamarin

I’ve switched from Beezy to prepare material for some days I’m spending this week on-site. More specifically how to improve performance in Xamarin.Forms on Android.

At the beginning of past week Yeray proposed me to invest time solving how to enable StyleCop for Mac and Windows with our own ruleset. We have such defined within a document uploaded to Slack but, we’re humans, sometimes simply don’t remember those.

![](https://cdn-images-1.medium.com/max/800/1*6it0DME2FbFhD0kWccl4Ag.jpeg)  
[Order](https://www.flickr.com/photos/svenwerk/3973734146/in/photolist-749qHG-sawuca-4RkSLC-mPECsq-gYZ2MJ-5vX8W3-7WoTud-qmcBZT-rjhD93-WV9dZJ-6RuyMp-ffrMNW-9GMpXp-ffcv9M-dpZ5T2-6NPoaB-6dBMB-8DagT3-4Fbjbd-dhi9Sx-7tMJ1u-eGsEG9-e2v1Uv-9rbBRk-5FxAxc-8dnePX-nZfN9W-59k9Ld-rcLrra-57hBUQ-ffpQNq-hGE67y-9MWPF1-oNz8L-rwDQmJ-SwVDdo-bwmCe6-ffcw2v-bwHzYB-9AdWdA-4PUE1h-85tQJC-8VBSCT-bwHzV6-iCPqut-ffcGgz-jKp1ME-ffcuMH-jAjca-UqTKLL)It’s turned out actually was a lot easier to have StyleCop barking on rules not followed than defining the entire ruleset. StyleCop.MSBuild NuGet package does the first for us, just add it to every project and done. However, StyleCop.Settings XML is another world. I resigned from touching it manually but with the GUI provided in the package itself (tools subfolder). Visual Studio for Mac has an extension which allowed to do such in Mac but is broken nowadays.

So turned Windows on in Parallels and went with that GUI. My only previous experience with StyleCop had almost every rule enabled (and leveraged as errors) and remember it more blocker than helpful, so disabled all of them and just enabled back those which conform our existing guidelines. What we really pursue is code looking familiar for every of us.

As final: remember to place Settings file at the Solution level because replacing default one at packages will obviously not work in builds envs. I didn’t notice this at the beginning 👼

The rest of the week I’ve been most of the time with Xamarin Profiler, working out my on-site visit. I’m writing down some notes on feelings have had using it, and found plenty of space to improve. I promised Rodrigo Moya I’d send him an e-mail with all that, serve this as my commitment. Thanks Rodrigo for giving me support this week, really appreciated.

Investing on tools’ definitely worthy from time to time. Just having such StyleCop rules in a few clicks translates into more readable code. And it just took me half a day.

Also, profiling Xamarin.Forms apps, I came to the idea again that most of time issues why things go slow, don’t work or consume so much memory come from our faults. I’ve been thinking on the idea of adding a quick profiling time to every sprint story, or sprint-wide. However, it gives more value to directly look for a specific problem. I’ve recalled this sentence my father –I think– used to tell me:


> Who doesn’t know where to go is in danger to get lost
And that’s. All.