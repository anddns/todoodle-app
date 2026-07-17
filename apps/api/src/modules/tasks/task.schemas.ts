import { PRIORITY_LEVELS } from '@todoodle-app/shared'
import * as z from 'zod'

import type { tasksTable } from '@/api/shared/database/schema/tasks.table'

export const taskSchema = z.object({
  id: z.uuidv7(),
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(PRIORITY_LEVELS).optional(),
  dueOn: z.iso.datetime().optional(),
  dueAt: z.iso.datetime().optional(),
  completedAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
})

export const taskParamsSchema = z.object({
  id: z.uuidv7(),
})

export const listTasksQuerySchema = z.object({
  status: z.enum(['all', 'pending', 'completed']).default('all'),
  sortBy: z.enum(['createdAt', 'title']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
})

export type Task = typeof tasksTable.$inferSelect
export type TaskParamsInput = z.infer<typeof taskParamsSchema>
export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>
