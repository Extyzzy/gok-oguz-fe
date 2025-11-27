import { getPageContent } from '@/endpoints'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export type PageContent = {
  id: number
  wine1: string
  wine2: string
  wine3: string
  wine4: string
  home_main_text_en: string
  home_main_text_ro: string
  home_main_text_ru: string
  home_main_description_en: string
  home_main_description_ro: string
  home_main_description_ru: string
  home_traditions_title_en: string
  home_traditions_title_ro: string
  home_traditions_title_ru: string
  home_traditions_text_en: string
  home_traditions_text_ro: string
  home_traditions_text_ru: string
  home_traditions_wines_en: string
  home_traditions_wines_ro: string
  home_traditions_wines_ru: string
  photos_photo_title_en: string
  photos_photo_title_ro: string
  photos_photo_title_ru: string
  photos_restaurant_description_en: string
  photos_restaurant_description_ro: string
  photos_restaurant_description_ru: string
  photos_restaurant_atmosphere_en: string
  photos_restaurant_atmosphere_ro: string
  photos_restaurant_atmosphere_ru: string
  gagauz_culture_title_en: string
  gagauz_culture_title_ro: string
  gagauz_culture_title_ru: string
  gagauz_culture_location_en: string
  gagauz_culture_location_ro: string
  gagauz_culture_location_ru: string
  gagauz_culture_languages_en: string
  gagauz_culture_languages_ro: string
  gagauz_culture_languages_ru: string
  gagauz_culture_example_en: string
  gagauz_culture_example_ro: string
  gagauz_culture_example_ru: string
  images: string[]
}

type UsePageContentQuery = (queryOptions?: {
  enabled?: boolean
}) => UseQueryResult<PageContent, AxiosError>

export const usePageContentQuery: UsePageContentQuery = (queryOptions) => {
  return useQuery({
    queryKey: ['page-content'],
    queryFn: getPageContent,
    ...queryOptions,
  })
}

