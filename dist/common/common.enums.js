"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipcActionsEnum = exports.optionTypesEnum = exports.optionTemplateEnum = exports.environmentEnum = void 0;
const zod_1 = require("zod");
exports.environmentEnum = zod_1.z.enum(['development', 'production']);
const OPTIONTYPES = ['about'];
const IPCACTIONS = ['optionClose'];
var optionTemplate;
(function (optionTemplate) {
    /**
     * About module template
     */
    optionTemplate["about"] = "about/about.page.html";
})(optionTemplate || (optionTemplate = {}));
exports.optionTemplateEnum = zod_1.z.nativeEnum(optionTemplate);
exports.optionTypesEnum = zod_1.z.enum(OPTIONTYPES);
exports.ipcActionsEnum = zod_1.z.enum(IPCACTIONS);
