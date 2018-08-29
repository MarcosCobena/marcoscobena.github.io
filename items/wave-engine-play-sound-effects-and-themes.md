*(This post was imported, please [contact](/?i=contact) me if there's anything wrong with it. Thanks in advance)*

Some members of the <a href="https://waveengine.net/">Wave Engine</a> Team are working on updating recipes to 2.0, and extend those to achieve more and more features of the engine. Past week, I wrote <a href="https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29">this one</a> at <a href="https://github.com/WaveEngine/Documentation/wiki">Wave Engine Documentation wiki</a>. I hope it'll move you something inside to give a chance to <a href="https://waveengine.net/Downloads">Wave</a>!

<hr />

&nbsp;
<h2>Goal</h2>
Games without music and sound effects is like a whole day without bread. It is well knows by everyone Tetris’ background music, while the blocks are falling; or the sound effect of Mario Bros. jumping, even taking a coin. Wave Engine makes it super easy to add those to your games, you will learn how to achieve such with just a few steps.

Note: Wave Engine also supports 3D sounds, which is not covered on this recipe.
<h2><a id="user-content-hands-on" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#hands-on"></a>Hands-on</h2>
<h3><a id="user-content-with-wave-visual-editor" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#with-wave-visual-editor"></a>With Wave Visual Editor</h3>
Start by importing both a sound file (WAV format, for example) and a music one (i.e., MP3). Enter on the Assets folder, at Asset Details panel, right-click button, Import Asset.

A double click on the MP3 file will launch OS by-default player. However, doing the same on the WAV one will open the Asset Viewer window, with a live preview of the sound, and some characteristics which can be tweaked:
<ul>
	<li>ZipCompress: whether the intermediate file generated is also zipped (default), reducing on-disk memory. The first time a compressed asset is loaded into a game, it is uncompressed for future access.</li>
	<li>ChannelFormat: Stereo (default) or Mono. Note: in order to add the sound to be used in 3D, you must change this value to mono.</li>
	<li>AudioQuality: Low, Medium or High (default).</li>
</ul>
The rest of steps are done in code, so please continue with below section.
<h3><a id="user-content-with-visual-studioxamarin-studio" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#with-visual-studioxamarin-studio"></a>With Visual Studio/Xamarin Studio</h3>
Once the sound and music files are added through Wave Visual Editor, open the associated C# solution (remember: File &gt; Open C# Solution…)
<h4><a id="user-content-playing-sound" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#playing-sound"></a>Playing Sound</h4>
There are two pieces which "play" toguether to reproduce sounds in Wave Engine:<a href="http://builds.waveengine.net/WaveDoc/index.html#topic_0000000000000F9C.html">SoundBank</a> and <a href="http://builds.waveengine.net/WaveDoc/index.html#topic_0000000000000EF5.html">SoundPlayer</a> service. <code>SoundBank</code> allows us to associate every sound to be played, with the option to define an <a href="http://builds.waveengine.net/WaveDoc/index.html#topic_0000000000000DFD.html">AssetsContainer</a> (this will assure, for instance, to be unloaded when an <a href="http://builds.waveengine.net/WaveDoc/index.html#topic_0000000000000DCA.html">Scene</a> ends, if used this last one's container). <code>SoundPlayer</code> is the service in charge of registering the previous bank, plus playing sounds contained within it.
<div class="highlight highlight-source-cs">
<pre><span class="pl-k">var</span> soundBank = <span class="pl-k">new</span> SoundBank(Assets);
<span class="pl-c">// Sound.wav was added through Wave Visual Editor</span>
<span class="pl-k">var</span> sound = <span class="pl-k">new</span> SoundInfo(WaveContent.Assets.Sound_wav);

soundBank.Add(sound);

WaveServices.SoundPlayer.RegisterSoundBank(soundBank);
WaveServices.SoundPlayer.Play(sound);</pre>
</div>
<h4><a id="user-content-playing-music" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#playing-music"></a>Playing Music</h4>
Music follows a similar pattern, without the need to work with a bank, just the <a href="http://builds.waveengine.net/WaveDoc/topic_0000000000000E65.html">MusicPlayer</a>.
<div class="highlight highlight-source-cs">
<pre><span class="pl-c">// Song.mp3 was added through Wave Visual Editor</span>
<span class="pl-k">var</span> music = <span class="pl-k">new</span> MusicInfo(WaveContent.Assets.Song_mp3);

WaveServices.MusicPlayer.Play(music);</pre>
</div>
Both sound and music player services contain multiple methods which allow common use cases like stopping, pausing, etc. Please refer to their <a href="http://builds.waveengine.net/WaveDoc/">API</a> to see a full description of those.
<h2><a id="user-content-wrap-up" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Play-Sound-%28Sound-Effects-%26-Themes%29#wrap-up"></a>Wrap-up</h2>
We have learned how to play sound effects and songs. Adding those files to our project is done through Wave Visual Editor, while the playback is handled by code.