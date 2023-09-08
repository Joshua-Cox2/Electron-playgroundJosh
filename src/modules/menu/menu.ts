import { BrowserWindow, Menu, MenuItem, ipcMain } from "electron";
import { join } from "path";
import { common } from "../../common/common";
import { environmentEnum, ipcActionsEnum, optionTemplateEnum, optionTypesEnum } from "../../common/common.enums";
import { TOptionTypesEnum, TResolution, TSettings } from "../../common/common.types";

/**
 * Menu management class
 * @date 8/8/2023 - 9:42:22 AM
 *
 * @export
 * @class menu
 * @typedef {menu}
 */
export class menu {
    /**
     * Electron IPC handler
     * @date 8/8/2023 - 9:42:22 AM
     *
     * @private
     * @type {Electron.IpcMain}
     */
    private ipc: Electron.IpcMain
    /**
     * Flag for if the device is a mac
     * @date 8/8/2023 - 9:42:22 AM
     *
     * @private
     * @type {boolean}
     */
    private isMac: boolean
    /**
     * Main menu reference
     * @date 8/8/2023 - 9:42:22 AM
     *
     * @private
     * @type {(Menu | undefined)}
     */
    private mainMenu: Menu | undefined
    /**
     * Items for the main menu
     * @date 8/8/2023 - 9:42:22 AM
     *
     * @private
     * @type {(Electron.MenuItemConstructorOptions | MenuItem)[]}
     */
    private mainMenuItems: (Electron.MenuItemConstructorOptions | MenuItem)[]
    /**
     * Window for the overlay displays
     * @date 8/8/2023 - 9:42:22 AM
     *
     * @private
     * @type {(BrowserWindow | undefined)}
     */
    private overlay: BrowserWindow | undefined
    /**
     * Menu for the overlay displays
     * @date 8/8/2023 - 9:42:21 AM
     *
     * @private
     * @type {(Menu | undefined)}
     */
    private overlayMenu: Menu | undefined
    /**
     * Menu items for the overlay menu
     * @date 8/8/2023 - 9:42:21 AM
     *
     * @private
     * @type {(Electron.MenuItemConstructorOptions | MenuItem)[]}
     */
    private overlayMenuItems: (Electron.MenuItemConstructorOptions | MenuItem)[]

    /**
     * Creates an instance of menu.
     * @date 8/8/2023 - 9:42:21 AM
     *
     * @constructor
     * @param {TSettings} settings
     * @param {common} helper
     * @param {BrowserWindow} application
     */
    constructor(private settings: TSettings, private helper: common, private application: BrowserWindow) {
        this.mainMenuItems = []
        this.overlayMenuItems = []
        this.isMac = process.platform === 'darwin'
        this.ipc = ipcMain
        this.eventListenersInit()
    }

    /**
     * Initialize the event listeners
     * @date 8/8/2023 - 9:42:21 AM
     */
    private eventListenersInit = (): void => {
        this.ipc.on(ipcActionsEnum.enum.optionClose, (event: Electron.IpcMainEvent, data: any[]) => {
            if (this.overlayConfigured())
                this.overlayClose()
        })
    }

    /**
     * Reset the main menu
     * @date 8/8/2023 - 9:42:21 AM
     */
    private mainClear = (): void => {
        this.mainMenu = undefined
        this.mainMenuItems = []
    }

    /**
     * Search a sub menu for a specific role
     * @date 8/8/2023 - 9:42:21 AM
     *
     * @param {string} role
     * @param {*} submenu
     * @returns {boolean}
     */
    private submenuSearchRole = (role: string, submenu): boolean => {
        let found: boolean = false

        submenu.forEach(item => {
            if (typeof item.role !== 'undefined')
                if (item.role === role)
                    found = true
        })

        return found
    }

    /**
     * Add an item to a sub menu
     * @date 8/8/2023 - 9:42:21 AM
     *
     * @param {(Menu | Electron.MenuItemConstructorOptions[])} submenu
     * @param {Electron.MenuItemConstructorOptions} item
     * @returns {(Menu | Electron.MenuItemConstructorOptions[])}
     */
    private submenuItemAdd = (submenu: Menu | Electron.MenuItemConstructorOptions[], item: Electron.MenuItemConstructorOptions): Menu | Electron.MenuItemConstructorOptions[] => {
        let submenuTmp: any | any[] = submenu
        submenuTmp.push(item)
        return submenuTmp
    }

    /**
     * Default overlay menu items
     * @date 8/8/2023 - 9:42:20 AM
     *
     * @returns {(Electron.MenuItemConstructorOptions | MenuItem)[]}
     */
    private overlayMenuItemsDefault = (): (Electron.MenuItemConstructorOptions | MenuItem)[] => {
        let menu: (Electron.MenuItemConstructorOptions | MenuItem)[] = [
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
        ]

        if (this.settings.environment === environmentEnum.enum.development) {
            menu.forEach(parentOption => {
                if (typeof parentOption.label !== 'undefined') {
                    if (parentOption.label === 'View') {
                        if (typeof parentOption.submenu === 'undefined') {
                            parentOption.submenu = [
                                { role: 'reload' }
                            ]
                        }
                        if (!this.submenuSearchRole('forceReload', parentOption.submenu))
                            parentOption.submenu = this.submenuItemAdd(parentOption.submenu, { role: 'forceReload' })
                        if (!this.submenuSearchRole('toggleDevTools', parentOption.submenu))
                            parentOption.submenu = this.submenuItemAdd(parentOption.submenu, { role: 'toggleDevTools' })
                    }
                }
            })
        }
        return menu
    }

