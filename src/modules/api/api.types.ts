import { z } from "zod"

/**
 * Base response schema
 * @date 8/8/2023 - 9:42:35 AM
 *
 * @type {*}
 */
export const responseBase = z.object({
    error: z.boolean().default(false),
    errorMsg: z.string().default("")
})

/**
 * Base response type
 * @date 8/8/2023 - 9:42:35 AM
 *
 * @export
 * @typedef {TResponseBase}
 */
export type TResponseBase = z.infer<typeof responseBase>

/**
 * Data.json response type
 *
 * @export
 * @typedef {TResponseDataJson}
 */
export type TResponseDataJson = TResponseBase & {
    data: any
}
