"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const paths = zod_1.z.object({
    template: zod_1.z.string().nullable()
});
