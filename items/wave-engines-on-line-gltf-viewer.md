*(This post appeared first [here](https://geeks.ms/waveengineteam/2020/02/06/wave-engines-on-line-gltf-viewer/) on February 6th, 2020)*

**TL;DR**: We are announcing our experimental glTF on-line viewer made with Wave Engine 3.0, powered by WebAssembly. Try the demo! <a href="http://gltf.waveengine.net" rel="noopener" target="_blank">http://gltf.waveengine.net</a>

During dotNet 2019, on past june, [we presented our initial support for WebAssembly](https://www.youtube.com/watch?v=dzTMsHH5O1w) (Wasm), showcasing our [WebGL.NET](https://github.com/WaveEngine/WebGL.NET) library which serves us to draw at a low-level layer. On the following months we worked on refactoring the OpenGL piece into a platform-agnostic `WaveEngine.OpenGL.Common` one, from where `WaveEngine.WebGL` was born. By the end of the year our visual tests started to pass, and we were ready for testing such in a more real scenario.

Our current WebGL backend relies on its 2.0 version, which is [supported by most of the browsers](https://caniuse.com/#feat=webgl2): the new Edge (based in Chromium), Firefox and Chrome. Although Safari allows to enable WebGL 2.0 through its Experimental Features menu, it is not 100% completed and breaks when running our app. If you are on macOS, please try [Chrome](https://www.google.com/intl/en_us/chrome/) or [Firefox](https://www.mozilla.org/en-US/firefox/mac/); on iOS, it is currently not possible because every browser relies on [WebKit](https://webkit.org/status/#?search=webgl), Safari's foundation.

![](items/images/LandingScreenshot.png)

*The on-boarding experience*

[glTF viewer](http://gltf.waveengine.net/) is a SPA (Single Page Application, a website run on a single page) which works entirely in client side, powered by [Mono's support for Wasm](https://github.com/mono/mono/tree/master/sdks/wasm), which will be [included in .NET 5](https://twitter.com/jcant0n/status/1200388180316446721). glTF is the nowadays standard for 3D models, and can be viewed on-line by simply drag &amp; dropping such inside —we've included a demo-mode for those without a handy file close. Its main features pack:

  - support for glTF 2.0 (*) in different flavours: plain glTF, glTF-Binary (.glb) and glTF-Embedded
    - [here](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0) you can find sample models
    - (*) it may happen models fail loading: we are working on making the import process stronger, and would help us if you report us any issue may find (thanks in advance!)
  - load .glb files from external links: you can show models to others by just sharing a single link ([example](https://gltf.waveengine.net/?model=https%3A%2F%2Fraw.githubusercontent.com%2FKhronosGroup%2FglTF-Sample-Models%2Fmaster%2F2.0%2FAvocado%2FglTF-Binary%2FAvocado.glb))
  - manipulate the model with mouse or fingers, thinking on mobile devices for this last

This article will visit a few caveats we found during the development, and how we surpassed them finally. We hope you enjoy reading such and, hopefully, will learn something new in between.

## There is no File System (FS) in the Web

That is not actually true. However, that is the point where we found our-selves when began to work on this project: Wave Engine relies on the concept of content, a path in the FS where the assets are placed. Such assets are, in most of the cases, preprocessed in compile-time. When an app starts the assets are ready to be consumed by the engine.

Thinking on dropping a set of glTF files within a web page, we needed to drive through the content pipeline in order to process the model through our glTF importer. Along with [Kenneth Pouncey](https://github.com/kjpou1) (thank you!), from Mono, we had already rewrote in C# the Emscripten's tool to build a Virtual FS (VFS), [Mono.WebAssembly.FilePackager](https://github.com/kjpou1/Mono.WebAssembly.FilePackager), by specifying a local path; however, how do we write there files coming from the outside? Emscripten has solved this already, by offering a [FS API](https://emscripten.org/docs/api_reference/Filesystem-API.html) in JavaScript, in a flavour similar to common I/O operations:

```javascript
function writeToFS(filename, typedArray) {
    // TODO would there be any other way without handling exceptions?
    try {
        FS.stat(DropAbsoluteDirectory);
    } catch (exception) {
        FS.mkdir(DropAbsoluteDirectory);
    }

    let destinationFullPath = DropAbsoluteDirectory + '/' + filename;
    let stream = FS.open(destinationFullPath, 'w+');
    FS.write(stream, typedArray, 0, typedArray.byteLength, 0);
    FS.close(stream);
}
```

*This functions writes the bytes at `typedArray` into Emscripten's VFS*

Solved this, the next issue we found was how to overcome the glTF files dropped were not processed in any way, and Wave Engine "does not support" reading such on the fly. The quotes are intended, as we do support such: dropping such in the Editor renders the model immediately, but there is some magic underneath.

We started exploring to consume `WaveEngine.Assets` namespace *inside* and app, instead of just from the Editor, which was its natural environment. And voilá, it worked! When a .glb file (the single binary format for glTF) is dropped:

- it is imported by "decompressing" its content (textures, materials, etc.) into the FS, and
- it is exported by generating .we* files ready to be read by Wave Engine

One of those files is the actual model, which later is used to instantiate the entire entity hierarchy added to the scene. It is not a heavy process when run on the desktop but, when used from Wasm, it takes some precious seconds. Mono has recently added support for multi-threading but, until such will not be broadly adopted by most common browsers, we still cannot rely on it, although will definitely help us reduce such time, as we currently process items one by one.

One of the most time and memory consuming tasks above process takes is texture importing, which will cover next.

## Getting image pixels

Of the large bunch of models we have tested those days, the most common textures are made of 2048 x 2048 pixels. When we read such the pixel format is expressed as RGBA, which means 4 bytes per pixel. Thus, if we want to allocate space to read the image in memory we need arrays of 2048 * 2048 * 4 bytes, which is a lot. We have found in some minor cases 8K textures, which make such even worse.

Allocating memory it-self is not a problem, Wave internally depends on `ArrayPool` for importing textures, which at least makes that smoother. Textures are handled by our `ImageSharpImporter`, [SixLabors' ImageSharp](https://github.com/SixLabors/ImageSharp), which we chose mainly because of its cross-platform feature but, under Wasm, there is a large room open for improvement. With big numbers, decoding a 2048 pixels side image can take more than 10 s, which breaks the experience with no doubt. (We have found also blockers with AOT, but eventually workarounded such by disabling the stripper on their assemblies.)

How, then, can we read images faster? For our [WebGL.NET samples gallery](https://webgldotnet.surge.sh/), our friend Juan Antonio Cano consumed Skia through some initial .NET bindings, and already solved such by taking some hundred ms. However, the current state of [such bindings](https://github.com/unoplatform/Uno.SkiaSharp), made by Uno team, were not compatible with vanilla Mono Wasm, thus we looked for an alternative thinking on maintenance in a future. Also important, we only needed the small piece to decode an image, and nothing else.

It turns out [CanvasKit](https://skia.org/user/modules/canvaskit) ("Skia in Wasm", quickly), exposed such piece, and has a JavaScript interface. We made some tests in the CanvasKit playground and looked promising. Then, our `CanvasKitImporter` was born —replacing ImageSharp one.

```c-sharp
private JSObject DecodeImage(Stream stream)
{
    if (!stream.CanSeek)
    {
        throw new ArgumentException("The stream cannot be seeked", nameof(stream));
    }

    stream.Seek(0, SeekOrigin.Begin);

    JSObject image;

    using (var memoryStream = new MemoryStream())
    {
        stream.CopyTo(memoryStream);

        using (var array = Uint8Array.From(memoryStream.GetBuffer()))
        {
            image = (JSObject)canvasKit.Invoke("MakeImageFromEncoded", array);
        }
    }

    return image;
}
```

*`CanvasKitImporter.DecodeImage()` passes the underlying byte array to CanvasKit, which decodes the image*

Loading models like [FlightHelmet](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/FlightHelmet) took from minutes (15-30) with the tab frozen to less than 20 s. And it still takes too much for us, but we must recall the asset export &amp; import process is untouched from the desktop code. We initially though the `ArrayPool.Rent(length)` call was forcing Garbage Collector (GC) to pass and incurring in some seconds but, after isolating such calls, it is not the culprit at all. We still need to investigate here more in depth.

![](items/images/FlightHelmetDemoOptimized.gif)

*FlightHelmet model loaded (notice the ilumination)*

## To the Web and beyond

Not everything is solved: loading time for very big models must be reduced, memory allocation must be decreased too, our WebGL abstraction can be faster as well. Nonetheless, this glTF viewer is our first public project made with Wave Engine 3.0 for the Web.

We have pursued such during some time but the scenario was still not ready for the jump. Nowadays, we see a bunch of possibilities for helping our customers to take visual experiences into the browser, adding Web to the list of officially supported platforms.

If you think we can help you reach the Web too, [we are here to listen](https://waveengine.net/Company#Contact). Oh, and if you found any issue, please [report it](https://github.com/WaveEngine/Feedback/issues). Thank you for reading.