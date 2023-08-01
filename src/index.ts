import joplin from 'api';
import { ContentScriptType } from 'api/types';

import {
    registerAllSettings,
    getCMOptions,
    getPluginSettings
} from './settings';

const CONTENT_SCRIPT_ID = 'CMOptions';

joplin.plugins.register({
    onStart: async function () {
        // Register this plugin's settings, so the user can access them:
        await registerAllSettings();

        // Apply CSS fix if enabled:
        const settings = await getPluginSettings();
        if (settings.lineNumbers && settings.fixLineNumbersCSS) {
            const installDir = await joplin.plugins.installationDir();
            const cssFilePath = installDir + '/fix-linenumbers.css';
            await joplin.window.loadChromeCssFile(cssFilePath);
        }

        // Register a message, so our CodeMirror plugin can retrieve the user's preferences:
        await joplin.contentScripts.onMessage(CONTENT_SCRIPT_ID, async (message: any) => {
            if (message.name === 'getCMOptions') {
                return await getCMOptions();
            }
            return "Error: " + message + " is not a valid message";
        });

        // Register a CodeMirror plugin, so the user's preferences actually get applied:
        await joplin.contentScripts.register(
            ContentScriptType.CodeMirrorPlugin,
            CONTENT_SCRIPT_ID,
            './cmoptions.js'
        );
    },
});
