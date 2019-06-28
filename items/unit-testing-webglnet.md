Wow! It's been some time since I wrote here.

While my mate Juan is working on the first actual Wave Engine 3.0 app with WebGL -he's already achieved the tricolor 
triangle, by the way- I've spent some time trying to set up something for unit testing the API. Eric Mellino, the guy 
from Veldrid, created 2 issues the other day about marshalling errors and, as I was thinking how to address them, I 
heavily noticed the need to avoid regressions such like those.

The pair Mono Wasm and Unit Tests isn't an easy one: I tried to run Xunit's AssemblyRunner with no success -the browser 
always stucks on the discovering/execution process. Although I didn't debug it deeply (debugging isn't so easy either...
) my bet is Xunit relies on multiple ManualResetEvents and Wasm is monothread nowadays (I'm aware of Chrome's 
implementation but am trying to stick to the common one). I tried different attempts: going down the Xunit repo to find 
what was being executed internally but, in the end, got nothing.

But came up with an idea: since Xunit has splitted the asserts thing as a separate NuGet I could build a small 
infrastructure to discover tests through reflection and depend on Xunit for the in-test experience. And voilá! 
[Here](https://webglnet.surge.sh/tests/) it's ([this](https://github.com/WaveEngine/WebGL.NET/tree/master/src/Tests) is 
the source code). I still have to fix the Linux build which's not publishing the tests/ dir at Surge but this is another
 page.

Oh, the entire test set fails on my home machine, will have to look into that:

