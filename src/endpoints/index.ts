import { Dish } from '@/queries/useDishesQuery'
import { User } from '@/queries/useUsersQuery'
import api from '@/services/api'

export enum Versions {
  V1 = 'V1',
}

/* Endpoint Helpers */
const versionEndpoint = (url: string) => `/${url}`

const userEndpoint = (url: string | number) => versionEndpoint(`users/${url}`)

const dishesEndpoint = (url: string | number) => versionEndpoint(`dishes/${url}`)

export const getUsers = async () => {
  const { data } = await api.get<{ data: User[] }>(userEndpoint(''))
  return data
}

export const getDishes = async () => {
  const { data } = await api.get<{ data: Dish[] }>(dishesEndpoint(''))
  return data
}

export const getDish = (id: string) => {
  return api.get(`dishes/${id}`).then(({ data }) => data)
}

export const createDish = async (data: Dish) => {
  const { data: response } = await api.post(dishesEndpoint(''), data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response
}

export interface DeleteProps {
  id: string
}

export const deleteDish = (payload: DeleteProps) => {
  return api.delete(`/dishes/${payload.id}`).then(({ data }) => data)
}

export const deleteCategory = (payload: DeleteProps) => {
  return api.delete(`/dish-category/${payload.id}`).then(({ data }) => data)
}

export const getCategories = async () => {
  return api.get(`dish-category`).then(({ data }) => data)
}
export const getCategory = (id: string) => {
  return api.get(`dish-category/${id}`).then(({ data }) => data)
}

export const getPublicDishes = () => {
  return api.get(`dishes/public`).then(({ data }) => data)
}

export const getPublicDishesByCategory = (slug: string) => {
  return api.get(`dish-category/public/${slug}/dishes`).then(({ data }) => data)
}

export const getPageContent = async () => {
  return api.get(`page-content`).then(({ data }) => data)
}

export const updatePageContent = async (data: any) => {
  return api.put(`page-content`, data).then(({ data: response }) => response)
}

export const getPublicPageContent = (lang?: string) => {
  return api
    .get(`page-content/public`, {
      headers: {
        lang: lang || 'ro',
      },
    })
    .then(({ data }) => data)
}

export const uploadPageContentImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await api.post(`page-content/upload-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}
