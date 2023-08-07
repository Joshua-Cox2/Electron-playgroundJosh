"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = void 0;
const electron_1 = require("electron");
const path_1 = require("path");
const common_enums_1 = require("../../common/common.enums");
class menu {
    constructor(settings, helper, application) {
        this.settings = settings;
        this.helper = helper;
        this.application = application;
        this.eventListenersInit = () => {
            this.ipc.on(common_enums_1.ipcActionsEnum.enum.optionClose, (event, data) => {
                if (this.overlayConfigured())
                    this.overlayClose();
            });
        };
        this.mainClear = () => {
            this.mainMenu = undefined;
            this.mainMenuItems = [];
        };
        this.overlayClear = () => {
            this.overlay = undefined;
            this.overlayMenu = undefined;
            this.overlayMenuItems = [];
        };
        this.submenuSearchRole = (role, submenu) => {
            let found = false;
            submenu.forEach(item => {
                if (typeof item.role !== 'undefined')
                    if (item.role === role)
                        found = true;
            });
            return found;
        };
        this.submenuItemAdd = (submenu, item) => {
            let submenuTmp = submenu;
            submenuTmp.push(item);
            return submenuTmp;
        };
        this.overlayMenuItemsDefault = () => {
            let menu = [
                {
                    label: 'File',
                    submenu: [
                        {
                            role: 'close',
                            accelerator: this.isMac ? 'Cmd+Q' : 'Ctrl+Q'
                        }
                    ]
                }, {
                    label: 'View',
                    submenu: [
                        { role: 'reload' }
                    ]
                }
            ];
            if (this.settings.environment === common_enums_1.environmentEnum.enum.development) {
                menu.forEach(parentOption => {
                    if (typeof parentOption.label !== 'undefined') {
                        if (parentOption.label === 'View') {
                            if (typeof parentOption.submenu === 'undefined') {
                                parentOption.submenu = [
                                    { role: 'reload' }
                                ];
                            }
                            if (!this.submenuSearchRole('forceReload', parentOption.submenu))
                                parentOption.submenu = this.submenuItemAdd(parentOption.submenu, { role: 'forceReload' });
                            if (!this.submenuSearchRole('toggleDevTools', parentOption.submenu))
                                parentOption.submenu = this.submenuItemAdd(parentOption.submenu, { role: 'toggleDevTools' });
                        }
                    }
                });
            }
            return menu;
        };
        this.optionHandler = (option, resolutionOverride, menuItemsOverride) => {
            switch (option) {
                case common_enums_1.optionTypesEnum.enum.about:
                    this.overlayLoad((0, path_1.join)(__dirname, '../', common_enums_1.optionTemplateEnum.enum.about), true, resolutionOverride, menuItemsOverride);
                    break;
                default:
                    if (this.overlayConfigured())
                        this.overlayClose();
                    break;
            }
        };
        this.offsetX = (width) => {
            if (width === this.settings.resolution.width)
                return 0;
            return (this.settings.resolution.width - width) / 2;
        };
        this.offsetY = (height) => {
            if (height === this.settings.resolution.height)
                return 0;
            return (this.settings.resolution.height - height) / 2;
        };
        this.mainMenuCreate = () => {
            this.mainClear();
            this.mainMenuItems = [
                {
                    label: 'File',
                    submenu: [
                        {
                            role: 'close',
                            accelerator: this.isMac ? 'Cmd+Q' : 'Ctrl+Q'
                        }
                    ]
                }, {
                    label: 'View',
                    submenu: [
                        { role: 'reload' },
                        { role: 'forceReload' },
                        { role: 'toggleDevTools' }
                    ]
                }, {
                    label: 'Utilities',
                    submenu: [
                        {
                            label: 'About',
                            accelerator: this.isMac ? 'Alt+Cmd+A' : 'Ctrl+Alt+A',
                            click: () => this.optionHandler(common_enums_1.optionTypesEnum.Enum.about)
                        }
                    ]
                }
            ];
            this.mainMenu = electron_1.Menu.buildFromTemplate(this.mainMenuItems);
        };
        this.mainMenuGet = () => this.mainMenu;
        this.overlayLoad = (contentLocation, transparentBg, res, menuItems) => {
            if (this.overlayConfigured())
                this.overlayClose();
            if (this.helper.fileExists(contentLocation)) {
                let transBg = transparentBg || false;
                let resolution = res || this.settings.resolution;
                this.overlayMenuItems = menuItems || this.overlayMenuItemsDefault();
                this.overlayMenu = electron_1.Menu.buildFromTemplate(this.overlayMenuItems);
                this.overlay = new electron_1.BrowserWindow({
                    x: this.offsetX(resolution.width),
                    y: this.offsetY(resolution.height),
                    width: resolution.width,
                    height: resolution.height,
                    modal: true,
                    transparent: transBg,
                    frame: false,
                    webPreferences: {
                        nodeIntegration: true,
                        devTools: true,
                        contextIsolation: false,
                    }
                });
                this.overlay.setMenu(this.overlayMenu);
                this.overlay.loadURL(contentLocation);
                this.overlay.on('closed', () => this.overlayClose());
            }
        };
        this.overlayConfigured = () => this.overlay !== undefined;
        this.overlayClose = () => this.overlay = undefined;
        this.overlayGet = () => this.overlay;
        this.isApple = () => this.isMac;
        this.mainMenuItems = [];
        this.overlayMenuItems = [];
        this.isMac = process.platform === 'darwin';
        this.ipc = electron_1.ipcMain;
        this.eventListenersInit();
    }
}
exports.menu = menu;
