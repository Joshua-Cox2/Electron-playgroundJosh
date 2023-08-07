import { BrowserWindow } from "electron";
import { common } from "../../common/common";
import { TSettings } from "../../common/common.types";
import { menu } from "../menu/menu";

export class api {
    constructor(private settings: TSettings, private helper: common, private application: BrowserWindow, private menus: menu) { }
}