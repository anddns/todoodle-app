import { defineConfig } from 'drizzle-kit'

import { env } from '@/api/shared/settings/env'

export default defineConfig({
  out: './src/shared/database/migrations',
  schema: './src/shared/database/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DB_URL,
  },
  migrations: {
    table: 'migrations',
    schema: 'public',
  },
})
