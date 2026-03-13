

### Just-PCL OpenID authentication in #XamarinForms, Firebase and limited resources

10 (ten) years after my first date with OpenID protocol, last week it was back to my life. By the former I reimplemented a bridge to authenticate users at public high schools, in PHP (with classes) 🤷🏻‍♂️ Also, I needed to learn a new path to Push Notifications with Azure. And some 1-to-1 consultancy hours.

![](https://cdn-images-1.medium.com/max/800/1*sxQyCvfHK09jpsMI7QcMEg.jpeg)  
The start line –Photo by [Goh Rhy Yan](https://unsplash.com/photos/JBxsARdTrxY?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)My task this week was to enable OpenID authentication in the Xamarin.Forms app am currently working with. My mates already had set an Identity Server up so the pending stuff was in the client side.

Initially I gave a try to Xamarin.Auth. To sum up –and be honest– it didn’t work for us. I don’t know exactly where within OpenID protocol the hand-shake breaks but, we moved to a different solution. (My guess comes from how Identity Server publishes the OpenID endpoint but I don’t really know, just suspecting.)

Yeray sent me a pair of links where anyone was implementing that communication with a different package: IdentityModel. It came as fresh milk for me because:


  1. the user was also consuming an Identity Server, and
  2. there was no need to touch platforms, just PCL!In just a sentence, it’s all about Forms’ WebView being set with an initial authorization URL and, by hooking successive ones, you carry the entire process without going down to Custom Renderers. Isn’t it beauty? 😍

For example, this’ the way to gather initial URL –AuthorizeRequest belongs to IdentityModel NuGet:

public string GenerateAuthorizeUri()  
{  
 var authorizeRequest = new AuthorizeRequest(AuthorizeUri);var requestValues = new Dictionary<string, string>();  
 requestValues.Add(“client_id”, ClientId);  
 requestValues.Add(“response_type”, ResponseType);  
 requestValues.Add(“scope”, Scope);  
 requestValues.Add(“redirect_uri”, RedirectUri);  
 requestValues.Add(“nonce”, Guid.NewGuid().ToString(“N”));currentCrossSiteRequestForgeryToken = Guid.NewGuid().ToString(“N”);requestValues.Add(“state”, currentCrossSiteRequestForgeryToken);var authorizeUri = authorizeRequest.Create(requestValues);return authorizeUri;  
}I’ve seen my-self checking many times [this OpenID guide](https://connect2id.com/learn/openid-connect) on how the protocol happens step by step.

The last chunk of the week I stumbled upon Push Notifications, with Azure’s Notification Hub. I’ve set this plenty of times during the last years; however, it’s been my first relying in Firebase, for Android. I always used GCM component from Xamarin, but it’s been ~4 years since the last update 👹

Apart from I messed up with Android’s manifest and put the receiver stuff out of the application node without noticing (thanks Ciani!), it was a joy to configure. You can first send foo notifications from Firebase console and, when everything is OK, jump to Azure. Don’t became so much crazy gathering how to connect this with Firebase, you just need the legacy key provided from this last one’s settings.

[This Xamarin guide](https://developer.xamarin.com/samples/monodroid/Firebase/FCMNotifications/) on Firebase for Android was so helpful for me as well.

After all these things, my learning from previous week come from a three hours consultancy for a local company which develop a mobile app with Xamarin. They came to see us to one of the Xamarin Dev Days from a year ago and, without previous knowledge, jumped into the world of Xamarin.Forms.

It amazed me a lot seeing what they’ve achieved with so much limited resources. We use to think our job is kind off shit. Sometimes need someone from outside to tell us it’s great having into account our start line. And how much humble people with limited resources is…