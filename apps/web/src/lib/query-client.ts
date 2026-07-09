// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 1 minute.
      // During this time, navigating between pages won't trigger background refetches.
      staleTime: 1000 * 60,

      // Keep unused data in the cache for 5 minutes before garbage collecting it
      gcTime: 1000 * 60 * 5,

      // Automatically retry failing requests once before showing an error
      retry: 1,

      // Refetch data when the user clicks back into the browser tab
      refetchOnWindowFocus: true,
    },
  },
})
