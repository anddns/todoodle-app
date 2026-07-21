import { eden } from '@/web/lib/eden'
import type { CreateProjectPayload } from '../types'

export const createProject = async (payload: CreateProjectPayload) => {
  const { data, error } = await eden.api.v1.projects.post(payload)

  if (error) throw new Error(error.value.message || 'Failed to create project')

  return data
}
