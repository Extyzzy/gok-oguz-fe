'use client'

import { Button, Card, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import { MoneyInput } from '@/components/Admin/Inputs/MoneyInput'
import FormDish, { FormDataDish } from '@/components/Admin/FormDish/FormDish'
import { toast } from 'react-toastify'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']

const DishSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  name_en: z.string().min(1, 'Name is required'),
  name_ro: z.string().min(1, 'Name is required'),
  name_ru: z.string().min(1, 'Name is required'),
  description_en: z.string().min(1, 'Description is required'),
  description_ro: z.string().min(1, 'Description is required'),
  description_ru: z.string().min(1, 'Description is required'),
  weight: z.string().min(1, 'Weight is required'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Cost must be a valid number'),
  category_id: z.string().min(1, 'Category is required'),
  file: z
    .any()
    .refine((files) => files?.length > 0, { message: 'At least one file is required' })
    .transform((files) => files[0])
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    })
    .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
      message: `Only ${ALLOWED_FILE_TYPES.join(', ')} files are allowed`,
    }),
})

export default function AdminDishCreatePage() {
  const router = useRouter()

  const onSubmitHandler = async (data: FormDataDish) => {
    try {
      console.log('Form submitted:', data)

      const response = await api.post(
        `/dishes`,
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

      toast.success('Dish successfully created')

      if (response.status === 201) {
        console.log('Dish successfully created', response.data)
        router.push('/admin/dishes')
      }

      console.log('Response:', response)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return <FormDish onSubmit={onSubmitHandler} />
}
