'use client'

import { toast } from 'react-toastify'
import FormPageContent from '@/components/Admin/FormPageContent/FormPageContent'
import { usePageContentQuery } from '@/queries/usePageContentQuery'
import { useUpdatePageContentMutation } from '@/services/mutations/useUpdatePageContentMutation'
import { Spinner } from '@nextui-org/react'

export default function AdminPageContentPage() {
  const { data: pageContent, isLoading } = usePageContentQuery()

  const { mutate: updatePageContent, isPending } = useUpdatePageContentMutation({
    onSuccess: () => {
      toast.success('Page content updated successfully')
    },
    onError: (error: any) => {
      console.error('Update error:', error)
      toast.error(`Failed to update page content: ${error?.response?.data?.message || error.message}`)
    },
  })

  const onSubmitHandler = (data: any) => {
    console.log('Submitting data:', data)
    updatePageContent(data)
  }

  if (isLoading) {
    return <Spinner size='lg' />
  }

  if (!pageContent) {
    return <div>No page content found</div>
  }

  return (
    <div className='p-4 md:p-6 lg:p-8'>
      <h1 className='text-2xl font-bold mb-6'>Page Content</h1>
      <FormPageContent initialValues={pageContent} onSubmit={onSubmitHandler} />
    </div>
  )
}

