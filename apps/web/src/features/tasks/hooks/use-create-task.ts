import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createTask } from '../api/create-task'

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
