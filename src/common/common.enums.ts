import { z } from "zod";

export const environmentEnum = z.enum(['development', 'production']);