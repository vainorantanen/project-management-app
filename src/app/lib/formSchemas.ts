import { z } from "zod"

export const FormSchemaAddWorkspace= z.object({
    description: z.coerce.string(),
    title: z.coerce.string()
  })

export const FormSchemaAddTable = z.object({
    description: z.coerce.string(),
    title: z.coerce.string()
  })

  export const FormSchemaAddCategory= z.object({
    category: z.coerce.string()
  })