'use client'

import { Sidebar } from '@/components/Admin/Sidebar/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import { ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify'

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ProtectedRoute>
      <section className='flex bg-white'>
        <ToastContainer className={'absolute'} autoClose={3000} transition={Slide} />
        <Sidebar />
        <main className='relative flex-grow'>{children}</main>
      </section>
    </ProtectedRoute>
  )
}
