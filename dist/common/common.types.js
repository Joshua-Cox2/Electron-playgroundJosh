"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const common_enums_1 = require("./common.enums");
const settings = zod_1.z.object({
    apiDomain: zod_1.z.string().ip({ version: 'v4' }),
    environment: common_enums_1.environmentEnum
});
