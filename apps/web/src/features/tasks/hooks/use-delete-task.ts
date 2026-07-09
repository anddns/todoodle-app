import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteTask } from '../api/delete-task'

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
