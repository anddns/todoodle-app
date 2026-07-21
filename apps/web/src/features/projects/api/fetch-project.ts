import { eden } from '@/web/lib/eden'

export const fetchProject = async (projectId: string) => {
  const { data, error } = await eden.api.v1.projects({ id: projectId }).get()

  if (error) throw new Error(error.value.message || `Failed to fetch project ${projectId}`)

  return data
}
