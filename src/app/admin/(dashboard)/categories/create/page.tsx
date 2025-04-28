'use client'

import api from '@/services/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import FormCategory, { FormDataDishCategory } from '@/components/Admin/FormCategory/FormCategory'

export default function AdminCategoryCreatePage() {
  const router = useRouter()

  const onSubmitHandler = async (data: FormDataDishCategory) => {
    try {
      console.log('Form submitted:', data)

      const response = await api.post(
        `/dish-category`,
        {
          ...data,
          file: data.file,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      toast.success('Dish successfully created')

      if (response.status === 201) {
        console.log('Category successfully created', response.data)
        router.push('/admin/categories')
      }

      console.log('Response:', response)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return <FormCategory onSubmit={onSubmitHandler} />
}
