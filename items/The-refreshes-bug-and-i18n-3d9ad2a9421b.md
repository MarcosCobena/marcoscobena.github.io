*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

  # The refreshes bug and i18n

   Past week’s been all about translation (thankfully didn’t get lost 👏🏼). On Monday I fixed one bug in Beezy which’s been there around…   --------
  
### The refreshes bug and i18n

Past week’s been all about translation (thankfully didn’t get lost 👏🏼). On Monday I fixed one bug in Beezy which’s been there around since the early beginnings.

On this last one, and to explain it super quickly, views were getting updated more than needed –on Android & iOS. This’ our architecture:

API (cloud) 🔄 Akavache (`IObservable` flavour) 🔄 ViewModels 🔄 Views

Due to using Akavache in its reactive way, data use to come first from cache and second from API, so `PropertyChanged`s were being fired at least twice in such cases. If it turns out VMs were exposing data to views with `ObservableCollection` (we have our own implementation), it was common to see the final cell to support up to four or more refreshes. Issues with that? Ugly flickering effects and needless performance rise.

My-self when the app flickersHowever, on Monday could made a fix to solve just that:

void AddCommunities(IEnumerable<GroupModel> communities)  
{  
 if (communities == null || !communities.Any())  
 return;// 1st time we just add all of them  
 if (!_communities.Any())  
 {  
 Communities.AddRange(communities);  
 return;  
 }var existingCommunities = _communities.ToList();foreach (var community in communities)  
 {  
 var existingCommunity = existingCommunities.FirstOrDefault(c => c.GroupId == community.GroupId);if (existingCommunity != null)  
 {  
 // Criteria to decide whether an existing community should be overriden by a later one  
 var shouldOverrideExistingOne = !existingCommunity.Title.Equals(community.Title);if (shouldOverrideExistingOne)  
 Communities.Replace(existingCommunity, community);  
 else  
 continue;  
 }  
 else  
 Communities.Add(existingCommunity);  
 }  
}Such applies for communities, our model, but the important piece is `shouldOverrideExistingOne`: the criteria to decide whether a new version should override previous one. Now it doesn’t matter whether data comes more than once, there’s only one refresh in UI. I’m a happier person ☺️

Regarding i18n, most of the work has been to carefully take strings out of code to our RESX files. But I’ve learned a few interesting things in this process:


  * DoD should comprise i18n: doing this in each task is a less than an hour job. It took me four working days to go all over the entire codebase –and just iOS is covered. With the lack of confidence on covering the 100% strings. (Another option is at least a small subtask)
  * It anyone had to do this, my mate Sergio had a clever idea:
> [](https://twitter.com/1Marcos2Cobena/status/910109009658761216)

  * In the middle of the process Matthew announced this lovely feature:
> [](https://twitter.com/matthewrdev/status/910665130727182336)

  * Converters –MvxValueConverter actually– have been a great solution to cover i18n in enums which are directly taken to UI: not only can translate during conversion, but also can gather back original enum by converting back. Apart’s been a good refactoring process tooThe refreshes bug finally was a lot easier to fix: instead of looking to superb solutions, sometimes I should just concentrate on a single point, and give such an elegant exit. This’ my learning for the week.

  
  
  By [Marcos Cobeña Morián](https://medium.com/@MarcosCobena) on [September 25, 2017](https://medium.com/p/3d9ad2a9421b).

[Canonical link](https://medium.com/@MarcosCobena/the-refreshes-bug-and-i18n-3d9ad2a9421b)

Exported from [Medium](https://medium.com) on October 9, 2018.

