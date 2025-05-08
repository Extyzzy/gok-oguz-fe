'use client'

import { z } from 'zod'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import FormDish, { FormDataDish } from '@/components/Admin/FormDish/FormDish'
import { toast } from 'react-toastify'

export default function AdminDishCreatePage() {
  const router = useRouter()

  const onSubmitHandler = async (data: FormDataDish) => {
    try {
      const response = await api.post(
        `/dishes`,
        {
          ...data,
          category_id: Number(data.category_id),
          weight: Number(data.weight),
          price: Number(data.price),
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

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
