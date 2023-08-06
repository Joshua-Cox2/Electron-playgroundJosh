import { z } from "zod";
import { environmentEnum } from "./common.enums";

const settings = z.object({
    apiDomain: z.string().ip({ version: 'v4' }),
    environment: environmentEnum
})

export type TSettings = z.infer<typeof settings>

export type TEnvironmentEnum = z.infer<typeof environmentEnum>