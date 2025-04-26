import { getUsers } from '@/endpoints'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
}

type UseUsersQuery = (queryOptions?: { enabled?: boolean }) => UseQueryResult<User[], AxiosError>

export const useUsersQuery: UseUsersQuery = (queryOptions) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    ...queryOptions,
  })
}
