"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const electron_1 = require("electron");
const path_1 = require("path");
const common_enums_1 = require("../../common/common.enums");
const common_defaults_1 = require("../../common/common.defaults");
/**
 * Main electron window for displaying the core content.
 * @date 8/8/2023 - 9:42:14 AM
 *
 * @export
 * @class template
 * @typedef {template}
 */
class template {
    /**
     * Constructor for the template class
     * @date 8/8/2023 - 9:42:14 AM
     *
     * @constructor
     * @param {TSettings} settings
     * @param {common} helper
     */
    constructor(settings, helper) {
        this.settings = settings;
        this.helper = helper;
        /**
         * Configure the main template display
         * @date 8/8/2023 - 9:42:14 AM
         */
        this.configure = () => {
            this.window = new electron_1.BrowserWindow({
                backgroundColor: common_defaults_1.BACKGROUND_DEFAULT,
                frame: (this.settings.environment === common_enums_1.environmentEnum.enum.development) ? true : false,
                title: "Electron Playground",
                x: 0,
                y: 0,
                width: this.settings.resolution.width,
                height: this.settings.resolution.height,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    devTools: (this.settings.environment === common_enums_1.environmentEnum.enum.development) ? true : false,
                }
            });
            this.window.setBackgroundColor(common_defaults_1.BACKGROUND_DEFAULT);
        };
        /**
         * Load the content for the main template
         * @date 8/8/2023 - 9:42:14 AM
         */
        this.loadContent = () => {
            if (this.window !== undefined)
                this.window.loadURL(this.path);
        };
        /**
         * Get the main template window
         * @date 8/8/2023 - 9:42:14 AM
         *
         * @returns {(BrowserWindow | undefined)}
         */
        this.windowGet = () => this.window;
        /**
         * Mutate the main template window
         * @date 8/8/2023 - 9:42:14 AM
         *
         * @param {(BrowserWindow | undefined)} window
         */
        this.windowMutate = (window) => {
            this.window = window;
        };
        /**
         * Update the menu for the main window
         * @date 8/8/2023 - 9:42:14 AM
         *
         * @param {Menu} menu
         */
        this.menuSet = (menu) => {
            if (this.window !== undefined)
                this.window.setMenu(menu);
        };
        this.path = (0, path_1.join)(__dirname, 'template.default.html');
        if (this.helper.fileExists(settings.templateDir))
            this.path = `${settings.templateDir}/index1.html`;
        this.helper.log('template constructor', 'path', this.path);
    }
}
exports.template = template;
