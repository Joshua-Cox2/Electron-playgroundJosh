"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.common = void 0;
const fs_1 = require("fs");
const common_enums_1 = require("./common.enums");
/**
 * Common helper class
 * @date 8/8/2023 - 9:42:39 AM
 *
 * @export
 * @class common
 * @typedef {common}
 */
class common {
    /**
     * Creates an instance of common.
     * @date 8/8/2023 - 9:42:39 AM
     *
     * @constructor
     * @param {TEnvironmentEnum} env
     */
    constructor(env) {
        this.env = env;
        /**
         * Check to see if the provided error is a Zod Error
         * @date 8/8/2023 - 9:42:38 AM
         *
         * @param {(ZodError | Error)} arg
         * @returns {arg is ZodError}
         */
        this.isZodError = (arg) => {
            return arg.issues !== undefined;
        };
        /**
         * Generic error console display
         * @date 8/8/2023 - 9:42:38 AM
         *
         * @param {Error} arg
         */
        this.defaultError = (arg) => {
            console.error(`ERROR ${arg.name} ::: ${arg.message}`, arg.stack);
        };
        /**
         * Zod Error console display
         * @date 8/8/2023 - 9:42:38 AM
         *
         * @param {ZodError} arg
         */
        this.zodError = (arg) => {
            arg.errors.forEach((issue) => {
                console.error(`ERROR ${issue.code} ::: ${issue.message}, `, issue);
            });
        };
        /**
         * Environment setting mutation
         * @date 8/8/2023 - 9:42:38 AM
         *
         * @param {TEnvironmentEnum} env
         */
        this.envMutate = (env) => {
            this.env = env;
            console.log('helper ::: env', this.env);
        };
        /**
         * Generic log message display
         * @date 8/8/2023 - 9:42:38 AM
         *
         * @param {?string} [identifier]
         * @param {?string} [variable]
         * @param {?*} [value]
         */
        this.log = (identifier, variable, value) => {
            let a = identifier || "";
            let b = variable || "";
            let c = value || "";
            if (this.env === common_enums_1.environmentEnum.Enum.development)
                console.log(`${a} ::: ${b}`, c);
        };
        /**
         * Error handler
         * @date 8/8/2023 - 9:42:38 AM
         *
         * @param {(ZodError | Error)} error
         */
        this.error = (error) => {
            if (this.isZodError(error))
                this.zodError(error);
            else
                this.defaultError(error);
        };
        /**
         * Does the folder/file exist at the desired path?
         * @date 8/8/2023 - 9:42:38 AM
         *
         * @param {string} path
         * @returns {boolean}
         */
        this.fileExists = (path) => (0, fs_1.existsSync)(path);
        /**
         * Load the desired file
         * @date 8/8/2023 - 9:42:38 AM
         *
         * @param {string} path
         * @returns {string}
         */
        this.loadFile = (path) => (0, fs_1.readFileSync)(path, { encoding: 'utf-8' });
    }
}
exports.common = common;
