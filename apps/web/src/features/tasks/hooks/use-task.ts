import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchTask } from '../api/fetch-task'

export const taskQueryOptions = (taskId: string) =>
  queryOptions({
    queryKey: ['tasks', taskId],
    queryFn: () => fetchTask(taskId),
    enabled: !!taskId,
  })

export const useTask = (taskId: string) => {
  return useQuery(taskQueryOptions(taskId))
}
