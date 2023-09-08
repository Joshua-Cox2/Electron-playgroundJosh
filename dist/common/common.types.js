"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = exports.resolution = void 0;
const zod_1 = require("zod");
const common_enums_1 = require("./common.enums");
/**
 * resolution object
 * @date 8/8/2023 - 9:42:51 AM
 *
 * @type {*}
 */
exports.resolution = zod_1.z.object({
    width: zod_1.z.number(),
    height: zod_1.z.number()
});
/**
 * settings object
 * @date 8/8/2023 - 9:42:51 AM
 *
 * @type {*}
 */
exports.settings = zod_1.z.object({
    apiDomain: zod_1.z.string().ip({ version: 'v4' }).default('127.0.0.1'),
    environment: common_enums_1.environmentEnum,
    port: zod_1.z.number().min(1).max(65535).default(3000),
    resolution: exports.resolution.default({
        height: 1080,
        width: 1920
    }),
    templateDir: zod_1.z.string().optional()
});
