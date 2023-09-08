import { z } from "zod";

/**
 * Environment ENUM - Options
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {*}
 */
export const environmentEnum = z.enum(['development', 'production']);

/**
 * Overlay Options Array
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {readonly ["about", "overview"]}
 */
const OPTIONTYPES = ['about', 'overview'] as const

/**
 * IPC Actions Array
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {readonly ["optionClose"]}
 */
const IPCACTIONS = ['optionClose'] as const

/**
 * Overlay content reference Original ENUM
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @enum {number}
 */
enum optionTemplate {
    /**
     * About module template
     */
    'about' = 'about/about.page.html',
    /**
     * Overview module template
     */
    'overview' = 'submodules/apollo/build/index.html'
}

/**
 * Overlay content reference ENUM - ZOD
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {*}
 */
export const optionTemplateEnum = z.nativeEnum(optionTemplate)

/**
 * Option Types ENUM
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {*}
 */
export const optionTypesEnum = z.enum(OPTIONTYPES)

/**
 * IPC Actions ENUM
 * @date 8/8/2023 - 9:42:47 AM
 *
 * @type {*}
 */
export const ipcActionsEnum = z.enum(IPCACTIONS)
