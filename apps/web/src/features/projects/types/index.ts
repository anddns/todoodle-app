import type { Treaty } from '@elysia/eden'
import type { eden } from '@/web/lib/eden'

type ProjectsListEndpoint = ReturnType<typeof eden.api.v1.projects.get>
type ProjectByIdEndpoints = ReturnType<typeof eden.api.v1.projects>

export type Project = Treaty.Data<ProjectsListEndpoint>['projects'][number]
export type CreateProjectPayload = Parameters<typeof eden.api.v1.projects.post>[0]
export type UpdateProjectPayload = NonNullable<Parameters<ProjectByIdEndpoints['patch']>[0]>
