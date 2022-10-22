/*
	This module exports a CodeMirror plugin that applies the user's options.
*/

module.exports = {
	default: function(context) { 
		return {
			plugin: function (CodeMirror) {
				// Define a CM option, so we can get a (working) CodeMirror instance (cm) that we can manipulate:
				// (For some reason CodeMirror.setOption() "is not a function")
				CodeMirror.defineOption('enableMoreCMOptions', false, async function(cm, val, old) {
					// Get all CM options that the user has set:
					let cmoptions = await context.postMessage({ name: 'getCMOptions' });

					// Set each CM option:
					for (const [key, value] of Object.entries(cmoptions)) {
						cm.setOption(key, value);
					}
				});
			},

			// Ensure our plugin works:
			codeMirrorOptions: { 'enableMoreCMOptions': true }
		}
	},
}