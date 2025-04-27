'use client'

import { Button, Card, Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

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
  image: z.string().optional(),
  file: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    })
    .refine((file) => !file || ALLOWED_FILE_TYPES.includes(file.type), {
      message: `Only ${ALLOWED_FILE_TYPES.join(', ')} files are allowed`,
    }),
})

export type FormDataDish = z.infer<typeof DishSchema>

interface FormDishProps {
  initialValues: FormDataDish
  onSubmit: (data: FormDataDish) => void
}

const FormDish = ({ initialValues, onSubmit }: FormDishProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    (process.env.NEXT_PUBLIC_BACK_END_URL || '') + initialValues?.image,
  )

  const [file, setFile] = useState<File | null>()

  const form = useForm<z.infer<typeof DishSchema>>({
    resolver: zodResolver(DishSchema),
    defaultValues: { ...initialValues },
  })

  const onSubmitHandler = (data: FormDataDish) => {
    onSubmit({
      ...data,
      file: file || undefined,
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmitHandler)}>
      <Card className='p-4 space-y-4'>
        <h2 className='text-lg font-semibold'>Update dish</h2>

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

        {previewUrl && (
          <img
            src={previewUrl}
            alt='Dish preview'
            className='w-64 h-64 object-cover rounded-lg mb-4'
          />
        )}

        <Controller
          name='file'
          control={form.control}
          render={({ field }) => (
            <Input
              label='Image'
              type='file'
              accept='image/*'
              className='file-input'
              placeholder='Upload the dish image'
              errorMessage={form.formState.errors.file?.message?.toString()}
              //isInvalid={!!form.formState.errors.file}
              onChange={(e) => {
                const files = e.target.files

                if (files && files.length > 0) {
                  const file = files[0]
                  console.info('Files:', file)
                  const imageUrl = URL.createObjectURL(file)
                  setPreviewUrl(imageUrl)
                  setFile(file)
                  //field.onChange(files) // <-- pass the FileList, not just a single file!
                }
              }}
            />
          )}
        />

        <Button type='submit' color='success' className='mt-4'>
          Update dish
        </Button>
      </Card>
    </form>
  )
}

export default FormDish
