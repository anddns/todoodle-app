import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchTasks } from '../api/fetch-tasks'

export const tasksQueryOptions = () =>
  queryOptions({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })

export const useTasks = () => {
  return useQuery(tasksQueryOptions())
}
