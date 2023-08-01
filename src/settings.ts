import joplin from 'api';
import { SettingItemType } from 'api/types';

/**
 * Returns all CodeMirror options the user can/has set.
 * See https://codemirror.net/5/doc/manual.html#config for all options.
*/
export async function getCMOptions() {
    return {
        "lineWrapping": await joplin.settings.value('cmoptions_lineWrapping') as boolean,
        "lineNumbers": await joplin.settings.value('cmoptions_lineNumbers') as boolean,
        "showCursorWhenSelecting": await joplin.settings.value('cmoptions_showCursorWhenSelecting') as boolean,
        "cursorBlinkRate": await joplin.settings.value('cmoptions_cursorBlinkRate') as number,
        "resetSelectionOnContextMenu": await joplin.settings.value('cmoptions_resetSelectionOnContextMenu') as boolean,
    }
}

/**
 * Return all settings that the plugin has registered.
 */
export async function getPluginSettings() {
    return {
        ...(await getCMOptions()),
        "fixLineNumbersCSS": await joplin.settings.value('cmoptions_fixLineNumbersCSS') as boolean,
    }
}

/**
 * Register this plugin's settings to Joplin.
 */
export async function registerAllSettings() {
    const section = 'CMOptions';

    await joplin.settings.registerSection(section, {
        label: 'CodeMirror Options',
        description: 'CodeMirror Options',
        iconName: 'fas fa-code'
    });

    await joplin.settings.registerSettings({
        ['cmoptions_lineWrapping']: { 
            public: true,
            section: section,
            type: SettingItemType.Bool,
            value: true,
            label: 'Enable line wrapping',
            description: 'Whether CodeMirror should scroll or wrap for long lines.',
        },
        ['cmoptions_lineNumbers']: {
            public: true,
            section: section,
            type: SettingItemType.Bool,
            value: false,
            label: 'Show line numbers',
            description: 'Whether to show line numbers to the left of the editor.',
        },
        ['cmoptions_showCursorWhenSelecting']: {
            public: true,
            section: section,
            type: SettingItemType.Bool,
            value: false,
            label: 'Show cursor when selecting',
            description: 'Whether the cursor should be drawn when a selection is active. Defaults to false.',
        },
        ['cmoptions_cursorBlinkRate']: {
            public: true,
            section: section,
            type: SettingItemType.Int,
            value: 530,
            label: 'Cursor blink rate',
            description: 'Half-period in milliseconds used for cursor blinking. The default blink rate is 530ms. By setting this to zero, blinking can be disabled. A negative value hides the cursor entirely.',
        },
        ['cmoptions_resetSelectionOnContextMenu']: {
            public: true,
            section: section,
            type: SettingItemType.Bool,
            value: true,
            label: 'Reset selection on context menu',
            description: 'Controls whether, when the context menu is opened with a click outside of the current selection, the cursor is moved to the point of the click. Defaults to true.',
        },
        ['cmoptions_fixLineNumbersCSS']: {
            public: true,
            section: section,
            type: SettingItemType.Bool,
            value: false,
            label: 'Fix line numbers (using CSS "hack")',
            description: 'RESTART REQUIRED! When enabling line numbers and "Editor maximum width" at the same time, it causes display issues. Enable this option to load a CSS stylesheet to fix this issue.',
        },
    });
}
