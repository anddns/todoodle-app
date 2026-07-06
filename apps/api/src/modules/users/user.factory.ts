import { UserController } from '@/api/modules/users/user.controller'
import { UserRepository } from '@/api/modules/users/user.repository'
import { createUserRoutes } from '@/api/modules/users/user.routes'
import { UserService } from '@/api/modules/users/user.service'
import { database } from '@/api/shared/database'

export function createUserModule() {
  const repository = new UserRepository(database)
  const service = new UserService(repository)
  const controller = new UserController(service)
  const routes = createUserRoutes(controller)

  return { repository, service, controller, routes }
}
