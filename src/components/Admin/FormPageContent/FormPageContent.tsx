'use client'

import { Button, Card, Input, Textarea, Tabs, Tab, Spinner } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageContent } from '@/queries/usePageContentQuery'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { uploadPageContentImage } from '@/endpoints'
import { toast } from 'react-toastify'

const PageContentSchema = z.object({
  wine1: z.string().min(1, 'Wine name is required'),
  wine2: z.string().min(1, 'Wine name is required'),
  wine3: z.string().min(1, 'Wine name is required'),
  wine4: z.string().min(1, 'Wine name is required'),
  home_main_text_en: z.string().min(1, 'Text is required'),
  home_main_text_ro: z.string().min(1, 'Text is required'),
  home_main_text_ru: z.string().min(1, 'Text is required'),
  home_main_description_en: z.string().min(1, 'Description is required'),
  home_main_description_ro: z.string().min(1, 'Description is required'),
  home_main_description_ru: z.string().min(1, 'Description is required'),
  home_traditions_title_en: z.string().min(1, 'Title is required'),
  home_traditions_title_ro: z.string().min(1, 'Title is required'),
  home_traditions_title_ru: z.string().min(1, 'Title is required'),
  home_traditions_text_en: z.string().min(1, 'Text is required'),
  home_traditions_text_ro: z.string().min(1, 'Text is required'),
  home_traditions_text_ru: z.string().min(1, 'Text is required'),
  home_traditions_wines_en: z.string().min(1, 'Text is required'),
  home_traditions_wines_ro: z.string().min(1, 'Text is required'),
  home_traditions_wines_ru: z.string().min(1, 'Text is required'),
  photos_photo_title_en: z.string().min(1, 'Title is required'),
  photos_photo_title_ro: z.string().min(1, 'Title is required'),
  photos_photo_title_ru: z.string().min(1, 'Title is required'),
  photos_restaurant_description_en: z.string().min(1, 'Description is required'),
  photos_restaurant_description_ro: z.string().min(1, 'Description is required'),
  photos_restaurant_description_ru: z.string().min(1, 'Description is required'),
  photos_restaurant_atmosphere_en: z.string().min(1, 'Text is required'),
  photos_restaurant_atmosphere_ro: z.string().min(1, 'Text is required'),
  photos_restaurant_atmosphere_ru: z.string().min(1, 'Text is required'),
  gagauz_culture_title_en: z.string().min(1, 'Title is required'),
  gagauz_culture_title_ro: z.string().min(1, 'Title is required'),
  gagauz_culture_title_ru: z.string().min(1, 'Title is required'),
  gagauz_culture_location_en: z.string().min(1, 'Text is required'),
  gagauz_culture_location_ro: z.string().min(1, 'Text is required'),
  gagauz_culture_location_ru: z.string().min(1, 'Text is required'),
  gagauz_culture_languages_en: z.string().min(1, 'Text is required'),
  gagauz_culture_languages_ro: z.string().min(1, 'Text is required'),
  gagauz_culture_languages_ru: z.string().min(1, 'Text is required'),
  gagauz_culture_example_en: z.string().min(1, 'Text is required'),
  gagauz_culture_example_ro: z.string().min(1, 'Text is required'),
  gagauz_culture_example_ru: z.string().min(1, 'Text is required'),
  images: z.array(z.string()),
})

export type FormDataPageContent = z.infer<typeof PageContentSchema>

interface FormPageContentProps {
  initialValues?: Partial<PageContent>
  onSubmit: (data: Partial<PageContent>) => void
}

