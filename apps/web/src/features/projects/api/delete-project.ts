import { eden } from '@/web/lib/eden'

export const deleteProject = async (projectId: string) => {
  const { data, error } = await eden.api.v1.projects({ id: projectId }).delete()

  if (error) throw Error(error.value.message || 'Failed to delete project')

  return data
}
