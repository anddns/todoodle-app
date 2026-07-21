import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateProject } from '../api/update-project'
import type { UpdateProjectPayload } from '../types'

export const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProjectPayload }) =>
      updateProject(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
