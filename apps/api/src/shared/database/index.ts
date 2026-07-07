import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { env } from '@/api/shared/settings/env'

export const pool = new Pool({ connectionString: env.DB_URL })
export const database = drizzle({ client: pool, logger: false })

export type DrizzleDatabase = typeof database
