'use client'

import { z } from 'zod'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import FormDish, { FormDataDish } from '@/components/Admin/FormDish/FormDish'
import { toast } from 'react-toastify'

export default function AdminDishCreatePage() {
  const router = useRouter()

  const buildDishFormData = (data: FormDataDish) => {
    const formData = new FormData()

    formData.append('slug', data.slug)
    formData.append('name_en', data.name_en)
    formData.append('name_ro', data.name_ro)
    formData.append('name_ru', data.name_ru)
    formData.append('description_en', data.description_en)
    formData.append('description_ro', data.description_ro)
    formData.append('description_ru', data.description_ru)
    formData.append('weight', String(data.weight))
    formData.append('price', String(data.price))
    formData.append('orderNumber', String(data.orderNumber ?? 0))

    if (data.category_id) {
      formData.append('category_id', String(data.category_id))
    }

    if (data.file) {
      formData.append('file', data.file)
    }

    return formData
  }

  const onSubmitHandler = async (data: FormDataDish) => {
    try {
      const formData = buildDishFormData(data)
      const response = await api.post(`/dishes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Dish successfully created')

      if (response.status === 201) {
        router.push('/admin/dishes')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return <FormDish onSubmit={onSubmitHandler} />
}
