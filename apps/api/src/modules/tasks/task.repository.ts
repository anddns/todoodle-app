import { asc, count, desc, eq, isNotNull, isNull } from 'drizzle-orm'

import type {
  CreateTaskInput,
  ListTasksQuery,
  Task,
  UpdateTaskInput,
} from '@/api/modules/tasks/task.schemas'
import type { DrizzleDatabase } from '@/api/shared/database'
import { tasksTable } from '@/api/shared/database/schema/tasks.table'
import { DatabaseError } from '@/api/shared/errors/infrastructure-error'

export type ITaskRepository = {
  findAll(query: ListTasksQuery): Promise<{ data: Task[]; total: number }>
  findById(id: string): Promise<Task | null>
  create(data: CreateTaskInput): Promise<Task>
  update(id: string, data: UpdateTaskInput): Promise<Task | null>
  delete(id: string): Promise<boolean>
}

export class TaskRepository implements ITaskRepository {
  public constructor(private readonly database: DrizzleDatabase) {}

  async findAll(query: ListTasksQuery): Promise<{ data: Task[]; total: number }> {
    const { status, sortBy, sortOrder, limit, offset } = query

    const whereClause =
      status === 'pending'
        ? isNull(tasksTable.completedAt)
        : status === 'completed'
          ? isNotNull(tasksTable.completedAt)
          : undefined

    const orderColumn = sortBy === 'title' ? tasksTable.title : tasksTable.createdAt

    const orderClause = sortOrder === 'asc' ? asc(orderColumn) : desc(orderColumn)

    const [data, totalResult] = await Promise.all([
      this.database
        .select()
        .from(tasksTable)
        .where(whereClause)
        .orderBy(orderClause)
        .limit(limit)
        .offset(offset),
      this.database.select({ total: count() }).from(tasksTable).where(whereClause),
    ])

    return { data, total: totalResult[0] ? totalResult[0].total : 0 }
  }

  async findById(id: string): Promise<Task | null> {
    const [task] = await this.database.select().from(tasksTable).where(eq(tasksTable.id, id))

    return task ?? null
  }

  async create(data: CreateTaskInput): Promise<Task> {
    const [task] = await this.database.insert(tasksTable).values(data).returning()

    if (!task) throw new DatabaseError(`Database error: Failed to create user record`)

    return task
  }

  async update(id: string, data: UpdateTaskInput): Promise<Task | null> {
    const [task] = await this.database
      .update(tasksTable)
      .set(data)
      .where(eq(tasksTable.id, id))
      .returning()

    return task ?? null
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.database
      .delete(tasksTable)
      .where(eq(tasksTable.id, id))
      .returning({ id: tasksTable.id })

    return result.length > 0
  }
}
