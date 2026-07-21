import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteProject } from '../api/delete-project'

export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      // Deleting a project sets dependent tasks' projectId to null server-side
      // (ON DELETE SET NULL), so cached task lists must refetch too.
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
