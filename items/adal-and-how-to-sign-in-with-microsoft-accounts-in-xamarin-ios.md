One the latest bits we added to [HealthClinic.biz suite](https://github.com/Microsoft/HealthClinic.biz) is Azure's Active Directory Authentication (ADAL from now on). Basically, you can authenticate users by their Microsoft account, and let them access the app or not. You can do some other things, but our mainly goal was that one. For instance, we added also Touch ID so your fingerprint is saved to avoid entering the credentials once and again. Superb.

However, I got the feeling I should extract all that I learned into a simple sample (try to read it without spaces, new buzzword coming :-) ) just to clarify the concepts needed to achieve such authentication, plus best practices on how to handle, for example, recovering the session when waking the app up again from scratch.

[caption id="" align="aligncenter" width="480"]![](ezgif-com-gif-maker.gif) MS Graph Auth app[/caption]

[MicrosoftGraphAuthSample](https://github.com/MarcosCobena/MicrosoftGraphAuthSample) does just that. And this' the list of key points:

[Read the entire article...](http://geeks.ms/xamarinteam/2016/05/16/adal-and-how-to-sign-in-with-microsoft-accounts-in-xamarin-ios/)