"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseBase = void 0;
const zod_1 = require("zod");
exports.responseBase = zod_1.z.object({
    error: zod_1.z.boolean().default(false),
    errorMsg: zod_1.z.string().default("")
});
