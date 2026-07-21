import { ProjectController } from '@/api/modules/projects/project.controller'
import { ProjectRepository } from '@/api/modules/projects/project.repository'
import { createProjectRoutes } from '@/api/modules/projects/project.routes'
import { ProjectService } from '@/api/modules/projects/project.service'
import { database } from '@/api/shared/database'

export function createProjectModule() {
  const repository = new ProjectRepository(database)
  const service = new ProjectService(repository)
  const controller = new ProjectController(service)
  const routes = createProjectRoutes(controller)

  return { repository, service, controller, routes }
}
