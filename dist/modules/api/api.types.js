"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseBase = void 0;
const zod_1 = require("zod");
/**
 * Base response schema
 * @date 8/8/2023 - 9:42:35 AM
 *
 * @type {*}
 */
exports.responseBase = zod_1.z.object({
    error: zod_1.z.boolean().default(false),
    errorMsg: zod_1.z.string().default("")
});
