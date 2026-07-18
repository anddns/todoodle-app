import type { Treaty } from '@elysia/eden'
import type { eden } from '@/web/lib/eden'

type TasksListEndpoint = ReturnType<typeof eden.api.v1.tasks.get>
type TaskByIdEndpoints = ReturnType<typeof eden.api.v1.tasks>

export type Task = Treaty.Data<TasksListEndpoint>['tasks'][number]
export type CreateTaskPayload = Parameters<typeof eden.api.v1.tasks.post>[0]
export type UpdateTaskPayload = NonNullable<Parameters<TaskByIdEndpoints['patch']>[0]>
