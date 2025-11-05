![](items/images/evergine-webgpu.png)

I was assigned the task to implement the WebGPU backend for Evergine.
We already had WebGPU on Windows (x64) so I did not start from scratch.
However, given we were targeting .NET 8 by that time, the built-in Emscripten version forced us to some incompatible WebGPU headers.
We could not rely on Google's Dawn, neither.
My workmate David Ávila carried the job on and brought it into production, fixing a lot of issues I found and setting the template up.
I am super happy for contributing, again, to bring Evergine to the Web!

|            |                                                                                       |
| ---------- | ------------------------------------------------------------------------------------- |
| Languages  | C# (.NET), C, JavaScript                                                              |
| Frameworks | Evergine, Emscripten                                                                  |
| Platforms  | Web (WebAssembly)                                                                     |
| Date       | April-June 2025                                                                       |
| More info? | <https://docs.evergine.com/2025.10.21/manual/graphics/supported_backends/webgpu.html> |
