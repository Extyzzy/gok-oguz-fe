import { getPublicPageContent } from '@/endpoints'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

export type PublicPageContent = {
  wines: string[]
  images: string[]
  home: {
    main_text: string
    main_description: string
    traditions_title: string
    traditions_text: string
    traditions_wines: string
  }
  photos: {
    photo_title: string
    restaurant_description: string
    restaurant_atmosphere: string
  }
  gagauz_culture: {
    title: string
    gagauz_location: string
    gagauz_languages: string
    gagauz_example: string
  }
}

type UsePublicPageContentQuery = (queryOptions?: {
  enabled?: boolean
}) => UseQueryResult<PublicPageContent, AxiosError>

export const usePublicPageContentQuery: UsePublicPageContentQuery = (queryOptions) => {
  const { i18n } = useTranslation()
  
  return useQuery({
    queryKey: ['public-page-content', i18n.language],
    queryFn: () => getPublicPageContent(i18n.language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...queryOptions,
  })
}

