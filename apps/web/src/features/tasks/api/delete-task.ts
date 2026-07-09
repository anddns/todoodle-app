import { eden } from '@/web/lib/eden'

export const deleteTask = async (taskId: string) => {
  const { data, error } = await eden.api.v1.tasks({ id: taskId }).delete()

  if (error) throw Error(error.value.message || 'Failed to delete task')

  return data
}
