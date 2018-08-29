*(This post was imported, please [contact](/?i=contact) me if there's anything wrong with it. Thanks in advance)*

<div class="gh-header">
<div class="gh-header-show">
<p class="gh-header-title instapaper_title">We're at the team finishing the first bunch of <a href="https://github.com/WaveEngine/Documentation/wiki/">recipes</a> synced with 2.0 version of the engine. Let me share with you <a href="https://github.com/WaveEngine/Documentation/wiki/Create-a-Custom-UI-Control">this one</a> where we explain quickly how to create your own UI controls. Enjoy it!</p>


<hr />

<h2>Goal</h2>
</div>
</div>
<div id="wiki-content">
<div class="wrap has-rightbar">
<div id="wiki-body" class="gollum-markdown-content instapaper_body">
<div class="markdown-body">

It is a common pattern to begin a game though a menu: new game, load game, options, etc. Such elements are built by composition of UI controls, like buttons and labels. Wave Engine ships with a list of <a href="http://doc.waveengine.net/index.html#topic_0000000000001C02.html">predefined controls</a>, along with layer types, which can solve multiple situations in your games.

However, what happens if you need an specific UI element which does not exist? This recipe gives a quick hint to cover this question, providing a simple pattern to build a typical alert box, with accept and cancel buttons.
<h2><a id="user-content-hands-on" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Create-a-Custom-UI-Control#hands-on"></a>Hands-on</h2>
<h3><a id="user-content-with-wave-visual-editor" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Create-a-Custom-UI-Control#with-wave-visual-editor"></a>With Wave Visual Editor</h3>
This recipe cannot be done just by using the Editor, although it is needed to create the initial project, and choose the 2D camera (UIs work in 2D mode), by cliking on the 3D toggle button from the icons bar. You will notice it switches to 2D, and the Viewport follows accordingly by switching to the default 2D camera.

In order to continue, please keep reading below section.
<h3><a id="user-content-with-visual-studioxamarin-studio" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Create-a-Custom-UI-Control#with-visual-studioxamarin-studio"></a>With Visual Studio/Xamarin Studio</h3>
Once the project is correctly set-up following above instructions, open the C# solution through the File menu.

Our alert control will be added like any other <code>Entity</code>, and will have a <code>Show()</code> method with the following signature:
<div class="highlight highlight-source-cs">
<pre><span class="pl-k">void</span> Show(<span class="pl-k">string</span> message, Action okAction, Action cancelAction)</pre>
</div>
, where 'message' will be the alert's title, and the two following <code>Action</code> the specific logic to execute upon clicking on accept and cancel buttons, respectively.

The <code>Alert</code> control will inherit <a href="http://doc.waveengine.net/index.html#topic_0000000000001C4B.html">Grid</a>, as it fits perfectly to align the internal controls: a<a href="http://doc.waveengine.net/topic_0000000000001D57.html">TextBlock</a>, and two <a href="http://doc.waveengine.net/topic_0000000000001C03.html">Button</a>. The firts step it to configure such <code>Grid</code> to handle such:
<div class="highlight highlight-source-cs">
<pre><span class="pl-k">public</span> <span class="pl-k">class</span> <span class="pl-en">Alert</span> : <span class="pl-k">Grid</span>
{
    <span class="pl-k">public</span> <span class="pl-en">Alert</span>()
        : <span class="pl-c1">base</span>()
    {
        <span class="pl-c1">this</span>.SetUpGrid();

        […]

        <span class="pl-c1">this</span>.IsVisible = <span class="pl-c1">false</span>;
    }

    […]</pre>
</div>
By default, the control will be hidden upon creating it, and <code>Show()</code> will "wake" it up on demand when needed.
<div class="highlight highlight-source-cs">
<pre><span class="pl-k">private</span> <span class="pl-k">void</span> SetUpGrid()
{
    <span class="pl-c1">this</span>.Width = <span class="pl-c1">320</span>;
    <span class="pl-c1">this</span>.Height = <span class="pl-c1">240</span>;

    <span class="pl-c1">this</span>.IsBorder = <span class="pl-c1">true</span>;

    <span class="pl-c1">this</span>.HorizontalAlignment = HorizontalAlignment.Center;
    <span class="pl-c1">this</span>.VerticalAlignment = VerticalAlignment.Center;

    <span class="pl-c1">this</span>.RowDefinitions.Add(<span class="pl-k">new</span> RowDefinition() { Height = <span class="pl-k">new</span> GridLength(<span class="pl-c1">2</span>, GridUnitType.Proportional) });
    <span class="pl-c1">this</span>.RowDefinitions.Add(<span class="pl-k">new</span> RowDefinition() { Height = <span class="pl-k">new</span> GridLength(<span class="pl-c1">1</span>, GridUnitType.Proportional) });
    <span class="pl-c1">this</span>.ColumnDefinitions.Add(<span class="pl-k">new</span> ColumnDefinition() { Width = <span class="pl-k">new</span> GridLength(<span class="pl-c1">1</span>, GridUnitType.Proportional) });
    <span class="pl-c1">this</span>.ColumnDefinitions.Add(<span class="pl-k">new</span> ColumnDefinition() { Width = <span class="pl-k">new</span> GridLength(<span class="pl-c1">1</span>, GridUnitType.Proportional) });
}</pre>
</div>
As it can be appreciated, the latest lines configure the <code>Grid</code> rows and columns, which will later allow us to place the rest of controls:
<div class="highlight highlight-source-cs">
<pre><span class="pl-k">private</span> <span class="pl-k">void</span> CreateHeader()
{
    <span class="pl-c1">this</span>.headerTextBlock = <span class="pl-k">new</span> TextBlock
    {
        Width = <span class="pl-c1">this</span>.Width,
        Height = <span class="pl-c1">this</span>.Height / <span class="pl-c1">3</span>,
        Text = <span class="pl-s"><span class="pl-pds">"</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span class="pl-pds">"</span></span>,
        TextWrapping = <span class="pl-c1">true</span>,
        TextAlignment = TextAlignment.Center,
        VerticalAlignment = VerticalAlignment.Center
    };

    <span class="pl-c1">this</span>.headerTextBlock.SetValue(GridControl.RowProperty, <span class="pl-c1">0</span>);
    <span class="pl-c1">this</span>.headerTextBlock.SetValue(GridControl.ColumnProperty, <span class="pl-c1">0</span>);
    <span class="pl-c1">this</span>.headerTextBlock.SetValue(GridControl.ColumnSpanProperty, <span class="pl-c1">2</span>);

    <span class="pl-c1">this</span>.Add(<span class="pl-c1">this</span>.headerTextBlock);
}</pre>
</div>
<code>CreateHeader()</code> must be called within <code>Alert</code> ctor. In the same way, the other two buttons:
<div class="highlight highlight-source-cs">
<pre><span class="pl-k">private</span> <span class="pl-k">void</span> CreateCancelButton()
{
    <span class="pl-k">var</span> cancelButton = <span class="pl-k">new</span> Button()
    {
        Text = <span class="pl-s"><span class="pl-pds">"</span>Cancel<span class="pl-pds">"</span></span>,
        HorizontalAlignment = HorizontalAlignment.Center,
        VerticalAlignment = VerticalAlignment.Center
    };

    cancelButton.Click += (sender, args) =&gt;
    {
        <span class="pl-c1">this</span>.IsVisible = <span class="pl-c1">false</span>;

        <span class="pl-k">if</span> (<span class="pl-c1">this</span>.cancelAction != <span class="pl-c1">null</span>)
        {
            <span class="pl-c1">this</span>.cancelAction();
        }
    };

    cancelButton.SetValue(GridControl.RowProperty, <span class="pl-c1">1</span>);
    cancelButton.SetValue(GridControl.ColumnProperty, <span class="pl-c1">0</span>);

    <span class="pl-c1">this</span>.Add(cancelButton);
}

<span class="pl-k">private</span> <span class="pl-k">void</span> CreateOKButton()
{
    <span class="pl-k">var</span> okButton = <span class="pl-k">new</span> Button
    {
        Text = <span class="pl-s"><span class="pl-pds">"</span>OK<span class="pl-pds">"</span></span>,
        HorizontalAlignment = HorizontalAlignment.Center,
        VerticalAlignment = VerticalAlignment.Center
    };

    okButton.Click += (sender, args) =&gt;
    {
        <span class="pl-c1">this</span>.IsVisible = <span class="pl-c1">false</span>;

        <span class="pl-k">if</span> (<span class="pl-c1">this</span>.okAction != <span class="pl-c1">null</span>)
        {
            <span class="pl-c1">this</span>.okAction();
        }
    };

    okButton.SetValue(GridControl.RowProperty, <span class="pl-c1">1</span>);
    okButton.SetValue(GridControl.ColumnProperty, <span class="pl-c1">1</span>);

    <span class="pl-c1">this</span>.Add(okButton);
}</pre>
</div>
The code is almost the same on both cases, but are placed on different spaces within the main <code>Grid</code>.

Finally, <code>Show()</code> will make the control visible again, triggering the specific <code>Action</code> when the user interacts with it:
<div class="highlight highlight-source-cs">
<pre><span class="pl-k">public</span> <span class="pl-k">void</span> Show(<span class="pl-k">string</span> message, Action okAction, Action cancelAction)
{
    <span class="pl-c1">this</span>.headerTextBlock.Text = message;

    <span class="pl-c1">this</span>.okAction = okAction;
    <span class="pl-c1">this</span>.cancelAction = cancelAction;

    <span class="pl-c1">this</span>.IsVisible = <span class="pl-c1">true</span>;
}</pre>
</div>
Within a sample use scenario, this would be the final result:
<div class="highlight highlight-source-cs">
<pre><span class="pl-k">protected</span> <span class="pl-k">override</span> <span class="pl-k">void</span> CreateScene()
{
    <span class="pl-c1">this</span>.Load(WaveContent.Scenes.MyScene);

    <span class="pl-c1">this</span>.alert = <span class="pl-k">new</span> Alert();
    <span class="pl-c1">this</span>.EntityManager.Add(<span class="pl-c1">this</span>.alert);
}

<span class="pl-k">protected</span> <span class="pl-k">override</span> <span class="pl-k">void</span> Start()
{
    <span class="pl-c1">base</span>.Start();

    <span class="pl-c1">this</span>.alert.Show(<span class="pl-s"><span class="pl-pds">"</span>Would you like to download the game assets?<span class="pl-pds">"</span></span>,
        () =&gt; Debug.WriteLine(<span class="pl-s"><span class="pl-pds">"</span>Yes<span class="pl-pds">"</span></span>),
        () =&gt; Debug.WriteLine(<span class="pl-s"><span class="pl-pds">"</span>No<span class="pl-pds">"</span></span>));
}</pre>
</div>
<img src="https://raw.githubusercontent.com/WaveEngine/Documentation/9da23b148f021bab5c5ca1a451daf41c80efac28/WikiResources/Images/UI/CreateACustomUIControl/AlertScreenshot.PNG" alt="" />
<h2><a id="user-content-wrap-up" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Create-a-Custom-UI-Control#wrap-up"></a>Wrap-up</h2>
You have learned how to extend the existing UI, through composition, to build a new alert control.

</div>
</div>
</div>
</div>