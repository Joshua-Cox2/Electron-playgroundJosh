"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const electron_1 = require("electron");
const path_1 = require("path");
const common_enums_1 = require("../../common/common.enums");
const BACKGROUND_DEFAULT = '#000000';
class template {
    constructor(settings, helper) {
        this.settings = settings;
        this.helper = helper;
        this.configure = () => {
            this.window = new electron_1.BrowserWindow({
                backgroundColor: BACKGROUND_DEFAULT,
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
            this.window.setBackgroundColor(BACKGROUND_DEFAULT);
        };
        this.loadContent = () => {
            if (this.window !== undefined)
                this.window.loadURL(this.path);
        };
        this.windowGet = () => this.window;
        this.windowMutate = (window) => {
            this.window = window;
        };
        this.menuSet = (menu) => {
            if (this.window !== undefined)
                this.window.setMenu(menu);
        };
        this.path = (0, path_1.join)(__dirname, 'template.default.html');
        if (this.helper.fileExists(settings.templateDir))
            this.path = settings.templateDir;
        this.helper.log('template constructor', 'path', this.path);
    }
}
exports.template = template;
