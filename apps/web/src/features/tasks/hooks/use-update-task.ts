import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateTask } from '../api/update-task'
import type { UpdateTaskPayload } from '../types'

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
