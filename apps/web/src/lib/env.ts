import * as z from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url().default('http://localhost:3000'),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  console.error('Invalid environment variables:')
  console.error(JSON.stringify(z.treeifyError(parsed.error), null, 2))

  throw new Error('Environment validation failed. Fix the issues listed above.')
}

export const env = parsed.data
