'use client'

import api from '@/services/api'
import { useParams } from 'next/navigation'

import { toast } from 'react-toastify'
import FormCategory, { FormDataDishCategory } from '@/components/Admin/FormCategory/FormCategory'
import { useCategoryQuery } from '@/queries/useCategoryQuery'

export default function AdminCategoryCreatePage() {
  const params = useParams()

  const {
    isLoading: isLoadingCategory,
    data: categoryData,
    isSuccess: isSuccessLoaded,
  } = useCategoryQuery(
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
      const response = await api.put(
        `/dish-category/${params.categoryId}`,
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

      toast.success('Sucessfully updated the dish')

      if (response.status === 201) {
        console.log('Dish updated successfully:', response.data)
        // router.push('/admin/dishes')
      }

      console.log('Response:', response)
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
