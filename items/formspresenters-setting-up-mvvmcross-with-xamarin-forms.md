*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

During the last months, we have made some improvements to the <a href="https://github.com/Cheesebaron/Cheesebaron.MvxPlugins/tree/master/FormsPresenters/WindowsPhone">FormsPresenters plug-in</a> taken from real-world projects we are working on with our customers, at Plain Concepts. Since we did not have some NuGet packages to make an easy install of the scaffolding needed, we dedicated some effort to add a small documentation to the GitHub repository it-self, so everyone can easily set-up MvvmCross on their Xamarin.Forms projects.

The first step is to clone the entire repo. locally, and build the MvvmCross <a href="https://github.com/Cheesebaron/Cheesebaron.MvxPlugins/tree/master/submodules">submodule</a>. Apart from here, the rest of the steps are done within the <a href="https://github.com/Cheesebaron/Cheesebaron.MvxPlugins/tree/master/FormsPresenters">FormsPresenters directory</a>. You will find four different projects inside: Core one, which handles the common logic among every supported platform (Android, iOS and Windows Phone); and one project per supported platform, which basically contains the final <a href="http://gregshackles.com/presenters-in-mvvmcross-a-primer/">Presenters</a>.

<a href="http://blogs.plainconcepts.com/xamarinteam/2015/05/21/formspresenters-setting-up-mvvmcross-with-xamarin-forms/">Read the entire article...</a>