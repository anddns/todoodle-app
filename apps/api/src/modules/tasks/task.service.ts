import type { CreateTaskInput, UpdateTaskInput } from '@todoodle-app/shared'
import type { ITaskRepository } from '@/api/modules/tasks/task.repository'
import type { ListTasksQuery, Task } from '@/api/modules/tasks/task.schemas'
import { NotFoundError } from '@/api/shared/errors/app-error'

export interface ITaskService {
  list(query: ListTasksQuery): Promise<{ tasks: Task[]; total: number }>
  getById(id: string): Promise<Task>
  create(input: CreateTaskInput): Promise<Task>
  update(id: string, data: UpdateTaskInput): Promise<Task>
  delete(id: string): Promise<void>
}

export class TaskService implements ITaskService {
  public constructor(private readonly repository: ITaskRepository) {}

  async list(query: ListTasksQuery): Promise<{ tasks: Task[]; total: number }> {
    return await this.repository.findAll(query)
  }

  async getById(id: string): Promise<Task> {
    const task = await this.repository.findById(id)

    if (!task) throw new NotFoundError(`Task ${id} not found`)

    return task
  }

  async create(input: CreateTaskInput): Promise<Task> {
    return await this.repository.create(input)
  }

  async update(id: string, data: UpdateTaskInput): Promise<Task> {
    const task = await this.repository.update(id, data)

    if (!task) throw new NotFoundError(`Task ${id} not found`)

    return task
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id)

    if (!deleted) throw new NotFoundError(`Task ${id} not found`)
  }
}
