import { createUserSchema, updateUserSchema } from '@todoodle-app/shared'
import Elysia from 'elysia'
import type { IUserController } from '@/api/modules/users/user.controller'
import { listUsersQuerySchema, userParamsSchema } from './user.schemas'

export function createUserRoutes(controller: IUserController) {
  return new Elysia({ prefix: '/users' })
    .get('/', async ({ query }) => controller.list(query), { query: listUsersQuerySchema })
    .get('/:id', async ({ params }) => controller.getById(params.id), {
      params: userParamsSchema,
    })
    .post('/', async ({ body }) => controller.create(body), { body: createUserSchema })
    .patch('/:id', async ({ params, body }) => controller.update(params.id, body), {
      params: userParamsSchema,
      body: updateUserSchema,
    })
    .delete(
      '/:id',
      async ({ params, status }) => {
        await controller.delete(params.id)

        return status(204)
      },
      { params: userParamsSchema },
    )
}
