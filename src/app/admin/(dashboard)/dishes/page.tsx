'use client'

import { useState, useMemo } from 'react'
import debounce from 'lodash/debounce'
import { EditIcon } from '@/components/icons/EditIcon'
import { TrashIcon } from '@/components/icons/TrashIcon'
import { useDishesQuery } from '@/queries/useDishesQuery'
import { useDeleteDishMutation } from '@/services/mutations/useDeleteDishMutation'
import {
  Button,
  Card,
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

export default function AdminDishesPage() {
  const { data: dishes, isLoading } = useDishesQuery()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const { mutate: deleteDish, isPending } = useDeleteDishMutation({
    onSuccess: () => {
      toast.success('Deleted successfully')
    },
  })

  const handleDelete = (id: string) => {
    deleteDish({ id })
  }

  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setDebouncedSearchTerm(value), 300),
    [],
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    debouncedSetSearchTerm(e.target.value)
  }

  const filteredDishes = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return dishes || []
    return (
      dishes?.filter((dish) =>
        dish.name_ru.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ) || []
    )
  }, [debouncedSearchTerm, dishes])

  if (isLoading) return <Spinner size='lg' />
  if (!dishes) return <div>No dishes found</div>

  return (
    <>
      <div className='flex justify-between items-center my-4'>
        <h1>Dishes page</h1>
        <Button color='success' as={Link} href='/admin/dishes/create'>
          Create new dish
        </Button>
      </div>

      <Input
        type='text'
        placeholder='Search by name...'
        value={searchTerm}
        onChange={handleSearchChange}
        className='mb-4 max-w-md'
        endContent={
          searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('')
                setDebouncedSearchTerm('')
              }}
              className='text-gray-500 hover:text-gray-700'
            >
              ✕
            </button>
          )
        }
      />

      <Table aria-label='Dishes table'>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>CATEGORY NAME</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredDishes.map((dish) => (
            <TableRow key={dish.id}>
              <TableCell>{dish.id}</TableCell>
              <TableCell>{dish.name_ru}</TableCell>
              <TableCell>{dish.category.name_ru}</TableCell>
              <TableCell>
                <div className='flex gap-x-4'>
                  <Button
                    size='sm'
                    color='primary'
                    as={Link}
                    href={`/admin/dishes/${dish.id}`}
                    className='!min-w-10 !w-12'
                  >
                    <EditIcon className='h-6 min-w-6' />
                  </Button>
                  <Button
                    size='sm'
                    color='danger'
                    className='!min-w-12'
                    onClick={() => handleDelete(dish.id)}
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
