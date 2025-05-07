'use client'

import { useAuth } from '@/context/AuthContext'
import { Card } from '@nextui-org/react'

export default function AdminDashboardPage() {
  const { user } = useAuth()

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card className='p-4'>
          <h2 className='text-lg font-semibold'>
            Welcome, {user?.firstName} {user?.lastName}
          </h2>
          <p className='text-gray-600'>{user?.email}</p>
          <span className='inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs'>
            Enjoy your admin panel!
          </span>
        </Card>
      </div>
    </div>
  )
}
