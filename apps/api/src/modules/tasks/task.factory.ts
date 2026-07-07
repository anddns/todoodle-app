import { TaskController } from '@/api/modules/tasks/task.controller'
import { TaskRepository } from '@/api/modules/tasks/task.repository'
import { createTaskRoutes } from '@/api/modules/tasks/task.routes'
import { TaskService } from '@/api/modules/tasks/task.service'
import { database } from '@/api/shared/database'
import { FakeTaskRepository } from './task.repository.spec'

export function createTaskModule() {
  const repository = new TaskRepository(database)
  const service = new TaskService(repository)
  const controller = new TaskController(service)
  const routes = createTaskRoutes(controller)

  return { repository, service, controller, routes }
}

export function createTestTaskModule() {
  const repository = new FakeTaskRepository()
  const service = new TaskService(repository)
  const controller = new TaskController(service)
  const routes = createTaskRoutes(controller)

  return { repository, service, controller, routes }
}
