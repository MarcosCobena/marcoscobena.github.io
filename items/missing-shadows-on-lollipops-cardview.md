Have you ever tried to drop shadows from CardViews? Did those happen on pre-Lollipop but don't on newer ones? Did you look for "android cardview shadow issue lollipop" and find just a few answers and none of them worked? Do even the shadows margins are just there, you can see those?

![Google Now CardViews](googlenowcardviewsshadows.png)

_CardViews in Google Now. Note the shadows around white frames_

If you nodded your head once and again, stop searching for the answer, the reason why shadows weren't showing on Lollipop was this missing piece:

[code language="xml"]

<?xml version="1.0" encoding="utf-8"?>

<manifest xmlns:android="http://schemas.android.com/apk/res/android" ...>

  <application android:hardwareAccelerated="true" />

</manifest>

[/code]

Credits go for [this answer](http://stackoverflow.com/a/30949352), from vcapra1, whose just has 1 single point but definitely made my day past Friday, when the burndown was about to intersect with 0.