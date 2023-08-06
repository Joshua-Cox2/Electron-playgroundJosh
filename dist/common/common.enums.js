"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentEnum = void 0;
const zod_1 = require("zod");
exports.environmentEnum = zod_1.z.enum(['development', 'production']);
