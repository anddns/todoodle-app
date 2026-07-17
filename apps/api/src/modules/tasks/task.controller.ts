import type { CreateTaskInput, UpdateTaskInput } from '@todoodle-app/shared'

import type { ListTasksQuery, Task } from '@/api/modules/tasks/task.schemas'
import type { ITaskService } from '@/api/modules/tasks/task.service'

export interface ITaskController {
  list(query: ListTasksQuery): Promise<{ data: Task[]; total: number }>
  getById(id: string): Promise<Task>
  create(data: CreateTaskInput): Promise<Task>
  update(id: string, data: UpdateTaskInput): Promise<Task>
  delete(id: string): Promise<void>
}

export class TaskController implements ITaskController {
  public constructor(private readonly service: ITaskService) {}

  async list(query: ListTasksQuery): Promise<{ data: Task[]; total: number }> {
    const task = await this.service.list(query)

    return task
  }

  async getById(id: string): Promise<Task> {
    const task = await this.service.getById(id)

    return task
  }

  async create(data: CreateTaskInput): Promise<Task> {
    const task = await this.service.create(data)

    return task
  }

  async update(id: string, data: UpdateTaskInput): Promise<Task> {
    const task = await this.service.update(id, data)

    return task
  }

  async delete(id: string): Promise<void> {
    await this.service.delete(id)
  }
}
