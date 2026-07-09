import { eden } from '@/web/lib/eden'
import type { UpdateTaskPayload } from '../types'

export const updateTask = async (taskId: string, payload: UpdateTaskPayload) => {
  const { data, error } = await eden.api.v1.tasks({ id: taskId }).patch(payload)

  if (error) throw new Error(error.value.message || 'Failed to update task')

  return data
}
