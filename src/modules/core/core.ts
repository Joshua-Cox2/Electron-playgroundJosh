import { common } from "../../common/common";
import { TSettings } from "../../common/common.types";
import { api } from "../api/api";
import { menu } from "../menu/menu";
import { template } from "../template/template";

export class core {
    private template: template | undefined
    private menu: menu | undefined
    private api: api | undefined

    constructor(private settings: TSettings, private helper: common) {
        this.template = new template(this.settings, this.helper)
    }

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