    /**
     * Menu option handler
     * @date 8/8/2023 - 9:42:20 AM
     *
     * @param {TOptionTypesEnum} option
     * @param {?TResolution} [resolutionOverride]
     * @param {?(Electron.MenuItemConstructorOptions | MenuItem)[]} [menuItemsOverride]
     */
    private optionHandler = (option: TOptionTypesEnum, resolutionOverride?: TResolution, menuItemsOverride?: (Electron.MenuItemConstructorOptions | MenuItem)[]): void => {
        switch (option) {
            case optionTypesEnum.enum.about:
                this.overlayLoad(join(__dirname, '../', optionTemplateEnum.enum.about), true, resolutionOverride, menuItemsOverride)
                break
            case optionTypesEnum.enum.overview:
                this.overlayLoad(join(__dirname, '../../../', optionTemplateEnum.enum.overview), true, resolutionOverride, menuItemsOverride)
            default:
                if (this.overlayConfigured())
                    this.overlayClose()
                break
        }
    }

    /**
     * Offset for the overlay display on the x-axis
     * @date 8/8/2023 - 9:42:20 AM
     *
     * @param {number} width
     * @returns {number}
     */
    private offsetX = (width: number): number => {
        if (width === this.settings.resolution.width)
            return 0
        return (this.settings.resolution.width - width) / 2
    }

    /**
     * Offset for the overlay display on the y-axis
     * @date 8/8/2023 - 9:42:20 AM
     *
     * @param {number} height
     * @returns {number}
     */
    private offsetY = (height: number): number => {
        if (height === this.settings.resolution.height)
            return 0
        return (this.settings.resolution.height - height) / 2
    }

    /**
     * Creation of the main menu items
     * @date 8/8/2023 - 9:42:20 AM
     */
    public mainMenuCreate = (): void => {
        this.mainClear()
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
                        click: () => this.optionHandler(optionTypesEnum.Enum.about)
                    },
                    {
                        label: 'Apollo',
                        accelerator: this.isMac ? 'Alt+Cmd+O' : 'Ctrl+Alt+O',
                        click: () => this.optionHandler(optionTypesEnum.Enum.overview)
                    }
                ]
            }
        ]
        this.mainMenu = Menu.buildFromTemplate(this.mainMenuItems)
    }

    /**
     * Retrieve the main menu
     * @date 8/8/2023 - 9:42:20 AM
     *
     * @returns {(Menu | undefined)}
     */
    public mainMenuGet = (): Menu | undefined => this.mainMenu

    /**
     * Loading of an overlay item
     * @date 8/8/2023 - 9:42:20 AM
     *
     * @param {string} contentLocation
     * @param {?boolean} [transparentBg]
     * @param {?TResolution} [res]
     * @param {?(Electron.MenuItemConstructorOptions | MenuItem)[]} [menuItems]
     */
    public overlayLoad = (contentLocation: string, transparentBg?: boolean, res?: TResolution, menuItems?: (Electron.MenuItemConstructorOptions | MenuItem)[]): void => {
        if (this.overlayConfigured())
            this.overlayClose()
        if (this.helper.fileExists(contentLocation)) {
            let transBg = transparentBg || false
            let resolution = res || this.settings.resolution
            this.overlayMenuItems = menuItems || this.overlayMenuItemsDefault()
            this.overlayMenu = Menu.buildFromTemplate(this.overlayMenuItems)
            this.overlay = new BrowserWindow({
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
            })
            this.overlay.setMenu(this.overlayMenu)
            this.overlay.loadURL(contentLocation)
            this.overlay.on('closed', () => this.overlayClose())
        }
    }

    /**
     * Is the overlay window configured?
     * @date 8/8/2023 - 9:42:19 AM
     *
     * @returns {boolean}
     */
    public overlayConfigured = (): boolean => this.overlay !== undefined

    /**
     * Close the overlay window
     * @date 8/8/2023 - 9:42:19 AM
     */
    public overlayClose = (): void => this.overlay = undefined

    /**
     * Get the overlay window instance
     * @date 8/8/2023 - 9:42:19 AM
     *
     * @returns {(BrowserWindow | undefined)}
     */
    public overlayGet = (): BrowserWindow | undefined => this.overlay

    /**
     * Is the device anapple/mac device?
     * @date 8/8/2023 - 9:42:19 AM
     *
     * @returns {boolean}
     */
    public isApple = (): boolean => this.isMac
}
