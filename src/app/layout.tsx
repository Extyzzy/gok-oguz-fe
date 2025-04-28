import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { Onest } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/queryClient/QueryClientProvider'
import { NextUIProvider } from '@nextui-org/react'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const onest = Onest({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gok-oguz',
  description: '',
}

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={onest.className}>
        <NextThemesProvider attribute='class' defaultTheme='light'>
          <NextUIProvider>
            <QueryProvider>
              <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
          </NextUIProvider>{' '}
        </NextThemesProvider>
      </body>
    </html>
  )
}
