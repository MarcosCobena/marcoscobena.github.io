**TL;DR:** We've analyzed why Wave Engine Web performance decreases under high WebGL consuming pressure, arriving to the final conclusion the way we currently interop with JavaScript is too slow for us. Finally, we introduce how we're overcoming this situation.

## "Wave Engines goes slow in Web"

That's the idea we all have had since started to make Wave work in Web but, didn't have analyzed it until recently. Since I have notion of Java or .NET, this' always scared everyone programming against a Virtual Machine (VM). However, the daily reality has revealed once and again, at least for me, the loss of performance isn't such a big concern; and when it's, I think more of an issue with my code than being the VM guilty for that. I just can code things better, I think.

Sadly, that hasn't happened with WebAssembly (Wasm) —well, .NET running on Wasm. If you open [this URL](http://gltf.waveengine.net/?model=https%3A%2F%2Fraw.githubusercontent.com%2FKhronosGroup%2FglTF-Sample-Models%2Fmaster%2F2.0%2FBuggy%2FglTF-Binary%2FBuggy.glb) your PC will quickly ask for a new CPU and 2 or 4 extra GB of RAM, if not for a deep dive into cold water (depending on your location).

David Ávila, one of my workmates, had the intuition the issue was the interop cost with JavaScript, but I endlessly repeated him I had no numbers to argue, against or not, such. With the time going by, I feel more uncomfortable by stating things without having numbers to back such up: I've seen my-self *so* many times thinking the issue was A, when actually was B.

## Two problems

