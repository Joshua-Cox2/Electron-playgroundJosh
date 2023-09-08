"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const common_enums_1 = require("../../common/common.enums");
const api_types_1 = require("./api.types");
/**
 * API Class
 * @date 8/8/2023 - 9:42:31 AM
 *
 * @export
 * @class api
 * @typedef {api}
 */
class api {
    /**
     * Creates an instance of api.
     * @date 8/8/2023 - 9:42:31 AM
     *
     * @constructor
     * @param {TSettings} settings
     * @param {common} helper
     * @param {BrowserWindow} application
     * @param {menu} menus
     */
    constructor(settings, helper, application, menus) {
        this.settings = settings;
        this.helper = helper;
        this.application = application;
        this.menus = menus;
        /**
         * Default response object
         * @date 8/8/2023 - 9:42:31 AM
         *
         * @returns {TResponseBase}
         */
        this.responseDefault = () => {
            return api_types_1.responseBase.parse({});
        };
        /**
         * API bindings configuration
         * @date 8/8/2023 - 9:42:31 AM
         */
        this.listen = () => {
            this.apiApp.listen(this.settings.port, this.settings.apiDomain, () => {
                this.helper.log('api', `Server is running on ${this.settings.apiDomain}:${this.settings.port}`);
            });
        };
        /**
         * API routes configuration
         * @date 8/8/2023 - 9:42:31 AM
         */
        this.routes = () => {
            this.apiApp.get('/', (req, res) => {
                res.send('Hello World!');
            });
            this.apiApp.get('/about', (req, res) => {
                this.menus.overlayLoad((0, path_1.join)(__dirname, '../', common_enums_1.optionTemplateEnum.enum.about), true);
                let response = this.responseDefault();
                if (!this.menus.overlayConfigured()) {
                    response.error = true;
                    response.errorMsg = 'Unable to open about module';
                }
                res.json(response);
            });
            this.apiApp.get('/close', (req, res) => {
                let response = this.responseDefault();
                let tmp = this.menus.overlayGet();
                if (tmp !== undefined)
                    tmp.close();
                this.application.close();
                res.json(response);
            });
            this.apiApp.get('/close/overlay', (req, res) => {
                let response = this.responseDefault();
                let tmp = this.menus.overlayGet();
                if (tmp !== undefined)
                    tmp.close();
                else {
                    response.error = true;
                    response.errorMsg = 'Overlay is not in use';
                }
                res.json(response);
            });
            this.apiApp.get('/close/application', (req, res) => {
                let response = this.responseDefault();
                this.application.close();
                res.json(response);
            });
        };
        this.apiApp = (0, express_1.default)();
        this.routes();
        this.listen();
    }
}
exports.api = api;
