"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
const api_1 = require("../api/api");
const menu_1 = require("../menu/menu");
const template_1 = require("../template/template");
class core {
    constructor(settings, helper) {
        this.settings = settings;
        this.helper = helper;
        this.template = new template_1.template(this.settings, this.helper);
    }
    launch() {
        this.template.configure();
        if (this.template.windowGet() !== undefined) {
            this.menu = new menu_1.menu(this.settings, this.helper, this.template.windowGet());
            this.menu.mainMenuCreate();
            let templateWindow = this.template.windowGet();
            let mainMenu = this.menu.mainMenuGet();
            if (mainMenu !== undefined) {
                this.template.menuSet(this.menu.mainMenuGet());
            }
            this.api = new api_1.api(this.settings, this.helper, this.template.windowGet(), this.menu);
            this.template.loadContent();
        }
    }
}
exports.core = core;
