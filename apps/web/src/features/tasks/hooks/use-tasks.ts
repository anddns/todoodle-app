import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchTasks } from '../api/fetch-tasks'

interface UseTasksParams {
  projectId?: string
}

export const tasksQueryOptions = (params: UseTasksParams = {}) =>
  queryOptions({
    queryKey: ['tasks', params],
    queryFn: () => fetchTasks(params),
  })

export const useTasks = (params: UseTasksParams = {}) => {
  return useQuery(tasksQueryOptions(params))
}
