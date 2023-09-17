import { common } from "../../common/common";
import { TSettings } from "../../common/common.types";
import { api } from "../api/api";
import { menu } from "../menu/menu";
import { template } from "../template/template";

/**
 * Core application class
 * @date 8/8/2023 - 9:42:27 AM
 *
 * @export
 * @class core
 * @typedef {core}
 */
export class core {
    /**
     * Template class instance
     * @date 8/8/2023 - 9:42:27 AM
     *
     * @private
     * @type {(template | undefined)}
     */
    private template: template | undefined
    /**
     * Menu class instance
     * @date 8/8/2023 - 9:42:27 AM
     *
     * @private
     * @type {(menu | undefined)}
     */
    private menu: menu | undefined
    /**
     * API class instance
     * @date 8/8/2023 - 9:42:26 AM
     *
     * @private
     * @type {(api | undefined)}
     */
    private api: api | undefined

    /**
     * Creates an instance of core.
     * @date 8/8/2023 - 9:42:26 AM
     *
     * @constructor
     * @param {TSettings} settings
     * @param {common} helper
     */
    constructor(private settings: TSettings, private helper: common) {
        this.template = new template(this.settings, this.helper)
    }

    /**
     * Launch the application
     * Time to take off!
     * @date 8/8/2023 - 9:42:26 AM
     *
     * @public
     */
    public launch(): void {
        this.template.configure()
        if (this.template.windowGet() !== undefined) {
            this.menu = new menu(this.settings, this.helper, this.template.windowGet())
            this.menu.mainMenuCreate()
            let templateWindow = this.template.windowGet()
            let mainMenu = this.menu.mainMenuGet()
            if (mainMenu !== undefined) {
                this.template.menuSet(this.menu.mainMenuGet())
            }
            this.api = new api(this.settings, this.helper, this.template.windowGet(), this.menu)
            this.template.loadContent()
        }
    }
}