const FormPageContent = ({ initialValues, onSubmit }: FormPageContentProps) => {
  const [uploading, setUploading] = useState(false)

  const form = useForm<z.infer<typeof PageContentSchema>>({
    resolver: zodResolver(PageContentSchema),
    defaultValues: {
      ...initialValues,
      images: initialValues?.images || [],
    } as any,
  })

  // Reset form when initialValues change (after successful update)
  useEffect(() => {
    if (initialValues) {
      form.reset({
        ...initialValues,
        images: initialValues?.images || [],
      } as any)
    }
  }, [initialValues, form])

  const images = form.watch('images') || []

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, or WebP images are allowed')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const response = await uploadPageContentImage(file)
      const currentImages = form.getValues('images') || []
      const imageUrl = process.env.NEXT_PUBLIC_BACK_END_URL
        ? `${process.env.NEXT_PUBLIC_BACK_END_URL}${response.url}`
        : response.url
      form.setValue('images', [...currentImages, imageUrl], { shouldValidate: true })
      toast.success('Image uploaded successfully')
      // Reset file input
      event.target.value = ''
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(error?.response?.data?.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    const currentImages = form.getValues('images') || []
    form.setValue(
      'images',
      currentImages.filter((_, i) => i !== index),
      { shouldValidate: true },
    )
  }

  const onSubmitHandler = (data: FormDataPageContent) => {
    // Get all form values to ensure we're sending everything
    const allFormValues = form.getValues()

    // Remove fields that shouldn't be sent to the backend
    const dataToSubmit = { ...allFormValues } as Record<string, unknown>
    delete dataToSubmit.id
    delete dataToSubmit.createdAt
    delete dataToSubmit.updatedAt

    console.log('Form values being submitted:', dataToSubmit)
    console.log('Specific field photos_photo_title_ru:', dataToSubmit.photos_photo_title_ru)
    onSubmit(dataToSubmit)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmitHandler)}>
      <Card className='p-6 space-y-6'>
        <h2 className='text-2xl font-semibold'>Edit Page Content</h2>

        <Tabs aria-label='Content sections'>
          <Tab key='wines' title='Wines'>
            <div className='space-y-4 pt-4'>
              <Input
                label='Wine 1'
                placeholder='Cabernet Sauvignon'
                {...form.register('wine1')}
                errorMessage={form.formState.errors.wine1?.message}
                isInvalid={!!form.formState.errors.wine1}
              />
              <Input
                label='Wine 2'
                placeholder='Merlot'
                {...form.register('wine2')}
                errorMessage={form.formState.errors.wine2?.message}
                isInvalid={!!form.formState.errors.wine2}
              />
              <Input
                label='Wine 3'
                placeholder='Syrah/Shiraz'
                {...form.register('wine3')}
                errorMessage={form.formState.errors.wine3?.message}
                isInvalid={!!form.formState.errors.wine3}
              />
              <Input
                label='Wine 4'
                placeholder='Pinot Noir'
                {...form.register('wine4')}
                errorMessage={form.formState.errors.wine4?.message}
                isInvalid={!!form.formState.errors.wine4}
              />
            </div>
          </Tab>

          <Tab key='images' title='Home Slider Images'>
            <div className='space-y-4 pt-4'>
              <div className='flex gap-2 items-end'>
                <div className='flex-1'>
                  <Input
                    type='file'
                    accept='image/jpeg,image/png,image/webp'
                    label='Upload Image'
                    placeholder='Select an image file'
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className='file-input'
                  />
                  <p className='text-xs text-gray-500 mt-1'>
                    Supported formats: JPEG, PNG, WebP (Max 5MB)
                  </p>
                </div>
                {uploading && (
                  <div className='flex items-center gap-2'>
                    <Spinner size='sm' />
                    <span className='text-sm text-gray-500'>Uploading...</span>
                  </div>
                )}
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
                {images.map((imageUrl, index) => {
                  // Handle both full URLs and relative paths
                  const imageSrc =
                    imageUrl.startsWith('http') || imageUrl.startsWith('/')
                      ? imageUrl
                      : `${process.env.NEXT_PUBLIC_BACK_END_URL || ''}${imageUrl}`

                  return (
                    <div key={index} className='relative border rounded-lg p-2'>
                      <div className='relative w-full h-48 mb-2'>
                        <Image
                          src={imageSrc}
                          alt={`Image ${index + 1}`}
                          fill
                          className='object-cover rounded'
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/placeholder-image.png'
                          }}
                        />
                      </div>
                      <p className='text-xs text-gray-500 truncate mb-2'>{imageUrl}</p>
                      <Button
                        color='danger'
                        size='sm'
                        onClick={() => removeImage(index)}
                        className='w-full'
                      >
                        Delete
                      </Button>
                    </div>
                  )
                })}
              </div>

              {images.length === 0 && (
                <p className='text-gray-500 text-center py-8'>No images added yet</p>
              )}
            </div>
          </Tab>

          <Tab key='home' title='Home Section'>
            <div className='space-y-4 pt-4'>
              <Tabs aria-label='Home languages'>
                <Tab key='en' title='English'>
                  <div className='space-y-4 pt-4'>
                    <Textarea
                      label='Main Text'
                      placeholder='Main heading text'
                      {...form.register('home_main_text_en')}
                      errorMessage={form.formState.errors.home_main_text_en?.message}
                      isInvalid={!!form.formState.errors.home_main_text_en}
                      minRows={2}
                    />
                    <Textarea
                      label='Main Description'
                      placeholder='Main description text'
                      {...form.register('home_main_description_en')}
                      errorMessage={form.formState.errors.home_main_description_en?.message}
                      isInvalid={!!form.formState.errors.home_main_description_en}
                      minRows={2}
                    />
                    <Textarea
                      label='Traditions Title'
                      placeholder='Traditions section title'
                      {...form.register('home_traditions_title_en')}
                      errorMessage={form.formState.errors.home_traditions_title_en?.message}
                      isInvalid={!!form.formState.errors.home_traditions_title_en}
                      minRows={2}
                    />
                    <Textarea
                      label='Traditions Text'
                      placeholder='Traditions section text'
                      {...form.register('home_traditions_text_en')}
                      errorMessage={form.formState.errors.home_traditions_text_en?.message}
                      isInvalid={!!form.formState.errors.home_traditions_text_en}
                      minRows={3}
                    />
                    <Textarea
                      label='Traditions Wines'
                      placeholder='Text about wines'
                      {...form.register('home_traditions_wines_en')}
                      errorMessage={form.formState.errors.home_traditions_wines_en?.message}
                      isInvalid={!!form.formState.errors.home_traditions_wines_en}
                      minRows={2}
                    />
                  </div>
                </Tab>
                <Tab key='ro' title='Romanian'>
                  <div className='space-y-4 pt-4'>
                    <Textarea
                      label='Main Text'
                      placeholder='Main heading text'
                      {...form.register('home_main_text_ro')}
                      errorMessage={form.formState.errors.home_main_text_ro?.message}
                      isInvalid={!!form.formState.errors.home_main_text_ro}
                      minRows={2}
                    />
                    <Textarea
                      label='Main Description'
                      placeholder='Main description text'
                      {...form.register('home_main_description_ro')}
                      errorMessage={form.formState.errors.home_main_description_ro?.message}
                      isInvalid={!!form.formState.errors.home_main_description_ro}
                      minRows={2}
                    />
                    <Textarea
                      label='Traditions Title'
                      placeholder='Traditions section title'
                      {...form.register('home_traditions_title_ro')}
                      errorMessage={form.formState.errors.home_traditions_title_ro?.message}
                      isInvalid={!!form.formState.errors.home_traditions_title_ro}
                      minRows={2}
                    />
                    <Textarea
                      label='Traditions Text'
                      placeholder='Traditions section text'
                      {...form.register('home_traditions_text_ro')}
                      errorMessage={form.formState.errors.home_traditions_text_ro?.message}
                      isInvalid={!!form.formState.errors.home_traditions_text_ro}
                      minRows={3}
                    />
                    <Textarea
                      label='Traditions Wines'
                      placeholder='Text about wines'
                      {...form.register('home_traditions_wines_ro')}
                      errorMessage={form.formState.errors.home_traditions_wines_ro?.message}
                      isInvalid={!!form.formState.errors.home_traditions_wines_ro}
                      minRows={2}
                    />
                  </div>
                </Tab>
                <Tab key='ru' title='Russian'>
                  <div className='space-y-4 pt-4'>
                    <Textarea
                      label='Main Text'
                      placeholder='Main heading text'
                      {...form.register('home_main_text_ru')}
                      errorMessage={form.formState.errors.home_main_text_ru?.message}
                      isInvalid={!!form.formState.errors.home_main_text_ru}
                      minRows={2}
                    />
                    <Textarea
                      label='Main Description'
                      placeholder='Main description text'
                      {...form.register('home_main_description_ru')}
                      errorMessage={form.formState.errors.home_main_description_ru?.message}
                      isInvalid={!!form.formState.errors.home_main_description_ru}
                      minRows={2}
                    />
                    <Textarea
                      label='Traditions Title'
                      placeholder='Traditions section title'
                      {...form.register('home_traditions_title_ru')}
                      errorMessage={form.formState.errors.home_traditions_title_ru?.message}
                      isInvalid={!!form.formState.errors.home_traditions_title_ru}
                      minRows={2}
                    />
                    <Textarea
                      label='Traditions Text'
                      placeholder='Traditions section text'
                      {...form.register('home_traditions_text_ru')}
                      errorMessage={form.formState.errors.home_traditions_text_ru?.message}
                      isInvalid={!!form.formState.errors.home_traditions_text_ru}
                      minRows={3}
                    />
                    <Textarea
                      label='Traditions Wines'
                      placeholder='Text about wines'
                      {...form.register('home_traditions_wines_ru')}
                      errorMessage={form.formState.errors.home_traditions_wines_ru?.message}
                      isInvalid={!!form.formState.errors.home_traditions_wines_ru}
                      minRows={2}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Tab>

          <Tab key='photos' title='Photos Section'>
            <div className='space-y-4 pt-4'>
              <Tabs aria-label='Photos languages'>
                <Tab key='en' title='English'>
                  <div className='space-y-4 pt-4'>
                    <Textarea
                      label='Photo Title'
                      placeholder='Photo section title'
                      {...form.register('photos_photo_title_en')}
                      errorMessage={form.formState.errors.photos_photo_title_en?.message}
                      isInvalid={!!form.formState.errors.photos_photo_title_en}
                      minRows={2}
                    />
                    <Textarea
                      label='Restaurant Description'
                      placeholder='Restaurant description'
                      {...form.register('photos_restaurant_description_en')}
                      errorMessage={form.formState.errors.photos_restaurant_description_en?.message}
                      isInvalid={!!form.formState.errors.photos_restaurant_description_en}
                      minRows={3}
                    />
                    <Textarea
                      label='Restaurant Atmosphere'
                      placeholder='Atmosphere description'
                      {...form.register('photos_restaurant_atmosphere_en')}
                      errorMessage={form.formState.errors.photos_restaurant_atmosphere_en?.message}
                      isInvalid={!!form.formState.errors.photos_restaurant_atmosphere_en}
                      minRows={2}
                    />
                  </div>
                </Tab>
                <Tab key='ro' title='Romanian'>
                  <div className='space-y-4 pt-4'>
                    <Textarea
                      label='Photo Title'
                      placeholder='Photo section title'
                      {...form.register('photos_photo_title_ro')}
                      errorMessage={form.formState.errors.photos_photo_title_ro?.message}
                      isInvalid={!!form.formState.errors.photos_photo_title_ro}
                      minRows={2}
                    />
                    <Textarea
                      label='Restaurant Description'
                      placeholder='Restaurant description'
                      {...form.register('photos_restaurant_description_ro')}
                      errorMessage={form.formState.errors.photos_restaurant_description_ro?.message}
                      isInvalid={!!form.formState.errors.photos_restaurant_description_ro}
                      minRows={3}
                    />
                    <Textarea
                      label='Restaurant Atmosphere'
                      placeholder='Atmosphere description'
                      {...form.register('photos_restaurant_atmosphere_ro')}
                      errorMessage={form.formState.errors.photos_restaurant_atmosphere_ro?.message}
                      isInvalid={!!form.formState.errors.photos_restaurant_atmosphere_ro}
                      minRows={2}
                    />
                  </div>
                </Tab>
                <Tab key='ru' title='Russian'>
                  <div className='space-y-4 pt-4'>
                    <Textarea
                      label='Photo Title'
                      placeholder='Photo section title'
                      {...form.register('photos_photo_title_ru')}
                      errorMessage={form.formState.errors.photos_photo_title_ru?.message}
                      isInvalid={!!form.formState.errors.photos_photo_title_ru}
                      minRows={2}
                    />
                    <Textarea
                      label='Restaurant Description'
                      placeholder='Restaurant description'
                      {...form.register('photos_restaurant_description_ru')}
                      errorMessage={form.formState.errors.photos_restaurant_description_ru?.message}
                      isInvalid={!!form.formState.errors.photos_restaurant_description_ru}
                      minRows={3}
                    />
                    <Textarea
                      label='Restaurant Atmosphere'
                      placeholder='Atmosphere description'
                      {...form.register('photos_restaurant_atmosphere_ru')}
                      errorMessage={form.formState.errors.photos_restaurant_atmosphere_ru?.message}
                      isInvalid={!!form.formState.errors.photos_restaurant_atmosphere_ru}
                      minRows={2}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Tab>

          <Tab key='gagauz' title='Gagauz Culture'>
            <div className='space-y-4 pt-4'>
              <Tabs aria-label='Gagauz languages'>
                <Tab key='en' title='English'>
                  <div className='space-y-4 pt-4'>
                    <Textarea
                      label='Title'
                      placeholder='Culture section title'
                      {...form.register('gagauz_culture_title_en')}
                      errorMessage={form.formState.errors.gagauz_culture_title_en?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_title_en}
                      minRows={2}
                    />
                    <Textarea
                      label='Location'
                      placeholder='Location description'
                      {...form.register('gagauz_culture_location_en')}
                      errorMessage={form.formState.errors.gagauz_culture_location_en?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_location_en}
                      minRows={3}
                    />
                    <Textarea
                      label='Languages'
                      placeholder='Languages description'
                      {...form.register('gagauz_culture_languages_en')}
                      errorMessage={form.formState.errors.gagauz_culture_languages_en?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_languages_en}
                      minRows={4}
                    />
                    <Textarea
                      label='Example'
                      placeholder='Example text'
                      {...form.register('gagauz_culture_example_en')}
                      errorMessage={form.formState.errors.gagauz_culture_example_en?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_example_en}
                      minRows={2}
                    />
                  </div>
                </Tab>
                <Tab key='ro' title='Romanian'>
                  <div className='space-y-4 pt-4'>
                    <Textarea
                      label='Title'
                      placeholder='Culture section title'
                      {...form.register('gagauz_culture_title_ro')}
                      errorMessage={form.formState.errors.gagauz_culture_title_ro?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_title_ro}
                      minRows={2}
                    />
                    <Textarea
                      label='Location'
                      placeholder='Location description'
                      {...form.register('gagauz_culture_location_ro')}
                      errorMessage={form.formState.errors.gagauz_culture_location_ro?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_location_ro}
                      minRows={3}
                    />
                    <Textarea
                      label='Languages'
                      placeholder='Languages description'
                      {...form.register('gagauz_culture_languages_ro')}
                      errorMessage={form.formState.errors.gagauz_culture_languages_ro?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_languages_ro}
                      minRows={4}
                    />
                    <Textarea
                      label='Example'
                      placeholder='Example text'
                      {...form.register('gagauz_culture_example_ro')}
                      errorMessage={form.formState.errors.gagauz_culture_example_ro?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_example_ro}
                      minRows={2}
                    />
                  </div>
                </Tab>
                <Tab key='ru' title='Russian'>
                  <div className='space-y-4 pt-4'>
                    <Textarea
                      label='Title'
                      placeholder='Culture section title'
                      {...form.register('gagauz_culture_title_ru')}
                      errorMessage={form.formState.errors.gagauz_culture_title_ru?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_title_ru}
                      minRows={2}
                    />
                    <Textarea
                      label='Location'
                      placeholder='Location description'
                      {...form.register('gagauz_culture_location_ru')}
                      errorMessage={form.formState.errors.gagauz_culture_location_ru?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_location_ru}
                      minRows={3}
                    />
                    <Textarea
                      label='Languages'
                      placeholder='Languages description'
                      {...form.register('gagauz_culture_languages_ru')}
                      errorMessage={form.formState.errors.gagauz_culture_languages_ru?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_languages_ru}
                      minRows={4}
                    />
                    <Textarea
                      label='Example'
                      placeholder='Example text'
                      {...form.register('gagauz_culture_example_ru')}
                      errorMessage={form.formState.errors.gagauz_culture_example_ru?.message}
                      isInvalid={!!form.formState.errors.gagauz_culture_example_ru}
                      minRows={2}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Tab>
        </Tabs>

        <Button type='submit' color='success' className='mt-6 text-white flex self-end'>
          Update Content
        </Button>
      </Card>
    </form>
  )
}

export default FormPageContent
