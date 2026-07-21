import * as z from 'zod'
import { projectColorSchema } from '../projects/color'

export const createProjectSchema = z.object({
  name: z.string().min(1),
  color: projectColorSchema.optional(),
})

export const updateProjectSchema = z
  .object({
    name: z.string().min(1).optional(),
    color: projectColorSchema.optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    error: 'At least one of the properties must be provided.',
  })

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
