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
  Select,
  SelectItem,
} from '@nextui-org/react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useCategoriesQuery } from '@/queries/useCategoriesQuery'

export default function AdminDishesPage() {
  const { data: dishes, isLoading } = useDishesQuery()
  const { data: categories } = useCategoriesQuery()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

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
    // Create a copy of the dishes array to avoid mutating the original
    let dishList = [...(dishes || [])]

    // Filter by category
    if (selectedCategory !== 'all') {
      dishList = dishList.filter(
        (dish) =>
          dish.category_id?.toString() === selectedCategory ||
          dish.category?.id?.toString() === selectedCategory,
      )
    }

    // Filter by search term
    if (debouncedSearchTerm.trim()) {
      dishList = dishList.filter((dish) =>
        dish.name_ru.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      )
    }

    // Sort by orderNumber, then by id as fallback (create a new sorted array)
    return [...dishList].sort((a, b) => {
      const orderDiff = (a.orderNumber ?? 0) - (b.orderNumber ?? 0)
      return orderDiff !== 0 ? orderDiff : Number(a.id) - Number(b.id)
    })
  }, [debouncedSearchTerm, dishes, selectedCategory])

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

      <div className='flex gap-4 mb-4 flex-wrap'>
        <Input
          type='text'
          placeholder='Search by name...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='max-w-md'
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
        <Select
          label='Filter by Category'
          placeholder='Select a category'
          selectedKeys={selectedCategory !== 'all' ? [selectedCategory] : []}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string
            setSelectedCategory(selected || 'all')
          }}
          className='max-w-xs'
          selectionMode='single'
        >
          <SelectItem key='all' value='all'>
            All Categories
          </SelectItem>
          {categories?.map((category) => (
            <SelectItem key={category.id.toString()} value={category.id.toString()}>
              {category.name_ru}
            </SelectItem>
          ))}
        </Select>
        {(selectedCategory !== 'all' || searchTerm) && (
          <Button
            variant='light'
            onClick={() => {
              setSelectedCategory('all')
              setSearchTerm('')
              setDebouncedSearchTerm('')
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <Table aria-label='Dishes table'>
        <TableHeader>
          <TableColumn>ORDER</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>CATEGORY NAME</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredDishes.map((dish) => (
            <TableRow key={dish.id}>
              <TableCell>{dish.orderNumber ?? 0}</TableCell>
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