One week or two ago our manager Javi Cantón let us spend some time researching how to make things go faster and, I convinced him to first understand where the culprit actually is. Together, we recorded some sessions with SpectorJS, from both [Wave Engine's glTF viewer](http://gltf.waveengine.net/) and [BabylonJS' Sandbox](https://sandbox.babylonjs.com/), using the same [model](https://github.com/KhronosGroup/glTF-Sample-Models/blob/master/2.0/Buggy/glTF-Binary/Buggy.glb).

[SpectorJS](https://spector.babylonjs.com/) is one of the few available tools to hook WebGL calls nowadays —I've tried the RenderDoc approach in Chrome with no luck; among others— and let you save the sessions in JSON format, which self-invites someone like me to write something to pull statistics from :-) (I've remembered working with another mate, Pablo Íñigo, who always tends to write tools to solve issues; I think have learnt this from him, am another "tool-oriented guy".)

To make the comparisson fair enough —and sorry in advance because in terms on benchmarking I've probably bypassed a few recommendations— we recorded exactly 1 frame, expecting every WebGL command between 2 drawing calls.

Maybe I spent 1 or 2 hours writting SpectorJSCaptureAnalyzer, as I named it; but, a simple Console project which basically accumulates every command made, started to return really usefull insights.

### Amount of commands

This' the output for BabylonJS:

```
bindVertexArray (181): 1,039794921875 ms
bindBufferBase (149): 0,94140625 ms
uniformMatrix4fv (118): 0,85498046875 ms
drawElements (118): 0,829833984375 ms
bufferSubData (31): 0,454833984375 ms
useProgram (53): 0,304443359375 ms
bindBuffer (62): 0,27880859375 ms
drawElementsInstanced (31): 0,189697265625 ms
clear (1): 0,02001953125 ms
viewport (1): 0,005126953125 ms
clearStencil (1): 0,0048828125 ms
enable (1): 0,0048828125 ms
clearColor (1): 0 ms
clearDepth (1): 0 ms
disable (1): 0 ms

Total (750): 4,9287109375 ms (0,0049287109375 s)

One frame at 60 FPS lengths 16,666666 ms (0,016666666 s), so
current total would generate 202,8928076084803 FPS
```
*BabylonJS-Buggy-OneFrame.json (~59 FPS)*

; and this the one for Wave:

```
texParameteri (7552): 22,98095703125 ms
getExtension (944): 8,7890625 ms
bindBufferBase (1890): 7,427734375 ms
bindTexture (1888): 7,3662109375 ms
bindBuffer (1396): 5,51416015625 ms
texParameterf (1888): 5,268798828125 ms
uniform1i (944): 4,046142578125 ms
vertexAttribPointer (944): 3,690673828125 ms
enableVertexAttribArray (944): 3,38037109375 ms
activeTexture (944): 2,61767578125 ms
bindBufferRange (470): 2,58203125 ms
drawElements (472): 2,561767578125 ms
bufferSubData (7): 0,215087890625 ms
clear (4): 0,03515625 ms
clearDepth (2): 0,01513671875 ms
depthMask (2): 0,014892578125 ms
clearColor (2): 0,010009765625 ms
clearStencil (2): 0,010009765625 ms
scissor (2): 0,005126953125 ms

Total (20297): 76,531005859375 ms (0,076531005859375 s)

One frame at 60 FPS lengths 16,666666 ms (0,016666666 s), so
current total would generate 13,066599462151204 FPS
```
*WaveEngine-Buggy-OneFrame2.json (~1 FPS)*

The first punch in my face was the total amount of commands made: 750 in BabylonJS vs. 20297 in Wave. It's 27x times more commands we make against Babylon! Crazy. Just before breaking my Computer Science degree into small pieces, thanks God I noticed one subtle difference: why do we have 2 `clearColor()` calls instead of just 1, as Babylon does? One frame should suffice with just 1 clear command...

Then some words from again David came into my mind: "guys take care with having more than one camera as they all get rendered". That basically means Wave doesn't differentiate whether you actually wanted to draw 2 cameras at the same time: you may want to have a scene in background and an overlay on top, for instance. It's a very common practice with 2D UIs in games: you're killing enemies in your favourite FPS and see in 2D on top your actual life, weapon, etc. Those are 2 cameras being rendered at the same time.

Well, all this' so beautiful but, our glTF viewer has no need for 2 cameras; so, after digging a few seconds within the code, I confirmed it: I was rendering 2 cameras, yes. Quickly fixed it and took a new session:

```
texParameteri (3776): 12,076171875 ms
getExtension (472): 4,739990234375 ms
bindTexture (944): 3,7275390625 ms
bindBufferBase (945): 3,667236328125 ms
texParameterf (944): 3,400390625 ms
bindBuffer (699): 3,30029296875 ms
vertexAttribPointer (472): 2,2255859375 ms
uniform1i (472): 2,025634765625 ms
enableVertexAttribArray (472): 1,82958984375 ms
activeTexture (472): 1,620361328125 ms
drawElements (236): 1,28564453125 ms
bindBufferRange (235): 1,279052734375 ms
bufferSubData (4): 1,03515625 ms
clear (2): 0,02490234375 ms
clearDepth (1): 0,005126953125 ms
clearColor (1): 0,0048828125 ms
clearStencil (1): 0,0048828125 ms
depthMask (1): 0,0048828125 ms

Total (10149): 42,25732421875 ms (0,04225732421875 s)

One frame at 60 FPS lengths 16,666666 ms (0,016666666 s), so
current total would generate 23,664536704297287 FPS
```
*WaveEngine-Buggy-OneFrame3.json*

Yeah, exactly half the amount of calls than before, like it was expected. With these better numbers, we make 10149 / 750 = ~14x more calls than Babylon, which's still huge.

I'm not an OpenGL guy, and my knowledge is quite limited in this sense. I've recently learned what instancing is, and what a VBO (Vertex Buffer Object) is, but don't have a further notion of the rendering pipeline happening underneath.

Guided by my friend Javi Cantón, I can see we're making 236 `drawElements()` calls, while Babylon does 118 `drawElements()` + 31 `drawElementsInstanced()` = 149. Then I can think of Babylon having infrasctructure to apply instancing where appropiate, which not only reduces the amount of commands but also takes advantage of the GPU. I can see we call `texParameteri()` 3776 times (3776 / 236 draw calls = 16 times/draw call) while Babylon makes 0, surely because such are made at the beginning and aren't needed anymore after.

In conclusion, we can do a better job in our OpenGL backend. You'll see the [WaveEngine.OpenGL.Common NuGet](https://www.fuget.org/packages/WaveEngine.OpenGL.Common/) in the OpenGL launchers, as it serves both OpenGL/ES and WebGL, and it's exactly there where there's room for improvement. Truth be told, there's already a feature branch in our repo with some improvements made in that direction, and we've gained some FPS already, but still need to assure it works in every visual test. We've frozen this effort because of what have found bellow.

### Time consumed

The statistics generated by my small tool also sum the amount of time taken per command, finally adding everything to calc how many FPS can be expected. That's not 100% exact as any engine not only consumes time with graphic calls, but in the rest of logic stuff: updating components, for instance. But it's a way to compare the actual frame rate (SpectorJS reports it within its toolbar menu) with the expected one, between Wave and Babylon.

|             | Time (ms) | Expected FPS | Actual ~FPS |
| ----------- |:---------:|:------------:|:-----------:|
| Wave Engine | 42,26     | 23,66        | 1           |
| BabylonJS   | 4,93      | 202,89       | 59          |

*Table comparing time consumed in 1 frame. Numbers are rounded by 2 decimals*

I made every test under Chrome, where haven't disabled the framerate limit of 60 FPS. This explains why Babylon is up to the limit, with ~59, but surely could do better if the browser wouldn't limit such. However, Wave reports barely 1 FPS, although we could expect almost 24.

I've still not talked about how we're running the .NET runtime under Wasm. Until here, I've made every test in interpreter mode, which's the lowest option in terms of performance. Every instruction of the .NET VM is interpreted in Wasm, without any sort of cache (like the JITter does).

Our mate Javier Carnero has been working heavily on researching the AOT scenario, in which percentage it can be of help for us, but I'll let him share —if he wants obviously!— his findings. I'll just say AOT isn't the gold key we're looking for **here**, so we must keep looking for other paths.

If we have a really low framerate compared to the theoretical values, if AOT can't help us to overcome this situation, what's then happening here? Reached this point, I decided to move one step down and analyze timings at the [WebGL.NET](https://github.com/WaveEngine/WebGL.NET/) layer. 

## WebGL.NET costs

I wanted to compare just one single thing: how much time lengths exactly when calling WebGL commands through JavaScript from 1) the .NET Runtime perspective and 2) the JavaScript Runtime one. I already had 2) thanks to above reports, where each WebGL command also shows the time consumed in total, from the JavaScript side.

