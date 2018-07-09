Some members of the [Wave Engine](https://waveengine.net/) Team are working on updating recipes to 2.0, and extend those to achieve more and more features of the engine. Past week, I wrote [this one](https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29) at [Wave Engine Documentation wiki](https://github.com/WaveEngine/Documentation/wiki). I hope it'll move you something inside to give a chance to [Wave](https://waveengine.net/Downloads)!

* * *

&nbsp;

## Goal

Games without music and sound effects is like a whole day without bread. It is well knows by everyone Tetris' background music, while the blocks are falling; or the sound effect of Mario Bros. jumping, even taking a coin. Wave Engine makes it super easy to add those to your games, you will learn how to achieve such with just a few steps.

Note: Wave Engine also supports 3D sounds, which is not covered on this recipe.

## [](https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#hands-on)Hands-on

### [](https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#with-wave-visual-editor)With Wave Visual Editor

Start by importing both a sound file (WAV format, for example) and a music one (i.e., MP3). Enter on the Assets folder, at Asset Details panel, right-click button, Import Asset.

A double click on the MP3 file will launch OS by-default player. However, doing the same on the WAV one will open the Asset Viewer window, with a live preview of the sound, and some characteristics which can be tweaked:

*   ZipCompress: whether the intermediate file generated is also zipped (default), reducing on-disk memory. The first time a compressed asset is loaded into a game, it is uncompressed for future access.
*   ChannelFormat: Stereo (default) or Mono. Note: in order to add the sound to be used in 3D, you must change this value to mono.
*   AudioQuality: Low, Medium or High (default).
The rest of steps are done in code, so please continue with below section.

### [](https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#with-visual-studioxamarin-studio)With Visual Studio/Xamarin Studio

Once the sound and music files are added through Wave Visual Editor, open the associated C# solution (remember: File > Open C# Solution...)

#### [](https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#playing-sound)Playing Sound

There are two pieces which "play" toguether to reproduce sounds in Wave Engine:[SoundBank](http://builds.waveengine.net/WaveDoc/index.html#topic_0000000000000F9C.html) and [SoundPlayer](http://builds.waveengine.net/WaveDoc/index.html#topic_0000000000000EF5.html) service. `SoundBank` allows us to associate every sound to be played, with the option to define an [AssetsContainer](http://builds.waveengine.net/WaveDoc/index.html#topic_0000000000000DFD.html) (this will assure, for instance, to be unloaded when an [Scene](http://builds.waveengine.net/WaveDoc/index.html#topic_0000000000000DCA.html) ends, if used this last one's container). `SoundPlayer` is the service in charge of registering the previous bank, plus playing sounds contained within it.
<div class="highlight highlight-source-cs">
<pre><span class="pl-k">var</span> soundBank = <span class="pl-k">new</span> SoundBank(Assets);
<span class="pl-c">// Sound.wav was added through Wave Visual Editor</span>
<span class="pl-k">var</span> sound = <span class="pl-k">new</span> SoundInfo(WaveContent.Assets.Sound_wav);

soundBank.Add(sound);

WaveServices.SoundPlayer.RegisterSoundBank(soundBank);
WaveServices.SoundPlayer.Play(sound);</pre>
</div>

#### [](https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#playing-music)Playing Music

Music follows a similar pattern, without the need to work with a bank, just the [MusicPlayer](http://builds.waveengine.net/WaveDoc/topic_0000000000000E65.html).
<div class="highlight highlight-source-cs">
<pre><span class="pl-c">// Song.mp3 was added through Wave Visual Editor</span>
<span class="pl-k">var</span> music = <span class="pl-k">new</span> MusicInfo(WaveContent.Assets.Song_mp3);

WaveServices.MusicPlayer.Play(music);</pre>
</div>
Both sound and music player services contain multiple methods which allow common use cases like stopping, pausing, etc. Please refer to their [API](http://builds.waveengine.net/WaveDoc/) to see a full description of those.

## [](https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#wrap-up)Wrap-up

We have learned how to play sound effects and songs. Adding those files to our project is done through Wave Visual Editor, while the playback is handled by code.