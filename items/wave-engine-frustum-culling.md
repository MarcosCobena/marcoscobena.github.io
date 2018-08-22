*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

<em>Below <a href="https://github.com/WaveEngine/Documentation/wiki/Frustum-Culling">recipe</a> belongs to <a href="https://github.com/WaveEngine/Documentation/wiki">Wave Engine's official Documentation wiki</a>.</em>

<hr />

<h2>Goal</h2>
Frustum Culling is the technique which does not draw those things which are out of the camera scope. Wave Engine has enabled by default such algorithm, but it is important to highlight some key points in order to assure its correct behavior. You can read more on Frustum Culling technique <a href="https://en.wikipedia.org/wiki/Hidden_surface_determination">here</a>.
<h2><a id="user-content-hands-on" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Frustum-Culling#hands-on"></a>Hands-on</h2>
Every <a href="http://doc.waveengine.net/index.html#topic_000000000000104C.html">Drawable2D</a> and <a href="http://doc.waveengine.net/index.html#topic_0000000000001059.html">Drawable3D</a> component supports Frustum Culling technique through the <a href="http://doc.waveengine.net/index.html#topic_0000000000001052.html">CullingEnabled</a> and <a href="http://doc.waveengine.net/index.html#topic_000000000000105A.html">FrustumCullingEnabled</a> properties, respectively, which are <code>true</code> by default. In order to Wave Engine detect whether an object is inside or outside the scope of the camera, such needs to pack a collider. Please refer to <a class="internal present" href="https://github.com/WaveEngine/Documentation/wiki/Detect-3d-collisions">Detect 3d collisions</a> and <a class="internal present" href="https://github.com/WaveEngine/Documentation/wiki/Detect-2d-collisions">Detect 2D collisions</a> which focus on how to work with colliders -this will not be covered here.

<a href="https://github.com/WaveEngine/Samples/tree/master/Performance/FrustumCulling">FrustumCulling</a> sample graphically shows entities dis/appearing on demand, with a mesh representing the frustum culling area.
<h3><a id="user-content-with-wave-visual-editor" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Frustum-Culling#with-wave-visual-editor"></a>With Wave Visual Editor</h3>
Since Wave Visual Editor supports seeing in real time the current scene rendered, it also supplies diagnostic info, with culling counters included. Follow <a class="internal present" href="https://github.com/WaveEngine/Documentation/wiki/Activate-diagnostics-mode">Activate diagnostics mode</a>to achieve this. The "Culled" label which will be printed on the top left corner of the Viewport will do just that.
<h3><a id="user-content-with-visual-studioxamarin-studio" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Frustum-Culling#with-visual-studioxamarin-studio"></a>With Visual Studio/Xamarin Studio</h3>
This technique can be disabled globally also through <a href="http://doc.waveengine.net/index.html#topic_0000000000001289.html">RenderManager</a>'s<a href="http://doc.waveengine.net/index.html#topic_000000000000129D.html">FrustumCullingEnabled</a> property, setting it as <code>false</code>.

Further, this recipe does not involve source code which would require Visual Studio/Xamarin Studio.
<h2><a id="user-content-wrap-up" class="anchor" href="https://github.com/WaveEngine/Documentation/wiki/Frustum-Culling#wrap-up"></a>Wrap-up</h2>
Wave Engine has built-in support for Frustum Culling technique, which does not draw those meshes which are out of the camera scope. Such is activated by default, but require entities to pack a collider.