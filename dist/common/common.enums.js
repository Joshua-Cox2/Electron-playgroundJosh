"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipcActionsEnum = exports.optionTypesEnum = exports.optionTemplateEnum = exports.environmentEnum = void 0;
const zod_1 = require("zod");
/**
 * Environment ENUM - Options
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {*}
 */
exports.environmentEnum = zod_1.z.enum(['development', 'production']);
/**
 * Overlay Options Array
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {readonly ["about"]}
 */
const OPTIONTYPES = ['about'];
/**
 * IPC Actions Array
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {readonly ["optionClose"]}
 */
const IPCACTIONS = ['optionClose'];
/**
 * Overlay content reference Original ENUM
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @enum {number}
 */
var optionTemplate;
(function (optionTemplate) {
    /**
     * About module template
     */
    optionTemplate["about"] = "about/about.page.html";
})(optionTemplate || (optionTemplate = {}));
/**
 * Overlay content reference ENUM - ZOD
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {*}
 */
exports.optionTemplateEnum = zod_1.z.nativeEnum(optionTemplate);
/**
 * Option Types ENUM
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {*}
 */
exports.optionTypesEnum = zod_1.z.enum(OPTIONTYPES);
/**
 * IPC Actions ENUM
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {*}
 */
exports.ipcActionsEnum = zod_1.z.enum(IPCACTIONS);
