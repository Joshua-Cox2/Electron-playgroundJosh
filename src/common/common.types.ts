import { z } from "zod";
import { environmentEnum } from "./common.enums";

export const settings = z.object({
    apiDomain: z.string().ip({ version: 'v4' }).default('127.0.0.1'),
    environment: environmentEnum,
    port: z.number().min(1).max(65535).default(3000),
    resolution: z.object({
        width: z.number(),
        height: z.number()
    }).default({
        height: 1080,
        width: 1920
    })
})

export type TSettings = z.infer<typeof settings>

export type TEnvironmentEnum = z.infer<typeof environmentEnum>