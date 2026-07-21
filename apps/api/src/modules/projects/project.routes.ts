import { createProjectSchema, updateProjectSchema } from '@todoodle-app/shared'
import Elysia from 'elysia'

import type { IProjectController } from '@/api/modules/projects/project.controller'
import {
  listProjectsQuerySchema,
  projectParamsSchema,
} from '@/api/modules/projects/project.schemas'

export function createProjectRoutes(controller: IProjectController) {
  return new Elysia({ prefix: '/projects' })
    .get('/', async ({ query }) => controller.list(query), { query: listProjectsQuerySchema })
    .get('/:id', async ({ params }) => controller.getById(params.id), {
      params: projectParamsSchema,
    })
    .post('/', async ({ body }) => controller.create(body), { body: createProjectSchema })
    .patch('/:id', async ({ params, body }) => controller.update(params.id, body), {
      params: projectParamsSchema,
      body: updateProjectSchema,
    })
    .delete(
      '/:id',
      async ({ params, status }) => {
        await controller.delete(params.id)

        return status(204)
      },
      { params: projectParamsSchema },
    )
}
