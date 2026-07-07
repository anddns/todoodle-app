import { beforeEach, describe, expect, test } from 'bun:test'
import Elysia from 'elysia'

import { TaskController } from '@/api/modules/tasks/task.controller'
import { FakeTaskRepository } from '@/api/modules/tasks/task.repository.spec'
import { createTaskRoutes } from '@/api/modules/tasks/task.routes'
import type { Task } from '@/api/modules/tasks/task.schemas'
import { TaskService } from '@/api/modules/tasks/task.service'
import { globalErrorHandler } from '@/api/shared/errors/global-error-handler'

const repository = new FakeTaskRepository()
const service = new TaskService(repository)
const controller = new TaskController(service)
const routes = createTaskRoutes(controller)

const app = new Elysia().use(globalErrorHandler).use(routes)

beforeEach(async () => {
  await repository.reset()
})

function request(path: string, init?: RequestInit) {
  return app.handle(new Request(`http://localhost${path}`, init))
}

describe('rotas task', () => {
  test('POST /tasks cria uma tarefa só com o título', async () => {
    const response = await request('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Estudar Drizzle' }),
    })

    expect(response.status).toBe(200)
  })

  test('POST /tasks rejeita corpo sem título', async () => {
    const response = await request('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: 'Sem título' }),
    })

    expect(response.status).toBe(422)
  })

  test('GET /tasks lista tarefas criadas com o total', async () => {
    await request('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Tarefa 1' }),
    })

    const response = await request('/tasks')

    const body = (await response.json()) as {
      total: number
      data: [
        {
          title: string
          completedAt: string | null
        },
      ]
    }

    expect(body.total).toBe(1)

    expect(body.data[0].title).toBe('Tarefa 1')
  })

  test('PATCH, /tasks/:id marca uma tarefa como concluída', async () => {
    const created = await request('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Terminar relatório' }),
    }).then(async (res) => (await res.json()) as Task)

    const response = await request(`/tasks/${created.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completedAt: new Date().toISOString() }),
    })

    expect(response.status).toBe(200)
  })

  test('DELETE /tasks/:id remove a tarefa, e um segundo GET retorna 404', async () => {
    const created = await request('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Será apagada' }),
    }).then(async (res) => (await res.json()) as Task)

    const deleteResponse = await request(`/tasks/${created.id}`, { method: 'DELETE' })

    expect(deleteResponse.status).toBe(204)

    const getReponse = await request(`/tasks/${created.id}`)

    expect(getReponse.status).toBe(404)
  })
})
