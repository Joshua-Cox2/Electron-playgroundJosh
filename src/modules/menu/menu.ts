import { BrowserWindow, Menu, MenuItem, ipcMain } from "electron";
import { join } from "path";
import { common } from "../../common/common";
import { environmentEnum, ipcActionsEnum, optionTemplateEnum, optionTypesEnum } from "../../common/common.enums";
import { TOptionTypesEnum, TResolution, TSettings } from "../../common/common.types";
import { BACKGROUND_DEFAULT } from "../../common/common.defaults";

export class menu {
    private ipc: Electron.IpcMain
    private isMac: boolean
    private mainMenu: Menu | undefined
    private mainMenuItems: (Electron.MenuItemConstructorOptions | MenuItem)[]
    private overlay: BrowserWindow | undefined
    private overlayMenu: Menu | undefined
    private overlayMenuItems: (Electron.MenuItemConstructorOptions | MenuItem)[]

    constructor(private settings: TSettings, private helper: common, private application: BrowserWindow) {
        this.mainMenuItems = []
        this.overlayMenuItems = []
        this.isMac = process.platform === 'darwin'
        this.ipc = ipcMain
        this.eventListenersInit()
    }

    private eventListenersInit = (): void => {
        this.ipc.on(ipcActionsEnum.enum.optionClose, (event: Electron.IpcMainEvent, data: any[]) => {
            if (this.overlayConfigured())
                this.overlayClose()
        })
    }

    private mainClear = (): void => {
        this.mainMenu = undefined
        this.mainMenuItems = []
    }

    private overlayClear = (): void => {
        this.overlay = undefined
        this.overlayMenu = undefined
        this.overlayMenuItems = []
    }

    private submenuSearchRole = (role: string, submenu): boolean => {
        let found: boolean = false

        submenu.forEach(item => {
            if (typeof item.role !== 'undefined')
                if (item.role === role)
                    found = true
        })

        return found
    }

    private submenuItemAdd = (submenu: Menu | Electron.MenuItemConstructorOptions[], item: Electron.MenuItemConstructorOptions): Menu | Electron.MenuItemConstructorOptions[] => {
        let submenuTmp: any | any[] = submenu
        submenuTmp.push(item)
        return submenuTmp
    }

    private overlayMenuItemsDefault = (): (Electron.MenuItemConstructorOptions | MenuItem)[] => {
        let menu: (Electron.MenuItemConstructorOptions | MenuItem)[] =  [
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

    private optionHandler = (option: TOptionTypesEnum, resolutionOverride?: TResolution, menuItemsOverride?: (Electron.MenuItemConstructorOptions | MenuItem)[]): void => {
        switch (option) {
            case optionTypesEnum.enum.about:
                this.overlayLoad(join(__dirname, '../', optionTemplateEnum.enum.about), resolutionOverride, menuItemsOverride)
                break
            default:
                if (this.overlayConfigured())
                    this.overlayClose()
                break
        }
    }

    private offsetX = (width: number): number => {
        if (width === this.settings.resolution.width)
            return 0
        return (this.settings.resolution.width - width) / 2
    }

    private offsetY = (height: number): number => {
        if (height === this.settings.resolution.height)
            return 0
        return (this.settings.resolution.height - height) / 2
    }

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
                    }
                ]
            }
        ]
        this.mainMenu = Menu.buildFromTemplate(this.mainMenuItems)
    }

    public mainMenuGet = (): Menu | undefined => this.mainMenu

    public overlayLoad = (contentLocation: string, res?: TResolution, menuItems?: (Electron.MenuItemConstructorOptions | MenuItem)[]): void => {
        if (this.overlayConfigured())
            this.overlayClose()
        if (this.helper.fileExists(contentLocation)) {
            let resolution = res || this.settings.resolution
            this.overlayMenuItems = menuItems || this.overlayMenuItemsDefault()
            this.overlayMenu = Menu.buildFromTemplate(this.overlayMenuItems)
            this.overlay = new BrowserWindow({
                backgroundColor: BACKGROUND_DEFAULT,
                x: this.offsetX(resolution.width),
                y: this.offsetY(resolution.height),
                width: resolution.width,
                height: resolution.height,
                modal: true,
                frame: (this.settings.environment === environmentEnum.enum.development) ? true : false,
                webPreferences: {
                    nodeIntegration: true,
                    devTools: true,
                    contextIsolation: false,
                }
            })
            this.overlay.setBackgroundColor(BACKGROUND_DEFAULT)
            this.overlay.setMenu(this.overlayMenu)
            this.overlay.loadURL(contentLocation)
            this.overlay.on('closed', () => this.overlayClose())
        }
    }

    public overlayConfigured = (): boolean => this.overlay !== undefined

    public overlayClose = (): void => this.overlay = undefined

    public isApple = (): boolean => this.isMac
}