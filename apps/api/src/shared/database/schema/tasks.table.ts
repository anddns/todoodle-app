import { PRIORITY_LEVELS } from '@todoodle-app/shared'
import { sql } from 'drizzle-orm'
import { date, pgEnum, snakeCase, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const priorityEnum = pgEnum('priority', PRIORITY_LEVELS)

export const tasksTable = snakeCase.table('tasks', {
  id: uuid('id').primaryKey().default(sql`uuidv7()`),
  title: text('title').notNull(),
  description: text('description'),
  priority: priorityEnum('priority').default('p4'),
  dueOn: date('due_on', { mode: 'string' }),
  dueAt: timestamp('due_at', { mode: 'string', withTimezone: true }),
  completedAt: timestamp('completed_at', { mode: 'string', withTimezone: true }),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
})

export type Task = typeof tasksTable.$inferSelect
export type NewTask = typeof tasksTable.$inferInsert
