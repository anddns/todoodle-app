import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateTask } from '../api/update-task'
import type { Task } from '../types'

export const useToggleTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: Task) => {
      const isCompleted = !!task.completedAt

      return updateTask(task.id, {
        completedAt: isCompleted ? null : new Date().toISOString(),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
