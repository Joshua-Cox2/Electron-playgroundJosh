"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.common = void 0;
const common_enums_1 = require("./common.enums");
class common {
    constructor(env) {
        this.env = env;
    }
    log(identifier, variable, value) {
        let a = identifier || "";
        let b = variable || "";
        let c = value || "";
        if (this.env === common_enums_1.environmentEnum.Enum.development)
            console.log(`${a} ::: ${b}`, c);
    }
}
exports.common = common;
