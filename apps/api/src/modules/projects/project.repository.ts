import type { CreateProjectInput, UpdateProjectInput } from '@todoodle-app/shared'
import { asc, count, desc, eq } from 'drizzle-orm'

import type { ListProjectsQuery, Project } from '@/api/modules/projects/project.schemas'
import type { DrizzleDatabase } from '@/api/shared/database'
import { projectsTable } from '@/api/shared/database/schema/projects.table'
import { DatabaseError } from '@/api/shared/errors/infrastructure-error'

export type IProjectRepository = {
  findAll(query: ListProjectsQuery): Promise<{ projects: Project[]; total: number }>
  findById(id: string): Promise<Project | null>
  create(data: CreateProjectInput): Promise<Project>
  update(id: string, data: UpdateProjectInput): Promise<Project | null>
  delete(id: string): Promise<boolean>
  reset(): Promise<boolean>
}

export class ProjectRepository implements IProjectRepository {
  public constructor(private readonly database: DrizzleDatabase) {}

  async findAll(query: ListProjectsQuery): Promise<{ projects: Project[]; total: number }> {
    const { sortBy, sortOrder, limit, offset } = query

    const orderColumn = sortBy === 'name' ? projectsTable.name : projectsTable.createdAt

    const orderClause = sortOrder === 'asc' ? asc(orderColumn) : desc(orderColumn)

    const [data, totalResult] = await Promise.all([
      this.database.select().from(projectsTable).orderBy(orderClause).limit(limit).offset(offset),
      this.database.select({ total: count() }).from(projectsTable),
    ])

    return { projects: data, total: totalResult[0] ? totalResult[0].total : 0 }
  }

  async findById(id: string): Promise<Project | null> {
    const [project] = await this.database
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id))

    return project ?? null
  }

  async create(data: CreateProjectInput): Promise<Project> {
    const [project] = await this.database.insert(projectsTable).values(data).returning()

    if (!project) throw new DatabaseError(`Database error: Failed to create project record`)

    return project
  }

  async update(id: string, data: UpdateProjectInput): Promise<Project | null> {
    const [project] = await this.database
      .update(projectsTable)
      .set(data)
      .where(eq(projectsTable.id, id))
      .returning()

    return project ?? null
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.database
      .delete(projectsTable)
      .where(eq(projectsTable.id, id))
      .returning({ id: projectsTable.id })

    return result.length > 0
  }

  async reset(): Promise<boolean> {
    const result = await this.database.delete(projectsTable).returning()

    return result.length > 0
  }
}
