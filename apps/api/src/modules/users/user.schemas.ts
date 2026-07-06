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

export const publicUserSchema = z.object({
  email: z.email().min(1),
  name: z.string(),
  isVerified: z.boolean(),
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

export const createUserSchema = z.object({
  email: z.email().min(1),
  name: z.string(),
  password: z.string(),
  verifiedAt: z.iso.datetime().optional(),
})

export const updateUserSchema = z
  .object({
    email: z.email().min(1).optional(),
    name: z.string().optional(),
    password: z.string().optional(),
    verifiedAt: z.iso.datetime().nullable().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    error: 'At least one of the properties must be provided.',
  })

export type User = typeof usersTable.$inferSelect
export type PublicUser = z.infer<typeof publicUserSchema>
export type UserParamsInput = z.infer<typeof userParamsSchema>
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
