import * as z from 'zod'
import { PRIORITY_LEVELS } from '../priority'

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(PRIORITY_LEVELS).optional(),
  isAllDay: z.boolean().optional(),
  dueAt: z.iso.datetime().optional(),
  completedAt: z.iso.datetime().optional(),
})

export const updateTaskSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional().nullable(),
    priority: z.enum(PRIORITY_LEVELS).optional(),
    isAllDay: z.boolean().optional(),
    dueAt: z.iso.datetime().optional().nullable(),
    completedAt: z.iso.datetime().optional().nullable(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    error: 'At least one of the properties must be provided.',
  })

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
