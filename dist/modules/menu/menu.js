"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = void 0;
const electron_1 = require("electron");
const path_1 = require("path");
const common_enums_1 = require("../../common/common.enums");
/**
 * Menu management class
 * @date 8/8/2023 - 9:42:22 AM
 *
 * @export
 * @class menu
 * @typedef {menu}
 */
class menu {
    /**
     * Creates an instance of menu.
     * @date 8/8/2023 - 9:42:21 AM
     *
     * @constructor
     * @param {TSettings} settings
     * @param {common} helper
     * @param {BrowserWindow} application
     */
    constructor(settings, helper, application) {
        this.settings = settings;
        this.helper = helper;
        this.application = application;
        /**
         * Initialize the event listeners
         * @date 8/8/2023 - 9:42:21 AM
         */
        this.eventListenersInit = () => {
            this.ipc.on(common_enums_1.ipcActionsEnum.enum.optionClose, (event, data) => {
                if (this.overlayConfigured())
                    this.overlayClose();
            });
        };
        /**
         * Reset the main menu
         * @date 8/8/2023 - 9:42:21 AM
         */
        this.mainClear = () => {
            this.mainMenu = undefined;
            this.mainMenuItems = [];
        };
        /**
         * Overlay reset
         * @depricated
         * @date 8/8/2023 - 9:42:21 AM
         */
        this.overlayClear = () => {
            this.overlay = undefined;
            this.overlayMenu = undefined;
            this.overlayMenuItems = [];
        };
        /**
         * Search a sub menu for a specific role
         * @date 8/8/2023 - 9:42:21 AM
         *
         * @param {string} role
         * @param {*} submenu
         * @returns {boolean}
         */
        this.submenuSearchRole = (role, submenu) => {
            let found = false;
            submenu.forEach(item => {
                if (typeof item.role !== 'undefined')
                    if (item.role === role)
                        found = true;
            });
            return found;
        };
        /**
         * Add an item to a sub menu
         * @date 8/8/2023 - 9:42:21 AM
         *
         * @param {(Menu | Electron.MenuItemConstructorOptions[])} submenu
         * @param {Electron.MenuItemConstructorOptions} item
         * @returns {(Menu | Electron.MenuItemConstructorOptions[])}
         */
        this.submenuItemAdd = (submenu, item) => {
            let submenuTmp = submenu;
            submenuTmp.push(item);
            return submenuTmp;
        };
        /**
         * Default overlay menu items
         * @date 8/8/2023 - 9:42:20 AM
         *
         * @returns {(Electron.MenuItemConstructorOptions | MenuItem)[]}
         */
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
        /**
         * Menu option handler
         * @date 8/8/2023 - 9:42:20 AM
         *
         * @param {TOptionTypesEnum} option
         * @param {?TResolution} [resolutionOverride]
         * @param {?(Electron.MenuItemConstructorOptions | MenuItem)[]} [menuItemsOverride]
         */
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
        /**
         * Offset for the overlay display on the x-axis
         * @date 8/8/2023 - 9:42:20 AM
         *
         * @param {number} width
         * @returns {number}
         */
        this.offsetX = (width) => {
            if (width === this.settings.resolution.width)
                return 0;
            return (this.settings.resolution.width - width) / 2;
        };
        /**
         * Offset for the overlay display on the y-axis
         * @date 8/8/2023 - 9:42:20 AM
         *
         * @param {number} height
         * @returns {number}
         */
        this.offsetY = (height) => {
            if (height === this.settings.resolution.height)
                return 0;
            return (this.settings.resolution.height - height) / 2;
        };
        /**
         * Creation of the main menu items
         * @date 8/8/2023 - 9:42:20 AM
         */
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
        /**
         * Retrieve the main menu
         * @date 8/8/2023 - 9:42:20 AM
         *
         * @returns {(Menu | undefined)}
         */
        this.mainMenuGet = () => this.mainMenu;
        /**
         * Loading of an overlay item
         * @date 8/8/2023 - 9:42:20 AM
         *
         * @param {string} contentLocation
         * @param {?boolean} [transparentBg]
         * @param {?TResolution} [res]
         * @param {?(Electron.MenuItemConstructorOptions | MenuItem)[]} [menuItems]
         */
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
        /**
         * Is the overlay window configured?
         * @date 8/8/2023 - 9:42:19 AM
         *
         * @returns {boolean}
         */
        this.overlayConfigured = () => this.overlay !== undefined;
        /**
         * Close the overlay window
         * @date 8/8/2023 - 9:42:19 AM
         */
        this.overlayClose = () => this.overlay = undefined;
        /**
         * Get the overlay window instance
         * @date 8/8/2023 - 9:42:19 AM
         *
         * @returns {(BrowserWindow | undefined)}
         */
        this.overlayGet = () => this.overlay;
        /**
         * Is the device anapple/mac device?
         * @date 8/8/2023 - 9:42:19 AM
         *
         * @returns {boolean}
         */
        this.isApple = () => this.isMac;
        this.mainMenuItems = [];
        this.overlayMenuItems = [];
        this.isMac = process.platform === 'darwin';
        this.ipc = electron_1.ipcMain;
        this.eventListenersInit();
    }
}
exports.menu = menu;
