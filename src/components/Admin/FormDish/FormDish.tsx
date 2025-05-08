'use client'

import { Button, Card, Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo, useState } from 'react'
import { CategoryAutocomplete } from '@/components/Admin/Category/CategoryAutocomplete'
import { MoneyInput } from '@/components/Admin/Inputs/MoneyInput'
import { WeightInput } from '@/components/Admin/Inputs/WeightInput'
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/config/file'
import { CropImage } from '@/components/Admin/CropImage/CropImage'

const DishSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  name_en: z.string().min(1, 'Name is required'),
  name_ro: z.string().min(1, 'Name is required'),
  name_ru: z.string().min(1, 'Name is required'),
  description_en: z.string().min(1, 'Description is required'),
  description_ro: z.string().min(1, 'Description is required'),
  description_ru: z.string().min(1, 'Description is required'),
  weight: z.string().min(1, 'Weight is required'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Cost must be a valid number'),
  category_id: z.string().min(1, 'Category is required').optional(),
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
  initialValues?: FormDataDish
  onSubmit: (data: FormDataDish) => void

  update?: boolean
}

const FormDish = ({ initialValues, onSubmit, update }: FormDishProps) => {
  const initialImage = useMemo<string | null>(
    () =>
      initialValues?.image
        ? (process.env.NEXT_PUBLIC_BACK_END_URL || '') + initialValues?.image
        : null,

    [initialValues],
  )

  const form = useForm<z.infer<typeof DishSchema>>({
    resolver: zodResolver(DishSchema),
    defaultValues: { ...initialValues },
  })

  const onSubmitHandler = useCallback(onSubmit, [onSubmit])

  return (
    <form onSubmit={form.handleSubmit(onSubmitHandler)}>
      <Card className='p-4 space-y-4'>
        <h2 className='text-lg font-semibold'>{update ? 'Update' : 'Create'} dish</h2>
        <Input
          label='Slug'
          placeholder='Enter the dish name as slug'
          errorMessage={form.formState.errors.slug?.message}
          isInvalid={!!form.formState.errors.slug}
          {...form.register('slug')}
        />
        <div className='flex gap-x-4'>
          <Input
            label='Name english'
            placeholder='Enter the dish name for english'
            errorMessage={form.formState.errors.name_en?.message}
            isInvalid={!!form.formState.errors.name_en}
            {...form.register('name_en')}
          />

          <Input
            label='Description english'
            placeholder='Enter the dish description for english'
            errorMessage={form.formState.errors.description_en?.message}
            isInvalid={!!form.formState.errors.description_en}
            {...form.register('description_en')}
          />
        </div>
        <div className='flex gap-x-4'>
          <Input
            label='Name romanian'
            placeholder='Enter the dish name for romanian'
            errorMessage={form.formState.errors.name_ro?.message}
            isInvalid={!!form.formState.errors.name_ro}
            {...form.register('name_ro')}
          />

          <Input
            label='Description romanian'
            placeholder='Enter the dish description for romanian'
            errorMessage={form.formState.errors.description_ro?.message}
            isInvalid={!!form.formState.errors.description_ro}
            {...form.register('description_ro')}
          />
        </div>
        <div className='flex gap-x-4'>
          <Input
            label='Name russian'
            placeholder='Enter the dish name for russian'
            errorMessage={form.formState.errors.name_ru?.message}
            isInvalid={!!form.formState.errors.name_ru}
            {...form.register('name_ru')}
          />
          <Input
            label='Description russian'
            placeholder='Enter the dish description for russian'
            errorMessage={form.formState.errors.description_ru?.message}
            isInvalid={!!form.formState.errors.description_ru}
            {...form.register('description_ru')}
          />
        </div>
        <WeightInput
          label='Weight'
          placeholder='Enter the dish weight'
          errorMessage={form.formState.errors.weight?.message}
          isInvalid={!!form.formState.errors.weight}
          {...form.register('weight')}
        />

        <MoneyInput
          label='Cost'
          type='number'
          placeholder='Enter the dish cost'
          errorMessage={form.formState.errors.price?.message}
          isInvalid={!!form.formState.errors.price}
          {...form.register('price')}
        />

        <Controller
          control={form.control}
          name='category_id'
          render={({ field, fieldState }) => (
            <CategoryAutocomplete
              label='Category'
              placeholder='Enter the dish category'
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error}
              selectKey={field.value ?? null}
              onSelectionChange={(key) => field.onChange(key)}
            />
          )}
        />

        <CropImage
          errorMessage={form.formState.errors.file?.message?.toString()}
          onChange={(file) => {
            form.setValue('file', file)
          }}
          initialImage={initialImage}
        />

        <Button type='submit' color='success' className='mt-4 text-white flex self-end'>
          {update ? 'Update' : 'Create'} dish
        </Button>
      </Card>
    </form>
  )
}

export default FormDish
