import { eden } from '@/web/lib/eden'
import type { UpdateProjectPayload } from '../types'

export const updateProject = async (projectId: string, payload: UpdateProjectPayload) => {
  const { data, error } = await eden.api.v1.projects({ id: projectId }).patch(payload)

  if (error) throw new Error(error.value.message || 'Failed to update project')

  return data
}
