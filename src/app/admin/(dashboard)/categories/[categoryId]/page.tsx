'use client'

import api from '@/services/api'
import { useParams } from 'next/navigation'

import { toast } from 'react-toastify'
import FormCategory, { FormDataDishCategory } from '@/components/Admin/FormCategory/FormCategory'
import { useCategoryQuery } from '@/queries/useCategoryQuery'
import { useRouter } from 'next/navigation'

export default function AdminCategoryCreatePage() {
  const params = useParams()
  const router = useRouter()

  const { isLoading: isLoadingCategory, data: categoryData } = useCategoryQuery(
    {
      id: params.categoryId as string,
    },
    {
      enabled: !!params.categoryId,
    },
  )

  if (isLoadingCategory) {
    return <div>Loading...</div>
  }

  const onSubmitHandler = async (data: FormDataDishCategory) => {
    try {
      const response = await api.put(`/dish-category/${params.categoryId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Successfully updated the dish category')

      if (response.status === 200) {
        router.push('/admin/categories')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <FormCategory
      update
      initialValues={
        {
          ...categoryData,
        } as FormDataDishCategory
      }
      onSubmit={onSubmitHandler}
    />
  )
}
