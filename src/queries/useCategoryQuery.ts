import { getCategory } from '@/endpoints'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dish } from './useDishesQuery'

type UseCategoryQuery = (
  payload: {
    id: string
  },
  queryOptions?: { enabled?: boolean; onSuccess?: () => void },
) => UseQueryResult<Dish, AxiosError>

export const useCategoryQuery: UseCategoryQuery = (payload, queryOptions) => {
  return useQuery({
    queryKey: ['category', payload.id],
    queryFn: () => getCategory(payload.id),
    ...queryOptions,
  })
}
