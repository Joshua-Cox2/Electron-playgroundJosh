import { z } from "zod";

export const environmentEnum = z.enum(['development', 'production']);

const OPTIONTYPES = ['about'] as const

const IPCACTIONS = ['optionClose'] as const

enum optionTemplate {
    /**
     * About module template
     */
    'about' = 'about/about.page.html'
}

export const optionTemplateEnum = z.nativeEnum(optionTemplate)

export const optionTypesEnum = z.enum(OPTIONTYPES)

export const ipcActionsEnum = z.enum(IPCACTIONS)