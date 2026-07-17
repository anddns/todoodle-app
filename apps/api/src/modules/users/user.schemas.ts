import * as z from 'zod'

import type { usersTable } from '@/api/shared/database/schema/users.table'

export const userSchema = z.object({
  id: z.uuidv7(),
  email: z.email().min(1),
  name: z.string(),
  password: z.string(),
  verifiedAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
})

export const userParamsSchema = z.object({
  id: z.uuidv7(),
})

export const listUsersQuerySchema = z.object({
  status: z.enum(['all', 'unverified', 'verified']).default('all'),
  sortBy: z.enum(['createdAt', 'verifiedAt', 'email', 'name']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
})

export type User = typeof usersTable.$inferSelect
export type UserParamsInput = z.infer<typeof userParamsSchema>
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>
