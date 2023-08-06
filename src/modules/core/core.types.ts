import { z } from 'zod'
const paths = z.object({
    template: z.string().nullable()
})

export type TPaths = z.infer<typeof paths>