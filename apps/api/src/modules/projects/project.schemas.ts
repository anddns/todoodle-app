import * as z from 'zod'

import type { projectsTable } from '@/api/shared/database/schema/projects.table'

export const projectParamsSchema = z.object({
  id: z.uuidv7(),
})

export const listProjectsQuerySchema = z.object({
  sortBy: z.enum(['createdAt', 'name']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
})

export type Project = typeof projectsTable.$inferSelect
export type ProjectParamsInput = z.infer<typeof projectParamsSchema>
export type ListProjectsQuery = z.infer<typeof listProjectsQuerySchema>
