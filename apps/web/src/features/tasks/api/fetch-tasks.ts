import { eden } from '@/web/lib/eden'

export const fetchTasks = async () => {
  const { data, error } = await eden.api.v1.tasks.get({
    query: {
      status: 'all',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 20,
      offset: 0,
    },
  })

  if (error) throw new Error(error.value.message || 'Failed to fetch tasks')

  return data
}