For 1), I added a `Stopwatch` exactly here:
```csharp
protected object Invoke(string method, params object[] args)
{
    var actualArgs = Translate(args);
    // Between here...
    var result = gl.Invoke(method, actualArgs);
    // ... and here
    DisposeArrayTypes(actualArgs);

    if (IsVerbosityEnabled)
```
*The WebGL.NET backend which finally calls JavaScript to execute the WebGL `method` with params `args`*

; and another one at the very beginning and end of the above same method, because I was somewhat worried the hand-made marshalling could cause some bottleneck. I made these tests over [the samples gallery](https://webgldotnet.surge.sh/), where we have control on the rendering loop. I added some logic to run exactly 600 frames, breaking the app just after. Such amount of frames would let me calc some averages and hopefully avoid the initial cold states.

In the end, I got hundreds of tuples with those 2 times. With a handy bunch of `Console.WriteLine()` calls, it generated a large CSV output which Excel would leverage. I trusted my 1.5 years working in front of Excel with backlogs, costs and so on, would let me quickly get a few beautiful charts 8-)

And that way it was! This' the first chart:

![Chart: Average .NET vs. JavaScript durations](items/images/AverageDotNETVSJavaScriptDurations.png)
*Chart: Average .NET vs. JavaScript durations*

My interpretation of this chart is quite simple: since the orange path is almost always on top of the blue one, most of the time consumed on a WebGL call is gone exactly in doing that —remember: everything in the .NET Runtime land, for now. Except for 2 or 3 commands where we could gain a good amount of time by improving our marshalling, it seems to make no sense investing time on this.

