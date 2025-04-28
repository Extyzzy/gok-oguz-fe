import { getPublicDishesByCategory } from '@/endpoints'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dish } from './useDishesQuery'
import i18n from '@/i18n/i18n'

type UsePublicDishesByCategoryQuery = (
  payload: {
    slug: string
  },
  queryOptions?: { enabled?: boolean; onSuccess?: () => void },
) => UseQueryResult<Dish[], AxiosError>

export const usePublicDishesByCategoryQuery: UsePublicDishesByCategoryQuery = (
  payload,
  queryOptions,
) => {
  return useQuery({
    queryKey: ['publicDishesByCategory', i18n.language + payload.slug],
    queryFn: () => getPublicDishesByCategory(payload.slug),
    ...queryOptions,
  })
}
