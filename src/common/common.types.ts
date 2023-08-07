import { z } from "zod";
import { environmentEnum, ipcActionsEnum, optionTemplateEnum, optionTypesEnum } from "./common.enums";

export const resolution = z.object({
    width: z.number(),
    height: z.number()
})

export const settings = z.object({
    apiDomain: z.string().ip({ version: 'v4' }).default('127.0.0.1'),
    environment: environmentEnum,
    port: z.number().min(1).max(65535).default(3000),
    resolution: resolution.default({
        height: 1080,
        width: 1920
    }),
    templateDir: z.string().optional()
})

export type TResolution = z.infer<typeof resolution>

export type TSettings = z.infer<typeof settings>

export type TEnvironmentEnum = z.infer<typeof environmentEnum>

export type TOptionTemplateEnum = z.infer<typeof optionTemplateEnum>

export type TOptionTypesEnum = z.infer<typeof optionTypesEnum>

export type TIpcActionsEnum = z.infer<typeof ipcActionsEnum>