import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchProject } from '../api/fetch-project'

export const projectQueryOptions = (projectId: string) =>
  queryOptions({
    queryKey: ['projects', projectId],
    queryFn: () => fetchProject(projectId),
    enabled: !!projectId,
  })

export const useProject = (projectId: string) => {
  return useQuery(projectQueryOptions(projectId))
}
