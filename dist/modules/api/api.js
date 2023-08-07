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
class api {
    constructor(settings, helper, application, menus) {
        this.settings = settings;
        this.helper = helper;
        this.application = application;
        this.menus = menus;
        this.responseDefault = () => {
            return api_types_1.responseBase.parse({});
        };
        this.listen = () => {
            this.apiApp.listen(this.settings.port, this.settings.apiDomain, () => {
                this.helper.log('api', `Server is running on ${this.settings.apiDomain}:${this.settings.port}`);
            });
        };
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
