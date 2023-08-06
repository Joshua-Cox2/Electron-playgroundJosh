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
        
    }

    public launch(): void {
        
    }
}