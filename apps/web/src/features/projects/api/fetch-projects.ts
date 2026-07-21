import { eden } from '@/web/lib/eden'

export const fetchProjects = async () => {
  const { data, error } = await eden.api.v1.projects.get({
    query: {
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 20,
      offset: 0,
    },
  })

  if (error) throw new Error(error.value.message || 'Failed to fetch projects')

  return data
}
