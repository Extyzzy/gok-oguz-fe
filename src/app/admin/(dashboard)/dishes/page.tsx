'use client'

import { useAuth } from '@/context/AuthContext'
import { useDishesQuery } from '@/queries/useDishesQuery'
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

export default function AdminDishesPage() {
  const { data: dishes, isLoading } = useDishesQuery()

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
              <TableCell>{dish.name}</TableCell>
              <TableCell>{dish.category.name}</TableCell>
              <TableCell>
                <Button size='sm' color='primary' as={Link} href={`/admin/dishes/${dish.id}`}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
