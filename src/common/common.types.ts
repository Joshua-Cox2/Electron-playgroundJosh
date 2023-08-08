import { z } from "zod";
import { environmentEnum, ipcActionsEnum, optionTemplateEnum, optionTypesEnum } from "./common.enums";

/**
 * resolution object
 * @date 8/8/2023 - 9:42:51 AM
 *
 * @type {*}
 */
export const resolution = z.object({
    width: z.number(),
    height: z.number()
})

/**
 * settings object
 * @date 8/8/2023 - 9:42:51 AM
 *
 * @type {*}
 */
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

/**
 * Resolution Type
 * @date 8/8/2023 - 9:42:51 AM
 *
 * @export
 * @typedef {TResolution}
 */
export type TResolution = z.infer<typeof resolution>

/**
 * Settings Type
 * @date 8/8/2023 - 9:42:51 AM
 *
 * @export
 * @typedef {TSettings}
 */
export type TSettings = z.infer<typeof settings>

/**
 * Environment ENUM Type
 * @date 8/8/2023 - 9:42:51 AM
 *
 * @export
 * @typedef {TEnvironmentEnum}
 */
export type TEnvironmentEnum = z.infer<typeof environmentEnum>

/**
 * Option template ENUM Type
 * @date 8/8/2023 - 9:42:51 AM
 *
 * @export
 * @typedef {TOptionTemplateEnum}
 */
export type TOptionTemplateEnum = z.infer<typeof optionTemplateEnum>

/**
 * Option type ENUM Type
 * @date 8/8/2023 - 9:42:51 AM
 *
 * @export
 * @typedef {TOptionTypesEnum}
 */
export type TOptionTypesEnum = z.infer<typeof optionTypesEnum>

/**
 * IPC actions ENUM Type
 * @date 8/8/2023 - 9:42:51 AM
 *
 * @export
 * @typedef {TIpcActionsEnum}
 */
export type TIpcActionsEnum = z.infer<typeof ipcActionsEnum>