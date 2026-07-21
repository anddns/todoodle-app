import { eden } from '@/web/lib/eden'

interface FetchTasksParams {
  projectId?: string
}

export const fetchTasks = async ({ projectId }: FetchTasksParams = {}) => {
  const { data, error } = await eden.api.v1.tasks.get({
    query: {
      status: 'all',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 20,
      offset: 0,
      ...(projectId ? { projectId } : {}),
    },
  })

  if (error) throw new Error(error.value.message || 'Failed to fetch tasks')

  return data
}
