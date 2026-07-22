import { PROJECT_COLORS } from '@todoodle-app/shared'
import { sql } from 'drizzle-orm'
import { pgEnum, snakeCase, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const projectColorEnum = pgEnum('project_color', PROJECT_COLORS)

export const projectsTable = snakeCase.table('projects', {
  id: uuid('id').primaryKey().default(sql`uuidv7()`),
  name: text('name').notNull(),
  description: text('description'),
  color: projectColorEnum('color').default('#246FE0').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
})

export type Project = typeof projectsTable.$inferSelect
export type NewProject = typeof projectsTable.$inferInsert
