'use client'

import api from '@/services/api'
import { useParams } from 'next/navigation'
import { useDishQuery } from '@/queries/useDishQuery'

import { toast } from 'react-toastify'
import FormDish, { FormDataDish } from '@/components/Admin/FormDish/FormDish'
import { useRouter } from 'next/navigation'

export default function AdminDishCreatePage() {
  const params = useParams()
  const router = useRouter()

  const {
    isLoading: isLoadingDish,
    data: dishData,
    isSuccess: isSuccessLoaded,
  } = useDishQuery(
    {
      id: params.dishId as string,
    },
    {
      enabled: !!params.dishId,
      onSuccess: () => {
        console.log('Dish data loaded successfully')
      },
    },
  )

  if (isLoadingDish) {
    return <div>Loading...</div>
  }

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
      console.log('Form submitted:', data)

      const formData = buildDishFormData(data)
      const response = await api.put(
        `/dishes/${params.dishId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      toast.success('Successfully updated the dish')

      if (response.status === 200) {
        router.push('/admin/dishes')
      }

      console.log('Response:', response)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <FormDish
      update
      initialValues={
        {
          ...dishData,
          weight: dishData?.weight?.toString() || '',
          price: dishData?.price?.toString() || '',
          category_id: dishData?.category_id?.toString() || '',
        } as FormDataDish
      }
      onSubmit={onSubmitHandler}
    />
  )
}
