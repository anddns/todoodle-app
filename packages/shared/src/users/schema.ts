import * as z from 'zod'

export const publicUserSchema = z.object({
  email: z.email().min(1),
  name: z.string(),
  isVerified: z.boolean(),
  updatedAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
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

export type PublicUser = z.infer<typeof publicUserSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
