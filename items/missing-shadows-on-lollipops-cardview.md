*(This post was imported, please [contact](/?i=contact) me if there's anything wrong with it. Thanks in advance)*

Have you ever tried to drop shadows from CardViews? Did those happen on pre-Lollipop but don't on newer ones? Did you look for "android cardview shadow issue lollipop" and find just a few answers and none of them worked? Do even the shadows margins are just there, you can see those?

<img class="aligncenter size-full wp-image-98" src="items/images/googlenowcardviewsshadows.png" alt="Google Now CardViews' Shadows" width="356" height="486" />
<p style="text-align:center;"><em>CardViews in Google Now. Note the shadows around white frames</em></p>
If you nodded your head once and again, stop searching for the answer, the reason why shadows weren't showing on Lollipop was this missing piece:

```c-sharp

&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;

&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot; ...&gt;

  &lt;application android:hardwareAccelerated=&quot;true&quot; /&gt;

&lt;/manifest&gt;

```

Credits go for <a href="http://stackoverflow.com/a/30949352">this answer</a>, from vcapra1, whose just has 1 single point but definitely made my day past Friday, when the burndown was about to intersect with 0.