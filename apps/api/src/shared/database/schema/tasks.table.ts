import { sql } from 'drizzle-orm'
import { snakeCase, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const tasksTable = snakeCase.table('tasks', {
  id: uuid('id').primaryKey().default(sql`uuidv7()`),
  title: text('title').notNull(),
  description: text('description'),
  completedAt: timestamp('completed_at', { mode: 'string', withTimezone: true }),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
})

export type Task = typeof tasksTable.$inferSelect
export type NewTask = typeof tasksTable.$inferInsert
