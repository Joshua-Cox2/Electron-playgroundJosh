import { BrowserWindow, Menu } from "electron";
import { join } from "path"
import { common } from "../../common/common";
import { TSettings } from "../../common/common.types";
import { environmentEnum } from "../../common/common.enums";
import { BACKGROUND_DEFAULT } from "../../common/common.defaults";

/**
 * Main electron window for displaying the core content.
 * @date 8/8/2023 - 9:42:14 AM
 *
 * @export
 * @class template
 * @typedef {template}
 */
export class template {
    /**
     * Path to the core folder
     * @date 8/8/2023 - 9:42:14 AM
     *
     * @private
     * @type {string}
     */
    private path: string
    /**
     * Reference for the main browser window
     * @date 8/8/2023 - 9:42:14 AM
     *
     * @private
     * @type {(BrowserWindow | undefined)}
     */
    private window: BrowserWindow | undefined

    /**
     * Constructor for the template class
     * @date 8/8/2023 - 9:42:14 AM
     *
     * @constructor
     * @param {TSettings} settings
     * @param {common} helper
     */
    constructor(private settings: TSettings, private helper: common) {
        this.path = join(__dirname, 'template.default.html')
        if (this.helper.fileExists(settings.templateDir))
            this.path = `${settings.templateDir}/index1.html`
        this.helper.log('template constructor', 'path', this.path)
    }

    /**
     * Configure the main template display
     * @date 8/8/2023 - 9:42:14 AM
     */
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

    /**
     * Load the content for the main template
     * @date 8/8/2023 - 9:42:14 AM
     */
    public loadContent = (): void => {
        if (this.window !== undefined)
            this.window.loadURL(this.path)
    }

    /**
     * Get the main template window
     * @date 8/8/2023 - 9:42:14 AM
     *
     * @returns {(BrowserWindow | undefined)}
     */
    public windowGet = (): BrowserWindow | undefined => this.window

    /**
     * Mutate the main template window
     * @date 8/8/2023 - 9:42:14 AM
     *
     * @param {(BrowserWindow | undefined)} window
     */
    public windowMutate = (window: BrowserWindow | undefined): void => {
        this.window = window
    }
    /**
     * Update the menu for the main window
     * @date 8/8/2023 - 9:42:14 AM
     *
     * @param {Menu} menu
     */
    public menuSet = (menu: Menu): void => {
        if (this.window !== undefined)
            this.window.setMenu(menu)
    }
}
