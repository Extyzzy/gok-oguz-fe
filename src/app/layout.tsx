'use client'

import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import './globals.css'
import Header from '@/app/componets/Header'
import Footer from '@/app/componets/Footer'
import MobileMenu from './componets/mobileMenu/mobileMenu'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'

const onest = Onest({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Gok-oguz',
  description: '',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <I18nextProvider i18n={i18n}>
      <html lang="en">
      <body className={onest.className}>
      <Header />
      <main className="bg-beige h-full md:">
        <div
          className="bg-[url('/assets/svg/ornament.svg')] bg-[length:6rem] lg:bg-[length:12rem] bg-repeat-y bg-right h-auto w-full container mx-auto">

          {children}


          <Footer />

          <MobileMenu />
        </div>
      </main>
      </body>
      </html>
    </I18nextProvider>
  )
}
