*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

One the latest bits we added to <a href="https://github.com/Microsoft/HealthClinic.biz">HealthClinic.biz suite</a> is Azure's Active Directory Authentication (ADAL from now on). Basically, you can authenticate users by their Microsoft account, and let them access the app or not. You can do some other things, but our mainly goal was that one. For instance, we added also Touch ID so your fingerprint is saved to avoid entering the credentials once and again. Superb.

However, I got the feeling I should extract all that I learned into a simple sample (try to read it without spaces, new buzzword coming :-) ) just to clarify the concepts needed to achieve such authentication, plus best practices on how to handle, for example, recovering the session when waking the app up again from scratch.

<img src="items/images/ezgif-com-gif-maker.gif" alt="" width="480" height="847" />
*MS Graph Auth app*

<a href="https://github.com/MarcosCobena/MicrosoftGraphAuthSample">MicrosoftGraphAuthSample</a> does just that. And this' the list of key points:

<a href="http://geeks.ms/xamarinteam/2016/05/16/adal-and-how-to-sign-in-with-microsoft-accounts-in-xamarin-ios/">Read the entire article...</a>