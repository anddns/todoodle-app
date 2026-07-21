import type { CreateProjectInput, UpdateProjectInput } from '@todoodle-app/shared'
import type { IProjectRepository } from '@/api/modules/projects/project.repository'
import type { ListProjectsQuery, Project } from '@/api/modules/projects/project.schemas'
import { NotFoundError } from '@/api/shared/errors/app-error'

export interface IProjectService {
  list(query: ListProjectsQuery): Promise<{ projects: Project[]; total: number }>
  getById(id: string): Promise<Project>
  create(input: CreateProjectInput): Promise<Project>
  update(id: string, data: UpdateProjectInput): Promise<Project>
  delete(id: string): Promise<void>
}

export class ProjectService implements IProjectService {
  public constructor(private readonly repository: IProjectRepository) {}

  async list(query: ListProjectsQuery): Promise<{ projects: Project[]; total: number }> {
    return await this.repository.findAll(query)
  }

  async getById(id: string): Promise<Project> {
    const project = await this.repository.findById(id)

    if (!project) throw new NotFoundError(`Project ${id} not found`)

    return project
  }

  async create(input: CreateProjectInput): Promise<Project> {
    return await this.repository.create(input)
  }

  async update(id: string, data: UpdateProjectInput): Promise<Project> {
    const project = await this.repository.update(id, data)

    if (!project) throw new NotFoundError(`Project ${id} not found`)

    return project
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id)

    if (!deleted) throw new NotFoundError(`Project ${id} not found`)
  }
}
