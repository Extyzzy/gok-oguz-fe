'use client'

import api from '@/services/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import FormCategory, { FormDataDishCategory } from '@/components/Admin/FormCategory/FormCategory'

export default function AdminCategoryCreatePage() {
  const router = useRouter()

  const onSubmitHandler = async (data: FormDataDishCategory) => {
    try {
      const response = await api.post(`/dish-category`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Dish category successfully created')

      if (response.status === 201) {
        router.push('/admin/categories')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return <FormCategory onSubmit={onSubmitHandler} />
}
