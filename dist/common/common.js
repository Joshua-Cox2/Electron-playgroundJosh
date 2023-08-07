"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.common = void 0;
const common_enums_1 = require("./common.enums");
class common {
    constructor(env) {
        this.env = env;
        this.isZodError = (arg) => {
            return arg.issues !== undefined;
        };
        this.defaultError = (arg) => {
            console.error(`ERROR ${arg.name} ::: ${arg.message}`, arg.stack);
        };
        this.zodError = (arg) => {
            arg.errors.forEach((issue) => {
                console.error(`ERROR ${issue.code} ::: ${issue.message}, `, issue);
            });
        };
        this.envMutate = (env) => {
            this.env = env;
            console.log('helper ::: env', this.env);
        };
        this.log = (identifier, variable, value) => {
            let a = identifier || "";
            let b = variable || "";
            let c = value || "";
            if (this.env === common_enums_1.environmentEnum.Enum.development)
                console.log(`${a} ::: ${b}`, c);
        };
        this.error = (error) => {
            if (this.isZodError(error))
                this.zodError(error);
            else
                this.defaultError(error);
        };
    }
}
exports.common = common;
