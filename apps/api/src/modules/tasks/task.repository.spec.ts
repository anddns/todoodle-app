import { describe, expect, test } from 'bun:test'

import type { ITaskRepository } from '@/api/modules/tasks/task.repository'
import type {
  CreateTaskInput,
  ListTasksQuery,
  Task,
  UpdateTaskInput,
} from '@/api/modules/tasks/task.schemas'
import { TaskService } from '@/api/modules/tasks/task.service'
import { NotFoundError } from '@/api/shared/errors/app-error'

const defaultQuery: ListTasksQuery = {
  status: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  limit: 20,
  offset: 0,
}

export class FakeTaskRepository implements ITaskRepository {
  public constructor(private readonly tasks: Task[] = []) {}

  async findAll(): Promise<{ data: Task[]; total: number }> {
    return { data: this.tasks, total: this.tasks.length }
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) ?? null
  }

  async create(data: CreateTaskInput): Promise<Task> {
    const task: Task = {
      id: Bun.randomUUIDv7(),
      title: data.title,
      description: data.description ?? null,
      completedAt: data.completedAt ?? null,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    this.tasks.push(task)

    return task
  }

  async update(id: string, data: UpdateTaskInput): Promise<Task | null> {
    const task = this.tasks.find((task) => task.id === id)

    if (!task) return null

    Object.assign(task, data, { updatedAt: new Date().toISOString() })

    return task
  }

  async delete(id: string): Promise<boolean> {
    const index = this.tasks.findIndex((task) => task.id === id)

    if (index === -1) return false

    this.tasks.splice(index, 1)

    return true
  }

  async reset(): Promise<boolean> {
    this.tasks.length = 0

    return true
  }
}

describe('TaskService', () => {
  test('cria e lista uma tarefa', async () => {
    const service = new TaskService(new FakeTaskRepository())

    await service.create({ title: 'Comprar leite' })

    const { data, total } = await service.list(defaultQuery)

    expect(total).toBe(1)

    expect(data[0]?.title).toBe('Comprar leite')
  })

  test('getById lança NotFoundError para id inexistente', async () => {
    const service = new TaskService(new FakeTaskRepository())

    expect(service.getById(Bun.randomUUIDv7())).rejects.toThrow(NotFoundError)
  })

  test('update altera campos de uma tarefa existente', async () => {
    const service = new TaskService(new FakeTaskRepository())

    const created = await service.create({ title: 'Atualizar tarefa' })

    const updated = await service.update(created.id, {
      title: 'Tarefa atualizada',
    })

    expect(updated.title).toBe('Tarefa atualizada')
  })

  test('delete lança NotFoundError para id inexistente', async () => {
    const service = new TaskService(new FakeTaskRepository())

    expect(service.delete(Bun.randomUUIDv7())).rejects.toThrow(NotFoundError)
  })
})
