import { getDish } from '@/endpoints'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dish } from './useDishesQuery'

type UseDishQuery = (
  payload: {
    id: string
  },
  queryOptions?: { enabled?: boolean; onSuccess?: () => void },
) => UseQueryResult<Dish, AxiosError>

export const useDishQuery: UseDishQuery = (payload, queryOptions) => {
  console.log(payload)
  return useQuery({
    queryKey: ['dish', payload.id],
    queryFn: () => getDish(payload.id),
    ...queryOptions,
  })
}
