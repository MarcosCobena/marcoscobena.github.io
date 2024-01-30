var Module = { 
	onRuntimeInitialized: function () {
		MONO.mono_load_runtime_and_bcl (
			"managed",
			"managed",
			1,
			[ "Library.dll", "Mono.Security.dll", "mscorlib.dll", "netstandard.dll", "System.Core.dll", "System.dll", "System.Drawing.Common.dll", "System.Net.Http.dll", "System.Runtime.Serialization.dll", "System.ServiceModel.Internals.dll", "System.Xml.dll", "WasmApp1.dll", "WebAssembly.Bindings.dll", "WebAssembly.Net.Http.dll", "WebAssembly.Net.WebSockets.dll", "Library.pdb", "Mono.Security.pdb", "mscorlib.pdb", "System.Core.pdb", "System.Drawing.Common.pdb", "System.Net.Http.pdb", "System.pdb", "System.Runtime.Serialization.pdb", "System.ServiceModel.Internals.pdb", "System.Xml.pdb", "WasmApp1.pdb", "WebAssembly.Bindings.pdb", "WebAssembly.Net.Http.pdb", "WebAssembly.Net.WebSockets.pdb" ],
			function () {
				App.init ();
			}
		);
	},
};


