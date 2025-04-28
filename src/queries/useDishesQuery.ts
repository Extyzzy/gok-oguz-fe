import { getDishes } from '@/endpoints'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { DishCategory } from './useCategoriesQuery'

export type Dish = {
  id: string
  slug: string
  name_en: string
  name_ro: string
  name_ru: string
  description_en: string
  description_ro: string
  description_ru: string
  weight: number
  price: number
  image: string
  category_id: string
  category: DishCategory
}

type UseDishesQuery = (queryOptions?: { enabled?: boolean }) => UseQueryResult<Dish[], AxiosError>

export const useDishesQuery: UseDishesQuery = (queryOptions) => {
  return useQuery({
    queryKey: ['dishes'],
    queryFn: getDishes,
    ...queryOptions,
  })
}
