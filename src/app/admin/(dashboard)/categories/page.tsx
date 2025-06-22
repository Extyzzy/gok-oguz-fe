'use client'

import { useState, useMemo } from 'react'
import debounce from 'lodash/debounce'
import { EditIcon } from '@/components/icons/EditIcon'
import { TrashIcon } from '@/components/icons/TrashIcon'
import { useCategoriesQuery } from '@/queries/useCategoriesQuery'
import { useDeleteCategoryMutation } from '@/services/mutations/useDeleteCategoryMutation'
import {
  Button,
  Input,
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

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setDebouncedSearchTerm(value), 300),
    [],
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    debouncedSetSearchTerm(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
  }

  const filteredCategories = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return categories || []
    return (
      categories?.filter((cat) =>
        cat.name_ru.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ) || []
    )
  }, [debouncedSearchTerm, categories])

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
      <div className='flex justify-between items-center my-4'>
        <h1>Categories page</h1>
        <Button color='success' as={Link} href='/admin/categories/create'>
          Create new category
        </Button>
      </div>

      <Input
        type='text'
        placeholder='Search by category name...'
        value={searchTerm}
        onChange={handleSearchChange}
        className='mb-4 max-w-md'
        endContent={
          searchTerm && (
            <button onClick={handleClearSearch} className='text-gray-500 hover:text-gray-700'>
              ✕
            </button>
          )
        }
      />

      <Table aria-label='Categories table'>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>CATEGORY NAME</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredCategories.map((category) => (
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
                    <EditIcon className='h-6 min-w-6' />
                  </Button>
                  <Button
                    size='sm'
                    color='danger'
                    className='!min-w-12'
                    onClick={() => handleDelete(category.id.toString())}
                    isLoading={isPending}
                  >
                    {!isPending && <TrashIcon className='h-6 min-w-6' />}
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
