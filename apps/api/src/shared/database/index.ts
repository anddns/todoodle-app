import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// import { schema } from '@/api/shared/database/schema'
import { env } from '@/api/shared/settings/env'

export const pool = new Pool({ connectionString: env.DB_URL })
export const database = drizzle({ client: pool })

export type DrizzleDatabase = typeof database
