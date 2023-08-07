import { BrowserWindow, Menu } from "electron";
import { join } from "path"
import { common } from "../../common/common";
import { TSettings } from "../../common/common.types";
import { environmentEnum } from "../../common/common.enums";
import { BACKGROUND_DEFAULT } from "../../common/common.defaults";

export class template {
    private path: string
    private window: BrowserWindow | undefined

    constructor(private settings: TSettings, private helper: common) {
        this.path = join(__dirname, 'template.default.html')
        if (this.helper.fileExists(settings.templateDir))
            this.path = settings.templateDir
        this.helper.log('template constructor', 'path', this.path)
    }

    public configure = (): void => {
        this.window = new BrowserWindow({
            backgroundColor: BACKGROUND_DEFAULT,
            frame: (this.settings.environment === environmentEnum.enum.development) ? true : false,
            title: "Electron Playground",
            x: 0,
            y: 0,
            width: this.settings.resolution.width,
            height: this.settings.resolution.height,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: (this.settings.environment === environmentEnum.enum.development) ? true : false,
            }
        })
        this.window.setBackgroundColor(BACKGROUND_DEFAULT)
    }

    public loadContent = (): void => {
        if (this.window !== undefined)
            this.window.loadURL(this.path)
    }

    public windowGet = (): BrowserWindow | undefined => this.window

    public windowMutate = (window: BrowserWindow | undefined): void => {
        this.window = window
    }
    public menuSet = (menu: Menu): void => {
        if (this.window !== undefined)
            this.window.setMenu(menu)
    }
}