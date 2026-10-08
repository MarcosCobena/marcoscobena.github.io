![](items/images/evergine-lowlevel-visualtests.gif)

It has been years since we wanted to automatically pass every low-level test in Evergine.
Each test was passed manually and its output added in a comment close to it.
Thanks to Claude, I asked my-self how far I could get this time.
My workmates Juan Cano, Juanma Laó and Manu Gomar had already worked on this before, thank you guys!
Now we have an action at GitHub that runs every test under determinism, takes screenshots and compares them with reference ones.
It works without GPU thanks to a previous PR from our CTIO Javi Cantón, which enables DirectX12 WARP (software rasterization).
When it finishes, it publishes as an artifact the report you see above.

|            |                                                                                       |
| ---------- | ------------------------------------------------------------------------------------- |
| Languages  | C# (.NET)                                                                             |
| Frameworks | Evergine                                                                              |
| Platforms  | Windows                                                                               |
| Date       | September 2026                                                                        |
| More info? | <https://evergine.com>                                                                |
