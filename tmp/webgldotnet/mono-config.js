config = {
 	vfs_prefix: "managed",
 	deploy_prefix: "managed",
 	enable_debugging: 0,
 	file_list: [ "Samples.dll","mscorlib.dll","System.Xml.dll","System.Drawing.dll","System.Runtime.Serialization.dll","WebAssembly.Bindings.dll","WebGLDotNET.dll","WaveEngine.Common.dll", ],
	add_bindings: function() { Module.mono_bindings_init ("[WebAssembly.Bindings]WebAssembly.Runtime"); }
}
