'use client'

import api from '@/services/api'
import { useParams } from 'next/navigation'
import { useDishQuery } from '@/queries/useDishQuery'

import { toast } from 'react-toastify'
import FormDish, { FormDataDish } from '@/components/Admin/FormDish/FormDish'

export default function AdminDishCreatePage() {
  const params = useParams()

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

  const onSubmitHandler = async (data: FormDataDish) => {
    try {
      console.log('Form submitted:', data)

      const response = await api.put(
        `/dishes/${params.dishId}`,
        {
          ...data,
          category_id: Number(data.category_id),
          weight: Number(data.weight),
          price: Number(data.price),
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
