'use client'

import { EditIcon } from '@/components/icons/EditIcon'
import { TrashIcon } from '@/components/icons/TrashIcon'
import { useAuth } from '@/context/AuthContext'
import { useDishesQuery } from '@/queries/useDishesQuery'
import { useDeleteDishMutation } from '@/services/mutations/useDeleteDishMutation'
import {
  Button,
  Card,
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

  const { mutate: deleteDish, isPending } = useDeleteDishMutation({
    onSuccess: () => {
      toast.success('Deleted successfully')
    },
  })

  const handleDelete = (id: string) => {
    deleteDish({ id })
  }
  if (isLoading) {
    return <Spinner size='lg' />
  }

  if (!dishes) {
    return <div>No dishes found</div>
  }

  return (
    <>
      <div className='flex justify-between my-4 '>
        <h1>Dishes page</h1>

        <Button color='success' as={Link} href='/admin/dishes/create'>
          Create new dish
        </Button>
      </div>
      <Table aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>CATEGORY NAME</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {dishes.map((dish) => (
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
                    <EditIcon className={'h-6 min-w-6'} />
                  </Button>
                  <Button
                    size='sm'
                    color='danger'
                    className='!min-w-12'
                    onClick={() => handleDelete(dish.id)}
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
