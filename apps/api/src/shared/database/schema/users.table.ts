import { sql } from 'drizzle-orm'
import { snakeCase, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const usersTable = snakeCase.table('users', {
  id: uuid('id').primaryKey().default(sql`uuidv7()`),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  verifiedAt: timestamp('verified_at', { mode: 'string', withTimezone: true }),
  password: text('password').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
})

export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert
