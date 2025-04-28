import { getPublicDishes } from '@/endpoints'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dish } from './useDishesQuery'
import i18n from '@/i18n/i18n'

type UsePublicDishesQuery = (queryOptions?: {
  enabled?: boolean
}) => UseQueryResult<Dish[], AxiosError>

export const usePublicDishesQuery: UsePublicDishesQuery = (queryOptions) => {
  return useQuery({
    queryKey: ['publicDishes', i18n.language],
    queryFn: getPublicDishes,
    ...queryOptions,
  })
}
