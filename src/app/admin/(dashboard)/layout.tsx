'use client'

import { Sidebar } from '@/components/Admin/Sidebar/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import { useTheme } from 'next-themes'
import { ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import { cn } from '@/library/utils'

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { theme } = useTheme()

  return (
    <ProtectedRoute>
      <section
        className={cn('flex ', {
          'bg-white': theme === 'light',
        })}
      >
        <ToastContainer className={'absolute'} autoClose={3000} transition={Slide} />
        <Sidebar />
        <main className='relative flex-grow'>{children}</main>
      </section>
    </ProtectedRoute>
  )
}
