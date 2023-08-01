/*
    This module exports a CodeMirror plugin that applies the user's options.
*/

import { PluginSettings } from "./settings";

module.exports = {
    default: function (context) {
        return {
            plugin: function (CodeMirror) {
                // Define a CM option, so we can get a CodeMirror.Editor instance (cm) that we can manipulate:
                CodeMirror.defineOption('enableMoreCMOptions', false, async function (cm, val, old) {
                    // Get the plugin settings:
                    const settings: PluginSettings = await context.postMessage({ name: 'getPluginSettings' });

                    // A list of all valid CodeMirror 5 options the user can set.
                    // See https://codemirror.net/5/doc/manual.html#config for all options.
                    const cmoptions = [
                        "lineWrapping",
                        "lineNumbers",
                        "showCursorWhenSelecting",
                        "cursorBlinkRate",
                        "resetSelectionOnContextMenu"
                    ];

                    // Set each CM option:
                    for (const [key, value] of Object.entries(settings)) {
                        // Filter out invalid keys:
                        if (cmoptions.includes(key)) {
                            cm.setOption(key, value);
                        }
                    }
                });
            },

            // Ensure our plugin works:
            codeMirrorOptions: { 'enableMoreCMOptions': true }
        }
    },
}
