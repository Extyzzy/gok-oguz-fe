'use client'

import { ReactNode } from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <div className='p-4'>{children}</div>
}