Then, I built another chart (the last one):

![Chart: Average ratio JS/.NET](items/images/AverageRatioJSDotNET.png)
*Chart: Average ratio JS/.NET*

Basically it's the first chart represented as a ratio between the 2 values: this way we can easily see the percentage gone in the JavaScript interop. Except for the commands I mentioned above, we could say ~80% of the time consumed by our WebGL.NET backend is due to the low-level JavaScript calls, so it leaves us only 20% of improvement. I don't think 20% is low enough to don't think of improving it; I just think the actual time taken by commands —as reported by SpectorJS with the recorded sessions— is *much* lower than the one we can see here.

### JSObject.Invoke()

If by example we continue with `clearColor()`, it took 0,0048828125 ms in the Wave session —again: it's the time taken *only* in JavaScript. When looking at the same command at above charts (the first one exactly, although you can't see it because didn't get rendered in the graph) it took 0,079018124 ms of average. 0,079018124 / 0,0048828125 = 16,18 times slower making such call from .NET than in pure JavaScript. And I've seen also such ratio growing up to 20 times as well.

Here's where the big issue is: calling JavaScript code from .NET through [Mono's WebAssembly.Bindings](https://github.com/mono/mono/tree/master/sdks/wasm/framework/src/WebAssembly.Bindings) NuGet doesn't offer the performance we need. It's feasible for ocasional calls, where you won't notice such impact, but not for stuff like ours, with hundreds or thousands calls per second. We need to consume WebGL in a much faster way.

## Emscripten will bring some light

Two weeks ago my mate Javier Carnero and I started researching dynamic & static linking approaches at Emscripten level, directly. After seeing [Doom 3](https://wasm.continuation-labs.com/d3demo/), [Tomb Raider](http://xproger.info/projects/OpenLara/), [Windows 2000](https://bellard.org/jslinux/vm.html?url=https://bellard.org/jslinux/win2k.cfg&mem=192&graphic=1&w=1024&h=768), etc., high-performance ports of software pieces, running well through Emscripten, we think there must exist a better way to interop.

The linking approaches would let us P/Invoke C functions, compiled into Wasm, from .NET, expecting to be faster than going through JavaScript. Actually, JavaScript is never left aside, as Emscripten ports of OpenGL/ES libraries are actually wrappers around JavaScript/WebGL. However, this way we remove the trampoline from .NET to JavaScript, with all the manual marshalling needed, by letting Emscripten handle all this for us.

Lin Clark wrote, in late 2018, [a beautiful article](https://hacks.mozilla.org/2018/10/calls-between-javascript-and-webassembly-are-finally-fast-%F0%9F%8E%89/) on how they improved JavaScript & Wasm communication in Firefox. Jérôme Laban's recently [written](https://jaylee.org/archive/2020/03/22/csharp-interop-with-c-cpp-and-rust-in-webassembly.html) too on how P/Invoking Rust and C code from .NET-Wasm, where already alerts on the performance aspect.

When we had an initial render loop working, with promising times, Javi Cantón had an idea which would shift our route: could we reuse the existing [WaveEngine.OpenGL NuGet](https://www.fuget.org/packages/WaveEngine.OpenGL/) with Emscripten's EGL `getProcAddress()` call? And here we are, but this' stuff for another post.

## Thanks

To my workmates from Plain Concepts' Seville office for their help, in one way or another, with Wave Engine Web. Specially, the core team working in Wave Engine. More specifically, Dani Cáceres recommended me some approaches to improve WebGL.NET performance, like having multiple `Invoke()` overloads per amount of params, instead of using `params object[] args`.