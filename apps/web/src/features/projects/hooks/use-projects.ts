import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchProjects } from '../api/fetch-projects'

export const projectsQueryOptions = () =>
  queryOptions({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

export const useProjects = () => {
  return useQuery(projectsQueryOptions())
}
