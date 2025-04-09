'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileMenu from '@/components/MobileMenu/MobileMenu'
import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/i18n'

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Header />
        <main className='bg-beige h-full md:'>
          <div className="bg-[url('/assets/svg/ornament.svg')] bg-[length:6rem] lg:bg-[length:12rem] bg-repeat-y bg-right h-auto w-full container mx-auto">
            {children}

            <Footer />

            <MobileMenu />
          </div>
        </main>
      </I18nextProvider>
    </>
  )
}
