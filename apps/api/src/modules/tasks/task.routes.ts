import { createTaskSchema, updateTaskSchema } from '@todoodle-app/shared'
import Elysia from 'elysia'

import type { ITaskController } from '@/api/modules/tasks/task.controller'
import { listTasksQuerySchema, taskParamsSchema } from '@/api/modules/tasks/task.schemas'

export function createTaskRoutes(controller: ITaskController) {
  return new Elysia({ prefix: '/tasks' })
    .get('/', async ({ query }) => controller.list(query), { query: listTasksQuerySchema })
    .get('/:id', async ({ params }) => controller.getById(params.id), {
      params: taskParamsSchema,
    })
    .post('/', async ({ body }) => controller.create(body), { body: createTaskSchema })
    .patch('/:id', async ({ params, body }) => controller.update(params.id, body), {
      params: taskParamsSchema,
      body: updateTaskSchema,
    })
    .delete(
      '/:id',
      async ({ params, status }) => {
        await controller.delete(params.id)

        return status(204)
      },
      { params: taskParamsSchema },
    )
}
