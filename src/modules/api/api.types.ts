import { z } from "zod"

export const responseBase = z.object({
    error: z.boolean().default(false),
    errorMsg: z.string().default("")
})

export type TResponseBase = z.infer<typeof responseBase>