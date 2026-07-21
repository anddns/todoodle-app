import Elysia from 'elysia'

import { createProjectModule } from '@/api/modules/projects/project.factory'
import { createTaskModule } from '@/api/modules/tasks/task.factory'
import { createUserModule } from '@/api/modules/users/user.factory'

const { routes: taskRoutes } = createTaskModule()
const { routes: userRoutes } = createUserModule()
const { routes: projectRoutes } = createProjectModule()

export const routes = new Elysia({ prefix: '/api/v1' })
  .get('/', () => 'Todoodle API is running')
  .use(taskRoutes)
  .use(userRoutes)
  .use(projectRoutes)