```
>>mono_wasm_runtime_ready mono.js:7805:14
﻿4 tests found mono.js:2236:13
Running 'GetErrorRegressionTest'... mono.js:2236:13
System.Reflection.TargetInvocationException: Exception has been thrown by the target of an invocation. ---> System.NullReferenceException: Object reference not set to an instance of an object. mono.js:2236:13
  at WebGLDotNET.WebGLRenderingContextBase.Invoke (System.String method, System.Object[] args) [0x00009] in /Users/marcos/Repositorios/WebGL.NET/src/WebGLDotNET/WebGL.Backend.cs:127 mono.js:2236:13
  at WebGLDotNET.WebGLRenderingContextBase.InvokeForBasicType[T] (System.String method, System.Object[] args) [0x00001] in /Users/marcos/Repositorios/WebGL.NET/src/WebGLDotNET/WebGL.Backend.cs:154 mono.js:2236:13
  at WebGLDotNET.WebGLRenderingContextBase.GetError () [0x00000] in /Users/marcos/Repositorios/WebGL.NET/src/WebGLDotNET/WebGL.cs:810 mono.js:2236:13
  at Tests.TheTests.GetErrorRegressionTest () [0x00001] in /Users/marcos/Repositorios/WebGL.NET/src/Tests/TheTests.cs:19 mono.js:2236:13
  at (wrapper managed-to-native) System.Reflection.RuntimeMethodInfo.InternalInvoke(System.Reflection.RuntimeMethodInfo,object,object[],System.Exception&) mono.js:2236:13
  at System.Reflection.RuntimeMethodInfo.Invoke (System.Object obj, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder binder, System.Object[] parameters, System.Globalization.CultureInfo culture) [0x0006a] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/mcs/class/corlib/System.Reflection/RuntimeMethodInfo.cs:395 mono.js:2236:13
   --- End of inner exception stack trace --- mono.js:2236:13
  at System.Reflection.RuntimeMethodInfo.Invoke (System.Object obj, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder binder, System.Object[] parameters, System.Globalization.CultureInfo culture) [0x00081] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/mcs/class/corlib/System.Reflection/RuntimeMethodInfo.cs:409 mono.js:2236:13
  at System.Reflection.MethodBase.Invoke (System.Object obj, System.Object[] parameters) [0x00000] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/external/corefx/src/Common/src/CoreLib/System/Reflection/MethodBase.cs:53 mono.js:2236:13
  at Tests.Program.Main () [0x000e2] in /Users/marcos/Repositorios/WebGL.NET/src/Tests/Program.cs:34 mono.js:2236:13
Failed! mono.js:2236:13
Running 'GetUniformBlockIndexRegressionTest'... mono.js:2236:13
System.Reflection.TargetInvocationException: Exception has been thrown by the target of an invocation. ---> System.NullReferenceException: Object reference not set to an instance of an object. mono.js:2236:13
  at WebGLDotNET.WebGLRenderingContextBase.Invoke[T] (System.String method, System.Object[] args) [0x00009] in /Users/marcos/Repositorios/WebGL.NET/src/WebGLDotNET/WebGL.Backend.cs:137 mono.js:2236:13
  at WebGLDotNET.WebGLRenderingContextBase.CreateProgram () [0x00000] in /Users/marcos/Repositorios/WebGL.NET/src/WebGLDotNET/WebGL.cs:744 mono.js:2236:13
  at Tests.TheTests.GetUniformBlockIndexRegressionTest () [0x00001] in /Users/marcos/Repositorios/WebGL.NET/src/Tests/TheTests.cs:27 mono.js:2236:13
  at (wrapper managed-to-native) System.Reflection.RuntimeMethodInfo.InternalInvoke(System.Reflection.RuntimeMethodInfo,object,object[],System.Exception&) mono.js:2236:13
  at System.Reflection.RuntimeMethodInfo.Invoke (System.Object obj, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder binder, System.Object[] parameters, System.Globalization.CultureInfo culture) [0x0006a] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/mcs/class/corlib/System.Reflection/RuntimeMethodInfo.cs:395 mono.js:2236:13
   --- End of inner exception stack trace --- mono.js:2236:13
  at System.Reflection.RuntimeMethodInfo.Invoke (System.Object obj, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder binder, System.Object[] parameters, System.Globalization.CultureInfo culture) [0x00081] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/mcs/class/corlib/System.Reflection/RuntimeMethodInfo.cs:409 mono.js:2236:13
  at System.Reflection.MethodBase.Invoke (System.Object obj, System.Object[] parameters) [0x00000] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/external/corefx/src/Common/src/CoreLib/System/Reflection/MethodBase.cs:53 mono.js:2236:13
  at Tests.Program.Main () [0x000e2] in /Users/marcos/Repositorios/WebGL.NET/src/Tests/Program.cs:34 mono.js:2236:13
Failed! mono.js:2236:13
Running 'BindBufferRangeRegressionTest'... mono.js:2236:13
System.Reflection.TargetInvocationException: Exception has been thrown by the target of an invocation. ---> System.NullReferenceException: Object reference not set to an instance of an object. mono.js:2236:13
  at WebGLDotNET.WebGLRenderingContextBase.Invoke[T] (System.String method, System.Object[] args) [0x00009] in /Users/marcos/Repositorios/WebGL.NET/src/WebGLDotNET/WebGL.Backend.cs:137 mono.js:2236:13
  at WebGLDotNET.WebGLRenderingContextBase.CreateBuffer () [0x00000] in /Users/marcos/Repositorios/WebGL.NET/src/WebGLDotNET/WebGL.cs:740 mono.js:2236:13
  at Tests.TheTests.BindBufferRangeRegressionTest () [0x00001] in /Users/marcos/Repositorios/WebGL.NET/src/Tests/TheTests.cs:34 mono.js:2236:13
  at (wrapper managed-to-native) System.Reflection.RuntimeMethodInfo.InternalInvoke(System.Reflection.RuntimeMethodInfo,object,object[],System.Exception&) mono.js:2236:13
  at System.Reflection.RuntimeMethodInfo.Invoke (System.Object obj, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder binder, System.Object[] parameters, System.Globalization.CultureInfo culture) [0x0006a] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/mcs/class/corlib/System.Reflection/RuntimeMethodInfo.cs:395 mono.js:2236:13
   --- End of inner exception stack trace --- mono.js:2236:13
  at System.Reflection.RuntimeMethodInfo.Invoke (System.Object obj, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder binder, System.Object[] parameters, System.Globalization.CultureInfo culture) [0x00081] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/mcs/class/corlib/System.Reflection/RuntimeMethodInfo.cs:409 mono.js:2236:13
  at System.Reflection.MethodBase.Invoke (System.Object obj, System.Object[] parameters) [0x00000] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/external/corefx/src/Common/src/CoreLib/System/Reflection/MethodBase.cs:53 mono.js:2236:13
  at Tests.Program.Main () [0x000e2] in /Users/marcos/Repositorios/WebGL.NET/src/Tests/Program.cs:34 mono.js:2236:13
Failed! mono.js:2236:13
Running 'BufferSubDataRegressionTest'... mono.js:2236:13
System.Reflection.TargetInvocationException: Exception has been thrown by the target of an invocation. ---> System.NullReferenceException: Object reference not set to an instance of an object. mono.js:2236:13
  at WebGLDotNET.WebGLRenderingContextBase.Invoke (System.String method, System.Object[] args) [0x00009] in /Users/marcos/Repositorios/WebGL.NET/src/WebGLDotNET/WebGL.Backend.cs:127 mono.js:2236:13
  at WebGLDotNET.WebGLRenderingContextBase.BufferSubData (System.UInt32 target, System.UInt32 offset, System.Array data) [0x00000] in /Users/marcos/Repositorios/WebGL.NET/src/WebGLDotNET/WebGL.cs:716 mono.js:2236:13
  at Tests.TheTests.BufferSubDataRegressionTest () [0x00008] in /Users/marcos/Repositorios/WebGL.NET/src/Tests/TheTests.cs:41 mono.js:2236:13
  at (wrapper managed-to-native) System.Reflection.RuntimeMethodInfo.InternalInvoke(System.Reflection.RuntimeMethodInfo,object,object[],System.Exception&) mono.js:2236:13
  at System.Reflection.RuntimeMethodInfo.Invoke (System.Object obj, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder binder, System.Object[] parameters, System.Globalization.CultureInfo culture) [0x0006a] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/mcs/class/corlib/System.Reflection/RuntimeMethodInfo.cs:395 mono.js:2236:13
   --- End of inner exception stack trace --- mono.js:2236:13
  at System.Reflection.RuntimeMethodInfo.Invoke (System.Object obj, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder binder, System.Object[] parameters, System.Globalization.CultureInfo culture) [0x00081] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/mcs/class/corlib/System.Reflection/RuntimeMethodInfo.cs:409 mono.js:2236:13
  at System.Reflection.MethodBase.Invoke (System.Object obj, System.Object[] parameters) [0x00000] in /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/external/corefx/src/Common/src/CoreLib/System/Reflection/MethodBase.cs:53 mono.js:2236:13
  at Tests.Program.Main () [0x000e2] in /Users/marcos/Repositorios/WebGL.NET/src/Tests/Program.cs:34 mono.js:2236:13
Failed! mono.js:2236:13
0/4 tests passed mono.js:2236:13
Error: WebGL warning: getContext: Disallowing antialiased backbuffers due to blacklisting. mono.js:9089:18
Error: WebGL warning: <SetDimensions>: Refused to create WebGL2 context because of blacklist entry: FEATURE_FAILURE_NV_W7_15 mono.js:9089:18
Error: WebGL warning: <SetDimensions>: Failed to create WebGL context: WebGL creation failed: 
* Refused to create WebGL2 context because of blacklist entry: FEATURE_FAILURE_NV_W7_15 mono.js:9089:18
Error: WebGL warning: getContext: Disallowing antialiased backbuffers due to blacklisting. mono.js:9089:18
Error: WebGL warning: <SetDimensions>: Refused to create WebGL2 context because of blacklist entry: FEATURE_FAILURE_NV_W7_15 mono.js:9089:18
Error: WebGL warning: <SetDimensions>: Failed to create WebGL context: WebGL creation failed: 
* Refused to create WebGL2 context because of blacklist entry: FEATURE_FAILURE_NV_W7_15 mono.js:9089:18
Error: WebGL warning: getContext: Disallowing antialiased backbuffers due to blacklisting. mono.js:9089:18
Error: WebGL warning: <SetDimensions>: Refused to create WebGL2 context because of blacklist entry: FEATURE_FAILURE_NV_W7_15 mono.js:9089:18
Error: WebGL warning: <SetDimensions>: Failed to create WebGL context: WebGL creation failed: 
* Refused to create WebGL2 context because of blacklist entry: FEATURE_FAILURE_NV_W7_15 mono.js:9089:18
Error: WebGL warning: getContext: Disallowing antialiased backbuffers due to blacklisting. mono.js:9089:18
Error: WebGL warning: <SetDimensions>: Refused to create WebGL2 context because of blacklist entry: FEATURE_FAILURE_NV_W7_15 mono.js:9089:18
Error: WebGL warning: <SetDimensions>: Failed to create WebGL context: WebGL creation failed: 
* Refused to create WebGL2 context because of blacklist entry: FEATURE_FAILURE_NV_W7_15 mono.js:9089:18
```