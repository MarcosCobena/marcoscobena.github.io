_Below [recipe](https://github.com/WaveEngine/Documentation/wiki/Frustum-Culling) belongs to [Wave Engine's official Documentation wiki](https://github.com/WaveEngine/Documentation/wiki)._

* * *

## Goal

Frustum Culling is the technique which does not draw those things which are out of the camera scope. Wave Engine has enabled by default such algorithm, but it is important to highlight some key points in order to assure its correct behavior. You can read more on Frustum Culling technique [here](https://en.wikipedia.org/wiki/Hidden_surface_determination).

## [](https://github.com/WaveEngine/Documentation/wiki/Frustum-Culling#hands-on)Hands-on

Every [Drawable2D](http://doc.waveengine.net/index.html#topic_000000000000104C.html) and [Drawable3D](http://doc.waveengine.net/index.html#topic_0000000000001059.html) component supports Frustum Culling technique through the [CullingEnabled](http://doc.waveengine.net/index.html#topic_0000000000001052.html) and [FrustumCullingEnabled](http://doc.waveengine.net/index.html#topic_000000000000105A.html) properties, respectively, which are `true` by default. In order to Wave Engine detect whether an object is inside or outside the scope of the camera, such needs to pack a collider. Please refer to [Detect 3d collisions](https://github.com/WaveEngine/Documentation/wiki/Detect-3d-collisions) and [Detect 2D collisions](https://github.com/WaveEngine/Documentation/wiki/Detect-2d-collisions) which focus on how to work with colliders -this will not be covered here.

[FrustumCulling](https://github.com/WaveEngine/Samples/tree/master/Performance/FrustumCulling) sample graphically shows entities dis/appearing on demand, with a mesh representing the frustum culling area.

### [](https://github.com/WaveEngine/Documentation/wiki/Frustum-Culling#with-wave-visual-editor)With Wave Visual Editor

Since Wave Visual Editor supports seeing in real time the current scene rendered, it also supplies diagnostic info, with culling counters included. Follow [Activate diagnostics mode](https://github.com/WaveEngine/Documentation/wiki/Activate-diagnostics-mode)to achieve this. The "Culled" label which will be printed on the top left corner of the Viewport will do just that.

### [](https://github.com/WaveEngine/Documentation/wiki/Frustum-Culling#with-visual-studioxamarin-studio)With Visual Studio/Xamarin Studio

This technique can be disabled globally also through [RenderManager](http://doc.waveengine.net/index.html#topic_0000000000001289.html)'s[FrustumCullingEnabled](http://doc.waveengine.net/index.html#topic_000000000000129D.html) property, setting it as `false`.

Further, this recipe does not involve source code which would require Visual Studio/Xamarin Studio.

## [](https://github.com/WaveEngine/Documentation/wiki/Frustum-Culling#wrap-up)Wrap-up

Wave Engine has built-in support for Frustum Culling technique, which does not draw those meshes which are out of the camera scope. Such is activated by default, but require entities to pack a collider.