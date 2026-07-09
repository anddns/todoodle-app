import { eden } from '@/web/lib/eden'

export const fetchTask = async (taskId: string) => {
  const { data, error } = await eden.api.v1.tasks({ id: taskId }).get()

  if (error) throw new Error(error.value.message || `Failed to fetch task ${taskId}`)

  return data
}
