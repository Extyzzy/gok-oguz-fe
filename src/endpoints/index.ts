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

export interface DeleteDishProps {
  id: string
}
export const deleteDish = (payload: DeleteDishProps) => {
  return api.delete(`/dishes/${payload.id}`).then(({ data }) => data)
}

export const getCategories = async () => {
  return api.get(`dish-category`).then(({ data }) => data)
}
export const getCategory = (id: string) => {
  return api.get(`dish-category/${id}`).then(({ data }) => data)
}
