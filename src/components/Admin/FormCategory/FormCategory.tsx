'use client'

import { Button, Card, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/config/file'
import { CropImage } from '@/components/Admin/CropImage/CropImage'

const CategorySchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  name_en: z.string().min(1, 'Name is required'),
  name_ro: z.string().min(1, 'Name is required'),
  name_ru: z.string().min(1, 'Name is required'),
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

export type FormDataDishCategory = z.infer<typeof CategorySchema>

interface FormDishProps {
  initialValues?: FormDataDishCategory
  onSubmit: (data: FormDataDishCategory) => void
  update?: boolean
}

const FormCategory = ({ initialValues, onSubmit, update }: FormDishProps) => {
  const initialImage = useMemo<string | null>(
    () =>
      initialValues?.image
        ? (process.env.NEXT_PUBLIC_BACK_END_URL || '') + initialValues?.image
        : null,

    [initialValues],
  )

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: { ...initialValues },
  })

  const onSubmitHandler = useCallback(onSubmit, [onSubmit])

  return (
    <form onSubmit={form.handleSubmit(onSubmitHandler)}>
      <Card className='p-4 space-y-4'>
        <h2 className='text-lg font-semibold'> {update ? 'Update' : 'Create'} category</h2>
        <Input
          label='Slug'
          placeholder='Enter the category name as slug'
          errorMessage={form.formState.errors.slug?.message}
          isInvalid={!!form.formState.errors.slug}
          {...form.register('slug')}
        />
        <div className='flex gap-x-4'>
          <Input
            label='Name english'
            placeholder='Enter the category name for english'
            errorMessage={form.formState.errors.name_en?.message}
            isInvalid={!!form.formState.errors.name_en}
            {...form.register('name_en')}
          />
        </div>
        <div className='flex gap-x-4'>
          <Input
            label='Name romanian'
            placeholder='Enter the category name for romanian'
            errorMessage={form.formState.errors.name_ro?.message}
            isInvalid={!!form.formState.errors.name_ro}
            {...form.register('name_ro')}
          />
        </div>
        <div className='flex gap-x-4'>
          <Input
            label='Name russian'
            placeholder='Enter the category name for russian'
            errorMessage={form.formState.errors.name_ru?.message}
            isInvalid={!!form.formState.errors.name_ru}
            {...form.register('name_ru')}
          />
        </div>

        <CropImage
          errorMessage={form.formState.errors.file?.message?.toString()}
          onChange={(file) => {
            form.setValue('file', file)
          }}
          initialImage={initialImage}
        />

        <Button type='submit' color='success' className='mt-4 text-white  flex self-end'>
          {update ? 'Update' : 'Create'} category
        </Button>
      </Card>
    </form>
  )
}

export default FormCategory
