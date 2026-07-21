import type { CreateProjectInput, UpdateProjectInput } from '@todoodle-app/shared'

import type { ListProjectsQuery, Project } from '@/api/modules/projects/project.schemas'
import type { IProjectService } from '@/api/modules/projects/project.service'

export interface IProjectController {
  list(query: ListProjectsQuery): Promise<{ projects: Project[]; total: number }>
  getById(id: string): Promise<Project>
  create(data: CreateProjectInput): Promise<Project>
  update(id: string, data: UpdateProjectInput): Promise<Project>
  delete(id: string): Promise<void>
}

export class ProjectController implements IProjectController {
  public constructor(private readonly service: IProjectService) {}

  async list(query: ListProjectsQuery): Promise<{ projects: Project[]; total: number }> {
    const project = await this.service.list(query)

    return project
  }

  async getById(id: string): Promise<Project> {
    const project = await this.service.getById(id)

    return project
  }

  async create(data: CreateProjectInput): Promise<Project> {
    const project = await this.service.create(data)

    return project
  }

  async update(id: string, data: UpdateProjectInput): Promise<Project> {
    const project = await this.service.update(id, data)

    return project
  }

  async delete(id: string): Promise<void> {
    await this.service.delete(id)
  }
}
