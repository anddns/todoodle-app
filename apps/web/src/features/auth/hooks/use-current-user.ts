import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchCurrentUser } from '../api/fetch-current-user'

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
  })

export const useCurrentUser = () => {
  return useQuery(currentUserQueryOptions())
}
