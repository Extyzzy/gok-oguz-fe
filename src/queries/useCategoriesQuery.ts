import { getCategories } from '@/endpoints'
import i18n from '@/i18n/i18n'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export type DishCategory = {
  id: number
  slug: string
  name_en: string
  name_ro: string
  name_ru: string
  image: string
}

type UseCategoriesQuery = (queryOptions?: {
  enabled?: boolean
}) => UseQueryResult<DishCategory[], AxiosError>

export const useCategoriesQuery: UseCategoriesQuery = (queryOptions) => {
  return useQuery({
    queryKey: ['categories', i18n.language],
    queryFn: getCategories,
    ...queryOptions,
  })
}
