'use client'

import { EditIcon } from '@/components/icons/EditIcon'
import { TrashIcon } from '@/components/icons/TrashIcon'
import { useCategoriesQuery } from '@/queries/useCategoriesQuery'
import { useDeleteCategoryMutation } from '@/services/mutations/useDeleteCategoryMutation'
import {
  Button,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useCategoriesQuery()

  const { mutate: deleteCategory, isPending } = useDeleteCategoryMutation({
    onSuccess: () => {
      toast.success('Deleted successfully')
    },
  })

  const handleDelete = (id: string) => {
    deleteCategory({ id })
  }
  if (isLoading) {
    return <Spinner size='lg' />
  }

  if (!categories) {
    return <div>No categories found</div>
  }

  return (
    <>
      <div className='flex justify-between my-4 '>
        <h1>Categories page</h1>

        <Button color='success' as={Link} href='/admin/categories/create'>
          Create new category
        </Button>
      </div>
      <Table aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>CATEGORY NAME</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name_ru}</TableCell>
              <TableCell>
                <div className='flex gap-x-4'>
                  <Button
                    size='sm'
                    color='primary'
                    as={Link}
                    href={`/admin/categories/${category.id}`}
                    className='!min-w-10 !w-12'
                  >
                    <EditIcon className={'h-6 min-w-6'} />
                  </Button>
                  <Button
                    size='sm'
                    color='danger'
                    className='!min-w-12'
                    onClick={() => handleDelete(category.id.toString())}
                    isLoading={isPending}
                  >
                    {!isPending && <TrashIcon className={'h-6 min-w-6'} />}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
