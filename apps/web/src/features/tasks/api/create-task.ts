import { eden } from '@/web/lib/eden'
import type { CreateTaskPayload } from '../types'

export const createTask = async (payload: CreateTaskPayload) => {
  const { data, error } = await eden.api.v1.tasks.post(payload)

  if (error) throw new Error(error.value.message || 'Failed to create task')

  return data
}
