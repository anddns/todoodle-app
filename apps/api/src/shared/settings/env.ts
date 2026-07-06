import * as z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.literal(['development', 'production', 'test']),
  LOG_LEVEL: z.literal(['fatal', 'error', 'warn', 'info', 'debug']).default('info'),
  PORT: z.coerce.number().positive().default(3000),
  HOST: z.string().default('localhost'),
  // DB_URL: z.url('DB_URL must be a valid URL').startsWith('postgresql://'),
  DB_URL: z.string('DB_URL must be a valid URL'),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number().positive(),
  DB_HOST: z.string(),
  JWT_SECRET: z.string().min(32),
})

const parsed = envSchema.safeParse(Bun.env)

if (!parsed.success) {
  console.error('Invalid environment variables:')
  console.error(JSON.stringify(z.treeifyError(parsed.error), null, 2))

  throw new Error('Environment validation failed. Fix the issues listed above.')
}

export const env = parsed.data
