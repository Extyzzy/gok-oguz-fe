'use client'

import { Button, Card, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '@/services/api'
import { useRouter } from 'next/navigation'

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
  const form = useForm({
    resolver: zodResolver(DishSchema),
    defaultValues: {
      name: '',
      name_en: '',
      name_ro: '',
      name_ru: '',
      description_en: '',
      description_ro: '',
      description_ru: '',
      weight: '',
      price: '',
      category_id: '',
    },
  })

  const submitForm = async (data: z.infer<typeof DishSchema>) => {
    try {
      console.log('Form submitted:', data)

      const response = await api.post(
        '/dishes',
        {
          ...data,
          category_id: Number(data.category_id),
          weight: Number(data.weight),
          price: Number(data.price),
          file: data.file[0],
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (response.status === 201) {
        console.log('Dish created successfully:', response.data)
        router.push('/admin/dishes')
      }

      console.log('Response:', response)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  console.log('Form state:', form.formState.errors)
  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      <Card className='p-4 space-y-4'>
        <h2 className='text-lg font-semibold'>Create a new dish</h2>
        <p className='text-gray-600'>Use the form below to create a new dish.</p>

        <Input
          label='Name'
          placeholder='Enter the dish name as slug'
          errorMessage={form.formState.errors.name?.message}
          isInvalid={!!form.formState.errors.name}
          {...form.register('name')}
        />
        <div className='flex gap-x-4'>
          <Input
            label='Name'
            placeholder='Enter the dish name for english'
            errorMessage={form.formState.errors.name_en?.message}
            isInvalid={!!form.formState.errors.name_en}
            {...form.register('name_en')}
          />

          <Input
            label='Description'
            placeholder='Enter the dish description for english'
            errorMessage={form.formState.errors.description_en?.message}
            isInvalid={!!form.formState.errors.description_en}
            {...form.register('description_en')}
          />
        </div>

        <div className='flex gap-x-4'>
          <Input
            label='Name'
            placeholder='Enter the dish name for romanian'
            errorMessage={form.formState.errors.name_ro?.message}
            isInvalid={!!form.formState.errors.name_ro}
            {...form.register('name_ro')}
          />

          <Input
            label='Description'
            placeholder='Enter the dish description for romanian'
            errorMessage={form.formState.errors.description_ro?.message}
            isInvalid={!!form.formState.errors.description_ro}
            {...form.register('description_ro')}
          />
        </div>

        <div className='flex gap-x-4'>
          <Input
            label='Name'
            placeholder='Enter the dish name for russian'
            errorMessage={form.formState.errors.name_ru?.message}
            isInvalid={!!form.formState.errors.name_ru}
            {...form.register('name_ru')}
          />
          <Input
            label='Description'
            placeholder='Enter the dish description for russian'
            errorMessage={form.formState.errors.description_ru?.message}
            isInvalid={!!form.formState.errors.description_ru}
            {...form.register('description_ru')}
          />
        </div>

        <Input
          label='Weight'
          type='number'
          placeholder='Enter the dish weight'
          errorMessage={form.formState.errors.weight?.message}
          isInvalid={!!form.formState.errors.weight}
          {...form.register('weight')}
        />

        <Input
          label='Cost'
          type='number'
          placeholder='Enter the dish cost'
          errorMessage={form.formState.errors.price?.message}
          isInvalid={!!form.formState.errors.price}
          {...form.register('price')}
        />

        <Input
          label='Category'
          placeholder='Enter the dish category'
          errorMessage={form.formState.errors.category_id?.message}
          isInvalid={!!form.formState.errors.category_id}
          {...form.register('category_id')}
        />

        <Input
          label='Image'
          type='file'
          accept='image/*'
          className='file-input'
          placeholder='Upload the dish image'
          errorMessage={form.formState.errors.file?.message?.toString()}
          isInvalid={!!form.formState.errors.file}
          {...form.register('file')}
        />

        <Button type='submit' color='success' className='mt-4'>
          Create Dish
        </Button>
      </Card>
    </form>
  )
}
